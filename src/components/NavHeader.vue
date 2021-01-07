<template>
    <div class="header">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;">小米商城</a>
                    <a href="javascript:;">MUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" v-if="!username" @click="login">登录</a>
                    <a href="javascript:;" v-if="username">我的订单</a>
                    <a href="javascript:;" class="my-cart"  @click="toCart"><span class="icon-cart"></span>购物车</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <span>小米手机</span>
                        <div class="children">
                            <ul>
                                <li class="product"  v-for="(item,i) in phoneList" :key="i">
                                    <a :href="'/#/detail/'+item.id" target="_blank">
                                        <div class="pro-img">
                                            <img :src="item.mainImage" alt="">
                                        </div>
                                        <div class="pro-name">{{item.name}}</div>
                                        <div class="pro-price">{{item.price | currency}}</div>
                                    </a>
                                </li>                                           
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>RedMin红米</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children"></div>
                    </div>
                </div>
                <div class="header-search">
                    <div class="wrapper">
                        <input type="text" class="keyboad">
                        <a href="javascript:;"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'nav-header',
        data(){
            return {
                username:"",
                phoneList:[]
            }
        },
        filters:{
            currency(val){
                if(!val) return '0.00';
                return `￥${val.toFixed(2)}元`

            }
        },
        mounted(){
            this.getProductList();
        },
        methods:{
            login(){
                this.$router.push('/login');
            },
            toCart(){
                console.log(123);
                console.log(this.$router);
                this.$router.push('/cart');
            },
            getProductList(){
                this.axios.get('/products',{
                    params:{
                        categoryId:'100012',
                        pageSize:6
                    }
                }).then((res)=>{
                    this.phoneList=res.list;
                    console.log(this.phoneList);
                })
            }
        }
       
    }
</script>
<style lang="scss" scoped >
    @import './../assets/scss/base.scss';
    @import './../assets/scss/mixin.scss';
    @import './../assets/scss/config.scss';
    .header{
        .nav-topbar{
           height: 39px; 
           line-height:39px;
           background-color:#333333;
           color:#B0B0B0;
           .container{
           @include flex();
                a{
                    display: inline-block;
                    color:#B0B0B0;
                    margin-right:17px;
                }
                .my-cart{
                    width:110px;
                    background-color:#FF6600;
                    color:#ffffff;   
                    text-align: center; 
                    .icon-cart{
                        display: inline-block;
                        width:16px;
                        height:12px;
                        background:url('/imgs/icon-cart-checked.png') no-repeat center;
                        background-size:contain;
                        margin-right:4px;
                    }              
                }

            }

        }
        .nav-header{
            .container{
                height:112px;
                position: relative;
                @include flex();
                .header-logo{
                    display: inline-block;
                    width:55px;
                    height:55px;
                    background:#FF6600;
                    a{
                        display: inline-block;
                        width:110px;
                        &:before{
                            content:'';
                            display: inline-block;
                            width:55px;
                            height: 55px;
                            background:url('/imgs/mi-logo.png') no-repeat center;
                            background-size:55px;
                            transition: margin 0.2s;
                        }
                        &:after{
                            content:'';
                            display: inline-block;
                            width:55px;
                            height: 55px;
                            background:url('/imgs/mi-home.png') no-repeat center;
                            background-size:55px; 
                        }
                        &:hover:before{
                            margin-left:-55px;
                            transition: margin 0.2s;
                        }

                    }
                }
                .header-menu{
                    display: inline-block;
                    padding-left: 209px;
                    width: 643px;        
                    .item-menu{
                        display: inline-block;
                        color:#333333;
                        font-weight:bold;
                        font-size:16px;
                        line-height:112px;
                        margin-right:24px;
                        span{
                            cursor: pointer;
                        }
                        &:hover{
                            color:$colorA;
                            .children{
                                height:220px;
                                opacity: 1;
                            }
                        }
                        .children{
                            background-color: #ffffff;
                            position: absolute;
                            top:112px;
                            left:0;
                            width: 1226px;
                            height:0;
                            border:1px solid #E5E5E5;
                            box-shadow: 0px 7px 6px 0px rgba(0,0,0,0.11);
                            overflow: hidden;
                            opacity: 0;
                            z-index: 10;
                            transition: height 0.5s;
                            ul{
                                display: flex;
                                flex-direction: row;
                            }
                            .product{
                                position: relative;
                                width:16.6%;
                                height:220px;
                                font-size:12px;
                                line-height:12px;
                                text-align:center;
                                a{
                                    display: inline-block;
                                }
                                img{
                                    width:auto;
                                    height:111px;
                                    margin-top:26px;
                                }
                                .pro-img{
                                    height:137px;
                                }
                                .pro-name{
                                    font-weight:bold;
                                    margin-top:19px;
                                    margin-bottom:8px;
                                    color:$colorB;
                                }
                                .pro-price{
                                    color:$colorA;
                                }
                                &:before{
                                    content:'';
                                    position: absolute;
                                    top:28px;
                                    right:0;
                                    width:1px;
                                    border-left:1px solid $colorF;
                                    height:100px;

                                }
                                &:last-child::before{
                                    display: none;
                                }
                            }
                        }



                    }
                }
                .header-search{
                    width:319px;
                    .wrapper{
                        height:50px;
                        display: flex;
                        align-items:center;
                        border:1px solid #E0E0E0;
                        input{
                            border:none;
                            border-right:1px solid #E0E0E0;
                            width:264px;
                            height:50px;
                            padding-left: 14px;
                            box-sizing:border-box;
                        }
                        a{
                            display: inline-block;
                            width:18px;
                            height:18px;
                            background: url('/imgs/icon-search.png') no-repeat center;
                            background-size: contain;
                            margin: 0 auto;
                        }
                    }
                }

            }

        }
    
    }
</style>

