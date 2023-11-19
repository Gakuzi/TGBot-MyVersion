// var logRequest = false;

/**
 * A GAS wrapper for the
 * {@link https://core.telegram.org/bots/api Telegram API}
 * @author Mikhail Nosaev <m.nosaev@gmail.com>
 * @see {@link https://t.me/nosaev_m Telegram} development of Google Sheets and Apps Script
 * @license MIT
 */
class TGbot extends _Client {
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
    super({ botToken, webAppUrl, service, parseMode, logRequest });
    this.InputMediaDocument = InputMediaPhoto;
    this.InputMediaDocument = InputMediaVideo;
    this.InputMediaDocument = InputMediaAnimation;
    this.InputMediaDocument = InputMediaAudio;
    this.InputMediaDocument = InputMediaDocument;
  }

  /**
   * Returns information about the Instance.
   *
   * @return {Object} info - An object containing information about the API:
   *   - apiVersion (string): The version of the API.
   *   - description (string): A description of the API.
   *   - link (string): The link to the official documentation of the API.
   *   - baseUrl (string): The base URL of the API.
   *   - botToken (string): The token of the bot.
   *   - webAppUrl (string): The URL of the web application.
   *   - methods (Array): An array of methods available in the API.
   */
  info() {
    const info = {
      apiVersion: this.apiVersion,
      description: "A GAS wrapper for the Telegram API",
      link: "https://core.telegram.org/bots/api",
      baseUrl: this.baseUrl,
      botToken: this.__botToken,
      webAppUrl: this.__webAppUrl,
      methods: this.getMethods(TGbot),
    };
    return this.log(info);
  }

  /**
   * @private
   * Check message length.
   * @param {string} msg_text the text of the message to be sent.
   * @param {string} caption_text caption for the document of the message being sent.
   * @param {string} callback_query_text message notification text.
   * @returns {Error} returns an error if the size is exceeded.
   */
  _lengthError({
    msg_text,
    caption_text,
    chat_title,
    chat_description,
    question_text,
    explanation_text,
    callback_query_text,
    link_name,
    member_limit,
  }) {
    if (msg_text && msg_text.length > 4096)
      throw new Error(
        `Длина текста отправляемого сообщения ${msg_text.length} > 1-4096 символов.`
      );
    if (caption_text && caption_text.length > 1024)
      throw new Error(
        `Длина подписи ${caption_text.length} > 0-1024 символов.`
      );
    if (chat_title && chat_title.length > 255)
      throw new Error(
        `Длина нового названия чата ${chat_title.length} > 1-255 символов.`
      );
    if (chat_description && chat_description.length > 255)
      throw new Error(
        `Длина нового описания чата ${chat_description.length} > 0-255 символов.`
      );
    if (question_text && question_text.length > 300)
      throw new Error(
        `Длина вопроса ${question_text.length} > 1-300 символов.`
      );
    if (explanation_text && explanation_text.length > 200)
      throw new Error(
        `Длина текста, который отображается, когда пользователь выбирает ${explanation_text.length} > 1-200 символов.`
      );
    if (callback_query_text && callback_query_text.length > 200)
      throw new Error(
        `Длина текста уведомления ${callback_query_text.length} > 200 символов.`
      );

    if (link_name && link_name.length > 32)
      throw new Error(
        `Имя пригласительной ссылки ${member_limit.length} > 0 - 32 символа.`
      );

    if (member_limit && member_limit > 99999)
      throw new Error(
        `Передано ${member_limit}, максимальное кол-во пользователей не может быть > 99999.`
      );
  }

  // Getting updates

  /**
   * Use this method to receive incoming updates using long polling (wiki). Returns an Array of Update objects.
   * @see {@link https://core.telegram.org/bots/api#getupdates getUpdates}
   * @typedef {object} getUpdates
   * @property {number} [offset] - Identifier of the first update to be returned. Must be greater by one than the highest among the identifiers
   * of previously received updates.
   * By default, updates starting with the earliest unconfirmed update are returned. An update is considered confirmed as soon as getUpdates
   * is called with an offset higher
   * than its update_id. The negative offset can be specified to retrieve updates starting from -offset update from the end of the updates queue.
   * All previous updates will be forgotten.
   * @property {number} [limit] - Limits the number of updates to be retrieved. Values between 1-100 are accepted. Defaults to 100.
   * @property {number} [timeout] - Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive,
   * short polling should be used for testing purposes only.
   * @property {string[]} [allowed_updates] - A JSON-serialized list of the update types you want your bot to receive.
   * For example, specify ["message", "edited_channel_post", "callback_query"] to only receive updates of these types.
   * See Update for a complete list of available update types. Specify an empty list to receive all update types except chat_member (default).
   * If not specified, the previous setting will be used. Please note that this parameter doesn't affect updates created before the call to the getUpdates,
   * so unwanted updates may be received for a short period of time.
   * @returns {Update[]}
   */
  getUpdates({ offset, limit, timeout, allowed_updates }) {
    const query = {
      offset: offset ? Number(offset) : null,
      limit: limit ? Number(limit) : null,
      timeout: timeout ? Number(timeout) : null,
      allowed_updates: allowed_updates ? JSON.stringify(allowed_updates) : null,
    };

    return this.request(Methods.GET_UPDATES, query);
  }

  /**
   * Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot,
   * we will send an HTTPS POST request to the specified URL, containing a JSON-serialized Update. In case of an unsuccessful request,
   * we will give up after a reasonable amount of attempts. Returns True on success.
   * If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter secret_token.
   * If specified, the request will contain a header "X-Telegram-Bot-Api-Secret-Token" with the secret token as content.
   * @see {@link https://core.telegram.org/bots/api#setwebhook setWebhook}
   * @typedef {object} setWebhook
   * @property {string} url - HTTPS URL to send updates to. Use an empty string to remove webhook integration.
   * @property {InputFile} [certificate] - Upload your public key certificate so that the root certificate in use can be checked. See our self-signed guide for details.
   * @property {string} [ip_address] - The fixed IP address which will be used to send webhook requests instead of the IP address resolved through DNS.
   * @property {number} [max_connections] - The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery, 1-100.
   * Defaults to 40. Use lower values to limit the load on your bot's server, and higher values to increase your bot's throughput.
   * @property {string[]} [allowed_updates] - A JSON-serialized list of the update types you want your bot to receive.
   * For example, specify ["message", "edited_channel_post", "callback_query"] to only receive updates of these types.
   * See Update for a complete list of available update types. Specify an empty list to receive all update types except chat_member (default).
   * If not specified, the previous setting will be used. Please note that this parameter doesn't affect updates created before the call to the setWebhook,
   * so unwanted updates may be received for a short period of time.
   * @property {boolean} [drop_pending_updates] - Pass True to drop all pending updates.
   * @property {string} [secret_token] - A secret token to be sent in a header "X-Telegram-Bot-Api-Secret-Token" in every webhook request, 1-256 characters.
   * Only characters A-Z, a-z, 0-9, _ and - are allowed. The header is useful to ensure that the request comes from a webhook set by you.
   * @returns {boolean}
   */
  setWebhook({
    url = this.__webAppUrl,
    certificate,
    ip_address,
    max_connections = 40,
    allowed_updates = [],
    drop_pending_updates,
    secret_token,
  }) {
    // const _ = arguments[0];
    // _.url = url;

    const query = {
      url: url,
      certificate: certificate ? JSON.stringify(certificate) : null,
      ip_address: ip_address ? String(ip_address) : null,
      max_connections: Number(max_connections),
      allowed_updates: allowed_updates ? JSON.stringify(allowed_updates) : null,
      drop_pending_updates: Boolean(drop_pending_updates),
      secret_token: secret_token ? String(secret_token) : null,
    };

    return this.log(this.request(Methods.SET_WEBHOOK, query));
  }

  /**
   * Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#deletewebhook deleteWebhook}
   * @typedef {object} deleteWebhook
   * @property {boolean} [drop_pending_updates] - Pass True to drop all pending updates.
   * @returns {boolean}
   */
  deleteWebhook(drop_pending_updates) {
    const query = {
      drop_pending_updates: Boolean(drop_pending_updates),
    };

    return this.log(this.request(Methods.DELETE_WEBHOOK, query));
  }

  /**
   * Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object.
   * If the bot is using getUpdates, will return an object with the url field empty.
   * @see {@link https://core.telegram.org/bots/api#getwebhookinfo getWebhookInfo}
   * @returns {WebhookInfo} В случае успеха возвращает объект WebhookInfo. Если бот использует getUpdates, он вернет объект с пустым полем URL.
   */
  getWebhookInfo() {
    const query = {
      url: String(this.__webAppUrl),
    };

    return this.log(this.request(Methods.GET_WEBHOOK_INFO, query));
  }

  // Available methods

  /**
   * A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a User object.
   * @see {@link https://core.telegram.org/bots/api#getme getMe}
   * @returns {User}
   */
  getMe() {
    return this.request(Methods.GET_ME);
  }

  /**
   * Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out the bot before running it locally,
   * otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server,
   * but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters.
   * @see {@link https://core.telegram.org/bots/api#logout logOut}
   * @returns {boolean}
   */
  logOut() {
    return this.request(Methods.LOG_OUT);
  }

  /**
   * Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method
   * to ensure that the bot isn't launched again after server restart.
   * The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on success. Requires no parameters.
   * @see {@link https://core.telegram.org/bots/api#close close}
   * @returns {boolean}
   */
  close() {
    return this.request(Methods.CLOSE);
  }

  /**
   * Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels.
   * These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#setmydefaultadministratorrights setMyDefaultAdministratorRights}
   * @typedef {object} setMyDefaultAdministratorRights
   * @property {ChatAdministratorRights} [rights] - A JSON-serialized object describing new default administrator rights.
   * If not specified, the default administrator rights will be cleared.
   * @property {boolean} [for_channels] - Pass True to change the default administrator rights of the bot in channels.
   * Otherwise, the default administrator rights of the bot for groups and supergroups will be changed.
   * @returns {boolean}
   */
  setMyDefaultAdministratorRights({ rights, for_channels }) {
    if (!rights)
      helper.miss_parameter(
        "rights объект JSON, описывающий новые права администратора по умолчанию."
      );

    const query = {
      rights: JSON.stringify(rights),
      for_channels: Boolean(for_channels),
    };

    return this.request(Methods.SET_MY_DEFAULT_ADMINISTRATOR_RIGHTS, query);
  }

  /**
   * Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success.
   * @see {@link https://core.telegram.org/bots/api#getmydefaultadministratorrights getMyDefaultAdministratorRights}
   * @typedef {object} getMyDefaultAdministratorRights
   * @property {boolean} [for_channels] - Pass True to get default administrator rights of the bot in channels. Otherwise, default administrator rights
   *  of the bot for groups and supergroups will be returned.
   * @returns {ChatAdministratorRights}
   */
  getMyDefaultAdministratorRights(for_channels) {
    const query = {
      for_channels: Boolean(for_channels),
    };

    return this.request(Methods.GET_MY_DEFAULT_ADMINISTRATOR_RIGHTS, query);
  }

  /**
   * Use this method to change the list of the bot's commands. See this manual for more details about bot commands. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#setmycommands setMyCommands}
   * @typedef {object} setMyCommands
   * @property {BotCommand[]} commands - A JSON-serialized list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified.
   * @property {BotCommandScope} [scope] - A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault.
   * @property {string} [language_code] - A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope,
   * for whose language there are no dedicated commands.
   * @returns {boolean}
   */
  setMyCommands({ commands, scope, language_code }) {
    if (!commands || commands.length === 0)
      helper.miss_parameter(
        "commands объект JSON, описывающий новые права администратора по умолчанию."
      );

    const query = {
      commands: JSON.stringify(commands),
      scope: scope ? JSON.stringify(scope) : null,
      language_code: language_code || null,
    };

    return this.request(Methods.SET_MY_COMMANDS, query);
  }

  /**
   * Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of BotCommand objects.
   * If commands aren't set, an empty list is returned.
   * @see {@link https://core.telegram.org/bots/api#getmycommands getMyCommands}
   * @typedef {object} getMyCommands
   * @property {BotCommandScope} [scope] - A JSON-serialized object, describing scope of users. Defaults to BotCommandScopeDefault.
   * @property {string} [language_code] - A two-letter ISO 639-1 language code or an empty string.
   * @returns {BotCommand[]}
   */
  getMyCommands({ scope, language_code }) {
    const query = {
      scope: scope ? JSON.stringify(scope) : null,
      language_code: language_code || null,
    };
    return this.request(Methods.GET_MY_COMMANDS, query);
  }

  /**
   * Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users.
   * Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#deletemycommands deleteMyCommands}
   * @typedef {object} deleteMyCommands
   * @property {BotCommandScope} [scope] - A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault.
   * @property {string} [language_code] - A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope,
   * for whose language there are no dedicated commands.
   * @returns {boolean}
   */
  deleteMyCommands({ scope, language_code }) {
    const query = {
      scope: scope ? JSON.stringify(scope) : null,
      language_code: language_code || null,
    };

    return this.request(Methods.DELETE_MY_COMMANDS, query);
  }

  // Chat

  /**
   * Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.).
   * Returns a Chat object on success.
   * @see {@link https://core.telegram.org/bots/api#getchat getChat}
   * @typedef {object} getChat
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername).
   * @returns {Chat}
   */
  getChat(chat_id) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевой группы или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
    };

    return this.request(Methods.GET_CHAT, query);
  }

  /**
   * Use this method to get a list of administrators in a chat, which aren't bots. Returns an Array of ChatMember objects.
   * @see {@link https://core.telegram.org/bots/api#getchatadministrators getChatAdministrators}
   * @typedef {object} getChatAdministrators
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername).
   * @returns {ChatMember[]}
   */
  getChatAdministrators(chat_id) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
    };

    return this.request(Methods.GET_CHAT_ADMINISTRATORS, query);
  }

  /**
   * Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#setchatadministratorcustomtitle setChatAdministratorCustomTitle}
   * @typedef {object} setChatAdministratorCustomTitle
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
   * @property {number} user_id - Unique identifier of the target user.
   * @property {string} custom_title - New custom title for the administrator; 0-16 characters, emoji are not allowed.
   * @returns {boolean}
   */
  setChatAdministratorCustomTitle({ chat_id, user_id, custom_title }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    if (!user_id)
      helper.miss_parameter(
        "user_id уникальный идентификатор идентификатор целевого пользователя."
      );
    if (!custom_title)
      helper.miss_parameter(
        "custom_title новый пользовательский титул для администратора 0-16 символов."
      );

    const query = {
      chat_id: String(chat_id),
      user_id: String(user_id),
      custom_title: String(custom_title),
    };

    return this.request(Methods.SET_CHAT_ADMINISTRATOR_CUSTOM_TITLE, query);
  }

  /**
   * Use this method to get the number of members in a chat. Returns Int on success.
   * @see {@link https://core.telegram.org/bots/api#getchatmembercount getChatMemberCount}
   * @typedef {object} getChatMemberCount
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername).
   * @returns {number}
   */
  getChatMemberCount(chat_id) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
    };

    return this.request(Methods.GET_CHAT_MEMBER_COUNT, query);
  }

  /**
   * Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat.
   * Returns a ChatMember object on success.
   * @see {@link https://core.telegram.org/bots/api#getchatmember getChatMember}
   * @typedef {object} getChatMember
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername).
   * @property {number} user_id - Unique identifier of the target user.
   * @returns {ChatMember}
   */
  getChatMember({ chat_id, user_id }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    if (!user_id)
      helper.miss_parameter(
        "user_id уникальный идентификатор идентификатор целевого пользователя."
      );

    const query = {
      chat_id: String(chat_id),
      user_id: String(user_id),
    };

    return this.request(Methods.GET_CHAT_MEMBER, query);
  }

  /**
   * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for
   * this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user.
   * Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#promotechatmember promoteChatMember}
   * @typedef {object} promoteChatMember
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} user_id - Unique identifier of the target user.
   * @property {boolean} [is_anonymous] - Pass True if the administrator's presence in the chat is hidden.
   * @property {boolean} [can_manage_chat] - Pass True if the administrator can access the chat event log, chat statistics, message statistics in channels,
   * see channel members, see anonymous administrators in supergroups and ignore slow mode. Implied by any other administrator privilege.
   * @property {boolean} [can_post_messages] - Pass True if the administrator can create channel posts, channels only.
   * @property {boolean} [can_edit_messages] - Pass True if the administrator can edit messages of other users and can pin messages, channels only.
   * @property {boolean} [can_delete_messages] - Pass True if the administrator can delete messages of other users.
   * @property {boolean} [can_manage_video_chats] - Pass True if the administrator can manage video chats.
   * @property {boolean} [can_restrict_members] - Pass True if the administrator can restrict, ban or unban chat members.
   * @property {boolean} [can_promote_members] - Pass True if the administrator can add new administrators with a subset of their own privileges or
   * demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by him).
   * @property {boolean} [can_change_info] - Pass True if the administrator can change chat title, photo and other settings.
   * @property {boolean} [can_invite_users] - Pass True if the administrator can invite new users to the chat.
   * @property {boolean} [can_pin_messages] - Pass True if the administrator can pin messages, supergroups only.
   * @property {boolean} [can_manage_topics] - Pass True if the user is allowed to create, rename, close, and reopen forum topics, supergroups only.
   * @returns {boolean}
   */
  promoteChatMember({
    chat_id,
    user_id,
    is_anonymous,
    can_manage_chat,
    can_post_messages,
    can_edit_messages,
    can_delete_messages,
    can_manage_video_chats,
    can_restrict_members,
    can_promote_members,
    can_change_info,
    can_invite_users,
    can_pin_messages,
    can_manage_topics,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате @channelusername)."
      );
    if (!user_id)
      helper.miss_parameter(
        "user_id уникальный идентификатор идентификатор целевого пользователя."
      );

    const query = {
      chat_id: String(chat_id),
      user_id: String(user_id),
      is_anonymous: Boolean(is_anonymous) || null,
      can_manage_chat: Boolean(can_manage_chat) || null,
      can_post_messages: Boolean(can_post_messages) || null,
      can_edit_messages: Boolean(can_edit_messages) || null,
      can_delete_messages: Boolean(can_delete_messages) || null,
      can_manage_video_chats: Boolean(can_manage_video_chats) || null,
      can_restrict_members: Boolean(can_restrict_members) || null,
      can_promote_members: Boolean(can_promote_members) || null,
      can_change_info: Boolean(can_change_info) || null,
      can_invite_users: Boolean(can_invite_users) || null,
      can_pin_messages: Boolean(can_pin_messages) || null,
      can_manage_topics: Boolean(can_manage_topics) || null,
    };

    return this.request(Methods.PROMOTE_CHAT_MEMBER, query);
  }

  /**
   * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels,
   * the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#banchatmember banChatMember}
   * @typedef {object} banChatMember
   * @property {string|number} chat_id - Unique identifier for the target group or username of the target supergroup or channel (in the format @channelusername).
   * @property {number} user_id - Unique identifier of the target user.
   * @property {number} [until_date] - Date when the user will be unbanned; Unix time. If user is banned for more than 366 days or less than 30 seconds
   * from the current time they are considered to be banned forever. Applied for supergroups and channels only.
   * @property {boolean} [revoke_messages] - Pass True to delete all messages from the chat for the user that is being removed.
   * If False, the user will be able to see messages in the group that were sent before the user was removed. Always True for supergroups and channels.
   * @returns {boolean}
   */
  banChatMember({ chat_id, user_id, until_date, revoke_messages }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате @channelusername)."
      );
    if (!user_id)
      helper.miss_parameter(
        "user_id уникальный идентификатор идентификатор целевого пользователя."
      );

    const query = {
      chat_id: String(chat_id),
      user_id: String(user_id),
      until_date: until_date ? Number(until_date) : null,
      revoke_messages: Boolean(revoke_messages),
    };

    return this.request(Methods.BAN_CHAT_MEMBER, query);
  }

  /**
   * Use this method to unban a previously banned user in a supergroup or channel.
   * The user will not return to the group or channel automatically, but will be able to join via link, etc.
   * The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member
   * of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat.
   * If you don't want this, use the parameter only_if_banned. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#unbanchatmember unbanChatMember}
   * @typedef {object} unbanChatMember
   * @property {string|number} chat_id - Unique identifier for the target group or username of the target supergroup or
   * channel (in the format @channelusername).
   * @property {number} user_id - Unique identifier of the target user.
   * @property {boolean} [only_if_banned] - Do nothing if the user is not banned.
   * @returns {boolean}
   */
  unbanChatMember({ chat_id, user_id, only_if_banned }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате @channelusername)."
      );
    if (!user_id)
      helper.miss_parameter(
        "user_id уникальный идентификатор идентификатор целевого пользователя."
      );

    const query = {
      chat_id: String(chat_id),
      user_id: String(user_id),
      only_if_banned: Boolean(only_if_banned),
    };

    return this.request(Methods.UNBAN_CHAT_MEMBER, query);
  }

  /**
   * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work
   * and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#restrictchatmember restrictChatMember}
   * @typedef {object} restrictChatMember
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
   * @property {number} user_id - Unique identifier of the target user.
   * @property {ChatPermissions} permissions - A JSON-serialized object for new user permissions.
   * @property {boolean} [use_independent_chat_permissions] - Pass True if chat permissions are set independently.
   * Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios,
   * can_send_documents,
   * can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply
   * the can_send_messages permission.
   * @property {number} [until_date] - Date when restrictions will be lifted for the user; Unix time.
   * If user is restricted for more than 366 days or less than 30 seconds from the current time, they are considered to be restricted forever.
   * @returns {boolean}
   */
  restrictChatMember({
    chat_id,
    user_id,
    permissions,
    use_independent_chat_permissions,
    until_date,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    if (!user_id)
      helper.miss_parameter(
        "user_id уникальный идентификатор целевого пользователя."
      );
    if (!permissions || permissions == {})
      helper.miss_parameter(
        "permissions JSON-сериализованный объект для новых разрешений чата по умолчанию."
      );

    const query = {
      chat_id: String(chat_id),
      user_id: Number(user_id),
      permissions: JSON.stringify(permissions),
      use_independent_chat_permissions: Boolean(
        use_independent_chat_permissions
      ),
      until_date: until_date ? Number(until_date) : null,
    };

    return this.request(Methods.RESTRICT_CHAT_MEMBER, query);
  }

  /**
   * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of
   * the banned chat won't be able to send messages on behalf of any of their channels.
   * The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights.
   * Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#banchatsenderchat banChatSenderChat}
   * @typedef {object} banChatSenderChat
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} sender_chat_id - Unique identifier of the target sender chat.
   * @returns {boolean}
   */
  banChatSenderChat({ chat_id, sender_chat_id }) {
    const query = {
      chat_id: String(chat_id),
      sender_chat_id: Number(sender_chat_id),
    };

    return this.request(Methods.BAN_CHAT_SENDER_CHAT, query);
  }

  /**
   * Use this method to unban a previously banned channel chat in a supergroup or channel.
   * The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#unbanchatsenderchat unbanChatSenderChat}
   * @typedef {object} unbanChatSenderChat
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} sender_chat_id - Unique identifier of the target sender chat.
   * @returns {boolean}
   */
  unbanChatSenderChat({ chat_id, sender_chat_id }) {
    const query = {
      chat_id: String(chat_id),
      sender_chat_id: Number(sender_chat_id),
    };

    return this.request(Methods.UNBAN_CHAT_SENDER_CHAT, query);
  }

  /**
   * Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for
   * this to work and must have the can_restrict_members administrator rights. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#setchatpermissions setChatPermissions}
   * @typedef {object} setChatPermissions
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
   * @property {ChatPermissions} permissions - A JSON-serialized object for new default chat permissions.
   * @property {boolean} [use_independent_chat_permissions] - Pass True if chat permissions are set independently.
   * Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios,
   * can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions;
   * the can_send_polls permission will imply the can_send_messages permission.
   * @returns {boolean}
   */
  setChatPermissions({
    chat_id,
    permissions,
    use_independent_chat_permissions,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    if (!permissions || permissions == {})
      helper.miss_parameter(
        "permissions JSON-сериализованный объект для новых разрешений чата по умолчанию."
      );

    const query = {
      chat_id: String(chat_id),
      permissions: JSON.stringify(permissions),
      use_independent_chat_permissions: Boolean(
        use_independent_chat_permissions
      ),
    };

    return this.request(Methods.SET_CHAT_PERMISSIONS, query);
  }

  /**
   * Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success.
   * @see {@link https://core.telegram.org/bots/api#exportchatinvitelink exportChatInviteLink}
   * @typedef {object} exportChatInviteLink
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @returns {string}
   */
  exportChatInviteLink(chat_id) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
    };

    return this.request(Methods.EXPORT_CHAT_INVITE_LINK, query);
  }

  /**
   * Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat
   * for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink.
   * Returns the new invite link as ChatInviteLink object.
   * @see {@link https://core.telegram.org/bots/api#createchatinvitelink createChatInviteLink}
   * @typedef {object} createChatInviteLink
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {string} [name] - Invite link name; 0-32 characters.
   * @property {number} [expire_date] - Point in time (Unix timestamp) when the link will expire.
   * @property {number} [member_limit] - The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999.
   * @property {boolean} [creates_join_request] - True, if users joining the chat via the link need to be approved by chat administrators.
   * If True, member_limit can't be specified.
   * @returns {ChatInviteLink}
   */
  createChatInviteLink({
    chat_id,
    name,
    expire_date,
    member_limit,
    creates_join_request,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    this._lengthError({ link_name: name });
    this._lengthError({ member_limit: member_limit });

    const query = {
      chat_id: String(chat_id),
      name: name ? String(name) : null,
      expire_date: expire_date ? Number(expire_date) : null,
      member_limit: member_limit ? Number(member_limit) : null,
      creates_join_request: Boolean(creates_join_request),
    };

    return this.request(Methods.CREATE_CHAT_INVITE_LINK, query);
  }

  /**
   * Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat
   * for this to work and must have the appropriate administrator rights. Returns the edited invite link as a ChatInviteLink object.
   * @see {@link https://core.telegram.org/bots/api#editchatinvitelink editChatInviteLink}
   * @typedef {object} editChatInviteLink
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {string} invite_link - The invite link to edit.
   * @property {string} [name] - Invite link name; 0-32 characters.
   * @property {number} [expire_date] - Point in time (Unix timestamp) when the link will expire.
   * @property {number} [member_limit] - The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999.
   * @property {boolean} [creates_join_request] - True, if users joining the chat via the link need to be approved by chat administrators.
   * If True, member_limit can't be specified.
   * @returns {ChatInviteLink}
   */
  editChatInviteLink({
    chat_id,
    invite_link,
    name,
    expire_date,
    member_limit,
    creates_join_request,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    if (!invite_link)
      helper.miss_parameter(
        "invite_link Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    this._lengthError({ link_name: name });
    this._lengthError({ member_limit: member_limit });

    const query = {
      chat_id: String(chat_id),
      invite_link: String(invite_link),
      name: name ? String(name) : null,
      expire_date: expire_date ? Number(expire_date) : null,
      member_limit: member_limit ? Number(member_limit) : null,
      creates_join_request: Boolean(creates_join_request),
    };

    return this.request(Methods.EDIT_CHAT_INVITE_LINK, query);
  }

  /**
   * Use this method to revoke an invite link created by the bot. If the primary link is revoked, a
   * new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the
   * appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object.
   * @see {@link https://core.telegram.org/bots/api#revokechatinvitelink revokeChatInviteLink}
   * @typedef {object} revokeChatInviteLink
   * @property {string|number} chat_id - Unique identifier of the target chat or username of the target channel (in the format @channelusername).
   * @property {string} invite_link - The invite link to revoke.
   * @returns {ChatInviteLink}
   */
  revokeChatInviteLink({ chat_id, invite_link }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    if (!invite_link)
      helper.miss_parameter(
        "invite_link Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
      invite_link: String(invite_link),
    };

    return this.request(Methods.REVOKE_CHAT_INVITE_LINK, query);
  }

  /**
   * Use this method to approve a chat join request. The bot must be an administrator in the chat for
   * this to work and must have the can_invite_users administrator right. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#approvechatjoinrequest approveChatJoinRequest}
   * @typedef {object} approveChatJoinRequest
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} user_id - Unique identifier of the target user.
   * @returns {boolean}
   */
  approveChatJoinRequest({ chat_id, user_id }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    if (!user_id)
      helper.miss_parameter("user_id Unique identifier of the target user.");

    const query = {
      chat_id: String(chat_id),
      user_id: Number(user_id),
    };

    return this.request(Methods.APPROVE_CHAT_JOIN_REQUEST, query);
  }

  /**
   * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work
   * and must have the can_invite_users administrator right. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#declinechatjoinrequest declineChatJoinRequest}
   * @typedef {object} declineChatJoinRequest
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} user_id - Unique identifier of the target user.
   * @returns {boolean}
   */
  declineChatJoinRequest({ chat_id, user_id }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    if (!user_id)
      helper.miss_parameter("user_id Unique identifier of the target user.");

    const query = {
      chat_id: String(chat_id),
      user_id: Number(user_id),
    };

    return this.request(Methods.DECLINE_CHAT_JOIN_REQUEST, query);
  }

  /**
   * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#setchatphoto setChatPhoto}
   * @typedef {object} setChatPhoto
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {InputFile} photo - New chat photo, uploaded using multipart/form-data.
   * @returns {boolean}
   */
  setChatPhoto({ chat_id, photo }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    if (!photo)
      helper.miss_parameter(
        "photo New chat photo, uploaded using multipart/form-data."
      );

    const query = {
      chat_id: String(chat_id),
      photo: photo,
    };

    return this.request(Methods.SET_CHAT_PHOTO, query, "multipart/form-data");
  }

  /**
   * Use this method to delete a chat photo. Photos can't be changed for private chats.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#deletechatphoto deleteChatPhoto}
   * @typedef {object} deleteChatPhoto
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @returns {boolean}
   */
  deleteChatPhoto(chat_id) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
    };

    return this.request(Methods.DELETE_CHAT_PHOTO, query);
  }

  /**
   * Use this method to change the title of a chat. Titles can't be changed for private chats.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#setchattitle setChatTitle}
   * @typedef {object} setChatTitle
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {string} title - New chat title, 1-128 characters.
   * @returns {boolean}
   */
  setChatTitle({ chat_id, title }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    if (!title)
      helper.miss_parameter("title New chat title, 1-128 characters.");
    this._lengthError({
      chat_title: title,
    });

    const query = {
      chat_id: String(chat_id),
      title: title,
    };

    return this.request(Methods.SET_CHAT_TITLE, query);
  }

  /**
   * Use this method to change the description of a group, a supergroup or a channel.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#setchatdescription setChatDescription}
   * @typedef {object} setChatDescription
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {string} [description] - New chat description, 0-255 characters.
   * @returns {boolean}
   */
  setChatDescription({ chat_id, description }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    if (description)
      this._lengthError({
        chat_description: description,
      });

    const query = {
      chat_id: String(chat_id),
      description: description ? String(description) : null,
    };

    return this.request(Methods.SET_CHAT_DESCRIPTION, query);
  }

  /**
   * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#setchatstickerset setChatStickerSet}
   * @typedef {object} setChatStickerSet
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
   * @property {string} sticker_set_name - Name of the sticker set to be set as the group sticker set.
   * @returns {boolean}
   */
  setChatStickerSet({ chat_id, sticker_set_name }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)."
      );

    if (!sticker_set_name)
      helper.miss_parameter(
        "sticker_set_name Name of the sticker set to be set as the group sticker set."
      );

    const query = {
      chat_id: String(chat_id),
      sticker_set_name: String(sticker_set_name),
    };

    return this.request(Methods.SET_CHAT_STICKER_SET, query);
  }

  /**
   * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for
   * this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set optionally returned in getChat
   * requests to check if the bot can use this method. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#deletechatstickerset deleteChatStickerSet}
   * @typedef {object} deleteChatStickerSet
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
   * @returns {boolean}
   */
  deleteChatStickerSet(chat_id) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)."
      );

    const query = {
      chat_id: String(chat_id),
    };

    return this.request(Methods.DELETE_CHAT_STICKER_SET, query);
  }

  /**
   * Use this method to change the bot's name. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#setmyname setMyName}
   * @typedef {object} setMyName
   * @property {string} [name] - New bot name; 0-64 characters. Pass an empty string to remove the dedicated name for the given language.
   * @property {string} [language_code] - A two-letter ISO 639-1 language code. If empty, the name will be shown to all users for
   * whose language there is no dedicated name.
   * @returns {boolean}
   */
  setMyName({ name, language_code }) {
    const query = {
      name: name ? String(name) : null,
      language_code: language_code || null,
    };

    return this.request(Methods.SET_MY_NAME, query);
  }

  /**
   * Use this method to get the current bot name for the given user language. Returns BotName on success.
   * @see {@link https://core.telegram.org/bots/api#getmyname getMyName}
   * @typedef {object} getMyName
   * @property {string} [language_code] - A two-letter ISO 639-1 language code or an empty string.
   * @returns {BotName}
   */
  getMyName(language_code) {
    const query = {
      language_code: language_code || null,
    };

    return this.request(Methods.GET_MY_NAME, query);
  }

  /**
   * Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#setmydescription setMyDescription}
   * @typedef {object} setMyDescription
   * @property {string} [description] - New bot description; 0-512 characters. Pass an empty string to remove the dedicated description for the given language.
   * @property {string} [language_code] - A two-letter ISO 639-1 language code. If empty, the description will be applied to all users for whose language
   * there is no dedicated description.
   * @returns {boolean}
   */
  setMyDescription({ description, language_code }) {
    const query = {
      description: description ? String(description) : null,
      language_code: language_code || null,
    };

    return this.request(Methods.SET_MY_DESCRIPTION, query);
  }

  /**
   * Use this method to get the current bot description for the given user language. Returns BotDescription on success.
   * @see {@link https://core.telegram.org/bots/api#getmydescription getMyDescription}
   * @typedef {object} getMyDescription
   * @property {string} [language_code] - A two-letter ISO 639-1 language code or an empty string.
   * @returns {BotDescription}
   */
  getMyDescription(language_code) {
    const query = {
      language_code: language_code || null,
    };

    return this.request(Methods.GET_MY_DESCRIPTION, query);
  }

  /**
   * Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot.
   * Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#setmyshortdescription setMyShortDescription}
   * @typedef {object} setMyShortDescription
   * @property {string} [short_description] - New short description for the bot; 0-120 characters. Pass an empty string to remove the dedicated short description
   *  for the given language.
   * @property {string} [language_code] - A two-letter ISO 639-1 language code. If empty, the short description will be applied to all users for whose language
   *  there is no dedicated short description.
   * @returns {boolean}
   */
  setMyShortDescription({ short_description, language_code }) {
    const query = {
      short_description: short_description ? String(short_description) : null,
      language_code: language_code || null,
    };

    return this.request(Methods.SET_MY_SHORT_DESCRIPTION, query);
  }

  /**
   * Use this method to get the current bot short description for the given user language. Returns BotShortDescription on success.
   * @see {@link https://core.telegram.org/bots/api#getmyshortdescription getMyShortDescription}
   * @typedef {object} getMyShortDescription
   * @property {string} [language_code] - A two-letter ISO 639-1 language code or an empty string.
   * @returns {BotShortDescription}
   */
  getMyShortDescription(language_code) {
    const query = {
      language_code: language_code || null,
    };

    return this.request(Methods.GET_MY_SHORT_DESCRIPTION, query);
  }

  /**
   * Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#setchatmenubutton setChatMenuButton}
   * @typedef {object} setChatMenuButton
   * @property {number} [chat_id] - Unique identifier for the target private chat. If not specified, default bot's menu button will be changed.
   * @property {MenuButton} [menu_button] - A JSON-serialized object for the bot's new menu button. Defaults to MenuButtonDefault.
   * @returns {boolean}
   */
  setChatMenuButton({ chat_id, menu_button }) {
    const query = {
      chat_id: chat_id ? String(chat_id) : null,
      menu_button: menu_button || null,
    };

    return this.request(Methods.SET_CHAT_MENU_BUTTON, query);
  }

  /**
   * Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success.
   * @see {@link https://core.telegram.org/bots/api#getchatmenubutton getChatMenuButton}
   * @typedef {object} getChatMenuButton
   * @property {number} [chat_id] - Unique identifier for the target private chat. If not specified, default bot's menu button will be returned.
   * @returns {MenuButton}
   */
  getChatMenuButton(chat_id) {
    const query = {
      chat_id: chat_id ? String(chat_id) : null,
    };

    return this.request(Methods.GET_CHAT_MENU_BUTTON, query);
  }

  /**
   * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat,
   * the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' administrator right in a supergroup
   * or 'can_edit_messages' administrator right in a channel. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#pinchatmessage pinChatMessage}
   * @typedef {object} pinChatMessage
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} message_id - Identifier of a message to pin.
   * @property {boolean} [disable_notification] - Pass True if it is not necessary to send a notification to all chat members about the new pinned message.
   * Notifications are always disabled in channels and private chats.
   * @returns {boolean}
   */
  pinChatMessage({ chat_id, message_id, disable_notification }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    if (!message_id)
      helper.miss_parameter(
        "message_id идентификатор сообщения для закрепления."
      );

    const query = {
      chat_id: String(chat_id),
      message_id: Number(message_id),
      disable_notification: Boolean(disable_notification),
    };

    return this.request(Methods.PIN_CHAT_MESSAGE, query);
  }

  /**
   * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat,
   * the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' administrator right in a supergroup
   * or 'can_edit_messages' administrator right in a channel. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#unpinchatmessage unpinChatMessage}
   * @typedef {object} unpinChatMessage
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_id] - Identifier of a message to unpin. If not specified, the most recent pinned message (by sending date) will be unpinned.
   * @returns {boolean}
   */
  unpinChatMessage({ chat_id, message_id }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
      message_id: message_id ? Number(message_id) : null,
    };

    return this.request(Methods.UNPIN_CHAT_MESSAGE, query);
  }

  /**
   * Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat
   * for this to work and must have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator right in a channel.
   * Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#unpinallchatmessages unpinAllChatMessages}
   * @typedef {object} unpinAllChatMessages
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @returns {boolean}
   */
  unpinAllChatMessages(chat_id) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
    };

    return this.request(Methods.UNPIN_ALL_CHAT_MESSAGES, query);
  }

  /**
   * Use this method for your bot to leave a group, supergroup or channel. Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#leavechat leaveChat}
   * @typedef {object} leaveChat
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername).
   * @returns {boolean}
   */
  leaveChat(chat_id) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
    };

    return this.request(Methods.LEAVE_CHAT, query);
  }

  /**
   * Use this method when you need to tell the user that something is happening on the bot's side.
   * The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.
   * We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive.
   * @see {@link https://core.telegram.org/bots/api#sendchataction sendChatAction}
   * @typedef {object} sendChatAction
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread; supergroups only.
   * @property {string} action - Type of action to broadcast. Choose one, depending on what the user is about to receive:
   * typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_voice or upload_voice for voice notes,
   * upload_document for general files, choose_sticker for stickers, find_location for location data, record_video_note or upload_video_note for video notes.
   * @returns {boolean}
   */
  sendChatAction({ chat_id, action }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    if (!action) helper.miss_parameter("action тип действия для трансляции.");

    const query = {
      chat_id: String(chat_id),
      action: String(action),
    };

    return this.request(Methods.SEND_CHAT_ACTION, query);
  }

  /**
   * Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object.
   * @see {@link https://core.telegram.org/bots/api#getuserprofilephotos getUserProfilePhotos}
   * @typedef {object} getUserProfilePhotos
   * @property {number} user_id - Unique identifier of the target user.
   * @property {number} [offset] - Sequential number of the first photo to be returned. By default, all photos are returned.
   * @property {number} [limit] - Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100.
   * @returns {UserProfilePhotos}
   */
  getUserProfilePhotos({ chat_id, offset, limit }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
      offset: offset ? Number(offset) : null,
      limit: limit ? Number(limit) : null,
    };

    return this.request(Methods.GET_USER_PROFILE_PHOTOS, query);
  }

  // Message

  /**
   * Use this method to send text messages. On success, the sent Message is returned.
   * @see {@link https://core.telegram.org/bots/api#sendmessage sendMessage}
   * @see {@link https://core.telegram.org/bots/api#formatting-options Formats}
   * @typedef {object} sendMessage
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {string} text - Text of the message to be sent, 1-4096 characters after entities parsing.
   * @property {string} [parse_mode] - Mode for parsing entities in the message text. See formatting options for more details.
   * @property {MessageEntity[]} [entities] - A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode.
   * @property {boolean} [disable_web_page_preview] - Disables link previews for links in this message.
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for
   * an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   * @returns {Message}
   */
  sendMessage({
    chat_id,
    message_thread_id,
    text,
    parse_mode,
    entities,
    disable_web_page_preview,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате @channelusername)."
      );
    if (!text)
      helper.miss_parameter(
        "text текст отправляемого сообщения, 1-4096 символов."
      );
    this._lengthError({
      msg_text: text,
    });

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      text: String(text),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
      parse_mode: parse_mode ? String(parse_mode) : this.__parseMode,
      entities: entities ? JSON.stringify(entities) : null,
      disable_web_page_preview: Boolean(disable_web_page_preview),
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
    };

    return this.request(Methods.SEND_MESSAGE, query);
  }

  /**
   * Use this method to forward messages of any kind. Service messages can't be forwarded. On success, the sent Message is returned.
   * @see {@link https://core.telegram.org/bots/api#forwardmessage forwardMessage}
   * @typedef {object} forwardMessage
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {string|number} from_chat_id - Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername).
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the forwarded message from forwarding and saving.
   * @property {number} message_id - Message identifier in the chat specified in from_chat_id.
   * @returns {Message}
   */
  forwardMessage({
    chat_id,
    message_thread_id,
    from_chat_id,
    message_id,
    disable_notification,
    protect_content,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате @channelusername)."
      );
    if (!from_chat_id)
      helper.miss_parameter(
        "from_chat_id уникальный идентификатор чата, в который было отправлено исходное сообщение (или имя пользователя канала в формате @channelusername)."
      );
    if (!message_id)
      helper.miss_parameter(
        "message_id идентификатор сообщения в чате указанный в from_chat_id."
      );

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      from_chat_id: String(from_chat_id),
      message_id: Number(message_id),
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
    };

    return this.request(Methods.FORWARD_MESSAGE, query);
  }

  /**
   * Use this method to copy messages of any kind. Service messages and invoice messages can't be copied. A quiz poll can be copied only if the
   * value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a
   * link to the original message. Returns the MessageId of the sent message on success.
   * @see {@link https://core.telegram.org/bots/api#copymessage copyMessage}
   * @typedef {object} copyMessage
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {string|number} from_chat_id - Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername).
   * @property {number} message_id - Message identifier in the chat specified in from_chat_id.
   * @property {string} [caption] - New caption for media, 0-1024 characters after entities parsing. If not specified, the original caption is kept.
   * @property {string} [parse_mode] - Mode for parsing entities in the new caption. See formatting options for more details.
   * @property {MessageEntity[]} [caption_entities] - A JSON-serialized list of special entities that appear in the new caption, which can be specified instead of parse_mode.
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for
   * an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   * @returns {MessageId}
   */
  copyMessage({
    chat_id,
    message_thread_id,
    from_chat_id,
    message_id,
    caption,
    reply_markup,
    parse_mode,
    caption_entities,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате @channelusername)."
      );
    if (!from_chat_id)
      helper.miss_parameter(
        "from_chat_id уникальный идентификатор чата, в который было отправлено исходное сообщение (или имя пользователя канала в формате @channelusername)."
      );
    if (!message_id)
      helper.miss_parameter(
        "message_id идентификатор сообщения в чате указанный в from_chat_id."
      );
    this._lengthError({
      caption_text: caption,
    });

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      from_chat_id: String(from_chat_id),
      message_id: Number(message_id),
      caption: caption ? String(caption) : null,
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
      parse_mode: parse_mode ? String(parse_mode) : this.__parseMode,
      caption_entities: caption_entities
        ? JSON.stringify(caption_entities)
        : null,
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
    };

    return this.request(Methods.COPY_MESSAGE, query);
  }

  // Updating messages

  /**
   * Use this method to delete a message, including service messages, with the following limitations:.
   * - A message can only be deleted if it was sent less than 48 hours ago.
   * - Service messages about a supergroup, channel, or forum topic creation can't be deleted.
   * - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
   * - Bots can delete outgoing messages in private chats, groups, and supergroups.
   * - Bots can delete incoming messages in private chats.
   * - Bots granted can_post_messages permissions can delete outgoing messages in channels.
   * - If the bot is an administrator of a group, it can delete any message there.
   * - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
   * Returns True on success.
   * @see {@link https://core.telegram.org/bots/api#deletemessage deleteMessage}
   * @typedef {object} deleteMessage
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} message_id - Identifier of the message to delete.
   * @returns {boolean}
   */
  deleteMessage({ chat_id, message_id }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате @channelusername)."
      );
    if (!message_id)
      helper.miss_parameter("message_id идентификатор сообщения для удаления.");

    const query = {
      chat_id: String(chat_id),
      message_id: Number(message_id),
    };

    return this.request(Methods.DELETE_MESSAGE, query);
  }

  /**
   * Use this method to edit text and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   * @see {@link https://core.telegram.org/bots/api#editmessagetext editMessageText}
   * @typedef {object} editMessageText
   * @property {string|number} [chat_id] - Required if inline_message_id is not specified. Unique identifier for the target chat or username
   *  of the target channel (in the format @channelusername).
   * @property {number} [message_id] - Required if inline_message_id is not specified. Identifier of the message to edit.
   * @property {string} [inline_message_id] - Required if chat_id and message_id are not specified. Identifier of the inline message.
   * @property {string} text - New text of the message, 1-4096 characters after entities parsing.
   * @property {string} [parse_mode] - Mode for parsing entities in the message text. See formatting options for more details.
   * @property {MessageEntity[]} [entities] - A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode.
   * @property {boolean} [disable_web_page_preview] - Disables link previews for links in this message.
   * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for an inline keyboard.
   * @returns {Message|Boolean}
   */
  editMessageText({
    chat_id,
    message_id,
    inline_message_id,
    text,
    parse_mode,
    entities,
    disable_web_page_preview,
    reply_markup,
  }) {
    if (!text)
      helper.miss_parameter("text новый текст сообщения, 1-4096 символов.");
    this._lengthError({
      msg_text: text,
    });

    if ((chat_id && message_id && text) || (inline_message_id && text))
      var query = {
        chat_id: chat_id ? String(chat_id) : null,
        message_id: message_id ? Number(message_id) : null,
        inline_message_id: inline_message_id ? String(inline_message_id) : null,
        text: String(text),
        parse_mode: parse_mode ? String(parse_mode) : this.__parseMode,
        entities: entities ? JSON.stringify(entities) : null,
        disable_web_page_preview: Boolean(disable_web_page_preview),
        reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
      };

    return this.request(Methods.EDIT_MESSAGE_TEXT, query);
  }

  /**
   * Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   * @see {@link https://core.telegram.org/bots/api#editmessagecaption editMessageCaption}
   * @typedef {object} editMessageCaption
   * @property {string|number} [chat_id] - Required if inline_message_id is not specified. Unique identifier for the target chat or username
   *  of the target channel (in the format @channelusername).
   * @property {number} [message_id] - Required if inline_message_id is not specified. Identifier of the message to edit.
   * @property {string} [inline_message_id] - Required if chat_id and message_id are not specified. Identifier of the inline message.
   * @property {string} [caption] - New caption of the message, 0-1024 characters after entities parsing.
   * @property {string} [parse_mode] - Mode for parsing entities in the message caption. See formatting options for more details.
   * @property {MessageEntity[]} [caption_entities] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
   * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for an inline keyboard.
   * @returns {Message|Boolean}
   */
  editMessageCaption({
    chat_id,
    message_id,
    inline_message_id,
    caption,
    parse_mode,
    caption_entities,
    reply_markup,
  }) {
    if (!caption)
      helper.miss_parameter(
        "caption новый заголовок сообщения, 0-1024 символов."
      );
    this._lengthError({
      caption_text: caption,
    });

    if ((chat_id && message_id && caption) || (inline_message_id && caption))
      var query = {
        chat_id: chat_id ? String(chat_id) : null,
        message_id: message_id ? Number(message_id) : null,
        inline_message_id: inline_message_id ? String(inline_message_id) : null,
        caption: caption ? String(caption) : null,
        parse_mode: parse_mode ? String(parse_mode) : this.__parseMode,
        caption_entities: caption_entities
          ? JSON.stringify(caption_entities)
          : null,
        reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
      };

    return this.request(Methods.EDIT_MESSAGE_CAPTION, query);
  }

  /**
   * Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a message album, then it can be edite
   * d only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited,
   * a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL. On success, if the edited message is not an inline message,
   * the edited Message is returned, otherwise True is returned.
   * @see {@link https://core.telegram.org/bots/api#editmessagemedia editMessageMedia}
   * @typedef {object} editMessageMedia
   * @property {string|number} [chat_id] - Required if inline_message_id is not specified. Unique identifier for the target chat or username
   * of the target channel (in the format @channelusername).
   * @property {number} [message_id] - Required if inline_message_id is not specified. Identifier of the message to edit.
   * @property {string} [inline_message_id] - Required if chat_id and message_id are not specified. Identifier of the inline message.
   * @property {InputMedia} media - A JSON-serialized object for a new media content of the message.
   * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for a new inline keyboard.
   * @returns {Message|Boolean}
   */
  editMessageMedia({
    chat_id,
    message_id,
    inline_message_id,
    media,
    reply_markup,
  }) {
    if (!media)
      helper.miss_parameter(
        "media объект JSON для нового мультимедийного содержимого сообщения."
      );

    if ((chat_id && message_id && media) || (inline_message_id && media))
      var query = {
        chat_id: chat_id ? String(chat_id) : null,
        message_id: message_id ? Number(message_id) : null,
        inline_message_id: inline_message_id ? String(inline_message_id) : null,
        media: media,
        reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
      };

    return this.request(Methods.EDIT_MESSAGE_MEDIA, query);
  }

  /**
   * Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned,
   * otherwise True is returned.
   * @see {@link https://core.telegram.org/bots/api#editmessagereplymarkup editMessageReplyMarkup}
   * @typedef {object} editMessageReplyMarkup
   * @property {string|number} [chat_id] - Required if inline_message_id is not specified. Unique identifier for the target chat or username
   * of the target channel (in the format @channelusername).
   * @property {number} [message_id] - Required if inline_message_id is not specified. Identifier of the message to edit.
   * @property {string} [inline_message_id] - Required if chat_id and message_id are not specified. Identifier of the inline message.
   * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for an inline keyboard.
   * @returns {Message|Boolean}
   */
  editMessageReplyMarkup({
    chat_id,
    message_id,
    inline_message_id,
    reply_markup,
  }) {
    if (!reply_markup)
      helper.miss_parameter(
        "reply_markup объект JSON для новой встроенной клавиатуры."
      );

    if (
      (chat_id && message_id && reply_markup) ||
      (inline_message_id && reply_markup)
    )
      var query = {
        chat_id: chat_id ? String(chat_id) : null,
        message_id: message_id ? Number(message_id) : null,
        inline_message_id: inline_message_id ? String(inline_message_id) : null,
        reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
      };

    return this.request(Methods.EDIT_MESSAGE_REPLY_MARKUP, query);
  }

  // Other

  /**
   * Use this method to send photos. On success, the sent Message is returned.
   * @see {@link https://core.telegram.org/bots/api#sendphoto sendPhoto}
   * @typedef {object} sendPhoto
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {InputFile|string} photo - Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended),
   * pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data.
   * The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20.
   * More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
   * @property {string} [caption] - Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing.
   * @property {string} [parse_mode] - Mode for parsing entities in the photo caption. See formatting options for more details.
   * @property {MessageEntity[]} [caption_entities] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
   * @property {boolean} [has_spoiler] - Pass True if the photo needs to be covered with a spoiler animation.
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an
   * inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   * @property {string} [options.contentType] "multipart/form-data", default "application/json".
   * @returns {Message}
   */
  sendPhoto({
    chat_id,
    message_thread_id,
    photo,
    caption,
    parse_mode,
    caption_entities,
    has_spoiler,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
    contentType,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевой группы или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );
    if (!photo) helper.miss_parameter("photo фото для отправки.");
    if (caption)
      this._lengthError({
        caption_text: caption,
      });

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      photo: photo,
      caption: caption ? String(caption) : null,
      parse_mode: parse_mode ? String(parse_mode) : this.__parseMode,
      caption_entities: caption_entities
        ? JSON.stringify(caption_entities)
        : null,
      has_spoiler: Boolean(has_spoiler),
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    if (contentType)
      return this.request(Methods.SEND_PHOTO, query, contentType);
    else return this.request(Methods.SEND_PHOTO, query);
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
   * For sending voice messages, use the sendVoice method instead.
   * @see {@link https://core.telegram.org/bots/api#sendaudio sendAudio}
   * @typedef {object} sendAudio
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {InputFile|string} audio - Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
   * @property {string} [caption] - Audio caption, 0-1024 characters after entities parsing.
   * @property {string} [parse_mode] - Mode for parsing entities in the audio caption. See formatting options for more details.
   * @property {MessageEntity[]} [caption_entities] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
   * @property {number} [duration] - Duration of the audio in seconds.
   * @property {string} [performer] - Performer.
   * @property {string} [title] - Track name.
   * @property {InputFile|string} [thumbnail] - Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   * @property {string} [options.contentType] "multipart/form-data", default "application/json".
   * @returns {Message}
   */
  sendAudio({
    chat_id,
    message_thread_id,
    audio,
    caption,
    parse_mode,
    caption_entities,
    duration,
    performer,
    title,
    thumb,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
    contentType,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевой группы или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );
    if (!audio) helper.miss_parameter("audio аудио для отправки.");
    if (caption)
      this._lengthError({
        caption_text: caption,
      });

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      audio: audio,
      caption: caption ? String(caption) : null,
      parse_mode: parse_mode ? String(parse_mode) : this.__parseMode,
      caption_entities: caption_entities
        ? JSON.stringify(caption_entities)
        : null,
      duration: duration ? Number(duration) : null,
      performer: performer ? String(performer) : null,
      title: title ? String(title) : null,
      thumb: thumb ? thumb : null,
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    if (contentType)
      return this.request(Methods.SEND_AUDIO, query, contentType);
    else return this.request(Methods.SEND_AUDIO, query);
  }

  /**
   * Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size,
   * this limit may be changed in the future.
   * @see {@link https://core.telegram.org/bots/api#senddocument sendDocument}
   * @typedef {object} sendDocument
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {InputFile|string} document - File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended),
   * pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data.
   * More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
   * @property {InputFile|string} [thumbnail] - Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
   * The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320.
   * Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file,
   * so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
   * More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
   * @property {string} [caption] - Document caption (may also be used when resending documents by file_id), 0-1024 characters after entities parsing.
   * @property {string} [parse_mode] - Mode for parsing entities in the document caption. See formatting options for more details.
   * @property {MessageEntity[]} [caption_entities] - A JSON-serialized list of special entities that appear in the caption,
   * which can be specified instead of parse_mode.
   * @property {boolean} [disable_content_type_detection] - Disables automatic server-side content type detection for files
   * uploaded using multipart/form-data.
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options.
   * A JSON-serialized object
   *  for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   * @property {string} [options.contentType] "multipart/form-data", default "application/json".
   * @returns {Message}
   */
  sendDocument({
    chat_id,
    message_thread_id,
    document,
    caption,
    thumb,
    parse_mode,
    caption_entities,
    disable_content_type_detection,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
    contentType,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате @channelusername)."
      );
    if (!document) helper.miss_parameter("document файл для отправки");
    if (caption)
      this._lengthError({
        caption_text: caption,
      });

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      document: document,
      caption: caption ? String(caption) : null,
      thumb: thumb || null,
      parse_mode: parse_mode ? String(parse_mode) : this.__parseMode,
      caption_entities: caption_entities
        ? JSON.stringify(caption_entities)
        : null,
      disable_content_type_detection: Boolean(disable_content_type_detection),
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    if (contentType)
      return this.request(Methods.SEND_DOCUMENT, query, contentType);
    else return this.request(Methods.SEND_DOCUMENT, query);
  }

  /**
   * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document).
   * On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
   * @see {@link https://core.telegram.org/bots/api#sendvideo sendVideo}
   * @typedef {object} sendVideo
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {InputFile|string} video - Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended),
   * pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data.
   * More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
   * @property {number} [duration] - Duration of sent video in seconds.
   * @property {number} [width] - Video width.
   * @property {number} [height] - Video height.
   * @property {InputFile|string} [thumbnail] - Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
   * The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320.
   * Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file,
   * so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
   * More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
   * @property {string} [caption] - Video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing.
   * @property {string} [parse_mode] - Mode for parsing entities in the video caption. See formatting options for more details.
   * @property {MessageEntity[]} [caption_entities] - A JSON-serialized list of special entities that appear in the caption,
   * which can be specified instead of parse_mode.
   * @property {boolean} [has_spoiler] - Pass True if the video needs to be covered with a spoiler animation.
   * @property {boolean} [supports_streaming] - Pass True if the uploaded video is suitable for streaming.
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized
   *  object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   * @property {string} [options.contentType] "multipart/form-data", default "application/json".
   * @returns {Message}
   */
  sendVideo({
    chat_id,
    message_thread_id,
    video,
    duration,
    width,
    height,
    thumb,
    caption,
    parse_mode,
    caption_entities,
    has_spoiler,
    supports_streaming,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
    contentType,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевой группы или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );
    if (!video) helper.miss_parameter("video видео для отправки.");
    if (caption)
      this._lengthError({
        caption_text: caption,
      });

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      video: video,
      duration: duration ? Number(duration) : null,
      width: width ? Number(width) : null,
      height: height ? Number(height) : null,
      thumb: thumb || null,
      caption: caption ? String(caption) : null,
      parse_mode: parse_mode ? String(parse_mode) : this.__parseMode,
      caption_entities: caption_entities
        ? JSON.stringify(caption_entities)
        : null,
      has_spoiler: Boolean(has_spoiler),
      supports_streaming: Boolean(supports_streaming),
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    if (contentType)
      return this.request(Methods.SEND_VIDEO, query, contentType);
    else return this.request(Methods.SEND_VIDEO, query);
  }

  /**
   * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned.
   * Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
   * @see {@link https://core.telegram.org/bots/api#sendanimation sendAnimation}
   * @typedef {object} sendAnimation
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {InputFile|string} animation - Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended),
   * pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data.
   * More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
   * @property {number} [duration] - Duration of sent animation in seconds.
   * @property {number} [width] - Animation width.
   * @property {number} [height] - Animation height.
   * @property {InputFile|string} [thumbnail] - Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
   * The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320.
   * Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file,
   * so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
   * More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
   * @property {string} [caption] - Animation caption (may also be used when resending animation by file_id), 0-1024 characters after entities parsing.
   * @property {string} [parse_mode] - Mode for parsing entities in the animation caption. See formatting options for more details.
   * @property {MessageEntity[]} [caption_entities] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
   * @property {boolean} [has_spoiler] - Pass True if the animation needs to be covered with a spoiler animation.
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object
   *  for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   * @property {string} [options.contentType] "multipart/form-data", default "application/json".
   * @returns {Message}
   */
  sendAnimation({
    chat_id,
    message_thread_id,
    animation,
    duration,
    width,
    height,
    thumb,
    caption,
    parse_mode,
    caption_entities,
    has_spoiler,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
    contentType,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевой группы или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );
    if (!animation) helper.miss_parameter("animation анимация для отправки.");
    if (caption)
      this._lengthError({
        caption_text: caption,
      });

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      animation: animation,
      duration: duration ? Number(duration) : null,
      width: width ? Number(width) : null,
      height: height ? Number(height) : null,
      caption: caption ? String(caption) : null,
      thumb: thumb || null,
      parse_mode: parse_mode ? String(parse_mode) : this.__parseMode,
      caption_entities: caption_entities
        ? JSON.stringify(caption_entities)
        : null,
      has_spoiler: Boolean(has_spoiler),
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    if (contentType)
      return this.request(Methods.SEND_ANIMATION, query, contentType);
    else return this.request(Methods.SEND_ANIMATION, query);
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio
   * must be in an .OGG file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned.
   * Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
   * @see {@link https://core.telegram.org/bots/api#sendvoice sendVoice}
   * @typedef {object} sendVoice
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {InputFile|string} voice - Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended),
   * pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data.
   * More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
   * @property {string} [caption] - Voice message caption, 0-1024 characters after entities parsing.
   * @property {string} [parse_mode] - Mode for parsing entities in the voice message caption. See formatting options for more details.
   * @property {MessageEntity[]} [caption_entities] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
   * @property {number} [duration] - Duration of the voice message in seconds.
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object
   *  for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   * @property {string} [options.contentType] "multipart/form-data", default "application/json".
   * @returns {Message}
   */
  sendVoice({
    chat_id,
    message_thread_id,
    voice,
    duration,
    caption,
    parse_mode,
    caption_entities,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
    contentType,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевой группы или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );
    if (!voice) helper.miss_parameter("voice аудио для отправки.");
    if (caption)
      this._lengthError({
        caption_text: caption,
      });

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      voice: voice,
      duration: duration ? Number(duration) : null,
      caption: caption ? String(caption) : null,
      parse_mode: parse_mode ? String(parse_mode) : this.__parseMode,
      caption_entities: caption_entities
        ? JSON.stringify(caption_entities)
        : null,
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    if (contentType)
      return this.request(Methods.SEND_VOICE, query, contentType);
    else return this.request(Methods.SEND_VOICE, query);
  }

  /**
   * As of v.4.0, Telegram clients support rounded square MPEG4 videos of up to 1 minute long. Use this method to send video messages.
   * On success, the sent Message is returned.
   * @see {@link https://core.telegram.org/bots/api#sendvideonote sendVideoNote}
   * @typedef {object} sendVideoNote
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {InputFile|string} video_note - Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload
   *  a new video using multipart/form-data. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
   * Sending video notes by a URL is currently unsupported.
   * @property {number} [duration] - Duration of sent video in seconds.
   * @property {number} [length] - Video width and height, i.e. diameter of the video message.
   * @property {InputFile|string} [thumbnail] - Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
   * The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320.
   * Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file,
   * so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
   * More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object
   *  for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   * @property {string} [options.contentType] "multipart/form-data", default "application/json".
   * @returns {Message}
   */
  sendVideoNote({
    chat_id,
    message_thread_id,
    video_note,
    duration,
    length,
    thumb,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
    contentType,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевой группы или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );
    if (!video_note)
      helper.miss_parameter("video_note видеозаметка для отправки.");

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      video_note: video_note,
      duration: duration ? Number(duration) : null,
      length: length ? Number(length) : null,
      thumb: thumb || null,
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    if (contentType)
      return this.request(Methods.SEND_VIDEO_NOTE, query, contentType);
    else return this.request(Methods.SEND_VIDEO_NOTE, query);
  }

  /**
   * Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped
   *  in an album with messages of the same type. On success, an array of Messages that were sent is returned.
   * @see {@link https://core.telegram.org/bots/api#sendmediagroup sendMediaGroup}
   * @typedef {object} sendMediaGroup
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {Array.<InputMediaAudio|InputMediaDocument|InputMediaPhoto|InputMediaVideo>} media - A JSON-serialized array describing messages
   * to be sent, must include 2-10 items.
   * @property {boolean} [disable_notification] - Sends messages silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent messages from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the messages are a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @returns {Message[]}
   */
  sendMediaGroup({
    chat_id,
    message_thread_id,
    media,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)."
      );
    if (!media)
      helper.miss_parameter(
        "media объект JSON для нового мультимедийного содержимого сообщения."
      );

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      media: media,
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
    };

    return this.request(Methods.SEND_MEDIA_GROUP, query);
  }

  /**
   * Use this method to send point on the map. On success, the sent Message is returned.
   * @see {@link https://core.telegram.org/bots/api#sendlocation sendLocation}
   * @typedef {object} sendLocation
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {number} latitude - Latitude of the location.
   * @property {number} longitude - Longitude of the location.
   * @property {number} [horizontal_accuracy] - The radius of uncertainty for the location, measured in meters; 0-1500.
   * @property {number} [live_period] - Period in seconds for which the location will be updated (see Live Locations, should be between 60 and 86400.
   * @property {number} [heading] - For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
   * @property {number} [proximity_alert_radius] - For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters.
   * Must be between 1 and 100000 if specified.
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object
   *  for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   * @returns {Message}
   */
  sendLocation({
    chat_id,
    message_thread_id,
    latitude,
    longitude,
    horizontal_accuracy,
    live_period,
    heading,
    proximity_alert_radius,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевой группы или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );
    if (!latitude) helper.miss_parameter("latitude широта местоположения.");
    if (!longitude) helper.miss_parameter("longitude долгота местоположения.");

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      horizontal_accuracy: horizontal_accuracy
        ? String(horizontal_accuracy)
        : null,
      live_period: live_period ? String(live_period) : null,
      heading: heading ? String(heading) : null,
      proximity_alert_radius: proximity_alert_radius
        ? String(proximity_alert_radius)
        : null,
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    return this.request(Methods.SEND_LOCATION, query);
  }

  /**
   * Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly
   * disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message,
   * the edited Message is returned, otherwise True is returned.
   * @see {@link https://core.telegram.org/bots/api#editmessagelivelocation editMessageLiveLocation}
   * @typedef {object} editMessageLiveLocation
   * @property {string|number} [chat_id] - Required if inline_message_id is not specified. Unique identifier for the target chat or username
   *  of the target channel (in the format @channelusername).
   * @property {number} [message_id] - Required if inline_message_id is not specified. Identifier of the message to edit.
   * @property {string} [inline_message_id] - Required if chat_id and message_id are not specified. Identifier of the inline message.
   * @property {number} latitude - Latitude of new location.
   * @property {number} longitude - Longitude of new location.
   * @property {number} [horizontal_accuracy] - The radius of uncertainty for the location, measured in meters; 0-1500.
   * @property {number} [heading] - Direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
   * @property {number} [proximity_alert_radius] - The maximum distance for proximity alerts about approaching another chat member, in meters.
   * Must be between 1 and 100000 if specified.
   * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for a new inline keyboard.
   * @returns {Message|Boolean}
   */
  editMessageLiveLocation({
    chat_id,
    message_id,
    inline_message_id,
    latitude,
    longitude,
    horizontal_accuracy,
    heading,
    proximity_alert_radius,
    reply_markup,
  }) {
    if (!chat_id && !inline_message_id)
      helper.miss_parameter(
        "передайте chat_id и message_id или inline_message_id"
      );
    if (chat_id && !message_id)
      helper.miss_parameter(
        "message_id идентификатор сообщения для редактирования."
      );
    if (!chat_id && !inline_message_id)
      helper.miss_parameter(
        "inline_message_id идентификатор встроенного сообщения."
      );

    const query = {
      chat_id: chat_id ? String(chat_id) : null,
      message_id: message_id ? Number(message_id) : null,
      inline_message_id: inline_message_id ? String(inline_message_id) : null,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      horizontal_accuracy: horizontal_accuracy
        ? String(horizontal_accuracy)
        : null,
      heading: heading ? String(heading) : null,
      proximity_alert_radius: proximity_alert_radius
        ? String(proximity_alert_radius)
        : null,
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    return this.request(Methods.EDIT_MESSAGE_LIVE_LOCATION, query);
  }

  /**
   * Use this method to stop updating a live location message before live_period expires. On success, if the message is not an inline message,
   * the edited Message is returned, otherwise True is returned.
   * @see {@link https://core.telegram.org/bots/api#stopmessagelivelocation stopMessageLiveLocation}
   * @typedef {object} stopMessageLiveLocation
   * @property {string|number} [chat_id] - Required if inline_message_id is not specified. Unique identifier for the target chat or username
   * of the target channel (in the format @channelusername).
   * @property {number} [message_id] - Required if inline_message_id is not specified. Identifier of the message with live location to stop.
   * @property {string} [inline_message_id] - Required if chat_id and message_id are not specified. Identifier of the inline message.
   * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for a new inline keyboard.
   * @returns {Message|Boolean}
   */
  stopMessageLiveLocation({
    chat_id,
    message_id,
    inline_message_id,
    reply_markup,
  }) {
    if (!chat_id && !inline_message_id)
      helper.miss_parameter(
        "передайте chat_id и message_id или inline_message_id"
      );
    if (chat_id && !message_id)
      helper.miss_parameter(
        "message_id идентификатор сообщения для редактирования."
      );
    if (!chat_id && !inline_message_id)
      helper.miss_parameter(
        "inline_message_id идентификатор встроенного сообщения."
      );

    const query = {
      chat_id: chat_id ? String(chat_id) : null,
      message_id: message_id ? Number(message_id) : null,
      inline_message_id: inline_message_id ? String(inline_message_id) : null,
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    return this.request(Methods.STOP_MESSAGE_LIVE_LOCATION, query);
  }

  /**
   * Use this method to send information about a venue. On success, the sent Message is returned.
   * @see {@link https://core.telegram.org/bots/api#sendvenue sendVenue}
   * @typedef {object} sendVenue
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {number} latitude - Latitude of the venue.
   * @property {number} longitude - Longitude of the venue.
   * @property {string} title - Name of the venue.
   * @property {string} address - Address of the venue.
   * @property {string} [foursquare_id] - Foursquare identifier of the venue.
   * @property {string} [foursquare_type] - Foursquare type of the venue, if known. (For example, "arts_entertainment/default",
   * "arts_entertainment/aquarium" or "food/icecream".).
   * @property {string} [google_place_id] - Google Places identifier of the venue.
   * @property {string} [google_place_type] - Google Places type of the venue. (See supported types.).
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object
   *  for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   * @returns {Message}
   */
  sendVenue({
    chat_id,
    message_thread_id,
    latitude,
    longitude,
    title,
    address,
    foursquare_id,
    foursquare_type,
    google_place_id,
    google_place_type,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевой группы или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );
    if (!latitude) helper.miss_parameter("latitude широта места проведения.");
    if (!longitude)
      helper.miss_parameter("longitude долгота места проведения.");
    if (!title) helper.miss_parameter("title название места.");
    if (!address) helper.miss_parameter("address адрес места проведения.");

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      title: String(title),
      address: String(address),
      foursquare_id: foursquare_id ? String(foursquare_id) : null,
      foursquare_type: foursquare_type ? String(foursquare_type) : null,
      google_place_id: google_place_id ? String(google_place_id) : null,
      google_place_type: google_place_type ? String(google_place_type) : null,
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    return this.request(Methods.SEND_VENUE, query);
  }

  /**
   * Use this method to send phone contacts. On success, the sent Message is returned.
   * @see {@link https://core.telegram.org/bots/api#sendcontact sendContact}
   * @typedef {object} sendContact
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {string} phone_number - Contact's phone number.
   * @property {string} first_name - Contact's first name.
   * @property {string} [last_name] - Contact's last name.
   * @property {string} [vcard] - Additional data about the contact in the form of a vCard, 0-2048 bytes.
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object
   *  for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   * @returns {Message}
   */
  sendContact({
    chat_id,
    message_thread_id,
    phone_number,
    first_name,
    last_name,
    vcard,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевой группы или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );
    if (!phone_number) helper.miss_parameter("phone_number телефон контакта.");
    if (!first_name) helper.miss_parameter("first_name фамилия контакта.");

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      phone_number: String(phone_number),
      first_name: String(first_name),
      last_name: last_name ? String(last_name) : null,
      vcard: vcard ? String(vcard) : null,
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    return this.request(Methods.SEND_DICE, query);
  }

  /**
   * Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned.
   * @see {@link https://core.telegram.org/bots/api#senddice sendDice}
   * @typedef {object} sendDice
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {string} [emoji] - Emoji on which the dice throw animation is based. Currently, must be one of "🎲", "🎯", "🏀", "⚽", "🎳", or "🎰".
   * Dice can have values 1-6 for "🎲", "🎯" and "🎳", values 1-5 for "🏀" and "⚽", and values 1-64 for "🎰". Defaults to "🎲".
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object
   *  for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   * @returns {Message}
   */
  sendDice({
    chat_id,
    message_thread_id,
    emoji,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевой группы или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      emoji: emoji ? String(emoji) : null,
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    return this.request(Methods.SEND_DICE, query);
  }

  /**
   * Use this method to send a native poll. On success, the sent Message is returned.
   * @see {@link https://core.telegram.org/bots/api#sendpoll sendPoll}
   * @typedef {object} sendPoll
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {string} question - Poll question, 1-300 characters.
   * @property {string[]} options - A JSON-serialized list of answer options, 2-10 strings 1-100 characters each.
   * @property {boolean} [is_anonymous] - True, if the poll needs to be anonymous, defaults to True.
   * @property {string} [type] - Poll type, "quiz" or "regular", defaults to "regular".
   * @property {boolean} [allows_multiple_answers] - True, if the poll allows multiple answers, ignored for polls in quiz mode, defaults to False.
   * @property {number} [correct_option_id] - 0-based identifier of the correct answer option, required for polls in quiz mode.
   * @property {string} [explanation] - Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll,
   * 0-200 characters with at most 2 line feeds after entities parsing.
   * @property {string} [explanation_parse_mode] - Mode for parsing entities in the explanation. See formatting options for more details.
   * @property {MessageEntity[]} [explanation_entities] - A JSON-serialized list of special entities that appear in the poll explanation, which
   * can be specified instead of parse_mode.
   * @property {number} [open_period] - Amount of time in seconds the poll will be active after creation, 5-600. Can't be used together with close_date.
   * @property {number} [close_date] - Point in time (Unix timestamp) when the poll will be automatically closed. Must be at least 5 and no more than 600 seconds in the future.
   * Can't be used together with open_period.
   * @property {boolean} [is_closed] - Pass True if the poll needs to be immediately closed. This can be useful for poll preview.
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object
   *  for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   * @returns {Message}
   */
  sendPoll({
    chat_id,
    message_thread_id,
    question,
    options,
    is_anonymous = true,
    type = "regular",
    allows_multiple_answers,
    correct_option_id = "0",
    explanation,
    explanation_parse_mode,
    explanation_entities,
    open_periode,
    close_date,
    is_closed,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевой группы или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );
    if (!question) helper.miss_parameter("question вопрос для отправки.");
    this._lengthError({
      question_text: question,
    });
    if (!options)
      helper.miss_parameter(
        "options JSON-сериализованный список вариантов ответа для отправки."
      );
    if (explanation)
      this._lengthError({
        explanation_text: explanation,
      });

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      question: String(question),
      options: JSON.stringify(options),
      is_anonymous: Boolean(is_anonymous),
      type: type,
      allows_multiple_answers: Boolean(allows_multiple_answers),
      correct_option_id: correct_option_id ? Number(correct_option_id) : null,
      explanation: explanation ? String(explanation) : null,
      explanation_parse_mode: explanation_parse_mode
        ? String(explanation_parse_mode)
        : this.__parseMode,
      explanation_entities: explanation_entities
        ? JSON.stringify(explanation_entities)
        : null,
      open_periode: open_periode ? Number(open_periode) : null,
      close_date: close_date ? Number(close_date) : null,
      is_closed: Boolean(is_closed),
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    return this.request(Methods.SEND_POLL, query);
  }

  /**
   * Use this method to stop a poll which was sent by the bot. On success, the stopped Poll is returned.
   * @see {@link https://core.telegram.org/bots/api#stoppoll stopPoll}
   * @typedef {object} stopPoll
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} message_id - Identifier of the original message with the poll.
   * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for a new message inline keyboard.
   * @returns {Poll}
   */
  stopPoll({ chat_id, message_id, reply_markup }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевой группы или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );
    if (!message_id) helper.miss_parameter("message_id для отправки.");

    const query = {
      chat_id: String(chat_id),
      message_id: Number(message_id),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    return this.request(Methods.STOP_POLL, query);
  }

  /**
   * Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of
   * the chat screen or as an alert. On success, True is returned.
   * @see {@link https://core.telegram.org/bots/api#answercallbackquery answerCallbackQuery}
   * @typedef {object} answerCallbackQuery
   * @property {string} callback_query_id - Unique identifier for the query to be answered.
   * @property {string} [text] - Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters.
   * @property {boolean} [show_alert] - If True, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false.
   * @property {string} [url] - URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @BotFather,
   * specify the URL that opens your game - note that this will only work if the query comes from a callback_game button.
   * Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter.
   * @property {number} [cache_time] - The maximum amount of time in seconds that the result of the callback query may be cached client-side.
   * Telegram apps will support caching starting in version 3.14. Defaults to 0.
   * @returns {boolean}
   */
  answerCallbackQuery({
    callback_query_id,
    text,
    show_alert,
    url,
    cache_time,
  }) {
    if (!callback_query_id)
      helper.miss_parameter(
        "callback_query_id уникальный идентификатор запроса, на который нужно ответить."
      );
    if (text)
      this._lengthError({
        callback_query_text: text,
      });

    const query = {
      callback_query_id: String(callback_query_id),
      text: text ? String(text) : null,
      show_alert: Boolean(show_alert),
      url: url ? String(url) : null,
      cache_time: cache_time ? Number(cache_time) : null,
    };

    return this.request(Methods.ANSWER_CALLBACK_QUERY, query);
  }

  // Inline mode

  /**
   * Use this method to send answers to an inline query. On success, True is returned.
   * No more than 50 results per query are allowed.
   * @see {@link https://core.telegram.org/bots/api#answerinlinequery answerInlineQuery}
   * @typedef {object} answerInlineQuery
   * @property {string} inline_query_id - Unique identifier for the answered query.
   * @property {InlineQueryResult[]} results - A JSON-serialized array of results for the inline query.
   * @property {number} [cache_time] - The maximum amount of time in seconds that the result of the inline query may be cached on the server.
   * Defaults to 300.
   * @property {boolean} [is_personal] - Pass True if results may be cached on the server side only for the user that sent the query.
   * By default, results may be returned to any user who sends the same query.
   * @property {string} [next_offset] - Pass the offset that a client should send in the next query with the same text to receive more results.
   * Pass an empty string if there are no more results or if you don't support pagination. Offset length can't exceed 64 bytes.
   * @property {InlineQueryResultsButton} [button] - A JSON-serialized object describing a button to be shown above inline query results.
   * @returns {boolean}
   */
  answerInlineQuery({
    inline_query_id,
    results,
    cache_time,
    is_personal,
    next_offset,
    button,
  }) {
    if (!inline_query_id)
      helper.miss_parameter(
        "inline_query_id уникальный идентификатор ответа на запрос."
      );
    if (!results)
      helper.miss_parameter(
        "results InlineQueryResult[] сериализованный в формате JSON массив результатов для встроенного запроса."
      );

    const query = {
      inline_query_id: String(inline_query_id),
      results: JSON.stringify(results),
      cache_time: cache_time ? Number(cache_time) : null,
      is_personal: Boolean(is_personal),
      next_offset: next_offset ? String(next_offset) : null,
      button: button ? JSON.stringify(button) : null,
    };

    return this.request(Methods.ANSWER_INLINE_QUERY, query);
  }

  /**
   * Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat
   * from which the query originated. On success, a SentWebAppMessage object is returned.
   * @see {@link https://core.telegram.org/bots/api#answerwebappquery answerWebAppQuery}
   * @typedef {object} answerWebAppQuery
   * @property {string} web_app_query_id - Unique identifier for the query to be answered.
   * @property {InlineQueryResult} result - A JSON-serialized object describing the message to be sent.
   * @returns {SentWebAppMessage}
   */
  answerWebAppQuery({ web_app_query_id, result }) {
    if (!web_app_query_id)
      helper.miss_parameter(
        "web_app_query_id идентификатор запроса, на который нужно ответить."
      );
    if (!results)
      helper.miss_parameter(
        "results InlineQueryResult[] cериализованный объект JSON, описывающий отправляемое сообщение."
      );

    const query = {
      web_app_query_id: String(web_app_query_id),
      result: JSON.stringify(result),
    };

    return this.request(Methods.ANSWER_WEB_APP_QUERY, query);
  }

  // Stickers

  /**
   * Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. On success, the sent Message is returned.
   * @see {@link https://core.telegram.org/bots/api#sendsticker sendSticker}
   * @typedef {object} sendSticker
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {InputFile|string} sticker - Sticker to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended),
   * pass an HTTP URL as a String for Telegram to get a .WEBP sticker from the Internet, or upload a new .WEBP or .TGS sticker using multipart/form-data.
   * More information on Sending Files: https://core.telegram.org/bots/api#sending-files. Video stickers can only be sent by a file_id.
   * Animated stickers can't be sent via an HTTP URL.
   * @property {string} [emoji] - Emoji associated with the sticker; only for just uploaded stickers.
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for
   * an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   * @property {string} [options.contentType] "multipart/form-data", default "application/json".
   * @returns {Message}
   */
  sendSticker({
    chat_id,
    message_thread_id,
    sticker,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
    contentType,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевой группы или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );
    if (!sticker) helper.miss_parameter("sticker наклейка для отправки.");

    const query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      sticker: sticker,
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    if (contentType)
      return this.request(Methods.SEND_STICKER, query, contentType);
    else return this.request(Methods.SEND_STICKER, query);
  }

  /**
   * Use this method to get a sticker set. On success, a StickerSet object is returned.
   * @see {@link https://core.telegram.org/bots/api#getstickerset getStickerSet}
   * @typedef {object} getStickerSet
   * @property {string} name - Name of the sticker set.
   * @returns {StickerSet}
   */
  getStickerSet(name) {
    if (!name) helper.miss_parameter("name название набора наклеек.");

    const query = {
      name: String(name),
    };

    return this.request(Methods.GET_STICKER_SET, query);
  }

  // Payments

  /**
   * Use this method to send invoices. On success, the sent Message is returned.
   * @see {@link https://core.telegram.org/bots/api#sendinvoice sendInvoice}
   * @typedef {object} sendInvoice
   * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername)..
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {string} title - Product name, 1-32 characters.
   * @property {string} description - Product description, 1-255 characters.
   * @property {string} payload - Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes.
   * @property {string} provider_token - Payment provider token, obtained via @BotFather.
   * @property {string} currency - Three-letter ISO 4217 currency code, see more on currencies.
   * @property {LabeledPrice[]} prices - Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.).
   * @property {number} [max_tip_amount] - The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double).
   * For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json, it shows the number
   * of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0.
   * @property {number[]} [suggested_tip_amounts] - A JSON-serialized array of suggested amounts of tips in the smallest units of the
   * currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a
   * strictly increased order and must not exceed max_tip_amount.
   * @property {string} [start_parameter] - Unique deep-linking parameter. If left empty, forwarded copies of the sent message will have a
   * Pay button, allowing multiple users to pay directly from the forwarded message, using the same invoice. If non-empty, forwarded copies of
   * the sent message will have a URL button with a deep link to the bot (instead of a Pay button), with the value used as the start parameter.
   * @property {string} [provider_data] - JSON-serialized data about the invoice, which will be shared with the payment provider.
   * A detailed description of required fields should be provided by the payment provider.
   * @property {string} [photo_url] - URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service.
   * People like it better when they see what they are paying for.
   * @property {number} [photo_size] - Photo size in bytes.
   * @property {number} [photo_width] - Photo width.
   * @property {number} [photo_height] - Photo height.
   * @property {boolean} [need_name] - Pass True if you require the user's full name to complete the order.
   * @property {boolean} [need_phone_number] - Pass True if you require the user's phone number to complete the order.
   * @property {boolean} [need_email] - Pass True if you require the user's email address to complete the order.
   * @property {boolean} [need_shipping_address] - Pass True if you require the user's shipping address to complete the order.
   * @property {boolean} [send_phone_number_to_provider] - Pass True if the user's phone number should be sent to provider.
   * @property {boolean} [send_email_to_provider] - Pass True if the user's email address should be sent to provider.
   * @property {boolean} [is_flexible] - Pass True if the final price depends on the shipping method.
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for an inline keyboard.
   * If empty, one 'Pay total price' button will be shown. If not empty, the first button must be a Pay button.
   * @returns {Message}
   */
  sendInvoice({
    chat_id,
    message_thread_id,
    title,
    description,
    payload,
    provider_token,
    currency,
    prices,
    max_tip_amount,
    suggested_tip_amounts,
    start_parameter,
    provider_data,
    photo_url,
    photo_size,
    photo_width,
    photo_height,
    need_name,
    need_phone_number,
    need_email,
    need_shipping_address,
    send_phone_number_to_provider,
    send_email_to_provider,
    is_flexible,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
  }) {
    var query = {
      chat_id: String(chat_id),
      message_thread_id: message_thread_id ? message_thread_id : null,
      title: String(title),
      description: String(description),
      payload: String(payload),
      provider_token: String(provider_token),
      currency: String(currency),
      prices: String(prices),
      max_tip_amount: max_tip_amount ? Number(max_tip_amount) : null,
      suggested_tip_amounts: suggested_tip_amounts
        ? suggested_tip_amounts
        : null,
      start_parameter: start_parameter ? String(start_parameter) : null,
      provider_data: provider_data ? String(provider_data) : null,
      photo_url: photo_url ? String(photo_url) : null,
      photo_size: photo_size ? Number(photo_size) : null,
      photo_width: photo_width ? Number(photo_width) : null,
      photo_height: photo_height ? Number(photo_height) : null,
      need_name: Boolean(need_name),
      need_phone_number: Boolean(need_phone_number),
      need_email: Boolean(need_email),
      need_shipping_address: Boolean(need_shipping_address),
      send_phone_number_to_provider: Boolean(send_phone_number_to_provider),
      send_email_to_provider: Boolean(send_email_to_provider),
      is_flexible: Boolean(is_flexible),
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    return this.request(Methods.SEND_INVOICE, query);
  }

  /**
   * Use this method to create a link for an invoice. Returns the created invoice link as String on success.
   * @see {@link https://core.telegram.org/bots/api#createinvoicelink createInvoiceLink}
   * @typedef {object} createInvoiceLink
   * @property {string} title - Product name, 1-32 characters.
   * @property {string} description - Product description, 1-255 characters.
   * @property {string} payload - Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes.
   * @property {string} provider_token - Payment provider token, obtained via BotFather.
   * @property {string} currency - Three-letter ISO 4217 currency code, see more on currencies.
   * @property {LabeledPrice[]} prices - Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.).
   * @property {number} [max_tip_amount] - The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double).
   * For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json, it shows the number of
   * digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0.
   * @property {number[]} [suggested_tip_amounts] - A JSON-serialized array of suggested amounts of tips in the smallest units of
   * the currency (integer, not float/double). At most 4 suggested tip amounts can be specified.
   * The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount.
   * @property {string} [provider_data] - JSON-serialized data about the invoice, which will be shared with the payment provider.
   * A detailed description of required fields should be provided by the payment provider.
   * @property {string} [photo_url] - URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service.
   * @property {number} [photo_size] - Photo size in bytes.
   * @property {number} [photo_width] - Photo width.
   * @property {number} [photo_height] - Photo height.
   * @property {boolean} [need_name] - Pass True if you require the user's full name to complete the order.
   * @property {boolean} [need_phone_number] - Pass True if you require the user's phone number to complete the order.
   * @property {boolean} [need_email] - Pass True if you require the user's email address to complete the order.
   * @property {boolean} [need_shipping_address] - Pass True if you require the user's shipping address to complete the order.
   * @property {boolean} [send_phone_number_to_provider] - Pass True if the user's phone number should be sent to the provider.
   * @property {boolean} [send_email_to_provider] - Pass True if the user's email address should be sent to the provider.
   * @property {boolean} [is_flexible] - Pass True if the final price depends on the shipping method.
   * @returns {string}
   */
  createInvoiceLink({
    title,
    description,
    payload,
    provider_token,
    currency,
    prices,
    max_tip_amount,
    suggested_tip_amounts,
    provider_data,
    photo_url,
    photo_size,
    photo_width,
    photo_height,
    need_name,
    need_phone_number,
    need_email,
    need_shipping_address,
    send_phone_number_to_provider,
    send_email_to_provider,
    is_flexible,
  }) {
    var query = {
      title: String(title),
      description: String(description),
      payload: String(payload),
      provider_token: String(provider_token),
      currency: String(currency),
      prices: String(prices),
      max_tip_amount: max_tip_amount ? Number(max_tip_amount) : null,
      suggested_tip_amounts: suggested_tip_amounts
        ? suggested_tip_amounts
        : null,
      provider_data: provider_data ? String(provider_data) : null,
      photo_url: photo_url ? String(photo_url) : null,
      photo_size: photo_size ? Number(photo_size) : null,
      photo_width: photo_width ? Number(photo_width) : null,
      photo_height: photo_height ? Number(photo_height) : null,
      need_name: Boolean(need_name),
      need_phone_number: Boolean(need_phone_number),
      need_email: Boolean(need_email),
      need_shipping_address: Boolean(need_shipping_address),
      send_phone_number_to_provider: Boolean(send_phone_number_to_provider),
      send_email_to_provider: Boolean(send_email_to_provider),
      is_flexible: Boolean(is_flexible),
    };

    return this.request(Methods.CREATE_INVOICE_LINK, query);
  }

  /**
   * If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a
   * shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned.
   * @see {@link https://core.telegram.org/bots/api#answershippingquery answerShippingQuery}
   * @typedef {object} answerShippingQuery
   * @property {string} shipping_query_id - Unique identifier for the query to be answered.
   * @property {boolean} ok - Pass True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified
   * address is not possible).
   * @property {ShippingOption[]} [shipping_options] - Required if ok is True. A JSON-serialized array of available shipping options.
   * @property {string} [error_message] - Required if ok is False. Error message in human readable form that explains why it is impossible to
   * complete the order (e.g. "Sorry, delivery to your desired address is unavailable'). Telegram will display this message to the user.
   * @returns {boolean}
   */
  answerShippingQuery({
    shipping_query_id,
    ok = true,
    shipping_options,
    error_message,
  }) {
    if (!shipping_query_id)
      helper.miss_parameter(
        "shipping_query_id уникальный идентификатор запроса, на который нужно ответить."
      );

    if (!ok && !shipping_options)
      helper.miss_parameter(
        "shipping_options: Сериализованный в формате JSON массив доступных вариантов доставки."
      );

    if (!ok && !error_message)
      helper.miss_parameter(
        "error_message: сообщение об ошибке в удобочитаемой форме, объясняющее причину невозможности продолжить оформление заказа "
      );

    const query = {
      shipping_query_id: String(shipping_query_id),
      ok: Boolean(ok),
      shipping_options: shipping_options ? String(shipping_options) : null,
      error_message: error_message ? String(error_message) : null,
    };

    return this.request(Methods.ANSWER_SHIPPING_QUERY, query);
  }

  /**
   * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query.
   * Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after
   * the pre-checkout query was sent.
   * @see {@link https://core.telegram.org/bots/api#answerprecheckoutquery answerPreCheckoutQuery}
   * @typedef {object} answerPreCheckoutQuery
   * @property {string} pre_checkout_query_id - Unique identifier for the query to be answered.
   * @property {boolean} ok - Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order.
   * Use False if there are any problems.
   * @property {string} [error_message] - Required if ok is False. Error message in human readable form that explains the reason for
   * failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details.
   * Please choose a different color or garment!"). Telegram will display this message to the user.
   * @returns {boolean}
   */
  answerPreCheckoutQuery({ pre_checkout_query_id, ok = true, error_message }) {
    if (!pre_checkout_query_id)
      helper.miss_parameter(
        "pre_checkout_query_id уникальный идентификатор запроса, на который нужно ответить."
      );

    if (!ok && !error_message)
      helper.miss_parameter(
        "error_message: сообщение об ошибке в удобочитаемой форме, объясняющее причину невозможности продолжить оформление заказа "
      );

    const query = {
      pre_checkout_query_id: String(pre_checkout_query_id),
      ok: Boolean(ok),
      error_message: error_message ? String(error_message) : null,
    };

    return this.request(Methods.ANSWER_PRE_CHECKOUT_QUERY, query);
  }

  /**
   * Use this method to send a game. On success, the sent Message is returned.
   * @see {@link https://core.telegram.org/bots/api#sendgame sendGame}
   * @typedef {object} sendGame
   * @property {number} chat_id - Unique identifier for the target chat.
   * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   * @property {string} game_short_name - Short name of the game, serves as the unique identifier for the game. Set up your games via @BotFather.
   * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
   * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
   * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
   * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
   * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for an inline keyboard.
   * If empty, one 'Play game_title' button will be shown. If not empty, the first button must launch the game.
   * @returns {Message}
   */
  sendGame({
    chat_id,
    message_thread_id,
    game_short_name,
    disable_notification,
    protect_content,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
  }) {
    const query = {
      chat_id: Number(chat_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      game_short_name: String(game_short_name),
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      reply_to_message_id: reply_to_message_id
        ? Number(reply_to_message_id)
        : null,
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    return this.request(Methods.SEND_GAME, query);
  }

  /**
   * Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score is not greater than the user's current score in the chat and force is False.
   * @see {@link https://core.telegram.org/bots/api#setgamescore setGameScore}
   * @typedef {object} setGameScore
   * @property {number} user_id - User identifier.
   * @property {number} score - New score, must be non-negative.
   * @property {boolean} [force] - Pass True if the high score is allowed to decrease. This can be useful when fixing mistakes or banning cheaters.
   * @property {boolean} [disable_edit_message] - Pass True if the game message should not be automatically edited to include the current scoreboard.
   * @property {number} [chat_id] - Required if inline_message_id is not specified. Unique identifier for the target chat.
   * @property {number} [message_id] - Required if inline_message_id is not specified. Identifier of the sent message.
   * @property {string} [inline_message_id] - Required if chat_id and message_id are not specified. Identifier of the inline message.
   * @returns {Message|Boolean}
   */
  setGameScore({
    user_id,
    score,
    force,
    disable_edit_message,
    chat_id,
    message_id,
    inline_message_id,
  }) {
    const query = {
      user_id: String(user_id),
      score: Number(score),
      force: Boolean(force),
      chat_id: chat_id ? Number(chat_id) : null,
      disable_edit_message: Boolean(disable_edit_message),
      message_id: message_id ? Number(message_id) : null,
      inline_message_id: inline_message_id ? String(inline_message_id) : null,
    };

    return this.request(Methods.SET_GAME_SCORE, query);
  }

  /**
   * Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of GameHighScore objects.
   * @see {@link https://core.telegram.org/bots/api#getgamehighscores getGameHighScores}
   * @typedef {object} getGameHighScores
   * @property {number} user_id - Target user id.
   * @property {number} [chat_id] - Required if inline_message_id is not specified. Unique identifier for the target chat.
   * @property {number} [message_id] - Required if inline_message_id is not specified. Identifier of the sent message.
   * @property {string} [inline_message_id] - Required if chat_id and message_id are not specified. Identifier of the inline message.
   * @returns {GameHighScore[]}
   */
  getGameHighScores({ user_id, chat_id, message_id, inline_message_id }) {
    const query = {
      user_id: String(user_id),
      chat_id: chat_id ? Number(chat_id) : null,
      message_id: message_id ? Number(message_id) : null,
      inline_message_id: inline_message_id ? String(inline_message_id) : null,
    };

    return this.request(Methods.GET_GAME_HIGH_SCORES, query);
  }

  /**
   * Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size.
   * On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>,
   * where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires,
   * a new one can be requested by calling getFile again.
   * Note: This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available)
   * when the File object is received.
   * @see {@link https://core.telegram.org/bots/api#getfile getFile}
   * @param {string} file_id - File identifier to get information about.
   * @returns {File}
   */
  getFile(file_id) {
    if (!file_id)
      helper.miss_parameter(
        "file_id идентификатор файла для получения информации."
      );
    return `${this.fileUrl}${
      JSON.parse(
        UrlFetchApp.fetch(
          `${this.telegramUrl}${Methods.GET_FILE}?file_id=${file_id}`
        ).getContentText()
      ).result.file_path
    }`;
  }

  // Not official API methods

  /**
   * Method for getting the path to the file.
   * @param {string} file_id identifier of the file to retrieve information from.
   * @returns {string} If successful, file_path is returned.
   */
  getPath(file_id) {
    if (!file_id)
      helper.miss_parameter(
        "file_id идентификатор файла для получения информации."
      );

    return JSON.parse(
      UrlFetchApp.fetch(
        `${this.telegramUrl}${Methods.GET_FILE}?file_id=${file_id}`
      ).getContentText()
    ).result.file_path;
  }

  /**
   * Method for obtaining a link to download a file.
   * @param {string} path path to the folder.
   * @returns {string} If successful, the url is returned.
   */
  getFileDownloadUrl(path) {
    if (!path) helper.miss_parameter("path путь до папки.");
    return `${this.fileUrl}${path}`;
  }

  /**
   * Ответ по from.id на получнное сообщение.
   * @type {object} options параметры запроса.
   * @property {Message} options.message полученное сообщение.
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {string} options.text текст сообщения, 1-4096 символов.
   * @property {string} options.parse_mode режим разбора сущностей "HTML" | "MarkdownV2".
   * @property {MessageEntity[]} options.entities JSON список специальных сущностей, которые появляются в новом заголовке, который можно указать вместо parse_mode.
   * @property {boolean} options.disable_web_page_preview отключить предварительный просмотр ссылок в этом сообщении.
   * @property {boolean} options.disable_notification True, пользователи получат уведомление без звука.
   * @property {boolean} options.protect_content защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} options.reply_to_message_id если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} options.allow_sending_without_reply True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не
   * найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} options.reply_markup объект JSON для встроенной клавиатуры.
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  answerMessage({
    message,
    message_thread_id,
    text,
    parse_mode,
    entities,
    disable_web_page_preview,
    disable_notification,
    protect_content,
    allow_sending_without_reply,
    reply_markup,
  }) {
    if (!message) helper.miss_parameter("Message");
    if (!text)
      helper.miss_parameter(
        "text текст отправляемого сообщения, 1-4096 символов."
      );
    this._lengthError({
      msg_text: text,
    });

    const query = {
      chat_id: message.from.id,
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      text: String(text),
      parse_mode: parse_mode ? String(parse_mode) : this.__parseMode,
      entities: entities ? JSON.stringify(entities) : null,
      disable_web_page_preview: Boolean(disable_web_page_preview),
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    return this.request(Methods.SEND_MESSAGE, query);
  }

  /**
   * Ответ по message_id на получнное сообщение.
   * @type {object} options параметры запроса.
   * @property {Message} options.message полученное сообщение.
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {string} options.text текст сообщения, 1-4096 символов.
   * @property {string} options.parse_mode режим разбора сущностей "HTML" | "MarkdownV2".
   * @property {MessageEntity[]} options.entities JSON список специальных сущностей, которые появляются в новом заголовке, который можно указать вместо parse_mode.
   * @property {boolean} options.disable_web_page_preview отключить предварительный просмотр ссылок в этом сообщении.
   * @property {boolean} options.disable_notification True, пользователи получат уведомление без звука.
   * @property {boolean} options.protect_content защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {boolean} options.allow_sending_without_reply True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} options.reply_markup объект JSON для встроенной клавиатуры.
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  replyMessage({
    message,
    message_thread_id,
    text,
    parse_mode,
    entities,
    disable_web_page_preview,
    disable_notification,
    protect_content,
    allow_sending_without_reply,
    reply_markup,
  }) {
    if (!message) helper.miss_parameter("Message");
    if (!text)
      helper.miss_parameter(
        "text текст отправляемого сообщения, 1-4096 символов."
      );
    this._lengthError({
      msg_text: text,
    });

    const query = {
      chat_id: message.from.id,
      text: String(text),
      reply_to_message_id: Number(message.message_id),
      message_thread_id: message_thread_id ? Number(message_thread_id) : null,
      parse_mode: parse_mode ? String(parse_mode) : this.__parseMode,
      entities: entities ? JSON.stringify(entities) : null,
      disable_web_page_preview: Boolean(disable_web_page_preview),
      disable_notification: Boolean(disable_notification),
      protect_content: Boolean(protect_content),
      allow_sending_without_reply: Boolean(allow_sending_without_reply),
      reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
    };

    return this.request(Methods.SEND_MESSAGE, query);
  }
}

/**
 * Creates a new instance of TGbot with the provided configuration options.
 * {@link https://openapi.wb.ru/content.html Telegram API}
 * @param {object} options - The configuration options for the TGbot.
 * @param {string} options.botToken - The token of the Telegram bot from \@BotFather.
 * @param {string} options.webAppUrl - The link to the Google WebApp for working with doGet(e) responses.
 * @param {boolean} options.logRequest - Show the URL and OPTIONS request string when executed, default is false.
 * @param {string} options.service - The service PropertiesService.getScriptProperties() used by the TGbot.
 * @param {string} options.parseMode - Set the parse mode, default is "HTML".
 * @return {TGbo|ValidationError} An instance of the TGbot class, if botToken is missing or invalid.
 */
function bot({ botToken, webAppUrl, logRequest, service, parseMode }) {
  if (!botToken || !service)
    throw new ValidationError(
      `Missed botToken or service (PropertiesService.getScriptProperties()) with botToken.`
    );

  return new TGbot({
    botToken,
    webAppUrl,
    logRequest,
    service,
    parseMode,
  });
}
