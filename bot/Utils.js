/**
 * Методы поддерживаемые Telegram.
 * @see https://core.telegram.org/bots/api#available-methods
 * @enum {string}
 */

const Methods = Object.freeze({
  // Getting Updates
  GET_UPDATES: "getUpdates", // +
  SET_WEBHOOK: "setWebhook", // +
  DELETE_WEBHOOK: "deleteWebhook", // +
  GET_WEBHOOK_INFO: "getWebhookInfo", // +

  // Available methods
  GET_ME: "getMe", // +
  LOG_OUT: "logOut", // +
  CLOSE: "close", // +
  SEND_MESSAGE: "sendMessage", // +
  FORWARD_MESSAGE: "forwardMessage", // +
  COPY_MESSAGE: "copyMessage", // +
  SEND_PHOTO: "sendPhoto", // +
  SEND_AUDIO: "sendAudio", // +
  SEND_DOCUMENT: "sendDocument", // +
  SEND_VIDEO: "sendVideo", // +
  SEND_ANIMATION: "sendAnimation", // +
  SEND_VOICE: "sendVoice", // +
  SEND_VIDEO_NOTE: "sendVideoNote", // +
  SEND_MEDIA_GROUP: "sendMediaGroup", // +
  SEND_LOCATION: "sendLocation", // +
  SEND_VENUE: "sendVenue", // +
  SEND_CONTACT: "sendContact", // +
  SEND_POLL: "sendPoll", // +
  SEND_DICE: "sendDice", // +
  SEND_CHAT_ACTION: "sendChatAction", // +
  GET_USER_PROFILE_PHOTOS: "getUserProfilePhotos", // +
  GET_FILE: "getFile", // +
  BAN_CHAT_MEMBER: "banChatMember", // +
  UNBAN_CHAT_MEMBER: "unbanChatMember", // +
  RESTRICT_CHAT_MEMBER: "restrictChatMember", // +
  PROMOTE_CHAT_MEMBER: "promoteChatMember", // !!!!!!!!!!!!!!
  SET_CHAT_ADMINISTRATOR_CUSTOM_TITLE: "setChatAdministratorCustomTitle", // +
  BAN_CHAT_SENDER_CHAT: "banChatSenderChat", // !!!!!!!!!!!!!!
  UNBAN_CHAT_SENDER_CHAT: "unbanChatSenderChat", // !!!!!!!!!!!!!!
  SET_CHAT_PERMISSIONS: "setChatPermissions", // +
  EXPORT_CHAT_INVITE_LINK: "exportChatInviteLink", // +
  CREATE_CHAT_INVITE_LINK: "createChatInviteLink", // +
  EDIT_CHAT_INVITE_LINK: "editChatInviteLink", // !!!!!!!!!!!!!!
  REVOKE_CHAT_INVITE_LINK: "revokeChatInviteLink", // !!!!!!!!!!!!!!
  APPROVE_CHAT_JOIN_REQUEST: "approveChatJoinRequest", // !!!!!!!!!!!!!!
  DECLINE_CHAT_JOIN_REQUEST: "declineChatJoinRequest", // !!!!!!!!!!!!!!

  SET_CHAT_PHOTO: "setChatPhoto", // +
  DELETE_CHAT_PHOTO: "deleteChatPhoto", // +
  SET_CHAT_TITLE: "setChatTitle", // +
  SET_CHAT_DESCRIPTION: "setChatDescription", // +
  PIN_CHAT_MESSAGE: "pinChatMessage", // +
  UNPIN_CHAT_MESSAGE: "unpinChatMessage", // +
  UNPIN_ALL_CHAT_MESSAGES: "unpinAllChatMessages", // +
  LEAVE_CHAT: "leaveChat", // +
  GET_CHAT: "getChat", // +
  GET_CHAT_ADMINISTRATORS: "getChatAdministrators", // +
  GET_CHAT_MEMBER_COUNT: "getChatMemberCount", // +
  GET_CHAT_MEMBER: "getChatMember", // +
  SET_CHAT_STICKER_SET: "setChatStickerSet", // !!!!!!!!!!!!!!
  DELETE_CHAT_STICKER_SET: "deleteChatStickerSet", // !!!!!!!!!!!!!!

  GET_FORUM_TOPIC_ICON_STICKERS: "getForumTopicIconStickers", // !!!!!!!!!!!!!
  CREATE_FORUM_TOPIC: "createForumTopic", // !!!!!!!!!!!!!
  EDIT_FORUM_TOPIC: "editForumTopic", // !!!!!!!!!!!!!
  CLOSE_FORUM_TOPIC: "closeForumTopic", // !!!!!!!!!!!!!
  REOPEN_FORUM_TOPIC: "reopenForumTopic", // !!!!!!!!!!!!!
  DELETE_FORUM_TOPIC: "deleteForumTopic", // !!!!!!!!!!!!!
  UNPIN_ALL_FORUM_TOPIC_MESSAGES: "unpinAllForumTopicMessages", // !!!!!!!!!!!!!
  EDIT_GENERAL_FORUM_TOPIC: "editGeneralForumTopic", // !!!!!!!!!!!!!
  CLOSE_GENERAL_FORUM_TOPIC: "closeGeneralForumTopic", // !!!!!!!!!!!!!
  REOPEN_GENERAL_FORUM_TOPIC: "reopenGeneralForumTopic", // !!!!!!!!!!!!!
  HIDE_GENERAL_FORUM_TOPIC: "hideGeneralForumTopic", // !!!!!!!!!!!!!
  UNHIDE_GENERAL_FORUM_TOPIC: "unhideGeneralForumTopic", // !!!!!!!!!!!!!

  ANSWER_CALLBACK_QUERY: "answerCallbackQuery", // +
  SET_MY_COMMANDS: "setMyCommands", // +
  DELETE_MY_COMMANDS: "deleteMyCommands", // +
  GET_MY_COMMANDS: "getMyCommands", // +
  SET_MY_NAME: "setMyName", // +
  GET_MY_NAME: "getMyName", // +
  SET_MY_DESCRIPTION: "setMyDescription", // +
  GET_MY_DESCRIPTION: "getMyDescription", // +
  SET_MY_SHORT_DESCRIPTION: "setMyShortDescription", // +
  GET_MY_SHORT_DESCRIPTION: "getMyShortDescription", // +
  SET_CHAT_MENU_BUTTON: "setChatMenuButton", // +
  GET_CHAT_MENU_BUTTON: "getChatMenuButton", // +
  SET_MY_DEFAULT_ADMINISTRATOR_RIGHTS: "setMyDefaultAdministratorRights", // +
  GET_MY_DEFAULT_ADMINISTRATOR_RIGHTS: "getMyDefaultAdministratorRights", // +

  // Updating messages
  EDIT_MESSAGE_TEXT: "editMessageText", // +
  EDIT_MESSAGE_CAPTION: "editMessageCaption", // +
  EDIT_MESSAGE_MEDIA: "editMessageMedia", // +
  EDIT_MESSAGE_LIVE_LOCATION: "editMessageLiveLocation", // +
  STOP_MESSAGE_LIVE_LOCATION: "stopMessageLiveLocation", // +
  EDIT_MESSAGE_REPLY_MARKUP: "editMessageReplyMarkup", // +
  STOP_POLL: "stopPoll", // +
  DELETE_MESSAGE: "deleteMessage", // +

  // Stickers
  SEND_STICKER: "sendSticker", // +
  GET_STICKER_SET: "getStickerSet", // +

  GET_CUSTOM_EMOJI_STICKERS: "getCustomEmojiStickers", // !!!!!!!!!!!!!!
  UPLOAD_STICKER_FILE: "uploadStickerFile",
  CREATE_NEW_STICKER_SET: "createNewStickerSet", // !!!!!!!!!!!!!!
  ADD_STICKER_TO_SET: "addStickerToSet", // !!!!!!!!!!!!!!
  SET_STICKER_POSITION_IN_SET: "setStickerPositionInSet", // !!!!!!!!!!!!!!
  DELETE_STICKER_FROM_SET: "deleteStickerFromSet", // !!!!!!!!!!!!!!
  SET_STICKER_EMOJI_LIST: "setStickerEmojiList", // !!!!!!!!!!!!!!
  SET_STICKER_KEYWORDS: "setStickerKeywords", // !!!!!!!!!!!!!!
  SET_STICKER_MASK_POSITION: "setStickerMaskPosition", // !!!!!!!!!!!!!!
  SET_STICKER_SET_TITLE: "setStickerSetTitle", // !!!!!!!!!!!!!!
  SET_STICKER_SET_THUMBNAIL: "setStickerSetThumbnail", // !!!!!!!!!!!!!!
  SET_CUSTOM_EMOJI_STICKER_SET_THUMBNAIL: "setCustomEmojiStickerSetThumbnail", // !!!!!!!!!!!!!!
  DELETE_STICKER_SET: "deleteStickerSet", // !!!!!!!!!!!!!!

  // Inline mode
  ANSWER_INLINE_QUERY: "answerInlineQuery", // +
  ANSWER_WEB_APP_QUERY: "answerWebAppQuery", // +

  // Payments
  SEND_INVOICE: "sendInvoice", // + !!
  CREATE_INVOICE_LINK: "createInvoiceLink", // !!!!!!!!!!!!!!
  ANSWER_SHIPPING_QUERY: "answerShippingQuery", // +
  ANSWER_PRE_CHECKOUT_QUERY: "answerPreCheckoutQuery", // +

  // Telegram Passport
  SET_PASSPORT_DATA_ERRORS: "setPassportDataErrors", // !!!!!!!!!!!!!!

  // Games
  SEND_GAME: "sendGame", // !!!!!!!!!!!!!!
  SET_GAME_SCORE: "setGameScore", // !!!!!!!!!!!!!!
  GET_GAME_HIGH_SCORES: "getGameHighScores", // !!!!!!!!!!!!!!
});

const BLOB_FIELDS = [
  "thumb",
  "photo",
  "audio",
  "document",
  "video",
  "animation",
  "video_note",
  "sticker",
  "png_sticker",
  "tgs_sticker",
  "certificate",
];

const DEFAULT_EXTENSIONS = Object.freeze({
  audio: "mp3",
  photo: "jpg",
  sticker: "webp",
  video: "mp4",
  animation: "mp4",
  video_note: "mp4",
  voice: "ogg",
});

/**
 * Расшифровка кодов ответа (состояния) HTTP.
 * @see https://developer.mozilla.org/ru/docs/Web/HTTP/Status
 * @enum {string}
 */
const ResponseCodesHTTP = Object.freeze({
  SUCCESS: Object.freeze({
    200: "200 OK («хорошо»)",
    201: "201 Created («создано»)",
    202: "202 Accepted («принято»)",
    203: "203 Non-Authoritative Information («информация не авторитетна»)",
    204: "204 No Content («нет содержимого»)",
    205: "205 Reset Content («сбросить содержимое»)",
    206: "206 Partial Content («частичное содержимое»)",
    207: "207 Multi-Status («многостатусный»)",
    208: "208 Already Reported («уже сообщалось»)",
    226: "226 IM Used («использовано IM»)",
  }),
  OTHERCODES: Object.freeze({
    100: "100 Continue («продолжай»)",
    101: "101 Switching Protocols («переключение протоколов»)",
    102: "102 Processing («идёт обработка»);",
    103: "103 Early Hints («ранняя метаинформация»)",
    300: "300 Multiple Choices («множество выборов»)",
    301: "301 Moved Permanently («перемещено навсегда»)",
    302: "302 Moved Temporarily («перемещено временно»)",
    303: "303 See Other («смотреть другое»)",
    304: "304 Not Modified («не изменялось»)",
    305: "305 Use Proxy («использовать прокси»)",
    306: "306 - зарезервировано (код использовался только в ранних спецификациях)",
    307: "307 Temporary Redirect («временное перенаправление»)",
    308: "308 Permanent Redirect («постоянное перенаправление»)",
    400: "400 Bad Request («неправильный, некорректный запрос»)",
    401: "401 Unauthorized («не авторизован (не представился)»)",
    402: "402 Payment Required («необходима оплата»)",
    403: "403 Forbidden («запрещено (не уполномочен)»)",
    404: "404 Not Found («не найдено»)",
    405: "405 Method Not Allowed («метод не поддерживается»)",
    406: "406 Not Acceptable («неприемлемо»)",
    407: "407 Proxy Authentication Required («необходима аутентификация прокси»)",
    408: "408 Request Timeout («истекло время ожидания»)",
    409: "409 Conflict («конфликт»)",
    410: "410 Gone («удалён»)",
    411: "411 Length Required («необходима длина»)",
    412: "412 Precondition Failed («условие ложно»)",
    413: "413 Payload Too Large («полезная нагрузка слишком велика»)",
    414: "414 URI Too Long («URI слишком длинный»)",
    415: "415 Unsupported Media Type («неподдерживаемый тип данных»)",
    416: "416 Range Not Satisfiable («диапазон не достижим»)",
    417: "417 Expectation Failed («ожидание не удалось»)",
    418: "418 I’m a teapot («я — чайник»)",
    419: "419 Authentication Timeout (not in RFC 2616) («обычно ошибка проверки CSRF»)",
    421: "421 Misdirected Request",
    422: "422 Unprocessable Entity («необрабатываемый экземпляр»)",
    423: "423 Locked («заблокировано»);",
    424: "424 Failed Dependency («невыполненная зависимость»)",
    425: "425 Too Early («слишком рано»);",
    426: "426 Upgrade Required («необходимо обновление»)",
    428: "428 Precondition Required («необходимо предусловие»)",
    429: "429 Too Many Requests («слишком много запросов»)",
    431: "431 Request Header Fields Too Large («поля заголовка запроса слишком большие»)",
    449: "449 Retry With («повторить с»)",
    451: "451 Unavailable For Legal Reasons («недоступно по юридическим причинам»)",
    499: "499 Client Closed Request (клиент закрыл соединение)",
    500: "500 Internal Server Error («внутренняя ошибка сервера»)",
    501: "501 Not Implemented («не реализовано»)",
    502: "502 Bad Gateway («плохой, ошибочный шлюз»)",
    503: "503 Service Unavailable («сервис недоступен»)",
    504: "504 Gateway Timeout («шлюз не отвечает»)",
    505: "505 HTTP Version Not Supported («версия HTTP не поддерживается»)",
    506: "506 Variant Also Negotiates («вариант тоже проводит согласование»)",
    507: "507 Insufficient Storage («переполнение хранилища»);",
    508: "508 Loop Detected («обнаружено бесконечное перенаправление»)",
    509: "509 Bandwidth Limit Exceeded («исчерпана пропускная ширина канала»)",
    510: "510 Not Extended («не расширено»)",
    511: "511 Network Authentication Required («требуется сетевая аутентификация»)",
    520: "520 Unknown Error («неизвестная ошибка»)",
    521: "521 Web Server Is Down («веб-сервер не работает»)",
    522: "522 Connection Timed Out («соединение не отвечает»)",
    523: "523 Origin Is Unreachable («источник недоступен»)",
    524: "524 A Timeout Occurred («время ожидания истекло»)",
    525: "525 SSL Handshake Failed («квитирование SSL не удалось»)",
    526: "526 Invalid SSL Certificate («недействительный сертификат SSL»)",
  }),
});
