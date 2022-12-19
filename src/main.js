import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import "./assets/css/iconfont.css";
Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.baseURL='http://localhost:8088/service'
Vue.prototype.$http=axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
