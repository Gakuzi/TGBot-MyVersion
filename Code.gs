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
  const html = HtmlService.createHtmlOutputFromFile('SetupWizard.html')
    .setWidth(600)
    .setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(html, '🚀 Мастер Первоначальной Настройки');
}

/**
 * Открывает менеджер Webhook (часть Мастера Настройки).
 */
function showWebhookManager() {
  // Эта функция будет открывать мастер сразу на 4-м шаге.
  // Пока что она просто вызывает основной мастер.
  showSetupWizard(); 
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
  PropertiesService.getScriptProperties().setProperties(settings);
  return getSettings(); // Возвращаем обновленные настройки для UI
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
  const token = PropertiesService.getScriptProperties().getProperty('BOT_TOKEN');
  if (token) {
    Bot = new TGbot({ botToken: token });
  } else {
    throw new Error('Токен бота не найден. Запустите Мастер Настройки.');
  }
}

// --- Функции для работы с Webhook ---

/**
 * Устанавливает Webhook, используя сохраненный ID развертывания.
 */
function setWebhook() {
  if (!Bot) initBot();
  const deploymentId = PropertiesService.getScriptProperties().getProperty('DEPLOYMENT_ID');
  if (!deploymentId) {
    throw new Error('ID развертывания не найден. Запустите Мастер Настройки.');
  }
  const url = `https://script.google.com/macros/s/${deploymentId}/exec`;
  return Bot.setWebhook({ url: url });
}

/**
 * Получает информацию о Webhook.
 */
function getWebhookInfo() {
  if (!Bot) initBot();
  return Bot.getWebhookInfo();
}

/**
 * Удаляет Webhook.
 */
function deleteWebhook() {
  if (!Bot) initBot();
  return Bot.deleteWebhook();
}