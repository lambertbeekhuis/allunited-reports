import Vue from 'vue'
import Vuex from 'vuex'

import { Entry } from './../models/Entry';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileName: null,
    fileFields: [], // all fields (array)
    fileData: [],   // all datasets (arrays) matching above fields
    entries: []     // a dataset converted to an entry-object
  },

  getters: {

    firstDate: state => {
      return state.entries.reduce((firstDate, entry) => {
        if (entry['Vanaf datum'] < firstDate || firstDate === false) {
          return entry['Vanaf datum'];
        }
        return firstDate;
      }, false);
    },

    lastDate: state => {
      return state.entries.reduce((lastDate, entry) => {
        if (entry['Vanaf datum'] > lastDate || lastDate === false) {
          return entry['Vanaf datum'];
        }
        return lastDate;
      }, false);
    },

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
      let fileData = [];
      let fields = []
      let entries = [];
      let lines = fileReader.result.split('\n');
      for (let nr = 0; nr < lines.length; nr++) {
        let line = lines[nr].trim().replace(',,', ',"",');  // replace empty values (,,), by ,"",
        let data = JSON.parse('[' + line + ']')
        if (nr === 0 ) {
          fields = data;
          continue;
        }
        fileData.push(data);
        entries.push(new Entry(data, fields));
      }
      state.fileName = fileReader.name;
      state.fileFields = fields;
      state.fileData = fileData;
      state.entries = entries;
    }
  },

  actions: {
  },
  modules: {
  }
})
