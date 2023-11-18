<!-- HEADER START -->
<p>

# TGbot <a href="https://core.telegram.org/bots/api"><img src="src/tg.webp" width="30" height="30"></a>

</p>
<!-- HEADER END -->

Google Apps Script Library for working with [API Telegram](https://core.telegram.org/bots/api).<br/>
Have fun working in GAS using Google Sheets.

[![Donate](https://img.shields.io/badge/Donate-Yoomoney-green.svg)](https://yoomoney.ru/to/410019620244262)
![GitHub last commit](https://img.shields.io/github/last-commit/Guf-Hub/TGBot)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Guf-Hub/TGBot)
![javascript](https://img.shields.io/badge/lang-javascript-red)
![GAS](https://img.shields.io/badge/google-apps%20script-red)

Library Script ID:

```bash
1LyGnqsaphk-K_EB8ZxqcBRiKXRE2TY8oSHWlZn4HBje1WlmoNk51wGeg
```

> Supports work only via Webhook (doPost(e)).

[Bot example](https://t.me/guf_hub_test_bot)<br/>
[Send bugs here](https://t.me/nosaev_m)<br/>
Author channel [ExceLifeHack](https://zen.yandex.ru/excelifehack)<br/>
Help [Google Apps & API. Скрипты, Таблицы, BigQuery, Отчеты, Автоматизация ](https://t.me/googleappsscriptrc)

## Подключение

Open the script editor: Extensions -> Apps Script -> Libraries.

Fill out the fields in the **Add Library** form:

- insert Library Script ID;
- click **Find**;
- select the latest version and click **Add**.

## Bot initialization

```JavaScript
// Telegram bot token from \@BotFather.
const botToken = "<botToken>"

// link to Google WebApp for working with doGet(e) responses.
const webAppUrl = "Optional[<webAppUrl>]"

// print the URL and OPTIONS of the request when executed, false by default.
const logRequest = "Optional[<logRequest>]"

const Bot = TGbot.bot(botToken, webAppUrl, logRequest);
// Bot.setLogRequest(); // if you don't pass logRequest as an argument
// Bot.getInfo(); // information about the bot and available methods
```

## Using methods

```JavaScript
const chat_id = "123456" // recipient's chat_id

// send message
const response = Bot.sendMessage({ chat_id: chat_id, text: "Some text 😁" });

console.log(JSON.stringify(response, null, 7));

const message_id = response?.result?.message_id;

// change message
Bot.editMessageText({
  chat_id: chat_id,
  message_id: message_id ,
  text: "Changed message",
});

// delete message
Bot.deleteMessage({
  chat_id: chat_id,
  message_id: message_id,
});

// send photo
Bot.sendPhoto({
    chat_id: chat_id,
    photo: "photo url",
    caption: "caption",
  });

// send a group of media (photo)
const data = [
  ["photo url", "caption 1"],
  ["photo url", "caption 2"],
  ["photo url", "caption 3"],
].map((item) => TGbot.inputMediaPhoto({ media: item[0], caption: item[1] }));

console.log(JSON.stringify(data, null, 7));
Bot.sendMediaGroup({ chat_id: chat_id, media: data });

// send an image or document using Blob
const ss = SpreadsheetApp.getActiveSpreadsheet();
const sheet = ss.getSheetByName("Sheet name");
// example, sending a graph (photo .png) from a Google Sheets sheet
const blob = sheet.getCharts()[0].getBlob();

Bot.sendPhoto({
  chat_id: chat_id,
  photo: blob,
  contentType: "multipart/form-data" // must be specified
});

Bot.sendDocument({
  chat_id: chat_id,
  document: blob,
  contentType: "multipart/form-data" // must be specified
});

// send an archive with data
// transmit the file name only in Latin, use TGbot.translit(filename) for transliteration.
const filename = 'Test';
// [blob, ...] You can specify multiple Blob files (use different names for the blob)
const zip = Utilities.zip([blob], `${filename}.zip`);

Bot.sendDocument({
  chat_id: chat_id,
  document: zip,
  contentType: "multipart/form-data" // must be specified
});

// send surveys
// regular
Bot.sendPoll({
  chat_id: chat_id,
  question: "How's the weekend?",
  options: ["Fantastic", "Will do", "It used to be better"],
});

// quiz
Bot.sendPoll({
  chat_id: chat_id,
  question: "The parrot and the hamster ate oats and nuts.\nThe hamster didn't eat the oats, who ate the nuts?",
  options: ["Parrot", "Hamster", "Nobody"],
  type: "quiz",
  is_anonymous: false,
  correct_option_id: 1, // correct answer in the array, if 0 then do not transmit
  explanation: "Interesting riddles for children 10 years old!!!"
});

// stop polling
Bot.stopPoll({
  chat_id: chat_id,
  message_id: message_id, // ID of the message with the poll that needs to be stopped
});

/**
 * Saving xlsx file sent to the Webhook bot - doPost(e)
 * on Goole Drive (must be connected to the Drive API project).
 * @param {Message} message the received message.
 * @param {string} folderId ID of the folder where the file will be saved.
 * @return {string} file id of the saved file.
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
    mimeType: MimeType.GOOGLE_SHEETS, // if the parameter is not specified, it will be saved in the original format
    parents: [{ id: folderId }],
  };

  const file = Drive.Files.insert(resource, blob);
  return file.id;
}

```

## Keyboard buttons

```JavaScript
const Keyboard = TGbot.keyboard();
const Key = TGbot.key();

const keys = ["1", "2", "3", "4"];
const KEYBOARD_REPLY = Keyboard.make([keys, "5"], { columns: 2 }).reply();

Bot.sendMessage({
  chat_id: chat_id,
  text: "Sent the keyboard 👇",
  reply_markup: KEYBOARD_REPLY,
});

const KEYBOARD_INLINE = Keyboard.make(
  [Key.url("✅ Press me", "https://www.google.ru")],
  { columns: 1 }
).inline();

Bot.sendMessage({
  chat_id: chat_id,
  text: "And here is the inline keyboard 👇",
  reply_markup: KEYBOARD_INLINE,
});

Bot.sendMessage({
  chat_id: chat_id,
  text: "Remove keyboard 😎",
  reply_markup: Keyboard.remove(),
});

// Inline calendar
// Create a calendar
Bot.sendMessage({
  chat_id: chat_id,
  text: `Select date:`,
  reply_markup: TGbot.calendar({ language: en }), // without parameters, current month
  });

// Callback Inline calendar return
/** @type {CallbackQuery}*/
const callback = contents?.callback_query;

if (callback) {
  const cb_user_id = callback?.from?.id;
  const cb_data = callback?.data;
  const cb_msg = callback?.message;

  if (new Date(cb_data.split(":")[1]) instanceof Date) {
    date = cb_data.split(":")[1];

    if (/DAY/.test(cb_data))
      return Bot.editMessageText({
        message_id: cb_msg.message_id,
        chat_id: cb_user_id,
        text: `Date selected: ${date}`,
       });
    else {
      [year, month, day] = date.split("-");
      return Bot.editMessageReplyMarkup({
        message_id: cb_msg.message_id,
        chat_id: cb_user_id,
        reply_markup: TGbot.calendar({ month: month, year: year }), // pagination <<< >>>
      });
    }
  }
}

```

## Webhook - doPost(e)

```JavaScript
const botToken = "<botToken>"
const webAppUrl = "<webAppUrl>"
const Bot = TGbot.bot(botToken, webAppUrl);

function doPost(e) {
  if (e?.postData?.contents) {
    // parse the received object
    const contents = JSON.parse(e.postData.contents);
    const debug =
      ss.getSheetByName("Debug") || ss.insertSheet("Debug").setTabColor("RED");
    debug.getRange(1, 1).setValue(JSON.stringify(contents, null, 7));

    if (contents.message) {
      /**
       * Copy the criteria from the Types.js file into your project.
       * Use JSDoc to define request types that
       * opens up possibilities for hints in the online editor.
      */

      /** @type {Message}*/
      const msg = contents.message;
      const text = msg.text;
      const chat_id = msg.from.id;

      if (TGbot.isBotCommandMessage(msg)) {
        if (["/start"].includes(text))
          Bot.sendMessage({ chat_id: chat_id, text: `Hello!` });
        else if (["/myid"].includes(text))
          Bot.replyMessage({
            message: msg,
            text: `Your Telegram ID: ${chat_id}`,
          });
        else if (!["/start", "/myid"].includes(text))
          Bot.answerMessage({
            message: msg,
            text: `I don't know such a command ${text} 😕, try again.`,
          });
      } else if (["photo"].includes(text.toLowerCase())) {
        const data = [
           ["photo url", "caption 1"],
           ["photo url", "caption 2"],
           ["photo url", "caption 3"],
        ].map((item) =>
          TGbot.inputMediaPhoto({ media: item[0], caption: item[1] })
        );

        return Bot.sendMediaGroup({ chat_id: chat_id, media: data });
      } else if (["video"].includes(text.toLowerCase()))
        return Bot.sendVideo({ chat_id: chat_id, video: "video url" });
      else
        return Bot.sendMessage({
          chat_id: chat_id,
          text: `I don't understand ¯\_(ツ)_/¯`,
        });
    }
  }
}

```

## JSDoc:

Added Types.js file, author of the idea [**Alexander Ivanov**](https://github.com/contributorpw/telegram-bot-api-gas/blob/master/src/TelegramBot/types.js).<br />
Copy the contents from the Types.js file into your project.<br/>
Once added, you can use JSDoc to refine variable types, which opens up possibilities for hints in the online editor.
![](src/types.png)<br/>

## Library methods (official):
- [setWebhook](https://core.telegram.org/bots/api#setwebhook) method to specify a URL and receive incoming updates through an outgoing webhook.
- [deleteWebhook](https://core.telegram.org/bots/api#deletewebhook) method to remove webhook integration.
- [getWebhookInfo](https://core.telegram.org/bots/api#getwebhookinfo) method for getting the current webhook status.
- [getMe](https://core.telegram.org/bots/api#getme) method for checking your bot's authentication token.
- [logOut](https://core.telegram.org/bots/api#logout) method for logging out of the cloud bot API server before running the bot locally.
- [close](https://core.telegram.org/bots/api#close) method to close a bot instance before moving it from one local server to another.
- [setMyDefaultAdministratorRights](https://core.telegram.org/bots/api#setmydefaultadministratorrights) method for changing the default admin rights requested by the bot when it is added as an administrator to groups or channels.
- [getMyDefaultAdministratorRights](https://core.telegram.org/bots/api#getmydefaultadministratorrights) method to get the current default bot administrator rights.
- [setMyCommands](https://core.telegram.org/bots/api#setmycommands) method for setting the list of bot commands.
- [getMyCommands](https://core.telegram.org/bots/api#getmycommands) method for getting a list of bot commands.
- [deleteMyCommands](https://core.telegram.org/bots/api#deletemycommands) method for deleting the list of bot commands.
- [getChat](https://core.telegram.org/bots/api#getchat) use this method to get up-to-date chat information (current username for one-on-one conversations, current username, group or channel, etc.)
- [getChatAdministrators](https://core.telegram.org/bots/api#getchatadministrators) method for getting a list of chat administrators.
- [setChatAdministratorCustomTitle](https://core.telegram.org/bots/api#setchatadministratorcustomtitle) method for setting a custom title for an administrator in a supergroup promoted by a bot.
- [getChatMemberCount](https://core.telegram.org/bots/api#getchatmembercount) method for getting the number of members in the chat.
- [promoteChatMember](https://core.telegram.org/bots/api#promotechatmember) promote or demote a user in a supergroup or channel.
- [getChatMember](https://core.telegram.org/bots/api#getchatmember) method for obtaining information about a chat member.
- [banChatMember](https://core.telegram.org/bots/api#banchatmember) method for banning a user in a group, supergroup or channel.
- [unbanChatMember](https://core.telegram.org/bots/api#unbanchatmember) method for unblocking a previously banned user in a supergroup or channel.
- [setChatPermissions](https://core.telegram.org/bots/api#setchatpermissions) method for setting default chat permissions for all participants.
- [exportChatInviteLink](https://core.telegram.org/bots/api#exportchatinvitelink) method for creating a new main chat invitation link.
- [createChatInviteLink](https://core.telegram.org/bots/api#createchatinvitelink) method to create an additional link for a chat invitation.
- [editchatinvitelink](https://core.telegram.org/bots/api#editchatinvitelink) method for editing the non-main invitation link created by the bot.
- [restrictChatMember](https://core.telegram.org/bots/api#restrictchatmember) method to restrict a user in a supergroup.
- [setChatPhoto](https://core.telegram.org/bots/api#setchatphoto) method to set a new profile photo for chat.
- [deleteChatPhoto](https://core.telegram.org/bots/api#deletechatphoto) method to delete a chat photo.
- [setChatTitle](https://core.telegram.org/bots/api#setchattitle) method to change the chat title.
- [setChatDescription](https://core.telegram.org/bots/api#setchatdescription) method to change the description of a group, supergroup or channel.
- [setChatMenuButton](https://core.telegram.org/bots/api#setchatmenubutton) method, changing the bot menu button in a private chat or the default menu button.
- [getChatMenuButton](https://core.telegram.org/bots/api#getchatmenubutton) method, getting the current value of the bot menu button in a private chat or the default menu button.
- [pinChatMessage](https://core.telegram.org/bots/api#pinchatmessage) method to add messages to the list of pinned messages in the chat.
- [unpinChatMessage](https://core.telegram.org/bots/api#unpinchatmessage) method for deleting a pinned message in a chat.
- [unpinAllChatMessages](https://core.telegram.org/bots/api#unpinallchatmessages) method for clearing the list of pinned messages in the chat.
- [sendChatAction](https://core.telegram.org/bots/api#sendchataction) method when you need to inform the user that something is happening on the bot’s side.
- [getUserProfilePhotos](https://core.telegram.org/bots/api#getuserprofilephotos) method to get a list of profile pictures for the user.
- [leaveChat](https://core.telegram.org/bots/api#leavechat) use this method to make your bot leave a group, supergroup or channel.
- [sendMessage](https://core.telegram.org/bots/api#sendmessage) method for sending text messages.
- [forwardMessage](https://core.telegram.org/bots/api#forwardmessage) method for forwarding messages of any type.
- [copyMessage](https://core.telegram.org/bots/api#copymessage) method for copying a message.
- [deleteMessage](https://core.telegram.org/bots/api#deletemessage) method for deleting a message.
- [editMessageText](https://core.telegram.org/bots/api#editmessagetext) method for editing text and game messages.
- [editMessageCaption](https://core.telegram.org/bots/api#editmessagecaption) method for editing message captions.
- [editMessageMedia](https://core.telegram.org/bots/api#editmessagemedia) method for editing animation, audio, document, photo or video messages.
- [editMessageReplyMarkup](https://core.telegram.org/bots/api#editmessagereplymarkup) method for editing the markup of message replies.
- [sendPhoto](https://core.telegram.org/bots/api#editmessagereplymarkup) method for sending photos.
- [sendAudio](https://core.telegram.org/bots/api#sendaudio) method for sending audio files.
- [sendDocument](https://core.telegram.org/bots/api#senddocument) method for sending shared files.
- [sendVideo](https://core.telegram.org/bots/api#sendvideo) method for sending videos.
- [sendAnimation](https://core.telegram.org/bots/api#sendanimation) method for sending animation files (GIF video or H.264/MPEG-4 AVC without sound).
- [sendVoice](https://core.telegram.org/bots/api#sendvoice) method for sending audio files if you want Telegram clients to display the file as a playing voice message.
- [sendVideoNote](https://core.telegram.org/bots/api#sendvideonote) method for sending rounded MPEG4 videos up to 1 minute long.
- [sendMediaGroup](https://core.telegram.org/bots/api#sendmediagroup) method for sending a group of photos, videos, documents or audio as an album.
- [sendLocation](https://core.telegram.org/bots/api#sendlocation) method for sending a point on the map.
- [editMessageLiveLocation](https://core.telegram.org/bots/api#editmessagelivelocation) method for editing real-time location messages.
- [stopMessageLiveLocation](https://core.telegram.org/bots/api#stopmessagelivelocation) method to stop updating the message about the current location before the live_period expires.
- [sendVenue](https://core.telegram.org/bots/api#sendvenue) Method for sending information about the venue.
- [sendContact](https://core.telegram.org/bots/api#sendcontact) method for sending phone contacts.
- [sendDice](https://core.telegram.org/bots/api#senddice) method for sending an animated emoji that will display a random value.
- [sendPoll](https://core.telegram.org/bots/api#sendpoll) method for sending your own poll.
- [stopPoll](https://core.telegram.org/bots/api#stoppoll) method to stop a poll sent by a bot.
- [sendSticker](https://core.telegram.org/bots/api#sendsticker) method for sending static .WEBP stickers, animated .TGS or .WEBM video.
- [getStickerSet](https://core.telegram.org/bots/api#getstickerset) method for getting a set of stickers by the name of the set.
- [answerCallbackQuery](https://core.telegram.org/bots/api#answercallbackquery) method for sending responses to callback requests sent from the built-in keyboard.
- [sendInvoice](https://core.telegram.org/bots/api#sendinvoice) method for sending invoices.
- [answerShippingQuery](https://core.telegram.org/bots/api#answershippingquery) method for answering shipping requests.
- [answerPreCheckoutQuery](https://core.telegram.org/bots/api#answerprecheckoutquery) method for answering queries before placing an order.
- [getFile](https://core.telegram.org/bots/api#getfile) method for obtaining basic information about the file and preparing it for downloading.

## Unofficial methods:
- [getPath](https://github.com/Guf-Hub/TGBot/blob/ba5af6b76ca49d2a28194e0d649df061353062de/1%20Class%20TGBot.js#L1958) method for getting the path to the file.
- [getFileDownloadUrl](https://github.com/Guf-Hub/TGBot/blob/ba5af6b76ca49d2a28194e0d649df061353062de/1%20Class%20TGBot.js#L1977) method for obtaining a link to download a file.
- [answerMessage](https://github.com/Guf-Hub/TGBot/blob/ba5af6b76ca49d2a28194e0d649df061353062de/1%20Class%20TGBot.js#L2001) response by from.id to the received message. Pass a message object as the first argument.
- [replyMessage](https://github.com/Guf-Hub/TGBot/blob/ba5af6b76ca49d2a28194e0d649df061353062de/1%20Class%20TGBot.js#L2053) response by message_id to the received message. Pass a message object as the first argument.

## Copyright & License

[MIT License](src/LICENSE)

Copyright (©) 2022 by [Mikhail Nosaev](https://github.com/Guf-Hub)
