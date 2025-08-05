const ss = SpreadsheetApp.getActiveSpreadsheet();
var Bot = null;

const SHEET_TEMPLATES = {
  'Messages': ['Дата', 'ID Пользователя', 'Имя', 'Сообщение'],
  'Users': ['ID Пользователя', 'Имя', 'Фамилия', 'Ник', 'Язык', 'Дата добавления'],
  'Debug': ['Дата', 'Данные'],
  'Errors': ['Дата', 'Ошибка']
};

/**
 * Создает кастомное меню при открытии таблицы.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🤖 Telegram Bot')
    .addItem('⚙️ Панель управления', 'showTelegramTestUI')
    .addToUi();
}

/**
 * Открывает UI для тестирования и настроек.
 */
function showTelegramTestUI() {
  const html = HtmlService.createHtmlOutputFromFile('telegram_test_ui.html')
    .setWidth(1200)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, 'Панель управления Telegram Ботом');
}

// --- Функции для UI ---

/**
 * Возвращает список пользователей для UI.
 */
function getUsersList() {
  const usersSheet = ss.getSheetByName('Users');
  if (!usersSheet) {
    throw new Error("Лист 'Users' не найден. Создайте его в 'Настройках' -> 'Управление листами'.");
  }
  const data = usersSheet.getDataRange().getValues();
  if (data.length < 2) {
    return []; // Только заголовок или пустой лист
  }
  const headers = data[0];
  const idIndex = headers.indexOf('ID Пользователя');
  const nameIndex = headers.indexOf('Имя');
  const lastNameIndex = headers.indexOf('Фамилия');
  const nickIndex = headers.indexOf('Ник');

  if (idIndex === -1 || nameIndex === -1) {
      throw new Error("В листе 'Users' отсутствуют обязательные столбцы 'ID Пользователя' или 'Имя'.");
  }

  const users = data.slice(1).map(row => {
    const id = row[idIndex];
    if (!id) return null;

    const firstName = row[nameIndex] || '';
    const lastName = row[lastNameIndex] || '';
    const nick = row[nickIndex] ? `(@${row[nickIndex]})` : '';
    const name = [firstName, lastName, nick].filter(Boolean).join(' ').trim();
    
    return { id: id, name: name || id };
  }).filter(Boolean);

  return users;
}

/**
 * Сохраняет настройки бота.
 */
function saveSettings(settings) {
  try {
    const properties = PropertiesService.getScriptProperties();
    
    if (settings.BOT_TOKEN) {
      properties.setProperty('BOT_TOKEN', settings.BOT_TOKEN);
    }
    
    if (settings.DEPLOYMENT_ID) {
      properties.setProperty('DEPLOYMENT_ID', settings.DEPLOYMENT_ID);
    }
    
    return { BOT_TOKEN: settings.BOT_TOKEN, DEPLOYMENT_ID: settings.DEPLOYMENT_ID };
  } catch (e) {
    const errorSheet = ss.getSheetByName('Errors') || ss.insertSheet('Errors');
    errorSheet.appendRow([new Date(), `saveSettings Error: ${e.message}`]);
    throw new Error(e.message);
  }
}

/**
 * Возвращает сохраненные настройки бота.
 */
function getSettings() {
  try {
    const properties = PropertiesService.getScriptProperties();
    return {
      BOT_TOKEN: properties.getProperty('BOT_TOKEN') || '',
      DEPLOYMENT_ID: properties.getProperty('DEPLOYMENT_ID') || ''
    };
  } catch (e) {
    const errorSheet = ss.getSheetByName('Errors') || ss.insertSheet('Errors');
    errorSheet.appendRow([new Date(), `getSettings Error: ${e.message}`]);
    throw new Error(e.message);
  }
}


/**
 * Возвращает статус всех листов (шаблонных и пользовательских).
 */
function getSheetsStatus() {
  const allSheets = ss.getSheets().map(s => s.getName());
  const templateSheetNames = Object.keys(SHEET_TEMPLATES);
  
  let statuses = templateSheetNames.map(name => ({
    name: name,
    exists: allSheets.includes(name),
    isTemplate: true
  }));

  allSheets.forEach(name => {
    if (!templateSheetNames.includes(name)) {
      statuses.push({ name: name, exists: true, isTemplate: false });
    }
  });

  return statuses.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Главная функция для управления листами.
 */
function manageSheets(options) {
  try {
    switch (options.action) {
      case 'recreateAllSheets':
        return recreateAllSheetsFromTemplate();
      case 'createAllSheets':
        return createAllSheets();
      case 'createSheet':
        return createSheet(options.sheetName);
      case 'clearSheet':
        return clearSheet(options.sheetName);
      case 'deleteSheet':
        return deleteSheet(options.sheetName);
      case 'deleteNonTemplateSheets':
        return deleteNonTemplateSheets();
      default:
        throw new Error('Неизвестное действие.');
    }
  } catch (e) {
    const errorSheet = ss.getSheetByName('Errors') || ss.insertSheet('Errors');
    errorSheet.appendRow([new Date(), `manageSheets Error: ${e.message}`]);
    throw new Error(e.message);
  }
}

function createSheet(sheetName) {
  if (!ss.getSheetByName(sheetName)) {
    const headers = SHEET_TEMPLATES[sheetName];
    if (!headers) throw new Error(`Шаблон для листа "${sheetName}" не найден.`);
    const newSheet = ss.insertSheet(sheetName);
    newSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    newSheet.setFrozenRows(1);
    return `✅ Лист "${sheetName}" успешно создан.`;
  }
  return `ℹ️ Лист "${sheetName}" уже существует.`;
}

function recreateAllSheetsFromTemplate() {
  const templateSheetNames = Object.keys(SHEET_TEMPLATES);
  templateSheetNames.forEach(name => {
    const sheet = ss.getSheetByName(name);
    if (sheet) {
      ss.deleteSheet(sheet);
    }
    createSheet(name);
  });
  return `✅ Все ${templateSheetNames.length} шаблонных листов были пересозданы.`;
}

function createAllSheets() {
  const templateSheetNames = Object.keys(SHEET_TEMPLATES);
  let createdCount = 0;
  
  templateSheetNames.forEach(name => {
    if (!ss.getSheetByName(name)) {
      createSheet(name);
      createdCount++;
    }
  });
  
  if (createdCount === 0) {
    return `ℹ️ Все ${templateSheetNames.length} шаблонных листов уже существуют.`;
  } else {
    return `✅ Создано ${createdCount} из ${templateSheetNames.length} недостающих листов.`;
  }
}

function clearSheet(sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (sheet) {
    sheet.getDataRange().offset(1, 0).clearContent();
    return `✅ Лист "${sheetName}" очищен.`;
  }
  throw new Error(`Лист "${sheetName}" не найден.`);
}

function deleteSheet(sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (sheet) {
    ss.deleteSheet(sheet);
    return `✅ Лист "${sheetName}" удален.`;
  }
  throw new Error(`Лист "${sheetName}" не найден.`);
}

function deleteNonTemplateSheets() {
  const allSheetNames = ss.getSheets().map(s => s.getName());
  const templateSheetNames = Object.keys(SHEET_TEMPLATES);
  let deletedCount = 0;
  allSheetNames.forEach(name => {
    if (!templateSheetNames.includes(name)) {
      deleteSheet(name);
      deletedCount++;
    }
  });
  return deletedCount > 0 ? `✅ Удалено ${deletedCount} сторонних листов.` : 'ℹ️ Сторонние листы не найдены.';
}


// --- Функции для настроек и тестов ---

function saveSettings(settings) {
  PropertiesService.getScriptProperties().setProperties({
      BOT_TOKEN: settings.BOT_TOKEN || '',
      DEPLOYMENT_ID: settings.DEPLOYMENT_ID || ''
  }, false);
  return getSettings();
}

function getSettings() {
  return PropertiesService.getScriptProperties().getProperties();
}

function initBot() {
  if (Bot) return;
  const scriptProperties = PropertiesService.getScriptProperties();
  const token = scriptProperties.getProperty('BOT_TOKEN');
  
  if (!token) {
    throw new Error('Токен бота не найден. Сохраните его в настройках.');
  }

  try {
    Bot = TGbot.bot({ botToken: token });
    if (!Bot) {
      throw new Error('Не удалось инициализировать объект бота. Проверьте настройки библиотеки TGbot.');
    }
  } catch (e) {
    throw new Error(`Ошибка инициализации бота: ${e.message}. Убедитесь, что библиотека TGbot подключена.`);
  }
}

function runTest(testName, options) {
  try {
    initBot();
    if (!Bot) {
      throw new Error('Бот не инициализирован.');
    }

    switch (testName) {
      case 'getMe':
        return Bot.getMe();
      case 'sendMessage':
        return Bot.sendMessage(options);
      case 'sendMedia':
        const mediaOptions = {
            chat_id: options.chat_id,
            caption: options.caption
        };
        mediaOptions[options.mediaType] = options.url;
        return Bot[`send${options.mediaType.charAt(0).toUpperCase() + options.mediaType.slice(1)}`](mediaOptions);
      case 'sendKeyboard':
        const Keyboard = TGbot.keyboard();
        const Key = TGbot.key();
        const buttonRows = options.buttonsText.split('\n').filter(row => row.trim());
        const keyboardButtons = buttonRows.map(row => {
            const parts = row.split('|');
            return [Key.callback(parts[0].trim(), parts[1].trim())];
        });
        const keyboard = Keyboard.make(keyboardButtons).inline();
        return Bot.sendMessage({ chat_id: options.chat_id, text: options.text, reply_markup: keyboard });
      case 'sendPoll':
        const pollOptions = {
            chat_id: options.chat_id,
            question: options.question,
            options: options.optionsText.split('\n').filter(opt => opt.trim())
        };
        return Bot.sendPoll(pollOptions);
      case 'setWebhook':
        const deploymentId = PropertiesService.getScriptProperties().getProperty('DEPLOYMENT_ID');
        if (!deploymentId) throw new Error("ID развертывания не найден. Сохраните его в настройках.");
        const url = `https://script.google.com/macros/s/${deploymentId}/exec`;
        return Bot.setWebhook({ url: url });
      case 'getWebhookInfo':
        const info = Bot.getWebhookInfo();
        console.log("getWebhookInfo raw response:", JSON.stringify(info));
        return info;
      case 'deleteWebhook':
        return Bot.deleteWebhook();
      default:
        throw new Error('Неизвестный тест: ' + testName);
    }
  } catch (e) {
    const sheet = ss.getSheetByName('Errors') || ss.insertSheet('Errors');
    sheet.appendRow([new Date(), `Функция: ${testName}, Ошибка: ${e.message}`, JSON.stringify(e, null, 2)]);
    return { error: true, message: e.message, stack: e.stack };
  }
}

// --- Основная функция обработки вебхуков ---

function doPost(e) {
  const debugSheet = ss.getSheetByName('Debug');
  try {
    if (debugSheet) {
      debugSheet.appendRow([new Date(), JSON.stringify(e.postData.contents)]);
    }

    const update = JSON.parse(e.postData.contents);
    const message = update.message || update.callback_query.message;
    const user = update.message ? update.message.from : update.callback_query.from;

    recordUser(user);

    if (message) {
      const messagesSheet = ss.getSheetByName('Messages');
      if (messagesSheet) {
        messagesSheet.appendRow([
          new Date(),
          user.id,
          user.first_name,
          message.text || ' (не текстовое сообщение)'
        ]);
      }
    }

  } catch (err) {
    const errorSheet = ss.getSheetByName('Errors');
    if (errorSheet) {
      errorSheet.appendRow([new Date(), `doPost Error: ${err.message}`, err.stack]);
    }
  }
}

/**
 * Записывает или обновляет информацию о пользователе.
 */
function recordUser(user) {
  try {
    const usersSheet = ss.getSheetByName('Users');
    if (!usersSheet) return;

    const data = usersSheet.getDataRange().getValues();
    const userRow = data.find(row => row[0] == user.id);

    const userData = [
      user.id,
      user.first_name || '',
      user.last_name || '',
      user.username || '',
      user.language_code || '',
      new Date()
    ];

    if (userRow) {
      const rowIndex = data.findIndex(row => row[0] == user.id) + 1;
      usersSheet.getRange(rowIndex, 1, 1, userData.length).setValues([userData]);
    } else {
      usersSheet.appendRow(userData);
    }
  } catch (err) {
    const errorSheet = ss.getSheetByName('Errors');
    if (errorSheet) {
      errorSheet.appendRow([new Date(), `recordUser Error: ${err.message}`, err.stack]);
    }
  }
}
