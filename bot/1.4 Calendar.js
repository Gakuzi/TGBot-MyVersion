const configCalendar = {
  language: {
    ru: {
      weeksDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      months: {
        "01": "Январь",
        "02": "Февраль",
        "03": "Март",
        "04": "Апрель",
        "05": "Май",
        "06": "Июнь",
        "07": "Июль",
        "08": "Август",
        "09": "Сентябрь",
        10: "Октябрь",
        11: "Ноябрь",
        12: "Декабрь",
      },
      monthsRevesed: {
        Январь: "01",
        Февраль: "02",
        Март: "03",
        Апрель: "04",
        Май: "05",
        Июнь: "06",
        Июль: "07",
        Август: "08",
        Сентябрь: "09",
        Октябрь: "10",
        Ноябрь: "11",
        Декабрь: "12",
      },
      monthsShort: {
        "01": "Янв.",
        "02": "Фев.",
        "03": "Мар.",
        "04": "Апр.",
        "05": "Май",
        "06": "Июн.",
        "07": "Июл.",
        "08": "Авг.",
        "09": "Сен.",
        10: "Окт.",
        11: "Ноя.",
        12: "Дек.",
      },
    },
    en: {
      weeksDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      months: {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        10: "October",
        11: "November",
        12: "December",
      },
      monthsShort: {
        "01": "Jan.",
        "02": "Feb.",
        "03": "Mar.",
        "04": "Apr.",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "Aug.",
        "09": "Sept.",
        10: "Oct.",
        11: "Nov.",
        12: "Dec.",
      },
    },
  },
};

class Calendar {
  constructor({
    month = new Date().getMonth() + 1,
    year = new Date().getFullYear(),
    language,
  } = {}) {
    this.month = Number(month);
    this.year = Number(year);
    this.language = language || "ru";
    this.weekDays = configCalendar.language[this.language].weeksDays;
    this.namesOfMonths = configCalendar.language[this.language].months;
    this.headerMonthYear = "";
    this.header = "";
    this.keyboard = new Keyboard();
    this.key = new Key();
  }

  create() {
    const month = this.month - 1;
    let date = new Date(this.year, month);
    const endOfMonth = new Date(this.year, month + 1, 0);

    const monthString = this.padNumber(this.month);
    const calendar = [];

    this.headerMonthYear = [`${this.namesOfMonths[monthString]} ${this.year}`];
    this.header = [
      ["<<<", `PREV-MONTH:${this.previous()}`],
      // [`${this.namesOfMonths[monthString]} ${this.year}`, " "],
      [">>>", `NEXT-MONTH:${this.next()}`],
    ];

    calendar.push(this.headerMonthYear, this.header, this.weekDays);

    // let week =  Array.from({ length: this.dayNumber(date) }, () => [""]);
    let week = this.padding(this.dayNumber(date));

    while (date.getMonth() === month) {
      week.push([
        this.padNumber(date.getDate()),
        monthString,
        this.year.toString(),
      ]);

      if (this.dayNumber(date) % 7 == 6) {
        calendar.push(week);
        week = [];
      }

      if (+date >= +endOfMonth) {
        calendar.push(week);
      }

      date.setDate(date.getDate() + 1);
    }

    // const lastWeek = calendar[calendar.length - 1];
    // lastWeek.push(...this.padding(7 - lastWeek.length));
    const lastWeek = calendar[calendar.length - 1].length
      ? calendar[calendar.length - 1]
      : null;
    lastWeek
      ? lastWeek.push(
          ...Array.from({ length: 7 - lastWeek.length }, () => [""])
        )
      : null;

    return this.keyBoardFactory(calendar);
  }

  keyBoardFactory(calendar) {
    return this.keyboard
      .make(
        calendar.map((el) =>
          el.map((e) =>
            Number(e[0])
              ? this.key.callback(e[0], `DAY:${e[2]}-${e[1]}-${e[0]}`)
              : this.weekDays.includes(e) || this.headerMonthYear.includes(e)
              ? this.key.callback(e, " ")
              : this.header.includes(e)
              ? this.key.callback(e[0], e[1])
              : this.key.callback(" ", " ")
          )
        ),
        { columns: 7 }
      )
      .inline();
  }

  padNumber(num) {
    return num.toString().padStart(2, "0");
  }

  next() {
    let { year, month } = this;
    month--;
    month = month === 11 ? 0 : month + 1;
    year = month === 0 ? year + 1 : year;
    return Utilities.formatDate(
      new Date(year, month, 1),
      Session.getScriptTimeZone(),
      "yyyy-MM-dd"
    );
  }

  previous() {
    let { year, month } = this;
    month--;
    month = month === 0 ? 11 : month - 1;
    year = month === 11 ? year - 1 : year;
    return Utilities.formatDate(
      new Date(year, month, 1),
      Session.getScriptTimeZone(),
      "yyyy-MM-dd"
    );
  }

  dayNumber(date) {
    let day = date.getDay();
    if (day === 0) day = 7;
    return day - 1;
  }

  padding(pad, array = []) {
    return [...Array(pad).fill([" "]), ...array];
  }

  *slicer(arr, size) {
    for (let i = 0; i < arr.length; i = i + size) {
      yield arr.slice(i, i + size);
    }
  }
}

/**
 * Функйция создающая Inline календарь
 * @param {string|number} [month] месяц календаря.
 * @param {string|number} [year] год календаря.
 * @param {string} [language] язык кнопок клавиатуры 'ru' или 'en', по умолчанию 'ru'.
 * @returns {InlineKeyboardMarkup}
 */
function calendar({ month, year, language }) {
  return new Calendar({ month, year, language }).create();
}
