/**
 * Контекстное меню для тестирования Telegram бота в Google Таблицах
 * Создает красивое модальное окно с настройками и функциями
 */

// Конфигурация бота
const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE";
const WEBAPP_URL = "YOUR_WEBAPP_URL_HERE";

const Bot = TGbot.bot({ 
  botToken: BOT_TOKEN, 
  webAppUrl: WEBAPP_URL,
  logRequest: true 
});

const ss = SpreadsheetApp.getActiveSpreadsheet();

/**
 * Создание контекстного меню
 */

/**
 * Показать главную панель тестирования
 */
function showTelegramTestPanel() {
  const html = HtmlService.createHtmlOutput(`
    <!DOCTYPE html>
    <html>
    <head>
      <base target="_top">
      <meta charset="utf-8">
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #333;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 300;
        }
        .content {
          padding: 30px;
        }
        .section {
          margin-bottom: 30px;
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          background: #fafafa;
        }
        .section h3 {
          margin-top: 0;
          color: #667eea;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
          color: #555;
        }
        input, textarea, select {
          width: 100%;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s;
          box-sizing: border-box;
        }
        input:focus, textarea:focus, select:focus {
          border-color: #667eea;
          outline: none;
        }
        .btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: transform 0.2s;
          margin: 5px;
        }
        .btn:hover {
          transform: translateY(-2px);
        }
        .btn-secondary {
          background: #6c757d;
        }
        .btn-success {
          background: #28a745;
        }
        .btn-warning {
          background: #ffc107;
          color: #333;
        }
        .btn-danger {
          background: #dc3545;
        }
        .chat-id-input {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .chat-id-input input {
          flex: 1;
        }
        .quick-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }
        .quick-action {
          background: white;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          text-align: center;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .quick-action:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .status {
          padding: 10px;
          border-radius: 5px;
          margin: 10px 0;
          font-weight: 600;
        }
        .status.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .status.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        .status.info {
          background: #d1ecf1;
          color: #0c5460;
          border: 1px solid #bee5eb;
        }
        .tabs {
          display: flex;
          border-bottom: 2px solid #e0e0e0;
          margin-bottom: 20px;
        }
        .tab {
          padding: 10px 20px;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s;
        }
        .tab.active {
          border-bottom-color: #667eea;
          color: #667eea;
          font-weight: 600;
        }
        .tab-content {
          display: none;
        }
        .tab-content.active {
          display: block;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🤖 Telegram Bot Test Panel</h1>
          <p>Панель тестирования Telegram бота</p>
        </div>
        
        <div class="content">
          <div class="tabs">
            <div class="tab active" onclick="switchTab('messages')">💬 Сообщения</div>
            <div class="tab" onclick="switchTab('media')">📷 Медиа</div>
            <div class="tab" onclick="switchTab('keyboards')">⌨️ Клавиатуры</div>
            <div class="tab" onclick="switchTab('polls')">📊 Опросы</div>
            <div class="tab" onclick="switchTab('settings')">⚙️ Настройки</div>
          </div>
          
          <!-- Вкладка сообщений -->
          <div id="messages" class="tab-content active">
            <div class="section">
              <h3>📝 Отправка сообщений</h3>
              
              <div class="form-group">
                <label>Chat ID получателя:</label>
                <div class="chat-id-input">
                  <input type="text" id="chatId" placeholder="Введите Chat ID">
                  <button class="btn btn-secondary" onclick="getMyChatId()">Мой ID</button>
                </div>
              </div>
              
              <div class="form-group">
                <label>Текст сообщения:</label>
                <textarea id="messageText" rows="4" placeholder="Введите текст сообщения..."></textarea>
              </div>
              
              <div class="form-group">
                <label>Тип разметки:</label>
                <select id="parseMode">
                  <option value="HTML">HTML</option>
                  <option value="MarkdownV2">Markdown V2</option>
                  <option value="">Без разметки</option>
                </select>
              </div>
              
              <button class="btn" onclick="sendMessage()">📤 Отправить сообщение</button>
              <button class="btn btn-secondary" onclick="sendWelcomeMessage()">👋 Приветствие</button>
              <button class="btn btn-warning" onclick="sendHelpMessage()">❓ Справка</button>
            </div>
            
            <div class="section">
              <h3>⚡ Быстрые действия</h3>
              <div class="quick-actions">
                <div class="quick-action" onclick="quickAction('start')">
                  <h4>🚀 /start</h4>
                  <p>Команда запуска</p>
                </div>
                <div class="quick-action" onclick="quickAction('help')">
                  <h4>❓ /help</h4>
                  <p>Справка</p>
                </div>
                <div class="quick-action" onclick="quickAction('stats')">
                  <h4>📊 /stats</h4>
                  <p>Статистика</p>
                </div>
                <div class="quick-action" onclick="quickAction('users')">
                  <h4>👥 /users</h4>
                  <p>Пользователи</p>
                </div>
              </div>
            </div>
          </div>
          
          <div id="status"></div>
        </div>
      </div>
      
      <script>
        // Переключение вкладок
        function switchTab(tabName) {
          document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
          });
          document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
          });
          
          document.getElementById(tabName).classList.add('active');
          event.target.classList.add('active');
        }
        
        // Отправка сообщения
        function sendMessage() {
          const chatId = document.getElementById('chatId').value;
          const text = document.getElementById('messageText').value;
          const parseMode = document.getElementById('parseMode').value;
          
          if (!chatId || !text) {
            showStatus('Введите Chat ID и текст сообщения', 'error');
            return;
          }
          
          google.script.run
            .withSuccessHandler(() => showStatus('Сообщение отправлено!', 'success'))
            .withFailureHandler(error => showStatus('Ошибка: ' + error, 'error'))
            .sendTestMessage(chatId, text, parseMode);
        }
        
        // Быстрые действия
        function quickAction(action) {
          const chatId = document.getElementById('chatId').value;
          if (!chatId) {
            showStatus('Введите Chat ID', 'error');
            return;
          }
          
          google.script.run
            .withSuccessHandler(() => showStatus('Команда отправлена!', 'success'))
            .withFailureHandler(error => showStatus('Ошибка: ' + error, 'error'))
            .sendQuickAction(chatId, action);
        }
        
        // Получить мой Chat ID
        function getMyChatId() {
          google.script.run
            .withSuccessHandler(chatId => {
              document.getElementById('chatId').value = chatId;
              showStatus('Chat ID скопирован', 'info');
            })
            .withFailureHandler(error => showStatus('Ошибка: ' + error, 'error'))
            .getMyChatId();
        }
        
        // Отправка приветствия
        function sendWelcomeMessage() {
          const chatId = document.getElementById('chatId').value;
          if (!chatId) {
            showStatus('Введите Chat ID', 'error');
            return;
          }
          
          google.script.run
            .withSuccessHandler(() => showStatus('Приветствие отправлено!', 'success'))
            .withFailureHandler(error => showStatus('Ошибка: ' + error, 'error'))
            .sendWelcomeMessage(chatId);
        }
        
        // Отправка справки
        function sendHelpMessage() {
          const chatId = document.getElementById('chatId').value;
          if (!chatId) {
            showStatus('Введите Chat ID', 'error');
            return;
          }
          
          google.script.run
            .withSuccessHandler(() => showStatus('Справка отправлена!', 'success'))
            .withFailureHandler(error => showStatus('Ошибка: ' + error, 'error'))
            .sendHelpMessage(chatId);
        }
        
        // Показать статус
        function showStatus(message, type) {
          const statusDiv = document.getElementById('status');
          statusDiv.innerHTML = '<div class="status ' + type + '">' + message + '</div>';
          
          setTimeout(() => {
            statusDiv.innerHTML = '';
          }, 5000);
        }
      </script>
    </body>
    </html>
  `)
  .setWidth(900)
  .setHeight(700);
  
  SpreadsheetApp.getUi().showModalDialog(html, '🤖 Telegram Bot Test Panel');
}

// ===== ФУНКЦИИ ДЛЯ HTML =====

/**
 * Отправка тестового сообщения
 */
function sendTestMessage(chatId, text, parseMode) {
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
  // В реальном приложении здесь нужно получить Chat ID из контекста
  // Для демонстрации возвращаем тестовый ID
  return "YOUR_CHAT_ID_HERE";
}

/**
 * Отправка приветственного сообщения
 */
function sendWelcomeMessage(chatId) {
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
  const html = HtmlService.createHtmlOutput(`
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h2>⚙️ Настройки бота</h2>
      <p><strong>Токен:</strong> ${BOT_TOKEN ? 'Установлен' : 'Не установлен'}</p>
      <p><strong>WebApp URL:</strong> ${WEBAPP_URL ? 'Установлен' : 'Не установлен'}</p>
      <p><strong>Статус:</strong> ${BOT_TOKEN && WEBAPP_URL ? 'Готов к работе' : 'Требует настройки'}</p>
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
  try {
    const testChatId = "YOUR_TEST_CHAT_ID"; // Замените на ваш Chat ID
    
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
      const Keyboard = TGbot.keyboard();
      const Key = TGbot.key();
      
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