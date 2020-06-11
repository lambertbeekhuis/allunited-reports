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

  mutations: {

    // used at new file-input or a app initialization
    SET_INPUT_DATA (state, fileReader) {
      let fileName = null;
      let fileText = null;
      // fileReader === false is exemption for app startup:
      if (fileReader === false) {
        console.log('fileReader === false');
        let storage = localStorage.getItem('allunited-reports');
        if (storage) {
          storage = JSON.parse(storage);
          fileName = storage.name;
          fileText = storage.result;
        } else {
          // no storage found, do nothing
          return;
        }
      } else {
        // handle in normal input file
        fileName = fileReader.name;
        fileText = fileReader.result;
        // store file for usage a refresh
        localStorage.setItem('allunited-reports', JSON.stringify({name: fileName, result: fileText}));
      }

      // Decode fileText, split By lines
      let fileData = [];
      let fields = []
      let entries = [];
      let lines = fileText.split('\n');
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
      state.entries = entries;
      state.fileFields = fields;
      state.fileData = fileData;
    }
  },

  actions: {
  },
  modules: {
  }
})
