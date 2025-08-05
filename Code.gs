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

  console.log(`initBot: Token - ${token ? 'Присутствует' : 'Отсутствует'}, WebAppUrl - ${webAppUrl}`);

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

// --- Функции для работы с Webhook ---

/**
 * Устанавливает Webhook, используя сохраненный ID развертывания.
 */
function setWebhook() {
  initBot();
  if (!Bot) {
    throw new Error('Объект бота не инициализирован. Невозможно установить Webhook.');
  }
  const url = ScriptApp.getService().getUrl(); // Используем текущий URL развертывания
  return Bot.setWebhook({ url: url });
}

/**
 * Получает информацию о Webhook.
 */
function getWebhookInfo() {
  try {
    initBot();
    if (!Bot) {
      throw new Error('Объект бота не инициализирован. Невозможно получить информацию о Webhook.');
    }
    return Bot.getWebhookInfo();
  } catch (e) {
    return { error: true, message: e.message };
  }
}

/**
 * Удаляет Webhook.
 */
function deleteWebhook() {
  initBot();
  if (!Bot) {
    throw new Error('Объект бота не инициализирован. Невозможно удалить Webhook.');
  }
  return Bot.deleteWebhook();
}
