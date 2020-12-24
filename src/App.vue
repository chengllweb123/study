<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import jsonp from 'jsonp';

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
