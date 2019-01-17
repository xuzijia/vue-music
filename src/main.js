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
import {readCookie} from 'base/utils/musicUtils'
// axios.defaults.baseURL = 'http://91cloud.top';
axios.defaults.baseURL = 'http://10.96.236.126:3001';
//开启cookie
axios.defaults.withCredentials=true

//解决移动端按钮300ms延迟
// fastclick.attach(document.body);
Vue.config.productionTip = false;
//图片懒加载
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

// 全局拦截器 控制/user的接口 如果没有登录 跳转到登录页
axios.interceptors.request.use((config) => {
  console.log(config.url.indexOf("/user"));
  console.log(config.url);
  if(config.url.indexOf("/user")!=-1){
    //判断登录状态
    if(readCookie("MUSIC_U")==""){
      console.log(config.url+":未登录")
      //显示登录页面
      store.commit("SET_LOGIN_STATUS",true)
      return
    }
  }
  return config
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
