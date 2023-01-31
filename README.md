# TGbot

Google Apps Script Library для работы с [API Telegram](https://core.telegram.org/bots/api).<br/>
Работайте удобнее в GAS используя Google Таблицы.

[![Donate](https://img.shields.io/badge/Donate-Yoomoney-green.svg)](https://yoomoney.ru/to/410019620244262)
![GitHub last commit](https://img.shields.io/github/last-commit/Guf-Hub/TGBot)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Guf-Hub/TGBot)
![javascript](https://img.shields.io/badge/lang-javascript-red)
![GAS](https://img.shields.io/badge/google-apps%20script-red)

ID библиотеки:
**1LyGnqsaphk-K_EB8ZxqcBRiKXRE2TY8oSHWlZn4HBje1WlmoNk51wGeg**<br/>
Актуальная версия: 74 от 31 янв., 03:06

> Поддерживает работу только через Webhook (doPost(e)).

[Пример бота](https://t.me/guf_hub_test_bot)<br/>
[Баги отправлять сюда](https://t.me/nosaev_m)<br/>
Канал автора [ExceLifeHack](https://zen.yandex.ru/excelifehack)<br/>
Телеграмм канал про [Google Таблицы](https://t.me/google_sheets)<br/>
Помощь [Google Apps & API. Скрипты, Таблицы, BigQuery, Отчеты, Автоматизация ](https://t.me/googleappsscriptrc)

## Подключение

Откройте редактор скриптов: Расширения -> Apps Script -> Библиотеки.

Заполните поля формы **Добавление библиотеки**:

- вставьте _Идентификатор скрипта библиотеки_;
- Нажмите **Найти**;
- выберите последнюю версию и **Добавить**.

![](src/tgbotconnect.png)

## Инициализация бота

```JavaScript

// токен Telegram бота от \@BotFather.
const botToken = "<botToken>"

// ссылка на WebApp Google для работы с ответами doGet(e).
const webAppUrl = "Optional[<webAppUrl>]"

// печать URL и OPTIONS запроса при выполнении, по умочанию false.
const logRequest = "Optional[<logRequest>]"

const Bot = TGbot.bot(botToken, webAppUrl, logRequest);

```

## Использование методов

```JavaScript

const chat_id = "123456" // chat_id получателя

// отправка сообщения
const response = Bot.sendMessage({ chat_id: chat_id, text: "Какой-то текст 😁" });

console.log(JSON.stringify(response, null, 7));

const message_id = response?.result?.message_id;

// изменение сообщения
Bot.editMessageText({
  chat_id: chat_id,
  message_id: message_id ,
  text: "Изменили сообщение",
});

// удаление сообщения
Bot.deleteMessage({
  chat_id: chat_id,
  message_id: message_id,
});

// отправка фото
Bot.sendPhoto({
    chat_id: chat_id,
    photo: "url фото",
    caption: "Отправка фото",
  });

// отправка группы медиа (фото)
const data = [
  ["url фото", "Подпись 1"],
  ["url фото", "Подпись 2"],
  ["url фото", "Подпись 3"],
].map((item) => TGbot.inputMediaPhoto({ media: item[0], caption: item[1] }));

console.log(JSON.stringify(data, null, 7));
Bot.sendMediaGroup({ chat_id: chat_id, media: data });

// отправка изображения или документа с использованием Blob
const ss = SpreadsheetApp.getActiveSpreadsheet();
const sheet = ss.getSheetByName("Название листа");
// пример, отправка графика (фото .png) с листа Google Sheets
const blob = sheet.getCharts()[0].getBlob();

Bot.sendPhoto({
  chat_id: chat_id,
  photo: blob,
  contentType: "multipart/form-data" // указать обязательно
});

Bot.sendDocument({
  chat_id: chat_id,
  document: blob,
  contentType: "multipart/form-data" // указать обязательно
});

// отправка архива с данными
// название файла передавать только на латинице, используйте для транслитерации TGbot.translit(filename);
const filename = 'Test';
// [blob, ...] можно указать несколько файлов Blob (используйте разные имена для blob)
const zip = Utilities.zip([blob], `${filename}.zip`);

Bot.sendDocument({
  chat_id: chat_id,
  document: zip,
  contentType: "multipart/form-data" // указать обязательно
});

// отправка опросов
// регулярный
Bot.sendPoll({
  chat_id: chat_id,
  question: "Как выходные?",
  options: ["Фантастично", "Пойдёт", "Бывало лучше"],
});

// викторина
Bot.sendPoll({
  chat_id: chat_id,
  question: "Попугай и хомяк ели овес и орехи.\nХомяк не ел овес, кто ел орехи?",
  options: ["Попугай", "Хомяк", "Никто"],
  type: "quiz",
  is_anonymous: false,
  correct_option_id: 1, // правилтный ответ в массиве, если 0 то не передавать
  explanation: "Интересные загадки для 10 лет!!!"
});

// остановка опроса
Bot.stopPoll({
  chat_id: chat_id,
  message_id: message_id, // ID сообщения с опросом который нужно остановить
});

/**
 * Сохранение файла xlsx отправленного в бот Webhook - doPost(e)
 * на Goole Drive (необходимо подключить к проекту Drive API).
 * @param {Message} message полученное сообщение.
 * @param {string} folderId ID папки куда будет сохранен файл.
 * @return {string} file id сохранённого файла.
 */
function saveXlsxFileToDrive(message, folderId) {
  const blob = UrlFetchApp.fetch(
    Bot.getFile(message.document.file_id)
  ).getBlob();
  // const blob = UrlFetchApp.fetch(Bot.getFileDownloadUrl(Bot.getPath(message.document.file_id))).getBlob(); // или так
  const file_name = message.document.file_name.replace(
    `${
      message.document.file_name.split(".")[
        message.document.file_name.split(".").length - 1
      ]
    }.`,
    ""
  );

  const resource = {
    title: file_name,
    mimeType: MimeType.GOOGLE_SHEETS, // если параметр не указать, то сохранится в исходном формате
    parents: [{ id: folderId }],
  };

  const file = Drive.Files.insert(resource, blob);
  return file.id;
}

```

## Кнопки клавиатуры

```JavaScript

const Keyboard = TGbot.keyboard();
const Key = TGbot.key();

const keys = ["1", "2", "3", "4"];
const KEYBOARD_REPLY = Keyboard.make([keys, "5"], { columns: 2 }).reply();

Bot.sendMessage({
  chat_id: chat_id,
  text: "Отправили клавиатуру 👇",
  reply_markup: KEYBOARD_REPLY,
});

const KEYBOARD_INLINE = Keyboard.make(
  [Key.url("✅ Нажми меня", "https://www.google.ru")],
  { columns: 1 }
).inline();

Bot.sendMessage({
  chat_id: chat_id,
  text: "А вот inline клавиатура 👇",
  reply_markup: KEYBOARD_INLINE,
});

Bot.sendMessage({
  chat_id: chat_id,
  text: "Удалить клавиатуру 😎",
  reply_markup: Keyboard.remove(),
});

```

## Webhook - doPost(e)

```JavaScript

const botToken = "<botToken>"
const webAppUrl = "<webAppUrl>"
const Bot = TGbot.bot(botToken, webAppUrl);

function doPost(e) {
  if (e?.postData?.contents) {
    // парсим объет, который пришёл
    const contents = JSON.parse(e.postData.contents);
    const debug =
      ss.getSheetByName("Debug") || ss.insertSheet("Debug").setTabColor("RED");
    debug.getRange(1, 1).setValue(JSON.stringify(contents, null, 7));

    try {
      if (contents.message) {
        /**
         * Копируйте содержимое из файла Types.js в свой проект.
         * Позволяет использовать JSDoc для уточнения типов переменных, что
         * открывает возможности для подсказок в онлайн-редакторе.
        */

        /** @type {Message}*/
        const msg = contents.message;
        const text = msg.text;
        const chat_id = msg.from.id;

        if (TGbot.isBotCommandMessage(msg)) {
          if (["/start"].includes(text))
            Bot.sendMessage({ chat_id: chat_id, text: `Привет!` });
          else if (["/myid"].includes(text))
            Bot.replyMessage({
              message: msg,
              text: `Твой Telegram ID: ${chat_id}`,
            });
          else if (!["/start", "/myid"].includes(text))
            Bot.answerMessage({
              message: msg,
              text: `Я не знаю такой команды ${text} 😕, попробуй еще раз.`,
            });
        } else if (["фото"].includes(text.toLowerCase())) {
          const data = [
            ["url фото", "Подпись 1"],
            ["url фото", "Подпись 2"],
            ["url фото", "Подпись 3"],
          ].map((item) =>
            TGbot.inputMediaPhoto({ media: item[0], caption: item[1] })
          );

          return Bot.sendMediaGroup({ chat_id: chat_id, media: data });
        } else if (["видео"].includes(text.toLowerCase()))
          return Bot.sendVideo({ chat_id: chat_id, video: "url видео" });
        else
          return Bot.sendMessage({
            chat_id: chat_id,
            text: `Не понимаю ¯\_(ツ)_/¯`,
          });
      }
    } catch (err) {
      console.log(err.stack);
    }
  }
}

```

## Обновление:

**28.01.2023** Добавлен файл Types.js, автор [**Alexander Ivanov**](https://github.com/contributorpw/telegram-bot-api-gas/blob/master/src/TelegramBot/types.js).<br/>
Копируйте содержимое из файла Types.js в свой проект.<br/>
После добавления, вы можете использовать JSDoc для уточнения типов переменных, что открывает возможности для подсказок в онлайн-редакторе.
![](src/types.png)<br/>

### Добавлены новые методы:

- exportChatInviteLink
- createChatInviteLink
- editChatInviteLink
- sendAnimation
- sendVoice
- sendVideoNote
- sendLocation
- editMessageLiveLocation
- stopMessageLiveLocation
- sendVenue
- sendContact
- sendDice
<!--

#### Payments

- sendInvoice https://core.telegram.org/bots/api#sendinvoice
- createInvoiceLink
- answerShippingQuery
- answerPreCheckoutQuery
  -->

## Методы библиотеки (официальные):

- [setWebhook](https://core.telegram.org/bots/api#setwebhook) метод, для указания URL-адреса и получения входящих обновлений через исходящий веб-перехватчик.
- [deleteWebhook](https://core.telegram.org/bots/api#deletewebhook) метод, для удаления интеграции с веб-перехватчиком.
- [getWebhookInfo](https://core.telegram.org/bots/api#getwebhookinfo) метод, для получения текущего статуса веб-перехватчика.
- [getMe](https://core.telegram.org/bots/api#getme) метод проверки токена аутентификации вашего бота.
- [logOut](https://core.telegram.org/bots/api#logout) метод выхода из сервера API облачного бота перед локальным запуском бота.
- [close](https://core.telegram.org/bots/api#close) метод чтобы закрыть экземпляр бота перед его перемещением с одного локального сервера на другой.
- [setMyDefaultAdministratorRights](https://core.telegram.org/bots/api#setmydefaultadministratorrights) метод, для измения прав администратора по умолчанию, запрашиваемые ботом, когда он добавляется в качестве администратора в группы или каналы.
- [getMyDefaultAdministratorRights](https://core.telegram.org/bots/api#getmydefaultadministratorrights) метод, для получения текущих прав администратора бота по умолчанию.
- [setMyCommands](https://core.telegram.org/bots/api#setmycommands) метод, для установки списока команд бота.
- [getMyCommands](https://core.telegram.org/bots/api#getmycommands) метод, для получения списка команд бота.
- [deleteMyCommands](https://core.telegram.org/bots/api#deletemycommands) метод, для удаления списока команд бота.
- [getChat](https://core.telegram.org/bots/api#getchat) используйте этот метод для получения актуальной информации о чате (текущее имя пользователя для разговоров один на один, текущее имя пользователя, группы или канала и т. д.).
- [getChatAdministrators](https://core.telegram.org/bots/api#getchatadministrators) метод, для получения списка администраторов в чате.
- [setChatAdministratorCustomTitle](https://core.telegram.org/bots/api#setchatadministratorcustomtitle) метод, для установики пользовательского титула для администратора в супергруппе, продвигаемой ботом.
- [getChatMemberCount](https://core.telegram.org/bots/api#getchatmembercount) метод, для получения количества участников в чате.
- [getChatMember](https://core.telegram.org/bots/api#getchatmember) метод, получения информации об участнике чата.
- [banChatMember](https://core.telegram.org/bots/api#banchatmember) метод, для блокировки пользователя в группе, супергруппе или канале.
- [unbanChatMember](https://core.telegram.org/bots/api#unbanchatmember) метод, для разблокировки ранее забаненного пользователя в супергруппе или канале.
- [setChatPermissions](https://core.telegram.org/bots/api#setchatpermissions) метод, для установки разрешений чата по умолчанию для всех участников.
- [exportChatInviteLink](https://core.telegram.org/bots/api#exportchatinvitelink) метод, для создания новой основной ссылки-приглашения для чата.
- [createChatInviteLink](https://core.telegram.org/bots/api#createchatinvitelink) метод, , чтобы создать дополнительную ссылку для приглашения в чат.
- [editchatinvitelink](https://core.telegram.org/bots/api#editchatinvitelink) метод, для редактирования неосновной ссылки-приглашения, созданной ботом.
- [restrictChatMember](https://core.telegram.org/bots/api#restrictchatmember) метод, чтобы ограничить пользователя в супергруппе.
- [setChatPhoto](https://core.telegram.org/bots/api#setchatphoto) метод, чтобы установить новую фотографию профиля для чата.
- [deleteChatPhoto](https://core.telegram.org/bots/api#deletechatphoto) метод, чтобы удалить фотографию чата.
- [setChatTitle](https://core.telegram.org/bots/api#setchattitle) метод, чтобы изменить название чата.
- [setChatDescription](https://core.telegram.org/bots/api#setchatdescription) метод, чтобы изменить описание группы, супергруппы или канала.
- [setChatMenuButton](https://core.telegram.org/bots/api#setchatmenubutton) метод, изменения кнопки меню бота в приватном чате или кнопки меню по умолчанию.
- [getChatMenuButton](https://core.telegram.org/bots/api#getchatmenubutton) метод, получения текущего значения кнопки меню бота в приватном чате или кнопки меню по умолчанию.
- [pinChatMessage](https://core.telegram.org/bots/api#pinchatmessage) метод, чтобы добавить сообщения в список закрепленных сообщений в чате.
- [unpinChatMessage](https://core.telegram.org/bots/api#unpinchatmessage) метод, для удаления закрепленного сообщения в чате.
- [unpinAllChatMessages](https://core.telegram.org/bots/api#unpinallchatmessages) метод, для очистки списка закрепленных сообщений в чате.
- [sendChatAction](https://core.telegram.org/bots/api#sendchataction) метод, когда вам нужно сообщить пользователю, что что-то происходит на стороне бота.
- [getUserProfilePhotos](https://core.telegram.org/bots/api#getuserprofilephotos) метод, для получения списока изображений профиля для пользователя.
- [leaveChat](https://core.telegram.org/bots/api#leavechat) используйте этот метод чтобы ваш бот покинул группу, супергруппу или канал.
- [sendMessage](https://core.telegram.org/bots/api#sendmessage) метод, для отправки текстовых сообщений.
- [forwardMessage](https://core.telegram.org/bots/api#forwardmessage) метод, для пересылки сообщений любого типа.
- [copyMessage](https://core.telegram.org/bots/api#copymessage) метод, для копирования сообщения.
- [deleteMessage](https://core.telegram.org/bots/api#deletemessage) метод, для удаления сообщения.
- [editMessageText](https://core.telegram.org/bots/api#editmessagetext) метод, для редактирования текстовых и игровых сообщений.
- [editMessageCaption](https://core.telegram.org/bots/api#editmessagecaption) метод, для редактирования подписей к сообщениям.
- [editMessageMedia](https://core.telegram.org/bots/api#editmessagemedia) метод, для редактирования анимации, аудио, документа, фото или видео сообщения.
- [editMessageReplyMarkup](https://core.telegram.org/bots/api#editmessagereplymarkup) метод, для редактирования разметки ответов сообщений.
- [sendPhoto](https://core.telegram.org/bots/api#editmessagereplymarkup) метод, для отправки фотографий.
- [sendAudio](https://core.telegram.org/bots/api#sendaudio) метод, для отправки отправки аудиофайлов.
- [sendDocument](https://core.telegram.org/bots/api#senddocument) метод, для отправки общих файлов.
- [sendVideo](https://core.telegram.org/bots/api#sendvideo) метод, для отправки видео.
- [sendAnimation](https://core.telegram.org/bots/api#sendanimation) метод, для отправки файлов анимации (видео GIF или H.264/MPEG-4 AVC без звука).
- [sendVoice](https://core.telegram.org/bots/api#sendvoice) метод, для отправки аудиофайлов, если вы хотите, чтобы клиенты Telegram отображали файл как воспроизводимое голосовое сообщение.
- [sendVideoNote](https://core.telegram.org/bots/api#sendvideonote) метод, для отправки закругленных видео MPEG4 продолжительностью до 1 минуты.
- [sendMediaGroup](https://core.telegram.org/bots/api#sendmediagroup) метод, отправки группы фотографий, видео, документов или аудио в виде альбома.
- [sendLocation](https://core.telegram.org/bots/api#sendlocation) метод, для отправки точки на карте.
- [editMessageLiveLocation](https://core.telegram.org/bots/api#editmessagelivelocation) метод, для редактирования сообщений о местоположении в реальном времени.
- [stopMessageLiveLocation](https://core.telegram.org/bots/api#stopmessagelivelocation) метод, для остановки обновления сообщения о текущем местоположении до истечения срока действия live_period.
- [sendVenue](https://core.telegram.org/bots/api#sendvenue) Метод, для отправки информации о месте проведения.
- [sendContact](https://core.telegram.org/bots/api#sendcontact) метод, для отправки телефонных контактов.
- [sendDice](https://core.telegram.org/bots/api#senddice) метод, для отправики анимированный эмодзи, который будет отображать случайное значение.
- [sendPoll](https://core.telegram.org/bots/api#sendpoll) метод, для отправки отправки собственного опроса.
- [stopPoll](https://core.telegram.org/bots/api#stoppoll) метод, для остановки опроса, отправленный ботом.
- [sendSticker](https://core.telegram.org/bots/api#sendsticker) метод, отправки статических стикеров .WEBP, анимированных .TGS или видео .WEBM.
- [getStickerSet](https://core.telegram.org/bots/api#getstickerset) метод, для получения набора наклеек по названию набора.
- [answerCallbackQuery](https://core.telegram.org/bots/api#answercallbackquery) метод, для отправки ответов на запросы обратного вызова, отправленные со встроенной клавиатуры.
- [sendInvoice](https://core.telegram.org/bots/api#sendinvoice) метод, для отправки счетов.
- [answerShippingQuery](https://core.telegram.org/bots/api#answershippingquery) метод, для ответа на запросы о доставке.
- [answerPreCheckoutQuery](https://core.telegram.org/bots/api#answerprecheckoutquery) метод, для ответа запросы перед оформлением заказа.
- [getFile](https://core.telegram.org/bots/api#getfile) метод, для получения основной информации о файле и подготовки его к загрузке.

## Неофициальные методы:

- [getPath](https://github.com/Guf-Hub/TGBot/blob/ba5af6b76ca49d2a28194e0d649df061353062de/1%20Class%20TGBot.js#L1958) метод, для получения пути к файлу.
- [getFileDownloadUrl](https://github.com/Guf-Hub/TGBot/blob/ba5af6b76ca49d2a28194e0d649df061353062de/1%20Class%20TGBot.js#L1977) метод, получения ссылки на скачивание файла.
- [answerMessage](https://github.com/Guf-Hub/TGBot/blob/ba5af6b76ca49d2a28194e0d649df061353062de/1%20Class%20TGBot.js#L2001) ответ по from.id на получнное сообщение. Передать объект message в качестве первого аргумента.
- [replyMessage](https://github.com/Guf-Hub/TGBot/blob/ba5af6b76ca49d2a28194e0d649df061353062de/1%20Class%20TGBot.js#L2053) ответ по message_id на получнное сообщение. Передать объект message в качестве первого аргумента.

## Copyright & License

[MIT License](src/LICENSE)

Copyright (©) 2022 by [Mikhail Nosaev](https://github.com/Guf-Hub)

Настоящим предоставляется бесплатное разрешение любому лицу, получившему копию этого программного обеспечения и связанных с ним файлов документации («Программное обеспечение»), работать с Программным обеспечением без ограничений, включая, помимо прочего, права на использование, копирование, изменение, слияние. Публиковать, распространять, сублицензировать и/или продавать копии Программного обеспечения, а также разрешать лицам, которым предоставляется Программное обеспечение, делать это при соблюдении следующих условий:

Приведенное выше уведомление об авторских правах и это уведомление о разрешении должны быть включены во все копии или существенные части Программного обеспечения.

ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ», БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ, ВКЛЮЧАЯ, ПОМИМО ПРОЧЕГО, ГАРАНТИИ КОММЕРЧЕСКОЙ ПРИГОДНОСТИ, ПРИГОДНОСТИ ДЛЯ ОПРЕДЕЛЕННОЙ ЦЕЛИ И НЕНАРУШЕНИЯ ПРАВ. НИ ПРИ КАКИХ ОБСТОЯТЕЛЬСТВАХ АВТОРЫ ИЛИ ОБЛАДАТЕЛИ АВТОРСКИМ ПРАВОМ НЕ НЕСУТ ОТВЕТСТВЕННОСТИ ЗА ЛЮБЫЕ ПРЕТЕНЗИИ, УЩЕРБ ИЛИ ИНУЮ ОТВЕТСТВЕННОСТЬ, БУДУТ СВЯЗАННЫЕ С ДОГОВОРОМ, ДЕЛОМ ИЛИ ИНЫМ ОБРАЗОМ, ВОЗНИКАЮЩИЕ ИЗ ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ ИЛИ ИСПОЛЬЗОВАНИЯ ИЛИ ИНЫХ СДЕЛОК В СВЯЗИ С ПРОГРАММНЫМ ОБЕСПЕЧЕНИЕМ ИЛИ ИСПОЛЬЗОВАНИЕМ ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ.
