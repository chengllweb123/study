<template>
    <div class="order-confirm">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
            <defs>
              <symbol id="icon-add" viewBox="0 0 31 32">
                <title>add</title>
                <path d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z" class="path1"></path>
              </symbol>
              <symbol id="icon-edit" viewBox="0 0 32 32">
                <title>edit</title>
                <path d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z" class="path1"></path>
              </symbol>
              <symbol id="icon-del" viewBox="0 0 32 32">
                <title>delete</title>
                <path d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z" class="path1"></path>
                <path d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path2"></path>
                <path d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path3"></path>
                <path d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path4"></path>
              </symbol>
            </defs>
        </svg>
        <div class="wrapper">
            <div class="container">
                <div class="order-box">
                    <div class="item-address">
                        <h2>收获地址</h2>
                        <div class="address-list">
                            <div class="addr-info" :class="{checked:checkedIndex==i}" @click="checkedIndex=i" v-for="(item,i) of list" :key="i">
                                <div>
                                    <h2>{{item.receiverName}}</h2>
                                    <div class="phone">{{item.receiverMobile}}</div>
                                    <div class="street">{{item.receiverProvince + ' ' + item.receiverCity + ' ' + 
                                        item.receiverDistrict + ' ' + item.receiverAddress}}</div>  
                                </div>
                                <div class="action">
                                    <a href="javascript:;">
                                        <svg class="icon icon-del" @click="delAddress(item)">
                                            <use xlink:href="#icon-del"></use>
                                        </svg>
                                    </a>
                                    <a href="javascript:;">
                                        <svg class="icon icon-edit" @click="editAddress(item)">
                                          <use xlink:href="#icon-edit"></use>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div class="address-add" @click="addAress">
                                <img src="/imgs/icon-setting.png" alt="">
                                <p>添加新地址</p>
                            </div>
                        </div>
                     
                    </div>
                    <div class="item-goods">
                        <h2>商品</h2>
                        <ul>
                            <li v-for="(item,i) of cartList" :key="i">
                              <div class="good-name">
                                <img v-lazy="item.productMainImage" alt="">
                                <span>{{item.productName + ' ' + item.productSubtitle}}</span>
                              </div>
                              <div class="good-price">{{item.productPrice}}元x{{item.quantity}}</div>
                              <div class="good-total">{{item.productTotalPrice}}元</div>
                            </li>
                        </ul>
                    </div>
                    <div class="item-shipping">
                        <h2>配送方式</h2>
                        <span>包邮</span>
                    </div>
                    <div class="item-invoice">
                        <h2>发票</h2>
                        <a href="javascript:;">电子发票</a>
                        <a href="javascript:;">个人</a>
                    </div>
                    <div class="detail">
                        <div class="item">
                           <span class="item-name">商品件数：</span>
                            <span class="item-val">{{count}}</span>
                        </div> 
                        <div class="item">
                            <span class="item-name">商品总价：</span>
                             <span class="item-val">{{cartTotalPrice}}元</span>
                         </div> 
                        <div class="item">
                            <span class="item-name">优惠活动：</span>
                            <span class="item-val">0元</span>
                        </div>
                        <div class="item">
                            <span class="item-name">运费：</span>
                            <span class="item-val">0元</span>
                        </div>
                        <div class="item">
                            <span class="item-total">应付总额：</span>
                            <span class="item-val v1">{{cartTotalPrice}}元</span>
                        </div>
                        <div class="line"></div>
                    </div>
                    <div class="btn-group">
                        <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
                        <a href="javascript:;" class="btn btn-large" @click="toOrder">去结算</a>
                    </div>
                </div>        
            </div>
        </div>
        <modal title="删除确认" modalType="middle" btnType="3" :showModal="showModal"    @cancle="showModal=false" @submit="submitAddress">
            <template v-slot:body>
                <p>确认删除地址？</p>
            </template>
        </modal>
        <modal :title="title" modalType="form" btnType="1" :showModal="showEditModal" @cancle="showEditModal=false"    @submit="submitAddress">
            <template v-slot:body>
                <div class="edit-wrap">
                    <div class="item">
                        <input type="text" placeholder="姓名" v-model="checkedItem.receiverName">
                        <input type="text" placeholder="手机号" v-model="checkedItem.receiverMobile">
                    </div>
                    <div class="item">
                        <select name="provnice" v-model="checkedItem.receiverProvince">
                            <option value="北京">北京</option>
                            <option value="山东">山东</option>
                        </select>
                        <select name="city" v-model="checkedItem.receiverCity">
                            <option value="济南">济南</option>
                        </select>
                        <select name="district" v-model="checkedItem.receiverDistrict">
                            <option value="历下">历下</option>
                            <option value="历城">历城</option>
                            <option value="章丘">章丘</option>
                        </select>
                    </div>
                    <div class="item">
                        <textarea name="street" v-model="checkedItem.receiverAddress"></textarea>
                    </div>
                    <div class="item">
                        <input type="text" placeholder="邮编" v-model="checkedItem.receiverZip">
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>
<script>
    import Modal from "./../components/Modal"
    export default{
        name:'order-confirm',
        data(){
            return{
                title:"",
                list:[],//收货地址列表
                cartList:[],//购物车中需要结算的商品的列表
                cartTotalPrice:0,
                count:0,
                showModal:false,
                showEditModal:false,
                checkedItem:{},//选中的地址
                checkedIndex:0,
                userAction:""//用户操作 0:新增 1：编辑 2：删除



            }
        },
        mounted(){
            this.getAddressList();
            this.getCartList();

        },
        methods:{
            getAddressList(){
                this.axios.get('/shippings').then(res=>{
                    this.list=res.list;
                })

            },
            getCartList(){
                this.axios.get('/carts').then(res=>{
                   let list=res.cartProductVoList;
                    this.cartTotalPrice=res.cartTotalPrice;
                    this.cartList=list.filter(item=>item.productSelected);
                    this.cartList.map(item=>{
                        this.count += item.quantity;
                    })
                    
                })

            },
            delAddress(item){
                this.checkedItem=item;
                this.showModal=true;
                this.userAction=2;

            },
            addAress(){
                this.checkedItem={};
                this.showEditModal=true;
                this.title="新增地址";
                this.userAction=0;

            },
            editAddress(item){
                this.title="编辑地址";
                this.checkedItem=item;
                this.showEditModal=true;
                this.userAction=1;

            },
            submitAddress(){
                // this.showModal=false;
                let {checkedItem,userAction} = this;
                let url,methods;
                let params={};
                if(userAction==0){
                    url="/shippings";
                    methods="post";
                }else if(userAction==1){
                    url=`/shippings/${checkedItem.id}`;
                    methods="put";

                }else if(userAction==2){
                    url=`/shippings/${checkedItem.id}`;
                    methods="delete";
                }
                if(userAction==0 || userAction==1){
                    let errMsg="";
                    let { receiverName, receiverProvince, receiverCity, receiverDistrict, receiverAddress, receiverZip} = checkedItem;
                    if(!receiverName){
                        errMsg="请输入收货人姓名";
                    }
                    if(!receiverProvince){
                        errMsg="请选择省份";
                    }
                    if(!receiverCity){
                        errMsg="请选择市";
                    }
                    if(!receiverDistrict){
                        errMsg="请选择区";
                    }
                    if(!receiverAddress){
                        errMsg="请选择街道";
                    }
                    if(!receiverZip){
                        errMsg="请输入邮编";
                    }
                    if(errMsg){
                        this.$message.error(errMsg);
                        return;

                    } 
                    params={
                        receiverName,    
                        receiverProvince, 
                        receiverCity, 
                        receiverDistrict,
                        receiverAddress, 
                        receiverZip

                    }         
                    
                }
   
                this.axios[methods](url,params).then(()=>{
                    this.closeModal();
                    this.$message.success("操作成功");
                    this.getAddressList();
                })          

            },
            toOrder(){
                let item=this.list[this.checkedIndex];
                if(!item){
                    this.$message.error('请选择一个地址');
                    return;
                }
                this.axios.post('/orders',{
                    shippingId:item.id
                }).then(res=>{
                    this.$router.push({
                        path:"/order/pay",
                        query:{
                            orderNo:res.orderNo
                        }
                    })

                })


            },
            closeModal(){
                this.showModal=false;
                this.showEditModal=false;
                this.checkedItem={};
                this.userAction="";

            }
        },
        components:{
            Modal
        }
      
    }
</script>
<style lang="scss">
    .order-confirm{
        .wrapper{
            background-color:#F5F5F5 ;
            width:100%;
            .container{
                padding:20px 0 100px 0;
               .order-box{
                   background-color: #fff;
                   .item-address{
                       padding:30px;
                       h2{
                           font-size: 20px;
                           color:#333;
                           font-weight:400;
                           margin-bottom:10px;
                       }
                       .address-list{
                           display: flex;
                            .addr-info{
                                box-sizing: border-box;
                                width:271px;
                                height:180px;
                                border:1px solid #E5E5E5;
                                cursor: pointer;
                                margin-right:10px;
                                padding:20px 20px;
                                display:flex;
                                justify-content: space-between;
                                flex-direction: column;
                                .street{
                                    font-size:14px;
                                    margin-top:10px;
                                }
                                .action{
                                    width:100%;
                                    height: 50px;
                                    line-height: 50px;
                                    display: flex;
                                    justify-content: space-between;
                                    .icon{
                                        width: 20px;
                                        height: 20px;
                                        fill:#666;
                                        &:hover{
                                            fill: #FF6700;
                                        }
                                    }
                                  
                                }
                                &.checked{
                                        border:1px solid #ff6700;
                                    }

                            } 
                            .address-add{
                                width:271px;
                                height:180px;
                                border:1px solid #E5E5E5;
                                text-align: center;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                flex-direction: column;
                                p{
                                    font-size:14px;
                                    color:#999;
                                    margin-top:10px;
                                }
                                &.checked{
                                    border:1px solid #ff6700;
                                }
                            } 
                       }
                   }
                   .item-goods{
                    padding-left:30px;
                       ul{
                           li{
                               &:first-child{border-top:1px solid #E5E5E5};
                               border-bottom:1px solid #E5E5E5;
                               display:flex;
                               justify-content: space-between;
                               align-items:center;
                               height:40px;
                               line-height:40px;
                               &:first-child{margin-top:10px;}
                                font-size:16px;
                                color:#333333;
                                .good-name{
                                    flex:5;
                                    img{
                                        width:30px;
                                        height:30px;
                                        vertical-align:middle;
                                    }
                                }
                                .good-price{
                                    flex:2;
                                }
                                .good-total{
                                    padding-right:44px;
                                    color:#FF6600;
                                }

                           }
                       }
                   }
                   .item-shipping{
                       margin-top:20px;
                       padding-left:30px;
                       display: flex;
                       align-items: baseline;
                       h2{
                           width:150px;
                       }
                       span{
                           display: block;
                           font-size:14px;
                           color:#FF6700;
                           font-weight:bold;
                           margin-left:50px;
                       }
                   }
                   .item-invoice{
                       margin-top:20px;
                       padding-left:30px;
                       display: flex;
                       align-items: baseline;
                       h2{
                           width:150px;
                       }
                       a{
                           display: block;
                           font-size:14px;
                           color:#FF6700;
                           font-weight:bold;
                           margin-left:50px;
                       }
                   }
                   .detail{
                       display: flex;
                       flex-direction: column;
                       align-items: flex-end;
                       padding:0 30px;
                       .item{
                           font-size:16px;
                           color:#666;
                           margin-top:10px;
                           .item-name,.item-total{
                               display: inline-block;
                               width:100px;
                               text-align: right;
                           }
                           .item-val{
                               display: inline-block;
                               width:100px;
                               text-align: right;
                               color:#FF6600;
                           }
                           .v1{
                               font-size:20px;
                               font-weight: bold;
                           }
                       }
                   }
                   .btn-group{
                       padding:50px 30px;
                       text-align: right;
                       /* margin-top: 50px; */

                   }
               }
            }
         
        }
       
    }
</style>