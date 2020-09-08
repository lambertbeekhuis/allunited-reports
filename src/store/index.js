import Vue from 'vue'
import Vuex from 'vuex'

import { Entry } from './../models/Entry';
import {dateFns} from "../utils/dateHelper";


Vue.use(Vuex)

// filter the entries between specific dates
function getEntriesStartEnd (state, startYmd, endYmd) {
  console.log('start and end', startYmd, endYmd);
  let startTime = dateFns.timeStartOfDay(startYmd); // in unix timestamp
  let endTime = dateFns.timeEndOfDay(endYmd);
  console.log('startTime and endTime', startTime, endTime);
  return state.entries.filter(entry => (entry.startTime >= startTime && entry.startTime <= endTime) );
}

function firstDate (state) {
  return state.entries.reduce((firstDate, entry) => {
    if (entry['Vanaf datum'] < firstDate || firstDate === false) {
      return entry['Vanaf datum'];
    }
    return firstDate;
  }, false);
}

function lastDate (state) {
  return state.entries.reduce((lastDate, entry) => {
    if (entry['Vanaf datum'] > lastDate || lastDate === false) {
      return entry['Vanaf datum'];
    }
    return lastDate;
  }, false);
}

// returns an object with the courtName as key and value { name: courtName }
function findAllCourts (entries) {
  return entries.reduce((courts, entry) => {
    if (!Object.prototype.hasOwnProperty.call(courts, entry['Locatiecode'])) {
      let courtName = entry['Locatiecode'];
      courts[courtName] = {name: courtName};
    }
    return courts;
  }, {});
}

// returns an object with the courtName as key and value { name: courtName }
function findAllCategories (entries) {
  return entries.reduce((categories, entry) => {
    if (!Object.prototype.hasOwnProperty.call(categories, entry['Locatiecode'])) {
      let category = entry['Reserveringstype'];
      categories[category] = {name: category, code: entry['Reserveringstypecode']};
    }
    return categories;
  }, {});
}


export default new Vuex.Store({
  state: {
    fileName: null,
    fileLineCount: 0,
    fileFields: [], // all fields from the import-file (array of field-names)
    fileRange: {start: null, end: null}, // the (Date-)range of the (input)file
    entries: [],     // list of all Entries, ordered as from the inputfile
    entryObject: {}, // an object with ObjectKeys/entries
    courts: [],      // all courts as defined in the inputfile
    categories: [],  // all categories as defined in the inputfile
    // user-selected-input
    range: {start: new Date(), end: new Date()}, // the range as selected by the calendar
    categoriesSelected: [] // the categories to show
  },

  getters: {

    // return the first date (Ymd-format) from the import-file, or false
    firstDate: state => firstDate(state),

    // return the last date (Ymd-format) from the import-file, or false
    lastDate: state => lastDate(state),

    // return an array of Dates from firstDate to lastDate
    fileDatesArray: state => {
      if (state.entries.length === 0 ) {
        return [];
      }
      return dateFns.datesFromStartToEnd(firstDate(state), lastDate(state));
    },

    // get all entries that start within the given period
    getEntriesStartEnd: (state) => (startYmd, endYmd) => getEntriesStartEnd(state, startYmd, endYmd),

  },

  mutations: {

    SET_INPUT_DATA_DEMO (state) {

      // localStorage.setItem('allunited-reports', JSON.stringify({name: 'demo', result: ''}));
    },

    // used at new file-input or a app initialization
    SET_INPUT_DATA (state, fileReader) {
      let lines = [];
      let text = null;
      let fileName = null;
      if (fileReader === false) {
        let storage = localStorage.getItem('allunited-reports');
        if (storage) {
          // read file-input from storage
          fileReader = JSON.parse(storage);
          lines = fileReader.result.split('\n');
        } else {
          return; // no storage found, do nothing
        }
      } else {
        // fileReader can be a fileReader object, or the textfile directly for demo-data
        if (typeof fileReader === 'object') {
          // fileReader object itself
          text = fileReader.result;
          fileName = fileReader.name;
        } else {
          text = fileReader;
          fileName = 'Demo-data';
        }
        // Decode inputfile-data, split by lines first
        lines = text.split('\n');
        console.log('store localstorage', fileName);
        localStorage.setItem('allunited-reports', JSON.stringify({name: fileName, result: text}));
      }

      // lines is defined now!!
      let fields = []
      let entries = [];
      let entryObject = {};
      let entry = null;
      let entryKey = null;

      for (let nr = 0; nr < lines.length; nr++) {
        let line = lines[nr].trim().replace(',,', ',"",');  // replace empty values (,,), by ,"",
        let data = JSON.parse('[' + line + ']')
        if (nr === 0 ) {
          fields = data;
          continue;
        }

        entry = new Entry(data, fields);
        entryKey = entry.getObjectKey();
        if (!Object.prototype.hasOwnProperty.call(entryObject, entryKey)) {
          entryObject[entryKey] = entry;
          entries.push(entry);
        } else {
          // ObjectKey exist, add it as opponent/tegenstander to the entry
          entryObject[entryKey].addOpponent(entry);
        }
      }
      state.fileName = fileName;
      state.fileFields = fields;
      state.fileLineCount = lines.length - 1;
      state.entries = entries;
      let start = firstDate(state);
      let end   = lastDate(state);
      state.range = { start: dateFns.dateFromYmd(start), end: dateFns.dateFromYmd(end) };
      state.fileRange = { start: dateFns.dateFromYmd(start), end: dateFns.dateFromYmd(end) };

      let courtsObject = findAllCourts(state.entries); // returns an object
      state.courts = Object.keys(courtsObject).sort(); // easy sorting for now

      let categoryObject = findAllCategories(state.entries);
      state.categories = Object.keys(categoryObject);
      state.categoriesSelected = Object.keys(categoryObject);

    },

    // range as selected from Calendar
    SET_RANGE (state, range) {
      state.range = range;
    },

    SET_CATEGORIES_SELECTED (state, categoriesSelected) {
      state.categoriesSelected = categoriesSelected;
    }

  },

  actions: {
    loadDemoData ({ commit }) {
      return Vue.axios
          .get('/demo_export_baanbezetting.csv')
          .then (response => {
            console.log(response.data);
            commit('SET_INPUT_DATA', response.data);
            return response.data;
          });
    }
  },
  modules: {
  }
})
