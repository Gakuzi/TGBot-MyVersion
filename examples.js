/**
 * Примеры использования библиотеки TGbot
 * Демонстрация различных возможностей
 */

// === КОНФИГУРАЦИЯ ===
const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE";
const WEBAPP_URL = "YOUR_WEBAPP_URL_HERE";

const Bot = new TGBot({ 
  botToken: BOT_TOKEN, 
  webAppUrl: WEBAPP_URL,
  logRequest: true 
});

const ss = SpreadsheetApp.getActiveSpreadsheet();

// === ПРИМЕР 1: ОТПРАВКА СООБЩЕНИЙ ===

/**
 * Отправка простого текстового сообщения
 */
function sendSimpleMessage(chat_id) {
  const response = Bot.sendMessage({
    chat_id: chat_id,
    text: "Привет! Это простое текстовое сообщение."
  });
  console.log("Сообщение отправлено:", response);
}

/**
 * Отправка сообщения с HTML разметкой
 */
function sendHtmlMessage(chat_id) {
  const text = `
<b>Жирный текст</b>
<i>Курсив</i>
<code>Код</code>
<a href="https://google.com">Ссылка</a>
  `;
  
  Bot.sendMessage({
    chat_id: chat_id,
    text: text,
    parse_mode: "HTML"
  });
}

/**
 * Отправка сообщения с Markdown
 */
function sendMarkdownMessage(chat_id) {
  Bot.setParseMode("MarkdownV2");
  
  const text = `
*Курсив*
**Жирный**
\`Код\`
[Ссылка](https://google\\.com)
  `;
  
  Bot.sendMessage({
    chat_id: chat_id,
    text: text
  });
}

// === ПРИМЕР 2: КЛАВИАТУРЫ ===

/**
 * Создание обычной клавиатуры
 */
function sendReplyKeyboard(chat_id) {
  const Keyboard = Bot.keyboard();
  
  const keyboard = Keyboard.make([
    ["Кнопка 1", "Кнопка 2"],
    ["Кнопка 3", "Кнопка 4"],
    ["📊 Статистика", "👥 Пользователи"]
  ], { columns: 2 }).reply();
  
  Bot.sendMessage({
    chat_id: chat_id,
    text: "Выберите действие:",
    reply_markup: keyboard
  });
}

/**
 * Создание inline клавиатуры
 */
function sendInlineKeyboard(chat_id) {
  const Keyboard = Bot.keyboard();
  const Key = Bot.key();
  
  const keyboard = Keyboard.make([
    [Key.callback("✅ Да", "yes"), Key.callback("❌ Нет", "no")],
    [Key.url("🌐 Сайт", "https://google.com")],
    [Key.callback("📊 Статистика", "stats")]
  ], { columns: 2 }).inline();
  
  Bot.sendMessage({
    chat_id: chat_id,
    text: "Inline клавиатура:",
    reply_markup: keyboard
  });
}

/**
 * Удаление клавиатуры
 */
function removeKeyboard(chat_id) {
  const Keyboard = Bot.keyboard();
  
  Bot.sendMessage({
    chat_id: chat_id,
    text: "Клавиатура удалена!",
    reply_markup: Keyboard.remove()
  });
}

// === ПРИМЕР 3: МЕДИАФАЙЛЫ ===

/**
 * Отправка фото
 */
function sendPhoto(chat_id) {
  Bot.sendPhoto({
    chat_id: chat_id,
    photo: "https://picsum.photos/400/300",
    caption: "Случайное фото с Picsum"
  });
}

/**
 * Отправка фото из Google Sheets
 */
function sendChartFromSheet(chat_id) {
  try {
    const sheet = ss.getSheetByName("Data");
    if (sheet && sheet.getCharts().length > 0) {
      const chart = sheet.getCharts()[0];
      const blob = chart.getBlob();
      
      Bot.sendPhoto({
        chat_id: chat_id,
        photo: blob,
        caption: "График из Google Таблиц",
        contentType: "multipart/form-data"
      });
    } else {
      Bot.sendMessage({
        chat_id: chat_id,
        text: "График не найден в таблице"
      });
    }
  } catch (error) {
    Bot.sendMessage({
      chat_id: chat_id,
      text: "Ошибка при отправке графика: " + error.message
    });
  }
}

/**
 * Отправка группы медиа
 */
function sendMediaGroup(chat_id) {
  const data = [
    ["https://picsum.photos/400/300", "Фото 1"],
    ["https://picsum.photos/400/301", "Фото 2"],
    ["https://picsum.photos/400/302", "Фото 3"]
  ].map((item) => Bot.inputMediaPhoto({ 
    media: item[0], 
    caption: item[1] 
  }));
  
  Bot.sendMediaGroup({
    chat_id: chat_id,
    media: data
  });
}

/**
 * Отправка документа
 */
function sendDocument(chat_id) {
  // Создаем простой CSV файл
  const csvData = "Имя,Возраст,Город\nИван,25,Москва\nМария,30,СПб";
  const blob = Utilities.newBlob(csvData, MimeType.CSV, "data.csv");
  
  Bot.sendDocument({
    chat_id: chat_id,
    document: blob,
    caption: "Данные в CSV формате",
    contentType: "multipart/form-data"
  });
}

// === ПРИМЕР 4: ОПРОСЫ ===

/**
 * Отправка обычного опроса
 */
function sendPoll(chat_id) {
  Bot.sendPoll({
    chat_id: chat_id,
    question: "Какой ваш любимый язык программирования?",
    options: ["JavaScript", "Python", "Java", "C++", "Другой"]
  });
}

/**
 * Отправка викторины
 */
function sendQuiz(chat_id) {
  Bot.sendPoll({
    chat_id: chat_id,
    question: "Столица России?",
    options: ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург"],
    type: "quiz",
    correct_option_id: 0,
    explanation: "Правильный ответ: Москва"
  });
}

// === ПРИМЕР 5: КАЛЕНДАРЬ ===

/**
 * Отправка календаря
 */
function sendCalendar(chat_id) {
  Bot.sendMessage({
    chat_id: chat_id,
    text: "Выберите дату:",
    reply_markup: Bot.calendar({ language: "ru" })
  });
}

// === ПРИМЕР 6: РАБОТА С ТАБЛИЦАМИ ===

/**
 * Создание отчета из таблицы
 */
function sendTableReport(chat_id) {
  try {
    const sheet = ss.getSheetByName("Data");
    if (!sheet) {
      Bot.sendMessage({
        chat_id: chat_id,
        text: "Лист 'Data' не найден"
      });
      return;
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    let report = "📊 <b>Отчет из таблицы:</b>\n\n";
    report += `<b>Заголовки:</b> ${headers.join(", ")}\n`;
    report += `<b>Количество строк:</b> ${rows.length}\n\n`;
    
    // Показываем первые 5 строк
    const previewRows = rows.slice(0, 5);
    previewRows.forEach((row, index) => {
      report += `${index + 1}. ${row.join(" | ")}\n`;
    });
    
    if (rows.length > 5) {
      report += `\n... и еще ${rows.length - 5} строк`;
    }
    
    Bot.sendMessage({
      chat_id: chat_id,
      text: report,
      parse_mode: "HTML"
    });
  } catch (error) {
    Bot.sendMessage({
      chat_id: chat_id,
      text: "Ошибка при создании отчета: " + error.message
    });
  }
}

/**
 * Экспорт данных в файл
 */
function exportTableData(chat_id) {
  try {
    const sheet = ss.getSheetByName("Data");
    if (!sheet) {
      Bot.sendMessage({
        chat_id: chat_id,
        text: "Лист 'Data' не найден"
      });
      return;
    }
    
    const data = sheet.getDataRange().getValues();
    let csvContent = "";
    
    data.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(",") + "\n";
    });
    
    const blob = Utilities.newBlob(csvContent, MimeType.CSV, "table_data.csv");
    
    Bot.sendDocument({
      chat_id: chat_id,
      document: blob,
      caption: "Экспорт данных из таблицы",
      contentType: "multipart/form-data"
    });
  } catch (error) {
    Bot.sendMessage({
      chat_id: chat_id,
      text: "Ошибка при экспорте: " + error.message
    });
  }
}

// === ПРИМЕР 7: ОБРАБОТКА CALLBACK ===

/**
 * Обработка callback запросов в doPost
 */
function handleCallbackExample(callback) {
  const chat_id = callback.from.id;
  const data = callback.data;
  
  switch (data) {
    case "yes":
      Bot.answerCallbackQuery({
        callback_query_id: callback.id,
        text: "Вы выбрали Да!"
      });
      Bot.editMessageText({
        chat_id: chat_id,
        message_id: callback.message.message_id,
        text: "✅ Вы выбрали Да!"
      });
      break;
      
    case "no":
      Bot.answerCallbackQuery({
        callback_query_id: callback.id,
        text: "Вы выбрали Нет!"
      });
      Bot.editMessageText({
        chat_id: chat_id,
        message_id: callback.message.message_id,
        text: "❌ Вы выбрали Нет!"
      });
      break;
      
    case "stats":
      sendStatsExample(chat_id);
      Bot.answerCallbackQuery({
        callback_query_id: callback.id
      });
      break;
  }
}

/**
 * Пример отправки статистики
 */
function sendStatsExample(chat_id) {
  const stats = {
    totalMessages: 150,
    activeUsers: 25,
    todayMessages: 12
  };
  
  const text = `
📊 <b>Статистика:</b>

💬 Всего сообщений: ${stats.totalMessages}
👥 Активных пользователей: ${stats.activeUsers}
📅 Сообщений сегодня: ${stats.todayMessages}
  `;
  
  Bot.sendMessage({
    chat_id: chat_id,
    text: text,
    parse_mode: "HTML"
  });
}

// === ПРИМЕР 8: РАБОТА С ФАЙЛАМИ ===

/**
 * Сохранение файла на Google Drive
 */
function saveFileToDrive(message, folderId) {
  try {
    const fileInfo = Bot.getFile(message.document.file_id);
    const blob = UrlFetchApp.fetch(fileInfo).getBlob();
    
    const fileName = message.document.file_name;
    const resource = {
      title: fileName,
      parents: [{ id: folderId }]
    };
    
    const file = Drive.Files.insert(resource, blob);
    return file.id;
  } catch (error) {
    console.error("Ошибка сохранения файла:", error);
    return null;
  }
}

// === ПРИМЕР 9: ВАЛИДАЦИЯ ===

/**
 * Проверка команды
 */
function isCommand(message) {
  return Bot.isBotCommandMessage(message);
}

/**
 * Проверка типа сообщения
 */
function getMessageType(message) {
  if (message.text) return "text";
  if (message.photo) return "photo";
  if (message.document) return "document";
  if (message.audio) return "audio";
  if (message.video) return "video";
  return "unknown";
}

// === ПРИМЕР 10: УТИЛИТЫ ===

/**
 * Транслитерация имени файла
 */
function transliterateFileName(filename) {
  return Bot.translit(filename);
}

/**
 * Логирование с помощью helper
 */
function logWithHelper(data) {
  const log = Bot.helper.log;
  log(data);
}

// === ДЕМОНСТРАЦИОННАЯ ФУНКЦИЯ ===

/**
 * Демонстрация всех возможностей
 */
function demonstrateAllFeatures(chat_id) {
  // 1. Простое сообщение
  sendSimpleMessage(chat_id);
  
  // 2. HTML сообщение
  setTimeout(() => {
    sendHtmlMessage(chat_id);
  }, 1000);
  
  // 3. Inline клавиатура
  setTimeout(() => {
    sendInlineKeyboard(chat_id);
  }, 2000);
  
  // 4. Опрос
  setTimeout(() => {
    sendPoll(chat_id);
  }, 3000);
  
  // 5. Календарь
  setTimeout(() => {
    sendCalendar(chat_id);
  }, 4000);
}

// === ТЕСТОВЫЕ ФУНКЦИИ ===

/**
 * Тест всех функций
 */
function testAllFeatures() {
  const testChatId = "YOUR_TEST_CHAT_ID"; // Замените на ваш chat_id
  
  console.log("=== ТЕСТИРОВАНИЕ ФУНКЦИЙ ===");
  
  // Тестируем отправку сообщений
  sendSimpleMessage(testChatId);
  sendHtmlMessage(testChatId);
  
  // Тестируем клавиатуры
  sendReplyKeyboard(testChatId);
  sendInlineKeyboard(testChatId);
  
  // Тестируем медиа
  sendPhoto(testChatId);
  sendMediaGroup(testChatId);
  
  // Тестируем опросы
  sendPoll(testChatId);
  sendQuiz(testChatId);
  
  console.log("=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===");
} 