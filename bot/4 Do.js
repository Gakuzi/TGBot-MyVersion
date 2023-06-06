/* global TelegramBot */

/* exported App */
class App {
  constructor(token) {
    this.token = token;
    this._request = {
      parameter: "",
      pathInfo: "",
      data: {},
    };
  }

  /**
   * @returns {App.Properties}
   */
  get properties() {
    if (!this._properties) {
      this._properties = { script: undefined };
    }
    if (!this._properties.script)
      this._properties.script =
        PropertiesService.getScriptProperties().getProperties();
    return this._properties;
  }

  get bot() {
    if (!this._bot)
      this._bot = new TGbot({
        botToken: this.token
          ? this.token
          : this.properties.script.APP_BOT_TOKEN,
      });

    return this._bot;
  }

  setToken(botToken) {
    this.bot.setToken(botToken);
  }

  setLogRequest() {
    this.bot.setLogRequest();
  }

  setWebhook(options = {}) {
    options.url = options.url ? options.url : ScriptApp.getService().getUrl();
    if (options.url) {
      return this.bot.setWebhook(options);
    }
  }

  deleteWebhook(drop_pending_updates = false) {
    return this.bot.deleteWebhook(drop_pending_updates);
  }

  log(data, parseMode = "Markdown") {
    this.bot.sendMessage({
      chat_id: this.properties.script.APP_LOG_CHAT_ID,
      text: data,
      parse_mode: parseMode,
    });
  }

  toMarkdownCode(text) {
    const wrapper = "```";
    return `${wrapper}\n${text}\n${wrapper}`;
  }

  doPost(e) {
    try {
      this._request.parameter = e.parameter;
      if (e.postData) {
        this._request.data = JSON.parse(e.postData?.contents ?? {});
      } else {
        this._request.data = e.parameter;
      }

      this.bot.sendMessage({
        chat_id: this._request.data?.message.chat.id,
        text: this.toMarkdownCode(JSON.stringify(this._request, null, "  ")),
        parse_mode: "Markdown",
      });
    } catch (err) {
      this.log(
        `${err.message}\n\n${err.stack}\n\n${JSON.stringify(e, null, "  ")}`
      );
    }
  }
}

/* global App */

/* exported init */
function init(token = undefined) {
  return new App(token);
}

// function doPost(e) {
//   try {
//     if (e?.postData?.contents) {
//       const contents = JSON.parse(e.postData.contents);
//       main(contents);
//     }
//   } catch (err) {
//     console.log(JSON.stringify(err));
//   }
// }
