/**
 * Checks if the given message has the property "contact".
 *
 * @param {Object} message - The message to check.
 * @return {boolean} Returns true if the message has the property "contact", otherwise returns false.
 */
function isAuthorizationMessage(message) {
  return message.hasOwnProperty("contact");
}

/**
 * Checks if the message sender is an admin.
 *
 * @param {any} message - The message object.
 * @return {boolean} Returns true if the sender is an admin, otherwise false.
 */
function isAdminMessage(message) {
  return idAdmin.includes(message.from.id);
}

/**
 * Checks if the given message has the specified type.
 *
 * @param {any} message - The message to check.
 * @param {string} type - The type to check for.
 * @return {boolean} Returns true if the message has the specified type, otherwise false.
 */
function isMessageType(message, type) {
  return message.hasOwnProperty(type);
}

/**
 * Checks if the given message is a text message.
 *
 * @param {Object} message - The message to check.
 * @return {boolean} True if the message is a text message, false otherwise.
 */
function isTextMessage(message) {
  return message.hasOwnProperty("text");
}

/**
 * Checks if the given message is a photo message.
 *
 * @param {Object} message - The message to check.
 * @return {boolean} - Returns true if the message is a photo message, otherwise returns false.
 */
function isPhotoMessage(message) {
  return (
    message.hasOwnProperty("photo") ||
    (message?.document?.mime_type?.startsWith("image/") ?? false)
  );
}

/**
 * Checks if a message is a video message.
 *
 * @param {Object} message - The message to be checked.
 * @return {boolean} True if the message has a "video" property, false otherwise.
 */
function isVideoMessage(message) {
  return message.hasOwnProperty("video");
}

/**
 * Checks if the given message is a document message.
 *
 * @param {Object} message - The message object to check.
 * @return {boolean} Returns true if the message is a document message, false otherwise.
 */
function isDocumentMessage(message) {
  return (
    message.hasOwnProperty("document") &&
    message.document?.mime_type?.split("/")[0] !== "image"
  );
}

/**
 * Check if the given message is a bot command message.
 *
 * @param {Object} message - The message object to be checked.
 * @return {boolean} Returns true if the message is a bot command message, false otherwise.
 */
function isBotCommandMessage(message) {
  return Boolean(
    message?.entities?.[0]?.type === "bot_command" && /^\//.exec(message?.text)
  );
}

/**
 * Checks if a message is a bot message based on its contents.
 *
 * @param {Object} contents - The contents of the message.
 * @return {boolean} True if the message is from a bot, false otherwise.
 */
function isBotMessageByContents(contents) {
  const message = contents.message || contents.callback_query.message;
  return message.from.is_bot === true;
}

/**
 * Determines if a message is from a bot.
 *
 * @param {Object} message - The message object.
 * @return {boolean} True if the message is from a bot, false otherwise.
 */
function isBotMessageByMessage(message) {
  return message.from.is_bot === true;
}

/**
 * Determines whether the given contents object represents a channel message.
 *
 * @param {object} contents - The contents object to check.
 * @return {boolean} Returns true if the contents object represents a channel message, false otherwise.
 */
function isChannelMessage(contents) {
  if (
    contents.hasOwnProperty("channel_post") ||
    contents.hasOwnProperty("edited_channel_post")
  )
    return true;
  return false;
}

/**
 * Checks if the given message is a media group.
 *
 * @param {Object} message - The message to be checked.
 * @return {boolean} Returns true if the message is a media group, false otherwise.
 */
function isMediaGroup(message) {
  return message.hasOwnProperty("media_group_id");
}

/**
 * Checks if the given object has a property called "poll".
 *
 * @param {Object} contents - The object to check.
 * @return {boolean} Returns true if the object has a property called "poll", false otherwise.
 */
function isPoll(contents) {
  return "poll" in contents;
}

/**
 * Extracts the text from a message object.
 *
 * @param {object} message - The message object.
 * @returns {string|null} The text from the message object, or null if there is no text.
 */
function extractTextFromMessage(message) {
  return message?.text;
}

function isNoValide(message) {
  if (
    /([A-Za-zА-Яа-я]+[0-9]+|[0-9]+[A-Za-zА-Яа-я]+|^\d{3,}|[A-Za-zА-Яа-я])/gm.test(
      String(message.text.replace(/\s+/g, "").replaceAll(/\/|,/g, ".").trim())
    )
  )
    return true;
  else return false;
}

function isValideDate(message) {
  if (
    !!/^\d{2}\.\d{2}\.\d{4}$/g.exec(
      String(message.text.replace(/\s+/g, "").replaceAll(/\/|,/g, ".").trim())
    )
  )
    return true;
  else return false;
}

function isBadWord(message) {
  const text = message?.text
    ? message.text
    : message?.caption
    ? message.caption
    : null;
  if (text) {
    const words = text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
      .split(" ")
      .filter((e) => e);
    for (const word of words)
      if (badWordsArray.includes(word)) return true;
      else return false;
  } else return false;
}

function replaceBadWords(message) {
  const replacer = (word) => {
    for (let i = 0; i < badWordsArray.length; i++) {
      const badWord = badWordsArray[i];
      if (word.includes(badWord)) {
        return replacer(word.replace(badWord, "*".repeat(badWord.length)));
      }
    }
    return word;
  };

  const text = message?.text
    ? message.text
    : message?.caption
    ? message.caption
    : null;
  if (text) {
    return text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
      .split(" ")
      .filter((e) => e)
      .map(replacer)
      .join(" ");
  } else return false;
}

const badWordsArray = [
  "6ля",
  "6лядь",
  "6лять",
  "архипиздрит",
  "ахуел",
  "ахуеть",
  "бздение",
  "бздеть",
  "бздех",
  "бздецы",
  "бздит",
  "бздицы",
  "бздло",
  "бзднуть",
  "бздун",
  "бздунья",
  "бздюх",
  "бздюха",
  "бздюшка",
  "бздюшко",
  "блудилище",
  "бля",
  "блябу",
  "блябуду",
  "бляд",
  "бляди",
  "блядина",
  "блядище",
  "блядки",
  "блядовать",
  "блядство",
  "блядун",
  "блядуны",
  "блядунья",
  "блядь",
  "блядюга",
  "блять",
  "вафел",
  "вафлёр",
  "взъебка",
  "взьебка",
  "взьебывать",
  "въеб",
  "въебался",
  "въебенн",
  "въебусь",
  "въебывать",
  "выблядок",
  "выблядыш",
  "выеб",
  "выебать",
  "выебен",
  "выебнулся",
  "выебон",
  "выебываться",
  "выпердеть",
  "высраться",
  "выссаться",
  "вьебен",
  "гавно",
  "гавнюк",
  "гавнючка",
  "гамно",
  "гандон",
  "глиномес",
  "гнид",
  "гнида",
  "гнидазавр",
  "гниданидзе",
  "гнидас",
  "гниды",
  "говенка",
  "говенный",
  "говешка",
  "говна пирога",
  "говназия",
  "говнецо",
  "говнище",
  "говно",
  "говноед",
  "говнолинк",
  "говномес",
  "говночист",
  "говнюк",
  "говнюха",
  "говнядина",
  "говняк",
  "говняный",
  "говнять",
  "говяга",
  "гондольер",
  "гондон",
  "даун",
  "даунитто",
  "дебил",
  "дебилоид",
  "дерьмак",
  "дерьмище",
  "дерьмо",
  "дерьмодемон",
  "доебываться",
  "долбоеб",
  "долбоёб",
  "долбоящер",
  "драчун",
  "дрисня",
  "дрист",
  "дристануть",
  "дристать",
  "дристун",
  "дристуха",
  "дрочелло",
  "дрочена",
  "дрочила",
  "дрочилка",
  "дрочистый",
  "дрочить",
  "дрочка",
  "дрочун",
  "дружки педигрипал",
  "дцпшник",
  "е6ал",
  "е6ут",
  "еб твою мать",
  "ёб твою мать",
  "ебал",
  "ебало",
  "ебальник",
  "ебан",
  "ебанамать",
  "ебанат",
  "ебаная",
  "ёбаная",
  "ебанический",
  "ебанный",
  "ебанныйврот",
  "ебаное",
  "ебануть",
  "ебануться",
  "ёбаную",
  "ебаный",
  "ебанько",
  "ебарь",
  "ебат",
  "ёбат",
  "ебатория",
  "ебать",
  "ебать-копать",
  "ебаться",
  "ебашить",
  "ебёна",
  "ебет",
  "ебёт",
  "ебец",
  "ебик",
  "ебин",
  "ебись",
  "ебическая",
  "ебки",
  "ебла",
  "еблан",
  "ебливый",
  "еблище",
  "ебло",
  "еблыст",
  "ебля",
  "ёбн",
  "ебнуть",
  "ебнуться",
  "ебня",
  "ебошить",
  "ебская",
  "ебский",
  "ебтвоюмать",
  "ебун",
  "ебут",
  "ебуч",
  "ебуче",
  "ебучее",
  "ебучий",
  "ебучим",
  "ебущ",
  "ебырь",
  "ёбaн",
  "ебaть",
  "ебyч",
  "елда",
  "елдак",
  "елдаклык",
  "елдачить",
  "елдище",
  "жопа",
  "жопошник",
  "жопу",
  "заговнять",
  "задрачивать",
  "задристать",
  "задрот",
  "задрота",
  "зае6",
  "заё6",
  "заеб",
  "заёб",
  "заеба",
  "заебал",
  "заебанец",
  "заебастая",
  "заебастый",
  "заебать",
  "заебаться",
  "заебашить",
  "заебистое",
  "заёбистое",
  "заебистые",
  "заёбистые",
  "заебистый",
  "заёбистый",
  "заебись",
  "заебошить",
  "заебываться",
  "залуп",
  "залупа",
  "залупаться",
  "залупинец",
  "залупить",
  "залупиться",
  "замудохаться",
  "запиздячить",
  "засерать",
  "засерун",
  "засеря",
  "засирать",
  "засранец",
  "засрать",
  "засрун",
  "захуячить",
  "защеканец",
  "заябестая",
  "злоеб",
  "злоебучая",
  "злоебучее",
  "злоебучий",
  "ибанамат",
  "ибонех",
  "идиот",
  "изговнять",
  "изговняться",
  "изосрать",
  "изъебнуться",
  "ипать",
  "ипаться",
  "ипаццо",
  "Какдвапальцаобоссать",
  "конча",
  "кретин",
  "кретиноид",
  "курва",
  "курвырь",
  "курвятник",
  "лезбуха",
  "лох",
  "лошара",
  "лошары",
  "лошарa",
  "лошок",
  "лярва",
  "малафья",
  "манда",
  "мандавошек",
  "мандавошка",
  "мандавошки",
  "мандей",
  "мандень",
  "мандеть",
  "мандища",
  "мандой",
  "манду",
  "мандюк",
  "минет",
  "минетчик",
  "минетчица",
  "млять",
  "мокрощелка",
  "мокрощёлка",
  "мразь",
  "мудаг",
  "мудак",
  "мудасраная дерьмопроелдина",
  "мудацкая",
  "муде",
  "мудель",
  "мудень",
  "мудеть",
  "муди",
  "мудил",
  "мудила",
  "мудистый",
  "мудня",
  "мудоеб",
  "мудозвон",
  "мудоклюй",
  "мудaк",
  "мудak",
  "мусор",
  "на хер",
  "на хуй",
  "набздел",
  "набздеть",
  "наговнять",
  "надристать",
  "надрочить",
  "наебать",
  "наебет",
  "наебнуть",
  "наебнуться",
  "наебывать",
  "напиздел",
  "напиздели",
  "напиздело",
  "напиздили",
  "насрать",
  "настопиздить",
  "нахер",
  "нахрен",
  "нахуй",
  "нахуйник",
  "не ебет",
  "не ебёт",
  "невротебучий",
  "невъебенно",
  "нехира",
  "нехрен",
  "Нехуй",
  "нехуйственно",
  "ниибацо",
  "ниипацца",
  "ниипаццо",
  "ниипет",
  "никуя",
  "нихера",
  "нихуя",
  "обдристаться",
  "обосранец",
  "обосрать",
  "обосцать",
  "обосцаться",
  "обсирать",
  "объебос",
  "обьебать обьебос",
  "однохуйственно",
  "опездал",
  "опизде",
  "опизденивающе",
  "остоебенить",
  "остопиздеть",
  "отмудохать",
  "отпиздить",
  "отпиздячить",
  "отпороть",
  "отъебись",
  "охереть",
  "охуевательский",
  "охуевать",
  "охуевающий",
  "охуел",
  "охуенно",
  "охуеньчик",
  "охуеть",
  "охуительно",
  "охуительный",
  "охуяньчик",
  "охуячивать",
  "охуячить",
  "очкун",
  "падла",
  "падонки",
  "падонок",
  "паскуда",
  "педерас",
  "педерастер",
  "педик",
  "педобратва",
  "педрик",
  "педрила",
  "педрилло",
  "педрило",
  "педрилы",
  "пездень",
  "пездит",
  "пездишь",
  "пездо",
  "пездят",
  "пердануть",
  "пердеж",
  "пердельник",
  "пердение",
  "пердеть",
  "пердильник",
  "перднуть",
  "пёрднуть",
  "пердун",
  "пердунец",
  "пердунина",
  "пердунья",
  "пердуха",
  "пердь",
  "переёбок",
  "пернуть",
  "пёрнуть",
  "пи3д",
  "пи3де",
  "пи3ду",
  "пидар",
  "пидарас",
  "пидарасы",
  "пидары",
  "пидарaс",
  "пидор",
  "пидорасина",
  "пидорасы",
  "пидорка",
  "пидорок",
  "пидорормитна",
  "пидоры",
  "пидорюга",
  "пидрас",
  "пизда",
  "пиздануть",
  "пиздануться",
  "пиздарваньчик",
  "пиздато",
  "пиздатое",
  "пиздатый",
  "пизденка",
  "пизденыш",
  "пиздёныш",
  "пиздеть",
  "пиздец",
  "пиздит",
  "пиздить",
  "пиздиться",
  "пиздишь",
  "пиздища",
  "пиздище",
  "пиздобол",
  "пиздоболы",
  "пиздобратия",
  "пиздоватая",
  "пиздоватый",
  "пиздолиз",
  "пиздонутые",
  "пиздорванец",
  "пиздорванка",
  "пиздострадатель",
  "пизду",
  "пиздуй",
  "пиздун",
  "пиздунья",
  "пизды",
  "пиздюга",
  "пиздюк",
  "пиздюлина",
  "пиздюля",
  "пиздят",
  "пиздячить",
  "писбшки",
  "писька",
  "писькострадатель",
  "писюн",
  "писюшка",
  "пиzдец",
  "по хуй",
  "по хую",
  "подговнять",
  "подонки",
  "подонок",
  "подъебнуть",
  "подъебнуться",
  "поебать",
  "поебень",
  "поёбываает",
  "поскуда",
  "посрать",
  "потаскуха",
  "потаскушка",
  "похер",
  "похерил",
  "похерила",
  "похерили",
  "похеру",
  "похрен",
  "похрену",
  "похуист",
  "похуистка",
  "похуй",
  "похую",
  "пошел на хер",
  "придурок",
  "приебаться",
  "припиздень",
  "припизднутый",
  "припиздюлина",
  "пробзделся",
  "проблядь",
  "проеб",
  "проебанка",
  "проебать",
  "промандеть",
  "промудеть",
  "пропизделся",
  "пропиздеть",
  "пропиздячить",
  "раздолбай",
  "разхуячить",
  "разъеб",
  "разъеба",
  "разъебай",
  "разъебать",
  "распиздай",
  "распиздеться",
  "распиздяй",
  "распиздяйство",
  "распроеть",
  "сволота",
  "сволочь",
  "сговнять",
  "секель",
  "серун",
  "серька",
  "сестроеб",
  "сикель",
  "сила",
  "сирать",
  "сирывать",
  "соси",
  "спермер",
  "спермобак",
  "спермодун",
  "спидозный пес",
  "спидораковый",
  "спиздел",
  "спиздеть",
  "спиздил",
  "спиздила",
  "спиздили",
  "спиздит",
  "спиздить",
  "срака",
  "сракаборец",
  "сракалюб",
  "сраку",
  "сраный",
  "сранье",
  "срать",
  "срун",
  "ссака",
  "ссаная псина",
  "ссышь",
  "стерва",
  "страхопиздище",
  "сука",
  "суки",
  "суходрочер",
  "суходрочка",
  "сучара",
  "сучий",
  "сучище",
  "сучка",
  "сучко",
  "сучонок",
  "сучье",
  "сцание",
  "сцать",
  "сцука",
  "сцуки",
  "сцуконах",
  "сцуль",
  "сцыха",
  "сцышь",
  "съебаться",
  "сыкун",
  "титьки",
  "трахае6",
  "трахаеб",
  "трахаёб",
  "трахатель",
  "трипер",
  "ублюдок",
  "уебать",
  "уёбища",
  "уебище",
  "уёбище",
  "уебищное",
  "уёбищное",
  "уебк",
  "уебки",
  "уёбки",
  "уебок",
  "уёбок",
  "урюк",
  "усраться",
  "ушлепок",
  "х_у_я_р_а",
  "хамло",
  "хер",
  "херня",
  "херовато",
  "херовина",
  "херовый",
  "хероед",
  "хитровыебанный",
  "хитрожопый",
  "хрен моржовый",
  "хуе",
  "хуё",
  "хуевато",
  "хуёвенький",
  "хуевина",
  "хуево",
  "хуевый",
  "хуёвый",
  "хуек",
  "хуёк",
  "хуел",
  "хуем",
  "хуенч",
  "хуеныш",
  "хуенький",
  "хуеплет",
  "хуеплёт",
  "хуепромышленник",
  "хуерик",
  "хуерыло",
  "хуесос",
  "хуесоска",
  "хуета",
  "хуетень",
  "хуею",
  "хуи",
  "хуище",
  "хуй",
  "хуйком",
  "хуйло",
  "хуйня",
  "хуйрик",
  "хуля",
  "хую",
  "хуюл",
  "хуя",
  "хуяк",
  "хуякать",
  "хуякнуть",
  "хуяра",
  "хуясе",
  "хуячить",
  "хуeм",
  "хyё",
  "хyй",
  "хyйня",
  "целка",
  "чмо",
  "чмошник",
  "чмырь",
  "шалава",
  "шалавой",
  "шараёбиться",
  "шлюха",
  "шлюхой",
  "шлюшидзе",
  "шлюшка",
  "ябывает",
  "b3ъeб",
  "cock",
  "cunt",
  "e6aль",
  "eбать",
  "eбёт",
  "eблантий",
  "eбaл",
  "eбaть",
  "eбyч",
  "ebal",
  "eblan",
  "fuck",
  "fucker",
  "fucking",
  "xуе",
  "xуй",
  "xую",
  "xyёв",
  "xyй",
  "xyя",
  "zaeb",
  "zaebal",
  "zaebali",
  "zaebat",
  "тварь",
  "мать",
];
