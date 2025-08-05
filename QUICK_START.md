# 🚀 Быстрый старт: Telegram бот с Google Таблицами

## 📋 Что у нас есть

Мы создали полноценный тестовый Telegram бот, который интегрируется с Google Таблицами используя библиотеку **TGbot**.

### 📁 Файлы проекта:
- `test_bot.js` - Полнофункциональный бот
- `simple_test_bot.js` - Упрощенная версия для быстрого тестирования
- `examples.js` - Примеры использования различных функций
- `SETUP_INSTRUCTIONS.md` - Подробные инструкции по настройке
- `QUICK_START.md` - Это руководство

## ⚡ Быстрый запуск (5 минут)

### 1. Создайте бота в Telegram
```
1. Найдите @BotFather в Telegram
2. Отправьте /newbot
3. Введите имя: "Test Sheets Bot"
4. Введите username: "test_sheets_bot_123"
5. Сохраните токен
```

### 2. Создайте Google Apps Script проект
```
1. Откройте https://script.google.com/
2. Создайте новый проект
3. Подключите библиотеку TGbot:
   ID: 1LyGnqsaphk-K_EB8ZxqcBRiKXRE2TY8oSHWlZn4HBje1WlmoNk51wGeg
```

### 3. Скопируйте код
```javascript
// Замените на ваши данные
const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE";
const WEBAPP_URL = "YOUR_WEBAPP_URL_HERE";

const Bot = TGbot.bot({ 
  botToken: BOT_TOKEN, 
  webAppUrl: WEBAPP_URL,
  logRequest: true 
});

const ss = SpreadsheetApp.getActiveSpreadsheet();

function doPost(e) {
  try {
    if (e?.postData?.contents) {
      const contents = JSON.parse(e.postData.contents);
      
      if (contents.message) {
        const msg = contents.message;
        const text = msg.text;
        const chat_id = msg.from.id;
        const user_name = msg.from.first_name;
        
        // Сохраняем в таблицу
        saveMessage(msg, user_name);
        
        // Обрабатываем команды
        if (text === "/start") {
          Bot.sendMessage({
            chat_id: chat_id,
            text: `Привет, ${user_name}! 👋\n\nЭто тестовый бот для Google Таблиц.`
          });
        } else {
          Bot.sendMessage({
            chat_id: chat_id,
            text: `Вы написали: "${text}"\n\nСообщение сохранено в таблицу!`
          });
        }
      }
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

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
  } catch (error) {
    console.error("Ошибка сохранения:", error);
  }
}

function setupWebhook() {
  const result = Bot.setWebhook({
    url: WEBAPP_URL,
    max_connections: 50
  });
  console.log("Webhook установлен:", result);
  return result;
}
```

### 4. Разверните веб-приложение
```
1. Нажмите "Развернуть" → "Новое развертывание"
2. Тип: "Веб-приложение"
3. Выполнять от имени: Вы
4. Доступ: Только вы
5. Скопируйте URL
```

### 5. Настройте webhook
```
1. Замените WEBAPP_URL на полученный URL
2. Замените BOT_TOKEN на ваш токен
3. Запустите функцию setupWebhook()
```

### 6. Протестируйте
```
1. Найдите вашего бота в Telegram
2. Отправьте /start
3. Отправьте любое сообщение
4. Проверьте таблицу - появится лист "Messages"
```

## 🎯 Что умеет бот

### ✅ Основные функции:
- ✅ Сохранение всех сообщений в Google Таблицы
- ✅ Обработка команд (/start, /help, /stats)
- ✅ Ведение списка пользователей
- ✅ Отправка статистики
- ✅ Inline клавиатуры
- ✅ Отправка медиафайлов
- ✅ Опросы и викторины
- ✅ Встроенный календарь
- ✅ Экспорт данных в файлы

### 📊 Структура таблицы:
- **Messages** (синий) - Все сообщения
- **Users** (зеленый) - Список пользователей  
- **Debug** (красный) - Логи для отладки
- **Errors** (оранжевый) - Ошибки

## 🧪 Тестовые команды

```
/start - Запуск бота
/help - Справка
/stats - Статистика
/users - Список пользователей
/addme - Добавить себя в список
```

## 🔧 Полезные функции

### Проверка webhook:
```javascript
function checkWebhook() {
  const info = Bot.getWebhookInfo();
  console.log("Webhook info:", info);
}
```

### Очистка при проблемах:
```javascript
function resetBot() {
  Bot.deleteWebhook();
  Bot.getUpdates({});
  Bot.setWebhook({ url: WEBAPP_URL });
}
```

### Информация о боте:
```javascript
function getBotInfo() {
  const info = Bot.getMe();
  console.log("Bot info:", info);
}
```

## 🚨 Устранение неполадок

### Бот не отвечает:
1. Проверьте webhook: `checkWebhook()`
2. Убедитесь, что токен правильный
3. Проверьте URL веб-приложения

### Ошибки в таблице:
1. Проверьте права доступа к таблице
2. Убедитесь, что таблица активна
3. Проверьте лист "Errors"

### Проблемы с библиотекой:
1. Переподключите библиотеку TGbot
2. Проверьте версию библиотеки
3. Обновите до последней версии

## 📈 Расширение функционала

### Добавление новых команд:
```javascript
if (text === "/newcommand") {
  // Ваша логика
}
```

### Работа с медиафайлами:
```javascript
if (msg.photo) {
  // Обработка фото
}
if (msg.document) {
  // Обработка документов
}
```

### Отправка клавиатуры:
```javascript
const Keyboard = TGbot.keyboard();
const keyboard = Keyboard.make([
  ["Кнопка 1", "Кнопка 2"]
], { columns: 2 }).inline();

Bot.sendMessage({
  chat_id: chat_id,
  text: "Выберите:",
  reply_markup: keyboard
});
```

## 🎉 Готово!

Теперь у вас есть работающий Telegram бот, который:
- Сохраняет все сообщения в Google Таблицы
- Ведет статистику пользователей
- Поддерживает различные типы сообщений
- Имеет интерактивные элементы

**Следующие шаги:**
1. Изучите `examples.js` для расширения функционала
2. Настройте дополнительные команды
3. Добавьте интеграцию с другими Google сервисами
4. Создайте собственные отчеты и аналитику

## 📞 Поддержка

- Автор библиотеки: https://t.me/nosaev_m
- Группа поддержки: https://t.me/googleappsscriptrc
- Документация: https://core.telegram.org/bots/api 