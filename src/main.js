import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import App from './App.vue'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import store from "./store"
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// import env from './env'

//mock开关
const mock=false;
if(mock){
  require('./mock/api');
}

axios.defaults.baseURL='/api';
axios.defaults.timeout=8000;
//根据环境变量获取不同的请求地址
// console.log(123,env.baseURL);
// axios.defaults.baseURL=env.baseURL;
//axios错误拦截
axios.interceptors.response.use(function(response){
  let res=response.data;//接口返回值
  let path=location.hash;
  if(res.status==0){
    return res.data;
  }else if(res.status==10){//未登录
    if(path != "#/index"){
      window.location.href='/#/login';
    } 
    return Promise.reject();
  }else{

    //  alert(res.msg);
    Message.info(res.msg);
    return Promise.reject();
  }

});

Vue.use(VueAxios,axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.config.productionTip = false;
Vue.prototype.$message=Message;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
