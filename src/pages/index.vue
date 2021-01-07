<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
            <ul class="menu-wrap">
                <li class="menu-item">
                    <a href="">手机 电话卡</a>
                    <div class="children">
                        <ul v-for="(item,i) of menuList" :key="i">
                            <li v-for="(sub,index) of item" :key="index">
                                <a :href="sub?'/#/product/'+sub.id:''">
                                    <img v-lazy="sub.img || '/imgs/item-box-1.png'" alt="">
                                    {{sub.name || '小米cc9'}}
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="menu-item">
                    <a href="">电视盒子 电话卡</a>
                </li>
                <li class="menu-item">
                    <a href="">笔记本 平板</a>
                </li>
                <li class="menu-item">
                    <a href="">家电 插线板</a>
                </li>
                <li class="menu-item">
                    <a href="">出行 穿戴</a>
                </li>
                <li class="menu-item">
                    <a href="">智能 路由器</a>
                </li>
                <li class="menu-item">
                    <a href="">生活 箱包</a>
                </li>
                <li class="menu-item">
                    <a href="">生活 箱包</a>
                </li>
            </ul>
        </div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,i) in slideList" :key="i">
            <a v-bind:href="'/#/product/'+item.id"><img v-bind:src="item.img"></a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
          <a :href="'/#/product/'+item.id" v-for="(item,i) of adsList" :key="i">
              <img v-lazy="item.img" alt="">
          </a>
      </div>
      <div class="banner">
        <a href="/#/product/30" >
            <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>
    </div>
    <div class="product-box">
        <div class="container">
            <h2>手机</h2>
            <div class="wrapper">
                <div class="banner-left">
                    <a href="/#/product/35">
                        <img v-lazy="'/imgs/mix-alpha.jpg'" alt="">
                    </a>
                </div>
                <div class="list-box">
                    <div class="list" v-for="(arr1,i) of phoneList" :key="i">
                        <div class="item" v-for="(item,index) in arr1" :key="index">
                            <span class="index%2==0?'new-pro':'kill-pro'">新品</span>
                            <div class="item-img">
                                <img v-lazy="item.mainImage" alt="">
                            </div>
                            <div class="item-info">
                                <h3>{{item.name}}</h3>
                                <p>{{item.subtitle}}</p>
                                <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <service-bar></service-bar>
    <modal title="提示" sureText="查看购物车" btnType="1" modalType="middle" :showModal="showModal" @submit="gotoCart" @cancle="showModal=false">
        <template v-slot:body>
            商品添加成功！
        </template>
    </modal>
  </div>
</template>
<script>
  import ServiceBar from './../components/ServiceBar'
  import Modal from './../components/Modal'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'
  export default{
    name:'index',
    data(){
      return {
        swiperOption:{
          autoplay:true,
          loop:true,
          effect:'cube',
          cubeEffect: {
            shadowOffset: 100,
            shadowScale: 0.6
          },
          pagination: {
            el: '.swiper-pagination',
            clickable:true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        },
        slideList:[
          {
            id:'42',
            img:'/imgs/slider/slide-1.jpg'
          },
          {
            id:'45',
            img:'/imgs/slider/slide-2.jpg'
          },
          {
            id:'46',
            img:'/imgs/slider/slide-3.jpg'
          },
          {
            id:'',
            img:'/imgs/slider/slide-4.jpg'
          },
          {
            id:'',
            img:'/imgs/slider/slide-1.jpg'
          }
        ],
        menuList:[
            [
                {
                    id:'30',
                    img:'/imgs/item-box-1.png',
                    name:'小米c99'
                },
                {
                    id:'31',
                    img:'/imgs/item-box-2.png',
                    name:'小米青春版'
                },
                {
                    id:'32',
                    img:'/imgs/item-box-3.jpg',
                    name:'红米'
                },
                {
                    id:'33',
                    img:'/imgs/item-box-4.jpg',
                    name:'移动4g'
                }
            ],
            [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
        ],
        adsList:[
            {
                id:33,
                img:'/imgs/ads/ads-1.png'
            },
            {
                id:48,
                img:'/imgs/ads/ads-2.jpg'
            },
            {
                id:45,
                img:'/imgs/ads/ads-3.png'
            },  {
                id:47,
                img:'/imgs/ads/ads-4.jpg'
            }

        ],
        phoneList:[],
        showModal:false
      }
    },
    created(){
        console.log('phoneList1', this.phoneList);
         this.init();
    },
    methods:{
        init(){
            this.axios.get('/products',{params:{categoryId:100012,pageSize:14}}).then((res)=>{
                res.list=res.list.slice(6,14);
                this.phoneList=[res.list.slice(0,4),res.list.slice(4,8)];
                console.log('phoneList', this.phoneList);
            })
        },
        addCart(){
            this.showModal=true;
        //     this.axios.post('/cart',{
        //         productId:id,
        //         selected:true
        //     }).then(res=>{

        //     }).catch(res=>{
        //         this.showModal=true;
        //     });
         },
         gotoCart(){
             this.$router.push('/cart');
         }

    },
    components:{
      swiper,
      swiperSlide,
      ServiceBar,
      Modal
    },

  }
</script>
<style lang="scss">
    @import './../assets/scss/mixin.scss';
    @import './../assets/scss/base.scss';
    @import './../assets/scss/config.scss';
  .index{
    .swiper-box{
        .nav-menu{
            position: absolute;
            width:264px;
            height:451px;
            z-index: 9;
            padding:26px 0;
            box-sizing:border-box;
            background-color:#55585a7a;
            .menu-wrap{
                .menu-item{
                    height:50px;
                    line-height:50px;
                    a{
                        display: block;
                        position: relative;
                        color:#ffffff;
                        font-size:16px;
                        padding-left:30px;
                        &:after{
                            position: absolute;
                            top:17.5px;
                            right: 30px;
                            content:'';
                            @include bgImg(10px,15px,'/imgs/icon-arrow.png');
                        }
                    }
                    &:hover{
                        background-color: $colorA;
                        .children{
                            display: block;
                        }
                    }
                    .children{
                        display: none;
                        width: 962px;
                        height:451px;
                        background-color: #ffffff;
                        position: absolute;
                        top: 0;
                        left:264px;
                        border:1px solid $colorH;
                        ul{
                            display: flex;
                            justify-content: space-between;
                            height: 75px;
                            li{
                                height: 75px;
                                line-height:75px;
                                flex:1;
                                padding-left:23px;
                                a{
                                    color:$colorB;
                                    font-size:14px;
                                }
                        
                            }
                            img{
                                    width:42px;
                                    height:35px;
                                    vertical-align: middle;
                                    margin-right:15px;
                            }
                        }
                    }
                }

            }
        }
      .swiper-container {
        height: 451px;
        .swiper-button-prev{
            left:274px;
        }
        img{
          width:100%;
          height:100%;
        }
      }  
    }
    .ads-box{
        @include flex();
        margin-top: 14px;
        margin-bottom: 31px;
        a{
            width:296px;
            height:167px;
        }
    }
    .banner{
        margin-bottom:50px;
    }
    .product-box{
        background-color: $colorJ;
        padding: 30px 0 50px 0;
        h2{
            font-size: 22px;
            height:21px;
            line-height: 21px;
            color:$colorB;
            margin-bottom:20px;
        }
        .wrapper{
            display: flex;
            .banner-left{
                margin-right: 16px;
                img{
                    width:224px;
                    height:619px;
                }
            }
            .list-box{
                .list{
                    @include flex();
                    width:986px;
                    margin-bottom:14px;
                    &:last-child{
                        margin-bottom:0; 
                    }
                    .item{
                        width:236px;
                        height:302px;
                        background-color: $colorG;
                        text-align:center;
                        span{
                            display: inline-block;
                            width:67px;
                            height:24px;
                            font-size:14px;
                            line-height: 24px;
                            color:#fff;
                            &.new-pro{
                                background-color: #7ecF68;
                            }
                            &.kill-pro{
                                background-color: #e82626;
                            }
                            
                        }
                        .item-img{
                            img{
                                height: 195px;
                                width:100%;

                            }                          

                        }
                        .item-info{
                            h3{
                                font-size: 14px;
                                color:$colorB;
                                line-height:14px;
                                font-weight:bold;
                                
                            }
                            p{
                                color:$colorD;
                                line-height:13px;
                                margin-top: 6px;
                                margin-bottom:13px;

                            }
                            .price{
                                color:#F20A0A;
                                font-size: 14px;
                                font-weight: bold;
                                cursor: pointer;
                                &:after{
                                    content:'';
                                    @include bgImg(22px,22px,'/imgs/icon-cart-hover.png');
                                    margin-left:5px;
                                    vertical-align:middle;
                                }
                            }
                            
                        }

                    }
                }
            }
    
        }
    }
  }
</style>