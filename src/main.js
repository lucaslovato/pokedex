// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'

Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.config.devtools = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
