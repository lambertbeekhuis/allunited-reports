import { format, addDays, addMinutes, parseISO, toDate, startOfISOWeek, lastDayOfISOWeek, lightFormat, setISOWeek, setISOWeekYear, startOfMonth, endOfMonth, addMonths} from "date-fns";
import {nl, enGB, sv} from "date-fns/locale";

// https://www.sitepoint.com/javascript-design-patterns-singleton/
// wrapper for the date-fns functions, including 'locale', see https://date-fns.org/v2.9.0/docs/I18n
// see also the vue-date-fns plugin for examples how to add date-fns to your project (I steal stuff, but add it myself to understand and be more flexible)

function dateFromYmd(Ymd) {
    return parseISO(Ymd); // return 'invalid date if not valid'
}

// convert a Date() into Ymd-string (2020-01-09 for 9 jan 2020)
function ymdFromDate(date) {
    return lightFormat(date, "yyyy-MM-dd");
}

function convertToDateOrPass(dateOrYmd) {
    return typeof (dateOrYmd) === "string" ? parseISO(dateOrYmd) : dateOrYmd;
}

function convertToDateOrClone(dateOrYmd) {
    return typeof (dateOrYmd) === "string" ? parseISO(dateOrYmd) : toDate(dateOrYmd);
}

function convertToYmd(dateOrYmd) {
    return typeof (dateOrYmd) === "string" ? dateOrYmd : ymdFromDate(dateOrYmd);
}

// convert a startEnd with Dates to sartEndYmd
function convertToStartEndYmd(startEndDate) {
    return {
        start: ymdFromDate(startEndDate.start),
        end:   ymdFromDate(startEndDate.end)
    };
}

function dateStartOfWeek(dateOrYmd) {
    return startOfISOWeek(convertToDateOrPass(dateOrYmd));
}

function dateEndOfWeek(dateOrYmd) {
    return lastDayOfISOWeek(convertToDateOrPass(dateOrYmd));
}

function dateStartOfMonth(dateOrYmd) {
    return startOfMonth(convertToDateOrPass(dateOrYmd));
}

function dateEndOfMonth(dateOrYmd) {
    return endOfMonth(convertToDateOrPass(dateOrYmd));
}

// returns a new Date-object anyway (due to date-fns)
function addNDays(dateOrYmd, number) {
    return addDays(convertToDateOrPass(dateOrYmd), number);
}

// get the (ISO) weeknr from the date
function weekNr(dateOrYmd) {
    return format(convertToDateOrPass(dateOrYmd), "II");
}

// returns e.g. 2020-14
function yearWeek(dateOrYmd) {
    return format(convertToDateOrPass(dateOrYmd), "RR-II"); // RRRR is the ISO-year, II is ISO-weeknr
}

// returns {start: Ymd, end: Ymd} of the given date
function getStartEndOfWeekYmd(YmdOrDate) {
    return convertToStartEndYmd(getStartEndOfWeekDate(YmdOrDate));
}

// returns {start: Date, end: Date} of the given date
function getStartEndOfWeekDate(dateOrYmd) {
    return {
        start: dateStartOfWeek(dateOrYmd),
        end:   dateEndOfWeek(dateOrYmd)
    };
}

function getStartEndOfMonthDate(dateOrYmd) {
    return {
        start: dateStartOfMonth(dateOrYmd),
        end:   dateEndOfMonth(dateOrYmd)
    };
}

// return {start: Date, end: Date} of given weekNr (weekNr can also be yearWeek, e.g. 2017-51)
function getStartEndOfWeekNrDate(weekNr, year = null) {
    // find the year of not specified
    if (!year) {
        let split = weekNr.split();
        if (split.length != 2) {
            throw "weekNr is invalid " + weekNr;
        }
        year = split[0];
        weekNr = split[1];
    }
    // convert the date
    let dateYear = setISOWeekYear(new Date('now'), year);
    let dateWeek = setISOWeek(dateYear, weekNr);
    return {
        start: dateStartOfWeek(dateWeek),
        end:   dateEndOfWeek(dateWeek)
    };
}

function getStartEndOfWeekNrYmd(weekNr, year = null) {
    return convertToStartEndYmd(getStartEndOfWeekNrDate(weekNr, year));
}

function timeStartOfDay(Ymd) {
    let date = new Date(Ymd);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}

function timeEndOfDay(Ymd) {
    let date = new Date(Ymd);
    date.setHours(23, 59, 59, 999);
    return date.getTime();
}

// returns an array of dates from startYmd to endYmd
function datesFromStartToEnd (startDateOrYmd, endDateOrYmd) {
    let result = [];
    let endYmd = convertToYmd(endDateOrYmd);
    let date = convertToDateOrClone(startDateOrYmd);
    do {
        result.push(date);
        date = addDays(date, 1);
    } while (ymdFromDate(date) <= endYmd);
    return result;
}

function isValidDateObject(object) {
    // https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
    return object && Object.prototype.toString.call(object) === "[object Date]" && !isNaN(object);
}


// dateFns contains all functions that are used externally, so I have to export only 1 object!
const dateFns = {
    // can be used as normal function, and as Vue.filter
    // common format-options:
    // "HH:mm" for the time, e.g. 09:15
    // "EEEEEE d MMM"
    dateFormat: function (date, formatX, opts) {
        if (!isValidDateObject(date)) {
            return "";
        }
        return format(date, formatX || "yyyy-MM-dd", opts || {locale: nl});
    },

    monthName: function (date, opts) {
        return format(date, "MMMM", opts || {locale: nl});
    },

    monthNameShort: function (date, opts) {
        return format(date, "MMM", opts || {locale: nl});
    },

    // used for Vue.filter, returns e.g. 2:00, or 2:30, or 0:00
    toHoursMinutes: function (minutes) {
        if (!minutes) {
            return "0:00";
        }
        let hours = Math.floor(minutes/60);
        let min = minutes - hours*60;
        return hours + ":"+ ("00" + min).slice(-2);
    },

    // used for Vue.filter, show 2, or 2:30, or -
    toHours: function (minutes) {
        if (!minutes) {
            return "-";
        }
        let hours = Math.floor(minutes/60);
        let min = minutes - hours*60;
        return min === 0 ? hours : hours + ":"+ ("00" + min).slice(-2);
    },

    nowYmd: function () {
        return ymdFromDate(new Date());
    },

    // returns array with 7 date-objects of the related week
    datesOfWeek: (dateOrYmd) => {
        return datesFromStartToEnd(dateStartOfWeek(dateOrYmd), dateEndOfWeek(dateOrYmd));
    },

    // returns the age in seconds (integer), rounded down! If no Date-object, returns infinite, so very old
    ageInSeconds: (date) => {
        if (!isValidDateObject(date)) {
            return 99999;
        }
        return Math.floor((Date.now() - date.getTime())/1000);
    },

    // direct copy from date-fns
    addMinutes: addMinutes,

    addMonths: addMonths,

    datesFromStartToEnd: datesFromStartToEnd,

    getStartEndOfWeekYmd: getStartEndOfWeekYmd,

    getStartEndOfWeekDate: getStartEndOfWeekDate,

    getStartEndOfWeekNrDate: getStartEndOfWeekNrDate,

    getStartEndOfWeekNrYmd: getStartEndOfWeekNrYmd,

    getStartEndOfMonthDate: getStartEndOfMonthDate,

    dateFromYmd: dateFromYmd,

    weekNr: weekNr,

    yearWeek: yearWeek,

    ymdFromDate: ymdFromDate,

    timeStartOfDay: timeStartOfDay,

    timeEndOfDay: timeEndOfDay,

    addNDays: addNDays




};


export {dateFns};