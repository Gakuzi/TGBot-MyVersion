/**
 * Конфигурация библиотеки TGbot
 * ID библиотеки: 1LyGnqsaphk-K_EB8ZxqcBRiKXRE2TY8oSHWlZn4HBje1WlmoNk51wGeg
 * Версия: 89
 */

// Глобальные переменные
let Bot = null;
let TGbot = null;

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
    return false;
  }
}

/**
 * Получение информации о боте
 */
function getBotInfo() {
  if (!Bot) {
    if (!initializeBot()) {
      return null;
    }
  }
  
  try {
    return Bot.getMe();
  } catch (error) {
    console.error('Ошибка получения информации о боте:', error.message);
    return null;
  }
}

/**
 * Получение полной информации о боте и доступных методах
 */
function getBotFullInfo() {
  if (!Bot) {
    if (!initializeBot()) {
      return null;
    }
  }
  
  try {
    return Bot.info();
  } catch (error) {
    console.error('Ошибка получения полной информации о боте:', error.message);
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
 * Очистка бота при зависании
 */
function clearBot() {
  try {
    deleteWebhook();
    getUpdates();
    setWebhook();
    return { success: true, message: 'Бот очищен и перезапущен' };
  } catch (error) {
    console.error('Ошибка очистки бота:', error.message);
    return { success: false, message: error.message };
  }
}

/**
 * Проверка подключения библиотеки
 */
function testLibraryConnection() {
  try {
    // Проверяем доступность TGbot
    if (typeof TGbot === 'undefined') {
      return { success: false, message: 'Библиотека TGbot не подключена' };
    }
    
    // Проверяем доступность основных функций
    if (typeof TGbot.bot !== 'function') {
      return { success: false, message: 'Функция TGbot.bot недоступна' };
    }
    
    if (typeof TGbot.keyboard !== 'function') {
      return { success: false, message: 'Функция TGbot.keyboard недоступна' };
    }
    
    if (typeof TGbot.calendar !== 'function') {
      return { success: false, message: 'Функция TGbot.calendar недоступна' };
    }
    
    return { success: true, message: 'Библиотека TGbot подключена корректно' };
  } catch (error) {
    return { success: false, message: `Ошибка проверки библиотеки: ${error.message}` };
  }
}

/**
 * Получение списка доступных методов бота
 */
function getAvailableMethods() {
  const methods = {
    // Основные методы
    'getMe': 'Получение информации о боте',
    'getToken': 'Получение токена бота',
    'info': 'Полная информация о боте',
    
    // Webhook методы
    'setWebhook': 'Установка webhook',
    'getWebhookInfo': 'Информация о webhook',
    'deleteWebhook': 'Удаление webhook',
    'getUpdates': 'Получение обновлений',
    
    // Сообщения
    'sendMessage': 'Отправка сообщения',
    'editMessageText': 'Редактирование сообщения',
    'deleteMessage': 'Удаление сообщения',
    'replyMessage': 'Ответ на сообщение',
    'answerMessage': 'Ответ пользователю',
    
    // Медиа файлы
    'sendPhoto': 'Отправка фото',
    'sendVideo': 'Отправка видео',
    'sendDocument': 'Отправка документа',
    'sendAudio': 'Отправка аудио',
    'sendVoice': 'Отправка голосового',
    'sendVideoNote': 'Отправка видео-заметки',
    'sendAnimation': 'Отправка GIF',
    'sendSticker': 'Отправка стикера',
    
    // Группы медиа
    'sendMediaGroup': 'Отправка группы медиа',
    
    // Клавиатуры
    'keyboard': 'Создание клавиатуры',
    'key': 'Создание кнопки',
    
    // Календарь
    'calendar': 'Встроенный календарь',
    
    // Опросы
    'sendPoll': 'Отправка опроса',
    'stopPoll': 'Остановка опроса',
    
    // Файлы
    'getFile': 'Получение информации о файле',
    'getPath': 'Получение пути к файлу',
    'getFileDownloadUrl': 'Получение ссылки для скачивания',
    
    // Команды
    'setMyCommands': 'Установка команд бота',
    'getMyCommands': 'Получение команд бота',
    'deleteMyCommands': 'Удаление команд бота'
  };
  
  return methods;
}

/**
 * Логирование действий бота
 */
function logBotAction(action, data = null, success = true) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
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