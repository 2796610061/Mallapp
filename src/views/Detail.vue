<template>
    <div class="detali">
        <van-nav-bar title="商品详情" left-text="返回" placeholder left-arrow fixed @click-left="onClickLeft" />
        <div class="img">
            <img :src="itemArr.large_img" alt="">
        </div>
        <div class="table">
            <div class="title">
                <div class="t-left">
                    <span>{{itemArr.name}}</span>
                    <span>{{itemArr.enname}}</span>
                </div>
                <div class="t-right">￥{{itemArr.price}}</div>
            </div>
            <div class="select">
                <div class="sel-one" v-for="(item,index) in itemArr.rules" :key="index">
                    <span>{{item.title}}</span>
                    <div :class="['round',{'active':item.activeIndex===i}]" v-for="(items,i) in item.rules" :key="i" @click="toggleactive(item,i)">{{items.title}}</div>
                </div>
            </div>
            <div class="number">
                <div class="n-left">选择数量</div>
                <div class="n-right">
                    <van-stepper v-model="value" theme="round" button-size="16" disable-input />
                </div>
            </div>
            <div class="describe">
                <h3>商品描述</h3>
                <ul class="content">
                    <li v-for="(item,index) in itemArr.desc" :key="index">
                        {{index+1}}、{{item}}
                    </li>
                </ul>
            </div>
        </div>

        <van-goods-action>
            <van-goods-action-icon icon="bag" text="购物袋" color="#646566" :badge="number==0?'':number" @click="shoppingBag"/>
            <van-goods-action-icon icon="like" :text="flag ? '已收藏' : '收藏'" :color="flag ? '#0C34BA' : '#646566'" @click="collection"/>
            <van-goods-action-button color="#2450F2" type="warning" text="加入购物袋" @click="addShopbag"/>
            <van-goods-action-button color="#0C34BA" type="danger" text="立即购买" @click="immediately"/>
        </van-goods-action>

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

        <div class="zhanwei"></div>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data(){
        return{
            value: 1,//购买的商品数量
            pid: 0,
            itemArr: [],
            flag: false,
            mask: false,
            sids: '',
        }
    },
    computed:{
        number(){
            return this.$store.state.count
        }
    },
    methods:{
        //上一页
        onClickLeft() {
            this.$router.go(-1)
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
        //前往购物袋
        shoppingBag(){
            setTimeout(()=>{
                this.$router.push({name:"shobag"})
            },500)
        },
        //切换高亮，通过每一项的activeIndex和每一项下面的数组的下标一一对应
        toggleactive(item,i){
            if (item.activeIndex === i) {//当前点击的前面高亮的，就不会再触发，不会重复触发
                // console.log('同规格同子规格');
                return;
            }
           item.activeIndex = i; 
        },
        //收藏商品
        collection(){
            let url=''
            if(!this.flag){
                url='/like'
                this.flag=true
            }else{
                url='/notlike'
                this.flag=false
            }
            this.getData(url,'post',{pid: this.pid})
            .then(res=>{
                // console.log(res)
                if (res.code === 700) {
                    this.flag=false
                    this.mask=true
                }
                if(res.code === 800){
                    this.$toast(res.msg);
                }
                if(res.code === 900){
                    this.$toast(res.msg);
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        //取消收藏商品
        iscollection(){
            this.getData('/findlike','get',{pid: this.pid})
            .then(res=>{
                // console.log(res)
                if (res.code === 1000) {
                    if(res.result.length!=0){
                        this.flag=true
                    }
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
            }, 2000);
        },
        //加入购物袋
        addShopbag(){
            let rules = [];
            this.itemArr.rules.forEach(v => {
                rules.push(v.rules[v.activeIndex].title);
            })

            this.getData('/addShopcart','post',{
                pid: this.pid,
                count: this.value,
                rule: rules.join('/'),
            })
            .then(res=>{
                // console.log(res)
                if (res.code === 700) {
                    this.mask=true
                }

                if (res.code === 3000) {
                    this.$toast(res.msg);
                    let n=this.number+this.value
                    this.$store.commit('getCount',n)
                    this.sids=res.sid
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        // 立即购买
        immediately(){
            let rules = [];
            this.itemArr.rules.forEach(v => {
                rules.push(v.rules[v.activeIndex].title);
            })

            this.getData('/addShopcart','post',{
                pid: this.pid,
                count: this.value,
                rule: rules.join('/'),
            })
            .then(res=>{
                if (res.code === 700) {
                    this.mask=true
                }
                if (res.code === 3000) {
                    this.$toast(res.msg);
                    let n=this.number+this.value
                    this.$store.commit('getCount',n)
                    this.sids=res.sid
                    if(!this.mask){
                        this.$router.push({name:'orderSettlement',query:{sids: [this.sids]}})
                    }
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    mounted(){
    },
    created(){
        this.pid = this.$route.query.itemId;
        this.iscollection()
        // console.log(this.pid)
        this.getData('/productDetail', 'get', {pid: this.pid,})
        .then(res=>{
            // console.log(res)
            if (res.code === 600) {
            let data = res.result[0];
            data.desc = data.desc.split(/\n/);
            // console.log('data ==> ', data);

            //处理规格数据
            // [
            //   {title: '温度', activeIndex: 0, rules: [{title: '冷'}, {title: '热'}]}
            // ]

            let ruleData = ['cream', 'sugar', 'milk', 'tem'];
            let rules = [];
            ruleData.forEach(v => {

              if (!data[v]) {
                return;
              }

              let r = {
                title: data[`${v}_desc`],
                //默认激活的规格
                activeIndex: 0,
                rules: []
              };

              let rs = data[v].split(/\//);
              rs.forEach(item => {
                let subRule = {
                  title: item
                };
                r.rules.push(subRule);
              })

              rules.push(r);
            })

            // console.log('rules ==> ', rules);

            data.rules = rules;

            this.itemArr = data;
            // console.log(this.itemArr)
          }
        })
        .catch(err=>{
            console.log(err)
        })

        this.getData('/shopcartCount','get')
        .then(res=>{
        // console.log(res)
            if(res.code==4000){
                this.count=res.result
                this.$store.commit('getCount',res.result)
            }
            if (res.code === 700) {
                // this.$toast(res.msg);
                //跳转到登录页面
                // setTimeout(() => {
                //     this.$router.push({name: 'login'});
                // }, 2000);
            }
        })
        .catch(err=>{
            consolg.log(err)
        })
    },
}

</script>

<style lang="less" scoped>
li{
    list-style: none;
}
/deep/ .van-stepper--round .van-stepper__plus{
      background-color: #0C34BA;
}
/deep/ .van-stepper--round .van-stepper__minus{
    color: #0C34BA;
    border-color: #0C34BA;
}
.detali{
    background: #f1f1f1;
    .img{
        width: 100%;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .table{
        width: 95%;
        background: #fff;
        margin: auto;
        padding-top: 25px;
        padding-bottom: 15px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        position: relative;
        top: -20px;
        .title{
            width: 90%;
            height: 50px;
            margin: auto;
            display: flex;
            justify-content: space-between;
            .t-left{
                width: auto;
                height: 100%;
                span{
                    display: block;
                    width: 200px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                span:first-child{
                    font-weight: bold;
                    font-size: 18px;
                    color: #646E83;
                }
                span:last-child{
                    font-size: 14px;
                    margin-top: 5px;
                    color: #BDC2CB;
                }
            }
            .t-right{
                width: 100px;
                height: 100%;
                line-height: 50px;
                text-align: right;
                font-size: 18px;
                font-weight: bold;
                color: #0C34BA;
            }
        }
        .select{
            width: 90%;
            height: auto;
            margin: auto;
            .sel-one{
                display: flex;
                align-items: center;
                span{
                    display: inline-block;
                    width: 50px;
                    height: 50px;
                    line-height: 50px;
                    font-size: 18px;
                    margin-right: 30px;
                    color: #717677;
                }
                .round{
                    width: 60px;
                    height: 30px;
                    background: #E8E8E8;
                    margin-right: 10px;
                    border-radius: 30px;
                    font-size: 12px;
                    line-height: 30px;
                    text-align: center;
                    color: #717677;
                }
                .active{
                    background: #0C34BA;
                    color: #fff;
                }
            }
        }
        .number{
            width: 90%;
            height: 50px;
            margin: auto;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .n-left{
                font-size: 14px;
                color: #717677;
            }
            .n-right{
                span{
                    margin: 0 5px;
                }
                .prev{
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    border: 1px solid #717677;
                    line-height: 15px;
                    text-align: center;
                    color: #717677;
                }
                .next{
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    border: 1px solid #717677;
                    line-height: 15px;
                    text-align: center;
                    color: #717677;
                }
                .active{
                    background: #0C34BA;
                    color: #fff;
                }
            }
        }
        .describe{
            width: 90%;
            margin: auto;
            h3{
               color: #717677; 
            }
            .content{
                width: 100%;
                color: #717677;
            }
        }
    }
    .zhanwei{
        width: 100%;
        height: 40px;
    }
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
</style>