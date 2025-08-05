/**
 * Главный файл Telegram Bot
 * Интеграция с библиотекой TGbot
 */

// Глобальные переменные
const ss = SpreadsheetApp.getActiveSpreadsheet();
let Bot = null;
let TGbot = null;

// Шаблоны листов
const SHEET_TEMPLATES = {
  'Messages': ['Дата', 'ID Пользователя', 'Имя', 'Сообщение', 'Тип', 'Message ID'],
  'Users': ['ID Пользователя', 'Имя', 'Фамилия', 'Ник', 'Язык', 'Дата добавления', 'Последняя активность'],
  'Debug': ['Дата', 'Данные', 'Тип'],
  'Errors': ['Дата', 'Ошибка', 'Функция', 'Данные'],
  'BotLog': ['Дата', 'Действие', 'Данные', 'Статус', 'Ошибка']
};

/**
 * Создает кастомное меню при открытии таблицы
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🤖 Telegram Bot')
    .addItem('🚀 Расширенная панель', 'showAdvancedTelegramUI')
    .addSeparator()
    .addItem('⚙️ Настройки', 'showSettings')
    .addItem('📊 Статистика', 'showStatistics')
    .addItem('🔄 Очистить бота', 'clearBot')
    .addToUi();
}

/**
 * Инициализация бота с настройками из Properties
 */
function initializeBot() {
  try {
    const properties = PropertiesService.getScriptProperties();
    const botToken = properties.getProperty('BOT_TOKEN');
    const webAppUrl = properties.getProperty('WEBAPP_URL');
    
    if (!botToken) {
      throw new Error('Токен бота не настроен. Перейдите в "Настройки" для настройки.');
    }
    
    // Инициализация библиотеки TGbot
    Bot = TGbot.bot({ 
      botToken: botToken, 
      webAppUrl: webAppUrl || null,
      logRequest: true,
      parseMode: "HTML"
    });
    
    console.log('Бот успешно инициализирован');
    return true;
  } catch (error) {
    console.error('Ошибка инициализации бота:', error.message);
    logError('initializeBot', error.message, { botToken: '***' });
    return false;
  }
}

/**
 * Открытие расширенного интерфейса
 */
function showAdvancedTelegramUI() {
  const html = HtmlService.createHtmlOutputFromFile('Telegram_Advanced_UI.html')
    .setWidth(1400)
    .setHeight(900);
  SpreadsheetApp.getUi().showModalDialog(html, 'Расширенная панель Telegram Bot');
}

/**
 * Открытие настроек
 */
function showSettings() {
  const html = HtmlService.createHtmlOutputFromFile('Telegram_Advanced_UI.html')
    .setWidth(800)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Настройки Telegram Bot');
}

/**
 * Открытие статистики
 */
function showStatistics() {
  try {
    const stats = getUsageStatistics();
    const ui = SpreadsheetApp.getUi();
    
    let message = '📊 Статистика использования бота:\n\n';
    if (stats.success) {
      message += `Всего действий: ${stats.data.totalActions}\n`;
      message += `Успешных: ${stats.data.successfulActions}\n`;
      message += `Процент успеха: ${stats.data.successRate}%\n`;
    } else {
      message += `Ошибка загрузки статистики: ${stats.error}`;
    }
    
    ui.alert('Статистика', message, ui.ButtonSet.OK);
  } catch (error) {
    const ui = SpreadsheetApp.getUi();
    ui.alert('Ошибка', `Ошибка загрузки статистики: ${error.message}`, ui.ButtonSet.OK);
  }
}

/**
 * Очистка бота при зависании
 */
function clearBot() {
  try {
    if (!Bot) {
      if (!initializeBot()) {
        throw new Error('Не удалось инициализировать бота');
      }
    }
    
    const properties = PropertiesService.getScriptProperties();
    const webAppUrl = properties.getProperty('WEBAPP_URL');
    
    let results = {};
    
    try {
      results.deleteResult = Bot.deleteWebhook();
    } catch (error) {
      results.deleteError = error.message;
    }
    
    try {
      results.updatesResult = Bot.getUpdates({});
    } catch (error) {
      results.updatesError = error.message;
    }
    
    if (webAppUrl) {
      try {
        results.setResult = Bot.setWebhook({
          url: webAppUrl,
          max_connections: 50,
          allowed_updates: ["message", "callback_query"],
          drop_pending_updates: false
        });
      } catch (error) {
        results.setError = error.message;
      }
    }
    
    logBotAction('clearBot', results, true);
    
    SpreadsheetApp.getUi().alert(
      'Очистка завершена',
      'Бот очищен и перезапущен успешно!',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  } catch (error) {
    logError('clearBot', error.message);
    SpreadsheetApp.getUi().alert(
      'Ошибка очистки',
      `Ошибка: ${error.message}`,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

// ===== ФУНКЦИИ ДЛЯ СООБЩЕНИЙ =====

/**
 * Отправка текстового сообщения
 */
function sendTextMessage(chatId, text, parseMode = 'HTML', disablePreview = false) {
  try {
    if (!Bot) {
      if (!initializeBot()) {
        throw new Error('Не удалось инициализировать бота');
      }
    }
    
    const response = Bot.sendMessage({
      chat_id: chatId,
      text: text,
      parse_mode: parseMode,
      disable_web_page_preview: disablePreview
    });
    
    logBotAction('sendTextMessage', { chatId, text, parseMode }, true);
    return { success: true, data: response };
  } catch (error) {
    logBotAction('sendTextMessage', { chatId, text, error: error.message }, false);
    return { success: false, error: error.message };
  }
}

/**
 * Редактирование сообщения
 */
function editMessage(chatId, messageId, text, parseMode = 'HTML') {
  try {
    if (!Bot) {
      if (!initializeBot()) {
        throw new Error('Не удалось инициализировать бота');
      }
    }
    
    const response = Bot.editMessageText({
      chat_id: chatId,
      message_id: messageId,
      text: text,
      parse_mode: parseMode
    });
    
    logBotAction('editMessage', { chatId, messageId, text }, true);
    return { success: true, data: response };
  } catch (error) {
    logBotAction('editMessage', { chatId, messageId, text, error: error.message }, false);
    return { success: false, error: error.message };
  }
}

/**
 * Удаление сообщения
 */
function deleteMessage(chatId, messageId) {
  try {
    if (!Bot) {
      if (!initializeBot()) {
        throw new Error('Не удалось инициализировать бота');
      }
    }
    
    const response = Bot.deleteMessage({
      chat_id: chatId,
      message_id: messageId
    });
    
    logBotAction('deleteMessage', { chatId, messageId }, true);
    return { success: true, data: response };
  } catch (error) {
    logBotAction('deleteMessage', { chatId, messageId, error: error.message }, false);
    return { success: false, error: error.message };
  }
}

// ===== ФУНКЦИИ ДЛЯ МЕДИА =====

/**
 * Отправка фото
 */
function sendPhoto(chatId, photoBlob, caption = '', parseMode = 'HTML') {
  try {
    if (!Bot) {
      if (!initializeBot()) {
        throw new Error('Не удалось инициализировать бота');
      }
    }
    
    const response = Bot.sendPhoto({
      chat_id: chatId,
      photo: photoBlob,
      caption: caption,
      parse_mode: parseMode,
      contentType: "multipart/form-data"
    });
    
    logBotAction('sendPhoto', { chatId, caption }, true);
    return { success: true, data: response };
  } catch (error) {
    logBotAction('sendPhoto', { chatId, caption, error: error.message }, false);
    return { success: false, error: error.message };
  }
}

/**
 * Отправка видео
 */
function sendVideo(chatId, videoBlob, caption = '', parseMode = 'HTML') {
  try {
    if (!Bot) {
      if (!initializeBot()) {
        throw new Error('Не удалось инициализировать бота');
      }
    }
    
    const response = Bot.sendVideo({
      chat_id: chatId,
      video: videoBlob,
      caption: caption,
      parse_mode: parseMode,
      contentType: "multipart/form-data"
    });
    
    logBotAction('sendVideo', { chatId, caption }, true);
    return { success: true, data: response };
  } catch (error) {
    logBotAction('sendVideo', { chatId, caption, error: error.message }, false);
    return { success: false, error: error.message };
  }
}

/**
 * Отправка документа
 */
function sendDocument(chatId, documentBlob, caption = '', parseMode = 'HTML') {
  try {
    if (!Bot) {
      if (!initializeBot()) {
        throw new Error('Не удалось инициализировать бота');
      }
    }
    
    const response = Bot.sendDocument({
      chat_id: chatId,
      document: documentBlob,
      caption: caption,
      parse_mode: parseMode,
      contentType: "multipart/form-data"
    });
    
    logBotAction('sendDocument', { chatId, caption }, true);
    return { success: true, data: response };
  } catch (error) {
    logBotAction('sendDocument', { chatId, caption, error: error.message }, false);
    return { success: false, error: error.message };
  }
}

/**
 * Отправка аудио
 */
function sendAudio(chatId, audioBlob, caption = '', parseMode = 'HTML') {
  try {
    if (!Bot) {
      if (!initializeBot()) {
        throw new Error('Не удалось инициализировать бота');
      }
    }
    
    const response = Bot.sendAudio({
      chat_id: chatId,
      audio: audioBlob,
      caption: caption,
      parse_mode: parseMode,
      contentType: "multipart/form-data"
    });
    
    logBotAction('sendAudio', { chatId, caption }, true);
    return { success: true, data: response };
  } catch (error) {
    logBotAction('sendAudio', { chatId, caption, error: error.message }, false);
    return { success: false, error: error.message };
  }
}

/**
 * Отправка голосового сообщения
 */
function sendVoice(chatId, voiceBlob, caption = '') {
  try {
    if (!Bot) {
      if (!initializeBot()) {
        throw new Error('Не удалось инициализировать бота');
      }
    }
    
    const response = Bot.sendVoice({
      chat_id: chatId,
      voice: voiceBlob,
      caption: caption,
      contentType: "multipart/form-data"
    });
    
    logBotAction('sendVoice', { chatId, caption }, true);
    return { success: true, data: response };
  } catch (error) {
    logBotAction('sendVoice', { chatId, caption, error: error.message }, false);
    return { success: false, error: error.message };
  }
}

// ===== ФУНКЦИИ ДЛЯ КЛАВИАТУР =====

/**
 * Создание и отправка клавиатуры
 */
function sendKeyboard(chatId, text, buttons, keyboardType = 'reply', parseMode = 'HTML') {
  try {
    if (!Bot) {
      if (!initializeBot()) {
        throw new Error('Не удалось инициализировать бота');
      }
    }
    
    const Keyboard = TGbot.keyboard();
    let replyMarkup;
    
    if (keyboardType === 'reply') {
      replyMarkup = Keyboard.make(buttons, { columns: 2 }).reply();
    } else if (keyboardType === 'inline') {
      replyMarkup = Keyboard.make(buttons, { columns: 2 }).inline();
    } else if (keyboardType === 'remove') {
      replyMarkup = Keyboard.remove();
    }
    
    const response = Bot.sendMessage({
      chat_id: chatId,
      text: text,
      parse_mode: parseMode,
      reply_markup: replyMarkup
    });
    
    logBotAction('sendKeyboard', { chatId, text, keyboardType }, true);
    return { success: true, data: response };
  } catch (error) {
    logBotAction('sendKeyboard', { chatId, text, keyboardType, error: error.message }, false);
    return { success: false, error: error.message };
  }
}

// ===== ФУНКЦИИ ДЛЯ КАЛЕНДАРЯ =====

/**
 * Отправка календаря
 */
function sendCalendar(chatId, text = 'Выберите дату:') {
  try {
    if (!Bot) {
      if (!initializeBot()) {
        throw new Error('Не удалось инициализировать бота');
      }
    }
    
    const response = Bot.sendMessage({
      chat_id: chatId,
      text: text,
      reply_markup: TGbot.calendar({})
    });
    
    logBotAction('sendCalendar', { chatId, text }, true);
    return { success: true, data: response };
  } catch (error) {
    logBotAction('sendCalendar', { chatId, text, error: error.message }, false);
    return { success: false, error: error.message };
  }
}

// ===== ФУНКЦИИ ДЛЯ ОПРОСОВ =====

/**
 * Отправка опроса
 */
function sendPoll(chatId, question, options, isQuiz = false, correctOption = null, explanation = '') {
  try {
    if (!Bot) {
      if (!initializeBot()) {
        throw new Error('Не удалось инициализировать бота');
      }
    }
    
    const pollData = {
      chat_id: chatId,
      question: question,
      options: options
    };
    
    if (isQuiz) {
      pollData.type = "quiz";
      pollData.is_anonymous = false;
      if (correctOption !== null) {
        pollData.correct_option_id = correctOption;
      }
      if (explanation) {
        pollData.explanation = explanation;
      }
    }
    
    const response = Bot.sendPoll(pollData);
    
    logBotAction('sendPoll', { chatId, question, isQuiz }, true);
    return { success: true, data: response };
  } catch (error) {
    logBotAction('sendPoll', { chatId, question, isQuiz, error: error.message }, false);
    return { success: false, error: error.message };
  }
}

/**
 * Остановка опроса
 */
function stopPoll(chatId, messageId) {
  try {
    if (!Bot) {
      if (!initializeBot()) {
        throw new Error('Не удалось инициализировать бота');
      }
    }
    
    const response = Bot.stopPoll({
      chat_id: chatId,
      message_id: messageId
    });
    
    logBotAction('stopPoll', { chatId, messageId }, true);
    return { success: true, data: response };
  } catch (error) {
    logBotAction('stopPoll', { chatId, messageId, error: error.message }, false);
    return { success: false, error: error.message };
  }
}

// ===== ФУНКЦИИ ДЛЯ РАБОТЫ С ЧАТОМ =====

/**
 * Получение истории сообщений пользователя
 */
function getUserChatHistory(userId, limit = 50) {
  try {
    const messagesSheet = ss.getSheetByName('Messages');
    
    if (!messagesSheet) {
      return { success: false, error: 'Лист Messages не найден' };
    }
    
    const data = messagesSheet.getDataRange().getValues();
    if (data.length < 2) {
      return { success: true, data: [] };
    }
    
    const headers = data[0];
    const idIndex = headers.indexOf('ID Пользователя');
    const messageIndex = headers.indexOf('Сообщение');
    const dateIndex = headers.indexOf('Дата');
    
    if (idIndex === -1 || messageIndex === -1) {
      return { success: false, error: 'Неверная структура листа Messages' };
    }
    
    const userMessages = data.slice(1)
      .filter(row => row[idIndex] == userId)
      .map(row => ({
        date: row[dateIndex] || new Date(),
        message: row[messageIndex] || '',
        userId: row[idIndex]
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
    
    return { success: true, data: userMessages };
  } catch (error) {
    logError('getUserChatHistory', error.message, { userId });
    return { success: false, error: error.message };
  }
}

/**
 * Сохранение сообщения в таблицу
 */
function saveMessageToSheet(messageData) {
  try {
    const messagesSheet = ss.getSheetByName('Messages') || ss.insertSheet('Messages');
    
    // Создаем заголовки если лист пустой
    if (messagesSheet.getLastRow() === 0) {
      messagesSheet.getRange(1, 1, 1, 6).setValues([['Дата', 'ID Пользователя', 'Имя', 'Сообщение', 'Тип', 'Message ID']]);
    }
    
    messagesSheet.appendRow([
      new Date(),
      messageData.userId,
      messageData.userName || '',
      messageData.message || '',
      messageData.type || 'text',
      messageData.messageId || ''
    ]);
    
    return { success: true };
  } catch (error) {
    logError('saveMessageToSheet', error.message, messageData);
    return { success: false, error: error.message };
  }
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====

/**
 * Проверка статуса бота
 */
function checkBotStatus() {
  try {
    // Проверяем доступность TGbot
    if (typeof TGbot === 'undefined') {
      return { success: false, error: 'Библиотека TGbot не подключена' };
    }
    
    // Проверяем доступность основных функций
    if (typeof TGbot.bot !== 'function') {
      return { success: false, error: 'Функция TGbot.bot недоступна' };
    }
    
    if (!Bot) {
      const initResult = initializeBot();
      if (!initResult) {
        return { success: false, error: 'Не удалось инициализировать бота' };
      }
    }
    
    try {
      const botInfo = Bot.getMe();
      if (!botInfo || !botInfo.result) {
        return { success: false, error: 'Не удалось получить информацию о боте' };
      }
      
      return { 
        success: true, 
        data: {
          botName: botInfo.result.first_name || 'Неизвестно',
          botUsername: botInfo.result.username || 'Неизвестно',
          libraryVersion: '89',
          webhookInfo: Bot.getWebhookInfo()
        }
      };
    } catch (botError) {
      return { success: false, error: `Ошибка получения информации о боте: ${botError.message}` };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Получение статистики использования
 */
function getUsageStatistics() {
  try {
    const logSheet = ss.getSheetByName('BotLog');
    
    if (!logSheet || logSheet.getLastRow() === 0) {
      return { success: true, data: { totalActions: 0, successRate: 0, recentActions: [] } };
    }
    
    const data = logSheet.getDataRange().getValues();
    const headers = data[0];
    const actionIndex = headers.indexOf('Действие');
    const statusIndex = headers.indexOf('Статус');
    const dateIndex = headers.indexOf('Дата');
    
    if (actionIndex === -1 || statusIndex === -1 || dateIndex === -1) {
      return { success: false, error: 'Неверная структура листа BotLog' };
    }
    
    const actions = data.slice(1);
    const totalActions = actions.length;
    const successfulActions = actions.filter(row => row[statusIndex] === 'Успешно').length;
    const successRate = totalActions > 0 ? (successfulActions / totalActions * 100).toFixed(1) : 0;
    
    // Последние 10 действий
    const recentActions = actions
      .slice(-10)
      .reverse()
      .map(row => ({
        date: row[dateIndex],
        action: row[actionIndex],
        status: row[statusIndex]
      }));
    
    return {
      success: true,
      data: {
        totalActions,
        successfulActions,
        successRate,
        recentActions
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Логирование действий бота
 */
function logBotAction(action, data = null, success = true) {
  try {
    const logSheet = ss.getSheetByName('BotLog') || ss.insertSheet('BotLog');
    
    // Создаем заголовки если лист пустой
    if (logSheet.getLastRow() === 0) {
      logSheet.getRange(1, 1, 1, 5).setValues([['Дата', 'Действие', 'Данные', 'Статус', 'Ошибка']]);
    }
    
    const timestamp = new Date();
    const status = success ? 'Успешно' : 'Ошибка';
    const error = success ? '' : (data?.message || data);
    
    logSheet.appendRow([timestamp, action, JSON.stringify(data), status, error]);
  } catch (error) {
    console.error('Ошибка логирования:', error.message);
  }
}

/**
 * Логирование ошибок
 */
function logError(functionName, errorMessage, data = null) {
  try {
    const errorSheet = ss.getSheetByName('Errors') || ss.insertSheet('Errors');
    
    // Создаем заголовки если лист пустой
    if (errorSheet.getLastRow() === 0) {
      errorSheet.getRange(1, 1, 1, 4).setValues([['Дата', 'Ошибка', 'Функция', 'Данные']]);
    }
    
    errorSheet.appendRow([new Date(), errorMessage, functionName, JSON.stringify(data)]);
  } catch (error) {
    console.error('Ошибка логирования ошибки:', error.message);
  }
}

/**
 * Получение списка пользователей
 */
function getUsersList() {
  try {
    const usersSheet = ss.getSheetByName('Users');
    if (!usersSheet) {
      return [];
    }
    
    const data = usersSheet.getDataRange().getValues();
    if (data.length < 2) {
      return [];
    }
    
    const headers = data[0];
    const idIndex = headers.indexOf('ID Пользователя');
    const nameIndex = headers.indexOf('Имя');
    const lastNameIndex = headers.indexOf('Фамилия');
    const nickIndex = headers.indexOf('Ник');
    
    if (idIndex === -1 || nameIndex === -1) {
      return [];
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
  } catch (error) {
    logError('getUsersList', error.message);
    return [];
  }
}

/**
 * Сохранение настроек
 */
function saveSettings(settings) {
  try {
    const properties = PropertiesService.getScriptProperties();
    
    if (settings.BOT_TOKEN) {
      properties.setProperty('BOT_TOKEN', settings.BOT_TOKEN);
    }
    
    if (settings.WEBAPP_URL) {
      properties.setProperty('WEBAPP_URL', settings.WEBAPP_URL);
    }
    
    logBotAction('saveSettings', { BOT_TOKEN: '***', WEBAPP_URL: settings.WEBAPP_URL }, true);
    return { success: true, data: { BOT_TOKEN: settings.BOT_TOKEN, WEBAPP_URL: settings.WEBAPP_URL } };
  } catch (error) {
    logError('saveSettings', error.message, settings);
    return { success: false, error: error.message };
  }
}

/**
 * Получение настроек
 */
function getSettings() {
  try {
    const properties = PropertiesService.getScriptProperties();
    return {
      BOT_TOKEN: properties.getProperty('BOT_TOKEN') || '',
      WEBAPP_URL: properties.getProperty('WEBAPP_URL') || ''
    };
  } catch (error) {
    logError('getSettings', error.message);
    return { BOT_TOKEN: '', WEBAPP_URL: '' };
  }
}

/**
 * Webhook обработчик
 */
function doPost(e) {
  try {
    if (e?.postData?.contents) {
      const contents = JSON.parse(e.postData.contents);
      
      // Логируем входящие данные
      const debugSheet = ss.getSheetByName('Debug') || ss.insertSheet('Debug');
      if (debugSheet.getLastRow() === 0) {
        debugSheet.getRange(1, 1, 1, 3).setValues([['Дата', 'Данные', 'Тип']]);
      }
      debugSheet.appendRow([new Date(), JSON.stringify(contents), 'webhook']);
      
      if (contents.message) {
        const msg = contents.message;
        const text = msg.text;
        const chatId = msg.from.id;
        const userName = msg.from.first_name || '';
        const lastName = msg.from.last_name || '';
        const nick = msg.from.username || '';
        
        // Сохраняем сообщение
        saveMessageToSheet({
          userId: chatId,
          userName: [userName, lastName, nick].filter(Boolean).join(' '),
          message: text,
          type: 'incoming',
          messageId: msg.message_id
        });
        
        // Добавляем пользователя в список
        addUserToSheet({
          id: chatId,
          firstName: userName,
          lastName: lastName,
          username: nick
        });
        
        // Обрабатываем команды
        if (text && text.startsWith('/')) {
          handleCommand(msg);
        }
      }
    }
  } catch (error) {
    logError('doPost', error.message, { contents: e?.postData?.contents });
  }
}

/**
 * Обработка команд
 */
function handleCommand(msg) {
  const text = msg.text;
  const chatId = msg.from.id;
  
  switch (text) {
    case '/start':
      sendTextMessage(chatId, 'Привет! Я бот для тестирования. Используйте интерфейс для управления.');
      break;
    case '/help':
      sendTextMessage(chatId, 'Доступные команды:\n/start - Начать\n/help - Помощь\n/stats - Статистика');
      break;
    case '/stats':
      const stats = getUsageStatistics();
      if (stats.success) {
        sendTextMessage(chatId, `Статистика:\nВсего действий: ${stats.data.totalActions}\nУспешных: ${stats.data.successfulActions}\nПроцент успеха: ${stats.data.successRate}%`);
      }
      break;
    default:
      sendTextMessage(chatId, `Неизвестная команда: ${text}`);
  }
}

/**
 * Добавление пользователя в таблицу
 */
function addUserToSheet(userData) {
  try {
    const usersSheet = ss.getSheetByName('Users') || ss.insertSheet('Users');
    
    // Создаем заголовки если лист пустой
    if (usersSheet.getLastRow() === 0) {
      usersSheet.getRange(1, 1, 1, 7).setValues([['ID Пользователя', 'Имя', 'Фамилия', 'Ник', 'Язык', 'Дата добавления', 'Последняя активность']]);
    }
    
    // Проверяем, есть ли уже пользователь
    const data = usersSheet.getDataRange().getValues();
    const headers = data[0];
    const idIndex = headers.indexOf('ID Пользователя');
    
    if (idIndex !== -1) {
      const existingRow = data.slice(1).findIndex(row => row[idIndex] == userData.id);
      
      if (existingRow === -1) {
        // Добавляем нового пользователя
        usersSheet.appendRow([
          userData.id,
          userData.firstName || '',
          userData.lastName || '',
          userData.username || '',
          'ru',
          new Date(),
          new Date()
        ]);
      } else {
        // Обновляем последнюю активность
        const rowIndex = existingRow + 2;
        usersSheet.getRange(rowIndex, 7).setValue(new Date());
      }
    }
  } catch (error) {
    logError('addUserToSheet', error.message, userData);
  }
}

/**
 * Получение информации о webhook
 */
function getWebhookInfo() {
  if (!Bot) {
    if (!initializeBot()) {
      return null;
    }
  }
  
  try {
    return Bot.getWebhookInfo();
  } catch (error) {
    console.error('Ошибка получения информации о webhook:', error.message);
    return null;
  }
}

/**
 * Удаление webhook
 */
function deleteWebhook() {
  if (!Bot) {
    if (!initializeBot()) {
      return null;
    }
  }
  
  try {
    return Bot.deleteWebhook();
  } catch (error) {
    console.error('Ошибка удаления webhook:', error.message);
    return null;
  }
}

/**
 * Получение обновлений
 */
function getUpdates() {
  if (!Bot) {
    if (!initializeBot()) {
      return null;
    }
  }
  
  try {
    return Bot.getUpdates({});
  } catch (error) {
    console.error('Ошибка получения обновлений:', error.message);
    return null;
  }
}

/**
 * Установка webhook
 */
function setWebhook() {
  if (!Bot) {
    if (!initializeBot()) {
      return null;
    }
  }
  
  try {
    const properties = PropertiesService.getScriptProperties();
    const webAppUrl = properties.getProperty('WEBAPP_URL');
    
    if (!webAppUrl) {
      throw new Error('URL веб-приложения не настроен');
    }
    
    return Bot.setWebhook({
      url: webAppUrl,
      max_connections: 50,
      allowed_updates: ["message", "callback_query"],
      drop_pending_updates: false
    });
  } catch (error) {
    console.error('Ошибка установки webhook:', error.message);
    return null;
  }
}
