const ss = SpreadsheetApp.getActiveSpreadsheet();
var Bot = null;

/**
 * Создает кастомное меню при открытии таблицы.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🤖 Telegram Bot')
    .addItem('🚀 Мастер Настройки', 'showSetupWizard')
    .addItem('⚙️ Управление Webhook', 'showWebhookManager')
    .addSeparator()
    .addItem('🧪 Открыть тестовое окно', 'showTelegramTestUI')
    .addToUi();
}

/**
 * Запускает HTML-интерфейс Мастера Настройки.
 */
function showSetupWizard() {
  const html = HtmlService.createTemplateFromFile('SetupWizard');
  html.start_at = 'wizard'; // Устанавливаем параметр для начала с первого шага
  SpreadsheetApp.getUi().showModalDialog(html.evaluate().setWidth(600).setHeight(550), '🚀 Мастер Первоначальной Настройки');
}

/**
 * Открывает менеджер Webhook (часть Мастера Настройки).
 */
function showWebhookManager() {
  const html = HtmlService.createTemplateFromFile('SetupWizard');
  html.start_at = 'webhook'; // Устанавливаем параметр для начала с шага Webhook
  SpreadsheetApp.getUi().showModalDialog(html.evaluate().setWidth(600).setHeight(550), '⚙️ Управление Webhook');
}

/**
 * Открывает UI для тестирования функций бота.
 */
function showTelegramTestUI() {
  const html = HtmlService.createHtmlOutputFromFile('telegram_test_ui.html')
    .setWidth(1200)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, 'Telegram Bot Test UI');
}

// --- Функции для Мастера Настройки ---

/**
 * Создает необходимые листы в таблице с заголовками.
 */
function setupInitialSheets() {
  const sheets = {
    'Messages': ['Дата', 'ID Пользователя', 'Имя', 'Сообщение'],
    'Users': ['ID Пользователя', 'Имя', 'Дата добавления'],
    'Debug': ['Дата', 'Данные'],
    'Errors': ['Дата', 'Ошибка']
  };

  for (const sheetName in sheets) {
    if (!ss.getSheetByName(sheetName)) {
      const newSheet = ss.insertSheet(sheetName);
      newSheet.getRange(1, 1, 1, sheets[sheetName].length).setValues([sheets[sheetName]]);
      newSheet.setFrozenRows(1);
    }
  }
  return 'Листы успешно созданы и отформатированы!';
}

/**
 * Сохраняет токен и ID развертывания в свойства скрипта.
 */
function saveSettings(settings) {
  PropertiesService.getScriptProperties().setProperties(settings, true); // true - удалить остальные свойства
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
  const token = PropertiesService.getScriptProperties().getProperty('BOT_TOKEN');
  const webAppUrl = ScriptApp.getService().getUrl(); // Получаем URL развернутого веб-приложения

  if (!token) {
    throw new Error('Токен бота не найден. Запустите Мастер Настройки и сохраните токен.');
  }

  if (!webAppUrl) {
    throw new Error('URL веб-приложения не найден. Убедитесь, что скрипт развернут как веб-приложение.');
  }

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
  initBot();
  if (!Bot) {
    throw new Error('Бот не инициализирован.');
  }

  try {
    switch (testName) {
      case 'getMe':
        return Bot.getMe();
      case 'getInfo':
        return Bot.info();
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
        const url = ScriptApp.getService().getUrl();
        return Bot.setWebhook({ url: url });
      case 'getWebhookInfo':
        return Bot.getWebhookInfo();
      case 'deleteWebhook':
        return Bot.deleteWebhook();
      default:
        throw new Error('Неизвестный тест: ' + testName);
    }
  } catch (e) {
    return { error: true, message: e.message, stack: e.stack };
  }
}