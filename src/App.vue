<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import jsonp from 'jsonp';
// import storage from './storage/index'

export default {
  name: 'App',
  data(){
    return {
    }
  },
  mounted(){
   // jsonp的方式跨域
    // let url="/api/common/adver-getadver";
    // jsonp(url,(err,res)=>{
    //   let result=res;
    //   this.list=result;
    //   console.log(123,err,result)

    // })
    /**
     * storage封装
     */
    // storage.setItem('a',1);
    // storage.setItem('a',{a:1},'user');
    // storage.clear('a');
    // storage.clear('a','user');
    
    /**
     * 引入mock文件
     */
      // this.axios.get('/mock/user/login.json').then((res)=>{
      //   console.log('res',res);
      // })
    /**
     * 本地集成mockjs
     */ 
    this.axios.get('/user/login').then((res)=>{
      console.log('resres',res);
    })
  },
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
