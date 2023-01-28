/**
 * Типы актуальны на 2023-01-28
 * @see https://core.telegram.org/bots/api
 */

/**
 * @typedef {{
 *   url: string|null;
 *   has_custom_certificate: boolean;
 *   pending_update_count: number;
 *   ip_address?: string;
 *   last_error_date?: number;
 *   last_error_message?: string;
 *   last_synchronization_error_date?: number;
 *   max_connections?: number;
 *   allowed_updates?: Array.<string|number>;
 * }} WebhookInfo
 */

/**
 * @typedef {{
 *   id: number;
 *   is_bot: boolean;
 *   first_name: string;
 *   last_name?: string;
 *   username?: string;
 *   language_code?: string;
 *   is_premium?: "true";
 *   added_to_attachment_menu?: "true";
 *   can_join_groups?: boolean;
 *   can_read_all_group_messages?: boolean;
 *   supports_inline_queries?: boolean;
 * }} User
 */

/**
 * @typedef {{
 *   id: number;
 *   type: string;
 *   title?: string;
 *   username?: string;
 *   first_name?: string;
 *   last_name?: string;
 *   is_forum?: "true";
 *   photo?: ChatPhoto;
 *   active_usernames?: string[];
 *   emoji_status_custom_emoji_id?: string;
 *   bio?: string;
 *   has_private_forwards?: "true";
 *   has_restricted_voice_and_video_messages?: "true";
 *   join_to_send_messages?: "true";
 *   join_by_request?: "true";
 *   description?: string;
 *   invite_link?: string;
 *   pinned_message?: Message;
 *   permissions?: ChatPermissions;
 *   slow_mode_delay?: number;
 *   message_auto_delete_time?: number;
 *   has_aggressive_anti_spam_enabled?: "true";
 *   has_hidden_members?: "true";
 *   has_protected_content?: "true";
 *   sticker_set_name?: string;
 *   can_set_sticker_set?: "true";
 *   linked_chat_id?: number;
 *   location?: ChatLocation;
 * }} Chat
 */

/**
 * @typedef {{
 *   message_id: number;
 *   message_thread_id?: number;
 *   from?: User;
 *   sender_chat?: Chat;
 *   date: number;
 *   chat: Chat;
 *   forward_from?: User;
 *   forward_from_chat?: Chat;
 *   forward_from_message_id?: number;
 *   forward_signature?: string;
 *   forward_sender_name?: string;
 *   forward_date?: number;
 *   is_topic_message?: "true";
 *   is_automatic_forward?: "true";
 *   reply_to_message?: Message;
 *   via_bot?: User;
 *   edit_date?: number;
 *   has_protected_content?: "true";
 *   media_group_id?: string;
 *   author_signature?: string;
 *   text?: string;
 *   entities?: MessageEntity[];
 *   animation?: Animation;
 *   audio?: Audio;
 *   document?: Document;
 *   photo?: PhotoSize[];
 *   sticker?: Sticker;
 *   video?: Video;
 *   video_note?: VideoNote;
 *   voice?: Voice;
 *   caption?: string;
 *   caption_entities?: MessageEntity[];
 *   has_media_spoiler?: "true";
 *   contact?: Contact;
 *   dice?: Dice;
 *   game?: Game;
 *   poll?: Poll;
 *   venue?: Venue;
 *   location?: Location;
 *   new_chat_members?: User[];
 *   left_chat_member?: User;
 *   new_chat_title?: string;
 *   new_chat_photo?: PhotoSize[];
 *   delete_chat_photo?: "true";
 *   group_chat_created?: "true";
 *   supergroup_chat_created?: "true";
 *   channel_chat_created?: "true";
 *   message_auto_delete_timer_changed?: MessageAutoDeleteTimerChanged;
 *   migrate_to_chat_id?: number;
 *   migrate_from_chat_id?: number;
 *   pinned_message?: Message;
 *   invoice?: Invoice;
 *   successful_payment?: SuccessfulPayment;
 *   connected_website?: string;
 *   write_access_allowed?: WriteAccessAllowed;
 *   passport_data?: PassportData;
 *   proximity_alert_triggered?: ProximityAlertTriggered;
 *   forum_topic_created?: ForumTopicCreated;
 *   forum_topic_edited?: ForumTopicEdited;
 *   forum_topic_closed?: ForumTopicClosed;
 *   forum_topic_reopened?: ForumTopicReopened;
 *   general_forum_topic_hidden?: GeneralForumTopicHidden;
 *   general_forum_topic_unhidden?: GeneralForumTopicUnhidden;
 *   video_chat_scheduled?: VideoChatScheduled;
 *   video_chat_started?: VideoChatStarted;
 *   video_chat_ended?: VideoChatEnded;
 *   video_chat_participants_invited?: VideoChatParticipantsInvited;
 *   web_app_data?: WebAppData;
 *   reply_markup?: InlineKeyboardMarkup;
 * }} Message
 */

/**
 * @typedef {{
 *   message_id: number;
 * }} MessageId
 */

/**
 * @typedef {{
 *   type: string;
 *   offset: number;
 *   length: number;
 *   url?: string;
 *   user?: User;
 *   language?: string;
 *   custom_emoji_id?: string;
 * }} MessageEntity
 */

/**
 * @typedef {{
 *   file_id: string;
 *   file_unique_id: string;
 *   width: number;
 *   height: number;
 *   file_size?: number;
 * }} PhotoSize
 */

/**
 * @typedef {{
 *   file_id: string;
 *   file_unique_id: string;
 *   width: number;
 *   height: number;
 *   duration: number;
 *   thumb?: PhotoSize;
 *   file_name?: string;
 *   mime_type?: string;
 *   file_size?: number;
 * }} Animation
 */

/**
 * @typedef {{
 *   file_id: string;
 *   file_unique_id: string;
 *   duration: number;
 *   performer?: string;
 *   title?: string;
 *   file_name?: string;
 *   mime_type?: string;
 *   file_size?: number;
 *   thumb?: PhotoSize;
 * }} Audio
 */

/**
 * @typedef {{
 *   file_id: string;
 *   file_unique_id: string;
 *   thumb?: PhotoSize;
 *   file_name?: string;
 *   mime_type?: string;
 *   file_size?: number;
 * }} Document
 */

/**
 * @typedef {{
 *   file_id: string;
 *   file_unique_id: string;
 *   width: number;
 *   height: number;
 *   duration: number;
 *   thumb?: PhotoSize;
 *   file_name?: string;
 *   mime_type?: string;
 *   file_size?: number;
 * }} Video
 */

/**
 * @typedef {{
 *   file_id: string;
 *   file_unique_id: string;
 *   length: number;
 *   duration: number;
 *   thumb?: PhotoSize;
 *   file_size?: number;
 * }} VideoNote
 */

/**
 * @typedef {{
 *   file_id: string;
 *   file_unique_id: string;
 *   duration: number;
 *   mime_type?: string;
 *   file_size?: number;
 * }} Voice
 */

/**
 * @typedef {{
 *   phone_number: string;
 *   first_name: string;
 *   last_name?: string;
 *   user_id?: number;
 *   vcard?: string;
 * }} Contact
 */

/**
 * @typedef {{
 *   emoji: string;
 *   value: number;
 * }} Dice
 */

/**
 * @typedef {{
 *   text: string;
 *   voter_count: number;
 * }} PollOption
 */

/**
 * @typedef {{
 *   poll_id: string;
 *   user: User;
 *   option_ids: number[];
 * }} PollAnswer
 */

/**
 * @typedef {{
 *   id: string;
 *   question: string;
 *   options: PollOption[];
 *   total_voter_count: number;
 *   is_closed: boolean;
 *   is_anonymous: boolean;
 *   type: string;
 *   allows_multiple_answers: boolean;
 *   correct_option_id?: number;
 *   explanation?: string;
 *   explanation_entities?: MessageEntity[];
 *   open_period?: number;
 *   close_date?: number;
 * }} Poll
 */

/**
 * @typedef {{
 *   longitude: number;
 *   latitude: number;
 *   horizontal_accuracy?: number;
 *   live_period?: number;
 *   heading?: number;
 *   proximity_alert_radius?: number;
 * }} Location
 */

/**
 * @typedef {{
 *   location: Location;
 *   title: string;
 *   address: string;
 *   foursquare_id?: string;
 *   foursquare_type?: string;
 *   google_place_id?: string;
 *   google_place_type?: string;
 * }} Venue
 */

/**
 * @typedef {{
 *   data: string;
 *   button_text: string;
 * }} WebAppData
 */

/**
 * @typedef {{
 *   traveler: User;
 *   watcher: User;
 *   distance: number;
 * }} ProximityAlertTriggered
 */

/**
 * @typedef {{
 *   message_auto_delete_time: number;
 * }} MessageAutoDeleteTimerChanged
 */

/**
 * @typedef {{
 *   name: string;
 *   icon_color: number;
 *   icon_custom_emoji_id?: string;
 * }} ForumTopicCreated
 */

/**
 * @typedef {{
 *   name?: string;
 *   icon_custom_emoji_id?: string;
 * }} ForumTopicEdited
 */

/**
 * @typedef {{
 *   start_date: number;
 * }} VideoChatScheduled
 */

/**
 * @typedef {{
 *   duration: number;
 * }} VideoChatEnded
 */

/**
 * @typedef {{
 *   users: User[];
 * }} VideoChatParticipantsInvited
 */

/**
 * @typedef {{
 *   total_count: number;
 *   photos: PhotoSize[][];
 * }} UserProfilePhotos
 */

/**
 * @typedef {{
 *   file_id: string;
 *   file_unique_id: string;
 *   file_size?: number;
 *   file_path?: string;
 * }} File
 */

/**
 * @typedef {{
 *   url: string;
 * }} WebAppInfo
 */

/**
 * @typedef {{
 *   keyboard: KeyboardButton[][];
 *   is_persistent?: boolean;
 *   resize_keyboard?: boolean;
 *   one_time_keyboard?: boolean;
 *   input_field_placeholder?: string;
 *   selective?: boolean;
 * }} ReplyKeyboardMarkup
 */

/**
 * @typedef {{
 *   text: string;
 *   request_contact?: boolean;
 *   request_location?: boolean;
 *   request_poll?: KeyboardButtonPollType;
 *   web_app?: WebAppInfo;
 * }} KeyboardButton
 */

/**
 * @typedef {{
 *   type?: string;
 * }} KeyboardButtonPollType
 */

/**
 * @typedef {{
 *   remove_keyboard: "true";
 *   selective?: boolean;
 * }} ReplyKeyboardRemove
 */

/**
 * @typedef {{
 *   inline_keyboard: InlineKeyboardButton[][];
 * }} InlineKeyboardMarkup
 */

/**
 * @typedef {{
 *   text: string;
 *   url?: string;
 *   callback_data?: string;
 *   web_app?: WebAppInfo;
 *   login_url?: LoginUrl;
 *   switch_inline_query?: string;
 *   switch_inline_query_current_chat?: string;
 *   callback_game?: CallbackGame;
 *   pay?: boolean;
 * }} InlineKeyboardButton
 */

/**
 * @typedef {{
 *   url: string;
 *   forward_text?: string;
 *   bot_username?: string;
 *   request_write_access?: boolean;
 * }} LoginUrl
 */

/**
 * @typedef {{
 *   id: string;
 *   from: User;
 *   message?: Message;
 *   inline_message_id?: string;
 *   chat_instance: string;
 *   data?: string;
 *   game_short_name?: string;
 * }} CallbackQuery
 */

/**
 * @typedef {{
 *   force_reply: "true";
 *   input_field_placeholder?: string;
 *   selective?: boolean;
 * }} ForceReply
 */

/**
 * @typedef {{
 *   small_file_id: string;
 *   small_file_unique_id: string;
 *   big_file_id: string;
 *   big_file_unique_id: string;
 * }} ChatPhoto
 */

/**
 * @typedef {{
 *   invite_link: string;
 *   creator: User;
 *   creates_join_request: boolean;
 *   is_primary: boolean;
 *   is_revoked: boolean;
 *   name?: string;
 *   expire_date?: number;
 *   member_limit?: number;
 *   pending_join_request_count?: number;
 * }} ChatInviteLink
 */

/**
 * @typedef {{
 *   is_anonymous: boolean;
 *   can_manage_chat: boolean;
 *   can_delete_messages: boolean;
 *   can_manage_video_chats: boolean;
 *   can_restrict_members: boolean;
 *   can_promote_members: boolean;
 *   can_change_info: boolean;
 *   can_invite_users: boolean;
 *   can_post_messages?: boolean;
 *   can_edit_messages?: boolean;
 *   can_pin_messages?: boolean;
 *   can_manage_topics?: boolean;
 * }} ChatAdministratorRights
 */

/**
 * @typedef {{
 *   ChatMemberOwner: object;
 *   ChatMemberAdministrator: object;
 *   ChatMemberMember: object;
 *   ChatMemberRestricted: object;
 *   ChatMemberLeft: object;
 *   ChatMemberBanned: object;
 * }} ChatMember
 */

/**
 * @typedef {{
 *   status: string;
 *   user: User;
 *   is_anonymous: boolean;
 *   custom_title?: string;
 * }} ChatMemberOwner
 */

/**
 * @typedef {{
 *   status: string;
 *   user: User;
 *   can_be_edited: boolean;
 *   is_anonymous: boolean;
 *   can_manage_chat: boolean;
 *   can_delete_messages: boolean;
 *   can_manage_video_chats: boolean;
 *   can_restrict_members: boolean;
 *   can_promote_members: boolean;
 *   can_change_info: boolean;
 *   can_invite_users: boolean;
 *   can_post_messages?: boolean;
 *   can_edit_messages?: boolean;
 *   can_pin_messages?: boolean;
 *   can_manage_topics?: boolean;
 *   custom_title?: string;
 * }} ChatMemberAdministrator
 */

/**
 * @typedef {{
 *   status: string;
 *   user: User;
 * }} ChatMemberMember
 */

/**
 * @typedef {{
 *   status: string;
 *   user: User;
 *   is_member: boolean;
 *   can_change_info: boolean;
 *   can_invite_users: boolean;
 *   can_pin_messages: boolean;
 *   can_manage_topics: boolean;
 *   can_send_messages: boolean;
 *   can_send_media_messages: boolean;
 *   can_send_polls: boolean;
 *   can_send_other_messages: boolean;
 *   can_add_web_page_previews: boolean;
 *   until_date: number;
 * }} ChatMemberRestricted
 */

/**
 * @typedef {{
 *   status: string;
 *   user: User;
 * }} ChatMemberLeft
 */

/**
 * @typedef {{
 *   status: string;
 *   user: User;
 *   until_date: number;
 * }} ChatMemberBanned
 */

/**
 * @typedef {{
 *   chat: Chat;
 *   from: User;
 *   date: number;
 *   old_chat_member: ChatMember;
 *   new_chat_member: ChatMember;
 *   invite_link?: ChatInviteLink;
 * }} ChatMemberUpdated
 */

/**
 * @typedef {{
 *   chat: Chat;
 *   from: User;
 *   date: number;
 *   bio?: string;
 *   invite_link?: ChatInviteLink;
 * }} ChatJoinRequest
 */

/**
 * @typedef {{
 *   can_send_messages?: boolean;
 *   can_send_media_messages?: boolean;
 *   can_send_polls?: boolean;
 *   can_send_other_messages?: boolean;
 *   can_add_web_page_previews?: boolean;
 *   can_change_info?: boolean;
 *   can_invite_users?: boolean;
 *   can_pin_messages?: boolean;
 *   can_manage_topics?: boolean;
 * }} ChatPermissions
 */

/**
 * @typedef {{
 *   location: Location;
 *   address: string;
 * }} ChatLocation
 */

/**
 * @typedef {{
 *   message_thread_id: number;
 *   name: string;
 *   icon_color: number;
 *   icon_custom_emoji_id?: string;
 * }} ForumTopic
 */

/**
 * @typedef {{
 *   command: string;
 *   description: string;
 * }} BotCommand
 */

/**
 * @typedef {{
 *   type: string;
 * }} BotCommandScopeDefault
 */

/**
 * @typedef {{
 *   type: string;
 * }} BotCommandScopeAllPrivateChats
 */

/**
 * @typedef {{
 *   type: string;
 * }} BotCommandScopeAllGroupChats
 */

/**
 * @typedef {{
 *   type: string;
 * }} BotCommandScopeAllChatAdministrators
 */

/**
 * @typedef {{
 *   type: string;
 *   chat_id: number | string;
 * }} BotCommandScopeChat
 */

/**
 * @typedef {{
 *   type: string;
 *   chat_id: number | string;
 * }} BotCommandScopeChatAdministrators
 */

/**
 * @typedef {{
 *   type: string;
 *   chat_id: number | string;
 *   user_id: number;
 * }} BotCommandScopeChatMember
 */

/**
 * @typedef {{
 *   type: string;
 * }} MenuButtonCommands
 */

/**
 * @typedef {{
 *   type: string;
 *   text: string;
 *   web_app: WebAppInfo;
 * }} MenuButtonWebApp
 */

/**
 * @typedef {{
 *   type: string;
 * }} MenuButtonDefault
 */

/**
 * @typedef {{
 *   migrate_to_chat_id?: number;
 *   retry_after?: number;
 * }} ResponseParameters
 */

/**
 * @typedef {{
 *   type: string;
 *   media: string;
 *   caption?: string;
 *   parse_mode?: string;
 *   caption_entities?: MessageEntity[];
 *   has_spoiler?: boolean;
 * }} InputMediaPhoto
 */

/**
 * @typedef {{
 *   type: string;
 *   media: string;
 *   thumb?: InputFile | string;
 *   caption?: string;
 *   parse_mode?: string;
 *   caption_entities?: MessageEntity[];
 *   width?: number;
 *   height?: number;
 *   duration?: number;
 *   supports_streaming?: boolean;
 *   has_spoiler?: boolean;
 * }} InputMediaVideo
 */

/**
 * @typedef {{
 *   type: string;
 *   media: string;
 *   thumb?: InputFile | string;
 *   caption?: string;
 *   parse_mode?: string;
 *   caption_entities?: MessageEntity[];
 *   width?: number;
 *   height?: number;
 *   duration?: number;
 *   has_spoiler?: boolean;
 * }} InputMediaAnimation
 */

/**
 * @typedef {{
 *   type: string;
 *   media: string;
 *   thumb?: InputFile | string;
 *   caption?: string;
 *   parse_mode?: string;
 *   caption_entities?: MessageEntity[];
 *   duration?: number;
 *   performer?: string;
 *   title?: string;
 * }} InputMediaAudio
 */

/**
 * @typedef {{
 *   type: string;
 *   media: string;
 *   thumb?: InputFile | string;
 *   caption?: string;
 *   parse_mode?: string;
 *   caption_entities?: MessageEntity[];
 *   disable_content_type_detection?: boolean;
 * }} InputMediaDocument
 */
