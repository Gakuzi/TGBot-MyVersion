# 🤖 Тестовый Telegram бот для Google Таблиц

Полнофункциональный тестовый проект для демонстрации возможностей библиотеки **TGbot** в работе с Google Таблицами.

## 📁 Структура проекта

```
TGBot/
├── bot/                    # Исходная библиотека TGbot
│   ├── 1 Client.js
│   ├── 1.1 Class Bot.js
│   ├── 1.2 InputMedia.js
│   ├── 1.3 KeyboardGenerator.js
│   ├── 1.4 Calendar.js
│   ├── 2 Validate functions.js
│   ├── 3 Write functions.js
│   ├── 4 Do.js
│   ├── Func.js
│   ├── Helper.js
│   ├── Types.js
│   └── Utils.js
├── src/                    # Документация
│   ├── LICENSE
│   ├── README_RU.md
│   ├── tg.webp
│   └── types.png
├── test_bot.js            # Полнофункциональный бот
├── simple_test_bot.js     # Упрощенная версия
├── examples.js            # Примеры использования
├── SETUP_INSTRUCTIONS.md  # Подробные инструкции
├── QUICK_START.md         # Быстрый старт
└── README_TEST_BOT.md     # Этот файл
```

## 🚀 Быстрый старт

### 1. Создайте бота в Telegram
- Найдите @BotFather
- Отправьте `/newbot`
- Получите токен

### 2. Создайте Google Apps Script проект
- Откройте [script.google.com](https://script.google.com/)
- Подключите библиотеку TGbot: `1LyGnqsaphk-K_EB8ZxqcBRiKXRE2TY8oSHWlZn4HBje1WlmoNk51wGeg`

### 3. Скопируйте код
Используйте `simple_test_bot.js` для быстрого тестирования или `test_bot.js` для полного функционала.

### 4. Разверните веб-приложение
- Разверните как веб-приложение
- Скопируйте URL
- Настройте webhook

## 🎯 Возможности бота

### ✅ Основные функции
- **Сохранение сообщений** в Google Таблицы
- **Ведение списка пользователей**
- **Статистика и аналитика**
- **Интерактивные клавиатуры**
- **Отправка медиафайлов**
- **Опросы и викторины**
- **Встроенный календарь**
- **Экспорт данных**

### 📊 Структура таблицы
Бот автоматически создает листы:
- **Messages** (синий) - Все сообщения
- **Users** (зеленый) - Список пользователей
- **Debug** (красный) - Логи отладки
- **Errors** (оранжевый) - Ошибки

### 🧪 Команды бота
```
/start - Запуск бота
/help - Справка
/stats - Статистика
/users - Список пользователей
/addme - Добавить себя
/menu - Главное меню
```

## 📋 Файлы проекта

### `test_bot.js` - Полнофункциональный бот
- Полная обработка сообщений
- Inline клавиатуры
- Обработка callback запросов
- Экспорт данных
- Расширенная статистика

### `simple_test_bot.js` - Упрощенная версия
- Базовая функциональность
- Простые команды
- Быстрое тестирование
- Минимальный код

### `examples.js` - Примеры использования
- Отправка сообщений с HTML/Markdown
- Создание клавиатур
- Работа с медиафайлами
- Опросы и викторины
- Работа с таблицами
- Обработка callback
- Сохранение файлов
- Валидация и утилиты

## 🔧 Настройка

### Конфигурация
```javascript
const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE";
const WEBAPP_URL = "YOUR_WEBAPP_URL_HERE";

const Bot = TGbot.bot({ 
  botToken: BOT_TOKEN, 
  webAppUrl: WEBAPP_URL,
  logRequest: true 
});
```

### Установка webhook
```javascript
function setupWebhook() {
  const result = Bot.setWebhook({
    url: WEBAPP_URL,
    max_connections: 50
  });
  console.log("Webhook установлен:", result);
  return result;
}
```

### Проверка webhook
```javascript
function checkWebhook() {
  const info = Bot.getWebhookInfo();
  console.log("Webhook info:", info);
  return info;
}
```

## 🧪 Тестирование

### Быстрый тест
1. Отправьте `/start` боту
2. Проверьте создание листов в таблице
3. Отправьте обычное сообщение
4. Проверьте статистику через `/stats`

### Расширенное тестирование
1. Используйте inline клавиатуры
2. Отправьте медиафайлы
3. Создайте опросы
4. Протестируйте календарь
5. Экспортируйте данные

## 📈 Расширение функционала

### Добавление новых команд
```javascript
if (text === "/newcommand") {
  // Ваша логика
  Bot.sendMessage({
    chat_id: chat_id,
    text: "Новая команда!"
  });
}
```

### Работа с медиафайлами
```javascript
if (msg.photo) {
  // Обработка фото
  const photo = msg.photo[msg.photo.length - 1];
  const file_id = photo.file_id;
}

if (msg.document) {
  // Обработка документов
  const file_id = msg.document.file_id;
}
```

### Создание клавиатур
```javascript
const Keyboard = TGbot.keyboard();
const Key = TGbot.key();

const keyboard = Keyboard.make([
  [Key.callback("Кнопка 1", "action1")],
  [Key.url("Ссылка", "https://google.com")]
], { columns: 1 }).inline();

Bot.sendMessage({
  chat_id: chat_id,
  text: "Выберите:",
  reply_markup: keyboard
});
```

## 🚨 Устранение неполадок

### Бот не отвечает
1. Проверьте webhook: `checkWebhook()`
2. Убедитесь, что токен правильный
3. Проверьте URL веб-приложения
4. Посмотрите логи в листе "Debug"

### Ошибки в таблице
1. Проверьте права доступа к таблице
2. Убедитесь, что таблица активна
3. Проверьте лист "Errors"
4. Пересоздайте листы при необходимости

### Проблемы с библиотекой
1. Переподключите библиотеку TGbot
2. Проверьте версию библиотеки
3. Обновите до последней версии
4. Проверьте консоль на ошибки

## 📊 Аналитика и отчеты

### Статистика сообщений
```javascript
function getMessageStats() {
  const sheet = ss.getSheetByName("Messages");
  const totalMessages = sheet.getLastRow() - 1;
  const todayMessages = getTodayMessages();
  
  return {
    total: totalMessages,
    today: todayMessages,
    average: totalMessages / getDaysActive()
  };
}
```

### Экспорт данных
```javascript
function exportData() {
  const data = getDataForExport();
  const csvContent = convertToCSV(data);
  const blob = Utilities.newBlob(csvContent, MimeType.CSV, "data.csv");
  
  return blob;
}
```

## 🎉 Результат

После настройки у вас будет:
- ✅ Работающий Telegram бот
- ✅ Интеграция с Google Таблицами
- ✅ Сохранение всех сообщений
- ✅ Статистика и аналитика
- ✅ Интерактивные элементы
- ✅ Экспорт данных

## 📞 Поддержка

- **Автор библиотеки**: https://t.me/nosaev_m
- **Канал автора**: https://zen.yandex.ru/excelifehack
- **Группа поддержки**: https://t.me/googleappsscriptrc
- **Документация API**: https://core.telegram.org/bots/api

## 📝 Лицензия

MIT License - см. файл `src/LICENSE`

---

**Создано для демонстрации возможностей библиотеки TGbot в работе с Google Таблицами** 