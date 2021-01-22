<template>
    <div class="order-list">
        <order-header title="订单列表">
            <template v-slot:tip>
                <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
            </template>
        </order-header>
    <div class="wrapper">
        <div class="container">
            <div class="order-box">
                <loading v-if="loading"></loading>
                <div class="list-item" v-for="(order,i) of list" :key="i">
                    <div class="top-title">
                        <div class="t-left">
                            {{order.createTime}}  <span>|</span>{{order.receiverName}} <span>|</span> 订单号：{{order.orderNo}}<span>|</span>{{order.paymentTypeDesc}}
                        </div>
                        <div class="t-right">
                            应付金额：<span>{{order.payment}}</span>元
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="goods-list">
                            <div class="goods" v-for="(item,index) in order.orderItemVoList" :key="index">
                                <div class="g-left">
                                    <div class="img">
                                        <img v-lazy="item.productImage" alt="">
                                    </div>
                                    <div class="text">
                                        <p>{{item.productName}}</p>
                                        <p>{{item.totalPrice + '元X' + item.quantity}}</p>
                                    </div>   
                                </div>
                            </div>
                        </div>
                        <div class="g-right" v-if="order.status !=20">
                            <div @click="goPay(order.orderNo)">
                                {{order.statusDesc}}
                            </div>
                        </div>
                        <div class="g-right" v-else>
                            <div>
                                {{order.statusDesc}}
                            </div>
                        </div>
                    </div>
                </div>
                <el-pagination v-if="false" class="pagination"
                    background
                    layout="prev, pager, next"
                    :total="total" :pageSize="pageSize" @current-change="handleCurrentChange" :current-page="pageNum">
                </el-pagination>
                <div class="loading-more" v-if="showNext">
                    <el-button type="primary" :loading="loading1" @click="loadMore">加载更多</el-button>
                </div>
                <div class="scroll-more" v-infinite-scroll="scrollMore" infinite-scroll-disabled="busy" infinite-scroll-distance="400">
                    <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading1">
                </div>
            </div>         
            <no-data v-if="!loading && list.length==0"></no-data>
        </div>
    </div>
</div>
</template>
<script>
    import OrderHeader from "./../components/OrderHeader"
    import Loading from "./../components/Loading"
    import NoData from "./../components/NoData"
    import { Pagination,Button }  from 'element-ui'
    import infiniteScroll from 'vue-infinite-scroll'
    export default{
        name:'order-list',
        data(){
            return {
                loading:true,
                loading1:false,
                list:[],
                pageSize:10,
                pageNum:1,
                total:0,
                busy:false,//滚动加载，是否触发,false时触发滚动加载
                showNext:true //是否有下一页
            }
        },
        directives: {
            infiniteScroll
        },
        mounted(){
            this.getOrderList(1);

        },
        methods:{
            getOrderList(type){
                this.busy=true;
                this.axios.get('/orders',{
                    params:{
                        pageNum:this.pageNum
                    }
                }).then(res=>{
                    if(type==1){
                        this.list=res.list;

                    }else{
                        this.list=this.list.concat(res.list);
                    }
                    this.showNext=res.hasNextPage;
                    this.loading=false;
                    this.loading1=false;
                    this.busy=false;
                    this.total=res.total;
                }).catch(()=>{
                    this.loading=false;
                    this.loading1=false;
                });
            },
            goPay(orderNo){
                this.$router.push({
                    path:"/order/pay",
                    query:{
                        orderNo
                    }
                })
            },
            handleCurrentChange(val){
                this.pageNum=val;
                this.getOrderList(1);
            },
            loadMore(){
                this.loading1=true;
                this.pageNum=this.pageNum+1;
                this.getOrderList(2);

            },
            getList(){
                this.loading1=true;
                this.axios.get('/orders',{
                    params:{
                        pageNum:this.pageNum
                    }
                }).then(res=>{               
                    this.list=this.list.concat(res.list);                  
                    this.loading1=false;  
                    if(res.hasNextPage){
                        this.busy=false;
                    }else{
                        this.busy=true;
                    }
                }).catch(()=>{
                    this.busy=false;
                    this.loading1=false;
                });
            },
            scrollMore(){
                this.busy = true;
                setTimeout(()=>{
                    this.pageNum=this.pageNum+1;
                    this.getList();
                },1000)              
            }

        },
        components:{
            OrderHeader,
            Loading,
            NoData,
            [Pagination.name]:Pagination,
            [Button.name]:Button
        }
    }
</script>
<style lang="scss">
.order-list{
    .wrapper{
        background-color: #f5f5f5;
        box-sizing:border-box;
        padding:30px 0;
        .order-box{
            .list-item{
                margin-bottom:15px;
                .top-title{
                    padding:0 30px;
                    box-sizing: border-box;
                    background-color: #FFFAF7;
                    height:74px;
                    width:100%;
                    line-height:74px;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    .t-left,.t-right{
                        font-size:16px;
                        color:#666;
                    }
                    .t-left{
                        span{
                            display: inline-block;
                            color:#999;
                            margin: 0 10px;
                        }
                    }
                    .t-right{
                        span{
                            font-size:26px;
                            color:#333;
                            font-weight:bold;
                        }
                    }
                }
                .bottom{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #fff;
                    padding:10px 30px;
                    box-sizing: border-box;
                    width: 100%;
                    .goods-list{  
                        width:70%;     
                        .goods{
                            width:60%;
                            display: flex;
                            justify-content:space-between;
                            align-items:center;
                            margin-top:20px;
                            .g-left{
                                width:100%;
                                display: flex;
                                justify-content: flex-start;
                                align-items:center;
                                .img{
                                    width:112px;
                                    img{
                                        width:100%;
                                    }
                                }
                                .text{
                                    font-size:20px;
                                    color:#333;                          
                                    line-height:30px;
                                    
                                }
                            }
                        
                        }
                    }
                .g-right{
                    font-size:20px;
                    color:#FF6600;
                    font-weight: bold;
                    cursor: pointer;
                }

             }
         
            }
            .pagination{
                text-align: right;
            }
            .loading-more,.scroll-more{
                text-align: center;
            }
            .el-pagination.is-background .el-pager li:not(.disabled).active {
                    background-color: #FF6600;
                    color: #FFF;
            }
            .el-button--primary {
                color: #FFF;
                background-color: #FF6600;
                border-color: #FF6600;
            }
        }
    
    }
}
</style>