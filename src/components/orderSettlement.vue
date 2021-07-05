<template>
    <div class="presonal">
        <van-nav-bar
        title="订单结算"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="address-select">
            <div class="select"><span @click="show=true">选择地址</span><van-icon name="arrow" @click="show=true"/></div>
            <div class="xinxi">
                <span class="name">{{defaultData.name}}</span>
                <span class="phone">{{defaultData.tel}}</span>
                <span class="home" v-if="defaultData.isDefault==1?true:false">默认</span>
            </div>
            <div class="address-box">{{defaultData.province}}{{defaultData.city}}{{defaultData.county}}{{defaultData.addressDetail}}</div>
        </div>
        <div class="content">
            <div class="content-box">
                <div class="title">
                    <div class="t-left">订单信息</div>
                </div>
                <div class="table">
                    <div class="view" v-for="(item,index) in data" :key="index">
                        <van-card
                        :tag="item.hot==1?'hot':''"
                        :num="item.count"
                        :price="item.price"
                        :desc="item.enname"
                        :title="item.name"
                        :thumb="item.url"
                        >
                            <template #tags>
                                <div class="type">{{item.rule}}</div>
                            </template>
                        </van-card>
                    </div>
                </div>
                
                <div class="footer">
                    <div class="round-left"></div>
                    <div class="round-right"></div>
                    <div class="date">{{time[0]}} {{time[1]}}</div>
                    <div class="sum">
                        <div class="count">共计<span>{{sum}}</span>件</div>
                        <div class="total"><span>合计</span>￥{{summoney}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="button">
            <van-button 
            type="primary" 
            round 
            size="large" 
            color="#0C34BA"
            @click="settlement"
            >
            立即结算
            </van-button>
        </div>
        <van-popup 
        v-model="show" 
        round 
        position="bottom" 
        closeable
        :style="{ height: '50%' }">
            <div class="addselect btn-address">
                <div class="select"><span>选择地址</span></div>

                <div class="address" v-for="(item,index) in addressArr" :key="index">
                    <div class="address-left">
                        <van-checkbox v-model="item.checked" checked-color="#0C34BA" @click="toggleAddress(item.aid)"></van-checkbox>
                    </div>
                    <div class="address-right">
                        <div class="xinxi">
                            <span class="name">{{item.name}}</span>
                            <span class="phone">{{item.tel}}</span>
                            <span class="home" v-if="item.isDefault==1?true:false">默认</span>
                        </div>
                        <div class="address-box">{{item.province}}{{item.city}}{{item.county}}{{item.addressDetail}}</div>
                    </div>
                </div>
            </div>
             <div class="button-address">
                <van-button 
                type="primary" 
                round 
                size="large" 
                color="#0C34BA"
                @click="addressNext"
                >
                新增地址
                </van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
    data(){
        return{
            show: false,
            data:[],
            summoney:0,
            sum:0,
            time: '',
            addressArr: [],
            sid: 0,
            defaultData: '',
            objid: {},
        }
    },
    methods:{
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
        // 返回上一级
        onClickLeft(){
            this.$router.go(-1)
        },
        //获取商品
        getCommodity(){
            this.getData('/commitShopcart','get',{
            sids: JSON.stringify(this.objid.dis)
            })
            .then(res=>{
                // console.log(res)
                this.summoney=0
                this.sum=0
                res.result.forEach(item => {
                    this.summoney+=item.price*item.count
                    this.sum+=item.count
                    this.data.push({
                        count: item.count,
                        hot: item.is_hot,
                        enname: item.enname,
                        name: item.name,
                        pid: item.pid,
                        price: item.price,
                        rule: item.rule,
                        url: item.small_img,
                    })
                });
                // console.log(this.data)
                this.summoney=this.summoney.toFixed(2)
                let time=new Date().toLocaleString('chinese', { hour12: false })
                let newTime=time.replace(/[\u4e00-\u9fa5]+/,',')
                newTime=newTime.replace(/[\/]/g,"-")
                this.time=newTime.split(",")
                
            })
            .catch(err=>{
                console.log(err)
            })

        },
        //获取地址
        getAddres(){
            this.getData('/findAddress','get')
            .then(res=>{
                // console.log(res)
                if(res.code==20000){
                    let arr=[]
                    res.result.forEach(item => {
                        arr.push({
                            name: item.name,
                            tel: item.tel,
                            province: item.province,
                            city: item.city,
                            county: item.county,
                            addressDetail: item.addressDetail,
                            areaCode: item.areaCode,
                            postalCode: item.postalCode,
                            isDefault: item.isDefault,
                            aid: item.aid,
                            checked: false
                        })
                    });
                    this.addressArr=arr
                    // console.log(arr)
                    arr.forEach(v => {
                        if(v.isDefault==1){
                            this.default=1
                            this.defaultData=v
                        }
                    });
                    // console.log(this.defaultData)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        //切换地址
        toggleAddress(id){
            this.addressArr.forEach(v=>{
                v.checked=false
                if(v.aid==id){
                    this.defaultData=v
                    v.checked=true
                }
            })
        },
        //立即结算
        settlement(){
            this.getData('/pay','post',{
                sids: JSON.stringify(this.objid.dis),
                phone: this.defaultData.tel,
                address: this.defaultData.province+this.defaultData.city+this.defaultData.county+this.defaultData.addressDetail,
                receiver: this.defaultData.name
            })
            .then(res=>{
                // console.log(res)
                if(res.code==60000){
                    // this.$toast(res.msg)
                    setTimeout(()=>{
                        this.$router.push({name: "myOrder",query: {status: 1,id: 1001}})
                    },1500)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        // 前往地址
        addressNext(){
            setTimeout(()=>{
                this.$router.push({name:"newAddress"})
            },500)
        }
    },
    created(){
        let id=this.$route.query.sids
        let arrid={}
        if(id!=""){
            arrid.dis=id
            this.objid=arrid
            this.sid=arrid.dis
            this.getCommodity()
            this.getAddres()
        }
    }
}
</script>

<style lang="less" scoped>
.address-select{
    width: 95%;
    height: 100px;
    background: #fff;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    .select{
        width: 100%;
        height: 30px;
        margin-left: 10px;
        color: #696767;
        display: flex;
        align-items: center;
        span{
            margin-right: 10px;
        }
    }
    .xinxi{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        .name{
            font-size: 14px;
            color: #2342BB;
            font-weight: bold;
            margin-left: 10px;
            margin-right: 20px;
        }
        .phone{
            color: #696767;
            margin-right: 20px;
        }
        .home{
            height: 15px;
            padding: 0 10px;
            color: #fff;
            background: #0C34BA;
            border-radius: 20px;
            text-align: center;
            line-height: 15px;
        }
    }
    .address-box{
        height: 30px;
        line-height: 30px;
        margin-left: 10px;
        color: #a09c9c;
        font-weight: bold;
    }
}
.content{
    width: 95%;
    background: #fff;
    margin: auto;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    .content-box{
        color: rgb(128, 125, 125);
        .mask{
            width: 100%;
            height: 10px;
            background: #F2F2F2;
        }
        .title{
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            .t-right{
                display: flex;
                align-items: center;
                span{
                    display: block;
                    height: 100%;
                    font-size: 12px;
                    line-height: 30px;
                }
                div{
                    height: 100%;
                    margin-left: 10px;
                }
            }
        }
        .table{
            padding-bottom: 15px;
            .view{
                .type{
                    font-size: 12px;
                    margin-top: 5px;
                }
                /deep/ .van-card__title{
                    font-size: 14px;
                    margin-top: 2px;
                }
                /deep/ .van-card__price{
                    color: #0C34BA;
                }
                /deep/ .van-tag--danger{
                    background: #0C34BA;
                }
            }
        }
        
        .footer{
            padding-top: 20px;
            border-top: 1px dashed #ccc;
            position: relative;
            .round-left{
                width: 25px;
                height: 25px;
                background: #F2F2F2;
                border-radius: 50%;
                position: absolute;
                top: -12.5px;
                left: -12.5px;
            }
            .round-right{
                width: 25px;
                height: 25px;
                background: #F2F2F2;
                border-radius: 50%;
                position: absolute;
                top: -12.5px;
                right: -12.5px;
            }
            .date{
                height: 20px;
                line-height: 20px;
                margin-left: 10px;
            }
            .sum{
                height: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 10px;
                .count{
                    span{
                        margin: 0 5px;
                    }
                }
                .total{
                    font-size: 14px;
                    color: #0C34BA;
                    font-weight: bold;
                    span{
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}
.addselect{
    .select{
        width: 100%;
        height: 30px;
        margin-top: 10px;
        margin-left: 10px;
        color: #696767;
        display: flex;
        align-items: center;
        span{
            margin-right: 10px;
        }
    }
    .address{
        width: 95%;
        height: 100px;
        background: #fff;
        margin: auto;
        margin-bottom: 10px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        .address-left{
        }
        .address-right{
            margin-left: 10px;
            .xinxi{
                width: 100%;
                height: 30px;
                display: flex;
                align-items: center;
                .name{
                    font-size: 14px;
                    color: #2342BB;
                    font-weight: bold;
                    margin-left: 10px;
                    margin-right: 20px;
                }
                .phone{
                    color: #696767;
                    margin-right: 20px;
                }
                .home{
                    height: 15px;
                    padding: 0 10px;
                    color: #fff;
                    background: #0C34BA;
                    border-radius: 20px;
                    text-align: center;
                    line-height: 15px;
                }
            }
            .address-box{
                height: 30px;
                line-height: 30px;
                margin-left: 10px;
                color: #a09c9c;
                font-weight: bold;
            }
        }
        
    }
}
.btn-address{
    // padding-bottom: 50px;
    margin-bottom: 80px;
}
.button{
    width: 95%;
    margin: auto;
    margin-top: 50px;
}
.button-address{
    width: 95%;
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
}
</style>