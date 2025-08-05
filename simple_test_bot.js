/**
 * Простой тестовый Telegram бот для Google Таблиц
 * Упрощенная версия для быстрого тестирования
 */

// Получение активной таблицы
const ss = SpreadsheetApp.getActiveSpreadsheet();

/**
 * Основная функция webhook
 */
function doPost(e) {
  if (!Bot) initBot();
  try {
    if (e?.postData?.contents) {
      const contents = JSON.parse(e.postData.contents);
      
      // Логируем в таблицу
      logToSheet(contents, "Debug");
      
      if (contents.message) {
        const msg = contents.message;
        const text = msg.text;
        const chat_id = msg.from.id;
        const user_name = msg.from.first_name;
        
        console.log(`Сообщение от ${user_name}: ${text}`);
        
        // Сохраняем сообщение
        saveMessage(msg, user_name);
        
        // Обрабатываем команды
        if (text === "/start") {
          sendWelcome(chat_id, user_name);
        } else if (text === "/stats") {
          sendStats(chat_id);
        } else if (text === "/users") {
          sendUsers(chat_id);
        } else if (text === "/addme") {
          addUser(msg.from);
          Bot.sendMessage({
            chat_id: chat_id,
            text: "✅ Вы добавлены в список пользователей!"
          });
        } else {
          // Обычное сообщение
          Bot.sendMessage({
            chat_id: chat_id,
            text: `Привет, ${user_name}! 👋\n\nИспользуйте:\n/start - Начать\n/stats - Статистика\n/users - Пользователи\n/addme - Добавить себя`
          });
        }
      }
    }
  } catch (error) {
    console.error("Ошибка:", error);
    logToSheet({ error: error.toString(), timestamp: new Date() }, "Errors");
  }
}

/**
 * Отправка приветствия
 */
function sendWelcome(chat_id, user_name) {
  if (!Bot) initBot();
  const text = `
🤖 <b>Добро пожаловать, ${user_name}!</b>

Это простой тестовый бот для работы с Google Таблицами.

<b>Команды:</b>
/start - Это сообщение
/stats - Статистика
/users - Список пользователей
/addme - Добавить себя в список

<b>Функции:</b>
• Сохранение всех сообщений в таблицу
• Ведение списка пользователей
• Просмотр статистики
  `;
  
  Bot.sendMessage({
    chat_id: chat_id,
    text: text,
    parse_mode: "HTML"
  });
}

/**
 * Отправка статистики
 */
function sendStats(chat_id) {
  if (!Bot) initBot();
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
    
    const text = `
📊 <b>Статистика бота:</b>

💬 Всего сообщений: ${totalMessages}
👥 Всего пользователей: ${totalUsers}
📅 Дата: ${new Date().toLocaleDateString('ru-RU')}
  `;
    
    Bot.sendMessage({
      chat_id: chat_id,
      text: text,
      parse_mode: "HTML"
    });
  } catch (error) {
    Bot.sendMessage({
      chat_id: chat_id,
      text: "❌ Ошибка при получении статистики"
    });
  }
}

/**
 * Отправка списка пользователей
 */
function sendUsers(chat_id) {
  if (!Bot) initBot();
  try {
    const sheet = ss.getSheetByName("Users");
    
    if (!sheet || sheet.getLastRow() <= 1) {
      Bot.sendMessage({
        chat_id: chat_id,
        text: "👥 Пользователи не найдены. Используйте /addme чтобы добавить себя."
      });
      return;
    }
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
    let text = `👥 <b>Список пользователей (${data.length}):</b>\n\n`;
    
    data.forEach((row, index) => {
      text += `${index + 1}. ${row[1]} (ID: ${row[0]})\n`;
    });
    
    Bot.sendMessage({
      chat_id: chat_id,
      text: text,
      parse_mode: "HTML"
    });
  } catch (error) {
    Bot.sendMessage({
      chat_id: chat_id,
      text: "❌ Ошибка при получении списка пользователей"
    });
  }
}

/**
 * Сохранение сообщения в таблицу
 */
function saveMessage(msg, user_name) {
  try {
    let sheet = ss.getSheetByName("Messages");
    if (!sheet) {
      sheet = ss.insertSheet("Messages");
      sheet.setTabColor("BLUE");
      sheet.getRange(1, 1, 1, 4).setValues([["Дата", "ID", "Имя", "Сообщение"]]);
    }
    
    const timestamp = new Date();
    const user_id = msg.from.id;
    const text = msg.text || "";
    
    sheet.appendRow([timestamp, user_id, user_name, text]);
  }
 catch (error) {
    console.error("Ошибка сохранения:", error);
  }
}

/**
 * Добавление пользователя в таблицу
 */
function addUser(user) {
  try {
    let sheet = ss.getSheetByName("Users");
    if (!sheet) {
      sheet = ss.insertSheet("Users");
      sheet.setTabColor("GREEN");
      sheet.getRange(1, 1, 1, 3).setValues([["ID", "Имя", "Дата добавления"]]);
    }
    
    // Проверяем, есть ли уже пользователь
    const data = sheet.getRange("A:A").getValues();
    const userExists = data.flat().some(id => id.toString() === user.id.toString());
    
    if (!userExists) {
      const timestamp = new Date();
      sheet.appendRow([user.id, user.first_name, timestamp]);
    }
  }
 catch (error) {
    console.error("Ошибка добавления пользователя:", error);
  }
}

/**
 * Логирование в таблицу
 */
function logToSheet(data, sheetName) {
  try {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      if (sheetName === "Debug") sheet.setTabColor("RED");
      if (sheetName === "Errors") sheet.setTabColor("ORANGE");
    }
    
    const timestamp = new Date();
    sheet.appendRow([timestamp, JSON.stringify(data)]);
  }
 catch (error) {
    console.error("Ошибка логирования:", error);
  }
}

// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===

/**
 * Установка webhook
 */
function setupWebhook() {
  if (!Bot) initBot();
  const webAppUrl = getWebAppUrl();
  if (!webAppUrl) {
    SpreadsheetApp.getUi().alert("URL веб-приложения не найден. Настройте его в меню.");
    return;
  }
  const result = Bot.setWebhook({
    url: webAppUrl,
    max_connections: 50
  });
  console.log("Webhook установлен:", result);
  return result;
}

/**
 * Проверка webhook
 */
function checkWebhook() {
  if (!Bot) initBot();
  const info = Bot.getWebhookInfo();
  console.log("Webhook info:", info);
  return info;
}

/**
 * Удаление webhook
 */
function removeWebhook() {
  if (!Bot) initBot();
  const result = Bot.deleteWebhook();
  console.log("Webhook удален:", result);
  return result;
}

/**
 * Информация о боте
 */
function getBotInfo() {
  if (!Bot) initBot();
  const info = Bot.getMe();
  console.log("Информация о боте:", info);
  return info;
}

/**
 * Установка команд
 */
function setCommands() {
  if (!Bot) initBot();
  const commands = [
    { command: "start", description: "Запустить бота" },
    { command: "stats", description: "Статистика" },
    { command: "users", description: "Список пользователей" },
    { command: "addme", description: "Добавить себя" }
  ];
  
  const result = Bot.setMyCommands({ commands });
  console.log("Команды установлены:", result);
  return result;
}

/**
 * Очистка бота
 */
function resetBot() {
  if (!Bot) initBot();
  removeWebhook();
  const updates = Bot.getUpdates({});
  console.log("Обновления:", updates);
  setupWebhook();
}

/**
 * Тестовая функция для проверки работы
 */
function testBot() {
  if (!Bot) initBot();
  console.log("=== ТЕСТ БОТА ===");
  
  // Проверяем информацию о боте
  const botInfo = getBotInfo();
  console.log("Бот:", botInfo);
  
  // Проверяем webhook
  const webhookInfo = checkWebhook();
  console.log("Webhook:", webhookInfo);
  
  // Устанавливаем команды
  setCommands();
  
  console.log("=== ТЕСТ ЗАВЕРШЕН ===");
}