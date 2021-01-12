<template>
    <div class="nav-bar" :class="{is_fixed:isFixed}">
        <div class="container">
            <div class="pro-title">
                小米8 透明探索版
            </div>
            <div class="pro-param">
                <a href="">概述</a><span>|</span>
                <a href="">参数</a><span>|</span>
                <a href="">用户评价</a>
                <slot name="buy"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'nav-bar',
        data(){
            return {
                isFixed:false
            }
        },
        mounted(){
            window.addEventListener("scroll",this.initHeight)
        },
        methods:{
            initHeight(){
                let scroll=window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                this.isFixed=scroll > 152 ? true : false;
            }
        },
        destroyed(){
            window.removeEventListener("scroll",this.initHeight,false);
        }
    }
</script>
<style lang="scss">
    .nav-bar{
        height:70px;
        border-top:1px solid #e5e5e5;
        line-height: 70px;
        background-color: #fff;
        box-shadow: 0 5px 5px #ccc;
        &.is_fixed{
            position: fixed;
            top:0;
            width:100%;
        }
        .container{
            display: flex;
            justify-content::space-between;
            align-items:center;
            .pro-title{
                font-size: 18px;
                color:#333333;
                font-weight: bold;
            }
            .pro-param{
                font-size: 14px;
                a{
                    color:#666666;
                }
                span{
                    margin:0 10px;
                }
               
            }

        }
      
    }

</style>