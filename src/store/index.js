import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileFields: [], // all fields (array)
    fileData: [],   // all datasets (arrays) matching above fields
  },

  mutations: {
    SET_INPUT_DATA (state, fileText) {
      // Split By lines
      let fileData = [];
      let lines = fileText.split('\n');
      for (let nr = 0; nr < lines.length; nr++) {
        let line = lines[nr].trim().replace(',,', ',"",');  // replace empty values (,,), by ,"",
        let data = JSON.parse('[' + line + ']')
        if (nr === 0 ) {
          state.fileFields = data;
          continue;
        }
        fileData.push(data);
      }
      state.fileData = fileData;
    }
  },
  actions: {
  },
  modules: {
  }
})
