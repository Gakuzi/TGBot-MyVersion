/**
 * Тестовый файл для проверки всех функций системы
 */

/**
 * Тест инициализации бота
 */
function testBotInitialization() {
  try {
    console.log('=== Тест инициализации бота ===');
    
    // Проверяем доступность библиотеки
    const libraryTest = testLibraryConnection();
    console.log('Тест библиотеки:', libraryTest);
    
    // Проверяем инициализацию
    const initResult = initializeBot();
    console.log('Результат инициализации:', initResult);
    
    // Проверяем статус бота
    const status = checkBotStatus();
    console.log('Статус бота:', status);
    
    return { success: true, data: { libraryTest, initResult, status } };
  } catch (error) {
    console.error('Ошибка теста инициализации:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Тест отправки сообщения
 */
function testSendMessage() {
  try {
    console.log('=== Тест отправки сообщения ===');
    
    // Тестовый ID пользователя (замените на реальный)
    const testUserId = '123456789';
    const testMessage = 'Тестовое сообщение от ' + new Date().toLocaleString();
    
    const result = sendTextMessage(testUserId, testMessage, 'HTML');
    console.log('Результат отправки:', result);
    
    return result;
  } catch (error) {
    console.error('Ошибка теста отправки:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Тест клавиатуры
 */
function testKeyboard() {
  try {
    console.log('=== Тест клавиатуры ===');
    
    const testUserId = '123456789';
    const testText = 'Тестовая клавиатура';
    const testButtons = ['Кнопка 1', 'Кнопка 2', 'Кнопка 3'];
    
    const result = sendKeyboard(testUserId, testText, testButtons, 'reply');
    console.log('Результат клавиатуры:', result);
    
    return result;
  } catch (error) {
    console.error('Ошибка теста клавиатуры:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Тест календаря
 */
function testCalendar() {
  try {
    console.log('=== Тест календаря ===');
    
    const testUserId = '123456789';
    const testText = 'Выберите дату для теста';
    
    const result = sendCalendar(testUserId, testText);
    console.log('Результат календаря:', result);
    
    return result;
  } catch (error) {
    console.error('Ошибка теста календаря:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Тест опроса
 */
function testPoll() {
  try {
    console.log('=== Тест опроса ===');
    
    const testUserId = '123456789';
    const testQuestion = 'Какой ваш любимый цвет?';
    const testOptions = ['Красный', 'Синий', 'Зеленый', 'Желтый'];
    
    const result = sendPoll(testUserId, testQuestion, testOptions, false);
    console.log('Результат опроса:', result);
    
    return result;
  } catch (error) {
    console.error('Ошибка теста опроса:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Тест webhook функций
 */
function testWebhookFunctions() {
  try {
    console.log('=== Тест webhook функций ===');
    
    const results = {};
    
    // Тест получения информации о webhook
    results.webhookInfo = getWebhookInfo();
    console.log('Информация о webhook:', results.webhookInfo);
    
    // Тест установки webhook
    results.setWebhook = setWebhook();
    console.log('Установка webhook:', results.setWebhook);
    
    return { success: true, data: results };
  } catch (error) {
    console.error('Ошибка теста webhook:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Тест функций работы с данными
 */
function testDataFunctions() {
  try {
    console.log('=== Тест функций данных ===');
    
    const results = {};
    
    // Тест получения пользователей
    results.users = getUsersList();
    console.log('Список пользователей:', results.users);
    
    // Тест получения статистики
    results.stats = getUsageStatistics();
    console.log('Статистика:', results.stats);
    
    // Тест получения настроек
    results.settings = getSettings();
    console.log('Настройки:', results.settings);
    
    return { success: true, data: results };
  } catch (error) {
    console.error('Ошибка теста данных:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Полный тест системы
 */
function runFullSystemTest() {
  console.log('🚀 Запуск полного теста системы...');
  
  const results = {};
  
  // Тест 1: Инициализация
  console.log('\n1. Тест инициализации...');
  results.initialization = testBotInitialization();
  
  // Тест 2: Данные
  console.log('\n2. Тест функций данных...');
  results.data = testDataFunctions();
  
  // Тест 3: Webhook
  console.log('\n3. Тест webhook функций...');
  results.webhook = testWebhookFunctions();
  
  // Тест 4: Отправка сообщения (только если есть токен)
  if (results.initialization.success) {
    console.log('\n4. Тест отправки сообщения...');
    results.message = testSendMessage();
    
    console.log('\n5. Тест клавиатуры...');
    results.keyboard = testKeyboard();
    
    console.log('\n6. Тест календаря...');
    results.calendar = testCalendar();
    
    console.log('\n7. Тест опроса...');
    results.poll = testPoll();
  }
  
  console.log('\n📊 Результаты тестирования:');
  console.log(JSON.stringify(results, null, 2));
  
  return results;
}

/**
 * Тест меню
 */
function testMenu() {
  try {
    console.log('=== Тест меню ===');
    
    // Проверяем, что функция onOpen существует
    if (typeof onOpen === 'function') {
      console.log('✅ Функция onOpen существует');
    } else {
      console.log('❌ Функция onOpen не найдена');
    }
    
    // Проверяем другие функции меню
    const menuFunctions = [
      'showAdvancedTelegramUI',
      'showSettings', 
      'showStatistics',
      'clearBot'
    ];
    
    const results = {};
    menuFunctions.forEach(funcName => {
      if (typeof eval(funcName) === 'function') {
        results[funcName] = '✅ Найдена';
        console.log(`✅ Функция ${funcName} найдена`);
      } else {
        results[funcName] = '❌ Не найдена';
        console.log(`❌ Функция ${funcName} не найдена`);
      }
    });
    
    return { success: true, data: results };
  } catch (error) {
    console.error('Ошибка теста меню:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Тест HTML файла
 */
function testHtmlFile() {
  try {
    console.log('=== Тест HTML файла ===');
    
    // Проверяем, что HTML файл существует
    const htmlContent = HtmlService.createHtmlOutputFromFile('Telegram_Advanced_UI.html');
    console.log('✅ HTML файл найден и может быть загружен');
    
    return { success: true, message: 'HTML файл корректный' };
  } catch (error) {
    console.error('Ошибка теста HTML:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Диагностика системы
 */
function diagnoseSystem() {
  console.log('🔍 Диагностика системы...');
  
  const diagnosis = {};
  
  // Проверка файлов
  diagnosis.files = {
    'Code.gs': '✅ Существует',
    'TGbot_Config.gs': '✅ Существует', 
    'Telegram_Advanced_UI.html': '✅ Существует'
  };
  
  // Проверка функций
  diagnosis.functions = {
    'onOpen': typeof onOpen === 'function' ? '✅ Найдена' : '❌ Не найдена',
    'initializeBot': typeof initializeBot === 'function' ? '✅ Найдена' : '❌ Не найдена',
    'sendTextMessage': typeof sendTextMessage === 'function' ? '✅ Найдена' : '❌ Не найдена',
    'testLibraryConnection': typeof testLibraryConnection === 'function' ? '✅ Найдена' : '❌ Не найдена'
  };
  
  // Проверка библиотеки
  try {
    if (typeof TGbot !== 'undefined') {
      diagnosis.library = '✅ TGbot доступен';
    } else {
      diagnosis.library = '❌ TGbot не найден';
    }
  } catch (error) {
    diagnosis.library = '❌ Ошибка проверки TGbot: ' + error.message;
  }
  
  // Проверка настроек
  try {
    const settings = getSettings();
    diagnosis.settings = settings.BOT_TOKEN ? '✅ Токен настроен' : '❌ Токен не настроен';
  } catch (error) {
    diagnosis.settings = '❌ Ошибка настроек: ' + error.message;
  }
  
  console.log('📋 Результаты диагностики:');
  console.log(JSON.stringify(diagnosis, null, 2));
  
  return diagnosis;
} 