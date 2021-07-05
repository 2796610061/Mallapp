<template>
    <div class="presonal">
        <van-nav-bar
        title="我的订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="heade"></div>
        <div class="content">
            <van-tabs v-model="active" title-active-color="#2549C1" >
                <van-tab title="全部">
                    <div class="content-box" v-for="(item,index) in startData" :key="index">
                        <div class="mask"></div>
                        <div class="title">
                            <div class="t-left">{{item.oids}}</div>
                            <div class="t-right"><span @click="confirm(item.oids)">确认收货</span></div>
                        </div>
                        <div class="view" v-for="(v,i) in item.content" :key="i">
                            <van-card
                            :num="v.count"
                            :price="v.price"
                            :desc="v.enname"
                            :title="v.name"
                            :thumb="v.url"
                            >
                            <template #tags>
                                <div class="type">{{v.rule}}</div>
                            </template>
                            </van-card>
                        </div>
                        <div class="footer">
                            <div class="round-left"></div>
                            <div class="round-right"></div>
                            <div class="date">{{item.time}}</div>
                            <div class="sum">
                                <div class="count">共计<span>{{item.sumcount}}</span>件</div>
                                <div class="total"><span>合计</span>￥{{item.summomey}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="content-box" v-for="(item,index) in endData" :key="index+Math.random()">
                        <div class="mask"></div>
                        <div class="title">
                            <div class="t-left">{{item.oids}}</div>
                            <div class="t-right"><span>已完成</span><div><van-icon size="18px" name="delete" @click="delectaddress(item.oids)"/></div></div>
                        </div>
                        <div class="view" v-for="(v,i) in item.content" :key="i">
                            <van-card
                            :num="v.count"
                            :price="v.price"
                            :desc="v.enname"
                            :title="v.name"
                            :thumb="v.url"
                            >
                            <template #tags>
                                <div class="type">{{v.rule}}</div>
                            </template>
                            </van-card>
                        </div>
                        <div class="footer">
                            <div class="round-left"></div>
                            <div class="round-right"></div>
                            <div class="date">{{item.time}}</div>
                            <div class="sum">
                                <div class="count">共计<span>{{item.sumcount}}</span>件</div>
                                <div class="total"><span>合计</span>￥{{item.summomey}}</div>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="进行中">
                    <div class="content-box" v-for="(item,index) in allData" :key="index">
                        <div class="mask"></div>
                        <div class="title">
                            <div class="t-left">{{item.oids}}</div>
                            <div class="t-right"><span @click="confirm(item.oids)">确认收货</span></div>
                        </div>
                        <div class="view" v-for="(v,i) in item.content" :key="i">
                            <van-card
                            :num="v.count"
                            :price="v.price"
                            :desc="v.enname"
                            :title="v.name"
                            :thumb="v.url"
                            >
                            <template #tags>
                                <div class="type">{{v.rule}}</div>
                            </template>
                            </van-card>
                        </div>
                        <div class="footer">
                            <div class="round-left"></div>
                            <div class="round-right"></div>
                            <div class="date">{{item.time}}</div>
                            <div class="sum">
                                <div class="count">共计<span>{{item.sumcount}}</span>件</div>
                                <div class="total"><span>合计</span>￥{{item.summomey}}</div>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="已完成">
                    <div class="content-box" v-for="(item,index) in allData" :key="index">
                        <div class="mask"></div>
                        <div class="title">
                            <div class="t-left">{{item.oids}}</div>
                            <div class="t-right"><span>已完成</span><div><van-icon size="18px" name="delete" @click="delectaddress(item.oids)"/></div></div>
                        </div>
                        <div class="view" v-for="(v,i) in item.content" :key="i">
                            <van-card
                            :num="v.count"
                            :price="v.price"
                            :desc="v.enname"
                            :title="v.name"
                            :thumb="v.url"
                            >
                            <template #tags>
                                <div class="type">{{v.rule}}</div>
                            </template>
                            </van-card>
                        </div>
                        <div class="footer">
                            <div class="round-left"></div>
                            <div class="round-right"></div>
                            <div class="date">{{item.time}}</div>
                            <div class="sum">
                                <div class="count">共计<span>{{item.sumcount}}</span>件</div>
                                <div class="total"><span>合计</span>￥{{item.summomey}}</div>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            active: 0,
            startData: [],
            endData: [],
            allData: [],
            count: 0,
            summoney: 0,
            ids: 0,
        }
    },
    methods:{
        onClickLeft(){
            if(this.ids==1001){
                this.$router.go(-2)
            }else{
                this.$router.go(-1)
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
        sortArr(arr){
            for(let i=0;i<arr.length-1;i++){
                for(let j=0;j<arr.length-i-1;j++){
                    if(arr[j+1].time>arr[j].time){
                        [arr[j],arr[j+1]]=[arr[j+1],arr[j]]
                    }
                }
            }
            return arr
        },
        //获取处理数据
        getCommodity(index){
            this.getData('/findOrder','get',{
                status: index
            })
            .then(res=>{
                if(res.code==70000){
                    // console.log(res);
                    let arr=res.result
                    let allArr=[]
                    let oidArr=[]
                    let allData=[]
                    arr.forEach(v=>{
                        console.log()
                        allArr.push({
                            oid: v.oid,
                            name: v.name,
                            enname: v.enname,
                            price: v.price,
                            rule: v.rule,
                            url: v.smallImg,
                            count: v.count,
                            status: v.status,
                        })
                    })
                    // console.log(allArr)
                    let timeArr=[]
                    arr.forEach(v => {
                        oidArr.push(v.oid)
                        timeArr.push(this.rTime(v.createdAt))
                    });
                    oidArr=[...(new Set(oidArr))]
                    timeArr=[...(new Set(timeArr))]
                    // console.log(timeArr)
                    // console.log(oidArr)
                    oidArr.forEach((v,i)=>{
                        allData.push({
                            oids: v,
                            time: timeArr[i],
                            content:[]
                        })
                    })
                    // console.log(allData)
                    for(let i=0;i<allArr.length;i++){
                        for(let k=0;k<allData.length;k++){
                            if(arr[i].oid==allData[k].oids){
                                allData[k].content.push(allArr[i])
                            }
                        }
                    }
                    allData.forEach(v=>{
                        let total=0
                        let sumprice=0
                        let statuss=0
                        v.content.forEach(k=>{
                            // console.log(k)
                            sumprice+=k.count*k.price
                            total+=k.count
                            statuss=k.status
                        })
                        v.summomey=sumprice.toFixed(2)
                        v.sumcount=total
                        v.status=statuss
                    })
                    // this.sortArr(allData)
                    this.allData=allData
                    // console.log(allData)

                    if(index==0){
                        let start=[]//1
                        let end=[]//2
                        allData.forEach(v=>{
                            if(v.status==1){
                                start.push(v)
                            }
                            if(v.status==2){
                                end.push(v)
                            }
                        })
                        this.startData=this.sortArr(start)
                        this.endData=this.sortArr(end)
                        // console.log(this.startData,this.endData)
                    }
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        // 确认收货
        confirm(id){
            this.getData('/receive','post',{
                oid: id
            })
            .then(res=>{
                // console.log(res)
                if(res.code==80000){
                    this.getCommodity(this.active)
                    this.$toast(res.msg)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        // 删除商品
        delectaddress(oids){
            this.getData('/removeOrder','post',{
                oid: oids
            })
            .then(res=>{
                if(res.code==90000){
                    this.$toast(res.msg)
                    this.getCommodity(this.active)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        // 转换日期
        rTime(date) {
            var json_date = new Date(date).toJSON();
            return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
        }
    },
    created(){
        this.getCommodity(this.active)
        this.active=this.$route.query.status
        this.ids=this.$route.query.id
    },
    watch:{
        active(){
            this.getCommodity(this.active)
        }
    },
}
</script>

<style lang="less" scoped>
.presonal{
    background: #f7f7f7;
}
.heade{
    width: 100%;
    height: 100px;
    background: #0C34BA;
}
.content{
    width: 95%;
    background: #fff;
    margin: auto;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    padding-top: 10px;
    position: relative;
    top: -30px;
    .content-box{
        color: rgb(128, 125, 125);
        .mask{
            width: 100%;
            height: 10px;
            background: #f7f7f7;
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
        .view{
            .type{
                font-size: 12px;
                margin-top: 5px;
            }
            /deep/ .van-card__title{
                font-size: 16px;
                margin-top: 2px;
            }
            /deep/ .van-card__price{
                color: #0C34BA;
            }
        }
        .footer{
            margin-top: 15px;
            padding-top: 20px;
            border-top: 1px dashed #ccc;
            position: relative;
            .round-left{
                width: 25px;
                height: 25px;
                background: #f7f7f7;
                border-radius: 50%;
                position: absolute;
                top: -12.5px;
                left: -12.5px;
            }
            .round-right{
                width: 25px;
                height: 25px;
                background: #f7f7f7;
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
/deep/ .van-tabs__line{
    background: #0C34BA;
}
</style>