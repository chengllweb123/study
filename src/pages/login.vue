<template>
    <div class="login">
        <div class="container">
            <a href="javascript:;">
                <img src="/imgs/login-logo.png" alt="">
            </a>
        </div>
        <div class="wrapper">
            <div class="container">
                <div class="logo-form">
                    <h3 class="title">
                        <span class="checked">帐号登录</span><span class="sep-line">|</span><span>扫码登录</span>
                    </h3>
                    <div class="input">
                        <input type="text" placeholder="请输入账号"  v-model="username" >
                    </div>
                    <div class="input">
                        <input type="password" placeholder="请输入密码" v-model="password" >
                    </div>
                    <div class="btn-box">
                        <a href="javascript:;" class="btn" @click="login">
                           登录
                        </a>
                    </div>
                    <div class="tips">
                        <div class="tips-left" @click="register">
                            手机短信登录/注册
                        </div>   
                        <div  class="tips-right">
                            立即注册 | 忘记密码
                        </div>                        
                    </div>
                </div>

            </div>
        </div>
        <div class="footer">
            <div class="footer-link">
                <a href="https://coding.imooc.com/class/113.html" target="_blank">vue全家桶实战课程</a><span>|</span>
                <a href="https://coding.imooc.com/class/113.html" target="_blank">vue全家桶实战课程</a><span>|</span>
                <a href="https://coding.imooc.com/class/113.html" target="_blank">vue全家桶实战课程</a><span>|</span>
                <a href="https://coding.imooc.com/class/113.html" target="_blank">vue全家桶实战课程</a><span>|</span>
                <a href="https://coding.imooc.com/class/113.html" target="_blank">vue全家桶实战课程</a>
            </div>
            <p class="copyright">Copyright ©2021  All Rights</p>
        </div>

    </div>
</template>
<script>
import { mapActions } from "vuex";
export default{
   
    name:"login",
    data(){
        return{
            username:"",
            password:""
        }
    },
    methods:{
        login(){
            let {username,password}=this;
            this.axios.post("/user/login",{
                username,
                password
            }).then((res)=>{
                console.log("成功");
                // this.$cookie.set("userId",res.id,{expires:"1M"});
                this.$cookie.set("userId",res.id,{expires:"Session"});
                // this.$store.dispatch("saveUserName",res.username);
                this.saveUserName(res.username);
                this.$router.push("/index");
            })
        },
        ...mapActions(["saveUserName"]),
        register(){
            // this.axios.post("/user/register",{
            //     username:"admin123",
            //     password:"admin123",
            //     email:"admin123@163.com"
            // }).then(()=>{
            //    alert("注册成功");
            // })

        }
    }

}
</script>
<style lang="scss" scoped>
    @import "./../assets/scss/base.scss";
    @import "./../assets/scss/mixin.scss";
    @import "./../assets/scss/config.scss";
    .login{
        &>.container{
            height: 90px;
            a{
                display: inline-block;
                img{
                height:90%;
                width:auto;
            }
            }
           
        }
        .wrapper{
            background:url("/imgs/login-bg.jpg") no-repeat center;
            .container{
                height: 540px;
                @include flex(flex-end,center);
                .logo-form{
                    width:400px;
                    height: 500px;
                    background: #fff;
                    display: flex;
                    justify-content:flex-start;
                    align-items: center;
                    flex-direction: column;
                    .tips{
                        width:348px;
                        @include flex();
                        font-size:14px;
                        margin-top:10px;
                        .tips-left{
                            color:$colorA;
                            cursor: pointer;
                        }
                        .tips-right{
                            color:$colorD;
                            cursor: pointer;
                        }
                    }
                    h3{
                        width:70%;
                        @include flex();
                        font-size: 20px;
                        margin:40px 0 50px 0;
                        .checked{
                            color:$colorA;
                        }
                        .sep-line{
                            color:$colorF;
                        }
                    }
                    .input,.btn-box{
                        width:348px;
                    }
                    .input{
                        display:inline-block;
                        border: 1px solid #E5E5E5;
                        height: 45px;
                        margin-bottom:25px;
                        input{
                            height:100%;
                            width:100%;
                            border:none;
                            padding:0 18px;
                        }
                    }
                    .btn-box{
                        .btn{
                            width:100%;
                            height: 45px;
                            line-height:45px;
                            font-size:16px;
                        }
                    }

                }
            }
        }
        .footer{
            height:80px;
            padding-top:40px;
            color:#999999;
            font-size:16px;
            text-align:center;
            .footer-link{
                a{
                    color:#999999;
                    display:inline-block;
                    font-size:14px;
                }
                span{
                    margin:0 10px;
                }
            }
            .copyright{
                margin-top:13px;
            }

        }
        
    }

</style>