class Helper {
  constructor() {}

  functionName(func) {
    return func.toString().match(/function ([^(]*)\(/)[1];

    new Proxy(func, {
      get(target, property) {
        if (typeof target[property] === "function") {
          return target[property];
        }
      },
    });
  }

  stringToUpperCaseSnakeCase(str) {
    return /(?=[A-ZА-ЯЁ])/g
      [Symbol.split](str)
      .join(" ")
      .toUpperCase()
      .replace(/\s+/g, "_");
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
}

var helper = new Helper();
