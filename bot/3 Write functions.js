function startAuthorizationMenu(message, botToken) {
  const msg = `
Привет, ${message?.from?.first_name} 👋
Для работы нужна, регистрация! 🙂
Нажми кнопку 👇`;

  const Bot = new TGbot({ botToken: botToken });
  const Kb = new Keyboard();
  const K = new Key();

  const KEYBOARD_CONTACT = Kb.make([K.contact("Авторизация")]).reply();
  Bot.sendMessage({
    chat_id: message.chat.id,
    text: msg,
    reply_markup: KEYBOARD_CONTACT,
  });
}

// меню авторизации для админа, передать id админов в массиве
function adminAuthorizationMenu(message, adminIds, botToken) {
  const msg = `
<strong>Запрос авторизации</strong>
Пользователь: ${message.contact?.first_name}
Телефон: ${message.contact?.phone_number}
user_id: ${message.contact?.user_id}
Разрешить? 👇`;

  const Kb = new Keyboard();
  const K = new Key();

  const KEYBOARD_AUTHORIZATION = Kb.make(
    [K.callback("Авторизовать"), K.callback("Блокировать")],
    { columns: 2 }
  ).inline();

  writeNewUser(message.contact);

  const Bot = new TGbot({ botToken: botToken });

  adminIds.map((id) =>
   Bot.sendMessage({
      chat_id: id,
      text: msg,
      reply_markup: KEYBOARD_AUTHORIZATION,
    })
  );
}

// сбор новых users
function writeNewUser(contact) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet =
    ss.getSheetByName("USERS") || ss.insertSheet("USERS").setTabColor("RED");

  if (sheet.getLastRow() > 0)
    sheet.appendRow([
      new Date(),
      contact?.user_id,
      contact?.first_name,
      contact?.phone_number,
    ]);
  else {
    sheet.appendRow(["Дата", "user id", "Имя", "Телефон", "Авторизация"]);
    sheet.appendRow([
      new Date(),
      contact?.user_id,
      contact?.first_name,
      contact?.phone_number,
    ]);
  }
  SpreadsheetApp.flush();
}

// сообщение ожидание ответа
function awaitMessage(message, botToken, type = 1) {
  const Bot = new TGbot({ botToken: botToken });

  let msg;
  if (type === 1) msg = "⏳ Ждем подтверджения ...";
  if (type === 2) msg = "⏳ Готовим отчёт ...";
  return Bot.sendMessage({
    chat_id: message?.chat?.id,
    text: msg,
    reply_markup: new Keyboard().remove(),
  });
}

// подтверждение авторизации для user
function authorizationConfirmed(message, botToken) {
  const Bot = new TGbot({ botToken: botToken });
  const msg = `
${message?.text.split("\n")[1].split(" ")[1]}, авторизация прошла успешно!!!`;

  Bot.sendMessage({
    chat_id: +message?.text.match(/\d+/gm)[1],
    text: msg,
    reply_markup: new Keyboard().remove(),
  });
}

// проверка авторизован user или нет
function authorizeNewUser(message, value) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("USERS");
  const userIdsValues = sheet.getRange(2, 2, sheet.getLastRow(), 1).getValues();
  let userRows = [];
  for (let i = userIdsValues.length - 1; i >= 0; i--) {
    if (
      userIdsValues[i][0] &&
      userIdsValues[i][0] === +message?.text.match(/\d+/gm)[1]
    ) {
      userRows.push(i + 2);
      // break;
    }
  }

  if (userRows && userRows.length === 1) {
    sheet.getRange(userRows[0], 5).setValue(value);
    SpreadsheetApp.flush();
    return true;
  } else if (userRows.length > 1) {
    userRows.map((item) => sheet.getRange(item, 5).setValue(value));
    SpreadsheetApp.flush();
    return true;
  } else return false;
}

// список user_id
function usersList() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet =
    ss.getSheetByName("USERS") || ss.insertSheet("USERS").setTabColor("RED");
  const lastRow = sheet.getLastRow();
  if (lastRow == 0) return {}; // undefined;
  let data = sheet
    .getRange("A1:E" + lastRow)
    .getValues()
    .filter((i) => i[4] === true);
  const dict = {};
  data.map((item, i) => (dict[item[1]] = i));
  return dict;
}

// сбор location
function writeLocation(message) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet =
    ss.getSheetByName("LOCATION") ||
    ss.insertSheet("LOCATION").setTabColor("RED");
  const lastRow = sheet.getLastRow();
  let data = [
    [
      new Date(),
      message.chat.id,
      `https://t.me/${message.chat.username}` || chat.first_name,
      message.location.latitude,
      message.location.longitude,
      `https://maps.google.ru/maps?q=${message.location.latitude},${message.location.longitude}`,
      `https://yandex.ru/maps/?rtext=~${message.location.latitude}%2C${message.location.longitude}`,
    ],
  ];
  if (lastRow === 0)
    data = [
      ["Дата", "chat_id", "Ник", "Широта", "Долгота", "Google", "Yandex"],
    ].concat(data.map((r) => r));
  sheet.getRange(lastRow + 1, 1, data.length, data[0].length).setValues(data);
  SpreadsheetApp.flush();
}

// запись лога
function writeLogByUser(message) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet =
    ss.getSheetByName("MESSAGES") ||
    ss.insertSheet("MESSAGES").setTabColor("RED");

  const chatType = message.chat.type;
  const checkPm = chatType === "private",
    chat = checkPm ? "" : message.chat.username, // если отправлено не ЛС, то добавляем username чата
    chatTitle = checkPm ? "" : message.chat.title; // и название чата

  const pfileId = message.hasOwnProperty("photo")
    ? message.photo[2].file_id
    : message?.document?.mime_type.split("/")[0] === "image"
    ? message.document.file_id
    : ""; // 2 качество
  const vfileId = message.hasOwnProperty("video") ? message.video.file_id : "";

  if (sheet.getLastRow() > 0)
    sheet.appendRow([
      new Date(),
      chat,
      chatTitle,
      message.from.id,
      message?.from.username,
      message?.from.first_name,
      message.message_id,
      message?.text || message?.caption,
      pfileId,
      vfileId,
      message?.hasOwnProperty("location") ? message.location : "",
      message?.hasOwnProperty("contact") ? message.contact : "",
    ]);
  else {
    sheet.appendRow([
      "Дата",
      "chat",
      "chat_title",
      "user_id",
      "Ник",
      "Имя",
      "message_id",
      "Текст / Подпись",
      "pfileId",
      "vfileId",
      "location",
      "contact",
    ]);
    sheet.appendRow([
      new Date(),
      chat,
      chatTitle,
      message.from.id,
      message?.from.username,
      message?.from.first_name,
      message.message_id,
      message?.text || message?.caption,
      pfileId,
      vfileId,
      message?.hasOwnProperty("location") ? message.location : "",
      message?.hasOwnProperty("contact") ? message.contact : "",
    ]);
  }
  SpreadsheetApp.flush();
}

function saveFile_(id, folder, file_name, mimeType) {
  try {
    const content = getBlob_(id, mimeType);
    return checkFolder_(folder)
      .createFile(content)
      .setName(
        `${file_name} ${d2s_(new Date())}` || `${id} ${d2s_(new Date())}`
      )
      .getUrl();
  } catch (e) {
    console.log(e.stack);
  }
}

function getBlob_(fileId, mimeType) {
  const response = UrlFetchApp.fetch(
    "https://api.telegram.org/bot" + botToken + "/getFile?file_id=" + fileId
  );
  const filePath = JSON.parse(response.getContentText()).result.file_path;
  const fileUrl =
    "https://api.telegram.org/file/bot" + botToken + "/" + filePath;
  return UrlFetchApp.fetch(fileUrl).getBlob().setContentType(mimeType);
}

function checkFolder_(folder_name) {
  const folder = DriveApp.getFoldersByName(folder_name);
  return folder.hasNext() ? folder.next() : DriveApp.createFolder(folder_name);
}

function d2s_(date) {
  return Utilities.formatDate(
    date,
    Session.getScriptTimeZone(),
    "dd-MM-YY HH-mm"
  );
}

// сохраняем фото
function savePhotoVideo(
  chat_id,
  unix_timestamp,
  aUser,
  ms,
  chat,
  chatTitle,
  fileId,
  fileMime,
  fileName,
  sName,
  folderName
) {
  const sh = SpreadsheetApp.openById(config.id.FileWriteOffsId).getSheetByName(
    sName
  );
  const fileUrl = fileId
    ? saveFile_(fileId, folderName, fileName, fileMime)
    : "";
  const data = [
    [
      new Date(unix_timestamp * 1000),
      chat_id,
      chat,
      chatTitle,
      aUser,
      ms,
      fileUrl,
    ],
  ];

  sh.getRange(sh.getLastRow() + 1, 1, 1, data[0].length).setValues(data);
  return fileUrl;
}

function escapingCharactersMarkdown(message) {
  // обработка строки сообщения в MarkdownV2
  return message
    .replace(/(\[[^\][]*]\(http[^()]*\))|[_[\]()~>#+=|{}.!]/gi, (x, y) =>
      y ? y : "\\" + x
    )
    .replace(/(\[[^\][]*]\(http[^()-]*\))|[-]/gi, (x, y) => (y ? y : "\\" + x));
}

function messageIdFromLinkRichTextValue(link, chat_id) {
  // получить message_id из ссылки RichTextValue
  if (!link.getLinkUrl()) {
    console.log("Нет ссылки!!!");
    return;
  }
  if (/-?[0-9]+/.exec(chat_id))
    return link.getLinkUrl().split("/")[5]; // https://t.me/c/chat_id
  else if (/@/.exec(chat_id))
    return link.getLinkUrl().replace(/[^\d]/g, ""); // https://t.me/@username
  else
    throw new Error(
      "Не верный формат chat_id (id или имя пользователя в формате @channelusername)!!!"
    );
}

function isMessageSend({
  range,
  chat_id,
  message_id,
  col,
  uncheck = true,
  setColor = true,
  color = "#93c47d",
}) {
  // сообщение отправлено
  const link = SpreadsheetApp.newRichTextValue()
    .setText(`SEND ${new Date().toLocaleString("ru-RU")}`)
    .setLinkUrl(
      /-?[0-9]+/.exec(chat_id)
        ? `https://t.me/c/${chat_id.toString().replace(-100, "")}/${message_id}`
        : /@/.exec(chat_id)
        ? `https://t.me/${chat_id.replace(/@/g, "")}/${message_id}`
        : null
    )
    .build();
  range.offset(0, col).setRichTextValue(link);
  if (uncheck) range.uncheck();
  if (setColor) range.setBackground(color);
}

function isMessageNoSend({
  range,
  chat_id,
  description,
  message_id,
  col,
  uncheck = true,
  setColor = true,
  color = "#ea9999",
}) {
  // сообщение не отправлено
  const link = SpreadsheetApp.newRichTextValue()
    .setText(
      `NO SEND ${new Date().toLocaleString("ru-RU")}\n${translateMessage({
        message: description,
        transferLanguage: "en",
        sourceLanguage: "ru",
      })}`
    )
    .setLinkUrl(
      /-?[0-9]+/.exec(chat_id)
        ? `https://t.me/c/${chat_id.toString().replace(-100, "")}/${message_id}`
        : /@/.exec(chat_id)
        ? `https://t.me/${chat_id.replace(/@/g, "")}/${message_id}`
        : null
    )
    .build();
  range.offset(0, col).setRichTextValue(link);
  if (uncheck) range.uncheck();
  if (setColor) range.setBackground(color);
}
