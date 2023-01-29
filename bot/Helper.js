class Helper {
  constructor() {}

  toUpperCaseSnakeCase(str) {
    return /(?=[A-ZА-ЯЁ])/g
      [Symbol.split](str)
      .join(" ")
      .toUpperCase()
      .replace(/\s+/g, "_");
  }

  removeEmpty(obj) {
    Object.keys(obj).forEach(
      (key) =>
        (obj[key] &&
          typeof obj[key] === "object" &&
          this.removeEmpty(obj[key])) ||
        ((obj[key] == null || obj[key] === undefined || obj[key] === "") &&
          delete obj[key])
    );
    return obj;
  }

  /**
   * build query из array
   */
  buildQuery(array) {
    var query = {};
    if (array) {
      for (var index in array) {
        if (array[index]) {
          var value = array[index];
          if (index == "extras") {
            for (var ix in value) {
              if (value[ix]) {
                query[ix] = value[ix];
              }
            }
          } else {
            query[index] = value;
          }
        }
      }
    }
    return query;
  }

  /**
   * @method fixedEncodeURIComponent
   * @description Метод, кодирующий компонент универсального идентификатора ресурса (URI)
   * @param {string} str строка для кодировки
   * @return {string} закодированная строка
   */
  fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
      return "%" + c.charCodeAt(0).toString(16);
    });
  }

  /**
   * @method log
   * @description Печть сообщения
   * @param {string} message
   */
  log(message) {
    return (
      "string" == typeof message
        ? console.log(message)
        : console.log(JSON.stringify(message, null, 5)),
      !1
    );
  }

  forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === "undefined") {
      return;
    }

    // Force an array if not already something iterable
    if (this.typeCheck(obj) !== "object") {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (this.typeCheck(obj) == "array") {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }

  isInArray(array, index) {
    return array.indexOf(index) > -1;
  }

  isArray(obj) {
    return toString.call(obj) === "[object Array]";
  }

  isString(val) {
    return typeof val === "string";
  }

  isNumber(val) {
    return typeof val === "number";
  }

  isObject(val) {
    return val !== null && typeof val === "object";
  }

  isDate(val) {
    return toString.call(val) === "[object Date]";
  }

  isFunction(val) {
    return toString.call(val) === "[object Function]";
  }

  isBlob(val) {
    return toString.call(val) === "[object Blob]";
  }

  outputText(text) {
    return ContentService.createTextOutput(text);
  }

  outputJSON(data) {
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
      ContentService.MimeType.JSON
    );
  }

  outputHTML(text) {
    return HtmlService.createHtmlOutput(text);
  }
}

var helper = new Helper();
