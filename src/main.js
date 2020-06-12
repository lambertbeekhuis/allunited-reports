import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import VCalendar from 'v-calendar';

Vue.config.productionTip = false

Vue.use(VCalendar, {
  componentPrefix: 'vc'  // Use <vc-calendar /> instead of <v-calendar />
})

new Vue({
  store,
  vuetify,
  beforeCreate() {
    this.$store.commit('SET_INPUT_DATA', false);
  },
  render: h => h(App)
}).$mount('#app')
