/**
 * @author Mikhail Nosaev <m.nosaev@gmail.com>
 * @see {@link https://t.me/nosaev_m Telegram } разработка Google таблиц и GAS скриптов
 * @license MIT
 */
class _Client {
  /**
   * @constructor
   * @type {object} options параметры конструктора.
   * @property {string} options.botToken токен Telegram бота от \@BotFather.
   * @property {string} [options.webAppUrl] ссылка на WebApp Google для работы с ответами doGet(e).
   * @property {boolean} [options.logRequest] печать URL и OPTIONS запроса при выполнении, по умочанию false.
   */
  constructor({ botToken, webAppUrl, logRequest }) {
    this.apiVersion = "6.6";
    this.__botToken = botToken;
    this.__webAppUrl = webAppUrl;
    this.logRequest = logRequest || false;
    this.baseUrl = "https://api.telegram.org/";
    this.__telegramUrl = `${this.baseUrl}bot${this.__botToken}/`;
    this.__fileUrl = `${this.baseUrl}/file/bot${this.__botToken}/`;
  }

  getToken() {
    return this.__botToken;
  }

  /**
   * Метод, для отправки запроса к API Telegram.
   * @param {string} method метод по которому делается запрос.
   * @param {string} payload дополнительные параметры запроса.
   * @param {string} [contentType] "application/x-www-form-urlencoded", "application/json" (по умолчанию), "multipart/form-data".
   * @returns {JSON|TelegramRequestError} в случае успеха возвращается объект JSON.
   */
  request(method, payload, contentType = "application/json") {
    if (!method) helper.miss_parameter("method метода для запроса.");

    const fullUrl = `${this.__telegramUrl}${method}`;

    const options = {
      method: payload ? "POST" : "GET",
      muteHttpExceptions: true,
      followRedirects: true,
      validateHttpsCertificates: true,
    };

    if (payload) {
      payload = helper.removeEmpty(payload);
      const len = Object.entries(payload).length;
      if (contentType === "multipart/form-data") {
        delete options.contentType;
        options["Content-Type"] = contentType;
        options.payload = payload;
      } else {
        options["contentType"] = contentType;
        len ? (options.payload = JSON.stringify(payload)) : null;
      }
      options.method = len ? "POST" : "GET";
    }

    if (this.logRequest)
      console.log(
        `URL >>> ${fullUrl},\nOPTIONS >>>\n ${JSON.stringify(options, null, 5)}`
      );

    let response = UrlFetchApp.fetch(fullUrl, options);

    const code = response.getResponseCode();
    const responseJson = response.getContentText();

    if (code in ResponseCodesHTTP.OTHERCODES) {
      if (this.logRequest)
        console.log(
          "RESPONSE >>>",
          ResponseCodesHTTP.OTHERCODES[code],
          "\n",
          responseJson
        );
      return new TelegramRequestError(JSON.parse(responseJson));
    } else {
      if (this.logRequest)
        console.log("RESPONSE >>>", ResponseCodesHTTP.SUCCESS[code]);
      return JSON.parse(responseJson);
    }
  }
}

class TelegramRequestError extends Error {
  constructor(requestError) {
    super(requestError.message);
    this.name = "TelegramRequestError";
    this.code = requestError.error_code;
    this.codeDescription =
      ResponseCodesHTTP.OTHERCODES[requestError.error_code];
    this.details = requestError.description;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function checkToken(token) {
  if (!token)
    throw new ValidationError(
      `Missed token to access HTTP Telegram API { botToken: "xxxxxxxxxxxxxxxxxxxxxx" }`
    );

  if (typeof token !== "string") {
    throw new ValidationError(
      `Token is invalid! It must be 'str' type instead of ${typeof token} type.`
    );
  }

  if (token.includes(" ")) {
    throw new ValidationError("Token is invalid! It can't contain spaces.");
  }

  if (!/^(\d+):([A-Za-z0-9-_]+)$/.test(token)) {
    throw new ValidationError("Token is invalid!");
  }

  return true;
}
