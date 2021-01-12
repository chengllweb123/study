<template>
    <div class="product">
        <product-param>
            <template v-slot:buy>
                <button class="btn">立即购买</button>
            </template>
        </product-param>
        <div class="content">
            <div class="item-bg">
                <h2>小米 8</h2>
                <h3>8 周 年 旗 舰 版</h3>
                <p>
                    <a href="javascript:;">全球首款双频 GPS</a><span>|</span>
                    <a href="javascript:;">骁龙845</a><span>|</span>
                    <a href="javascript:;">AI 变焦双摄</a><span>|</span>
                    <a href="javascript:;">红外人脸识别</a>
                </p>
                <div class="price">
                    <span class="biao">￥</span><span class="money">2999</span>
                </div>
            </div>
            <div class="item-bg1">   
            </div>
            <div class="item-bg2"></div>
            <div class="item-swiper">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,i) in slideList" :key="i">
                     <img :src="item.img">
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                  </swiper>
                  <p class="desc">小米8 AI变焦双摄拍摄</p>
            </div>
            <div class="item-video">
                <h2>60帧超慢动作摄影<br>慢慢回味每一瞬间的精彩</h2>
                <p>
                    后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br> 更能AI 精准分析视频内容，15个场景智能匹配背景音效。
                </p>
                <div class="video-bg" @click="showSlide=true">
                </div>
                <div class="video-box">
                    <div class="overlay" v-show="showSlide"></div>
                    <div class="video" :class="{slide:showSlide}">
                        <span class="icon-close" @click="showSlide=false"></span>
                        <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ProductParam from './../components/ProductParam'
    import { swiper, swiperSlide } from  'vue-awesome-swiper'
    import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'
    export default{
        name:'product',
        data(){
            return {
                showSlide:false,
                slideList:[
                {img:"/imgs/product/gallery-2.png"},
                {img:"/imgs/product/gallery-3.png"},
                {img:"/imgs/product/gallery-4.png"},
                {img:"/imgs/product/gallery-5.jpg"},
                {img:"/imgs/product/gallery-6.jpg"}
            ],
            swiperOption:{
                autoplay:true,
                slidesPerView:3,
                spaceBetween: 30,
                freeMode: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable :true
                }
            }

            }
        },
      
        components:{
            ProductParam,
            swiper,
            swiperSlide
        }
    }
</script>
<style lang="scss">
     @import "./../assets/scss/config.scss";
     @import "./../assets/scss/mixin.scss";
    .product{
        button{
            margin-left:10px;
        }
        .content{
            .item-bg{
                width:100%;
                height:718px;
                background:url("/imgs/product/product-bg-1.png") no-repeat center;
                text-align:center;
                h2{
                    font-size:80px;
                    padding-top:55px;
                }
                h3{
                    font-size: 24px;
                }
                p{
                    margin-top:20px;
                    a{
                    font-size: 16px;
                    color:$colorB;
                    }
                    span{
                        display: inline-block;
                        margin:0 10px;
                    }

                }
                .price{
                    margin-top:30px;
                    .biao{
                        font-size: 30px;
                    }
                    .money{
                        font-size: 38px;
                    }
                }
                
            }
            .item-bg1{
                width:1226px;
                height: 500px;
                border:1px dashed #000;
                height:397px;
                background:url("/imgs/product/product-bg-2.png") no-repeat center;
                background-size:100%;
                margin:50px auto;
            }
            .item-bg2{
                width:100%;
                height: 638px;
                background:url("/imgs/product/product-bg-3.png") no-repeat center;
                background-size:auto 100%;
            }
            .item-swiper{
                margin:36px auto 52px;
                img{
                    width:100%;
                }
                .desc{
                    font-size:18px;
                    color:$colorB;
                    text-align:center;
                    margin-top:5px;
                }
            }
            .item-video{
                height: 1044px;
                background-color: #070708;
                text-align: center;
                margin-bottom:50px;
                h2{
                    font-size: 60px;
                    color:#fff;
                    padding-top:82px;
                    margin-bottom:47px;
                }
                p{
                    font-size: 24px;
                    color:#fff;
                    margin-bottom:58px;
                }
                .video-bg{
                    background:url('/imgs/product/gallery-1.png') no-repeat center;
                    background-size:cover;
                    width:1226px;
                    height:540px;
                    margin:0 auto 120px;
                    cursor:pointer;
                 }
                .video-box{
                    width:100%;
                    .overlay{
                        @include position(fixed);
                        background-color:#333333;
                        opacity:.4;
                        z-index:10;
                    }
                    .video{
                        position:fixed;
                        top:-50%;
                        left:50%;
                        transform: translate(-50%,-50%);
                        width:1000px;
                        height:536px;
                        z-index:10;
                        opacity: 0;
                        transition: all 1s;
                        .icon-close{
                            position:absolute;
                            top:20px;
                            right:20px;
                            @include bgImg(20px,20px,'/imgs/icon-close.png');
                            cursor:pointer;
                            z-index:11;
                        }
                        &.slide{
                            top:50%;
                            opacity: 1;
                        }

                    }
                    video{
                        width:100%;
                        height:100%;
                        object-fit:cover;
                        outline:none;
                    }
                }
            }
        }
    }
</style>