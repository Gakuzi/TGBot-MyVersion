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