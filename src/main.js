import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'
import router from './router'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import JwPagination from 'jw-vue-pagination';

Vue.component('jw-pagination', JwPagination);
Vue.config.productionTip = false

Vue.prototype.$hostname = 'http://localhost:8000/api'
Vue.prototype.$fronthostname = 'http://localhost:8080/'
Vue.use(VueRouter);
Vue.use(ElementUI);



Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')