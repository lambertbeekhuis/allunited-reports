import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import VCalendar from 'v-calendar';
import router from './router'
import {auth} from './firebase'

Vue.config.productionTip = false

Vue.use(VCalendar, {
  componentPrefix: 'vc'  // Use <vc-calendar /> instead of <v-calendar />
})

let app

auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      beforeCreate() {
        this.$store.commit('SET_INPUT_DATA', false);
      },
      render: h => h(App)
    }).$mount('#app')
  }

  // if logged-in, fetch the userProfile
  if (user) {
    store.dispatch('fetchUserProfile', user);
  }

})

