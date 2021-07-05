<template>
    <div class="shobag">
        <van-nav-bar title="购物袋" left-text="返回" fixed placeholder left-arrow @click-left="prev" @click-right="deleflag=!deleflag">
            <template #right>
                <span>{{deleflag?'编辑':'退出编辑'}}</span>
            </template>
        </van-nav-bar>
        <div class="img"><img src="../assets/images/shopbag_bg.png" alt=""></div>
        <div class="deletop" v-if="!deleflag">
            <van-checkbox v-model="checkedfull" @click="delefull" checked-color="#ee0a24">全选</van-checkbox>
            <div class="center">右滑删除单个</div>
            <van-button type="danger" size="mini" @click="deletefull">删除选中</van-button>
        </div>
        <!-- 商品 -->
        <div class="item" v-for="(item,index) in data" :key="index">
           <van-checkbox  v-model="item.check" 
           @click="getstate(item.check,item.count,item.price)"
           v-if="deleflag"
           ></van-checkbox>

           <div class="btn-right" v-if="!deleflag" v-show="item.openflag">
               <van-checkbox checked-color="#ee0a24"  v-model="item.decheck" ></van-checkbox>
           </div>
           <van-swipe-cell @open="item.openflag=false" @close="item.openflag=true">
                <van-card
                :tag="item.hot==1?'hot':''"
                :price="item.price"
                :desc="item.enname"
                :title="item.name"
                :thumb="item.url"
                :thumb-link="`#/detail?itemId=${item.id}`"
                >
                    <template #footer>
                        <van-stepper v-model="item.count" theme="round" button-size="16" disable-input 
                        @change="setNumber(item.count,item.sid)" 
                        @plus="plus(item.check,index)"
                        @minus="minus(item.check,index)"
                        />
                    </template>
                    <template #tags>
                        <span class="text">{{item.rule}}</span>
                    </template>
                </van-card>
                <template #right>
                    <van-button square text="删除" @click="deletsingle([item.sid],item.count)" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>

        </div>
        <div class="seat"></div>
        <!-- 提交订单 -->
        <van-submit-bar
         :price="sum"
         button-text="提交订单"
         @submit="onSubmit"
         border='true'
         v-if="deleflag"
         >
            <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
        </van-submit-bar>

        <!-- 未登入提示 -->
        <van-overlay :show="mask" @click="mask = false">
            <div class="wrapper" >
                <div class="block">
                    <div class="title">
                        <h3>请前往登入在查看</h3>
                    </div>
                    <div class="btn">
                        <div>取消</div>
                        <div @click="cancellation">确认</div>
                    </div>
                </div>
            </div>
        </van-overlay>

        <div class="default" v-show="loginflag">
            <van-button icon="plus" type="primary" color="#5576EA" @click="nextLogin">前往登入</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            value: 1,
            checked: false,
            data: [],
            sum: 0,
            deleflag: true,
            length: 0,
            checkedfull: false,
            mask: false,
            codes: 0,
            loginflag: false,
        }
    },
    watch:{
        deleflag(){
            if(this.deleflag){
                this.data.forEach(item=>{
                    if(item.check){
                        this.sum+=item.count*item.price*100
                    }
                })
                if(this.data.length!=0){
                    for(let i=0;i<this.data.length;i++){
                        if(!this.data[i].check){
                            this.checked=false
                            return
                        }else{
                            this.checked=true
                        }
                    }
                }else{
                    this.checked=false
                }
            }
        }
    },
    methods:{
        // 提交订单
        onSubmit(){
            if(this.codes==5000){
                let sid=[]
                this.data.forEach(item=>{
                    if(item.check){
                        sid.push(item.sid)
                    }
                })
                if(sid.length==0){
                    this.$toast('请选择商品');
                    return
                }
                this.$router.push({name:'orderSettlement',query:{sids: sid}})
            }else if(this.codes==700){
                this.mask=true
            }
        },
        //返回上一个页面
        prev(){
            this.$router.go(-1)
        },
        //选择单个商品和计算选中的商品总价
        getstate(checks,val,price){
            //计算
            if(checks){
                this.sum+=val*Number(price)*100
            }else{
                this.sum-=val*Number(price)*100
            }
            if(this.data.length!=0){
                 for(let i=0;i<this.data.length;i++){
                    if(!this.data[i].check){
                        this.checked=false
                        return
                    }else{
                        this.checked=true
                    }
                }
            }else{
                this.checked=false
            }
        },
        //全选
        selectAll(){
            for(let i=0;i<this.data.length;i++){
                this.data[i].check=this.checked
            }

            this.sum=0
            if(!this.checked){
                this.sum=0
            }else{
                for(let i=0;i<this.data.length;i++){
                    //计算
                    if(this.data[i].check){
                        this.sum+=(this.data[i].count*this.data[i].price)*100
                    }
                }
            }
        },
        //全选删除
        delefull(){
             for(let i=0;i<this.data.length;i++){
                this.data[i].decheck=this.checkedfull
            }
        },
        getData(url, type, data) {
            if (type == 'get') {
                return this.axios.get(url, {params: data});
            }else
            if(type == 'post'){
                return this.axios.post(url, data);
            }else {
                return this.axios({
                url:url,
                method: type
                })
            }
        },
        //购物车数据
        getNumber(){
            this.getData('/findAllShopcart','get')
            .then(res=>{
                if(res.code==5000){
                     this.codes=res.code
                     this.loginflag=false
                    // console.log(res)
                    let arr=[]
                    res.result.forEach(item => {
                        arr.push({
                            id: item.pid,
                            sid: item.sid,
                            name: item.name,
                            price: item.price,
                            enname: item.enname,
                            rule: item.rule,
                            count: item.count,
                            url: item.small_img,
                            hot: item.is_hot,
                            check: false,
                            decheck: false,
                            openflag: true,
                        })
                    });
                    this.data=arr
                    // console.log(this.data)
                }
                if(res.code==700){
                    // console.log(res)
                    this.codes=res.code
                    this.loginflag=true
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        //修改数量
        setNumber(val,idData){
            //加减
            this.getData('/modifyShopcartCount','post',{sid: idData,count: val})
            .then(res=>{
                // console.log(res)
                if(res.code==6000){
                    //获取总数量
                    this.getTotal()
                }
            })
            .catch(err=>{
                console,log(err)
            })
        },
        //获取总数量
        getTotal(){
            this.getData('/shopcartCount','get')
            .then(res=>{
            if(res.code==4000){
                this.$store.commit('getCount',res.result)
            }
            })
            .catch(err=>{
                consolg.log(err)
            })
        },
        //增加
        plus(checks,i){
            if(checks){
                this.sum+=this.data[i].price*100
            }
        },
        //减少
        minus(checks,i){
            if(checks){
                this.sum-=this.data[i].price*100
            }
        },
        //删除单个
        deletsingle(id,num){
            this.getData('/deleteShopcart','post',{sids:JSON.stringify(id)})
            .then(res=>{
                // console.log(res)
                if(res.code==7000){
                    this.$toast("已删除")
                    this.sum=0
                    this.data.forEach((item,index)=>{
                        if(item.sid==id){
                            this.data.splice(index,1)
                        }
                    })
                    this.data.forEach((item,index)=>{
                        if(item.check){
                            this.getstate(item.check,item.count,item.price)
                        }
                    })
                    if(this.data.length==0){
                        this.getstate(0,0,0)
                    }
                    this.setNumber(num,id)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        //全部删除和删除单个
        deletefull(){
            let arrid=[]
            let num=[]
            this.data.forEach(item=>{
                if(item.decheck){
                    arrid.push(item.sid)
                    num.push(item.count)
                }
            })
            this.getData('/deleteShopcart','post',{sids:JSON.stringify(arrid)})
            .then(res=>{
                // console.log(res)
                if(res.code==7000){
                    this.$toast("已删除")
                    this.sum=0
                    for(let i=0;i<arrid.length;i++){
                        this.data.forEach((item,index)=>{
                            if(item.sid==arrid[i]){
                                this.data.splice(index,1)
                            }
                        })
                    }
                    arrid.forEach((item,index)=>{
                        this.getData('/modifyShopcartCount','post',{sid: item,count: num[index]})
                        .then(res=>{
                            // console.log(res)
                            if(res.code==6000){
                                //获取总数量
                                this.getTotal()
                            }
                        })
                        .catch(err=>{
                            console,log(err)
                        })
                    })
                    this.checkedfull=false
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        // 未登入限制
        cancellation(){
            setTimeout(() => {
                this.$router.push({name: 'login'});
            }, 1500);
        },
        // 前往登入
        nextLogin(){
            setTimeout(() => {
                this.$router.push({name: 'login'});
            }, 1500);
        }
    },
    created(){
        this.getNumber()
    }
}
</script>

<style lang="less" scoped>
.shobag{
    width: 100%;
    height: 100%;
    .img{
        width: 100%;
        height: 60px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .deletop{
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 0 10px;
        .center{
            font-size: 14px;
            color: #ccc;
        }
    }
    .item{
        width: 95%;
        margin: auto;
        margin-top: 10px;
        background: #fff;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        display: flex;
        align-items: center;
        .btn-right{
            position: absolute;
            top: 10px;
            right: 0;
            z-index: 1000;
        }
        /deep/ .van-swipe-cell{
            width: 100%;
            height: 100%;
        }
        /deep/ .van-card__footer{
            width: 100px;
            position: absolute;
            right: 10px;
            bottom: 13px;
        }
        /deep/ .van-card{
            width: 100%;
            flex-grow: 5;
            background: #fff;
            padding:10px 5px 10px 10px;
        }
        /deep/ .van-card__title{
            font-size: 16px;
        }
        /deep/ .van-card__desc{
            margin-top: 5px;
        }
        /deep/ .van-card__price{
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 1px;
            color: #1C46D0;
        }
        /deep/ .van-tag--danger{
            background: #1C46D0;
        }
        /deep/ .van-swipe-cell__right{
            height: 100%;
            margin-left: 10px;
        }
        /deep/ .van-button--danger{
            height: 100%;
            border: 1px solid #fff;
        }
        /deep/ .van-checkbox{
            padding: 0 10px;
        }
        .text{
            color: #ccc;
        }
    }
    .seat{
        width: 100%;
        height: 150px;
    }
}
/deep/ .van-stepper--round .van-stepper__plus{
      background-color: #0C34BA;
}
/deep/ .van-stepper--round .van-stepper__minus{
    color: #0C34BA;
    border-color: #0C34BA;
}
/deep/ .van-submit-bar{
    position: fixed;
    bottom: 50px;
    left: 0;
    z-index: 100;
    width: 100%;
}
/deep/ .van-submit-bar{
    border-top: 1px solid rgba(204, 204, 204, 0.192);
    border-bottom: 1px solid rgba(204, 204, 204, 0.24);
    box-sizing: border-box;
}
/deep/ .van-submit-bar__button--danger {
    background: -webkit-linear-gradient(left,#1f4ad8,#06299b);
    background: linear-gradient(to right,#1f4ad8,#06299b);
}
/deep/ .van-submit-bar__price{
    color: #06299b;
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.block {
    width: 80%;
    height: 150px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    .title{
        height: 70px;
        border-bottom: 1px solid #f1f1f1;
    }
    h3{
        font-size: 16px;
        text-align: center;
        margin-top: 30px;
        margin-bottom: 10px;
    }
    span{
        display: block;
        text-align: center;
        color: rgb(172, 169, 169);
    }
    .btn{
        height: 50px;
        display: flex;
        div:first-child{
            border-right: 1px solid #f1f1f1;
            color: #ccc;
        }
        div{
            width: 50%;
            height: 100%;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            color: #1438C3;
        }
    }

}
.default{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    
}
</style>