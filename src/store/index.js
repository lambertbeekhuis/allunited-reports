import Vue from 'vue'
import Vuex from 'vuex'

import { Entry } from './../models/Entry';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileFields: [], // all fields (array)
    fileData: [],   // all datasets (arrays) matching above fields
    entries: []     // a dataset converted to an entry-object
  },

  mutations: {
    SET_INPUT_DATA (state, fileText) {
      // Split By lines
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
