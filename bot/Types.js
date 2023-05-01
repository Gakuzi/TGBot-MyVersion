/**
 * Bot API 6.7
 * April 21, 2023
 * https://core.telegram.org/bots/api#april-21-2023
 */

/**
 * Use this method to receive incoming updates using long polling (wiki). Returns an Array of Update objects.
 * @see {@link https://core.telegram.org/bots/api#getupdates getUpdates}
 * @typedef {object} getUpdates
 * @property {number} [offset] - Identifier of the first update to be returned. Must be greater by one than the highest among the identifiers of previously received updates. By default, updates starting with the earliest unconfirmed update are returned. An update is considered confirmed as soon as getUpdates is called with an offset higher than its update_id. The negative offset can be specified to retrieve updates starting from -offset update from the end of the updates queue. All previous updates will be forgotten.
 * @property {number} [limit] - Limits the number of updates to be retrieved. Values between 1-100 are accepted. Defaults to 100.
 * @property {number} [timeout] - Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive, short polling should be used for testing purposes only.
 * @property {string[]} [allowed_updates] - A JSON-serialized list of the update types you want your bot to receive. For example, specify ["message", "edited_channel_post", "callback_query"] to only receive updates of these types. See Update for a complete list of available update types. Specify an empty list to receive all update types except chat_member (default). If not specified, the previous setting will be used. Please note that this parameter doesn't affect updates created before the call to the getUpdates, so unwanted updates may be received for a short period of time.
 * @returns {Update[]}
 */

/**
 * Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL, containing a JSON-serialized Update. In case of an unsuccessful request, we will give up after a reasonable amount of attempts. Returns True on success.
 * If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter secret_token. If specified, the request will contain a header "X-Telegram-Bot-Api-Secret-Token" with the secret token as content.
 * @see {@link https://core.telegram.org/bots/api#setwebhook setWebhook}
 * @typedef {object} setWebhook
 * @property {string} url - HTTPS URL to send updates to. Use an empty string to remove webhook integration.
 * @property {InputFile} [certificate] - Upload your public key certificate so that the root certificate in use can be checked. See our self-signed guide for details.
 * @property {string} [ip_address] - The fixed IP address which will be used to send webhook requests instead of the IP address resolved through DNS.
 * @property {number} [max_connections] - The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery, 1-100. Defaults to 40. Use lower values to limit the load on your bot's server, and higher values to increase your bot's throughput.
 * @property {string[]} [allowed_updates] - A JSON-serialized list of the update types you want your bot to receive. For example, specify ["message", "edited_channel_post", "callback_query"] to only receive updates of these types. See Update for a complete list of available update types. Specify an empty list to receive all update types except chat_member (default). If not specified, the previous setting will be used. Please note that this parameter doesn't affect updates created before the call to the setWebhook, so unwanted updates may be received for a short period of time.
 * @property {boolean} [drop_pending_updates] - Pass True to drop all pending updates.
 * @property {string} [secret_token] - A secret token to be sent in a header "X-Telegram-Bot-Api-Secret-Token" in every webhook request, 1-256 characters. Only characters A-Z, a-z, 0-9, _ and - are allowed. The header is useful to ensure that the request comes from a webhook set by you.
 * @returns {boolean}
 */

/**
 * Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#deletewebhook deleteWebhook}
 * @typedef {object} deleteWebhook
 * @property {boolean} [drop_pending_updates] - Pass True to drop all pending updates.
 * @returns {boolean}
 */

/**
 * Use this method to send text messages. On success, the sent Message is returned.
 * @see {@link https://core.telegram.org/bots/api#sendmessage sendMessage}
 * @typedef {object} sendMessage
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {string} text - Text of the message to be sent, 1-4096 characters after entities parsing.
 * @property {string} [parse_mode] - Mode for parsing entities in the message text. See formatting options for more details.
 * @property {MessageEntity[]} [entities] - A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode.
 * @property {boolean} [disable_web_page_preview] - Disables link previews for links in this message.
 * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
 * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
 * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
 * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 * @returns {Message}
 */

/**
 * Use this method to forward messages of any kind. Service messages can't be forwarded. On success, the sent Message is returned.
 * @see {@link https://core.telegram.org/bots/api#forwardmessage forwardMessage}
 * @typedef {object} forwardMessage
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {string|number} from_chat_id - Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername).
 * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
 * @property {boolean} [protect_content] - Protects the contents of the forwarded message from forwarding and saving.
 * @property {number} message_id - Message identifier in the chat specified in from_chat_id.
 * @returns {Message}
 */

/**
 * Use this method to copy messages of any kind. Service messages and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success.
 * @see {@link https://core.telegram.org/bots/api#copymessage copyMessage}
 * @typedef {object} copyMessage
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
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
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 * @returns {MessageId}
 */

/**
 * Use this method to send photos. On success, the sent Message is returned.
 * @see {@link https://core.telegram.org/bots/api#sendphoto sendPhoto}
 * @typedef {object} sendPhoto
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {InputFile|string} photo - Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {string} [caption] - Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Mode for parsing entities in the photo caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {boolean} [has_spoiler] - Pass True if the photo needs to be covered with a spoiler animation.
 * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
 * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
 * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
 * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 * @returns {Message}
 */

/**
 * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
 * For sending voice messages, use the sendVoice method instead.
 * @see {@link https://core.telegram.org/bots/api#sendaudio sendAudio}
 * @typedef {object} sendAudio
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
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
 * @returns {Message}
 */

/**
 * Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
 * @see {@link https://core.telegram.org/bots/api#senddocument sendDocument}
 * @typedef {object} sendDocument
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {InputFile|string} document - File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {InputFile|string} [thumbnail] - Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {string} [caption] - Document caption (may also be used when resending documents by file_id), 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Mode for parsing entities in the document caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {boolean} [disable_content_type_detection] - Disables automatic server-side content type detection for files uploaded using multipart/form-data.
 * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
 * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
 * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
 * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 * @returns {Message}
 */

/**
 * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
 * @see {@link https://core.telegram.org/bots/api#sendvideo sendVideo}
 * @typedef {object} sendVideo
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {InputFile|string} video - Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {number} [duration] - Duration of sent video in seconds.
 * @property {number} [width] - Video width.
 * @property {number} [height] - Video height.
 * @property {InputFile|string} [thumbnail] - Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {string} [caption] - Video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Mode for parsing entities in the video caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {boolean} [has_spoiler] - Pass True if the video needs to be covered with a spoiler animation.
 * @property {boolean} [supports_streaming] - Pass True if the uploaded video is suitable for streaming.
 * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
 * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
 * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
 * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 * @returns {Message}
 */

/**
 * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
 * @see {@link https://core.telegram.org/bots/api#sendanimation sendAnimation}
 * @typedef {object} sendAnimation
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {InputFile|string} animation - Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {number} [duration] - Duration of sent animation in seconds.
 * @property {number} [width] - Animation width.
 * @property {number} [height] - Animation height.
 * @property {InputFile|string} [thumbnail] - Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {string} [caption] - Animation caption (may also be used when resending animation by file_id), 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Mode for parsing entities in the animation caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {boolean} [has_spoiler] - Pass True if the animation needs to be covered with a spoiler animation.
 * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
 * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
 * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
 * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 * @returns {Message}
 */

/**
 * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
 * @see {@link https://core.telegram.org/bots/api#sendvoice sendVoice}
 * @typedef {object} sendVoice
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {InputFile|string} voice - Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {string} [caption] - Voice message caption, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Mode for parsing entities in the voice message caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {number} [duration] - Duration of the voice message in seconds.
 * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
 * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
 * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
 * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 * @returns {Message}
 */

/**
 * As of v.4.0, Telegram clients support rounded square MPEG4 videos of up to 1 minute long. Use this method to send video messages. On success, the sent Message is returned.
 * @see {@link https://core.telegram.org/bots/api#sendvideonote sendVideoNote}
 * @typedef {object} sendVideoNote
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {InputFile|string} video_note - Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. More information on Sending Files: https://core.telegram.org/bots/api#sending-files. Sending video notes by a URL is currently unsupported.
 * @property {number} [duration] - Duration of sent video in seconds.
 * @property {number} [length] - Video width and height, i.e. diameter of the video message.
 * @property {InputFile|string} [thumbnail] - Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
 * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
 * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
 * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 * @returns {Message}
 */

/**
 * Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of Messages that were sent is returned.
 * @see {@link https://core.telegram.org/bots/api#sendmediagroup sendMediaGroup}
 * @typedef {object} sendMediaGroup
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {Array.<InputMediaAudio|InputMediaDocument|InputMediaPhoto|InputMediaVideo>} media - A JSON-serialized array describing messages to be sent, must include 2-10 items.
 * @property {boolean} [disable_notification] - Sends messages silently. Users will receive a notification with no sound.
 * @property {boolean} [protect_content] - Protects the contents of the sent messages from forwarding and saving.
 * @property {number} [reply_to_message_id] - If the messages are a reply, ID of the original message.
 * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
 * @returns {Message[]}
 */

/**
 * Use this method to send point on the map. On success, the sent Message is returned.
 * @see {@link https://core.telegram.org/bots/api#sendlocation sendLocation}
 * @typedef {object} sendLocation
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {number} latitude - Latitude of the location.
 * @property {number} longitude - Longitude of the location.
 * @property {number} [horizontal_accuracy] - The radius of uncertainty for the location, measured in meters; 0-1500.
 * @property {number} [live_period] - Period in seconds for which the location will be updated (see Live Locations, should be between 60 and 86400.
 * @property {number} [heading] - For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
 * @property {number} [proximity_alert_radius] - For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified.
 * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
 * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
 * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
 * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 * @returns {Message}
 */

/**
 * Use this method to send information about a venue. On success, the sent Message is returned.
 * @see {@link https://core.telegram.org/bots/api#sendvenue sendVenue}
 * @typedef {object} sendVenue
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {number} latitude - Latitude of the venue.
 * @property {number} longitude - Longitude of the venue.
 * @property {string} title - Name of the venue.
 * @property {string} address - Address of the venue.
 * @property {string} [foursquare_id] - Foursquare identifier of the venue.
 * @property {string} [foursquare_type] - Foursquare type of the venue, if known. (For example, "arts_entertainment/default", "arts_entertainment/aquarium" or "food/icecream".).
 * @property {string} [google_place_id] - Google Places identifier of the venue.
 * @property {string} [google_place_type] - Google Places type of the venue. (See supported types.).
 * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
 * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
 * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
 * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 * @returns {Message}
 */

/**
 * Use this method to send phone contacts. On success, the sent Message is returned.
 * @see {@link https://core.telegram.org/bots/api#sendcontact sendContact}
 * @typedef {object} sendContact
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {string} phone_number - Contact's phone number.
 * @property {string} first_name - Contact's first name.
 * @property {string} [last_name] - Contact's last name.
 * @property {string} [vcard] - Additional data about the contact in the form of a vCard, 0-2048 bytes.
 * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
 * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
 * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
 * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 * @returns {Message}
 */

/**
 * Use this method to send a native poll. On success, the sent Message is returned.
 * @see {@link https://core.telegram.org/bots/api#sendpoll sendPoll}
 * @typedef {object} sendPoll
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {string} question - Poll question, 1-300 characters.
 * @property {string[]} options - A JSON-serialized list of answer options, 2-10 strings 1-100 characters each.
 * @property {boolean} [is_anonymous] - True, if the poll needs to be anonymous, defaults to True.
 * @property {string} [type] - Poll type, "quiz" or "regular", defaults to "regular".
 * @property {boolean} [allows_multiple_answers] - True, if the poll allows multiple answers, ignored for polls in quiz mode, defaults to False.
 * @property {number} [correct_option_id] - 0-based identifier of the correct answer option, required for polls in quiz mode.
 * @property {string} [explanation] - Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds after entities parsing.
 * @property {string} [explanation_parse_mode] - Mode for parsing entities in the explanation. See formatting options for more details.
 * @property {MessageEntity[]} [explanation_entities] - A JSON-serialized list of special entities that appear in the poll explanation, which can be specified instead of parse_mode.
 * @property {number} [open_period] - Amount of time in seconds the poll will be active after creation, 5-600. Can't be used together with close_date.
 * @property {number} [close_date] - Point in time (Unix timestamp) when the poll will be automatically closed. Must be at least 5 and no more than 600 seconds in the future. Can't be used together with open_period.
 * @property {boolean} [is_closed] - Pass True if the poll needs to be immediately closed. This can be useful for poll preview.
 * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
 * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
 * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
 * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 * @returns {Message}
 */

/**
 * Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned.
 * @see {@link https://core.telegram.org/bots/api#senddice sendDice}
 * @typedef {object} sendDice
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {string} [emoji] - Emoji on which the dice throw animation is based. Currently, must be one of "🎲", "🎯", "🏀", "⚽", "🎳", or "🎰". Dice can have values 1-6 for "🎲", "🎯" and "🎳", values 1-5 for "🏀" and "⚽", and values 1-64 for "🎰". Defaults to "🎲".
 * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
 * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding.
 * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
 * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 * @returns {Message}
 */

/**
 * Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.
 * We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive.
 * @see {@link https://core.telegram.org/bots/api#sendchataction sendChatAction}
 * @typedef {object} sendChatAction
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread; supergroups only.
 * @property {string} action - Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_voice or upload_voice for voice notes, upload_document for general files, choose_sticker for stickers, find_location for location data, record_video_note or upload_video_note for video notes.
 * @returns {boolean}
 */

/**
 * Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object.
 * @see {@link https://core.telegram.org/bots/api#getuserprofilephotos getUserProfilePhotos}
 * @typedef {object} getUserProfilePhotos
 * @property {number} user_id - Unique identifier of the target user.
 * @property {number} [offset] - Sequential number of the first photo to be returned. By default, all photos are returned.
 * @property {number} [limit] - Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100.
 * @returns {UserProfilePhotos}
 */

/**
 * Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.
 * Note: This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available) when the File object is received.
 * @see {@link https://core.telegram.org/bots/api#getfile getFile}
 * @typedef {object} getFile
 * @property {string} file_id - File identifier to get information about.
 * @returns {File}
 */

/**
 * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#banchatmember banChatMember}
 * @typedef {object} banChatMember
 * @property {string|number} chat_id - Unique identifier for the target group or username of the target supergroup or channel (in the format @channelusername).
 * @property {number} user_id - Unique identifier of the target user.
 * @property {number} [until_date] - Date when the user will be unbanned, unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever. Applied for supergroups and channels only.
 * @property {boolean} [revoke_messages] - Pass True to delete all messages from the chat for the user that is being removed. If False, the user will be able to see messages in the group that were sent before the user was removed. Always True for supergroups and channels.
 * @returns {boolean}
 */

/**
 * Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#unbanchatmember unbanChatMember}
 * @typedef {object} unbanChatMember
 * @property {string|number} chat_id - Unique identifier for the target group or username of the target supergroup or channel (in the format @channelusername).
 * @property {number} user_id - Unique identifier of the target user.
 * @property {boolean} [only_if_banned] - Do nothing if the user is not banned.
 * @returns {boolean}
 */

/**
 * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#restrictchatmember restrictChatMember}
 * @typedef {object} restrictChatMember
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @property {number} user_id - Unique identifier of the target user.
 * @property {ChatPermissions} permissions - A JSON-serialized object for new user permissions.
 * @property {boolean} [use_independent_chat_permissions] - Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission.
 * @property {number} [until_date] - Date when restrictions will be lifted for the user, unix time. If user is restricted for more than 366 days or less than 30 seconds from the current time, they are considered to be restricted forever.
 * @returns {boolean}
 */

/**
 * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#promotechatmember promoteChatMember}
 * @typedef {object} promoteChatMember
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} user_id - Unique identifier of the target user.
 * @property {boolean} [is_anonymous] - Pass True if the administrator's presence in the chat is hidden.
 * @property {boolean} [can_manage_chat] - Pass True if the administrator can access the chat event log, chat statistics, message statistics in channels, see channel members, see anonymous administrators in supergroups and ignore slow mode. Implied by any other administrator privilege.
 * @property {boolean} [can_post_messages] - Pass True if the administrator can create channel posts, channels only.
 * @property {boolean} [can_edit_messages] - Pass True if the administrator can edit messages of other users and can pin messages, channels only.
 * @property {boolean} [can_delete_messages] - Pass True if the administrator can delete messages of other users.
 * @property {boolean} [can_manage_video_chats] - Pass True if the administrator can manage video chats.
 * @property {boolean} [can_restrict_members] - Pass True if the administrator can restrict, ban or unban chat members.
 * @property {boolean} [can_promote_members] - Pass True if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by him).
 * @property {boolean} [can_change_info] - Pass True if the administrator can change chat title, photo and other settings.
 * @property {boolean} [can_invite_users] - Pass True if the administrator can invite new users to the chat.
 * @property {boolean} [can_pin_messages] - Pass True if the administrator can pin messages, supergroups only.
 * @property {boolean} [can_manage_topics] - Pass True if the user is allowed to create, rename, close, and reopen forum topics, supergroups only.
 * @returns {boolean}
 */

/**
 * Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setchatadministratorcustomtitle setChatAdministratorCustomTitle}
 * @typedef {object} setChatAdministratorCustomTitle
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @property {number} user_id - Unique identifier of the target user.
 * @property {string} custom_title - New custom title for the administrator; 0-16 characters, emoji are not allowed.
 * @returns {boolean}
 */

/**
 * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#banchatsenderchat banChatSenderChat}
 * @typedef {object} banChatSenderChat
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} sender_chat_id - Unique identifier of the target sender chat.
 * @returns {boolean}
 */

/**
 * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#unbanchatsenderchat unbanChatSenderChat}
 * @typedef {object} unbanChatSenderChat
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} sender_chat_id - Unique identifier of the target sender chat.
 * @returns {boolean}
 */

/**
 * Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setchatpermissions setChatPermissions}
 * @typedef {object} setChatPermissions
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @property {ChatPermissions} permissions - A JSON-serialized object for new default chat permissions.
 * @property {boolean} [use_independent_chat_permissions] - Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission.
 * @returns {boolean}
 */

/**
 * Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success.
 * @see {@link https://core.telegram.org/bots/api#exportchatinvitelink exportChatInviteLink}
 * @typedef {object} exportChatInviteLink
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @returns {string}
 */

/**
 * Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object.
 * @see {@link https://core.telegram.org/bots/api#createchatinvitelink createChatInviteLink}
 * @typedef {object} createChatInviteLink
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {string} [name] - Invite link name; 0-32 characters.
 * @property {number} [expire_date] - Point in time (Unix timestamp) when the link will expire.
 * @property {number} [member_limit] - The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999.
 * @property {boolean} [creates_join_request] - True, if users joining the chat via the link need to be approved by chat administrators. If True, member_limit can't be specified.
 * @returns {ChatInviteLink}
 */

/**
 * Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a ChatInviteLink object.
 * @see {@link https://core.telegram.org/bots/api#editchatinvitelink editChatInviteLink}
 * @typedef {object} editChatInviteLink
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {string} invite_link - The invite link to edit.
 * @property {string} [name] - Invite link name; 0-32 characters.
 * @property {number} [expire_date] - Point in time (Unix timestamp) when the link will expire.
 * @property {number} [member_limit] - The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999.
 * @property {boolean} [creates_join_request] - True, if users joining the chat via the link need to be approved by chat administrators. If True, member_limit can't be specified.
 * @returns {ChatInviteLink}
 */

/**
 * Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object.
 * @see {@link https://core.telegram.org/bots/api#revokechatinvitelink revokeChatInviteLink}
 * @typedef {object} revokeChatInviteLink
 * @property {string|number} chat_id - Unique identifier of the target chat or username of the target channel (in the format @channelusername).
 * @property {string} invite_link - The invite link to revoke.
 * @returns {ChatInviteLink}
 */

/**
 * Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#approvechatjoinrequest approveChatJoinRequest}
 * @typedef {object} approveChatJoinRequest
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} user_id - Unique identifier of the target user.
 * @returns {boolean}
 */

/**
 * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#declinechatjoinrequest declineChatJoinRequest}
 * @typedef {object} declineChatJoinRequest
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} user_id - Unique identifier of the target user.
 * @returns {boolean}
 */

/**
 * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setchatphoto setChatPhoto}
 * @typedef {object} setChatPhoto
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {InputFile} photo - New chat photo, uploaded using multipart/form-data.
 * @returns {boolean}
 */

/**
 * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#deletechatphoto deleteChatPhoto}
 * @typedef {object} deleteChatPhoto
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @returns {boolean}
 */

/**
 * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setchattitle setChatTitle}
 * @typedef {object} setChatTitle
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {string} title - New chat title, 1-128 characters.
 * @returns {boolean}
 */

/**
 * Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setchatdescription setChatDescription}
 * @typedef {object} setChatDescription
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {string} [description] - New chat description, 0-255 characters.
 * @returns {boolean}
 */

/**
 * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator right in a channel. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#pinchatmessage pinChatMessage}
 * @typedef {object} pinChatMessage
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} message_id - Identifier of a message to pin.
 * @property {boolean} [disable_notification] - Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats.
 * @returns {boolean}
 */

/**
 * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator right in a channel. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#unpinchatmessage unpinChatMessage}
 * @typedef {object} unpinChatMessage
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_id] - Identifier of a message to unpin. If not specified, the most recent pinned message (by sending date) will be unpinned.
 * @returns {boolean}
 */

/**
 * Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator right in a channel. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#unpinallchatmessages unpinAllChatMessages}
 * @typedef {object} unpinAllChatMessages
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @returns {boolean}
 */

/**
 * Use this method for your bot to leave a group, supergroup or channel. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#leavechat leaveChat}
 * @typedef {object} leaveChat
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername).
 * @returns {boolean}
 */

/**
 * Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.). Returns a Chat object on success.
 * @see {@link https://core.telegram.org/bots/api#getchat getChat}
 * @typedef {object} getChat
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername).
 * @returns {Chat}
 */

/**
 * Use this method to get a list of administrators in a chat, which aren't bots. Returns an Array of ChatMember objects.
 * @see {@link https://core.telegram.org/bots/api#getchatadministrators getChatAdministrators}
 * @typedef {object} getChatAdministrators
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername).
 * @returns {ChatMember[]}
 */

/**
 * Use this method to get the number of members in a chat. Returns Int on success.
 * @see {@link https://core.telegram.org/bots/api#getchatmembercount getChatMemberCount}
 * @typedef {object} getChatMemberCount
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername).
 * @returns {number}
 */

/**
 * Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a ChatMember object on success.
 * @see {@link https://core.telegram.org/bots/api#getchatmember getChatMember}
 * @typedef {object} getChatMember
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername).
 * @property {number} user_id - Unique identifier of the target user.
 * @returns {ChatMember}
 */

/**
 * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setchatstickerset setChatStickerSet}
 * @typedef {object} setChatStickerSet
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @property {string} sticker_set_name - Name of the sticker set to be set as the group sticker set.
 * @returns {boolean}
 */

/**
 * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#deletechatstickerset deleteChatStickerSet}
 * @typedef {object} deleteChatStickerSet
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @returns {boolean}
 */

/**
 * Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a ForumTopic object.
 * @see {@link https://core.telegram.org/bots/api#createforumtopic createForumTopic}
 * @typedef {object} createForumTopic
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @property {string} name - Topic name, 1-128 characters.
 * @property {number} [icon_color] - Color of the topic icon in RGB format. Currently, must be one of 7322096 (0x6FB9F0), 16766590 (0xFFD67E), 13338331 (0xCB86DB), 9367192 (0x8EEE98), 16749490 (0xFF93B2), or 16478047 (0xFB6F5F).
 * @property {string} [icon_custom_emoji_id] - Unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers.
 * @returns {ForumTopic}
 */

/**
 * Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#editforumtopic editForumTopic}
 * @typedef {object} editForumTopic
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @property {number} message_thread_id - Unique identifier for the target message thread of the forum topic.
 * @property {string} [name] - New topic name, 0-128 characters. If not specified or empty, the current name of the topic will be kept.
 * @property {string} [icon_custom_emoji_id] - New unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. Pass an empty string to remove the icon. If not specified, the current icon will be kept.
 * @returns {boolean}
 */

/**
 * Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#closeforumtopic closeForumTopic}
 * @typedef {object} closeForumTopic
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @property {number} message_thread_id - Unique identifier for the target message thread of the forum topic.
 * @returns {boolean}
 */

/**
 * Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#reopenforumtopic reopenForumTopic}
 * @typedef {object} reopenForumTopic
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @property {number} message_thread_id - Unique identifier for the target message thread of the forum topic.
 * @returns {boolean}
 */

/**
 * Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#deleteforumtopic deleteForumTopic}
 * @typedef {object} deleteForumTopic
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @property {number} message_thread_id - Unique identifier for the target message thread of the forum topic.
 * @returns {boolean}
 */

/**
 * Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#unpinallforumtopicmessages unpinAllForumTopicMessages}
 * @typedef {object} unpinAllForumTopicMessages
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @property {number} message_thread_id - Unique identifier for the target message thread of the forum topic.
 * @returns {boolean}
 */

/**
 * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#editgeneralforumtopic editGeneralForumTopic}
 * @typedef {object} editGeneralForumTopic
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @property {string} name - New topic name, 1-128 characters.
 * @returns {boolean}
 */

/**
 * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#closegeneralforumtopic closeGeneralForumTopic}
 * @typedef {object} closeGeneralForumTopic
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @returns {boolean}
 */

/**
 * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#reopengeneralforumtopic reopenGeneralForumTopic}
 * @typedef {object} reopenGeneralForumTopic
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @returns {boolean}
 */

/**
 * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#hidegeneralforumtopic hideGeneralForumTopic}
 * @typedef {object} hideGeneralForumTopic
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @returns {boolean}
 */

/**
 * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#unhidegeneralforumtopic unhideGeneralForumTopic}
 * @typedef {object} unhideGeneralForumTopic
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @returns {boolean}
 */

/**
 * Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
 * @see {@link https://core.telegram.org/bots/api#answercallbackquery answerCallbackQuery}
 * @typedef {object} answerCallbackQuery
 * @property {string} callback_query_id - Unique identifier for the query to be answered.
 * @property {string} [text] - Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters.
 * @property {boolean} [show_alert] - If True, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false.
 * @property {string} [url] - URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @BotFather, specify the URL that opens your game - note that this will only work if the query comes from a callback_game button. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter.
 * @property {number} [cache_time] - The maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram apps will support caching starting in version 3.14. Defaults to 0.
 * @returns {boolean}
 */

/**
 * Use this method to change the list of the bot's commands. See this manual for more details about bot commands. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setmycommands setMyCommands}
 * @typedef {object} setMyCommands
 * @property {BotCommand[]} commands - A JSON-serialized list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified.
 * @property {BotCommandScope} [scope] - A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault.
 * @property {string} [language_code] - A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands.
 * @returns {boolean}
 */

/**
 * Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#deletemycommands deleteMyCommands}
 * @typedef {object} deleteMyCommands
 * @property {BotCommandScope} [scope] - A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault.
 * @property {string} [language_code] - A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands.
 * @returns {boolean}
 */

/**
 * Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned.
 * @see {@link https://core.telegram.org/bots/api#getmycommands getMyCommands}
 * @typedef {object} getMyCommands
 * @property {BotCommandScope} [scope] - A JSON-serialized object, describing scope of users. Defaults to BotCommandScopeDefault.
 * @property {string} [language_code] - A two-letter ISO 639-1 language code or an empty string.
 * @returns {BotCommand[]}
 */

/**
 * Use this method to change the bot's name. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setmyname setMyName}
 * @typedef {object} setMyName
 * @property {string} [name] - New bot name; 0-64 characters. Pass an empty string to remove the dedicated name for the given language.
 * @property {string} [language_code] - A two-letter ISO 639-1 language code. If empty, the name will be shown to all users for whose language there is no dedicated name.
 * @returns {boolean}
 */

/**
 * Use this method to get the current bot name for the given user language. Returns BotName on success.
 * @see {@link https://core.telegram.org/bots/api#getmyname getMyName}
 * @typedef {object} getMyName
 * @property {string} [language_code] - A two-letter ISO 639-1 language code or an empty string.
 * @returns {BotName}
 */

/**
 * Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setmydescription setMyDescription}
 * @typedef {object} setMyDescription
 * @property {string} [description] - New bot description; 0-512 characters. Pass an empty string to remove the dedicated description for the given language.
 * @property {string} [language_code] - A two-letter ISO 639-1 language code. If empty, the description will be applied to all users for whose language there is no dedicated description.
 * @returns {boolean}
 */

/**
 * Use this method to get the current bot description for the given user language. Returns BotDescription on success.
 * @see {@link https://core.telegram.org/bots/api#getmydescription getMyDescription}
 * @typedef {object} getMyDescription
 * @property {string} [language_code] - A two-letter ISO 639-1 language code or an empty string.
 * @returns {BotDescription}
 */

/**
 * Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setmyshortdescription setMyShortDescription}
 * @typedef {object} setMyShortDescription
 * @property {string} [short_description] - New short description for the bot; 0-120 characters. Pass an empty string to remove the dedicated short description for the given language.
 * @property {string} [language_code] - A two-letter ISO 639-1 language code. If empty, the short description will be applied to all users for whose language there is no dedicated short description.
 * @returns {boolean}
 */

/**
 * Use this method to get the current bot short description for the given user language. Returns BotShortDescription on success.
 * @see {@link https://core.telegram.org/bots/api#getmyshortdescription getMyShortDescription}
 * @typedef {object} getMyShortDescription
 * @property {string} [language_code] - A two-letter ISO 639-1 language code or an empty string.
 * @returns {BotShortDescription}
 */

/**
 * Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setchatmenubutton setChatMenuButton}
 * @typedef {object} setChatMenuButton
 * @property {number} [chat_id] - Unique identifier for the target private chat. If not specified, default bot's menu button will be changed.
 * @property {MenuButton} [menu_button] - A JSON-serialized object for the bot's new menu button. Defaults to MenuButtonDefault.
 * @returns {boolean}
 */

/**
 * Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success.
 * @see {@link https://core.telegram.org/bots/api#getchatmenubutton getChatMenuButton}
 * @typedef {object} getChatMenuButton
 * @property {number} [chat_id] - Unique identifier for the target private chat. If not specified, default bot's menu button will be returned.
 * @returns {MenuButton}
 */

/**
 * Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setmydefaultadministratorrights setMyDefaultAdministratorRights}
 * @typedef {object} setMyDefaultAdministratorRights
 * @property {ChatAdministratorRights} [rights] - A JSON-serialized object describing new default administrator rights. If not specified, the default administrator rights will be cleared.
 * @property {boolean} [for_channels] - Pass True to change the default administrator rights of the bot in channels. Otherwise, the default administrator rights of the bot for groups and supergroups will be changed.
 * @returns {boolean}
 */

/**
 * Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success.
 * @see {@link https://core.telegram.org/bots/api#getmydefaultadministratorrights getMyDefaultAdministratorRights}
 * @typedef {object} getMyDefaultAdministratorRights
 * @property {boolean} [for_channels] - Pass True to get default administrator rights of the bot in channels. Otherwise, default administrator rights of the bot for groups and supergroups will be returned.
 * @returns {ChatAdministratorRights}
 */

/**
 * Use this method to edit text and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
 * @see {@link https://core.telegram.org/bots/api#editmessagetext editMessageText}
 * @typedef {object} editMessageText
 * @property {string|number} [chat_id] - Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_id] - Required if inline_message_id is not specified. Identifier of the message to edit.
 * @property {string} [inline_message_id] - Required if chat_id and message_id are not specified. Identifier of the inline message.
 * @property {string} text - New text of the message, 1-4096 characters after entities parsing.
 * @property {string} [parse_mode] - Mode for parsing entities in the message text. See formatting options for more details.
 * @property {MessageEntity[]} [entities] - A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode.
 * @property {boolean} [disable_web_page_preview] - Disables link previews for links in this message.
 * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for an inline keyboard.
 * @returns {Message|Boolean}
 */

/**
 * Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
 * @see {@link https://core.telegram.org/bots/api#editmessagecaption editMessageCaption}
 * @typedef {object} editMessageCaption
 * @property {string|number} [chat_id] - Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_id] - Required if inline_message_id is not specified. Identifier of the message to edit.
 * @property {string} [inline_message_id] - Required if chat_id and message_id are not specified. Identifier of the inline message.
 * @property {string} [caption] - New caption of the message, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Mode for parsing entities in the message caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for an inline keyboard.
 * @returns {Message|Boolean}
 */

/**
 * Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
 * @see {@link https://core.telegram.org/bots/api#editmessagemedia editMessageMedia}
 * @typedef {object} editMessageMedia
 * @property {string|number} [chat_id] - Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_id] - Required if inline_message_id is not specified. Identifier of the message to edit.
 * @property {string} [inline_message_id] - Required if chat_id and message_id are not specified. Identifier of the inline message.
 * @property {InputMedia} media - A JSON-serialized object for a new media content of the message.
 * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for a new inline keyboard.
 * @returns {Message|Boolean}
 */

/**
 * Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
 * @see {@link https://core.telegram.org/bots/api#editmessagelivelocation editMessageLiveLocation}
 * @typedef {object} editMessageLiveLocation
 * @property {string|number} [chat_id] - Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_id] - Required if inline_message_id is not specified. Identifier of the message to edit.
 * @property {string} [inline_message_id] - Required if chat_id and message_id are not specified. Identifier of the inline message.
 * @property {number} latitude - Latitude of new location.
 * @property {number} longitude - Longitude of new location.
 * @property {number} [horizontal_accuracy] - The radius of uncertainty for the location, measured in meters; 0-1500.
 * @property {number} [heading] - Direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
 * @property {number} [proximity_alert_radius] - The maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified.
 * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for a new inline keyboard.
 * @returns {Message|Boolean}
 */

/**
 * Use this method to stop updating a live location message before live_period expires. On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned.
 * @see {@link https://core.telegram.org/bots/api#stopmessagelivelocation stopMessageLiveLocation}
 * @typedef {object} stopMessageLiveLocation
 * @property {string|number} [chat_id] - Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_id] - Required if inline_message_id is not specified. Identifier of the message with live location to stop.
 * @property {string} [inline_message_id] - Required if chat_id and message_id are not specified. Identifier of the inline message.
 * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for a new inline keyboard.
 * @returns {Message|Boolean}
 */

/**
 * Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
 * @see {@link https://core.telegram.org/bots/api#editmessagereplymarkup editMessageReplyMarkup}
 * @typedef {object} editMessageReplyMarkup
 * @property {string|number} [chat_id] - Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_id] - Required if inline_message_id is not specified. Identifier of the message to edit.
 * @property {string} [inline_message_id] - Required if chat_id and message_id are not specified. Identifier of the inline message.
 * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for an inline keyboard.
 * @returns {Message|Boolean}
 */

/**
 * Use this method to stop a poll which was sent by the bot. On success, the stopped Poll is returned.
 * @see {@link https://core.telegram.org/bots/api#stoppoll stopPoll}
 * @typedef {object} stopPoll
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} message_id - Identifier of the original message with the poll.
 * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for a new message inline keyboard.
 * @returns {Poll}
 */

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
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} message_id - Identifier of the message to delete.
 * @returns {boolean}
 */

/**
 * Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. On success, the sent Message is returned.
 * @see {@link https://core.telegram.org/bots/api#sendsticker sendSticker}
 * @typedef {object} sendSticker
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {InputFile|string} sticker - Sticker to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP sticker from the Internet, or upload a new .WEBP or .TGS sticker using multipart/form-data. More information on Sending Files: https://core.telegram.org/bots/api#sending-files. Video stickers can only be sent by a file_id. Animated stickers can't be sent via an HTTP URL.
 * @property {string} [emoji] - Emoji associated with the sticker; only for just uploaded stickers.
 * @property {boolean} [disable_notification] - Sends the message silently. Users will receive a notification with no sound.
 * @property {boolean} [protect_content] - Protects the contents of the sent message from forwarding and saving.
 * @property {number} [reply_to_message_id] - If the message is a reply, ID of the original message.
 * @property {boolean} [allow_sending_without_reply] - Pass True if the message should be sent even if the specified replied-to message is not found.
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 * @returns {Message}
 */

/**
 * Use this method to get a sticker set. On success, a StickerSet object is returned.
 * @see {@link https://core.telegram.org/bots/api#getstickerset getStickerSet}
 * @typedef {object} getStickerSet
 * @property {string} name - Name of the sticker set.
 * @returns {StickerSet}
 */

/**
 * Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects.
 * @see {@link https://core.telegram.org/bots/api#getcustomemojistickers getCustomEmojiStickers}
 * @typedef {object} getCustomEmojiStickers
 * @property {string[]} custom_emoji_ids - List of custom emoji identifiers. At most 200 custom emoji identifiers can be specified.
 * @returns {Sticker[]}
 */

/**
 * Use this method to upload a file with a sticker for later use in the createNewStickerSet and addStickerToSet methods (the file can be used multiple times). Returns the uploaded File on success.
 * @see {@link https://core.telegram.org/bots/api#uploadstickerfile uploadStickerFile}
 * @typedef {object} uploadStickerFile
 * @property {number} user_id - User identifier of sticker file owner.
 * @property {InputFile} sticker - A file with the sticker in .WEBP, .PNG, .TGS, or .WEBM format. See https://core.telegram.org/stickers for technical requirements. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {string} sticker_format - Format of the sticker, must be one of "static", "animated", "video".
 * @returns {File}
 */

/**
 * Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#createnewstickerset createNewStickerSet}
 * @typedef {object} createNewStickerSet
 * @property {number} user_id - User identifier of created sticker set owner.
 * @property {string} name - Short name of sticker set, to be used in t.me/addstickers/ URLs (e.g., animals). Can contain only English letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and must end in "_by_<bot_username>". <bot_username> is case insensitive. 1-64 characters.
 * @property {string} title - Sticker set title, 1-64 characters.
 * @property {InputSticker[]} stickers - A JSON-serialized list of 1-50 initial stickers to be added to the sticker set.
 * @property {string} sticker_format - Format of stickers in the set, must be one of "static", "animated", "video".
 * @property {string} [sticker_type] - Type of stickers in the set, pass "regular", "mask", or "custom_emoji". By default, a regular sticker set is created.
 * @property {boolean} [needs_repainting] - Pass True if stickers in the sticker set must be repainted to the color of text when used in messages, the accent color if used as emoji status, white on chat photos, or another appropriate color based on context; for custom emoji sticker sets only.
 * @returns {boolean}
 */

/**
 * Use this method to add a new sticker to a set created by the bot. The format of the added sticker must match the format of the other stickers in the set. Emoji sticker sets can have up to 200 stickers. Animated and video sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#addstickertoset addStickerToSet}
 * @typedef {object} addStickerToSet
 * @property {number} user_id - User identifier of sticker set owner.
 * @property {string} name - Sticker set name.
 * @property {InputSticker} sticker - A JSON-serialized object with information about the added sticker. If exactly the same sticker had already been added to the set, then the set isn't changed.
 * @returns {boolean}
 */

/**
 * Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setstickerpositioninset setStickerPositionInSet}
 * @typedef {object} setStickerPositionInSet
 * @property {string} sticker - File identifier of the sticker.
 * @property {number} position - New sticker position in the set, zero-based.
 * @returns {boolean}
 */

/**
 * Use this method to delete a sticker from a set created by the bot. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#deletestickerfromset deleteStickerFromSet}
 * @typedef {object} deleteStickerFromSet
 * @property {string} sticker - File identifier of the sticker.
 * @returns {boolean}
 */

/**
 * Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setstickeremojilist setStickerEmojiList}
 * @typedef {object} setStickerEmojiList
 * @property {string} sticker - File identifier of the sticker.
 * @property {string[]} emoji_list - A JSON-serialized list of 1-20 emoji associated with the sticker.
 * @returns {boolean}
 */

/**
 * Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setstickerkeywords setStickerKeywords}
 * @typedef {object} setStickerKeywords
 * @property {string} sticker - File identifier of the sticker.
 * @property {string[]} [keywords] - A JSON-serialized list of 0-20 search keywords for the sticker with total length of up to 64 characters.
 * @returns {boolean}
 */

/**
 * Use this method to change the mask position of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setstickermaskposition setStickerMaskPosition}
 * @typedef {object} setStickerMaskPosition
 * @property {string} sticker - File identifier of the sticker.
 * @property {MaskPosition} [mask_position] - A JSON-serialized object with the position where the mask should be placed on faces. Omit the parameter to remove the mask position.
 * @returns {boolean}
 */

/**
 * Use this method to set the title of a created sticker set. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setstickersettitle setStickerSetTitle}
 * @typedef {object} setStickerSetTitle
 * @property {string} name - Sticker set name.
 * @property {string} title - Sticker set title, 1-64 characters.
 * @returns {boolean}
 */

/**
 * Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setstickersetthumbnail setStickerSetThumbnail}
 * @typedef {object} setStickerSetThumbnail
 * @property {string} name - Sticker set name.
 * @property {number} user_id - User identifier of the sticker set owner.
 * @property {InputFile|string} [thumbnail] - A .WEBP or .PNG image with the thumbnail, must be up to 128 kilobytes in size and have a width and height of exactly 100px, or a .TGS animation with a thumbnail up to 32 kilobytes in size (see https://core.telegram.org/stickers#animated-sticker-requirements for animated sticker technical requirements), or a WEBM video with the thumbnail up to 32 kilobytes in size; see https://core.telegram.org/stickers#video-sticker-requirements for video sticker technical requirements. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files: https://core.telegram.org/bots/api#sending-files. Animated and video sticker set thumbnails can't be uploaded via HTTP URL. If omitted, then the thumbnail is dropped and the first sticker is used as the thumbnail.
 * @returns {boolean}
 */

/**
 * Use this method to set the thumbnail of a custom emoji sticker set. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#setcustomemojistickersetthumbnail setCustomEmojiStickerSetThumbnail}
 * @typedef {object} setCustomEmojiStickerSetThumbnail
 * @property {string} name - Sticker set name.
 * @property {string} [custom_emoji_id] - Custom emoji identifier of a sticker from the sticker set; pass an empty string to drop the thumbnail and use the first sticker as the thumbnail.
 * @returns {boolean}
 */

/**
 * Use this method to delete a sticker set that was created by the bot. Returns True on success.
 * @see {@link https://core.telegram.org/bots/api#deletestickerset deleteStickerSet}
 * @typedef {object} deleteStickerSet
 * @property {string} name - Sticker set name.
 * @returns {boolean}
 */

/**
 * Use this method to send answers to an inline query. On success, True is returned.
 * No more than 50 results per query are allowed.
 * @see {@link https://core.telegram.org/bots/api#answerinlinequery answerInlineQuery}
 * @typedef {object} answerInlineQuery
 * @property {string} inline_query_id - Unique identifier for the answered query.
 * @property {InlineQueryResult[]} results - A JSON-serialized array of results for the inline query.
 * @property {number} [cache_time] - The maximum amount of time in seconds that the result of the inline query may be cached on the server. Defaults to 300.
 * @property {boolean} [is_personal] - Pass True if results may be cached on the server side only for the user that sent the query. By default, results may be returned to any user who sends the same query.
 * @property {string} [next_offset] - Pass the offset that a client should send in the next query with the same text to receive more results. Pass an empty string if there are no more results or if you don't support pagination. Offset length can't exceed 64 bytes.
 * @property {InlineQueryResultsButton} [button] - A JSON-serialized object describing a button to be shown above inline query results.
 * @returns {boolean}
 */

/**
 * Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is returned.
 * @see {@link https://core.telegram.org/bots/api#answerwebappquery answerWebAppQuery}
 * @typedef {object} answerWebAppQuery
 * @property {string} web_app_query_id - Unique identifier for the query to be answered.
 * @property {InlineQueryResult} result - A JSON-serialized object describing the message to be sent.
 * @returns {SentWebAppMessage}
 */

/**
 * Use this method to send invoices. On success, the sent Message is returned.
 * @see {@link https://core.telegram.org/bots/api#sendinvoice sendInvoice}
 * @typedef {object} sendInvoice
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
 * @property {number} [message_thread_id] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
 * @property {string} title - Product name, 1-32 characters.
 * @property {string} description - Product description, 1-255 characters.
 * @property {string} payload - Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes.
 * @property {string} provider_token - Payment provider token, obtained via @BotFather.
 * @property {string} currency - Three-letter ISO 4217 currency code, see more on currencies.
 * @property {LabeledPrice[]} prices - Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.).
 * @property {number} [max_tip_amount] - The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0.
 * @property {number[]} [suggested_tip_amounts] - A JSON-serialized array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount.
 * @property {string} [start_parameter] - Unique deep-linking parameter. If left empty, forwarded copies of the sent message will have a Pay button, allowing multiple users to pay directly from the forwarded message, using the same invoice. If non-empty, forwarded copies of the sent message will have a URL button with a deep link to the bot (instead of a Pay button), with the value used as the start parameter.
 * @property {string} [provider_data] - JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider.
 * @property {string} [photo_url] - URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. People like it better when they see what they are paying for.
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
 * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for an inline keyboard. If empty, one 'Pay total price' button will be shown. If not empty, the first button must be a Pay button.
 * @returns {Message}
 */

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
 * @property {number} [max_tip_amount] - The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0.
 * @property {number[]} [suggested_tip_amounts] - A JSON-serialized array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount.
 * @property {string} [provider_data] - JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider.
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

/**
 * If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned.
 * @see {@link https://core.telegram.org/bots/api#answershippingquery answerShippingQuery}
 * @typedef {object} answerShippingQuery
 * @property {string} shipping_query_id - Unique identifier for the query to be answered.
 * @property {boolean} ok - Pass True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible).
 * @property {ShippingOption[]} [shipping_options] - Required if ok is True. A JSON-serialized array of available shipping options.
 * @property {string} [error_message] - Required if ok is False. Error message in human readable form that explains why it is impossible to complete the order (e.g. "Sorry, delivery to your desired address is unavailable'). Telegram will display this message to the user.
 * @returns {boolean}
 */

/**
 * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
 * @see {@link https://core.telegram.org/bots/api#answerprecheckoutquery answerPreCheckoutQuery}
 * @typedef {object} answerPreCheckoutQuery
 * @property {string} pre_checkout_query_id - Unique identifier for the query to be answered.
 * @property {boolean} ok - Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems.
 * @property {string} [error_message] - Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user.
 * @returns {boolean}
 */

/**
 * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns True on success.
 * Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues.
 * @see {@link https://core.telegram.org/bots/api#setpassportdataerrors setPassportDataErrors}
 * @typedef {object} setPassportDataErrors
 * @property {number} user_id - User identifier.
 * @property {PassportElementError[]} errors - A JSON-serialized array describing the errors.
 * @returns {boolean}
 */

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
 * @property {InlineKeyboardMarkup} [reply_markup] - A JSON-serialized object for an inline keyboard. If empty, one 'Play game_title' button will be shown. If not empty, the first button must launch the game.
 * @returns {Message}
 */

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

/**
 * This object represents an incoming update.
 * At most one of the optional parameters can be present in any given update.
 * @see {@link https://core.telegram.org/bots/api#update Update}
 * @typedef {object} Update
 * @property {number} update_id - The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially. This ID becomes especially handy if you're using webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order. If there are no new updates for at least a week, then identifier of the next update will be chosen randomly instead of sequentially.
 * @property {Message} [message] - Optional. New incoming message of any kind - text, photo, sticker, etc.
 * @property {Message} [edited_message] - Optional. New version of a message that is known to the bot and was edited.
 * @property {Message} [channel_post] - Optional. New incoming channel post of any kind - text, photo, sticker, etc.
 * @property {Message} [edited_channel_post] - Optional. New version of a channel post that is known to the bot and was edited.
 * @property {InlineQuery} [inline_query] - Optional. New incoming inline query.
 * @property {ChosenInlineResult} [chosen_inline_result] - Optional. The result of an inline query that was chosen by a user and sent to their chat partner. Please see our documentation on the feedback collecting for details on how to enable these updates for your bot.
 * @property {CallbackQuery} [callback_query] - Optional. New incoming callback query.
 * @property {ShippingQuery} [shipping_query] - Optional. New incoming shipping query. Only for invoices with flexible price.
 * @property {PreCheckoutQuery} [pre_checkout_query] - Optional. New incoming pre-checkout query. Contains full information about checkout.
 * @property {Poll} [poll] - Optional. New poll state. Bots receive only updates about stopped polls and polls, which are sent by the bot.
 * @property {PollAnswer} [poll_answer] - Optional. A user changed their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by the bot itself.
 * @property {ChatMemberUpdated} [my_chat_member] - Optional. The bot's chat member status was updated in a chat. For private chats, this update is received only when the bot is blocked or unblocked by the user.
 * @property {ChatMemberUpdated} [chat_member] - Optional. A chat member's status was updated in a chat. The bot must be an administrator in the chat and must explicitly specify "chat_member" in the list of allowed_updates to receive these updates.
 * @property {ChatJoinRequest} [chat_join_request] - Optional. A request to join the chat has been sent. The bot must have the can_invite_users administrator right in the chat to receive these updates.
 */

/**
 * Describes the current status of a webhook.
 * @see {@link https://core.telegram.org/bots/api#webhookinfo WebhookInfo}
 * @typedef {object} WebhookInfo
 * @property {string} url - Webhook URL, may be empty if webhook is not set up.
 * @property {boolean} has_custom_certificate - True, if a custom certificate was provided for webhook certificate checks.
 * @property {number} pending_update_count - Number of updates awaiting delivery.
 * @property {string} [ip_address] - Optional. Currently used webhook IP address.
 * @property {number} [last_error_date] - Optional. Unix time for the most recent error that happened when trying to deliver an update via webhook.
 * @property {string} [last_error_message] - Optional. Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook.
 * @property {number} [last_synchronization_error_date] - Optional. Unix time of the most recent error that happened when trying to synchronize available updates with Telegram datacenters.
 * @property {number} [max_connections] - Optional. The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery.
 * @property {string[]} [allowed_updates] - Optional. A list of update types the bot is subscribed to. Defaults to all update types except chat_member.
 */

/**
 * This object represents a Telegram user or bot.
 * @see {@link https://core.telegram.org/bots/api#user User}
 * @typedef {object} User
 * @property {number} id - Unique identifier for this user or bot. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier.
 * @property {boolean} is_bot - True, if this user is a bot.
 * @property {string} first_name - User's or bot's first name.
 * @property {string} [last_name] - Optional. User's or bot's last name.
 * @property {string} [username] - Optional. User's or bot's username.
 * @property {string} [language_code] - Optional. IETF language tag of the user's language.
 * @property {boolean} [is_premium] - Optional. True, if this user is a Telegram Premium user.
 * @property {boolean} [added_to_attachment_menu] - Optional. True, if this user added the bot to the attachment menu.
 * @property {boolean} [can_join_groups] - Optional. True, if the bot can be invited to groups. Returned only in getMe.
 * @property {boolean} [can_read_all_group_messages] - Optional. True, if privacy mode is disabled for the bot. Returned only in getMe.
 * @property {boolean} [supports_inline_queries] - Optional. True, if the bot supports inline queries. Returned only in getMe.
 */

/**
 * This object represents a chat.
 * @see {@link https://core.telegram.org/bots/api#chat Chat}
 * @typedef {object} Chat
 * @property {number} id - Unique identifier for this chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
 * @property {string} type - Type of chat, can be either "private", "group", "supergroup" or "channel".
 * @property {string} [title] - Optional. Title, for supergroups, channels and group chats.
 * @property {string} [username] - Optional. Username, for private chats, supergroups and channels if available.
 * @property {string} [first_name] - Optional. First name of the other party in a private chat.
 * @property {string} [last_name] - Optional. Last name of the other party in a private chat.
 * @property {boolean} [is_forum] - Optional. True, if the supergroup chat is a forum (has topics enabled).
 * @property {ChatPhoto} [photo] - Optional. Chat photo. Returned only in getChat.
 * @property {string[]} [active_usernames] - Optional. If non-empty, the list of all active chat usernames; for private chats, supergroups and channels. Returned only in getChat.
 * @property {string} [emoji_status_custom_emoji_id] - Optional. Custom emoji identifier of emoji status of the other party in a private chat. Returned only in getChat.
 * @property {string} [bio] - Optional. Bio of the other party in a private chat. Returned only in getChat.
 * @property {boolean} [has_private_forwards] - Optional. True, if privacy settings of the other party in the private chat allows to use tg://user?id=<user_id> links only in chats with the user. Returned only in getChat.
 * @property {boolean} [has_restricted_voice_and_video_messages] - Optional. True, if the privacy settings of the other party restrict sending voice and video note messages in the private chat. Returned only in getChat.
 * @property {boolean} [join_to_send_messages] - Optional. True, if users need to join the supergroup before they can send messages. Returned only in getChat.
 * @property {boolean} [join_by_request] - Optional. True, if all users directly joining the supergroup need to be approved by supergroup administrators. Returned only in getChat.
 * @property {string} [description] - Optional. Description, for groups, supergroups and channel chats. Returned only in getChat.
 * @property {string} [invite_link] - Optional. Primary invite link, for groups, supergroups and channel chats. Returned only in getChat.
 * @property {Message} [pinned_message] - Optional. The most recent pinned message (by sending date). Returned only in getChat.
 * @property {ChatPermissions} [permissions] - Optional. Default chat member permissions, for groups and supergroups. Returned only in getChat.
 * @property {number} [slow_mode_delay] - Optional. For supergroups, the minimum allowed delay between consecutive messages sent by each unpriviledged user; in seconds. Returned only in getChat.
 * @property {number} [message_auto_delete_time] - Optional. The time after which all messages sent to the chat will be automatically deleted; in seconds. Returned only in getChat.
 * @property {boolean} [has_aggressive_anti_spam_enabled] - Optional. True, if aggressive anti-spam checks are enabled in the supergroup. The field is only available to chat administrators. Returned only in getChat.
 * @property {boolean} [has_hidden_members] - Optional. True, if non-administrators can only get the list of bots and administrators in the chat. Returned only in getChat.
 * @property {boolean} [has_protected_content] - Optional. True, if messages from the chat can't be forwarded to other chats. Returned only in getChat.
 * @property {string} [sticker_set_name] - Optional. For supergroups, name of group sticker set. Returned only in getChat.
 * @property {boolean} [can_set_sticker_set] - Optional. True, if the bot can change the group sticker set. Returned only in getChat.
 * @property {number} [linked_chat_id] - Optional. Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats. This identifier may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. Returned only in getChat.
 * @property {ChatLocation} [location] - Optional. For supergroups, the location to which the supergroup is connected. Returned only in getChat.
 */

/**
 * This object represents a message.
 * @see {@link https://core.telegram.org/bots/api#message Message}
 * @typedef {object} Message
 * @property {number} message_id - Unique message identifier inside this chat.
 * @property {number} [message_thread_id] - Optional. Unique identifier of a message thread to which the message belongs; for supergroups only.
 * @property {User} [from] - Optional. Sender of the message; empty for messages sent to channels. For backward compatibility, the field contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat.
 * @property {Chat} [sender_chat] - Optional. Sender of the message, sent on behalf of a chat. For example, the channel itself for channel posts, the supergroup itself for messages from anonymous group administrators, the linked channel for messages automatically forwarded to the discussion group. For backward compatibility, the field from contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat.
 * @property {number} date - Date the message was sent in Unix time.
 * @property {Chat} chat - Conversation the message belongs to.
 * @property {User} [forward_from] - Optional. For forwarded messages, sender of the original message.
 * @property {Chat} [forward_from_chat] - Optional. For messages forwarded from channels or from anonymous administrators, information about the original sender chat.
 * @property {number} [forward_from_message_id] - Optional. For messages forwarded from channels, identifier of the original message in the channel.
 * @property {string} [forward_signature] - Optional. For forwarded messages that were originally sent in channels or by an anonymous chat administrator, signature of the message sender if present.
 * @property {string} [forward_sender_name] - Optional. Sender's name for messages forwarded from users who disallow adding a link to their account in forwarded messages.
 * @property {number} [forward_date] - Optional. For forwarded messages, date the original message was sent in Unix time.
 * @property {boolean} [is_topic_message] - Optional. True, if the message is sent to a forum topic.
 * @property {boolean} [is_automatic_forward] - Optional. True, if the message is a channel post that was automatically forwarded to the connected discussion group.
 * @property {Message} [reply_to_message] - Optional. For replies, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply.
 * @property {User} [via_bot] - Optional. Bot through which the message was sent.
 * @property {number} [edit_date] - Optional. Date the message was last edited in Unix time.
 * @property {boolean} [has_protected_content] - Optional. True, if the message can't be forwarded.
 * @property {string} [media_group_id] - Optional. The unique identifier of a media message group this message belongs to.
 * @property {string} [author_signature] - Optional. Signature of the post author for messages in channels, or the custom title of an anonymous group administrator.
 * @property {string} [text] - Optional. For text messages, the actual UTF-8 text of the message.
 * @property {MessageEntity[]} [entities] - Optional. For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text.
 * @property {Animation} [animation] - Optional. Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set.
 * @property {Audio} [audio] - Optional. Message is an audio file, information about the file.
 * @property {Document} [document] - Optional. Message is a general file, information about the file.
 * @property {PhotoSize[]} [photo] - Optional. Message is a photo, available sizes of the photo.
 * @property {Sticker} [sticker] - Optional. Message is a sticker, information about the sticker.
 * @property {Video} [video] - Optional. Message is a video, information about the video.
 * @property {VideoNote} [video_note] - Optional. Message is a video note, information about the video message.
 * @property {Voice} [voice] - Optional. Message is a voice message, information about the file.
 * @property {string} [caption] - Optional. Caption for the animation, audio, document, photo, video or voice.
 * @property {MessageEntity[]} [caption_entities] - Optional. For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption.
 * @property {boolean} [has_media_spoiler] - Optional. True, if the message media is covered by a spoiler animation.
 * @property {Contact} [contact] - Optional. Message is a shared contact, information about the contact.
 * @property {Dice} [dice] - Optional. Message is a dice with random value.
 * @property {Game} [game] - Optional. Message is a game, information about the game. More about games: https://core.telegram.org/bots/api#games.
 * @property {Poll} [poll] - Optional. Message is a native poll, information about the poll.
 * @property {Venue} [venue] - Optional. Message is a venue, information about the venue. For backward compatibility, when this field is set, the location field will also be set.
 * @property {Location} [location] - Optional. Message is a shared location, information about the location.
 * @property {User[]} [new_chat_members] - Optional. New members that were added to the group or supergroup and information about them (the bot itself may be one of these members).
 * @property {User} [left_chat_member] - Optional. A member was removed from the group, information about them (this member may be the bot itself).
 * @property {string} [new_chat_title] - Optional. A chat title was changed to this value.
 * @property {PhotoSize[]} [new_chat_photo] - Optional. A chat photo was change to this value.
 * @property {boolean} [delete_chat_photo] - Optional. Service message: the chat photo was deleted.
 * @property {boolean} [group_chat_created] - Optional. Service message: the group has been created.
 * @property {boolean} [supergroup_chat_created] - Optional. Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup.
 * @property {boolean} [channel_chat_created] - Optional. Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel.
 * @property {MessageAutoDeleteTimerChanged} [message_auto_delete_timer_changed] - Optional. Service message: auto-delete timer settings changed in the chat.
 * @property {number} [migrate_to_chat_id] - Optional. The group has been migrated to a supergroup with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
 * @property {number} [migrate_from_chat_id] - Optional. The supergroup has been migrated from a group with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
 * @property {Message} [pinned_message] - Optional. Specified message was pinned. Note that the Message object in this field will not contain further reply_to_message fields even if it is itself a reply.
 * @property {Invoice} [invoice] - Optional. Message is an invoice for a payment, information about the invoice. More about payments: https://core.telegram.org/bots/api#payments.
 * @property {SuccessfulPayment} [successful_payment] - Optional. Message is a service message about a successful payment, information about the payment. More about payments: https://core.telegram.org/bots/api#payments.
 * @property {UserShared} [user_shared] - Optional. Service message: a user was shared with the bot.
 * @property {ChatShared} [chat_shared] - Optional. Service message: a chat was shared with the bot.
 * @property {string} [connected_website] - Optional. The domain name of the website on which the user has logged in. More about Telegram Login: https://core.telegram.org/widgets/login.
 * @property {WriteAccessAllowed} [write_access_allowed] - Optional. Service message: the user allowed the bot added to the attachment menu to write messages.
 * @property {PassportData} [passport_data] - Optional. Telegram Passport data.
 * @property {ProximityAlertTriggered} [proximity_alert_triggered] - Optional. Service message. A user in the chat triggered another user's proximity alert while sharing Live Location.
 * @property {ForumTopicCreated} [forum_topic_created] - Optional. Service message: forum topic created.
 * @property {ForumTopicEdited} [forum_topic_edited] - Optional. Service message: forum topic edited.
 * @property {ForumTopicClosed} [forum_topic_closed] - Optional. Service message: forum topic closed.
 * @property {ForumTopicReopened} [forum_topic_reopened] - Optional. Service message: forum topic reopened.
 * @property {GeneralForumTopicHidden} [general_forum_topic_hidden] - Optional. Service message: the 'General' forum topic hidden.
 * @property {GeneralForumTopicUnhidden} [general_forum_topic_unhidden] - Optional. Service message: the 'General' forum topic unhidden.
 * @property {VideoChatScheduled} [video_chat_scheduled] - Optional. Service message: video chat scheduled.
 * @property {VideoChatStarted} [video_chat_started] - Optional. Service message: video chat started.
 * @property {VideoChatEnded} [video_chat_ended] - Optional. Service message: video chat ended.
 * @property {VideoChatParticipantsInvited} [video_chat_participants_invited] - Optional. Service message: new participants invited to a video chat.
 * @property {WebAppData} [web_app_data] - Optional. Service message: data sent by a Web App.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message. login_url buttons are represented as ordinary url buttons.
 */

/**
 * This object represents a unique message identifier.
 * @see {@link https://core.telegram.org/bots/api#messageid MessageId}
 * @typedef {object} MessageId
 * @property {number} message_id - Unique message identifier.
 */

/**
 * This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc.
 * @see {@link https://core.telegram.org/bots/api#messageentity MessageEntity}
 * @typedef {object} MessageEntity
 * @property {string} type - Type of the entity. Currently, can be "mention" (@username), "hashtag" (#hashtag), "cashtag" ($USD), "bot_command" (/start@jobs_bot), "url" (https://telegram.org), "email" (do-not-reply@telegram.org), "phone_number" (+1-212-555-0123), "bold" (bold text), "italic" (italic text), "underline" (underlined text), "strikethrough" (strikethrough text), "spoiler" (spoiler message), "code" (monowidth string), "pre" (monowidth block), "text_link" (for clickable text URLs), "text_mention" (for users without usernames), "custom_emoji" (for inline custom emoji stickers).
 * @property {number} offset - Offset in UTF-16 code units to the start of the entity.
 * @property {number} length - Length of the entity in UTF-16 code units.
 * @property {string} [url] - Optional. For "text_link" only, URL that will be opened after user taps on the text.
 * @property {User} [user] - Optional. For "text_mention" only, the mentioned user.
 * @property {string} [language] - Optional. For "pre" only, the programming language of the entity text.
 * @property {string} [custom_emoji_id] - Optional. For "custom_emoji" only, unique identifier of the custom emoji. Use getCustomEmojiStickers to get full information about the sticker.
 */

/**
 * This object represents one size of a photo or a file / sticker thumbnail.
 * @see {@link https://core.telegram.org/bots/api#photosize PhotoSize}
 * @typedef {object} PhotoSize
 * @property {string} file_id - Identifier for this file, which can be used to download or reuse the file.
 * @property {string} file_unique_id - Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {number} width - Photo width.
 * @property {number} height - Photo height.
 * @property {number} [file_size] - Optional. File size in bytes.
 */

/**
 * This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound).
 * @see {@link https://core.telegram.org/bots/api#animation Animation}
 * @typedef {object} Animation
 * @property {string} file_id - Identifier for this file, which can be used to download or reuse the file.
 * @property {string} file_unique_id - Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {number} width - Video width as defined by sender.
 * @property {number} height - Video height as defined by sender.
 * @property {number} duration - Duration of the video in seconds as defined by sender.
 * @property {PhotoSize} [thumbnail] - Optional. Animation thumbnail as defined by sender.
 * @property {string} [file_name] - Optional. Original animation filename as defined by sender.
 * @property {string} [mime_type] - Optional. MIME type of the file as defined by sender.
 * @property {number} [file_size] - Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.
 */

/**
 * This object represents an audio file to be treated as music by the Telegram clients.
 * @see {@link https://core.telegram.org/bots/api#audio Audio}
 * @typedef {object} Audio
 * @property {string} file_id - Identifier for this file, which can be used to download or reuse the file.
 * @property {string} file_unique_id - Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {number} duration - Duration of the audio in seconds as defined by sender.
 * @property {string} [performer] - Optional. Performer of the audio as defined by sender or by audio tags.
 * @property {string} [title] - Optional. Title of the audio as defined by sender or by audio tags.
 * @property {string} [file_name] - Optional. Original filename as defined by sender.
 * @property {string} [mime_type] - Optional. MIME type of the file as defined by sender.
 * @property {number} [file_size] - Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.
 * @property {PhotoSize} [thumbnail] - Optional. Thumbnail of the album cover to which the music file belongs.
 */

/**
 * This object represents a general file (as opposed to photos, voice messages and audio files).
 * @see {@link https://core.telegram.org/bots/api#document Document}
 * @typedef {object} Document
 * @property {string} file_id - Identifier for this file, which can be used to download or reuse the file.
 * @property {string} file_unique_id - Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {PhotoSize} [thumbnail] - Optional. Document thumbnail as defined by sender.
 * @property {string} [file_name] - Optional. Original filename as defined by sender.
 * @property {string} [mime_type] - Optional. MIME type of the file as defined by sender.
 * @property {number} [file_size] - Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.
 */

/**
 * This object represents a video file.
 * @see {@link https://core.telegram.org/bots/api#video Video}
 * @typedef {object} Video
 * @property {string} file_id - Identifier for this file, which can be used to download or reuse the file.
 * @property {string} file_unique_id - Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {number} width - Video width as defined by sender.
 * @property {number} height - Video height as defined by sender.
 * @property {number} duration - Duration of the video in seconds as defined by sender.
 * @property {PhotoSize} [thumbnail] - Optional. Video thumbnail.
 * @property {string} [file_name] - Optional. Original filename as defined by sender.
 * @property {string} [mime_type] - Optional. MIME type of the file as defined by sender.
 * @property {number} [file_size] - Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.
 */

/**
 * This object represents a video message (available in Telegram apps as of v.4.0).
 * @see {@link https://core.telegram.org/bots/api#videonote VideoNote}
 * @typedef {object} VideoNote
 * @property {string} file_id - Identifier for this file, which can be used to download or reuse the file.
 * @property {string} file_unique_id - Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {number} length - Video width and height (diameter of the video message) as defined by sender.
 * @property {number} duration - Duration of the video in seconds as defined by sender.
 * @property {PhotoSize} [thumbnail] - Optional. Video thumbnail.
 * @property {number} [file_size] - Optional. File size in bytes.
 */

/**
 * This object represents a voice note.
 * @see {@link https://core.telegram.org/bots/api#voice Voice}
 * @typedef {object} Voice
 * @property {string} file_id - Identifier for this file, which can be used to download or reuse the file.
 * @property {string} file_unique_id - Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {number} duration - Duration of the audio in seconds as defined by sender.
 * @property {string} [mime_type] - Optional. MIME type of the file as defined by sender.
 * @property {number} [file_size] - Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.
 */

/**
 * This object represents a phone contact.
 * @see {@link https://core.telegram.org/bots/api#contact Contact}
 * @typedef {object} Contact
 * @property {string} phone_number - Contact's phone number.
 * @property {string} first_name - Contact's first name.
 * @property {string} [last_name] - Optional. Contact's last name.
 * @property {number} [user_id] - Optional. Contact's user identifier in Telegram. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier.
 * @property {string} [vcard] - Optional. Additional data about the contact in the form of a vCard.
 */

/**
 * This object represents an animated emoji that displays a random value.
 * @see {@link https://core.telegram.org/bots/api#dice Dice}
 * @typedef {object} Dice
 * @property {string} emoji - Emoji on which the dice throw animation is based.
 * @property {number} value - Value of the dice, 1-6 for "🎲", "🎯" and "🎳" base emoji, 1-5 for "🏀" and "⚽" base emoji, 1-64 for "🎰" base emoji.
 */

/**
 * This object contains information about one answer option in a poll.
 * @see {@link https://core.telegram.org/bots/api#polloption PollOption}
 * @typedef {object} PollOption
 * @property {string} text - Option text, 1-100 characters.
 * @property {number} voter_count - Number of users that voted for this option.
 */

/**
 * This object represents an answer of a user in a non-anonymous poll.
 * @see {@link https://core.telegram.org/bots/api#pollanswer PollAnswer}
 * @typedef {object} PollAnswer
 * @property {string} poll_id - Unique poll identifier.
 * @property {User} user - The user, who changed the answer to the poll.
 * @property {number[]} option_ids - 0-based identifiers of answer options, chosen by the user. May be empty if the user retracted their vote.
 */

/**
 * This object contains information about a poll.
 * @see {@link https://core.telegram.org/bots/api#poll Poll}
 * @typedef {object} Poll
 * @property {string} id - Unique poll identifier.
 * @property {string} question - Poll question, 1-300 characters.
 * @property {PollOption[]} options - List of poll options.
 * @property {number} total_voter_count - Total number of users that voted in the poll.
 * @property {boolean} is_closed - True, if the poll is closed.
 * @property {boolean} is_anonymous - True, if the poll is anonymous.
 * @property {string} type - Poll type, currently can be "regular" or "quiz".
 * @property {boolean} allows_multiple_answers - True, if the poll allows multiple answers.
 * @property {number} [correct_option_id] - Optional. 0-based identifier of the correct answer option. Available only for polls in the quiz mode, which are closed, or was sent (not forwarded) by the bot or to the private chat with the bot.
 * @property {string} [explanation] - Optional. Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters.
 * @property {MessageEntity[]} [explanation_entities] - Optional. Special entities like usernames, URLs, bot commands, etc. that appear in the explanation.
 * @property {number} [open_period] - Optional. Amount of time in seconds the poll will be active after creation.
 * @property {number} [close_date] - Optional. Point in time (Unix timestamp) when the poll will be automatically closed.
 */

/**
 * This object represents a point on the map.
 * @see {@link https://core.telegram.org/bots/api#location Location}
 * @typedef {object} Location
 * @property {number} longitude - Longitude as defined by sender.
 * @property {number} latitude - Latitude as defined by sender.
 * @property {number} [horizontal_accuracy] - Optional. The radius of uncertainty for the location, measured in meters; 0-1500.
 * @property {number} [live_period] - Optional. Time relative to the message sending date, during which the location can be updated; in seconds. For active live locations only.
 * @property {number} [heading] - Optional. The direction in which user is moving, in degrees; 1-360. For active live locations only.
 * @property {number} [proximity_alert_radius] - Optional. The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only.
 */

/**
 * This object represents a venue.
 * @see {@link https://core.telegram.org/bots/api#venue Venue}
 * @typedef {object} Venue
 * @property {Location} location - Venue location. Can't be a live location.
 * @property {string} title - Name of the venue.
 * @property {string} address - Address of the venue.
 * @property {string} [foursquare_id] - Optional. Foursquare identifier of the venue.
 * @property {string} [foursquare_type] - Optional. Foursquare type of the venue. (For example, "arts_entertainment/default", "arts_entertainment/aquarium" or "food/icecream".).
 * @property {string} [google_place_id] - Optional. Google Places identifier of the venue.
 * @property {string} [google_place_type] - Optional. Google Places type of the venue. (See supported types.).
 */

/**
 * Describes data sent from a Web App to the bot.
 * @see {@link https://core.telegram.org/bots/api#webappdata WebAppData}
 * @typedef {object} WebAppData
 * @property {string} data - The data. Be aware that a bad client can send arbitrary data in this field.
 * @property {string} button_text - Text of the web_app keyboard button from which the Web App was opened. Be aware that a bad client can send arbitrary data in this field.
 */

/**
 * This object represents the content of a service message, sent whenever a user in the chat triggers a proximity alert set by another user.
 * @see {@link https://core.telegram.org/bots/api#proximityalerttriggered ProximityAlertTriggered}
 * @typedef {object} ProximityAlertTriggered
 * @property {User} traveler - User that triggered the alert.
 * @property {User} watcher - User that set the alert.
 * @property {number} distance - The distance between the users.
 */

/**
 * This object represents a service message about a change in auto-delete timer settings.
 * @see {@link https://core.telegram.org/bots/api#messageautodeletetimerchanged MessageAutoDeleteTimerChanged}
 * @typedef {object} MessageAutoDeleteTimerChanged
 * @property {number} message_auto_delete_time - New auto-delete time for messages in the chat; in seconds.
 */

/**
 * This object represents a service message about a new forum topic created in the chat.
 * @see {@link https://core.telegram.org/bots/api#forumtopiccreated ForumTopicCreated}
 * @typedef {object} ForumTopicCreated
 * @property {string} name - Name of the topic.
 * @property {number} icon_color - Color of the topic icon in RGB format.
 * @property {string} [icon_custom_emoji_id] - Optional. Unique identifier of the custom emoji shown as the topic icon.
 */

/**
 * This object represents a service message about an edited forum topic.
 * @see {@link https://core.telegram.org/bots/api#forumtopicedited ForumTopicEdited}
 * @typedef {object} ForumTopicEdited
 * @property {string} [name] - Optional. New name of the topic, if it was edited.
 * @property {string} [icon_custom_emoji_id] - Optional. New identifier of the custom emoji shown as the topic icon, if it was edited; an empty string if the icon was removed.
 */

/**
 * This object contains information about the user whose identifier was shared with the bot using a KeyboardButtonRequestUser button.
 * @see {@link https://core.telegram.org/bots/api#usershared UserShared}
 * @typedef {object} UserShared
 * @property {number} request_id - Identifier of the request.
 * @property {number} user_id - Identifier of the shared user. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot may not have access to the user and could be unable to use this identifier, unless the user is already known to the bot by some other means.
 */

/**
 * This object contains information about the chat whose identifier was shared with the bot using a KeyboardButtonRequestChat button.
 * @see {@link https://core.telegram.org/bots/api#chatshared ChatShared}
 * @typedef {object} ChatShared
 * @property {number} request_id - Identifier of the request.
 * @property {number} chat_id - Identifier of the shared chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot may not have access to the chat and could be unable to use this identifier, unless the chat is already known to the bot by some other means.
 */

/**
 * This object represents a service message about a user allowing a bot to write messages after adding the bot to the attachment menu or launching a Web App from a link.
 * @see {@link https://core.telegram.org/bots/api#writeaccessallowed WriteAccessAllowed}
 * @typedef {object} WriteAccessAllowed
 * @property {string} [web_app_name] - Optional. Name of the Web App which was launched from a link.
 */

/**
 * This object represents a service message about a video chat scheduled in the chat.
 * @see {@link https://core.telegram.org/bots/api#videochatscheduled VideoChatScheduled}
 * @typedef {object} VideoChatScheduled
 * @property {number} start_date - Point in time (Unix timestamp) when the video chat is supposed to be started by a chat administrator.
 */

/**
 * This object represents a service message about a video chat ended in the chat.
 * @see {@link https://core.telegram.org/bots/api#videochatended VideoChatEnded}
 * @typedef {object} VideoChatEnded
 * @property {number} duration - Video chat duration in seconds.
 */

/**
 * This object represents a service message about new members invited to a video chat.
 * @see {@link https://core.telegram.org/bots/api#videochatparticipantsinvited VideoChatParticipantsInvited}
 * @typedef {object} VideoChatParticipantsInvited
 * @property {User[]} users - New members that were invited to the video chat.
 */

/**
 * This object represent a user's profile pictures.
 * @see {@link https://core.telegram.org/bots/api#userprofilephotos UserProfilePhotos}
 * @typedef {object} UserProfilePhotos
 * @property {number} total_count - Total number of profile pictures the target user has.
 * @property {Array.<PhotoSize[]>} photos - Requested profile pictures (in up to 4 sizes each).
 */

/**
 * This object represents a file ready to be downloaded. The file can be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile.
 * @see {@link https://core.telegram.org/bots/api#file File}
 * @typedef {object} File
 * @property {string} file_id - Identifier for this file, which can be used to download or reuse the file.
 * @property {string} file_unique_id - Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {number} [file_size] - Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.
 * @property {string} [file_path] - Optional. File path. Use https://api.telegram.org/file/bot<token>/<file_path> to get the file.
 */

/**
 * Describes a Web App.
 * @see {@link https://core.telegram.org/bots/api#webappinfo WebAppInfo}
 * @typedef {object} WebAppInfo
 * @property {string} url - An HTTPS URL of a Web App to be opened with additional data as specified in Initializing Web Apps.
 */

/**
 * This object represents a custom keyboard with reply options (see Introduction to bots for details and examples).
 * @see {@link https://core.telegram.org/bots/api#replykeyboardmarkup ReplyKeyboardMarkup}
 * @typedef {object} ReplyKeyboardMarkup
 * @property {Array.<KeyboardButton[]>} keyboard - Array of button rows, each represented by an Array of KeyboardButton objects.
 * @property {boolean} [is_persistent] - Optional. Requests clients to always show the keyboard when the regular keyboard is hidden. Defaults to false, in which case the custom keyboard can be hidden and opened with a keyboard icon.
 * @property {boolean} [resize_keyboard] - Optional. Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to false, in which case the custom keyboard is always of the same height as the app's standard keyboard.
 * @property {boolean} [one_time_keyboard] - Optional. Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to false.
 * @property {string} [input_field_placeholder] - Optional. The placeholder to be shown in the input field when the keyboard is active; 1-64 characters.
 * @property {boolean} [selective] - Optional. Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message. Example: A user requests to change the bot's language, bot replies to the request with a keyboard to select the new language. Other users in the group don't see the keyboard.
 */

/**
 * This object represents one button of the reply keyboard. For simple text buttons, String can be used instead of this object to specify the button text. The optional fields web_app, request_user, request_chat, request_contact, request_location, and request_poll are mutually exclusive.
 * Note: request_contact and request_location options will only work in Telegram versions released after 9 April, 2016. Older clients will display unsupported message.
 * Note: request_poll option will only work in Telegram versions released after 23 January, 2020. Older clients will display unsupported message.
 * Note: web_app option will only work in Telegram versions released after 16 April, 2022. Older clients will display unsupported message.
 * Note: request_user and request_chat options will only work in Telegram versions released after 3 February, 2023. Older clients will display unsupported message.
 * @see {@link https://core.telegram.org/bots/api#keyboardbutton KeyboardButton}
 * @typedef {object} KeyboardButton
 * @property {string} text - Text of the button. If none of the optional fields are used, it will be sent as a message when the button is pressed.
 * @property {KeyboardButtonRequestUser} [request_user] - Optional. If specified, pressing the button will open a list of suitable users. Tapping on any user will send their identifier to the bot in a "user_shared" service message. Available in private chats only.
 * @property {KeyboardButtonRequestChat} [request_chat] - Optional. If specified, pressing the button will open a list of suitable chats. Tapping on a chat will send its identifier to the bot in a "chat_shared" service message. Available in private chats only.
 * @property {boolean} [request_contact] - Optional. If True, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only.
 * @property {boolean} [request_location] - Optional. If True, the user's current location will be sent when the button is pressed. Available in private chats only.
 * @property {KeyboardButtonPollType} [request_poll] - Optional. If specified, the user will be asked to create a poll and send it to the bot when the button is pressed. Available in private chats only.
 * @property {WebAppInfo} [web_app] - Optional. If specified, the described Web App will be launched when the button is pressed. The Web App will be able to send a "web_app_data" service message. Available in private chats only.
 */

/**
 * This object defines the criteria used to request a suitable user. The identifier of the selected user will be shared with the bot when the corresponding button is pressed. More about requesting users: https://core.telegram.org/bots/features#chat-and-user-selection
 * @see {@link https://core.telegram.org/bots/api#keyboardbuttonrequestuser KeyboardButtonRequestUser}
 * @typedef {object} KeyboardButtonRequestUser
 * @property {number} request_id - Signed 32-bit identifier of the request, which will be received back in the UserShared object. Must be unique within the message.
 * @property {boolean} [user_is_bot] - Optional. Pass True to request a bot, pass False to request a regular user. If not specified, no additional restrictions are applied.
 * @property {boolean} [user_is_premium] - Optional. Pass True to request a premium user, pass False to request a non-premium user. If not specified, no additional restrictions are applied.
 */

/**
 * This object defines the criteria used to request a suitable chat. The identifier of the selected chat will be shared with the bot when the corresponding button is pressed. More about requesting chats: https://core.telegram.org/bots/features#chat-and-user-selection
 * @see {@link https://core.telegram.org/bots/api#keyboardbuttonrequestchat KeyboardButtonRequestChat}
 * @typedef {object} KeyboardButtonRequestChat
 * @property {number} request_id - Signed 32-bit identifier of the request, which will be received back in the ChatShared object. Must be unique within the message.
 * @property {boolean} chat_is_channel - Pass True to request a channel chat, pass False to request a group or a supergroup chat.
 * @property {boolean} [chat_is_forum] - Optional. Pass True to request a forum supergroup, pass False to request a non-forum chat. If not specified, no additional restrictions are applied.
 * @property {boolean} [chat_has_username] - Optional. Pass True to request a supergroup or a channel with a username, pass False to request a chat without a username. If not specified, no additional restrictions are applied.
 * @property {boolean} [chat_is_created] - Optional. Pass True to request a chat owned by the user. Otherwise, no additional restrictions are applied.
 * @property {ChatAdministratorRights} [user_administrator_rights] - Optional. A JSON-serialized object listing the required administrator rights of the user in the chat. The rights must be a superset of bot_administrator_rights. If not specified, no additional restrictions are applied.
 * @property {ChatAdministratorRights} [bot_administrator_rights] - Optional. A JSON-serialized object listing the required administrator rights of the bot in the chat. The rights must be a subset of user_administrator_rights. If not specified, no additional restrictions are applied.
 * @property {boolean} [bot_is_member] - Optional. Pass True to request a chat with the bot as a member. Otherwise, no additional restrictions are applied.
 */

/**
 * This object represents type of a poll, which is allowed to be created and sent when the corresponding button is pressed.
 * @see {@link https://core.telegram.org/bots/api#keyboardbuttonpolltype KeyboardButtonPollType}
 * @typedef {object} KeyboardButtonPollType
 * @property {string} [type] - Optional. If quiz is passed, the user will be allowed to create only polls in the quiz mode. If regular is passed, only regular polls will be allowed. Otherwise, the user will be allowed to create a poll of any type.
 */

/**
 * Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot. An exception is made for one-time keyboards that are hidden immediately after the user presses a button (see ReplyKeyboardMarkup).
 * @see {@link https://core.telegram.org/bots/api#replykeyboardremove ReplyKeyboardRemove}
 * @typedef {object} ReplyKeyboardRemove
 * @property {boolean} remove_keyboard - Requests clients to remove the custom keyboard (user will not be able to summon this keyboard; if you want to hide the keyboard from sight but keep it accessible, use one_time_keyboard in ReplyKeyboardMarkup).
 * @property {boolean} [selective] - Optional. Use this parameter if you want to remove the keyboard for specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message. Example: A user votes in a poll, bot returns confirmation message in reply to the vote and removes the keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet.
 */

/**
 * This object represents an inline keyboard that appears right next to the message it belongs to.
 * Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will display unsupported message.
 * @see {@link https://core.telegram.org/bots/api#inlinekeyboardmarkup InlineKeyboardMarkup}
 * @typedef {object} InlineKeyboardMarkup
 * @property {Array.<InlineKeyboardButton[]>} inline_keyboard - Array of button rows, each represented by an Array of InlineKeyboardButton objects.
 */

/**
 * This object represents one button of an inline keyboard. You must use exactly one of the optional fields.
 * @see {@link https://core.telegram.org/bots/api#inlinekeyboardbutton InlineKeyboardButton}
 * @typedef {object} InlineKeyboardButton
 * @property {string} text - Label text on the button.
 * @property {string} [url] - Optional. HTTP or tg:// URL to be opened when the button is pressed. Links tg://user?id=<user_id> can be used to mention a user by their ID without using a username, if this is allowed by their privacy settings.
 * @property {string} [callback_data] - Optional. Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes.
 * @property {WebAppInfo} [web_app] - Optional. Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Available only in private chats between a user and the bot.
 * @property {LoginUrl} [login_url] - Optional. An HTTPS URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget.
 * @property {string} [switch_inline_query] - Optional. If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. May be empty, in which case just the bot's username will be inserted. Note: This offers an easy way for users to start using your bot in inline mode when they are currently in a private chat with it. Especially useful when combined with switch_pm.. actions - in this case the user will be automatically returned to the chat they switched from, skipping the chat selection screen.
 * @property {string} [switch_inline_query_current_chat] - Optional. If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted. This offers a quick way for the user to open your bot in inline mode in the same chat - good for selecting something from multiple options.
 * @property {SwitchInlineQueryChosenChat} [switch_inline_query_chosen_chat] - Optional. If set, pressing the button will prompt the user to select one of their chats of the specified type, open that chat and insert the bot's username and the specified inline query in the input field.
 * @property {CallbackGame} [callback_game] - Optional. Description of the game that will be launched when the user presses the button. NOTE: This type of button must always be the first button in the first row.
 * @property {boolean} [pay] - Optional. Specify True, to send a Pay button. NOTE: This type of button must always be the first button in the first row and can only be used in invoice messages.
 */

/**
 * This object represents a parameter of the inline keyboard button used to automatically authorize a user. Serves as a great replacement for the Telegram Login Widget when the user is coming from Telegram. All the user needs to do is tap/click a button and confirm that they want to log in:.
 * Telegram apps support these buttons as of version 5.7.
 * @see {@link https://core.telegram.org/bots/api#loginurl LoginUrl}
 * @typedef {object} LoginUrl
 * @property {string} url - An HTTPS URL to be opened with user authorization data added to the query string when the button is pressed. If the user refuses to provide authorization data, the original URL without information about the user will be opened. The data added is the same as described in Receiving authorization data. NOTE: You must always check the hash of the received data to verify the authentication and the integrity of the data as described in Checking authorization.
 * @property {string} [forward_text] - Optional. New text of the button in forwarded messages.
 * @property {string} [bot_username] - Optional. Username of a bot, which will be used for user authorization. See Setting up a bot for more details. If not specified, the current bot's username will be assumed. The url's domain must be the same as the domain linked with the bot. See Linking your domain to the bot for more details.
 * @property {boolean} [request_write_access] - Optional. Pass True to request the permission for your bot to send messages to the user.
 */

/**
 * This object represents an inline button that switches the current user to inline mode in a chosen chat, with an optional default inline query.
 * @see {@link https://core.telegram.org/bots/api#switchinlinequerychosenchat SwitchInlineQueryChosenChat}
 * @typedef {object} SwitchInlineQueryChosenChat
 * @property {string} [query] - Optional. The default inline query to be inserted in the input field. If left empty, only the bot's username will be inserted.
 * @property {boolean} [allow_user_chats] - Optional. True, if private chats with users can be chosen.
 * @property {boolean} [allow_bot_chats] - Optional. True, if private chats with bots can be chosen.
 * @property {boolean} [allow_group_chats] - Optional. True, if group and supergroup chats can be chosen.
 * @property {boolean} [allow_channel_chats] - Optional. True, if channel chats can be chosen.
 */

/**
 * This object represents an incoming callback query from a callback button in an inline keyboard. If the button that originated the query was attached to a message sent by the bot, the field message will be present. If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present. Exactly one of the fields data or game_short_name will be present.
 * @see {@link https://core.telegram.org/bots/api#callbackquery CallbackQuery}
 * @typedef {object} CallbackQuery
 * @property {string} id - Unique identifier for this query.
 * @property {User} from - Sender.
 * @property {Message} [message] - Optional. Message with the callback button that originated the query. Note that message content and message date will not be available if the message is too old.
 * @property {string} [inline_message_id] - Optional. Identifier of the message sent via the bot in inline mode, that originated the query.
 * @property {string} chat_instance - Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games.
 * @property {string} [data] - Optional. Data associated with the callback button. Be aware that the message originated the query can contain no callback buttons with this data.
 * @property {string} [game_short_name] - Optional. Short name of a Game to be returned, serves as the unique identifier for the game.
 */

/**
 * Upon receiving a message with this object, Telegram clients will display a reply interface to the user (act as if the user has selected the bot's message and tapped 'Reply'). This can be extremely useful if you want to create user-friendly step-by-step interfaces without having to sacrifice privacy mode.
 * @see {@link https://core.telegram.org/bots/api#forcereply ForceReply}
 * @typedef {object} ForceReply
 * @property {boolean} force_reply - Shows reply interface to the user, as if they manually selected the bot's message and tapped 'Reply'.
 * @property {string} [input_field_placeholder] - Optional. The placeholder to be shown in the input field when the reply is active; 1-64 characters.
 * @property {boolean} [selective] - Optional. Use this parameter if you want to force reply from specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.
 */

/**
 * This object represents a chat photo.
 * @see {@link https://core.telegram.org/bots/api#chatphoto ChatPhoto}
 * @typedef {object} ChatPhoto
 * @property {string} small_file_id - File identifier of small (160x160) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed.
 * @property {string} small_file_unique_id - Unique file identifier of small (160x160) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {string} big_file_id - File identifier of big (640x640) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed.
 * @property {string} big_file_unique_id - Unique file identifier of big (640x640) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 */

/**
 * Represents an invite link for a chat.
 * @see {@link https://core.telegram.org/bots/api#chatinvitelink ChatInviteLink}
 * @typedef {object} ChatInviteLink
 * @property {string} invite_link - The invite link. If the link was created by another chat administrator, then the second part of the link will be replaced with "..".
 * @property {User} creator - Creator of the link.
 * @property {boolean} creates_join_request - True, if users joining the chat via the link need to be approved by chat administrators.
 * @property {boolean} is_primary - True, if the link is primary.
 * @property {boolean} is_revoked - True, if the link is revoked.
 * @property {string} [name] - Optional. Invite link name.
 * @property {number} [expire_date] - Optional. Point in time (Unix timestamp) when the link will expire or has been expired.
 * @property {number} [member_limit] - Optional. The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999.
 * @property {number} [pending_join_request_count] - Optional. Number of pending join requests created using this link.
 */

/**
 * Represents the rights of an administrator in a chat.
 * @see {@link https://core.telegram.org/bots/api#chatadministratorrights ChatAdministratorRights}
 * @typedef {object} ChatAdministratorRights
 * @property {boolean} is_anonymous - True, if the user's presence in the chat is hidden.
 * @property {boolean} can_manage_chat - True, if the administrator can access the chat event log, chat statistics, message statistics in channels, see channel members, see anonymous administrators in supergroups and ignore slow mode. Implied by any other administrator privilege.
 * @property {boolean} can_delete_messages - True, if the administrator can delete messages of other users.
 * @property {boolean} can_manage_video_chats - True, if the administrator can manage video chats.
 * @property {boolean} can_restrict_members - True, if the administrator can restrict, ban or unban chat members.
 * @property {boolean} can_promote_members - True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user).
 * @property {boolean} can_change_info - True, if the user is allowed to change the chat title, photo and other settings.
 * @property {boolean} can_invite_users - True, if the user is allowed to invite new users to the chat.
 * @property {boolean} [can_post_messages] - Optional. True, if the administrator can post in the channel; channels only.
 * @property {boolean} [can_edit_messages] - Optional. True, if the administrator can edit messages of other users and can pin messages; channels only.
 * @property {boolean} [can_pin_messages] - Optional. True, if the user is allowed to pin messages; groups and supergroups only.
 * @property {boolean} [can_manage_topics] - Optional. True, if the user is allowed to create, rename, close, and reopen forum topics; supergroups only.
 */

/**
 * Represents a chat member that owns the chat and has all administrator privileges.
 * @see {@link https://core.telegram.org/bots/api#chatmemberowner ChatMemberOwner}
 * @typedef {object} ChatMemberOwner
 * @property {string} status - The member's status in the chat, always "creator".
 * @property {User} user - Information about the user.
 * @property {boolean} is_anonymous - True, if the user's presence in the chat is hidden.
 * @property {string} [custom_title] - Optional. Custom title for this user.
 */

/**
 * Represents a chat member that has some additional privileges.
 * @see {@link https://core.telegram.org/bots/api#chatmemberadministrator ChatMemberAdministrator}
 * @typedef {object} ChatMemberAdministrator
 * @property {string} status - The member's status in the chat, always "administrator".
 * @property {User} user - Information about the user.
 * @property {boolean} can_be_edited - True, if the bot is allowed to edit administrator privileges of that user.
 * @property {boolean} is_anonymous - True, if the user's presence in the chat is hidden.
 * @property {boolean} can_manage_chat - True, if the administrator can access the chat event log, chat statistics, message statistics in channels, see channel members, see anonymous administrators in supergroups and ignore slow mode. Implied by any other administrator privilege.
 * @property {boolean} can_delete_messages - True, if the administrator can delete messages of other users.
 * @property {boolean} can_manage_video_chats - True, if the administrator can manage video chats.
 * @property {boolean} can_restrict_members - True, if the administrator can restrict, ban or unban chat members.
 * @property {boolean} can_promote_members - True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user).
 * @property {boolean} can_change_info - True, if the user is allowed to change the chat title, photo and other settings.
 * @property {boolean} can_invite_users - True, if the user is allowed to invite new users to the chat.
 * @property {boolean} [can_post_messages] - Optional. True, if the administrator can post in the channel; channels only.
 * @property {boolean} [can_edit_messages] - Optional. True, if the administrator can edit messages of other users and can pin messages; channels only.
 * @property {boolean} [can_pin_messages] - Optional. True, if the user is allowed to pin messages; groups and supergroups only.
 * @property {boolean} [can_manage_topics] - Optional. True, if the user is allowed to create, rename, close, and reopen forum topics; supergroups only.
 * @property {string} [custom_title] - Optional. Custom title for this user.
 */

/**
 * Represents a chat member that has no additional privileges or restrictions.
 * @see {@link https://core.telegram.org/bots/api#chatmembermember ChatMemberMember}
 * @typedef {object} ChatMemberMember
 * @property {string} status - The member's status in the chat, always "member".
 * @property {User} user - Information about the user.
 */

/**
 * Represents a chat member that is under certain restrictions in the chat. Supergroups only.
 * @see {@link https://core.telegram.org/bots/api#chatmemberrestricted ChatMemberRestricted}
 * @typedef {object} ChatMemberRestricted
 * @property {string} status - The member's status in the chat, always "restricted".
 * @property {User} user - Information about the user.
 * @property {boolean} is_member - True, if the user is a member of the chat at the moment of the request.
 * @property {boolean} can_send_messages - True, if the user is allowed to send text messages, contacts, invoices, locations and venues.
 * @property {boolean} can_send_audios - True, if the user is allowed to send audios.
 * @property {boolean} can_send_documents - True, if the user is allowed to send documents.
 * @property {boolean} can_send_photos - True, if the user is allowed to send photos.
 * @property {boolean} can_send_videos - True, if the user is allowed to send videos.
 * @property {boolean} can_send_video_notes - True, if the user is allowed to send video notes.
 * @property {boolean} can_send_voice_notes - True, if the user is allowed to send voice notes.
 * @property {boolean} can_send_polls - True, if the user is allowed to send polls.
 * @property {boolean} can_send_other_messages - True, if the user is allowed to send animations, games, stickers and use inline bots.
 * @property {boolean} can_add_web_page_previews - True, if the user is allowed to add web page previews to their messages.
 * @property {boolean} can_change_info - True, if the user is allowed to change the chat title, photo and other settings.
 * @property {boolean} can_invite_users - True, if the user is allowed to invite new users to the chat.
 * @property {boolean} can_pin_messages - True, if the user is allowed to pin messages.
 * @property {boolean} can_manage_topics - True, if the user is allowed to create forum topics.
 * @property {number} until_date - Date when restrictions will be lifted for this user; unix time. If 0, then the user is restricted forever.
 */

/**
 * Represents a chat member that isn't currently a member of the chat, but may join it themselves.
 * @see {@link https://core.telegram.org/bots/api#chatmemberleft ChatMemberLeft}
 * @typedef {object} ChatMemberLeft
 * @property {string} status - The member's status in the chat, always "left".
 * @property {User} user - Information about the user.
 */

/**
 * Represents a chat member that was banned in the chat and can't return to the chat or view chat messages.
 * @see {@link https://core.telegram.org/bots/api#chatmemberbanned ChatMemberBanned}
 * @typedef {object} ChatMemberBanned
 * @property {string} status - The member's status in the chat, always "kicked".
 * @property {User} user - Information about the user.
 * @property {number} until_date - Date when restrictions will be lifted for this user; unix time. If 0, then the user is banned forever.
 */

/**
 * This object represents changes in the status of a chat member.
 * @see {@link https://core.telegram.org/bots/api#chatmemberupdated ChatMemberUpdated}
 * @typedef {object} ChatMemberUpdated
 * @property {Chat} chat - Chat the user belongs to.
 * @property {User} from - Performer of the action, which resulted in the change.
 * @property {number} date - Date the change was done in Unix time.
 * @property {ChatMember} old_chat_member - Previous information about the chat member.
 * @property {ChatMember} new_chat_member - New information about the chat member.
 * @property {ChatInviteLink} [invite_link] - Optional. Chat invite link, which was used by the user to join the chat; for joining by invite link events only.
 * @property {boolean} [via_chat_folder_invite_link] - Optional. True, if the user joined the chat via a chat folder invite link.
 */

/**
 * Represents a join request sent to a chat.
 * @see {@link https://core.telegram.org/bots/api#chatjoinrequest ChatJoinRequest}
 * @typedef {object} ChatJoinRequest
 * @property {Chat} chat - Chat to which the request was sent.
 * @property {User} from - User that sent the join request.
 * @property {number} user_chat_id - Identifier of a private chat with the user who sent the join request. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot can use this identifier for 24 hours to send messages until the join request is processed, assuming no other administrator contacted the user.
 * @property {number} date - Date the request was sent in Unix time.
 * @property {string} [bio] - Optional. Bio of the user.
 * @property {ChatInviteLink} [invite_link] - Optional. Chat invite link that was used by the user to send the join request.
 */

/**
 * Describes actions that a non-administrator user is allowed to take in a chat.
 * @see {@link https://core.telegram.org/bots/api#chatpermissions ChatPermissions}
 * @typedef {object} ChatPermissions
 * @property {boolean} [can_send_messages] - Optional. True, if the user is allowed to send text messages, contacts, invoices, locations and venues.
 * @property {boolean} [can_send_audios] - Optional. True, if the user is allowed to send audios.
 * @property {boolean} [can_send_documents] - Optional. True, if the user is allowed to send documents.
 * @property {boolean} [can_send_photos] - Optional. True, if the user is allowed to send photos.
 * @property {boolean} [can_send_videos] - Optional. True, if the user is allowed to send videos.
 * @property {boolean} [can_send_video_notes] - Optional. True, if the user is allowed to send video notes.
 * @property {boolean} [can_send_voice_notes] - Optional. True, if the user is allowed to send voice notes.
 * @property {boolean} [can_send_polls] - Optional. True, if the user is allowed to send polls.
 * @property {boolean} [can_send_other_messages] - Optional. True, if the user is allowed to send animations, games, stickers and use inline bots.
 * @property {boolean} [can_add_web_page_previews] - Optional. True, if the user is allowed to add web page previews to their messages.
 * @property {boolean} [can_change_info] - Optional. True, if the user is allowed to change the chat title, photo and other settings. Ignored in public supergroups.
 * @property {boolean} [can_invite_users] - Optional. True, if the user is allowed to invite new users to the chat.
 * @property {boolean} [can_pin_messages] - Optional. True, if the user is allowed to pin messages. Ignored in public supergroups.
 * @property {boolean} [can_manage_topics] - Optional. True, if the user is allowed to create forum topics. If omitted defaults to the value of can_pin_messages.
 */

/**
 * Represents a location to which a chat is connected.
 * @see {@link https://core.telegram.org/bots/api#chatlocation ChatLocation}
 * @typedef {object} ChatLocation
 * @property {Location} location - The location to which the supergroup is connected. Can't be a live location.
 * @property {string} address - Location address; 1-64 characters, as defined by the chat owner.
 */

/**
 * This object represents a forum topic.
 * @see {@link https://core.telegram.org/bots/api#forumtopic ForumTopic}
 * @typedef {object} ForumTopic
 * @property {number} message_thread_id - Unique identifier of the forum topic.
 * @property {string} name - Name of the topic.
 * @property {number} icon_color - Color of the topic icon in RGB format.
 * @property {string} [icon_custom_emoji_id] - Optional. Unique identifier of the custom emoji shown as the topic icon.
 */

/**
 * This object represents a bot command.
 * @see {@link https://core.telegram.org/bots/api#botcommand BotCommand}
 * @typedef {object} BotCommand
 * @property {string} command - Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores.
 * @property {string} description - Description of the command; 1-256 characters.
 */

/**
 * Represents the default scope of bot commands. Default commands are used if no commands with a narrower scope are specified for the user.
 * @see {@link https://core.telegram.org/bots/api#botcommandscopedefault BotCommandScopeDefault}
 * @typedef {object} BotCommandScopeDefault
 * @property {string} type - Scope type, must be default.
 */

/**
 * Represents the scope of bot commands, covering all private chats.
 * @see {@link https://core.telegram.org/bots/api#botcommandscopeallprivatechats BotCommandScopeAllPrivateChats}
 * @typedef {object} BotCommandScopeAllPrivateChats
 * @property {string} type - Scope type, must be all_private_chats.
 */

/**
 * Represents the scope of bot commands, covering all group and supergroup chats.
 * @see {@link https://core.telegram.org/bots/api#botcommandscopeallgroupchats BotCommandScopeAllGroupChats}
 * @typedef {object} BotCommandScopeAllGroupChats
 * @property {string} type - Scope type, must be all_group_chats.
 */

/**
 * Represents the scope of bot commands, covering all group and supergroup chat administrators.
 * @see {@link https://core.telegram.org/bots/api#botcommandscopeallchatadministrators BotCommandScopeAllChatAdministrators}
 * @typedef {object} BotCommandScopeAllChatAdministrators
 * @property {string} type - Scope type, must be all_chat_administrators.
 */

/**
 * Represents the scope of bot commands, covering a specific chat.
 * @see {@link https://core.telegram.org/bots/api#botcommandscopechat BotCommandScopeChat}
 * @typedef {object} BotCommandScopeChat
 * @property {string} type - Scope type, must be chat.
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 */

/**
 * Represents the scope of bot commands, covering all administrators of a specific group or supergroup chat.
 * @see {@link https://core.telegram.org/bots/api#botcommandscopechatadministrators BotCommandScopeChatAdministrators}
 * @typedef {object} BotCommandScopeChatAdministrators
 * @property {string} type - Scope type, must be chat_administrators.
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 */

/**
 * Represents the scope of bot commands, covering a specific member of a group or supergroup chat.
 * @see {@link https://core.telegram.org/bots/api#botcommandscopechatmember BotCommandScopeChatMember}
 * @typedef {object} BotCommandScopeChatMember
 * @property {string} type - Scope type, must be chat_member.
 * @property {string|number} chat_id - Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername).
 * @property {number} user_id - Unique identifier of the target user.
 */

/**
 * This object represents the bot's name.
 * @see {@link https://core.telegram.org/bots/api#botname BotName}
 * @typedef {object} BotName
 * @property {string} name - The bot's name.
 */

/**
 * This object represents the bot's description.
 * @see {@link https://core.telegram.org/bots/api#botdescription BotDescription}
 * @typedef {object} BotDescription
 * @property {string} description - The bot's description.
 */

/**
 * This object represents the bot's short description.
 * @see {@link https://core.telegram.org/bots/api#botshortdescription BotShortDescription}
 * @typedef {object} BotShortDescription
 * @property {string} short_description - The bot's short description.
 */

/**
 * Represents a menu button, which opens the bot's list of commands.
 * @see {@link https://core.telegram.org/bots/api#menubuttoncommands MenuButtonCommands}
 * @typedef {object} MenuButtonCommands
 * @property {string} type - Type of the button, must be commands.
 */

/**
 * Represents a menu button, which launches a Web App.
 * @see {@link https://core.telegram.org/bots/api#menubuttonwebapp MenuButtonWebApp}
 * @typedef {object} MenuButtonWebApp
 * @property {string} type - Type of the button, must be web_app.
 * @property {string} text - Text on the button.
 * @property {WebAppInfo} web_app - Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery.
 */

/**
 * Describes that no specific value for the menu button was set.
 * @see {@link https://core.telegram.org/bots/api#menubuttondefault MenuButtonDefault}
 * @typedef {object} MenuButtonDefault
 * @property {string} type - Type of the button, must be default.
 */

/**
 * Describes why a request was unsuccessful.
 * @see {@link https://core.telegram.org/bots/api#responseparameters ResponseParameters}
 * @typedef {object} ResponseParameters
 * @property {number} [migrate_to_chat_id] - Optional. The group has been migrated to a supergroup with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
 * @property {number} [retry_after] - Optional. In case of exceeding flood control, the number of seconds left to wait before the request can be repeated.
 */

/**
 * Represents a photo to be sent.
 * @see {@link https://core.telegram.org/bots/api#inputmediaphoto InputMediaPhoto}
 * @typedef {object} InputMediaPhoto
 * @property {string} type - Type of the result, must be photo.
 * @property {string} media - File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {string} [caption] - Optional. Caption of the photo to be sent, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the photo caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {boolean} [has_spoiler] - Optional. Pass True if the photo needs to be covered with a spoiler animation.
 */

/**
 * Represents a video to be sent.
 * @see {@link https://core.telegram.org/bots/api#inputmediavideo InputMediaVideo}
 * @typedef {object} InputMediaVideo
 * @property {string} type - Type of the result, must be video.
 * @property {string} media - File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {InputFile|string} [thumbnail] - Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {string} [caption] - Optional. Caption of the video to be sent, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the video caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {number} [width] - Optional. Video width.
 * @property {number} [height] - Optional. Video height.
 * @property {number} [duration] - Optional. Video duration in seconds.
 * @property {boolean} [supports_streaming] - Optional. Pass True if the uploaded video is suitable for streaming.
 * @property {boolean} [has_spoiler] - Optional. Pass True if the video needs to be covered with a spoiler animation.
 */

/**
 * Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent.
 * @see {@link https://core.telegram.org/bots/api#inputmediaanimation InputMediaAnimation}
 * @typedef {object} InputMediaAnimation
 * @property {string} type - Type of the result, must be animation.
 * @property {string} media - File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {InputFile|string} [thumbnail] - Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {string} [caption] - Optional. Caption of the animation to be sent, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the animation caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {number} [width] - Optional. Animation width.
 * @property {number} [height] - Optional. Animation height.
 * @property {number} [duration] - Optional. Animation duration in seconds.
 * @property {boolean} [has_spoiler] - Optional. Pass True if the animation needs to be covered with a spoiler animation.
 */

/**
 * Represents an audio file to be treated as music to be sent.
 * @see {@link https://core.telegram.org/bots/api#inputmediaaudio InputMediaAudio}
 * @typedef {object} InputMediaAudio
 * @property {string} type - Type of the result, must be audio.
 * @property {string} media - File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {InputFile|string} [thumbnail] - Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {string} [caption] - Optional. Caption of the audio to be sent, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the audio caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {number} [duration] - Optional. Duration of the audio in seconds.
 * @property {string} [performer] - Optional. Performer of the audio.
 * @property {string} [title] - Optional. Title of the audio.
 */

/**
 * Represents a general file to be sent.
 * @see {@link https://core.telegram.org/bots/api#inputmediadocument InputMediaDocument}
 * @typedef {object} InputMediaDocument
 * @property {string} type - Type of the result, must be document.
 * @property {string} media - File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {InputFile|string} [thumbnail] - Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {string} [caption] - Optional. Caption of the document to be sent, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the document caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {boolean} [disable_content_type_detection] - Optional. Disables automatic server-side content type detection for files uploaded using multipart/form-data. Always True, if the document is sent as part of an album.
 */

/**
 * This object represents a sticker.
 * @see {@link https://core.telegram.org/bots/api#sticker Sticker}
 * @typedef {object} Sticker
 * @property {string} file_id - Identifier for this file, which can be used to download or reuse the file.
 * @property {string} file_unique_id - Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {string} type - Type of the sticker, currently one of "regular", "mask", "custom_emoji". The type of the sticker is independent from its format, which is determined by the fields is_animated and is_video.
 * @property {number} width - Sticker width.
 * @property {number} height - Sticker height.
 * @property {boolean} is_animated - True, if the sticker is animated.
 * @property {boolean} is_video - True, if the sticker is a video sticker.
 * @property {PhotoSize} [thumbnail] - Optional. Sticker thumbnail in the .WEBP or .JPG format.
 * @property {string} [emoji] - Optional. Emoji associated with the sticker.
 * @property {string} [set_name] - Optional. Name of the sticker set to which the sticker belongs.
 * @property {File} [premium_animation] - Optional. For premium regular stickers, premium animation for the sticker.
 * @property {MaskPosition} [mask_position] - Optional. For mask stickers, the position where the mask should be placed.
 * @property {string} [custom_emoji_id] - Optional. For custom emoji stickers, unique identifier of the custom emoji.
 * @property {boolean} [needs_repainting] - Optional. True, if the sticker must be repainted to a text color in messages, the color of the Telegram Premium badge in emoji status, white color on chat photos, or another appropriate color in other places.
 * @property {number} [file_size] - Optional. File size in bytes.
 */

/**
 * This object represents a sticker set.
 * @see {@link https://core.telegram.org/bots/api#stickerset StickerSet}
 * @typedef {object} StickerSet
 * @property {string} name - Sticker set name.
 * @property {string} title - Sticker set title.
 * @property {string} sticker_type - Type of stickers in the set, currently one of "regular", "mask", "custom_emoji".
 * @property {boolean} is_animated - True, if the sticker set contains animated stickers.
 * @property {boolean} is_video - True, if the sticker set contains video stickers.
 * @property {Sticker[]} stickers - List of all set stickers.
 * @property {PhotoSize} [thumbnail] - Optional. Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format.
 */

/**
 * This object describes the position on faces where a mask should be placed by default.
 * @see {@link https://core.telegram.org/bots/api#maskposition MaskPosition}
 * @typedef {object} MaskPosition
 * @property {string} point - The part of the face relative to which the mask should be placed. One of "forehead", "eyes", "mouth", or "chin".
 * @property {number} x_shift - Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position.
 * @property {number} y_shift - Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position.
 * @property {number} scale - Mask scaling coefficient. For example, 2.0 means double size.
 */

/**
 * This object describes a sticker to be added to a sticker set.
 * @see {@link https://core.telegram.org/bots/api#inputsticker InputSticker}
 * @typedef {object} InputSticker
 * @property {InputFile|string} sticker - The added sticker. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, upload a new one using multipart/form-data, or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name. Animated and video stickers can't be uploaded via HTTP URL. More information on Sending Files: https://core.telegram.org/bots/api#sending-files.
 * @property {string[]} emoji_list - List of 1-20 emoji associated with the sticker.
 * @property {MaskPosition} [mask_position] - Optional. Position where the mask should be placed on faces. For "mask" stickers only.
 * @property {string[]} [keywords] - Optional. List of 0-20 search keywords for the sticker with total length of up to 64 characters. For "regular" and "custom_emoji" stickers only.
 */

/**
 * This object represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results.
 * @see {@link https://core.telegram.org/bots/api#inlinequery InlineQuery}
 * @typedef {object} InlineQuery
 * @property {string} id - Unique identifier for this query.
 * @property {User} from - Sender.
 * @property {string} query - Text of the query (up to 256 characters).
 * @property {string} offset - Offset of the results to be returned, can be controlled by the bot.
 * @property {string} [chat_type] - Optional. Type of the chat from which the inline query was sent. Can be either "sender" for a private chat with the inline query sender, "private", "group", "supergroup", or "channel". The chat type should be always known for requests sent from official clients and most third-party clients, unless the request was sent from a secret chat.
 * @property {Location} [location] - Optional. Sender location, only for bots that request user location.
 */

/**
 * This object represents a button to be shown above inline query results. You must use exactly one of the optional fields.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultsbutton InlineQueryResultsButton}
 * @typedef {object} InlineQueryResultsButton
 * @property {string} text - Label text on the button.
 * @property {WebAppInfo} [web_app] - Optional. Description of the Web App that will be launched when the user presses the button. The Web App will be able to switch back to the inline mode using the method switchInlineQuery inside the Web App.
 * @property {string} [start_parameter] - Optional. Deep-linking parameter for the /start message sent to the bot when a user presses the button. 1-64 characters, only A-Z, a-z, 0-9, _ and - are allowed. Example: An inline bot that sends YouTube videos can ask the user to connect the bot to their YouTube account to adapt search results accordingly. To do this, it displays a 'Connect your YouTube account' button above the results, or even before showing any. The user presses the button, switches to a private chat with the bot and, in doing so, passes a start parameter that instructs the bot to return an OAuth link. Once done, the bot can offer a switch_inline button so that the user can easily return to the chat where they wanted to use the bot's inline capabilities.
 */

/**
 * Represents a link to an article or web page.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultarticle InlineQueryResultArticle}
 * @typedef {object} InlineQueryResultArticle
 * @property {string} type - Type of the result, must be article.
 * @property {string} id - Unique identifier for this result, 1-64 Bytes.
 * @property {string} title - Title of the result.
 * @property {InputMessageContent} input_message_content - Content of the message to be sent.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {string} [url] - Optional. URL of the result.
 * @property {boolean} [hide_url] - Optional. Pass True if you don't want the URL to be shown in the message.
 * @property {string} [description] - Optional. Short description of the result.
 * @property {string} [thumbnail_url] - Optional. Url of the thumbnail for the result.
 * @property {number} [thumbnail_width] - Optional. Thumbnail width.
 * @property {number} [thumbnail_height] - Optional. Thumbnail height.
 */

/**
 * Represents a link to a photo. By default, this photo will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the photo.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultphoto InlineQueryResultPhoto}
 * @typedef {object} InlineQueryResultPhoto
 * @property {string} type - Type of the result, must be photo.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} photo_url - A valid URL of the photo. Photo must be in JPEG format. Photo size must not exceed 5MB.
 * @property {string} thumbnail_url - URL of the thumbnail for the photo.
 * @property {number} [photo_width] - Optional. Width of the photo.
 * @property {number} [photo_height] - Optional. Height of the photo.
 * @property {string} [title] - Optional. Title for the result.
 * @property {string} [description] - Optional. Short description of the result.
 * @property {string} [caption] - Optional. Caption of the photo to be sent, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the photo caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the photo.
 */

/**
 * Represents a link to an animated GIF file. By default, this animated GIF file will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultgif InlineQueryResultGif}
 * @typedef {object} InlineQueryResultGif
 * @property {string} type - Type of the result, must be gif.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} gif_url - A valid URL for the GIF file. File size must not exceed 1MB.
 * @property {number} [gif_width] - Optional. Width of the GIF.
 * @property {number} [gif_height] - Optional. Height of the GIF.
 * @property {number} [gif_duration] - Optional. Duration of the GIF in seconds.
 * @property {string} thumbnail_url - URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result.
 * @property {string} [thumbnail_mime_type] - Optional. MIME type of the thumbnail, must be one of "image/jpeg", "image/gif", or "video/mp4". Defaults to "image/jpeg".
 * @property {string} [title] - Optional. Title for the result.
 * @property {string} [caption] - Optional. Caption of the GIF file to be sent, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the GIF animation.
 */

/**
 * Represents a link to a video animation (H.264/MPEG-4 AVC video without sound). By default, this animated MPEG-4 file will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultmpeg4gif InlineQueryResultMpeg4Gif}
 * @typedef {object} InlineQueryResultMpeg4Gif
 * @property {string} type - Type of the result, must be mpeg4_gif.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} mpeg4_url - A valid URL for the MPEG4 file. File size must not exceed 1MB.
 * @property {number} [mpeg4_width] - Optional. Video width.
 * @property {number} [mpeg4_height] - Optional. Video height.
 * @property {number} [mpeg4_duration] - Optional. Video duration in seconds.
 * @property {string} thumbnail_url - URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result.
 * @property {string} [thumbnail_mime_type] - Optional. MIME type of the thumbnail, must be one of "image/jpeg", "image/gif", or "video/mp4". Defaults to "image/jpeg".
 * @property {string} [title] - Optional. Title for the result.
 * @property {string} [caption] - Optional. Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the video animation.
 */

/**
 * Represents a link to a page containing an embedded video player or a video file. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the video.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultvideo InlineQueryResultVideo}
 * @typedef {object} InlineQueryResultVideo
 * @property {string} type - Type of the result, must be video.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} video_url - A valid URL for the embedded video player or video file.
 * @property {string} mime_type - MIME type of the content of the video URL, "text/html" or "video/mp4".
 * @property {string} thumbnail_url - URL of the thumbnail (JPEG only) for the video.
 * @property {string} title - Title for the result.
 * @property {string} [caption] - Optional. Caption of the video to be sent, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the video caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {number} [video_width] - Optional. Video width.
 * @property {number} [video_height] - Optional. Video height.
 * @property {number} [video_duration] - Optional. Video duration in seconds.
 * @property {string} [description] - Optional. Short description of the result.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the video. This field is required if InlineQueryResultVideo is used to send an HTML-page as a result (e.g., a YouTube video).
 */

/**
 * Represents a link to an MP3 audio file. By default, this audio file will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the audio.
 * Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultaudio InlineQueryResultAudio}
 * @typedef {object} InlineQueryResultAudio
 * @property {string} type - Type of the result, must be audio.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} audio_url - A valid URL for the audio file.
 * @property {string} title - Title.
 * @property {string} [caption] - Optional. Caption, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the audio caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {string} [performer] - Optional. Performer.
 * @property {number} [audio_duration] - Optional. Audio duration in seconds.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the audio.
 */

/**
 * Represents a link to a voice recording in an .OGG container encoded with OPUS. By default, this voice recording will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the the voice message.
 * Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultvoice InlineQueryResultVoice}
 * @typedef {object} InlineQueryResultVoice
 * @property {string} type - Type of the result, must be voice.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} voice_url - A valid URL for the voice recording.
 * @property {string} title - Recording title.
 * @property {string} [caption] - Optional. Caption, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the voice message caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {number} [voice_duration] - Optional. Recording duration in seconds.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the voice recording.
 */

/**
 * Represents a link to a file. By default, this file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the file. Currently, only .PDF and .ZIP files can be sent using this method.
 * Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultdocument InlineQueryResultDocument}
 * @typedef {object} InlineQueryResultDocument
 * @property {string} type - Type of the result, must be document.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} title - Title for the result.
 * @property {string} [caption] - Optional. Caption of the document to be sent, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the document caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {string} document_url - A valid URL for the file.
 * @property {string} mime_type - MIME type of the content of the file, either "application/pdf" or "application/zip".
 * @property {string} [description] - Optional. Short description of the result.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the file.
 * @property {string} [thumbnail_url] - Optional. URL of the thumbnail (JPEG only) for the file.
 * @property {number} [thumbnail_width] - Optional. Thumbnail width.
 * @property {number} [thumbnail_height] - Optional. Thumbnail height.
 */

/**
 * Represents a location on a map. By default, the location will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the location.
 * Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultlocation InlineQueryResultLocation}
 * @typedef {object} InlineQueryResultLocation
 * @property {string} type - Type of the result, must be location.
 * @property {string} id - Unique identifier for this result, 1-64 Bytes.
 * @property {number} latitude - Location latitude in degrees.
 * @property {number} longitude - Location longitude in degrees.
 * @property {string} title - Location title.
 * @property {number} [horizontal_accuracy] - Optional. The radius of uncertainty for the location, measured in meters; 0-1500.
 * @property {number} [live_period] - Optional. Period in seconds for which the location can be updated, should be between 60 and 86400.
 * @property {number} [heading] - Optional. For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
 * @property {number} [proximity_alert_radius] - Optional. For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the location.
 * @property {string} [thumbnail_url] - Optional. Url of the thumbnail for the result.
 * @property {number} [thumbnail_width] - Optional. Thumbnail width.
 * @property {number} [thumbnail_height] - Optional. Thumbnail height.
 */

/**
 * Represents a venue. By default, the venue will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the venue.
 * Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultvenue InlineQueryResultVenue}
 * @typedef {object} InlineQueryResultVenue
 * @property {string} type - Type of the result, must be venue.
 * @property {string} id - Unique identifier for this result, 1-64 Bytes.
 * @property {number} latitude - Latitude of the venue location in degrees.
 * @property {number} longitude - Longitude of the venue location in degrees.
 * @property {string} title - Title of the venue.
 * @property {string} address - Address of the venue.
 * @property {string} [foursquare_id] - Optional. Foursquare identifier of the venue if known.
 * @property {string} [foursquare_type] - Optional. Foursquare type of the venue, if known. (For example, "arts_entertainment/default", "arts_entertainment/aquarium" or "food/icecream".).
 * @property {string} [google_place_id] - Optional. Google Places identifier of the venue.
 * @property {string} [google_place_type] - Optional. Google Places type of the venue. (See supported types.).
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the venue.
 * @property {string} [thumbnail_url] - Optional. Url of the thumbnail for the result.
 * @property {number} [thumbnail_width] - Optional. Thumbnail width.
 * @property {number} [thumbnail_height] - Optional. Thumbnail height.
 */

/**
 * Represents a contact with a phone number. By default, this contact will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the contact.
 * Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultcontact InlineQueryResultContact}
 * @typedef {object} InlineQueryResultContact
 * @property {string} type - Type of the result, must be contact.
 * @property {string} id - Unique identifier for this result, 1-64 Bytes.
 * @property {string} phone_number - Contact's phone number.
 * @property {string} first_name - Contact's first name.
 * @property {string} [last_name] - Optional. Contact's last name.
 * @property {string} [vcard] - Optional. Additional data about the contact in the form of a vCard, 0-2048 bytes.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the contact.
 * @property {string} [thumbnail_url] - Optional. Url of the thumbnail for the result.
 * @property {number} [thumbnail_width] - Optional. Thumbnail width.
 * @property {number} [thumbnail_height] - Optional. Thumbnail height.
 */

/**
 * Represents a Game.
 * Note: This will only work in Telegram versions released after October 1, 2016. Older clients will not display any inline results if a game result is among them.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultgame InlineQueryResultGame}
 * @typedef {object} InlineQueryResultGame
 * @property {string} type - Type of the result, must be game.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} game_short_name - Short name of the game.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 */

/**
 * Represents a link to a photo stored on the Telegram servers. By default, this photo will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the photo.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultcachedphoto InlineQueryResultCachedPhoto}
 * @typedef {object} InlineQueryResultCachedPhoto
 * @property {string} type - Type of the result, must be photo.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} photo_file_id - A valid file identifier of the photo.
 * @property {string} [title] - Optional. Title for the result.
 * @property {string} [description] - Optional. Short description of the result.
 * @property {string} [caption] - Optional. Caption of the photo to be sent, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the photo caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the photo.
 */

/**
 * Represents a link to an animated GIF file stored on the Telegram servers. By default, this animated GIF file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with specified content instead of the animation.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultcachedgif InlineQueryResultCachedGif}
 * @typedef {object} InlineQueryResultCachedGif
 * @property {string} type - Type of the result, must be gif.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} gif_file_id - A valid file identifier for the GIF file.
 * @property {string} [title] - Optional. Title for the result.
 * @property {string} [caption] - Optional. Caption of the GIF file to be sent, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the GIF animation.
 */

/**
 * Represents a link to a video animation (H.264/MPEG-4 AVC video without sound) stored on the Telegram servers. By default, this animated MPEG-4 file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultcachedmpeg4gif InlineQueryResultCachedMpeg4Gif}
 * @typedef {object} InlineQueryResultCachedMpeg4Gif
 * @property {string} type - Type of the result, must be mpeg4_gif.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} mpeg4_file_id - A valid file identifier for the MPEG4 file.
 * @property {string} [title] - Optional. Title for the result.
 * @property {string} [caption] - Optional. Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the video animation.
 */

/**
 * Represents a link to a sticker stored on the Telegram servers. By default, this sticker will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the sticker.
 * Note: This will only work in Telegram versions released after 9 April, 2016 for static stickers and after 06 July, 2019 for animated stickers. Older clients will ignore them.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultcachedsticker InlineQueryResultCachedSticker}
 * @typedef {object} InlineQueryResultCachedSticker
 * @property {string} type - Type of the result, must be sticker.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} sticker_file_id - A valid file identifier of the sticker.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the sticker.
 */

/**
 * Represents a link to a file stored on the Telegram servers. By default, this file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the file.
 * Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultcacheddocument InlineQueryResultCachedDocument}
 * @typedef {object} InlineQueryResultCachedDocument
 * @property {string} type - Type of the result, must be document.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} title - Title for the result.
 * @property {string} document_file_id - A valid file identifier for the file.
 * @property {string} [description] - Optional. Short description of the result.
 * @property {string} [caption] - Optional. Caption of the document to be sent, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the document caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the file.
 */

/**
 * Represents a link to a video file stored on the Telegram servers. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the video.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultcachedvideo InlineQueryResultCachedVideo}
 * @typedef {object} InlineQueryResultCachedVideo
 * @property {string} type - Type of the result, must be video.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} video_file_id - A valid file identifier for the video file.
 * @property {string} title - Title for the result.
 * @property {string} [description] - Optional. Short description of the result.
 * @property {string} [caption] - Optional. Caption of the video to be sent, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the video caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the video.
 */

/**
 * Represents a link to a voice message stored on the Telegram servers. By default, this voice message will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the voice message.
 * Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultcachedvoice InlineQueryResultCachedVoice}
 * @typedef {object} InlineQueryResultCachedVoice
 * @property {string} type - Type of the result, must be voice.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} voice_file_id - A valid file identifier for the voice message.
 * @property {string} title - Voice message title.
 * @property {string} [caption] - Optional. Caption, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the voice message caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the voice message.
 */

/**
 * Represents a link to an MP3 audio file stored on the Telegram servers. By default, this audio file will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the audio.
 * Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them.
 * @see {@link https://core.telegram.org/bots/api#inlinequeryresultcachedaudio InlineQueryResultCachedAudio}
 * @typedef {object} InlineQueryResultCachedAudio
 * @property {string} type - Type of the result, must be audio.
 * @property {string} id - Unique identifier for this result, 1-64 bytes.
 * @property {string} audio_file_id - A valid file identifier for the audio file.
 * @property {string} [caption] - Optional. Caption, 0-1024 characters after entities parsing.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the audio caption. See formatting options for more details.
 * @property {MessageEntity[]} [caption_entities] - Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode.
 * @property {InlineKeyboardMarkup} [reply_markup] - Optional. Inline keyboard attached to the message.
 * @property {InputMessageContent} [input_message_content] - Optional. Content of the message to be sent instead of the audio.
 */

/**
 * Represents the content of a text message to be sent as the result of an inline query.
 * @see {@link https://core.telegram.org/bots/api#inputtextmessagecontent InputTextMessageContent}
 * @typedef {object} InputTextMessageContent
 * @property {string} message_text - Text of the message to be sent, 1-4096 characters.
 * @property {string} [parse_mode] - Optional. Mode for parsing entities in the message text. See formatting options for more details.
 * @property {MessageEntity[]} [entities] - Optional. List of special entities that appear in message text, which can be specified instead of parse_mode.
 * @property {boolean} [disable_web_page_preview] - Optional. Disables link previews for links in the sent message.
 */

/**
 * Represents the content of a location message to be sent as the result of an inline query.
 * @see {@link https://core.telegram.org/bots/api#inputlocationmessagecontent InputLocationMessageContent}
 * @typedef {object} InputLocationMessageContent
 * @property {number} latitude - Latitude of the location in degrees.
 * @property {number} longitude - Longitude of the location in degrees.
 * @property {number} [horizontal_accuracy] - Optional. The radius of uncertainty for the location, measured in meters; 0-1500.
 * @property {number} [live_period] - Optional. Period in seconds for which the location can be updated, should be between 60 and 86400.
 * @property {number} [heading] - Optional. For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
 * @property {number} [proximity_alert_radius] - Optional. For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified.
 */

/**
 * Represents the content of a venue message to be sent as the result of an inline query.
 * @see {@link https://core.telegram.org/bots/api#inputvenuemessagecontent InputVenueMessageContent}
 * @typedef {object} InputVenueMessageContent
 * @property {number} latitude - Latitude of the venue in degrees.
 * @property {number} longitude - Longitude of the venue in degrees.
 * @property {string} title - Name of the venue.
 * @property {string} address - Address of the venue.
 * @property {string} [foursquare_id] - Optional. Foursquare identifier of the venue, if known.
 * @property {string} [foursquare_type] - Optional. Foursquare type of the venue, if known. (For example, "arts_entertainment/default", "arts_entertainment/aquarium" or "food/icecream".).
 * @property {string} [google_place_id] - Optional. Google Places identifier of the venue.
 * @property {string} [google_place_type] - Optional. Google Places type of the venue. (See supported types.).
 */

/**
 * Represents the content of a contact message to be sent as the result of an inline query.
 * @see {@link https://core.telegram.org/bots/api#inputcontactmessagecontent InputContactMessageContent}
 * @typedef {object} InputContactMessageContent
 * @property {string} phone_number - Contact's phone number.
 * @property {string} first_name - Contact's first name.
 * @property {string} [last_name] - Optional. Contact's last name.
 * @property {string} [vcard] - Optional. Additional data about the contact in the form of a vCard, 0-2048 bytes.
 */

/**
 * Represents the content of an invoice message to be sent as the result of an inline query.
 * @see {@link https://core.telegram.org/bots/api#inputinvoicemessagecontent InputInvoiceMessageContent}
 * @typedef {object} InputInvoiceMessageContent
 * @property {string} title - Product name, 1-32 characters.
 * @property {string} description - Product description, 1-255 characters.
 * @property {string} payload - Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes.
 * @property {string} provider_token - Payment provider token, obtained via @BotFather.
 * @property {string} currency - Three-letter ISO 4217 currency code, see more on currencies.
 * @property {LabeledPrice[]} prices - Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.).
 * @property {number} [max_tip_amount] - Optional. The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0.
 * @property {number[]} [suggested_tip_amounts] - Optional. A JSON-serialized array of suggested amounts of tip in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount.
 * @property {string} [provider_data] - Optional. A JSON-serialized object for data about the invoice, which will be shared with the payment provider. A detailed description of the required fields should be provided by the payment provider.
 * @property {string} [photo_url] - Optional. URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service.
 * @property {number} [photo_size] - Optional. Photo size in bytes.
 * @property {number} [photo_width] - Optional. Photo width.
 * @property {number} [photo_height] - Optional. Photo height.
 * @property {boolean} [need_name] - Optional. Pass True if you require the user's full name to complete the order.
 * @property {boolean} [need_phone_number] - Optional. Pass True if you require the user's phone number to complete the order.
 * @property {boolean} [need_email] - Optional. Pass True if you require the user's email address to complete the order.
 * @property {boolean} [need_shipping_address] - Optional. Pass True if you require the user's shipping address to complete the order.
 * @property {boolean} [send_phone_number_to_provider] - Optional. Pass True if the user's phone number should be sent to provider.
 * @property {boolean} [send_email_to_provider] - Optional. Pass True if the user's email address should be sent to provider.
 * @property {boolean} [is_flexible] - Optional. Pass True if the final price depends on the shipping method.
 */

/**
 * Represents a result of an inline query that was chosen by the user and sent to their chat partner.
 * Note: It is necessary to enable inline feedback via @BotFather in order to receive these objects in updates.
 * @see {@link https://core.telegram.org/bots/api#choseninlineresult ChosenInlineResult}
 * @typedef {object} ChosenInlineResult
 * @property {string} result_id - The unique identifier for the result that was chosen.
 * @property {User} from - The user that chose the result.
 * @property {Location} [location] - Optional. Sender location, only for bots that require user location.
 * @property {string} [inline_message_id] - Optional. Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. Will be also received in callback queries and can be used to edit the message.
 * @property {string} query - The query that was used to obtain the result.
 */

/**
 * Describes an inline message sent by a Web App on behalf of a user.
 * @see {@link https://core.telegram.org/bots/api#sentwebappmessage SentWebAppMessage}
 * @typedef {object} SentWebAppMessage
 * @property {string} [inline_message_id] - Optional. Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message.
 */

/**
 * This object represents a portion of the price for goods or services.
 * @see {@link https://core.telegram.org/bots/api#labeledprice LabeledPrice}
 * @typedef {object} LabeledPrice
 * @property {string} label - Portion label.
 * @property {number} amount - Price of the product in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
 */

/**
 * This object contains basic information about an invoice.
 * @see {@link https://core.telegram.org/bots/api#invoice Invoice}
 * @typedef {object} Invoice
 * @property {string} title - Product name.
 * @property {string} description - Product description.
 * @property {string} start_parameter - Unique bot deep-linking parameter that can be used to generate this invoice.
 * @property {string} currency - Three-letter ISO 4217 currency code.
 * @property {number} total_amount - Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
 */

/**
 * This object represents a shipping address.
 * @see {@link https://core.telegram.org/bots/api#shippingaddress ShippingAddress}
 * @typedef {object} ShippingAddress
 * @property {string} country_code - Two-letter ISO 3166-1 alpha-2 country code.
 * @property {string} state - State, if applicable.
 * @property {string} city - City.
 * @property {string} street_line1 - First line for the address.
 * @property {string} street_line2 - Second line for the address.
 * @property {string} post_code - Address post code.
 */

/**
 * This object represents information about an order.
 * @see {@link https://core.telegram.org/bots/api#orderinfo OrderInfo}
 * @typedef {object} OrderInfo
 * @property {string} [name] - Optional. User name.
 * @property {string} [phone_number] - Optional. User's phone number.
 * @property {string} [email] - Optional. User email.
 * @property {ShippingAddress} [shipping_address] - Optional. User shipping address.
 */

/**
 * This object represents one shipping option.
 * @see {@link https://core.telegram.org/bots/api#shippingoption ShippingOption}
 * @typedef {object} ShippingOption
 * @property {string} id - Shipping option identifier.
 * @property {string} title - Option title.
 * @property {LabeledPrice[]} prices - List of price portions.
 */

/**
 * This object contains basic information about a successful payment.
 * @see {@link https://core.telegram.org/bots/api#successfulpayment SuccessfulPayment}
 * @typedef {object} SuccessfulPayment
 * @property {string} currency - Three-letter ISO 4217 currency code.
 * @property {number} total_amount - Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
 * @property {string} invoice_payload - Bot specified invoice payload.
 * @property {string} [shipping_option_id] - Optional. Identifier of the shipping option chosen by the user.
 * @property {OrderInfo} [order_info] - Optional. Order information provided by the user.
 * @property {string} telegram_payment_charge_id - Telegram payment identifier.
 * @property {string} provider_payment_charge_id - Provider payment identifier.
 */

/**
 * This object contains information about an incoming shipping query.
 * @see {@link https://core.telegram.org/bots/api#shippingquery ShippingQuery}
 * @typedef {object} ShippingQuery
 * @property {string} id - Unique query identifier.
 * @property {User} from - User who sent the query.
 * @property {string} invoice_payload - Bot specified invoice payload.
 * @property {ShippingAddress} shipping_address - User specified shipping address.
 */

/**
 * This object contains information about an incoming pre-checkout query.
 * @see {@link https://core.telegram.org/bots/api#precheckoutquery PreCheckoutQuery}
 * @typedef {object} PreCheckoutQuery
 * @property {string} id - Unique query identifier.
 * @property {User} from - User who sent the query.
 * @property {string} currency - Three-letter ISO 4217 currency code.
 * @property {number} total_amount - Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
 * @property {string} invoice_payload - Bot specified invoice payload.
 * @property {string} [shipping_option_id] - Optional. Identifier of the shipping option chosen by the user.
 * @property {OrderInfo} [order_info] - Optional. Order information provided by the user.
 */

/**
 * Describes Telegram Passport data shared with the bot by the user.
 * @see {@link https://core.telegram.org/bots/api#passportdata PassportData}
 * @typedef {object} PassportData
 * @property {EncryptedPassportElement[]} data - Array with information about documents and other Telegram Passport elements that was shared with the bot.
 * @property {EncryptedCredentials} credentials - Encrypted credentials required to decrypt the data.
 */

/**
 * This object represents a file uploaded to Telegram Passport. Currently all Telegram Passport files are in JPEG format when decrypted and don't exceed 10MB.
 * @see {@link https://core.telegram.org/bots/api#passportfile PassportFile}
 * @typedef {object} PassportFile
 * @property {string} file_id - Identifier for this file, which can be used to download or reuse the file.
 * @property {string} file_unique_id - Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {number} file_size - File size in bytes.
 * @property {number} file_date - Unix time when the file was uploaded.
 */

/**
 * Describes documents or other Telegram Passport elements shared with the bot by the user.
 * @see {@link https://core.telegram.org/bots/api#encryptedpassportelement EncryptedPassportElement}
 * @typedef {object} EncryptedPassportElement
 * @property {string} type - Element type. One of "personal_details", "passport", "driver_license", "identity_card", "internal_passport", "address", "utility_bill", "bank_statement", "rental_agreement", "passport_registration", "temporary_registration", "phone_number", "email".
 * @property {string} [data] - Optional. Base64-encoded encrypted Telegram Passport element data provided by the user, available for "personal_details", "passport", "driver_license", "identity_card", "internal_passport" and "address" types. Can be decrypted and verified using the accompanying EncryptedCredentials.
 * @property {string} [phone_number] - Optional. User's verified phone number, available only for "phone_number" type.
 * @property {string} [email] - Optional. User's verified email address, available only for "email" type.
 * @property {PassportFile[]} [files] - Optional. Array of encrypted files with documents provided by the user, available for "utility_bill", "bank_statement", "rental_agreement", "passport_registration" and "temporary_registration" types. Files can be decrypted and verified using the accompanying EncryptedCredentials.
 * @property {PassportFile} [front_side] - Optional. Encrypted file with the front side of the document, provided by the user. Available for "passport", "driver_license", "identity_card" and "internal_passport". The file can be decrypted and verified using the accompanying EncryptedCredentials.
 * @property {PassportFile} [reverse_side] - Optional. Encrypted file with the reverse side of the document, provided by the user. Available for "driver_license" and "identity_card". The file can be decrypted and verified using the accompanying EncryptedCredentials.
 * @property {PassportFile} [selfie] - Optional. Encrypted file with the selfie of the user holding a document, provided by the user; available for "passport", "driver_license", "identity_card" and "internal_passport". The file can be decrypted and verified using the accompanying EncryptedCredentials.
 * @property {PassportFile[]} [translation] - Optional. Array of encrypted files with translated versions of documents provided by the user. Available if requested for "passport", "driver_license", "identity_card", "internal_passport", "utility_bill", "bank_statement", "rental_agreement", "passport_registration" and "temporary_registration" types. Files can be decrypted and verified using the accompanying EncryptedCredentials.
 * @property {string} hash - Base64-encoded element hash for using in PassportElementErrorUnspecified.
 */

/**
 * Describes data required for decrypting and authenticating EncryptedPassportElement. See the Telegram Passport Documentation for a complete description of the data decryption and authentication processes.
 * @see {@link https://core.telegram.org/bots/api#encryptedcredentials EncryptedCredentials}
 * @typedef {object} EncryptedCredentials
 * @property {string} data - Base64-encoded encrypted JSON-serialized data with unique user's payload, data hashes and secrets required for EncryptedPassportElement decryption and authentication.
 * @property {string} hash - Base64-encoded data hash for data authentication.
 * @property {string} secret - Base64-encoded secret, encrypted with the bot's public RSA key, required for data decryption.
 */

/**
 * Represents an issue in one of the data fields that was provided by the user. The error is considered resolved when the field's value changes.
 * @see {@link https://core.telegram.org/bots/api#passportelementerrordatafield PassportElementErrorDataField}
 * @typedef {object} PassportElementErrorDataField
 * @property {string} source - Error source, must be data.
 * @property {string} type - The section of the user's Telegram Passport which has the error, one of "personal_details", "passport", "driver_license", "identity_card", "internal_passport", "address".
 * @property {string} field_name - Name of the data field which has the error.
 * @property {string} data_hash - Base64-encoded data hash.
 * @property {string} message - Error message.
 */

/**
 * Represents an issue with the front side of a document. The error is considered resolved when the file with the front side of the document changes.
 * @see {@link https://core.telegram.org/bots/api#passportelementerrorfrontside PassportElementErrorFrontSide}
 * @typedef {object} PassportElementErrorFrontSide
 * @property {string} source - Error source, must be front_side.
 * @property {string} type - The section of the user's Telegram Passport which has the issue, one of "passport", "driver_license", "identity_card", "internal_passport".
 * @property {string} file_hash - Base64-encoded hash of the file with the front side of the document.
 * @property {string} message - Error message.
 */

/**
 * Represents an issue with the reverse side of a document. The error is considered resolved when the file with reverse side of the document changes.
 * @see {@link https://core.telegram.org/bots/api#passportelementerrorreverseside PassportElementErrorReverseSide}
 * @typedef {object} PassportElementErrorReverseSide
 * @property {string} source - Error source, must be reverse_side.
 * @property {string} type - The section of the user's Telegram Passport which has the issue, one of "driver_license", "identity_card".
 * @property {string} file_hash - Base64-encoded hash of the file with the reverse side of the document.
 * @property {string} message - Error message.
 */

/**
 * Represents an issue with the selfie with a document. The error is considered resolved when the file with the selfie changes.
 * @see {@link https://core.telegram.org/bots/api#passportelementerrorselfie PassportElementErrorSelfie}
 * @typedef {object} PassportElementErrorSelfie
 * @property {string} source - Error source, must be selfie.
 * @property {string} type - The section of the user's Telegram Passport which has the issue, one of "passport", "driver_license", "identity_card", "internal_passport".
 * @property {string} file_hash - Base64-encoded hash of the file with the selfie.
 * @property {string} message - Error message.
 */

/**
 * Represents an issue with a document scan. The error is considered resolved when the file with the document scan changes.
 * @see {@link https://core.telegram.org/bots/api#passportelementerrorfile PassportElementErrorFile}
 * @typedef {object} PassportElementErrorFile
 * @property {string} source - Error source, must be file.
 * @property {string} type - The section of the user's Telegram Passport which has the issue, one of "utility_bill", "bank_statement", "rental_agreement", "passport_registration", "temporary_registration".
 * @property {string} file_hash - Base64-encoded file hash.
 * @property {string} message - Error message.
 */

/**
 * Represents an issue with a list of scans. The error is considered resolved when the list of files containing the scans changes.
 * @see {@link https://core.telegram.org/bots/api#passportelementerrorfiles PassportElementErrorFiles}
 * @typedef {object} PassportElementErrorFiles
 * @property {string} source - Error source, must be files.
 * @property {string} type - The section of the user's Telegram Passport which has the issue, one of "utility_bill", "bank_statement", "rental_agreement", "passport_registration", "temporary_registration".
 * @property {string[]} file_hashes - List of base64-encoded file hashes.
 * @property {string} message - Error message.
 */

/**
 * Represents an issue with one of the files that constitute the translation of a document. The error is considered resolved when the file changes.
 * @see {@link https://core.telegram.org/bots/api#passportelementerrortranslationfile PassportElementErrorTranslationFile}
 * @typedef {object} PassportElementErrorTranslationFile
 * @property {string} source - Error source, must be translation_file.
 * @property {string} type - Type of element of the user's Telegram Passport which has the issue, one of "passport", "driver_license", "identity_card", "internal_passport", "utility_bill", "bank_statement", "rental_agreement", "passport_registration", "temporary_registration".
 * @property {string} file_hash - Base64-encoded file hash.
 * @property {string} message - Error message.
 */

/**
 * Represents an issue with the translated version of a document. The error is considered resolved when a file with the document translation change.
 * @see {@link https://core.telegram.org/bots/api#passportelementerrortranslationfiles PassportElementErrorTranslationFiles}
 * @typedef {object} PassportElementErrorTranslationFiles
 * @property {string} source - Error source, must be translation_files.
 * @property {string} type - Type of element of the user's Telegram Passport which has the issue, one of "passport", "driver_license", "identity_card", "internal_passport", "utility_bill", "bank_statement", "rental_agreement", "passport_registration", "temporary_registration".
 * @property {string[]} file_hashes - List of base64-encoded file hashes.
 * @property {string} message - Error message.
 */

/**
 * Represents an issue in an unspecified place. The error is considered resolved when new data is added.
 * @see {@link https://core.telegram.org/bots/api#passportelementerrorunspecified PassportElementErrorUnspecified}
 * @typedef {object} PassportElementErrorUnspecified
 * @property {string} source - Error source, must be unspecified.
 * @property {string} type - Type of element of the user's Telegram Passport which has the issue.
 * @property {string} element_hash - Base64-encoded element hash.
 * @property {string} message - Error message.
 */

/**
 * This object represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers.
 * @see {@link https://core.telegram.org/bots/api#game Game}
 * @typedef {object} Game
 * @property {string} title - Title of the game.
 * @property {string} description - Description of the game.
 * @property {PhotoSize[]} photo - Photo that will be displayed in the game message in chats.
 * @property {string} [text] - Optional. Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls setGameScore, or manually edited using editMessageText. 0-4096 characters.
 * @property {MessageEntity[]} [text_entities] - Optional. Special entities that appear in text, such as usernames, URLs, bot commands, etc.
 * @property {Animation} [animation] - Optional. Animation that will be displayed in the game message in chats. Upload via BotFather.
 */

/**
 * This object represents one row of the high scores table for a game.
 * @see {@link https://core.telegram.org/bots/api#gamehighscore GameHighScore}
 * @typedef {object} GameHighScore
 * @property {number} position - Position in high score table for the game.
 * @property {User} user - User.
 * @property {number} score - Score.
 */
