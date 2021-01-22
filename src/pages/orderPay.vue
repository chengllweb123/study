<template>
    <div class="order-pay">
        <order-header title="订单支付">
            <template v-slot:tip>
                <span>请确认支付</span>
            </template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="top">
                    <div class="tijiao">
                        <div class="left-img">
                            <img src="/imgs/icon-gou.png" alt="">
                        </div>
                        <div class="right-content">
                            <div>
                                <h2>订单提交成功！去付款咯～</h2>
                                <p>请在<span class="time">0小时30分</span>内完成支付, 超时后将取消订单<br> 收货信息：{{addressInfo}}</p>
                            </div>
                            <div class="r">
                                <div>应付总额：<span class="price">{{payment}}</span><span class="biao">元</span></div>
                                <p @click="showDetail=!showDetail">
                                    订单详情
                                    <img :class="{up:showDetail}" src="/imgs/icon-down.png" alt="">
                                </p>
                            </div>
                        </div>
                    </div> 
                    <div class="line" v-if="showDetail"></div>               
                    <div class="tijiao-detail" v-if="showDetail">
                        <div><span class="t-t">订单号：</span><span class="t-val order">{{orderNo}}</span></div>
                        <div><span class="t-t">收获信息：</span><span class="t-val">{{addressInfo}}</span></div>
                        <div class="goods">
                            <div class="t-t">商品名称：</div>
                            <div class="t-val">
                            <ul>
                                <li v-for="(item,index) of orderDetail" :key="index">
                                  <img class="t-img"  v-lazy="item.productImage"/>{{item.productName}}
                                </li>
                            </ul>
                        </div>
                    </div>
                        <div><span class="t-t">发票信息：</span><span class="t-val">个人</span></div>
                    </div>
                </div>
                <div class="bottom">
                    <h2>选择以下支付方式付款</h2>
                    <div class="line"></div>
                    <h3>支付平台</h3>
                    <div class="paytype">
                        <div class="item1" :class="{checked:payType==1}" @click="paySubmit(1)">
                            <img src="/imgs/pay/icon-ali.png" alt="">
                        </div>
                        <div class="item1" :class="{checked:payType==2}" @click="paySubmit(2)">
                            <img src="/imgs/pay/icon-wechat.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <scan-pay-code v-if="showpay" @close="closePay" :img="payImg"></scan-pay-code>
        <modal title="支付确认" btnType="3" :showModal="showPayModal" sureText="查看订单" cancleText="未支付" @cancle="showPayModal=false" @submit="toOrderList">
            <template v-slot:body>
                <p>您确认是否完成支付？</p>
            </template>
        </modal>
    </div>
</template>
<script>
    import QRCode from 'qrcode';
    import ScanPayCode from "./../components/ScanPayCode";
    import Modal from "./../components/Modal";
    import OrderHeader from "./../components/OrderHeader"
    export default{
        name:'order-pay',
        data(){
            return{
                orderNo:this.$route.query.orderNo,
                payType:1,
                showDetail:false,
                content:"",
                orderDetail:[],//订单详情，包含商品列表
                addressInfo:'',//收货人地址
                showpay:false,
                showPayModal:false,
                payImg:"",
                payment:0,
                T:""//定时器
            }
        },
        mounted(){
            this.getOrderDetail();
        },
        methods:{
            //轮询订单状态
            loopOrderStatus(){
                this.T=setInterval(() => {
                   this.axios.get(`/orders/${this.orderNo}`).then(res=>{
                       if(res.status==20){
                           clearInterval(this.T);
                           this.toOrderList();
                       }
                   }) 
                }, 1000);

            },
            toOrderList(){
                this.$router.push('/order/list');
            },
            getOrderDetail(){
                this.axios.get(`/orders/${this.orderNo}`).then(res=>{
                    let item = res.shippingVo;
                    this.addressInfo=`${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`;
                    this.orderDetail = res.orderItemVoList;
                    this.payment=res.payment;
                })
            },
            paySubmit(payType){
                this.payType=payType;
                if(payType == 1){
                    window.open('/#/order/alipay?orderId='+this.orderNo,'_blank');
                }else{
                    this.axios.post('/pay',{
                    orderId:this.orderNo,
                    orderName:'Vue高仿小米商城',
                    amount:0.01,//单位元
                    payType:2 //1支付宝，2微信
                    }).then((res)=>{
                        QRCode.toDataURL(res.content)
                        .then(url => {
                           this.showpay=true;
                           this.payImg=url;
                           this.loopOrderStatus();
                        })
                        .catch(() => {
                            this.$message.error("请稍后重试");
                        })
                    })
                }
            },
            closePay(){
                this.showpay=false;
                this.showPayModal=true;
                clearInterval(this.T);
            }
        },
        components:{
            ScanPayCode,
            Modal,
            OrderHeader
        }
    }
</script>
<style lang="scss" scoped>
    .order-pay{
       .wrapper{
           background:#F5F5F5;
           padding:50px 0;
           box-sizing:border-box;
          .container{
              display: flex;
              flex-direction: column;
              .top{
                  width:100%;
                  background:#fff;
                  box-sizing:border-box;
                  padding:40px 50px;
                  .tijiao{
                      display: flex;
                      justify-content: space-between;
                      width:100%;
                      padding: 40px 0;
                      .left-img{
                          width:90px;
                          height: 90px;
                          border-radius:50%;
                          background-color:#3dcf9e;    
                          display:flex;
                          justify-content: center;
                          align-items:center;
                          margin:0 53px;
                          img{
                              width:50%;
                          }
                                   
                        }
                        .right-content{
                            width:930px;
                            display: flex;
                            justify-content: space-between;
                            font-size:14px;
                            color:#666;
                           
                            img{
                                width:14px;
                                height: 10px;
                                margin-left:10px;
                                transition :all 1s;
                                &.up{
                                  
                                    transform: rotate(180deg);
                                }
                            }
                            .time,.price,.biao{
                                color:#FF6600;
                            }
                            .price{
                                font-size:20px;
                               
                                font-weight: bold;
                            }
                            .biao{
                                font-size:14px;
                            }
                            p{
                                margin-top:15px;
                                line-height: 25px;
                            }
                            .r{
                                text-align: right;
                                p{
                                    cursor: pointer;
                                }
                            }                       

                        }

                  }
                .line{
                        width:100%;
                        border-top:1px solid #D7D7D7;
                        margin-bottom: 40px;
                }
                .tijiao-detail{
                    margin-left:196px;
                    font-size:14px;
                    line-height: 30px;
                    color:#333;
                    .goods{
                        display: flex;
                    }
                    .t-t{
                        display: inline-block;
                        width:10%;          
                      
                    }
                    .t-img{
                        width: 30px;
                        vertical-align: middle;
                           
                        }
                    .t-val{
                        display: inline-block;
                        width:50%;
                        &.order{
                            color:#ff6600;
                        }
                    }
                }


              }
              .bottom{
                width:100%;
                background:#fff;
                box-sizing:border-box;
                padding:40px 50px;
                margin-top:30px;
                .line{
                    width:100%;
                    border-top:1px solid #D7D7D7;
                    margin: 40px 0;
                }
                h2{
                    font-size: 20px;
                    color:#333;
                }
                h3{
                    font-size: 18px;
                    color:#333;
                    margin-bottom:20px;
                }
                .paytype{
                    width:100%;
                    display: flex;
                    margin-bottom:40px;
                    .item1{
                        width:188px;
                        height: 64px;
                        border:1px solid #D7D7D7;
                        display:flex;
                        justify-content: center;
                        align-items:center;
                        img{
                            width:103px;
                            height: 38px;
                        }
                        &+div{
                            margin-left:20px;
                        }
                        &.checked{
                            border:1px solid #FF6600;
                        }
                    }
                   
                }
                
              }

          } 
       } 
    }
</style>