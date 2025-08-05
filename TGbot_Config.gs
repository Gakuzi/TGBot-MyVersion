/**
 * Конфигурация библиотеки TGbot
 * ID библиотеки: 1LyGnqsaphk-K_EB8ZxqcBRiKXRE2TY8oSHWlZn4HBje1WlmoNk51wGeg
 * Версия: 89
 */

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