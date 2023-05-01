// var logRequest = false;

/**
 * A GAS wrapper for the
 * {@link https://core.telegram.org/bots/api Telegram API}
 * @author Mikhail Nosaev <m.nosaev@gmail.com>
 * @see {@link https://t.me/nosaev_m Telegram} разработка Google таблиц и GAS скриптов
 * @license MIT
 */
class TGbot extends _Client {
  /**
   * @constructor
   * @type {object} options параметры конструктора.
   * @property {string} options.botToken токен Telegram бота от \@BotFather.
   * @property {string} [options.webAppUrl] ссылка на WebApp Google для работы с ответами doGet(e).
   * @property {boolean} [options.logRequest] печать URL и OPTIONS запроса при выполнении, по умочанию false.
   */
  constructor({ botToken, webAppUrl, logRequest }) {
    super({ botToken, webAppUrl, logRequest });
    this.InputMediaDocument = InputMediaPhoto;
    this.InputMediaDocument = InputMediaVideo;
    this.InputMediaDocument = InputMediaAnimation;
    this.InputMediaDocument = InputMediaAudio;
    this.InputMediaDocument = InputMediaDocument;
  }

  getInfo() {
    const info = {
      apiVersion: this.apiVersion,
      description: "A GAS wrapper for the Telegram API",
      baseUrl: this.baseUrl,
      methods: helper.getMethodsOfClass(TGbot),
    };
    return helper.log(info);
  }

  /**
   * @private
   * Проверка длины сообщения.
   * @param {string} msg_text текст отправляемого сообщения.
   * @param {string} caption_text подпись к документу отправляемого сообщения.
   * @param {string} callback_query_text текст уведомления сообщения.
   * @returns {Error} возвращает ошибку в случае превышения допустимого размера.
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
   * Метод для получения входящих обновлений с помощью длительного опроса.
   * @see {@link https://core.telegram.org/bots/api#getupdates Telegram API}
   * @type {object} options параметры запроса.
   * @property {number} [options.offset] идентификатор первого возвращаемого обновления.
   * Должен быть на единицу больше, чем самый высокий среди идентификаторов ранее полученных обновлений.
   * По умолчанию возвращаются обновления, начиная с самого раннего неподтвержденного обновления.
   * Обновление считается подтвержденным, как только вызывается getUpdates со смещением выше, чем его update_id.
   * Можно указать отрицательное смещение для получения обновлений, начиная с -offset update с конца очереди обновлений.
   * Все предыдущие обновления будут забыты.
   * @property {number} [options.limit] кол-во извлекаемых обновлений. Принимаются значения от 1 до 100. По умолчанию 100.
   * @property {number} [options.timeout] Тайм-аут в секундах для длительного опроса. По умолчанию 0, т.е. обычный короткий опрос.
   * @property {Array.<string>} [options.allowed_updates] JSON список типов обновлений, которые должен получать ваш бот.
   * Укажите [“message”, “edited_channel_post”, “callback_query”], чтобы получать обновления только этих типов.
   * @returns {Array.<Update>} возвращает массив объектов обновлени.
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
   * Метод, для указания URL-адреса и получения входящих обновлений через исходящий веб-перехватчик.
   * Всякий раз, когда для бота появляется обновление, мы отправляем HTTPS-запрос POST на указанный URL-адрес, содержащий сериализованное обновление JSON.
   * @see {@link https://core.telegram.org/bots/api#setwebhook Telegram API}
   * @type {object} options параметры запроса.
   * @property {string} options.url URL этого метода HTTPS для отправки обновлений.
   * @property {InputFile} [options.certificate] сертификат открытого ключа, чтобы можно было проверить используемый корневой сертификат.
   * @property {string} [options.ip_address] фиксированный IP-адрес, который будет использоваться для отправки запросов веб-перехватчика вместо IP-адреса, разрешенного через DNS.
   * @property {number} [options.max_connections] max допустимое количество одновременных подключений HTTPS к веб-перехватчику для доставки обновлений: 1–100. По умолчанию 40. Используйте более низкие значения, чтобы ограничить нагрузку на сервер вашего бота, и более высокие значения, чтобы увеличить пропускную способность вашего бота.
   * @property {Array.<string>} [options.allowed_updates] JSON список типов обновлений, которые должен получать ваш бот.
   * Укажите [“message”, “edited_channel_post”, “callback_query”], чтобы получать обновления только этих типов.
   * @property {boolean} [options.drop_pending_updates] True, чтобы удалить все ожидающие обновления.
   * @returns {boolean} возвращает True в случае успеха.
   */
  setWebhook({
    url = this.__webAppUrl,
    certificate = "",
    ip_address = "",
    max_connections = 40,
    allowed_updates = [],
    drop_pending_updates = false,
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
    };

    return helper.log(this.request(Methods.SET_WEBHOOK, query));
  }

  /**
   * Метод, для удаления интеграции с веб-перехватчиком, если вы решите вернуться к getUpdates.
   * @see {@link https://core.telegram.org/bots/api#deletewebhook Telegram API}
   * @param {boolean} [drop_pending_updates] True, чтобы удалить все ожидающие обновления, по умолчанию false.
   * @returns {boolean} возвращает True в случае успеха.
   */
  deleteWebhook(drop_pending_updates = false) {
    const query = {
      drop_pending_updates: Boolean(drop_pending_updates),
    };

    return helper.log(this.request(Methods.DELETE_WEBHOOK, query));
  }

  /**
   * Метод, для получения текущего статуса веб-перехватчика. Не требует параметров.
   * @see {@link https://core.telegram.org/bots/api#getwebhookinfo Telegram API}
   * @returns {WebhookInfo} В случае успеха возвращает объект WebhookInfo. Если бот использует getUpdates, он вернет объект с пустым полем URL.
   */
  getWebhookInfo() {
    const query = {
      url: String(this.__webAppUrl),
    };

    return helper.log(this.request(Methods.GET_WEBHOOK_INFO, query));
  }

  // Available methods

  /**
   * Метод проверки токена аутентификации вашего бота. Не требует параметров.
   * @see {@link https://core.telegram.org/bots/api#getme Telegram API}
   * @returns {User} возвращает основную информацию о боте в виде объекта User.
   */
  getMe() {
    return this.request(Methods.GET_ME);
  }

  /**
   * Метод выхода из сервера API облачного бота перед локальным запуском бота. Не требует параметров.
   * @see {@link https://core.telegram.org/bots/api#logout Telegram API}
   * @returns {boolean} возвращает True в случае успеха.
   */
  logOut() {
    return this.request(Methods.LOG_OUT);
  }

  /**
   * Метод чтобы закрыть экземпляр бота перед его перемещением с одного локального сервера на другой.
   * Вам необходимо удалить веб-хук перед вызовом этого метода, чтобы гарантировать, что бот не запустится снова после перезапуска сервера.
   * Метод вернет ошибку 429 в первые 10 минут после запуска бота.
   * Не требует параметров.
   * @see {@link https://core.telegram.org/bots/api#close Telegram API}
   * @returns {boolean} возвращает True в случае успеха.
   */
  close() {
    return this.request(Methods.CLOSE);
  }

  /**
   * Метод, для измения прав администратора по умолчанию, запрашиваемые ботом, когда он добавляется в качестве администратора в группы или каналы.
   * Эти права будут предложены пользователям, но они могут изменить список перед добавлением бота.
   * @see {@link https://core.telegram.org/bots/api#setmydefaultadministratorrights Telegram API}
   * @param {ChatAdministratorRights} rights объект JSON, описывающий новые права администратора по умолчанию.
   * Если не указано, права администратора по умолчанию будут удалены.
   * @param {boolean} [for_channels] True, чтобы изменить права администратора бота по умолчанию в каналах.
   * В противном случае будут изменены права администратора бота по умолчанию для групп и супергрупп.
   * @returns {boolean} возвращает True в случае успеха.
   */
  setMyDefaultAdministratorRights(rights, for_channels = false) {
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
   * Метод, для получения текущих прав администратора бота по умолчанию.
   * @see {@link https://core.telegram.org/bots/api#getmydefaultadministratorrights Telegram API}
   * @param {boolean} for_channels True, чтобы получить права администратора бота по умолчанию в каналах.
   * В противном случае будут возвращены права администратора бота по умолчанию для групп и супергрупп.
   * @returns {ChatAdministratorRights} возвращает ChatAdministratorRights в случае успеха.
   */
  getMyDefaultAdministratorRights(for_channels = false) {
    const query = {
      for_channels: Boolean(for_channels),
    };

    return this.request(Methods.GET_MY_DEFAULT_ADMINISTRATOR_RIGHTS, query);
  }

  /**
   * Метод, для установки списока команд бота.
   * @see {@link https://core.telegram.org/bots/api#setmycommands Telegram API}
   * @param {BotCommand[]} commands список комманд.
   * @param {(BotCommandScopeDefault|BotCommandScopeAllPrivateChats|BotCommandScopeAllGroupChats|BotCommandScopeAllChatAdministrators|BotCommandScopeChat|BotCommandScopeChatAdministrators|BotCommandScopeChatMember)[]} [scope] JSON, описывающий круг пользователей, для которых релевантны команды. По умолчанию используется BotCommandScopeDefault.
   * @param {string} [language_code] двухбуквенный код языка ISO 639-1. Если пусто, команды будут применяться ко всем пользователям из заданной области, для языка которых нет выделенных команд.
   * @returns {boolean} возвращает True в случае успеха.
   */
  setMyCommands(commands, scope = "", language_code = "") {
    if (!commands || commands === [])
      helper.miss_parameter(
        "commands объект JSON, описывающий новые права администратора по умолчанию."
      );

    const query = {
      commands: JSON.stringify(commands),
      scope: scope ? JSON.stringify(scope) : null,
      language_code: language_code ? language_code : null,
    };

    return this.request(Methods.SET_MY_COMMANDS, query);
  }

  /**
   * Метод, для получения списка команд бота.
   * @see {@link https://core.telegram.org/bots/api#getmycommands Telegram API}
   * @param {(BotCommandScopeDefault|BotCommandScopeAllPrivateChats|BotCommandScopeAllGroupChats|BotCommandScopeAllChatAdministrators|BotCommandScopeChat|BotCommandScopeChatAdministrators|BotCommandScopeChatMember)[]} [scope] JSON, описывающий круг пользователей, для которых релевантны команды. По умолчанию используется BotCommandScopeDefault.
   * @param {string} [language_code] двухбуквенный код языка ISO 639-1. Если пусто, команды будут применяться ко всем пользователям из заданной области, для языка которых нет выделенных команд.
   * @returns {BotCommand[]|[]} возвращает массив BotCommand в случае успеха. Если команды не заданы, возвращается пустой список.
   */
  getMyCommands(scope = "", language_code = "") {
    const query = {
      scope: scope ? JSON.stringify(scope) : null,
      language_code: language_code ? language_code : null,
    };
    return this.request(Methods.GET_MY_COMMANDS, query);
  }

  /**
   * Метод, для удаления списока команд бота.
   * @see {@link https://core.telegram.org/bots/api#deletemycommands Telegram API}
   * @param {(BotCommandScopeDefault|BotCommandScopeAllPrivateChats|BotCommandScopeAllGroupChats|BotCommandScopeAllChatAdministrators|BotCommandScopeChat|BotCommandScopeChatAdministrators|BotCommandScopeChatMember)[]} [scope] JSON, описывающий круг пользователей, для которых релевантны команды. По умолчанию используется BotCommandScopeDefault.
   * @param {string} [language_code] двухбуквенный код языка ISO 639-1. Если пусто, команды будут применяться ко всем пользователям из заданной области, для языка которых нет выделенных команд.
   * @returns {boolean} возвращает True в случае успеха.
   */
  deleteMyCommands(scope = "", language_code = "") {
    const query = {
      scope: scope ? JSON.stringify(scope) : null,
      language_code: language_code ? language_code : null,
    };

    return this.request(Methods.DELETE_MY_COMMANDS, query);
  }

  // Chat

  /**
   * Используйте этот метод для получения актуальной информации о чате (текущее имя пользователя для разговоров один на один, текущее имя пользователя, группы или канала и т. д.).
   * @see {@link https://core.telegram.org/bots/api#getchat Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевой группы или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @returns {Chat} возвращает объект чата Chat в случае успеха.
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
   * Метод, для получения списка администраторов в чате.
   * @see {@link https://core.telegram.org/bots/api#getchatadministrators Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @returns {(ChatMemberOwner|ChatMemberAdministrator|ChatMemberMember|ChatMemberRestricted|ChatMemberLeft|ChatMemberBanned)} В случае успеха возвращает массив объектов ChatMember, содержащий информацию обо всех администраторах чата, кроме других ботов. Если чат является группой или супергруппой и не были назначены администраторы, будет возвращен только создатель.
   */
  getChatAdministrators(chat_id) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
    };

    return this.request(Methods.GET_CHAT_ADMINISTRATORS, query);
  }

  /**
   * Метод, чтобы установить пользовательский титул для администратора в супергруппе, продвигаемой ботом.
   * @see {@link https://core.telegram.org/bots/api#setchatadministratorcustomtitle Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @param {number} user_id уникальный идентификатор идентификатор целевого пользователя.
   * @param {string} custom_title новый пользовательский титул для администратора, 0-16 символов, эмодзи не разрешены.
   * @returns {boolean} возвращает True в случае успеха.
   */
  setChatAdministratorCustomTitle(chat_id, user_id, custom_title) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
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
   * Метод, для получения количества участников в чате.
   * @see {@link https://core.telegram.org/bots/api#getchatmembercount Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @returns {number} возвращает Int в случае успеха.
   */
  getChatMemberCount(chat_id) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
    };

    return this.request(Methods.GET_CHAT_MEMBER_COUNT, query);
  }

  /**
   * Метод, получения информации об участнике чата.
   * @see {@link https://core.telegram.org/bots/api#getchatmember Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @param {number} user_id уникальный идентификатор идентификатор целевого пользователя.
   * @returns {(ChatMemberOwner|ChatMemberAdministrator|ChatMemberMember|ChatMemberRestricted|ChatMemberLeft|ChatMemberBanned)} возвращает объект ChatMember в случае успеха.
   */
  getChatMember(chat_id, user_id) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
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
   * Метод, для блокировки пользователя в группе, супергруппе или канале.
   * В случае с супергруппами и каналами пользователь не сможет вернуться в чат самостоятельно по инвайт-ссылкам и т.п., если только его предварительно не разбанят.
   * Чтобы это работало, бот должен быть администратором в чате и иметь соответствующие права администратора.
   * @see {@link https://core.telegram.org/bots/api#banchatmember Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате \@channelusername).
   * @param {number} user_id уникальный идентификатор идентификатор целевого пользователя.
   * @param {number} [until_date] дата, когда пользователь будет разбанен, unix-время. Пользователь забанен > 366 дней или > 30 сек. текущего времени, забаненным навсегда. Применяется только для супергрупп и каналов.
   * @param {boolean} [revoke_messages] True, чтобы удалить все сообщения из чата для удаляемого пользователя. False, пользователь сможет видеть сообщения в группе, которые были отправлены до того, как пользователь был удален. Всегда верно для супергрупп и каналов.
   * @returns {boolean} возвращает True в случае успеха.
   */
  banChatMember(chat_id, user_id, until_date, revoke_messages = true) {
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
   * Метод, для разблокировки ранее забаненного пользователя в супергруппе или канале.
   * Пользователь не вернется в группу или канал автоматически, но сможет присоединиться по ссылке и т. д.
   * По умолчанию этот метод гарантирует, что после звонка пользователь не будет участником чата, но сможет присоединиться к нему.
   * Поэтому, если пользователь является участником чата, он также будет удален из чата. Если вы этого не хотите, используйте параметр only_if_banned.
   * Чтобы это работало, бот должен быть администратором в чате и иметь соответствующие права администратора.
   * @see {@link https://core.telegram.org/bots/api#unbanchatmember Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате \@channelusername).
   * @param {number} user_id уникальный идентификатор идентификатор целевого пользователя.
   * @param {boolean} [only_if_banned] ничего не делать, если пользователь не забанен.
   * @returns {boolean} возвращает True в случае успеха.
   */
  unbanChatMember(chat_id, user_id, only_if_banned = true) {
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
   * Метод, чтобы ограничить пользователя в супергруппе.
   * Бот должен быть администратором в супергруппе и иметь соответствующие права администратора.
   * @see {@link https://core.telegram.org/bots/api#restrictchatmember Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы (в формате @supergroupusername).
   * @param {number} user_id уникальный идентификатор целевого пользователя.
   * @param {ChatPermissions} permissions JSON-сериализованный объект для новых разрешений пользователя.
   * @param {number} [until_date] дата снятия ограничений для пользователя, время unix. Заблокирован > 366 дней или < 30 сек. с текущего времени, считается заблокированным навсегда.
   * @returns {boolean} возвращает True в случае успеха.
   */
  restrictChatMember(chat_id, user_id, permissions, until_date) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы (в формате @supergroupusername)."
      );
    if (!user_id)
      helper.miss_parameter(
        "user_id уникальный идентификатор целевого пользователя."
      );
    if (!permissions || permissions === {})
      helper.miss_parameter(
        "permissions JSON-сериализованный объект для новых разрешений чата по умолчанию."
      );

    const query = {
      chat_id: String(chat_id),
      user_id: Number(user_id),
      permissions: JSON.stringify(permissions),
      until_date: until_date ? Number(until_date) : null,
    };

    return this.request(Methods.RESTRICT_CHAT_MEMBER, query);
  }

  /**
   * Метод, для установки разрешений чата по умолчанию для всех участников.
   * Чтобы это работало, бот должен быть администратором в группе или супергруппе и иметь права администратора can_restrict_members.
   * @see {@link https://core.telegram.org/bots/api#setchatpermissions Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы (в формате \@supergroupusername).
   * @param {ChatPermissions} permissions JSON-сериализованный объект для новых разрешений чата по умолчанию.
   * @returns {boolean} возвращает True в случае успеха.
   */
  setChatPermissions(chat_id, permissions) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы (в формате @supergroupusername)."
      );
    if (!permissions || permissions === {})
      helper.miss_parameter(
        "permissions JSON-сериализованный объект для новых разрешений чата по умолчанию."
      );

    const query = {
      chat_id: String(chat_id),
      permissions: JSON.stringify(permissions),
    };

    return this.request(Methods.SET_CHAT_PERMISSIONS, query);
  }

  /**
   * Метод, для создания новой основной ссылки-приглашения для чата (любая ранее созданная первичная ссылка аннулируется).
   * Чтобы это работало, бот должен быть администратором в чате и иметь соответствующие права администратора.
   * @see {@link https://core.telegram.org/bots/api#exportchatinvitelink Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы (в формате \@supergroupusername).
   * @returns {string} возвращает новую ссылку-приглашение в виде строки в случае успеха.
   */
  exportChatInviteLink(chat_id) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы (в формате @supergroupusername)."
      );

    const query = {
      chat_id: String(chat_id),
    };

    return this.request(Methods.EXPORT_CHAT_INVITE_LINK, query);
  }

  /**
   * Метод, чтобы создать дополнительную ссылку для приглашения в чат.
   * Чтобы это работало, бот должен быть администратором в чате и иметь соответствующие права администратора.
   * Ссылку можно отозвать с помощью метода revokeChatInviteLink.
   * @see {@link https://core.telegram.org/bots/api#createchatinvitelink Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы (в формате \@supergroupusername).
   * @property {string} [options.link_name] имя пригласительной ссылки, 0-32 символа.
   * @property {number} [options.expire_date] момент времени (временная метка Unix), когда срок действия ссылки истечет.
   * @property {number} [options.member_limit] max кол-во пользователей, которые могут одновременно быть участниками чата после присоединения к чату по данной инвайт-ссылке (1-99999).
   * @property {boolean} [options.creates_join_request] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @returns {ChatInviteLink} возвращает новую ссылку-приглашение в виде объекта ChatInviteLink.
   */
  createChatInviteLink({
    chat_id,
    link_name = "",
    expire_date = "",
    member_limit = "",
    creates_join_request = false,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы (в формате @supergroupusername)."
      );
    this._lengthError({ link_name: link_name });
    this._lengthError({ member_limit: member_limit });

    const query = {
      chat_id: String(chat_id),
      name: link_name ? String(link_name) : null,
      expire_date: expire_date ? Number(expire_date) : null,
      member_limit: member_limit ? Number(member_limit) : null,
      creates_join_request: Boolean(creates_join_request),
    };

    return this.request(Methods.CREATE_CHAT_INVITE_LINK, query);
  }

  /**
   * Метод, для редактирования неосновной ссылки-приглашения, созданной ботом.
   * Чтобы это работало, бот должен быть администратором в чате и иметь соответствующие права администратора.
   * @see {@link https://core.telegram.org/bots/api#editchatinvitelink Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы (в формате \@supergroupusername).
   * @property {string} options.invite_link пригласительная ссылка для редактирования
   * @property {string} [options.link_name] имя пригласительной ссылки, 0-32 символа.
   * @property {number} [options.expire_date] момент времени (временная метка Unix), когда срок действия ссылки истечет.
   * @property {number} [options.member_limit] max кол-во пользователей, которые могут одновременно быть участниками чата после присоединения к чату по данной инвайт-ссылке (1-99999).
   * @property {boolean} [options.creates_join_request] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @returns {ChatInviteLink} возвращает отредактированную ссылку-приглашение в виде объекта ChatInviteLink.
   */
  editChatInviteLink({
    chat_id,
    invite_link,
    link_name = "",
    expire_date = "",
    member_limit = "",
    creates_join_request = false,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы (в формате @supergroupusername)."
      );
    if (!invite_link)
      helper.miss_parameter(
        "invite_link уникальный идентификатор целевого чата или имя пользователя целевой супергруппы (в формате @supergroupusername)."
      );
    this._lengthError({ link_name: link_name });
    this._lengthError({ member_limit: member_limit });

    const query = {
      chat_id: String(chat_id),
      invite_link: String(invite_link),
      name: link_name ? String(link_name) : null,
      expire_date: expire_date ? Number(expire_date) : null,
      member_limit: member_limit ? Number(member_limit) : null,
      creates_join_request: Boolean(creates_join_request),
    };

    return this.request(Methods.EDIT_CHAT_INVITE_LINK, query);
  }

  /**
   * Метод, чтобы установить новую фотографию профиля для чата.
   * Фотографии нельзя изменить для приватных чатов. Ч
   * тобы это работало, бот должен быть администратором в чате и иметь соответствующие права администратора.
   * @see {@link https://core.telegram.org/bots/api#setchatphoto Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @param {InputFile} photo новое фото чата, загруженное с помощью multipart/form-data.
   * @returns {boolean} возвращает True в случае успеха.
   */
  setChatPhoto(chat_id, photo) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );
    if (!photo)
      helper.miss_parameter(
        "photo новое фото чата, загруженное с помощью multipart/form-data."
      );

    const query = {
      chat_id: String(chat_id),
      photo: photo,
    };

    return this.request(Methods.SET_CHAT_PHOTO, query, "multipart/form-data");
  }

  /**
   * Метод, чтобы удалить фотографию чата.
   * Фотографии нельзя изменить для приватных чатов.
   * Чтобы это работало, бот должен быть администратором в чате и иметь соответствующие права администратора.
   * @see {@link https://core.telegram.org/bots/api#deletechatphoto Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @returns {boolean} возвращает True в случае успеха.
   */
  deleteChatPhoto(chat_id) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
    };

    return this.request(Methods.DELETE_CHAT_PHOTO, query);
  }

  /**
   * Метод, чтобы изменить название чата.
   * Названия не могут быть изменены для приватных чатов.
   * Чтобы это работало, бот должен быть администратором в чате и иметь соответствующие права администратора.
   * @see {@link https://core.telegram.org/bots/api#setchattitle Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @param {string} title новое название чата, 1-255 символов.
   * @returns {boolean} возвращает True в случае успеха.
   */
  setChatTitle(chat_id, title) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );
    if (!title)
      helper.miss_parameter("title новое название чата, 1-255 символов.");
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
   * Метод для изменения описания группы, супергруппы или канала.
   * Чтобы это работало, бот должен быть администратором в чате и иметь соответствующие права администратора.
   * @see {@link https://core.telegram.org/bots/api#setchatdescription Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @param {string} [description] новое описание чата, 0-255 символов.
   * @returns {boolean} возвращает True в случае успеха.
   */
  setChatDescription(chat_id, description = "") {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
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
   * Метод изменения имени бота.
   * @see {@link https://core.telegram.org/bots/api#setmyname Telegram API}
   * @param {string} [name] новое имя бота; 0-64 символа. Передайте пустую строку, чтобы удалить выделенное имя для данного языка.
   * @param {string} [language_code] Двухбуквенный код языка ISO 639-1.
   * Если пусто, то имя будет показано всем пользователям, для которых нет выделенного имени на языке.
   * @returns {boolean} возвращает True в случае успеха.
   */
  setMyName(name = "", language_code = "") {
    const query = {
      name: name ? String(name) : null,
      language_code: language_code ? language_code : null,
    };

    return this.request(Methods.SET_MY_NAME, query);
  }

  /**
   * Метод получения текущего имени бота для данного пользовательского языка.
   * @see {@link https://core.telegram.org/bots/api#getmyname Telegram API}
   * @param {string} [language_code] Двухбуквенный код языка ISO 639-1.
   * Если пусто, то имя будет показано всем пользователям, для которых нет выделенного имени на языке.
   * @returns {BotName} возвращает BotName в случае успеха.
   */
  getMyName(language_code = "") {
    const query = {
      language_code: language_code ? language_code : null,
    };

    return this.request(Methods.GET_MY_NAME, query);
  }

  /**
   * Метод изменения описания бота, которое отображается в чате с ботом, если чат пуст.
   * @see {@link https://core.telegram.org/bots/api#setmydescription Telegram API}
   * @param {string} [description] новое описание бота; 0-512 символов.
   * Передайте пустую строку, чтобы удалить специальное описание для данного языка.
   * @param {string} [language_code] Двухбуквенный код языка ISO 639-1.
   * Если пусто, то имя будет показано всем пользователям, для которых нет выделенного имени на языке.
   * @returns {boolean} возвращает True в случае успеха.
   */
  setMyDescription(description = "", language_code = "") {
    const query = {
      description: description ? String(description) : null,
      language_code: language_code ? language_code : null,
    };

    return this.request(Methods.SET_MY_DESCRIPTION, query);
  }

  /**
   * Метод получения текущего описания бота для данного пользовательского языка.
   * @see {@link https://core.telegram.org/bots/api#getmydescription Telegram API}
   * @param {string} [language_code] Двухбуквенный код языка ISO 639-1.
   * Если пусто, то имя будет показано всем пользователям, для которых нет выделенного имени на языке.
   * @returns {BotDescription} возвращает BotDescription в случае успеха.
   */
  getMyDescription(language_code = "") {
    const query = {
      language_code: language_code ? language_code : null,
    };

    return this.request(Methods.GET_MY_DESCRIPTION, query);
  }

  /**
   * Метод изменения краткого описания бота, которое отображается на странице профиля бота и отправляется вместе со ссылкой,
   * когда пользователи делятся ботом.
   * @see {@link https://core.telegram.org/bots/api#setmyshortdescription Telegram API}
   * @param {string} [short_description] новое краткое описание бота; 0-120 символов.
   * Передайте пустую строку, чтобы удалить специальное краткое описание для данного языка.
   * @param {string} [language_code] Двухбуквенный код языка ISO 639-1.
   * Если пусто, то имя будет показано всем пользователям, для которых нет выделенного имени на языке.
   * @returns {boolean} возвращает True в случае успеха.
   */
  setMyShortDescription(short_description = "", language_code = "") {
    const query = {
      short_description: short_description ? String(short_description) : null,
      language_code: language_code ? language_code : null,
    };

    return this.request(Methods.SET_MY_SHORT_DESCRIPTION, query);
  }

  /**
   * Метод получения текущего описания бота для данного пользовательского языка.
   * @see {@link https://core.telegram.org/bots/api#getmyshortdescription Telegram API}
   * @param {string} [language_code] Двухбуквенный код языка ISO 639-1.
   * Если пусто, то имя будет показано всем пользователям, для которых нет выделенного имени на языке.
   * @returns {BotShortDescription} возвращает BotShortDescription в случае успеха.
   */
  getMyShortDescription(language_code = "") {
    const query = {
      language_code: language_code ? language_code : null,
    };

    return this.request(Methods.GET_MY_SHORT_DESCRIPTION, query);
  }

  /**
   * Метод изменения кнопки меню бота в приватном чате или кнопки меню по умолчанию.
   * @see {@link https://core.telegram.org/bots/api#setchatmenubutton Telegram API}
   * @param {(string|number)} [chat_id] уникальный идентификатор целевого приватного чата.
   * Если не указано, кнопка меню бота по умолчанию будет изменена.
   * @param {(MenuButtonCommands|MenuButtonWebApp|MenuButtonDefault)} [menu_button] JSON объект для новой кнопки меню бота, по умолчанию MenuButtonDefault.
   * @returns {boolean} возвращает True в случае успеха.
   */
  setChatMenuButton(chat_id = "", menu_button = "") {
    const query = {
      chat_id: chat_id ? String(chat_id) : null,
      menu_button: menu_button ? menu_button : null,
    };

    return this.request(Methods.SET_CHAT_MENU_BUTTON, query);
  }

  /**
   * Метод, получения текущего значения кнопки меню бота в приватном чате или кнопки меню по умолчанию.
   * @see {@link https://core.telegram.org/bots/api#getchatmenubutton Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого приватного чата.
   * Если не указано, будет возвращена кнопка меню бота по умолчанию.
   * @returns {(MenuButtonCommands|MenuButtonWebApp|MenuButtonDefault)} возвращает MenuButton в случае успеха.
   */
  getChatMenuButton(chat_id = "") {
    const query = {
      chat_id: chat_id ? String(chat_id) : null,
    };

    return this.request(Methods.GET_CHAT_MENU_BUTTON, query);
  }

  /**
   * Метод, добавления сообщения в список закрепленных сообщений в чате.
   * Если чат не является приватным, бот должен быть администратором в чате, иметь права администратора «can_pin_messages» в супергруппе или права администратора «can_edit_messages» в канале.
   * @see {@link https://core.telegram.org/bots/api#pinchatmessage Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @param {number} message_id идентификатор сообщения для закрепления.
   * @param {boolean} [disable_notification] True, если нет необходимости отправлять уведомление всем участникам чата о новом закрепленном сообщении.
   * Уведомления всегда отключены в каналах и приватных чатах.
   * @returns {boolean} возвращает True в случае успеха.
   */
  pinChatMessage(chat_id, message_id, disable_notification = false) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
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
   * Метод удаления закрепленного сообщения в чате.
   * Если чат не является приватным, бот должен быть администратором в чате, иметь права администратора «can_pin_messages» в супергруппе или права администратора «can_edit_messages» в канале.
   * @see {@link https://core.telegram.org/bots/api#unpinchatmessage Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @param {number} [message_id] идентификатор сообщения, которое нужно открепить.
   * Если не указано, самое последнее закрепленное сообщение (по дате отправки) будет откреплено.
   * @returns {boolean} возвращает True в случае успеха.
   */
  unpinChatMessage(chat_id, message_id = "") {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
      message_id: message_id ? Number(message_id) : null,
    };

    return this.request(Methods.UNPIN_CHAT_MESSAGE, query);
  }

  /**
   * Метод очистки списка закрепленных сообщений в чате.
   * Если чат не является приватным, бот должен быть администратором в чате, иметь права администратора «can_pin_messages» в супергруппе или права администратора «can_edit_messages» в канале.
   * @see {@link https://core.telegram.org/bots/api#unpinallchatmessages Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @returns {boolean} возвращает True в случае успеха.
   */
  unpinAllChatMessages(chat_id) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
    };

    return this.request(Methods.UNPIN_ALL_CHAT_MESSAGES, query);
  }

  /**
   * Используйте этот метод чтобы ваш бот покинул группу, супергруппу или канал.
   * @see {@link https://core.telegram.org/bots/api#leavechat Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @returns {boolean} возвращает True в случае успеха.
   */
  leaveChat(chat_id) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );

    const query = {
      chat_id: String(chat_id),
    };

    return this.request(Methods.LEAVE_CHAT, query);
  }

  /**
   * Используйте этот метод, когда вам нужно сообщить пользователю, что что-то происходит на стороне бота. Статус устанавливается на 5 секунд или меньше (когда приходит сообщение от вашего бота, клиенты Telegram сбрасывают его статус набора).
   * @see {@link https://core.telegram.org/bots/api#sendchataction Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @param {string} action тип действия для трансляции.
   * Выберите в зависимости от того, что пользователь собирается получить:
   * - "typing" для текстовых сообщений;
   * - "upload_photo" для фотографий;
   * - "record_video" или "upload_video" для видео;
   * - "record_voice" или "upload_voice" для голосовых заметок;
   * - "upload_document" для общих файлов;
   * - "choose_sticker" для наклеек;
   * - "find_location" для данных о местоположении;
   * - "record_video_note" или "upload_video_note" для видеозаметок;
   * @returns {boolean} возвращает True в случае успеха.
   */
  sendChatAction(chat_id, action) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
      );
    if (!action) helper.miss_parameter("action тип действия для трансляции.");

    const query = {
      chat_id: String(chat_id),
      action: String(action),
    };

    return this.request(Methods.SEND_CHAT_ACTION, query);
  }

  /**
   * Метод, для получения списока изображений профиля для пользователя.
   * @see {@link https://core.telegram.org/bots/api#getuserprofilephotos Telegram API}
   * @param {(string|number)} chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @param {number} [offset] порядковый номер первой возвращаемой фотографии. По умолчанию возвращаются все фотографии.
   * @param {number} [limit] ограничивает количество извлекаемых фотографий. Принимаются значения от 1 до 100. По умолчанию 100.
   * @returns {UserProfilePhotos} возвращает объект UserProfilePhotos в случае успеха.
   */
  getUserProfilePhotos(chat_id, offset = "", limit = "") {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
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
   * Метод, для отправки текстовых сообщений.
   * Чтобы использовать HTML, передайте HTML, использовать MarkdownV2, передайте MarkdownV2 в поле parse_mode.
   * @see {@link https://core.telegram.org/bots/api#formatting-options Форматы}
   * @see {@link https://core.telegram.org/bots/api#sendmessage Telegram API}
   * @type {object} options параметры запроса.
   * @property  {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {string} options.text текст сообщения, 1-4096 символов.
   * @property {string} [options.parse_mode] режим разбора сущностей "HTML" | "MarkdownV2".
   * @property {MessageEntity[]} [options.entities] JSON список специальных сущностей, которые появляются в новом заголовке, который можно указать вместо parse_mode.
   * @property {boolean} [options.disable_web_page_preview] отключить предварительный просмотр ссылок в этом сообщении.
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} options.reply_markup объект JSON для встроенной клавиатуры.
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  sendMessage({
    chat_id,
    message_thread_id = "",
    text,
    parse_mode = "HTML",
    entities = "",
    disable_web_page_preview = false,
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
    reply_markup = "",
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
      parse_mode: String(parse_mode),
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
   * Метод, для пересылки сообщений любого типа.
   * Служебные сообщения не могут быть переадресованы.
   * @see {@link https://core.telegram.org/bots/api#forwardmessage Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {(string|number)} options.from_chat_id уникальный идентификатор чата, в который было отправлено исходное сообщение (или имя пользователя канала в формате @channelusername).
   * @property {number} options.message_id идентификатор сообщения в чате указанный в from_chat_id.
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  forwardMessage({
    chat_id = "",
    message_thread_id = "",
    from_chat_id = "",
    message_id = "",
    disable_notification = false,
    protect_content = false,
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
   * Метод, для копирования сообщения.
   * @see {@link https://core.telegram.org/bots/api#copymessage Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {(string|number)} options.from_chat_id уникальный идентификатор чата, в который было отправлено исходное сообщение (или имя пользователя канала в формате \@channelusername).
   * @property {number} options.message_id идентификатор сообщения в чате указанный в from_chat_id.
   * @property {string} [options.caption] новая подпись для медиа, 0-1024 символов. Если не указано, исходная подпись сохраняется.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} [options.reply_markup] объект JSON для встроенной клавиатуры.
   * @property {string} [options.parse_mode] режим разбора сущностей в новой подписи "HTML" | "MarkdownV2".
   * @property {MessageEntity[]} [options.caption_entities] JSON список специальных сущностей, которые появляются в новом заголовке, который можно указать вместо parse_mode.
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @returns {MessageId} возвращает MessageId отправленного сообщения в случае успеха.
   */
  copyMessage({
    chat_id = "",
    message_thread_id = "",
    from_chat_id = "",
    message_id = "",
    caption = "",
    reply_markup = "",
    parse_mode = "HTML",
    caption_entities = "",
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
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
      parse_mode: String(parse_mode),
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
  * Метод, для удаления сообщения, в том числе служебного, со следующими ограничениями:
   - Сообщение может быть удалено только в том случае, если оно было отправлено < 48 часов назад.
   - Сообщение с кубиками в приватном чате можно удалить только в том случае, если оно было отправлено > 24 часов назад.
   - Боты могут удалять исходящие сообщения в приватных чатах, группах и супергруппах.
   - Боты могут удалять входящие сообщения в приватных чатах.
   - Боты с разрешениями can_post_messages могут удалять исходящие сообщения в каналах.
   - Если бот является администратором группы, он может удалить там любое сообщение.
   - Если у бота есть разрешение can_delete_messages в супергруппе или канале, он может удалить там любое сообщение.
  * @see {@link https://core.telegram.org/bots/api#deletemessage Telegram API}
  * @type {object} options параметры запроса.
  * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате \@channelusername). 
  * @property {number} options.message_id идентификатор сообщения для удаления.
  * @returns {boolean} возвращает True в случае успеха.
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
   * Метод, для редактирования текстовых и игровых сообщений.
   * @see {@link https://core.telegram.org/bots/api#editmessagetext Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} [options.chat_id] уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате \@channelusername), если inline_message_id не указан.
   * @property {number} [options.message_id] идентификатор сообщения для редактирования, если inline_message_id не указан.
   * @property {string} [options.inline_message_id] идентификатор встроенного сообщения, если chat_id и message_id не указаны.
   * @property {string} options.text новый текст сообщения, 1-4096 символов.
   * @property {string} [options.parse_mode] режим разбора сущностей в новой подписи "HTML" | "MarkdownV2".
   * @property {MessageEntity[]} [options.entities] JSON список специальных сущностей, которые появляются в тексте сообщения, который можно указать вместо parse_mode.
   * @property {boolean} [options.disable_web_page_preview] отключить предварительный просмотр ссылок в этом сообщении.
   * @property {InlineKeyboardMarkup} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @returns {Message | boolean} В случае успеха, если отредактированное сообщение не является встроенным сообщением, возвращается Message отредактированное сообщение, в противном случае возвращается True.
   */
  editMessageText({
    chat_id = "",
    message_id = "",
    inline_message_id = "",
    text = "",
    parse_mode = "HTML",
    entities = "",
    disable_web_page_preview = false,
    reply_markup = "",
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
        parse_mode: String(parse_mode),
        entities: entities ? JSON.stringify(entities) : null,
        disable_web_page_preview: Boolean(disable_web_page_preview),
        reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
      };

    return this.request(Methods.EDIT_MESSAGE_TEXT, query);
  }

  /**
   * Метод, для редактирования подписей к сообщениям.
   * @see {@link https://core.telegram.org/bots/api#editmessagecaption Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} [options.chat_id] уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате \@channelusername), если inline_message_id не указан.
   * @property {number} [options.message_id] идентификатор сообщения для редактирования, если inline_message_id не указан.
   * @property {string} [options.inline_message_id] идентификатор встроенного сообщения, если chat_id и message_id не указаны.
   * @property {string} [options.caption] новый заголовок сообщения, 0-1024 символов.
   * @property {string} [options.parse_mode] режим разбора сущностей в новой подписи "HTML" | "MarkdownV2".
   * @property {MessageEntity[]} [options.caption_entities] JSON список специальных сущностей, которые появляются в новом заголовке, который можно указать вместо parse_mode.
   * @property {InlineKeyboardMarkup} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @returns {Message | boolean} В случае успеха, если отредактированное сообщение не является встроенным сообщением, возвращается Message отредактированное сообщение, в противном случае возвращается True.
   */
  editMessageCaption({
    chat_id = "",
    message_id = "",
    inline_message_id = "",
    caption = "",
    parse_mode = "HTML",
    caption_entities = "",
    reply_markup = "",
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
        parse_mode: String(parse_mode),
        caption_entities: caption_entities
          ? JSON.stringify(caption_entities)
          : null,
        reply_markup: reply_markup ? JSON.stringify(reply_markup) : null,
      };

    return this.request(Methods.EDIT_MESSAGE_CAPTION, query);
  }

  /**
   * Метод, для редактирования анимации, аудио, документа, фото или видео сообщения.
   * @see {@link https://core.telegram.org/bots/api#editmessagemedia Telegram API}
   * Если сообщение является частью альбома сообщений, его можно отредактировать только в аудио для аудиоальбомов, в документ для альбомов документов и в фото или видео в остальных случаях.
   * При редактировании встроенного сообщения новый файл не может быть загружен;
   * использовать ранее загруженный файл через его file_id или указать URL-адрес.
   * @type {object} options параметры запроса.
   * @property {(string|number)} [options.chat_id] уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате \@channelusername), если inline_message_id не указан.
   * @property {number} [options.message_id] идентификатор сообщения для редактирования, если inline_message_id не указан.
   * @property {string} [options.inline_message_id] идентификатор встроенного сообщения, если chat_id и message_id не указаны.
   * @property {InputMedia} options.media объект JSON для нового мультимедийного содержимого сообщения.
   * @property {InlineKeyboardMarkup} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @returns {Message | boolean} В случае успеха, если отредактированное сообщение не является встроенным сообщением, возвращается Message отредактированное сообщение, в противном случае возвращается True.
   */
  editMessageMedia({
    chat_id = "",
    message_id = "",
    inline_message_id = "",
    media = "",
    reply_markup = "",
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
   * Метод, для редактирования разметки ответов сообщений.
   * @see {@link https://core.telegram.org/bots/api#editmessagereplymarkup Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} [options.chat_id] уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате \@channelusername), если inline_message_id не указан.
   * @property {number} [options.message_id] идентификатор сообщения для редактирования, если inline_message_id не указан.
   * @property {string} [options.inline_message_id] идентификатор встроенного сообщения, если chat_id и message_id не указаны.
   * @property {InlineKeyboardMarkup} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @returns {Message | boolean} В случае успеха, если отредактированное сообщение не является встроенным сообщением, возвращается отредактированное сообщение, в противном случае возвращается True.
   */
  editMessageReplyMarkup({
    chat_id = "",
    message_id = "",
    inline_message_id = "",
    reply_markup = "",
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
   * Метод, для отправки фотографий.
   * @see {@link https://core.telegram.org/bots/api#sendphoto Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {(InputFile|string)} options.photo фото для отправки.
   * Передайте file_id в виде строки, чтобы отправить фотографию, которая существует на серверах Telegram (рекомендуется).
   * Передайте URL-адрес HTTP в виде строки, чтобы Telegram мог получить фотографию из Интернета, или загрузите новую фотографию, используя multipart/form-data.
   * Фотография должна быть размером не более 10 МБ.
   * Суммарная ширина и высота фотографии не должны превышать 10000.
   * Соотношение ширины и высоты должно быть не более 20.
   * @property {string} [options.caption] подпись к фото (может использоваться при повторной отправке по file_id), 0-1024 символа.
   * @property {string} [options.parse_mode] режим разбора сущностей в новой подписи "HTML" | "MarkdownV2".
   * @property {MessageEntity[]} [options.caption_entities] JSON список специальных сущностей, которые появляются в новом заголовке, который можно указать вместо parse_mode.
   * @property {boolean} [options.has_spoiler] True, если фото нужно прикрыть анимацией спойлера.
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @property {string} [options.contentType] "multipart/form-data", по умолчанию "application/json".
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  sendPhoto({
    chat_id = "",
    message_thread_id = "",
    photo = "",
    caption = "",
    parse_mode = "HTML",
    caption_entities = "",
    has_spoiler = false,
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
    reply_markup = "",
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
      parse_mode: String(parse_mode),
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
   * Метод, для отправки отправки аудиофайлов, если вы хотите, чтобы клиенты Telegram отображали их в музыкальном проигрывателе.
   * Ваш звук должен быть в формате .MP3 или .M4A. В случае успеха возвращается отправленное сообщение.
   * @see {@link https://core.telegram.org/bots/api#sendaudio Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {(InputFile|string)} options.audio аудио для отправки.
   * @property {string} [options.caption] подпись к аудио, 0-1024 символа.
   * @property {string} [options.parse_mode] режим разбора сущностей в новой подписи "HTML" | "MarkdownV2".
   * @property {MessageEntity[]} [options.caption_entities] JSON список специальных сущностей, которые появляются в новом заголовке, который можно указать вместо parse_mode.
   * @property {number} [options.duration] продолжительность в секундах.
   * @property {string} [options.performer] исполнитель аудио.
   * @property {string} [options.title] название аудио.
   * @property {(InputFile|string)} [options.thumb] миниатюра отправленного файла; можно игнорировать, если генерация миниатюр для файла поддерживается на стороне сервера. Миниатюра должна быть в формате JPEG и иметь размер не более 200 КБ. Ширина и высота эскиза не должны превышать 320. Игнорируется, если файл загружен не с помощью multipart/form-data. Миниатюры нельзя использовать повторно, их можно загружать только как новый файл, поэтому вы можете передать «attach://<file_attach_name>», если миниатюра была загружена с использованием multipart/form-data в <file_attach_name>.
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @property {string} [options.contentType] "multipart/form-data", по умолчанию "application/json".
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  sendAudio({
    chat_id = "",
    message_thread_id = "",
    audio = "",
    caption = "",
    parse_mode = "HTML",
    caption_entities = "",
    duration = "",
    performer = "",
    title = "",
    thumb = "",
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
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
      parse_mode: String(parse_mode),
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
   * Метод, для отправки общих файлов.
   * @see {@link https://core.telegram.org/bots/api#senddocument Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {(InputFile|string)} options.document файл для отправки.
   * В настоящее время боты могут отправлять файлы любого типа размером до 50 МБ, может быть изменено в будущем.
   * Передайте file_id в виде строки, чтобы отправить файл, существующий на серверах Telegram (рекомендуется).
   * Передайте URL-адрес HTTP в виде строки, чтобы Telegram мог получить файл из Интернета, или загрузите новый, используя multipart/form-data.
   * @property {string} [options.caption] подпись к документу (также может использоваться при повторной отправке документа по file_id), 0-1024 символа.
   * @property {(InputFile|string)} [options.thumb] миниатюра отправленного файла, можно игнорировать, если генерация миниатюр для файла поддерживается на стороне сервера, формат JPEG и иметь размер не более 200К.
   * Ширина и высота эскиза не > 320, игнорируется, если файл загружен не с помощью multipart/form-data.
   * Миниатюры не могут быть повторно использованы и могут быть загружены только как новый файл.
   * Поэтому вы можете передать «attach://<file_attach_name>», если миниатюра была загружена с использованием multipart/form-data в <file_attach_name>
   * @property {string} [options.parse_mode] режим разбора сущностей в новой подписи "HTML" | "MarkdownV2".
   * @property {MessageEntity[]} [options.caption_entities] JSON список специальных сущностей, которые появляются в новом заголовке, который можно указать вместо parse_mode.
   * @property {boolean} [options.disable_content_type_detection] отключает автоматическое определение типа контента на стороне сервера для файлов, загруженных с помощью multipart/form-data.
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @property {string} [options.contentType] "multipart/form-data", по умолчанию "application/json".
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  sendDocument({
    chat_id = "",
    message_thread_id = "",
    document = "",
    caption = "",
    thumb = "",
    parse_mode = "HTML",
    caption_entities = "",
    disable_content_type_detection = false,
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
    reply_markup = "",
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
      thumb: thumb ? thumb : null,
      parse_mode: String(parse_mode),
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
   * Метод, для отправки видео.
   * @see {@link https://core.telegram.org/bots/api#sendvideo Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {(InputFile|string)} options.video видео для отправки.
   * @property {number} [options.duration] продолжительность в секундах.
   * @property {number} [options.width] ширина.
   * @property {number} [options.height] высота.
   * @property {(InputFile|string)} [options.thumb] миниатюра отправленного файла; можно игнорировать, если генерация миниатюр для файла поддерживается на стороне сервера. Миниатюра должна быть в формате JPEG и иметь размер не более 200 КБ. Ширина и высота эскиза не должны превышать 320. Игнорируется, если файл загружен не с помощью multipart/form-data. Миниатюры нельзя использовать повторно, их можно загружать только как новый файл, поэтому вы можете передать «attach://<file_attach_name>», если миниатюра была загружена с использованием multipart/form-data в <file_attach_name>.
   * @property {boolean} [options.has_spoiler] True, если видео нужно покрыть анимацией спойлера.
   * @property {boolean} [options.supports_streaming] True, если загруженное видео подходит для потоковой передачи.
   * @property {string} [options.caption] подпись к видео (может использоваться при повторной отправке по file_id), 0-1024 символа.
   * @property {string} [options.parse_mode] режим разбора сущностей в новой подписи "HTML" | "MarkdownV2".
   * @property {MessageEntity[]} [options.caption_entities] JSON список специальных сущностей, которые появляются в новом заголовке, который можно указать вместо parse_mode.
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @property {string} [options.contentType] "multipart/form-data", по умолчанию "application/json".
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  sendVideo({
    chat_id = "",
    message_thread_id = "",
    video = "",
    duration = "",
    width = "",
    height = "",
    thumb = "",
    caption = "",
    parse_mode = "HTML",
    caption_entities = "",
    has_spoiler = false,
    supports_streaming = false,
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
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
      thumb: thumb ? thumb : null,
      caption: caption ? String(caption) : null,
      parse_mode: String(parse_mode),
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
   * Метод, для отправки файлов анимации (видео GIF или H.264/MPEG-4 AVC без звука). В случае успеха возвращается отправленное сообщение.
   * В настоящее время боты могут отправлять анимационные файлы размером до 50 МБ, это ограничение может быть изменено в будущем.
   * @see {@link https://core.telegram.org/bots/api#sendanimation Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {(InputFile|string)} options.animation анимация для отправки.
   * @property {number} [options.duration] продолжительность в секундах.
   * @property {number} [options.width]
   * @property {number} [options.height]
   * @property {(InputFile|string)} [options.thumb] миниатюра отправленного файла; можно игнорировать, если генерация миниатюр для файла поддерживается на стороне сервера. Миниатюра должна быть в формате JPEG и иметь размер не более 200 КБ. Ширина и высота эскиза не должны превышать 320. Игнорируется, если файл загружен не с помощью multipart/form-data. Миниатюры нельзя использовать повторно, их можно загружать только как новый файл, поэтому вы можете передать «attach://<file_attach_name>», если миниатюра была загружена с использованием multipart/form-data в <file_attach_name>.
   * @property {string} [options.caption] подпись к аудио, 0-1024 символа.
   * @property {string} [options.parse_mode] режим разбора сущностей в новой подписи "HTML" | "MarkdownV2".
   * @property {MessageEntity[]} [options.caption_entities] JSON список специальных сущностей, которые появляются в новом заголовке, который можно указать вместо parse_mode.
   * @property {boolean} [options.has_spoiler] True, если анимацию нужно закрыть анимацией спойлера.
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @property {string} [options.contentType] "multipart/form-data", по умолчанию "application/json".
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  sendAnimation(
    chat_id = "",
    message_thread_id = "",
    animation = "",
    duration = "",
    width = "",
    height = "",
    thumb = "",
    caption = "",
    parse_mode = "HTML",
    caption_entities = "",
    has_spoiler = false,
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
    reply_markup,
    contentType
  ) {
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
      thumb: thumb ? thumb : null,
      parse_mode: String(parse_mode),
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
   * Метод, для отправки аудиофайлов, если вы хотите, чтобы клиенты Telegram отображали файл как воспроизводимое голосовое сообщение.
   * Чтобы это работало, ваше аудио должно быть в файле .OGG, закодированном с помощью OPUS (другие форматы могут быть отправлены как аудио или документ). В случае успеха возвращается отправленное сообщение.
   * @see {@link https://core.telegram.org/bots/api#sendvoice Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {(InputFile|string)} options.voice аудио для отправки.
   * @property {number} [options.duration] продолжительность в секундах.
   * @property {string} [options.caption] подпись к аудио, 0-1024 символа.
   * @property {string} [options.parse_mode] режим разбора сущностей в новой подписи "HTML" | "MarkdownV2".
   * @property {MessageEntity[]} [options.caption_entities] JSON список специальных сущностей, которые появляются в новом заголовке, который можно указать вместо parse_mode.
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @property {string} [options.contentType] "multipart/form-data", по умолчанию "application/json".
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  sendVoice({
    chat_id = "",
    message_thread_id = "",
    voice = "",
    duration = "",
    caption = "",
    parse_mode = "HTML",
    caption_entities = "",
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
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
      parse_mode: String(parse_mode),
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
   * Начиная с версии 4.0, клиенты Telegram поддерживают закругленные квадратные видео MPEG4 продолжительностью до 1 минуты.
   * Используйте этот метод для отправки видеосообщений. В случае успеха возвращается отправленное сообщение.
   * @see {@link https://core.telegram.org/bots/api#sendvideonote Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {(InputFile|string)} options.video_note видеозаметка для отправки.
   * @property {number} [options.duration] продолжительность в секундах.
   * @property {number} [options.length] ширина и высота видео, т.е. диаметр видеосообщения.
   * @property {(InputFile|string)} [options.thumb] миниатюра отправленного файла; можно игнорировать, если генерация миниатюр для файла поддерживается на стороне сервера. Миниатюра должна быть в формате JPEG и иметь размер не более 200 КБ. Ширина и высота эскиза не должны превышать 320. Игнорируется, если файл загружен не с помощью multipart/form-data. Миниатюры нельзя использовать повторно, их можно загружать только как новый файл, поэтому вы можете передать «attach://<file_attach_name>», если миниатюра была загружена с использованием multipart/form-data в <file_attach_name>.
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @property {string} [options.contentType] "multipart/form-data", по умолчанию "application/json".
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  sendVideoNote(
    chat_id = "",
    message_thread_id = "",
    video_note = "",
    duration = "",
    length = "",
    thumb = "",
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
    reply_markup,
    contentType
  ) {
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
      return this.request(Methods.SEND_VIDEO_NOTE, query, contentType);
    else return this.request(Methods.SEND_VIDEO_NOTE, query);
  }

  /**
   * Метод, отправки группы фотографий, видео, документов или аудио в виде альбома.
   * Документы и аудиофайлы могут быть сгруппированы в альбом только с сообщениями одного типа.
   * @see {@link https://core.telegram.org/bots/api#sendmediagroup Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {Array.<(InputMediaAudio|InputMediaDocument|InputMediaPhoto|InputMediaVideo)>} options.media объект JSON для нового мультимедийного содержимого сообщения.
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  sendMediaGroup({
    chat_id = "",
    message_thread_id = "",
    media = "",
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
  }) {
    if (!chat_id)
      helper.miss_parameter(
        "chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате @channelusername)."
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
   * Метод, для отправки точки на карте.
   * @see {@link https://core.telegram.org/bots/api#sendlocation Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {number} options.latitude широта местоположения.
   * @property {number} options.longitude долгота местоположения.
   * @property {string} [options.horizontal_accuracy] радиус неопределенности местоположения, измеряемый в метрах (0-1500).
   * @property {string} [options.live_period] период в секундах, в течение которого будет обновляться местоположение (должно быть от 60 до 86400).
   * @property {string} [options.heading] для живых местоположений — направление, в котором движется пользователь, в градусах.
   * Должно быть от 1 до 360, если указано.
   * @property {string} [options.proximity_alert_radius] расстояние для предупреждений о приближении к другому участнику чата в метрах.
   * Должно быть от 1 до 100000, если указано.
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  sendLocation(
    chat_id,
    message_thread_id = "",
    latitude,
    longitude,
    horizontal_accuracy = "",
    live_period = "",
    heading = "",
    proximity_alert_radius = "",
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
    reply_markup = ""
  ) {
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
   * Метод, для редактирования сообщений о местоположении в реальном времени.
   * @see {@link https://core.telegram.org/bots/api#editmessagelivelocation Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} [options.chat_id] Требуется, если inline_message_id не указан. Уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате @channelusername).
   * @property {number} [options.message_id] Требуется, если inline_message_id не указан. Идентификатор сообщения для редактирования.
   * @property {string} [options.inline_message_id] Требуется, если chat_id и message_id не указаны. Идентификатор встроенного сообщения.
   * @property {number} options.latitude широта нового местоположения.
   * @property {number} options.longitude долгота нового местоположения.
   * @property {string} [options.horizontal_accuracy] радиус неопределенности местоположения, измеряемый в метрах (0-1500).
   * @property {string} [options.live_period] период в секундах, в течение которого будет обновляться местоположение (должно быть от 60 до 86400).
   * @property {string} [options.heading] для живых местоположений — направление, в котором движется пользователь, в градусах.
   * Должно быть от 1 до 360, если указано.
   * @property {string} [options.proximity_alert_radius] расстояние для предупреждений о приближении к другому участнику чата в метрах.
   * Должно быть от 1 до 100000, если указано.
   * @property {InlineKeyboardMarkup} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  editMessageLiveLocation(
    chat_id,
    message_id,
    inline_message_id,
    latitude,
    longitude,
    horizontal_accuracy = "",
    live_period = "",
    heading = "",
    proximity_alert_radius = "",
    reply_markup = ""
  ) {
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

    return this.request(Methods.EDIT_MESSAGE_LIVE_LOCATION, query);
  }

  /**
   * Метод, для остановки обновления сообщения о текущем местоположении до истечения срока действия live_period.
   * @see {@link https://core.telegram.org/bots/api#stopmessagelivelocation Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id требуется, если inline_message_id не указан. Уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате @channelusername).
   * @property {number} [options.message_id] требуется, если inline_message_id не указан. Идентификатор сообщения для редактирования.
   * @property {string} [options.inline_message_id] требуется, если chat_id и message_id не указаны. Идентификатор встроенного сообщения.
   * @property {InlineKeyboardMarkup} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @returns {Message|boolean} В случае успеха, если сообщение не является встроенным сообщением, возвращается отредактированное сообщение, иначе True.
   */
  stopMessageLiveLocation(
    chat_id,
    message_id,
    inline_message_id,
    reply_markup = ""
  ) {
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
   * Метод, для отправки информации о месте проведения.
   * @see {@link https://core.telegram.org/bots/api#sendvenue Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {number} options.latitude широта места проведения.
   * @property {number} options.longitude долгота места проведения.
   * @property {string} options.title название места.
   * @property {string} options.address адрес места проведения.
   * @property {string} [options.foursquare_id] идентификатор Foursquare места проведения.
   * @property {string} [options.foursquare_type] тип площадки Foursquare, если известен.
   * (Например, «искусство_развлечения/по умолчанию», «искусство_развлечения/аквариум» или «еда/мороженое».).
   * @property {string} [options.google_place_id] идентификатор места проведения в Google Places.
   * @property {string} [options.google_place_type] тип заведения в Google Places.
   * @see {@link https://developers.google.com/maps/documentation/places/web-service/supported_types Типы}
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  sendVenue(
    chat_id,
    message_thread_id = "",
    latitude,
    longitude,
    title,
    address,
    foursquare_id = "",
    foursquare_type = "",
    google_place_id = "",
    google_place_type = "",
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
    reply_markup = ""
  ) {
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
   * Метод, для отправки телефонных контактов.
   * @see {@link https://core.telegram.org/bots/api#sendcontact Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {string} options.phone_number телефон контакта.
   * @property {string} options.first_name имя контакта.
   * @property {string} [options.last_name] фамилия контакта.
   * @property {string} [options.vcard] дополнительные данные о контакте в виде vCard, 0-2048 байт.
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  sendContact(
    chat_id,
    message_thread_id = "",
    phone_number,
    first_name,
    last_name = "",
    vcard = "",
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
    reply_markup = ""
  ) {
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
   * Метод, для отправики анимированный эмодзи, который будет отображать случайное значение.
   * @see {@link https://core.telegram.org/bots/api#senddice Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {string} [options.emoji] эмодзи, на котором основана анимация броска костей.
   * В настоящее время должен быть одним из «🎲», «🎯», «🏀», «⚽», «🎳» или «🎰». Кости могут иметь значения от 1 до 6 для «🎲», «🎯» и «🎳», значения от 1 до 5 для «🏀» и «⚽» и значения от 1 до 64 для «🎰». По умолчанию «🎲».
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  sendDice(
    chat_id,
    message_thread_id = "",
    emoji,
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
    reply_markup = ""
  ) {
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
   * Метод, для отправки отправки собственного опроса.
   * @see {@link https://core.telegram.org/bots/api#sendpoll Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {string} options.question вопрос-опрос, 1-300 символов.
   * @property {string[]} options.options JSON-сериализованный список вариантов ответа, от 2 до 10 строк по 1-100 символов каждая.
   * @property {boolean} [options.is_anonymous] True, если опрос должен быть анонимным, по умолчанию True.
   * @property {string} [options.type] тип опроса, «викторина» или «обычный» (“quiz” или “regular”), по умолчанию «обычный».
   * @property {boolean} [options.allows_multiple_answers] True, если опрос допускает несколько ответов, игнорируется для опросов в режиме викторины, по умолчанию False.
   * @property {number} [options.correct_option_id] отсчитываемый от 0 идентификатор правильного варианта ответа, необходимый для опросов в режиме викторины.
   * @property {string} [options.explanation] текст, который отображается, когда пользователь выбирает неправильный ответ или нажимает на значок лампы в опросе в стиле викторины, 0–200 символов с не более чем двумя переводами строки после разбора сущностей.
   * @property {string} [options.explanation_parse_mode] режим разбора сущностей в новой подписи "HTML" | "MarkdownV2".
   * @property {MessageEntity[]} [options.explanation_entities] JSON список специальных сущностей, которые появляются в объяснении опроса, которые можно указать вместо parse_mode.
   * @property {number} [options.open_period] время в секундах, в течение которого опрос будет активен после создания, 5-600. Нельзя использовать вместе с close_date.
   * @property {number} [options.close_date] момент времени (временная метка Unix), когда опрос будет автоматически закрыт. Должно быть не менее 5 и не более 600 секунд в будущем. Нельзя использовать вместе с open_period.
   * @property {boolean} [options.is_closed] True, если опрос нужно немедленно закрыть. Это может быть полезно для предварительного просмотра опроса.
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  sendPoll({
    chat_id = "",
    message_thread_id = "",
    question = "",
    options = "",
    is_anonymous = true,
    type = "regular",
    allows_multiple_answers = false,
    correct_option_id = "0",
    explanation = "",
    explanation_parse_mode = "HTML",
    explanation_entities = "",
    open_periode = "",
    close_date = "",
    is_closed = false,
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
    reply_markup = "",
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
      explanation_parse_mode: String(explanation_parse_mode),
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
   * Метод, для остановки опроса, отправленный ботом.
   * @see {@link https://core.telegram.org/bots/api#stoppoll Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {string} options.message_id идентификатор исходного сообщения с опросом.
   * @property {InlineKeyboardMarkup} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @returns {Poll} В случае успеха возвращается остановленный опрос.
   */
  stopPoll({ chat_id, message_id, reply_markup = "" }) {
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
   * Метод, для отправки ответов на запросы обратного вызова, отправленные со встроенной клавиатуры.
   * Ответ будет отображаться пользователю в виде уведомления в верхней части экрана чата или в виде предупреждения.
   * @see {@link https://core.telegram.org/bots/api#answercallbackquery Telegram API}
   * @param {string} callback_query_id уникальный идентификатор запроса, на который нужно ответить.
   * @param {string} [text] текст уведомления. Если не указано, пользователю ничего не будет показано, 0-200 символов.
   * @param {boolean} [show_alert] True, оповещение вместо уведомления в верхней части экрана чата. По умолчанию false.
   * @param {string} [url] URL-адрес, который будет открыт клиентом пользователя. Если вы создали игру и приняли условия через @Botfather, укажите URL-адрес, который открывает вашу игру — обратите внимание, что это будет работать, только если запрос исходит от кнопки callback_game.
   * @param {number} [cache_time] max время в секундах, в течение которого результат запроса обратного вызова может кэшироваться на стороне клиента.
   * @returns {boolean} возвращает True в случае успеха.
   */
  answerCallbackQuery(
    callback_query_id,
    text = "",
    show_alert = false,
    url = "",
    cache_time = ""
  ) {
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
   * Метод, для отправки ответов на встроенный запрос.
   * Допускается не более 50 результатов на запрос.
   * @see {@link https://core.telegram.org/bots/api#answerinlinequery Telegram API}
   * @type {object} options параметры запроса.
   * @property {string} options.inline_query_id уникальный идентификатор ответа на запрос.
   * @property {InlineQueryResult[]} options.results сериализованный в формате JSON массив результатов для встроенного запроса.
   * @property {number} [options.cache_time] max время в секундах, в течение которого результат встроенного запроса может кэшироваться на сервере. По умолчанию 300.
   * @property {boolean} [options.is_personal] True, если результаты могут кэшироваться на стороне сервера только для пользователя, отправившего запрос. По умолчанию результаты могут быть возвращены любому пользователю, отправившему тот же запрос.
   * @property {string} [options.next_offset] смещение, которое клиент должен отправить в следующем запросе с тем же текстом, чтобы получить больше результатов. Передайте пустую строку, если результатов больше нет или если вы не поддерживаете нумерацию страниц. Длина смещения не может превышать 64 байта.
   * @property {string} [options.switch_pm_text] если передано, клиенты будут отображать кнопку с указанным текстом, которая переключает пользователя в приватный чат с ботом и отправляет боту стартовое сообщение с параметром switch_pm_parameter.
   * @property {string} [options.switch_pm_parameter] параметр глубокой ссылки для сообщения /start, отправляемого боту, когда пользователь нажимает кнопку переключения. 1-64 символа, разрешены только A-Z, a-z, 0-9, _ и -.
   * Пример. Встроенный бот, который отправляет видео на YouTube, может попросить пользователя подключить бота к своей учетной записи YouTube, чтобы соответствующим образом адаптировать результаты поиска.
   * Для этого он отображает кнопку «Подключить свою учетную запись YouTube» над результатами или даже до их отображения. Пользователь нажимает кнопку, переключается на приватный чат с ботом и при этом передает начальный параметр, который указывает боту вернуть ссылку OAuth.
   * После этого бот может предложить кнопку switch_inline, чтобы пользователь мог легко вернуться в чат, где он хотел использовать встроенные возможности бота.
   * @returns {boolean} В случае успеха возвращается True.
   */
  answerInlineQuery({
    inline_query_id,
    results,
    cache_time = "",
    is_personal = true,
    next_offset = "",
    switch_pm_text = "",
    switch_pm_parameter = "",
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
      switch_pm_text: switch_pm_text ? String(switch_pm_text) : null,
      switch_pm_parameter: switch_pm_parameter
        ? String(switch_pm_parameter)
        : null,
    };

    return this.request(Methods.ANSWER_INLINE_QUERY, query);
  }

  /**
   * Метод, чтобы установить результат взаимодействия с веб-приложением и отправить
   * соответствующее сообщение от имени пользователя в чат, из которого исходит запрос.
   * @see {@link https://core.telegram.org/bots/api#answerwebappquery Telegram API}
   * @type {object} options параметры запроса.
   * @property {string} options.web_app_query_id идентификатор запроса, на который нужно ответить.
   * @property {InlineQueryResult[]} options.results cериализованный объект JSON, описывающий отправляемое сообщение.
   * @returns {SentWebAppMessage} В случае успеха возвращается объект SentWebAppMessage.
   */
  answerWebAppQuery({ web_app_query_id, results }) {
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
      results: JSON.stringify(results),
    };

    return this.request(Methods.ANSWER_WEB_APP_QUERY, query);
  }

  // Stickers

  /**
   * Метод, отправки статических стикеров .WEBP, анимированных .TGS или видео .WEBM.
   * @see {@link https://core.telegram.org/bots/api#sendsticker Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {(InputFile|string)} options.sticker наклейка для отправки.
   * Передайте file_id в виде строки, чтобы отправить файл, существующий на серверах Telegram (рекомендуется).
   * Передайте URL-адрес HTTP в виде строки, чтобы Telegram мог получить файл .WEBP из Интернета, или загрузите новый, используя multipart/form-data.
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @property {string} [options.contentType] "multipart/form-data", по умолчанию "application/json".
   * @returns {Message} В случае успеха возвращается Message отправленное сообщение.
   */
  sendSticker({
    chat_id,
    message_thread_id = "",
    sticker,
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
    reply_markup = "",
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
   * Метод, для получения набора наклеек по названию набора.
   * @see {@link https://core.telegram.org/bots/api#getstickerset Telegram API}
   * @param {string} name название набора наклеек.
   * @returns {StickerSet} В случае успеха возвращается объект StickerSet.
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
   * Метод для отправки счетов.
   * @see {@link https://core.telegram.org/bots/api#sendinvoice Telegram API}
   * @type {object} options параметры запроса.
   * @property {(string|number)} options.chat_id уникальный идентификатор целевого чата или имя пользователя целевой супергруппы или канала (в формате \@channelusername).
   * @property {number} [options.message_thread_id] уникальный идентификатор целевой ветки сообщений (темы) форума. Только для супергрупп форума.
   * @property {string} options.title
   * @property {string} options.description
   * @property {string} options.payload
   * @property {string} options.provider_token
   * @property {string} options.currency
   * @property {number} options.max_tip_amount
   * @property {number[]} options.suggested_tip_amounts
   * @property {string} options.start_parameter
   * @property {string} options.provider_data
   * @property {string} options.photo_url
   * @property {number} options.photo_size
   * @property {number} options.photo_width
   * @property {number} options.photo_height
   * @property {boolean} options.need_name
   * @property {boolean} options.need_phone_number
   * @property {boolean} options.need_email
   * @property {boolean} options.need_shipping_address
   * @property {boolean} options.send_phone_number_to_provider
   * @property {boolean} options.send_email_to_provider
   * @property {boolean} options.is_flexible
   * @property {boolean} [options.disable_notification] True, пользователи получат уведомление без звука.
   * @property {boolean} [options.protect_content] защищает содержимое отправленного сообщения от пересылки и сохранения.
   * @property {number} [options.reply_to_message_id] если сообщение является ответом, ID исходного сообщения.
   * @property {boolean} [options.allow_sending_without_reply] True, если сообщение должно быть отправлено, даже если указанное сообщение с ответом не найдено.
   * @property {(InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply)} [options.reply_markup] объект JSON для новой встроенной клавиатуры.
   * @returns {Message} В случае успеха возвращается отправленное сообщение.
   */
  sendInvoice({
    chat_id,
    message_thread_id = "",
    title,
    description,
    payload,
    provider_token,
    currency,
    prices,
    max_tip_amount = "",
    suggested_tip_amounts = "",
    start_parameter = "",
    provider_data = "",
    photo_url = "",
    photo_size = "",
    photo_width = "",
    photo_height = "",
    need_name = false,
    need_phone_number = false,
    need_email = false,
    need_shipping_address = false,
    send_phone_number_to_provider = false,
    send_email_to_provider = false,
    is_flexible = false,
    disable_notification = false,
    protect_content = false,
    reply_to_message_id = "",
    allow_sending_without_reply = false,
    reply_markup = "",
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
   * Метод, для ответа на запросы о доставке.
   * Если вы отправили счет-фактуру с запросом адреса доставки и был указан параметр is_flexible,
   * Bot API отправит боту обновление с полем shipping_query.
   * @see {@link https://core.telegram.org/bots/api#answershippingquery Telegram API}
   * @type {object} options параметры запроса.
   * @property {string} options.shipping_query_id уникальный идентификатор запроса, на который нужно ответить.
   * @property {boolean} options.ok True, если доставка по указанному адресу возможна и False,
   * если есть какие-либо проблемы (например, если доставка по указанному адресу невозможна). По умолчанию True.
   * @property {ShippingOption[]} [options.shipping_options] Требуется, если ok равно True.
   * Сериализованный в формате JSON массив доступных вариантов доставки.
   * @property {string} [options.error_message] Требуется, если ok имеет значение False.
   * Сообщение об ошибке в удобочитаемой форме, объясняющее, почему невозможно выполнить заказ (например, «Извините, доставка по указанному вами адресу недоступна»). Telegram отобразит это сообщение пользователю.
   * @returns {boolean} В случае успеха возвращается True.
   */
  answerShippingQuery({
    shipping_query_id,
    ok = true,
    shipping_options = "",
    error_message = "",
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
   * Метод, для ответа запросы перед оформлением заказа.
   * Как только пользователь подтвердит свои данные об оплате и доставке,
   * Bot API отправляет окончательное подтверждение в виде обновления с полем pre_checkout_query.
   * Примечание. Bot API должен получить ответ в течение 10 секунд после отправки запроса на предварительную проверку.
   * @see {@link https://core.telegram.org/bots/api#answerprecheckoutquery Telegram API}
   * @type {object} options параметры запроса.
   * @property {string} options.pre_checkout_query_id уникальный идентификатор запроса, на который нужно ответить.
   * @property {boolean} options.ok True, если все в порядке (товар есть в наличии и т.д.) и бот готов приступить к оформлению заказа.
   * Используйте False, если есть какие-либо проблемы. По умолчанию True.
   * @property {string} [options.error_message] Требуется, если ok имеет значение False.
   * Сообщение об ошибке в удобочитаемой форме, объясняющее причину невозможности продолжить оформление заказа (например, «Извините, кто-то только что купил последнюю из наших потрясающих черных футболок, пока вы заполняли платежные реквизиты. Пожалуйста, выберите другой цвет или одежда!»). Telegram отобразит это сообщение пользователю.
   * @returns {boolean} В случае успеха возвращается True.
   */
  answerPreCheckoutQuery({
    pre_checkout_query_id,
    ok = true,
    error_message = "",
  }) {
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
   * Метод, для получения основной информации о файле и подготовки его к загрузке.
   * На данный момент боты могут загружать файлы размером до 20 МБ.
   * Файл можно скачать https://api.telegram.org/file/bot<token>/<file_path>, где <file_path> берется из ответа.
   * Гарантируется, что ссылка будет действительна не менее 1 часа.
   * Когда срок действия ссылки истекает, можно запросить новую, снова вызвав getFile.
   * @see {@link https://core.telegram.org/bots/api#getfile Telegram API}
   * @param {string} file_id идентификатор файла для получения информации.
   * @returns {Bot.File} В случае успеха возвращается объект File.
   */
  getFile(file_id) {
    if (!file_id)
      helper.miss_parameter(
        "file_id идентификатор файла для получения информации."
      );
    return `${this.__fileUrl}${
      JSON.parse(
        UrlFetchApp.fetch(
          `${this.__telegramUrl}${Methods.GET_FILE}?file_id=${file_id}`
        ).getContentText()
      ).result.file_path
    }`;
  }

  // Не официальные методы API

  /**
   * Метод, для получения пути к файлу.
   * @param {string} file_id идентификатор файла для получения информации.
   * @returns {string} В случае успеха возвращается file_path.
   */
  getPath(file_id) {
    if (!file_id)
      helper.miss_parameter(
        "file_id идентификатор файла для получения информации."
      );

    return JSON.parse(
      UrlFetchApp.fetch(
        `${this.__telegramUrl}${Methods.GET_FILE}?file_id=${file_id}`
      ).getContentText()
    ).result.file_path;
  }

  /**
   * Метод, для получения ссылки на скачивание файла.
   * @param {string} path путь до папки.
   * @returns {string} В случае успеха возвращается url.
   */
  getFileDownloadUrl(path) {
    if (!path) helper.miss_parameter("path путь до папки.");
    return `${this.__fileUrl}${path}`;
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
    message_thread_id = "",
    text,
    parse_mode = "HTML",
    entities = "",
    disable_web_page_preview = false,
    disable_notification = false,
    protect_content = false,
    allow_sending_without_reply = false,
    reply_markup = "",
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
      parse_mode: String(parse_mode),
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
    message_thread_id = "",
    text,
    parse_mode = "HTML",
    entities = "",
    disable_web_page_preview = false,
    disable_notification = false,
    protect_content = false,
    allow_sending_without_reply = false,
    reply_markup = "",
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
      parse_mode: String(parse_mode),
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
 * Вызывает методы для работы с
 * {@link https://openapi.wb.ru/content.html Telegram API}
 * @param {string} botToken токен Telegram бота от \@BotFather.
 * @param {string} [webAppUrl] ссылка на WebApp Google, для работы с ответами doGet(e).
 * @param {boolean} [logRequest] показывать строку URL, OPTIONS запроса при выполнении, по умочанию false.
 * @returns {TGbot|ValidationError} экземпляр class TGbot, если пропущен botToken или не валиден
 */
function bot(botToken, webAppUrl, logRequest) {
  if (checkToken(botToken))
    return new TGbot({
      botToken: botToken,
      webAppUrl: webAppUrl,
      logRequest: logRequest,
    });
}
