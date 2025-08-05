# Анализ библиотеки TGbot и план реализации интерфейса

## Подключение библиотеки
ID: `1LyGnqsaphk-K_EB8ZxqcBRiKXRE2TY8oSHWlZn4HBje1WlmoNk51wGeg`
Версия: 89

## Основные функции библиотеки TGbot

### 1. Инициализация и настройка
- `TGbot.bot({ botToken, webAppUrl, logRequest, service, parseMode })` - создание экземпляра бота
- `Bot.setParseMode("HTML|Markdown|MarkdownV2")` - установка режима парсинга
- `Bot.setLogRequest()` - включение логирования запросов
- `Bot.getToken()` - получение токена
- `Bot.getMe()` - информация о боте
- `Bot.info()` - полная информация о боте и доступных методах

### 2. Webhook управление
- `Bot.setWebhook({ max_connections, allowed_updates, drop_pending_updates })` - установка webhook
- `Bot.getWebhookInfo()` - информация о webhook
- `Bot.deleteWebhook()` - удаление webhook
- `Bot.getUpdates({})` - получение обновлений

### 3. Команды бота
- `Bot.setMyCommands({ commands: [{ command, description }] })` - установка команд
- `Bot.getMyCommands({})` - получение команд
- `Bot.deleteMyCommands({ chat_id, type })` - удаление команд

### 4. Отправка сообщений
- `Bot.sendMessage({ chat_id, text, parse_mode, reply_markup, ... })` - отправка текста
- `Bot.editMessageText({ chat_id, message_id, text, ... })` - редактирование текста
- `Bot.deleteMessage({ chat_id, message_id })` - удаление сообщения
- `Bot.replyMessage({ message, text, ... })` - ответ на сообщение
- `Bot.answerMessage({ message, text, ... })` - ответ пользователю

### 5. Медиа файлы
- `Bot.sendPhoto({ chat_id, photo, caption, ... })` - отправка фото
- `Bot.sendVideo({ chat_id, video, caption, ... })` - отправка видео
- `Bot.sendDocument({ chat_id, document, caption, ... })` - отправка документа
- `Bot.sendAudio({ chat_id, audio, caption, ... })` - отправка аудио
- `Bot.sendVoice({ chat_id, voice, caption, ... })` - отправка голосового
- `Bot.sendVideoNote({ chat_id, video_note, ... })` - отправка видео-заметки
- `Bot.sendAnimation({ chat_id, animation, caption, ... })` - отправка GIF
- `Bot.sendSticker({ chat_id, sticker, ... })` - отправка стикера

### 6. Группы медиа
- `TGbot.inputMediaPhoto({ media, caption, ... })` - фото для группы
- `TGbot.inputMediaVideo({ media, caption, ... })` - видео для группы
- `TGbot.inputMediaAudio({ media, caption, ... })` - аудио для группы
- `TGbot.inputMediaDocument({ media, caption, ... })` - документ для группы
- `Bot.sendMediaGroup({ chat_id, media: [inputMediaArray] })` - отправка группы

### 7. Клавиатуры
- `TGbot.keyboard()` - создание клавиатуры
- `TGbot.key()` - создание кнопки
- `Keyboard.make([buttons], { columns })` - создание клавиатуры
- `Keyboard.reply()` - обычная клавиатура
- `Keyboard.inline()` - встроенная клавиатура
- `Keyboard.remove()` - удаление клавиатуры

### 8. Календарь
- `TGbot.calendar({ month, year })` - встроенный календарь
- Обработка callback для навигации по месяцам
- Выбор даты с возвратом в формате "DAY:YYYY-MM-DD"

### 9. Опросы
- `Bot.sendPoll({ chat_id, question, options, type, is_anonymous, correct_option_id, explanation })` - обычный опрос
- `Bot.sendPoll({ chat_id, question, options, type: "quiz", correct_option_id, explanation })` - викторина
- `Bot.stopPoll({ chat_id, message_id })` - остановка опроса

### 10. Работа с файлами
- `Bot.getFile(file_id)` - получение информации о файле
- `Bot.getPath(file_id)` - получение пути к файлу
- `Bot.getFileDownloadUrl(path)` - получение ссылки для скачивания
- `TGbot.translit(filename)` - транслитерация имени файла

### 11. Дополнительные функции
- `TGbot.helper.log()` - логирование
- `TGbot.isBotCommandMessage(message)` - проверка команды бота

## План реализации интерфейса

### Структура интерфейса (вкладки):

1. **📱 Сообщения** - отправка текстовых сообщений
2. **📷 Медиа** - отправка фото, видео, документов, аудио
3. **⌨️ Клавиатуры** - создание и отправка клавиатур
4. **📅 Календарь** - встроенный календарь
5. **📊 Опросы** - создание опросов и викторин
6. **💬 Чат** - интерфейс чата с историей сообщений
7. **⚙️ Настройки** - настройки бота и webhook

### Функции вкладки "Чат":

1. **Выбор пользователя** - dropdown со списком пользователей
2. **История сообщений** - загрузка и отображение переписки
3. **Действия с сообщениями**:
   - Редактирование текста
   - Удаление сообщения
   - Ответ на сообщение
   - Пересылка сообщения
   - Реакции на сообщения
4. **Отправка новых сообщений**:
   - Текст с форматированием
   - Медиа файлы
   - Клавиатуры
   - Опросы

### Улучшения для отправки файлов:

1. **Drag & Drop** загрузка файлов
2. **Выбор файлов** из Google Drive
3. **Загрузка с компьютера** через input file
4. **Предпросмотр** перед отправкой
5. **Автоматическое определение** типа файла
6. **Поддержка архивов** (ZIP)

### Дополнительные функции:

1. **Логирование** всех действий в отдельный лист
2. **Статистика** использования бота
3. **Экспорт данных** в различные форматы
4. **Резервное копирование** настроек
5. **Тестовые функции** для проверки API
6. **Управление webhook** через интерфейс

## Техническая реализация:

1. **Серверная часть** (Code.gs):
   - Инициализация TGbot библиотеки
   - Функции для работы с Google Sheets
   - API функции для всех методов бота
   - Обработка файлов и медиа

2. **Клиентская часть** (HTML/JS):
   - Современный UI с вкладками
   - Drag & Drop для файлов
   - Интерактивные формы
   - Чат-интерфейс
   - Валидация данных

3. **Интеграция с Google Sheets**:
   - Сохранение сообщений
   - Логирование действий
   - Управление пользователями
   - Статистика и аналитика 