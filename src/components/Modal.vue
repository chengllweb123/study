<template>
    <transition name="slide">
        <div class="modal" v-show="showModal">
            <div class="mask"></div>
            <div class="modal-dialog">
                <div class="modal-header">
                    <span>{{title}}</span>
                    <a href="javascript:;" class="icon-close" @click="$emit('cancle')">
                        <img src="/imgs/icon-close.png" alt="">
                    </a>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <a href="javascript:;" class="btn" v-if="btnType==1" @click="$emit('submit')">{{sureText}}</a>
                    <a href="javascript:;" class="btn" v-if="btnType==2" @click="$emit('cancle')">{{cancleText}}</a>
                    <div class="btn-group" v-if="btnType==3">
                        <a href="javascript:;" class="btn"  @click="$emit('submit')">{{sureText}}</a>
                        <a href="javascript:;" class="btn btn-default"  @click="$emit('cancle')">{{cancleText}}</a>
                    </div>
                </div>
            </div>

        </div>
    </transition>
</template>
<script>
    export default{
        name:'modal',
        props:{
            //弹框类型：小small,中middle，大large 表单 form
            modalType:{type:String,default:'form'},
            //弹框标题
            title:String,
            btnType:String ,//1,确定2取消3确定取消
            sureText:{type:String,default:'确定'},
            cancleText:{type:String,default:'取消'},
            showModal:Boolean

        }
    }

</script>
<style lang="scss">
    @import './../assets/scss/reset.scss';
    @import './../assets/scss/mixin.scss';
    @import './../assets/scss/config.scss';
    @import './../assets/scss/modal.scss';
</style>