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


export default new Vuex.Store({
  state: {
    fileName: null,
    fileLineCount: 0,
    fileFields: [], // all fields from the import-file (array of field-names)
    entries: [],     // a dataset converted to an entry-object
    entryObject: {}
  },

  getters: {

    // return the first date (Ymd) from the import-file, or false
    firstDate: state => {
      return state.entries.reduce((firstDate, entry) => {
        if (entry['Vanaf datum'] < firstDate || firstDate === false) {
          return entry['Vanaf datum'];
        }
        return firstDate;
      }, false);
    },

    // return the last date (Ymd) from the import-file, or false
    lastDate: state => {
      return state.entries.reduce((lastDate, entry) => {
        if (entry['Vanaf datum'] > lastDate || lastDate === false) {
          return entry['Vanaf datum'];
        }
        return lastDate;
      }, false);
    },

    // get all entries that start within the given period
    getEntriesStartEnd: (state) => (startYmd, endYmd) => getEntriesStartEnd(state, startYmd, endYmd),

  },

  mutations: {

    // used at new file-input or a app initialization
    SET_INPUT_DATA (state, fileReader) {

      if (fileReader === false) {
        let storage = localStorage.getItem('allunited-reports');
        if (storage) {
          // read file-input from storage
          fileReader = JSON.parse(storage);
        } else {
          return; // no storage found, do nothing
        }
      } else {
        // handle in normal input file, store file for usage a refresh
        localStorage.setItem('allunited-reports', JSON.stringify({name: fileReader.name, result: fileReader.result}));
      }

      // Decode inputfile-data, split by lines first

      let fields = []
      let entries = [];
      let entryObject = {};
      let entry = null;
      let entryKey = null;
      let lines = fileReader.result.split('\n');
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
          entryObject[entryKey].addOpponent(entry);
        }
      }
      state.fileName = fileReader.name;
      state.fileFields = fields;
      state.fileLineCount = lines.length - 1;
      state.entries = entries;
    }
  },

  actions: {
  },
  modules: {
  }
})
