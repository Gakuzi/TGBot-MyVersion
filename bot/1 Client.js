/**
 * @author Mikhail Nosaev <m.nosaev@gmail.com>
 * @see {@link https://t.me/nosaev_m Telegram } development of Google Sheets and Apps Script
 * @license MIT
 */
class _Client {
  /**
   * @constructor
   * @type {object} options - The configuration options for the TGbot.
   * @property {string} options.botToken - The token of the Telegram bot from \@BotFather.
   * @property {string} [options.webAppUrl] - The link to the Google WebApp for working with doGet(e) responses.
   * @property {string} [options.service] The service PropertiesService.getScriptProperties() used by the TGbot.
   * @property {string} [options.parseMode] - Set the parse mode, default is "HTML".
   * @property {boolean} [options.logRequest] - Show the URL and OPTIONS request string when executed, default is false.
   */
  constructor({ botToken, webAppUrl, service, parseMode, logRequest }) {
    this.apiVersion = "6.8";
    this.__botToken = botToken ? botToken : service.getProperties()?.BOT_TOKEN;
    this.__webAppUrl = webAppUrl
      ? webAppUrl
      : service.getProperties()?.WEB_APP_URL;
    this.logRequest = logRequest || false;
    this.baseUrl = "https://api.telegram.org/";
    this.__parseMode = parseMode || "HTML";
    this.service = service;

    if (logRequest) checkToken(this.__botToken);
  }

  /**
   * @type {{string}}
   */
  getToken() {
    return this.__botToken;
  }

  setLogRequest() {
    this.logRequest = true;
  }

  setToken(botToken) {
    this.__botToken = botToken;
  }

  getMethods(method) {
    return helper.getMethodsOfClass(method);
  }

  log(info) {
    return helper.log(info);
  }

  setParseMode(parseMode) {
    this.__parseMode = parseMode;
  }

  /**
   * @type {{string}}
   */
  get telegramUrl() {
    return `${this.baseUrl}bot${this.__botToken}/`;
  }

  /**
   * @type {{string}}
   */
  get fileUrl() {
    return `${this.baseUrl}/file/bot${this.__botToken}/`;
  }

  /**
   * Method for sending a request to the Telegram API.
   * @param {string} method the method by which the request is made https://core.telegram.org/bots/api#available-methods.
   * @param {any} data
   * @returns {globalThis.URL_Fetch.HTTPResponse}
   */
  getResponse(method, data) {
    const httpResponse = UrlFetchApp.fetch(`${this.telegramUrl}${method}`, {
      method: "POST",
      payload: JSON.stringify(data),
      muteHttpExceptions: true,
      followRedirects: true,
      validateHttpsCertificates: true,
    });
    return httpResponse;
  }

  /**
   * Method for sending a request to the Telegram API.
   * @param {string} method the method by which the request is made https://core.telegram.org/bots/api#available-methods.
   * @param {string} payload additional request parameters.
   * @param {string} [contentType] "application/x-www-form-urlencoded", "application/json" (default), "multipart/form-data".
   * @returns {JSON|TelegramRequestError} if successful, returns a JSON object.
   */
  request(method, payload, contentType = "application/json") {
    if (!method) helper.miss_parameter("method метода для запроса.");

    const fullUrl = `${this.telegramUrl}${method}`;

    const options = {
      method: payload ? "POST" : "GET",
      async: true,
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
        options.contentType = contentType;
        len ? (options.payload = JSON.stringify(payload)) : null;
      }
      options.method = len ? "POST" : "GET";
    }

    if (this.logRequest)
      helper.log(
        `URL >>> ${fullUrl}\nOPTIONS >>>\n ${JSON.stringify(options, null, 5)}`
      );

    const response = UrlFetchApp.fetch(fullUrl, options);

    const code = response.getResponseCode();
    const responseJson = response.getContentText();
    if (code in ResponseCodesHTTP.OTHERCODES) {
      if (this.logRequest)
        helper.log(
          `RESPONSE >>> ${ResponseCodesHTTP.OTHERCODES[code]}\n${responseJson}`
        );
      return new TelegramRequestError(JSON.parse(responseJson));
    } else {
      if (this.logRequest)
        helper.log(`RESPONSE >>> ${ResponseCodesHTTP.SUCCESS[code]}`);
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
