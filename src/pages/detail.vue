<template>
    <div class="detail">
        <product-param :title="product.name"></product-param>
        <div class="top">
            <div class="container">
                <div class="left">
                    <swiper :options="swiperOption">
                        <swiper-slide >
                            <img src="/imgs/detail/phone-1.jpg">
                        </swiper-slide>
                        <swiper-slide >
                            <img src="/imgs/detail/phone-2.jpg">
                        </swiper-slide>
                        <swiper-slide >
                            <img src="/imgs/detail/phone-3.jpg">
                        </swiper-slide>
                        <swiper-slide >
                            <img src="/imgs/detail/phone-4.jpg">
                        </swiper-slide>
                        <!-- Optional controls -->
                        <div class="swiper-pagination"  slot="pagination"></div>
                      </swiper>
                </div>
                <div class="right">
                    <h2 class="item-title">{{product.name}}</h2>
                    <p class="item-info">相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红 外人脸解锁 / A</p>
                    <div class="delivery">小米自营</div>
                    <div class="item-price">
                        <span>{{product.price}}元</span>
                        <s>2999元</s>
                    </div>
                    <div class="line"></div>
                    <div class="item-address">
                        <div class="item-address_p">
                            <div class="icon-loc"></div>
                            <div class="addr">
                                北京 北京市 朝阳区 安定门街道
                            </div>

                        </div>

                       <div class="stock">现货</div>
                    </div>
                    <div class="version">
                        <p>选择版本</p>
                        <div class="phone">
                            <div class="phone1" :class="version==1?'checked':''" @click="version=1">6GB+64GB 全网通   <span>1099元</span></div>
                            <div class="phone1" :class="version==2?'checked':''" @click="version=2">4GB+64GB 移动4G   <span>1049元</span></div>
                        </div>
                    </div>
                    <div class="item-color">
                        <p>选择颜色</p>
                        <div class="phone1 checked">
                            <span class="color"></span>
                            深空灰
                        </div>
                    </div>
                    <div class="item-total">
                        <div class="phone-info">
                            <div class="">{{product.name}} {{version==1?'6GB+64GB 全网通':'4GB+64GB 移动4G'}} 深灰色</div>
                            <div>{{product.price}}元</div>
                        </div>
                        <div class="phone-total">总计：{{product.price}}</div>
                    </div>
                    <div class="add">
                        <button class="btn" @click="addCart">加入购物车</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="container">
                <div class="shuoming">
                    价格说明
                </div>
                <div class="item-price">
                    <img src="/imgs/detail/item-price.jpeg" alt="">
                </div>
            </div>
        </div>
        <service-bar></service-bar>
    </div>
</template>
<script>
    import ProductParam from "./../components/ProductParam"
    import ServiceBar from "./../components/ServiceBar"
    import { swiper, swiperSlide } from  'vue-awesome-swiper'
    import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'
    export default{
        name:'detail',
        data(){
            return {
                id:this.$route.params.id,//商品id
                version:1,//选中的商品的型号
                product:{},
                swiperOption:{
                    autoplay:true,
                    // loop:true,
                    // effect:'cube',
                    // cubeEffect: {
                    //     shadowOffset: 100,
                    //     shadowScale: 0.6
                    // },
                        pagination: {
                        el: '.swiper-pagination',
                        clickable:true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                }

            }
        },
        mounted(){
            this.getProductInfo();
        },
        methods:{
            getProductInfo(){
                this.axios.get(`/products/${this.id}`).then(res=>{
                    this.product=res;
                });
            },
            addCart(){
                this.axios.post('/carts',{
                    productId:this.id,
                    selected:true
                }).then((res={cartProductVoList:0})=>{
                    console.log(res);
                    this.$store.dispatch('saveCartCount',res.cartTotalQuantity);


                });
            }
        },
        components:{
            ProductParam,
            ServiceBar  ,
            swiper,
            swiperSlide
        }
    }
</script>
<style lang="scss">
    @import "./../assets/scss/mixin.scss";
    @import "./../assets/scss/config.scss";
    .detail{
        .top{
            margin-top:50px;
            height:auto;
            .container{
                display: flex;
                justify-content: space-between;
                .left{
                    width:642px;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
                .right{
                    width:50%;
                    padding-left:10px;
                    .item-title{
                        font-size:28px;
                        color:#333;
                    }
                    .item-info{
                        font-size: 14px;
                        color:#999;
                        margin: 16px 0;
                    }
                    .delivery{
                        font-size: 16px;
                        color:$colorA;
                        font-weight:bold;
                    }
                    .item-price{
                        margin:10px 0 20px 0;
                        span{
                            font-size: 20px;
                            color:$colorA;
                            font-weight:bold;
                            margin-right:20px;
                        }
                        s{
                            font-size: 13px;
                            color:#999;
                        }
                    }
                    .line{
                        width:99%;
                        /* background-color:#999; */
                        border-top:1px solid #999;
                    }
                    .item-address{                   
                        height: 108px;
                        background: #FAFAFA;
                        border: 1px solid #E5E5E5;
                        margin:25px 0;
                        font-size: 14px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        padding-left:34px;
                        .item-address_p{
                            display: flex;
                            .addr{                              
                                color:#666;
                            }
                            .icon-loc{
                                @include bgImg(20px,20px,'/imgs/detail/icon-loc.png');
                                margin-right: 5px;
                            }
                        }
                        .stock{
                                color:$colorA;
                                font-weight:bold;
                                margin-top:10px;
                                margin-left:25px;
                        }
                    }
                    .version{
                        p{
                            font-size: 18px;
                            color:#333;
                            font-weight:bold;
                            
                        }
                        .phone{
                            margin:20px 0;
                            display: flex;
                            justify-content: space-between;
                            .phone1{
                                width:282px;
                                height: 50px;
                                line-height:50px;
                                text-align:center;
                                color:#333;    
                                font-size:16px;   
                                border: 1px solid #E5E5E5;
                                span{
                                    color:#999;
                                }
                                &.checked{
                                    color:$colorA !important;
                                    border:1px solid $colorA !important;
                                }

                            }
                        }
                     
                    }
                    .item-color{
                        p{
                            font-size: 18px;
                            color:#333;
                            font-weight:bold;
                            
                        }
                        .phone1{
                            margin-top:20px;
                            width:282px;
                            height: 50px;
                            line-height:50px;
                            text-align:center;
                            color:#333;    
                            font-size:16px;   
                            border: 1px solid #E5E5E5;
                            .color{
                                display: inline-block;
                                width:10px;
                                height:10px;
                                background:#666;
                                margin-right:10px;
                            }
                            &.checked{
                                color:$colorA !important;
                                border:1px solid $colorA !important;
                            }
                        }

                    }
                    .item-total{
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        padding:0 50px;
                        background: #FAFAFA;
                        height:108px;
                        margin:30px 0 40px 0;
                        .phone-info{
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            font-size:14px;
                            color:#333;
                            
                        }
                        .phone-total{
                            font-size: 24px;
                            color:$colorA;
                            font-weight:bold;
                            margin-top:15px;
                        }
                    }
                    .add{
                        margin-bottom:50px;
                        button{
                            width:300px;
                            height:54px;
                        }
                    }
                }
            }
        }
        .bottom{
            width:100%;
            height:340px;
            background: #F3F3F3;
            display:flex;
            flex-direction:column;
            align-items:center;
            .shuoming{
                align-self: start;
                margin:30px 0;
                font-size:24px;
                color:#333333;
                font-weight: bold;
            }

        }
    }

</style>