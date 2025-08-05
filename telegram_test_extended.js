/**
 * Расширенные функции для тестирования Telegram бота
 * Дополнение к основному файлу telegram_test_menu.js
 */

// ===== ФУНКЦИИ ДЛЯ МЕДИА =====

/**
 * Отправка тестового медиа
 */
function sendTestMedia(chatId, mediaType, url, caption) {
  try {
    const options = {
      chat_id: chatId
    };
    
    if (caption) {
      options.caption = caption;
      options.parse_mode = "HTML";
    }
    
    switch (mediaType) {
      case 'photo':
        options.photo = url;
        return Bot.sendPhoto(options);
        
      case 'document':
        options.document = url;
        return Bot.sendDocument(options);
        
      case 'video':
        options.video = url;
        return Bot.sendVideo(options);
        
      case 'audio':
        options.audio = url;
        return Bot.sendAudio(options);
        
      case 'voice':
        options.voice = url;
        return Bot.sendVoice(options);
        
      default:
        throw new Error('Неизвестный тип медиа');
    }
  } catch (error) {
    console.error('Ошибка отправки медиа:', error);
    throw error;
  }
}

/**
 * Отправка случайного фото
 */
function sendRandomPhoto(chatId) {
  const photos = [
    "https://picsum.photos/400/300?random=1",
    "https://picsum.photos/400/300?random=2",
    "https://picsum.photos/400/300?random=3",
    "https://picsum.photos/400/300?random=4",
    "https://picsum.photos/400/300?random=5"
  ];
  
  const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
  
  return Bot.sendPhoto({
    chat_id: chatId,
    photo: randomPhoto,
    caption: "🎲 Случайное фото из Picsum"
  });
}

/**
 * Отправка фото из Google Sheets
 */
function sendChartFromSheet(chatId) {
  try {
    const sheet = ss.getSheetByName("Data");
    if (sheet && sheet.getCharts().length > 0) {
      const chart = sheet.getCharts()[0];
      const blob = chart.getBlob();
      
      return Bot.sendPhoto({
        chat_id: chatId,
        photo: blob,
        caption: "📊 График из Google Таблиц",
        contentType: "multipart/form-data"
      });
    } else {
      throw new Error('График не найден в таблице');
    }
  } catch (error) {
    console.error('Ошибка отправки графика:', error);
    throw error;
  }
}

/**
 * Отправка документа из таблицы
 */
function sendTableAsDocument(chatId) {
  try {
    const sheet = ss.getSheetByName("Data");
    if (!sheet) {
      throw new Error('Лист "Data" не найден');
    }
    
    const data = sheet.getDataRange().getValues();
    let csvContent = "";
    
    data.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(",") + "\n";
    });
    
    const blob = Utilities.newBlob(csvContent, MimeType.CSV, "table_data.csv");
    
    return Bot.sendDocument({
      chat_id: chatId,
      document: blob,
      caption: "📊 Данные из таблицы",
      contentType: "multipart/form-data"
    });
  } catch (error) {
    console.error('Ошибка отправки документа:', error);
    throw error;
  }
}

// ===== ФУНКЦИИ ДЛЯ КЛАВИАТУР =====

/**
 * Отправка тестовой клавиатуры
 */
function sendTestKeyboard(chatId, text, type, buttonsText) {
  try {
    const Keyboard = TGbot.keyboard();
    const Key = TGbot.key();
    
    // Парсим кнопки
    const buttonRows = buttonsText.split('\n').filter(row => row.trim());
    const keyboardButtons = [];
    
    buttonRows.forEach(row => {
      const parts = row.split('|');
      if (parts.length >= 2) {
        const buttonText = parts[0].trim();
        const callbackData = parts[1].trim();
        
        if (parts.length === 3 && parts[2].startsWith('http')) {
          // URL кнопка
          keyboardButtons.push([Key.url(buttonText, parts[2])]);
        } else {
          // Callback кнопка
          keyboardButtons.push([Key.callback(buttonText, callbackData)]);
        }
      }
    });
    
    let keyboard;
    if (type === 'inline') {
      keyboard = Keyboard.make(keyboardButtons, { columns: 1 }).inline();
    } else {
      keyboard = Keyboard.make(keyboardButtons, { columns: 1 }).reply();
    }
    
    return Bot.sendMessage({
      chat_id: chatId,
      text: text,
      reply_markup: keyboard
    });
  } catch (error) {
    console.error('Ошибка отправки клавиатуры:', error);
    throw error;
  }
}

/**
 * Отправка простой клавиатуры с кнопками
 */
function sendSimpleKeyboard(chatId, text, buttons) {
  try {
    const Keyboard = TGbot.keyboard();
    
    const keyboard = Keyboard.make(buttons, { columns: 2 }).reply();
    
    return Bot.sendMessage({
      chat_id: chatId,
      text: text,
      reply_markup: keyboard
    });
  } catch (error) {
    console.error('Ошибка отправки клавиатуры:', error);
    throw error;
  }
}

/**
 * Отправка inline клавиатуры с callback
 */
function sendInlineKeyboard(chatId, text, buttons) {
  try {
    const Keyboard = TGbot.keyboard();
    const Key = TGbot.key();
    
    const keyboardButtons = buttons.map(button => {
      if (button.url) {
        return [Key.url(button.text, button.url)];
      } else {
        return [Key.callback(button.text, button.callback)];
      }
    });
    
    const keyboard = Keyboard.make(keyboardButtons, { columns: 1 }).inline();
    
    return Bot.sendMessage({
      chat_id: chatId,
      text: text,
      reply_markup: keyboard
    });
  } catch (error) {
    console.error('Ошибка отправки inline клавиатуры:', error);
    throw error;
  }
}

// ===== ФУНКЦИИ ДЛЯ ОПРОСОВ =====

/**
 * Отправка тестового опроса
 */
function sendTestPoll(chatId, question, optionsText, isQuiz, correctOption, explanation) {
  try {
    const options = optionsText.split('\n').filter(opt => opt.trim());
    
    const pollOptions = {
      chat_id: chatId,
      question: question,
      options: options
    };
    
    if (isQuiz) {
      pollOptions.type = "quiz";
      pollOptions.is_anonymous = false;
      
      if (correctOption && correctOption > 0) {
        pollOptions.correct_option_id = parseInt(correctOption) - 1;
      }
      
      if (explanation) {
        pollOptions.explanation = explanation;
      }
    }
    
    return Bot.sendPoll(pollOptions);
  } catch (error) {
    console.error('Ошибка отправки опроса:', error);
    throw error;
  }
}

/**
 * Отправка простого опроса
 */
function sendSimplePoll(chatId, question, options) {
  try {
    return Bot.sendPoll({
      chat_id: chatId,
      question: question,
      options: options
    });
  } catch (error) {
    console.error('Ошибка отправки опроса:', error);
    throw error;
  }
}

/**
 * Отправка викторины
 */
function sendQuiz(chatId, question, options, correctOption, explanation) {
  try {
    const quizOptions = {
      chat_id: chatId,
      question: question,
      options: options,
      type: "quiz",
      is_anonymous: false
    };
    
    if (correctOption >= 0) {
      quizOptions.correct_option_id = correctOption;
    }
    
    if (explanation) {
      quizOptions.explanation = explanation;
    }
    
    return Bot.sendPoll(quizOptions);
  } catch (error) {
    console.error('Ошибка отправки викторины:', error);
    throw error;
  }
}

// ===== ФУНКЦИИ ДЛЯ НАСТРОЕК =====

/**
 * Тест соединения с ботом
 */
function testBotConnection() {
  try {
    const info = Bot.getMe();
    console.log('Соединение успешно:', info);
    return info;
  } catch (error) {
    console.error('Ошибка соединения:', error);
    throw error;
  }
}

/**
 * Получение информации о боте
 */
function getBotInfo() {
  try {
    const info = Bot.getMe();
    console.log('Информация о боте:', info);
    return info;
  } catch (error) {
    console.error('Ошибка получения информации:', error);
    throw error;
  }
}

/**
 * Настройка webhook
 */
function setupWebhook() {
  try {
    const result = Bot.setWebhook({
      url: WEBAPP_URL,
      max_connections: 50
    });
    console.log('Webhook настроен:', result);
    return result;
  } catch (error) {
    console.error('Ошибка настройки webhook:', error);
    throw error;
  }
}

/**
 * Проверка webhook
 */
function checkWebhook() {
  try {
    const info = Bot.getWebhookInfo();
    console.log('Webhook info:', info);
    return info;
  } catch (error) {
    console.error('Ошибка проверки webhook:', error);
    throw error;
  }
}

/**
 * Удаление webhook
 */
function deleteWebhook() {
  try {
    const result = Bot.deleteWebhook();
    console.log('Webhook удален:', result);
    return result;
  } catch (error) {
    console.error('Ошибка удаления webhook:', error);
    throw error;
  }
}

// ===== ФУНКЦИИ ДЛЯ СТАТИСТИКИ =====

/**
 * Загрузка статистики
 */
function loadStats() {
  try {
    const messagesSheet = ss.getSheetByName("Messages");
    const usersSheet = ss.getSheetByName("Users");
    
    let totalMessages = 0;
    let totalUsers = 0;
    let todayMessages = 0;
    
    if (messagesSheet && messagesSheet.getLastRow() > 1) {
      totalMessages = messagesSheet.getLastRow() - 1;
      
      // Подсчет сообщений за сегодня
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      const dates = messagesSheet.getRange(2, 1, messagesSheet.getLastRow() - 1, 1).getValues();
      todayMessages = dates.filter(date => date[0] >= todayStart).length;
    }
    
    if (usersSheet && usersSheet.getLastRow() > 1) {
      totalUsers = usersSheet.getLastRow() - 1;
    }
    
    const statsHtml = `
      <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0;">
        <h4>📊 Статистика бота</h4>
        <p><strong>Всего сообщений:</strong> ${totalMessages}</p>
        <p><strong>Сообщений сегодня:</strong> ${todayMessages}</p>
        <p><strong>Всего пользователей:</strong> ${totalUsers}</p>
        <p><strong>Дата:</strong> ${new Date().toLocaleDateString('ru-RU')}</p>
      </div>
    `;
    
    return statsHtml;
  } catch (error) {
    console.error('Ошибка загрузки статистики:', error);
    return '<div style="color: red;">Ошибка загрузки статистики</div>';
  }
}

/**
 * Получение детальной статистики
 */
function getDetailedStats() {
  try {
    const messagesSheet = ss.getSheetByName("Messages");
    const usersSheet = ss.getSheetByName("Users");
    
    const stats = {
      totalMessages: 0,
      totalUsers: 0,
      todayMessages: 0,
      thisWeekMessages: 0,
      thisMonthMessages: 0,
      lastActivity: null,
      topUsers: []
    };
    
    if (messagesSheet && messagesSheet.getLastRow() > 1) {
      const data = messagesSheet.getDataRange().getValues();
      const headers = data[0];
      const messages = data.slice(1);
      
      stats.totalMessages = messages.length;
      
      // Подсчет по периодам
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      
      messages.forEach(row => {
        const messageDate = new Date(row[0]);
        
        if (messageDate >= todayStart) {
          stats.todayMessages++;
        }
        if (messageDate >= weekStart) {
          stats.thisWeekMessages++;
        }
        if (messageDate >= monthStart) {
          stats.thisMonthMessages++;
        }
      });
      
      // Последняя активность
      if (messages.length > 0) {
        stats.lastActivity = new Date(messages[messages.length - 1][0]);
      }
      
      // Топ пользователей
      const userStats = {};
      messages.forEach(row => {
        const userId = row[1];
        userStats[userId] = (userStats[userId] || 0) + 1;
      });
      
      stats.topUsers = Object.entries(userStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([userId, count]) => ({ userId, count }));
    }
    
    if (usersSheet && usersSheet.getLastRow() > 1) {
      stats.totalUsers = usersSheet.getLastRow() - 1;
    }
    
    return stats;
  } catch (error) {
    console.error('Ошибка получения детальной статистики:', error);
    throw error;
  }
}

// ===== ФУНКЦИИ ДЛЯ ЭКСПОРТА =====

/**
 * Экспорт данных в CSV
 */
function exportDataToCSV() {
  try {
    const messagesSheet = ss.getSheetByName("Messages");
    const usersSheet = ss.getSheetByName("Users");
    
    let csvContent = "Тип,Дата,ID пользователя,Имя,Сообщение\n";
    
    if (messagesSheet && messagesSheet.getLastRow() > 1) {
      const data = messagesSheet.getDataRange().getValues();
      data.slice(1).forEach(row => {
        csvContent += `Сообщение,${row[0]},${row[1]},${row[2]},"${row[3]}"\n`;
      });
    }
    
    csvContent += "\nПользователи\n";
    csvContent += "ID,Имя,Фамилия,Дата добавления\n";
    
    if (usersSheet && usersSheet.getLastRow() > 1) {
      const data = usersSheet.getDataRange().getValues();
      data.slice(1).forEach(row => {
        csvContent += `${row[0]},${row[1]},${row[2]},${row[3]}\n`;
      });
    }
    
    return csvContent;
  } catch (error) {
    console.error('Ошибка экспорта данных:', error);
    throw error;
  }
}

/**
 * Создание отчета в HTML
 */
function createHtmlReport() {
  try {
    const stats = getDetailedStats();
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Отчет Telegram бота</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { background: #667eea; color: white; padding: 20px; border-radius: 10px; }
          .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
          .stat-card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .stat-number { font-size: 2em; font-weight: bold; color: #667eea; }
          .stat-label { color: #666; margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📊 Отчет Telegram бота</h1>
          <p>Дата: ${new Date().toLocaleDateString('ru-RU')}</p>
        </div>
        
        <div class="stats">
          <div class="stat-card">
            <div class="stat-number">${stats.totalMessages}</div>
            <div class="stat-label">Всего сообщений</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.todayMessages}</div>
            <div class="stat-label">Сегодня</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.totalUsers}</div>
            <div class="stat-label">Пользователей</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.thisWeekMessages}</div>
            <div class="stat-label">За неделю</div>
          </div>
        </div>
        
        <h3>🏆 Топ пользователей</h3>
        <ul>
          ${stats.topUsers.map(user => `<li>ID ${user.userId}: ${user.count} сообщений</li>`).join('')}
        </ul>
        
        <p><strong>Последняя активность:</strong> ${stats.lastActivity ? stats.lastActivity.toLocaleString('ru-RU') : 'Нет данных'}</p>
      </body>
      </html>
    `;
    
    return html;
  } catch (error) {
    console.error('Ошибка создания HTML отчета:', error);
    throw error;
  }
}

// ===== УТИЛИТЫ =====

/**
 * Очистка старых данных
 */
function cleanupOldData(daysToKeep = 30) {
  try {
    const messagesSheet = ss.getSheetByName("Messages");
    const usersSheet = ss.getSheetByName("Users");
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    let deletedRows = 0;
    
    if (messagesSheet && messagesSheet.getLastRow() > 1) {
      const data = messagesSheet.getDataRange().getValues();
      const headers = data[0];
      const messages = data.slice(1);
      
      const filteredMessages = messages.filter(row => {
        const messageDate = new Date(row[0]);
        return messageDate >= cutoffDate;
      });
      
      const newData = [headers, ...filteredMessages];
      messagesSheet.clear();
      messagesSheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
      
      deletedRows = messages.length - filteredMessages.length;
    }
    
    console.log(`Очищено ${deletedRows} старых записей`);
    return deletedRows;
  } catch (error) {
    console.error('Ошибка очистки данных:', error);
    throw error;
  }
}

/**
 * Резервное копирование данных
 */
function backupData() {
  try {
    const backupSheet = ss.insertSheet(`Backup_${new Date().toISOString().split('T')[0]}`);
    
    // Копируем сообщения
    const messagesSheet = ss.getSheetByName("Messages");
    if (messagesSheet) {
      const messagesData = messagesSheet.getDataRange().getValues();
      backupSheet.getRange(1, 1, messagesData.length, messagesData[0].length).setValues(messagesData);
    }
    
    // Копируем пользователей
    const usersSheet = ss.getSheetByName("Users");
    if (usersSheet) {
      const usersData = usersSheet.getDataRange().getValues();
      const startRow = backupSheet.getLastRow() + 2;
      backupSheet.getRange(startRow, 1, usersData.length, usersData[0].length).setValues(usersData);
    }
    
    backupSheet.setTabColor("YELLOW");
    console.log('Резервная копия создана');
    return backupSheet.getName();
  } catch (error) {
    console.error('Ошибка создания резервной копии:', error);
    throw error;
  }
} 