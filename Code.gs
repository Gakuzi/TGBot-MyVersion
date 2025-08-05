var Bot = null;

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('🤖 Telegram Bot')
    .addItem('🔧 Настроить Telegram', 'openTelegramSettings')
    .addSeparator()
    .addItem('🧪 Открыть тестовое окно', 'showTelegramTestUI')
    .addItem('📨 Быстрое тестовое сообщение', 'sendQuickTestMessage')
    .addItem('📊 Быстрая статистика', 'showQuickStats')
    .addSeparator()
    .addItem('📂 Экспортировать данные', 'exportBotData')
    .addToUi();
}

function initBot() {
  var token = getBotToken();
  if (token) {
    Bot = new TGbot({ botToken: token });
  } else {
    SpreadsheetApp.getUi().alert('Токен не найден. Пожалуйста, настройте его в меню.');
  }
}

function openTelegramSettings() {
  var html = HtmlService.createHtmlOutputFromFile('telegram_settings.html')
    .setWidth(500).setHeight(400);
  SpreadsheetApp.getUi().showModalDialog(html, 'Настройки Telegram');
}

function showTelegramTestUI() {
  var html = HtmlService.createHtmlOutputFromFile('telegram_test_ui.html')
    .setWidth(1200).setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, 'Telegram Bot Test UI');
}

function saveTelegramSettings(token, webapp) {
  PropertiesService.getScriptProperties().setProperty('BOT_TOKEN', token);
  PropertiesService.getScriptProperties().setProperty('WEBAPP_URL', webapp);
  setWebhook();
}

function getTelegramSettings() {
  var token = PropertiesService.getScriptProperties().getProperty('BOT_TOKEN');
  var webapp = PropertiesService.getScriptProperties().getProperty('WEBAPP_URL');
  return { token: token, webapp: webapp };
}

function getBotToken() {
  return PropertiesService.getScriptProperties().getProperty('BOT_TOKEN');
}

function getWebAppUrl() {
  return PropertiesService.getScriptProperties().getProperty('WEBAPP_URL');
}

function setWebhook() {
  var token = getBotToken();
  var webapp = getWebAppUrl();
  if (token && webapp) {
    var bot = new TGbot({ botToken: token });
    var response = bot.setWebhook({ url: webapp });
    SpreadsheetApp.getUi().alert('Вебхук установлен: ' + JSON.stringify(response));
  } else {
    SpreadsheetApp.getUi().alert('Токен или WebApp URL не найдены в настройках.');
  }
}

function sendQuickTestMessage() {
  if (!Bot) initBot();
  var chatId = Browser.inputBox('Введите Chat ID для теста:');
  if (chatId && chatId !== 'cancel') {
    var res = Bot.sendMessage({ chat_id: chatId, text: 'Тестовое сообщение из Google Таблиц!' });
    SpreadsheetApp.getUi().alert('Сообщение отправлено!\n' + JSON.stringify(res));
  }
}

function showQuickStats() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Messages');
  var usersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');
  var totalMessages = sheet ? sheet.getLastRow() - 1 : 0;
  var totalUsers = usersSheet ? usersSheet.getLastRow() - 1 : 0;
  SpreadsheetApp.getUi().alert(
    '📊 Статистика:\n' +
    'Всего сообщений: ' + totalMessages + '\n' +
    'Пользователей: ' + totalUsers
  );
}

function exportBotData() {
  SpreadsheetApp.getUi().alert('Экспорт данных реализуйте по вашему сценарию!');
}