import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import axios from 'axios'
import store from './store'
import VueLazyload from 'vue-lazyload'
import 'common/icon/iconfont.css' /*引入图标文件*/


axios.defaults.baseURL = 'http://91cloud.top';
// axios.defaults.baseURL = 'http://localhost:3001';

//解决移动端按钮300ms延迟
// fastclick.attach(document.body);
Vue.config.productionTip = false;
//图片懒加载
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
