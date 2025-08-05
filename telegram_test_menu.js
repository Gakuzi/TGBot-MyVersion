/**
 * Контекстное меню для тестирования Telegram бота в Google Таблицах
 * Создает красивое модальное окно с настройками и функциями
 */

// Конфигурация бота
if (!Bot) {
  initBot();
}

const ss = SpreadsheetApp.getActiveSpreadsheet();

/**
 * Показать главную панель тестирования
 */
function showTelegramTestPanel() {
  const html = HtmlService.createHtmlOutputFromFile('telegram_test_ui.html')
    .setWidth(900)
    .setHeight(700);
  
  SpreadsheetApp.getUi().showModalDialog(html, '🤖 Telegram Bot Test Panel');
}

// ===== ФУНКЦИИ ДЛЯ HTML =====

/**
 * Отправка тестового сообщения
 */
function sendTestMessage(chatId, text, parseMode) {
  if (!Bot) initBot();
  try {
    const options = {
      chat_id: chatId,
      text: text
    };
    
    if (parseMode) {
      options.parse_mode = parseMode;
    }
    
    const response = Bot.sendMessage(options);
    console.log('Сообщение отправлено:', response);
    return response;
  } catch (error) {
    console.error('Ошибка отправки сообщения:', error);
    throw error;
  }
}

/**
 * Быстрые действия
 */
function sendQuickAction(chatId, action) {
  if (!Bot) initBot();
  try {
    let text = '';
    
    switch (action) {
      case 'start':
        text = '/start';
        break;
      case 'help':
        text = '/help';
        break;
      case 'stats':
        text = '/stats';
        break;
      case 'users':
        text = '/users';
        break;
    }
    
    const response = Bot.sendMessage({
      chat_id: chatId,
      text: text
    });
    
    console.log('Команда отправлена:', response);
    return response;
  } catch (error) {
    console.error('Ошибка отправки команды:', error);
    throw error;
  }
}

/**
 * Получить Chat ID пользователя
 */
function getMyChatId() {
  const chatId = Browser.inputBox('Введите ваш Chat ID:');
  if (chatId && chatId !== 'cancel') {
    return chatId;
  }
  return null;
}

/**
 * Отправка приветственного сообщения
 */
function sendWelcomeMessage(chatId) {
  if (!Bot) initBot();
  const text = `
🤖 <b>Добро пожаловать в тестовый бот!</b>

Это сообщение отправлено из панели тестирования Google Таблиц.

<b>Возможности:</b>
• Отправка сообщений
• Работа с медиафайлами
• Создание клавиатур
• Опросы и викторины
• Статистика и аналитика

<i>Создано с помощью библиотеки TGbot</i>
  `;
  
  return Bot.sendMessage({
    chat_id: chatId,
    text: text,
    parse_mode: "HTML"
  });
}

/**
 * Отправка справки
 */
function sendHelpMessage(chatId) {
  if (!Bot) initBot();
  const text = `
📚 <b>Справка по командам:</b>

<b>Основные команды:</b>
/start - Запуск бота
/help - Эта справка
/stats - Статистика
/users - Список пользователей

<b>Панель тестирования:</b>
• Отправка сообщений с разметкой
• Работа с медиафайлами
• Создание интерактивных клавиатур
• Опросы и викторины
• Экспорт данных

<b>Поддержка:</b>
Автор библиотеки: @nosaev_m
  `;
  
  return Bot.sendMessage({
    chat_id: chatId,
    text: text,
    parse_mode: "HTML"
  });
}

// ===== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ =====

/**
 * Показать настройки бота
 */
function showBotSettings() {
  if (!Bot) initBot();
  const token = getBotToken();
  const webapp = getWebAppUrl();
  const html = HtmlService.createHtmlOutput(`
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h2>⚙️ Настройки бота</h2>
      <p><strong>Токен:</strong> ${token ? 'Установлен' : 'Не установлен'}</p>
      <p><strong>WebApp URL:</strong> ${webapp ? 'Установлен' : 'Не установлен'}</p>
      <p><strong>Статус:</strong> ${token && webapp ? 'Готов к работе' : 'Требует настройки'}</p>
    </div>
  `)
  .setWidth(400)
  .setHeight(300);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Настройки бота');
}

/**
 * Показать быструю статистику
 */
function showQuickStats() {
  try {
    const messagesSheet = ss.getSheetByName("Messages");
    const usersSheet = ss.getSheetByName("Users");
    
    let totalMessages = 0;
    let totalUsers = 0;
    
    if (messagesSheet && messagesSheet.getLastRow() > 1) {
      totalMessages = messagesSheet.getLastRow() - 1;
    }
    
    if (usersSheet && usersSheet.getLastRow() > 1) {
      totalUsers = usersSheet.getLastRow() - 1;
    }
    
    const html = HtmlService.createHtmlOutput(`
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h2>📊 Быстрая статистика</h2>
        <p><strong>Всего сообщений:</strong> ${totalMessages}</p>
        <p><strong>Всего пользователей:</strong> ${totalUsers}</p>
        <p><strong>Дата:</strong> ${new Date().toLocaleDateString('ru-RU')}</p>
      </div>
    `)
    .setWidth(400)
    .setHeight(300);
    
    SpreadsheetApp.getUi().showModalDialog(html, 'Статистика');
  } catch (error) {
    SpreadsheetApp.getUi().alert('Ошибка загрузки статистики: ' + error.message);
  }
}

/**
 * Быстрый тест функций
 */
function runQuickTest() {
  if (!Bot) initBot();
  try {
    const testChatId = Browser.inputBox('Введите Chat ID для теста:');
    if (!testChatId || testChatId === 'cancel') return;
    
    // Тест 1: Простое сообщение
    Bot.sendMessage({
      chat_id: testChatId,
      text: "🧪 Тест 1: Простое сообщение"
    });
    
    // Тест 2: HTML сообщение
    setTimeout(() => {
      Bot.sendMessage({
        chat_id: testChatId,
        text: "<b>🧪 Тест 2:</b> <i>HTML сообщение</i>",
        parse_mode: "HTML"
      });
    }, 1000);
    
    // Тест 3: Inline клавиатура
    setTimeout(() => {
      const Keyboard = Bot.keyboard();
      const Key = Bot.key();
      
      const keyboard = Keyboard.make([
        [Key.callback("✅ Тест", "test"), Key.callback("❌ Отмена", "cancel")]
      ], { columns: 2 }).inline();
      
      Bot.sendMessage({
        chat_id: testChatId,
        text: "🧪 Тест 3: Inline клавиатура",
        reply_markup: keyboard
      });
    }, 2000);
    
    SpreadsheetApp.getUi().alert('Тесты запущены! Проверьте Telegram.');
  } catch (error) {
    SpreadsheetApp.getUi().alert('Ошибка тестирования: ' + error.message);
  }
}