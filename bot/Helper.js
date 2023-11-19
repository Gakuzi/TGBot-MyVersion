class Helper {
  constructor() {}

  /**
   * Retrieves the list of methods belonging to a class.
   *
   * @param {Object} classObj - The class object to retrieve methods from.
   * @return {Array} - An array containing the names of the class methods.
   */
  getMethodsOfClass(classObj) {
    // list of class methods
    return Object.getOwnPropertyNames(classObj.prototype).filter(
      (property) => typeof classObj.prototype[property] === "function"
    );
  }

  /**
   * Checking the presence of required parameters to send a request
   * @param {string} param missing parameter
   * @return {Error} returns Error(`Missing ${param}`) if missing
   */
  miss_parameter(param) {
    throw new Error(`Missing ${param}`);
  }

  /**
   * Convert a string to snake case in uppercase.
   *
   * @param {string} str - The string to be converted.
   * @return {string} The converted string in snake case.
   */
  toUpperCaseSnakeCase(str) {
    return /(?=[A-ZА-ЯЁ])/g
      [Symbol.split](str)
      .join(" ")
      .toUpperCase()
      .replace(/\s+/g, "_");
  }

  /**
   * Removes empty values from an object recursively.
   *
   * @param {Object} obj - The object to remove empty values from.
   * @return {Object} - The object with empty values removed.
   */
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
   * Builds a query object based on the input array.
   *
   * @param {Array} array - The input array.
   * @return {Object} - The query object.
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
   * Builds an object query by merging two objects.
   *
   * @param {Object} a - The first object to merge.
   * @param {Object} [b={}] - The second object to merge. Defaults to an empty object if not provided.
   * @return {Object} - The merged object.
   */
  buildObjectQuery(a, b = {}) {
    // { ...a, ...b };
    return Object.assign(a, b);
  }

  /**
   * @method fixedEncodeURIComponent
   * @description Method encoding the Uniform Resource Identifier (URI) component
   * @param {string} str string to encode
   * @return {string} encoded string
   */
  fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
      return "%" + c.charCodeAt(0).toString(16);
    });
  }

  /**
   * Logs a message to the console.
   *
   * @param {string|object} message - The message to be logged. If it's a string, it will be printed as is.
   * If it's an object, it will be stringified with an indentation of 5 spaces before being printed.
   * @return {boolean} Returns false.
   */
  log(message) {
    return (
      "string" == typeof message
        ? console.log(message)
        : console.log(JSON.stringify(message, null, 5)),
      !1
    );
  }

  /**
   * Clean tag HTML
   * @param {string} text which will be cleaned
   */
  clearHTML(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /**
   * Clean tag Markdown
  @param {string} text which will be cleaned
  */
  clearMarkdown(s) {
    return s
      .replace(/_/g, "\\_")
      .replace(/\*/g, "\\*")
      .replace(/\[/g, "\\[")
      .replace(/`/g, "\\`");
  }

  /**
   * Iterates over the elements of an object or array and applies a callback function to each element.
   *
   * @param {Object|Array} obj - The object or array to iterate over.
   * @param {Function} fn - The callback function to apply to each element.
   */
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

  /**
   * Returns the type of the given object.
   *
   * @param {any} obj - The object to get the type of.
   * @return {string} The type of the given object.
   */
  getType(obj) {
    return Object.prototype.toString.call(obj).split(" ")[1].replace("]", "");
  }

  /**
   * Check if the given index is present in the array.
   *
   * @param {Array} array - The array to search in.
   * @param {number} index - The index to search for.
   * @return {boolean} True if the index is present in the array, otherwise false.
   */
  isInArray(array, index) {
    return array.includes(index);
    return array.indexOf(index) > -1;
  }

  /**
   * Check if the given object is an array.
   *
   * @param {any} obj - The object to be checked.
   * @return {boolean} Returns true if the object is an array, false otherwise.
   */
  isArray(obj) {
    return Array.isArray(obj);
    return toString.call(obj) === "[object Array]";
  }

  /**
   * Checks if a value is a string.
   *
   * @param {any} val - The value to check.
   * @return {boolean} Returns true if the value is a string, else false.
   */
  isString(val) {
    return val instanceof String || typeof val === "string";
  }

  /**
   * Check if the given value is a number.
   *
   * @param {any} val - The value to be checked.
   * @return {boolean} Returns true if the value is a number, false otherwise.
   */
  isNumber(val) {
    return typeof val === "number";
  }

  /**
   * Checks if the given value is an object.
   *
   * @param {any} val - The value to be checked.
   * @return {boolean} Returns `true` if the value is an object, `false` otherwise.
   */
  isObject(val) {
    return typeof val === "object" && val !== null;
  }

   /**
   * Determines if the given value is a Date object.
   *
   * @param {any} val - The value to check.
   * @return {boolean} Returns true if the value is a Date object, otherwise returns false.
   */
  isDate(val) {
    return val instanceof Date;
    return toString.call(val) === "[object Date]";
  }

  /**
   * Determines if a value is a function.
   *
   * @param {any} val - The value to be checked.
   * @return {boolean} Returns true if the value is a function, otherwise false.
   */
  isFunction(val) {
    return typeof val === "function";
    return toString.call(val) === "[object Function]";
  }

  /**
   * Check if a value is a Blob.
   *
   * @param {any} val - The value to check.
   * @return {boolean} Returns `true` if the value is a Blob, `false` otherwise.
   */
  isBlob(val) {
    return val instanceof Blob;
    return toString.call(val) === "[object Blob]";
  }

  /**
   * Creates a text output using the provided text.
   *
   * @param {string} text - The text to create a text output with.
   * @return {TextOutput} The created text output.
   */
  outputText(text) {
    return ContentService.createTextOutput(text);
  }

  /**
   * Generates a JSON output for the given data.
   *
   * @param {any} data - The data to be converted to JSON.
   * @return {TextOutput} A TextOutput object with the JSON data.
   */
  outputJSON(data) {
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
      ContentService.MimeType.JSON
    );
  }

  /**
   * Creates an HTML output with the given text.
   *
   * @param {string} text - The text to be displayed in the HTML output.
   * @return {Object} The HTML output object.
   */
  outputHTML(text) {
    return HtmlService.createHtmlOutput(text);
  }
}

var helper = new Helper();
