import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import App from './App.vue'
// import env from './env'

//mock开关
const mock=true;
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
  if(res.status==0){
    return res.data;
  }else if(res.status==10){//未登录
    window.location.href='/#/login';
  }else{
    alert(res.msg);
  }

});

Vue.use(VueAxios,axios);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
