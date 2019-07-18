import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import * as VueGoogleMaps from 'vue2-google-maps';
import VueNoty from 'vuejs-noty'

Vue.use(VueNoty)
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA4JtpFz0lT5idk1cUSYMVig1e6lkCaP88',
    libraries: 'places',
    language: 'en'
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
