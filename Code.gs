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

// --- Функции для панели управления (Листы) ---

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

  return statuses;
}

/**
 * Главная функция для управления листами.
 */
function manageSheets(options) {
  try {
    switch (options.action) {
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
    // Логируем и возвращаем ошибку
    const errorSheet = ss.getSheetByName('Errors') || ss.insertSheet('Errors');
    errorSheet.appendRow([new Date(), `manageSheets Error: ${e.message}`]);
    throw new Error(e.message); // Передаем ошибку в UI
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

function createAllSheets() {
  const templateSheetNames = Object.keys(SHEET_TEMPLATES);
  let createdCount = 0;
  templateSheetNames.forEach(name => {
    if (!ss.getSheetByName(name)) {
      createSheet(name);
      createdCount++;
    }
  });
  return createdCount > 0 ? `✅ Создано ${createdCount} новых листов.` : 'ℹ️ Все необходимые листы уже существуют.';
}

function clearSheet(sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (sheet) {
    sheet.getDataRange().offset(1, 0).clearContent(); // Очищаем все, кроме заголовка
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

/**
 * Сохраняет токен и ID развертывания в свойства скрипта.
 */
function saveSettings(settings) {
  PropertiesService.getScriptProperties().setProperties({
      BOT_TOKEN: settings.BOT_TOKEN || '',
      DEPLOYMENT_ID: settings.DEPLOYMENT_ID || ''
  }, false); // false - не удалять остальные свойства
  return getSettings();
}

/**
 * Получает все настройки из свойств скрипта.
 */
function getSettings() {
  return PropertiesService.getScriptProperties().getProperties();
}

/**
 * Инициализирует объект бота с сохраненным токеном.
 */
function initBot() {
  if (Bot) return; // Если бот уже инициализирован, ничего не делаем
  const scriptProperties = PropertiesService.getScriptProperties();
  const token = scriptProperties.getProperty('BOT_TOKEN');
  const deploymentId = scriptProperties.getProperty('DEPLOYMENT_ID');

  if (!token) {
    throw new Error('Токен бота не найден. Откройте "Панель управления" -> "Настройки" и сохраните токен.');
  }

  if (!deploymentId) {
    throw new Error('ID развертывания не найден. Откройте "Панель управления" -> "Настройки" и сохраните ID.');
  }

  const webAppUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;

  try {
    Bot = TGbot.bot({ botToken: token, webAppUrl: webAppUrl });
    if (!Bot) {
      throw new Error('Не удалось инициализировать объект бота. Проверьте настройки библиотеки TGbot.');
    }
  } catch (e) {
    throw new Error(`Ошибка инициализации бота: ${e.message}. Убедитесь, что библиотека TGbot подключена и настроена правильно.`);
  }
}

function runTest(testName, options) {
  try {
    initBot(); // Попытка инициализации при каждом тесте
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
        return Bot.getWebhookInfo();
      case 'deleteWebhook':
        return Bot.deleteWebhook();
      default:
        throw new Error('Неизвестный тест: ' + testName);
    }
  } catch (e) {
    // Логируем ошибку в лист 'Errors'
    const sheet = ss.getSheetByName('Errors') || ss.insertSheet('Errors');
    sheet.appendRow([new Date(), `Функция: ${testName}, Ошибка: ${e.message}`, JSON.stringify(e, null, 2)]);
    // Возвращаем объект ошибки, чтобы он отобразился в UI
    return { error: true, message: e.message, stack: e.stack };
  }
}

// --- Основная функция обработки вебхуков ---

/**
 * Главная функция, принимающая данные от Telegram.
 */
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
      // Пользователь найден, обновляем строку
      const rowIndex = data.findIndex(row => row[0] == user.id) + 1;
      usersSheet.getRange(rowIndex, 1, 1, userData.length).setValues([userData]);
    } else {
      // Новый пользователь, добавляем строку
      usersSheet.appendRow(userData);
    }
  } catch (err) {
    const errorSheet = ss.getSheetByName('Errors');
    if (errorSheet) {
      errorSheet.appendRow([new Date(), `recordUser Error: ${err.message}`, err.stack]);
    }
  }
}