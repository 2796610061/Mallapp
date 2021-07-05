<template>
    <div class="presonal">
        <van-nav-bar
        title="地址管理"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="heade"></div>
        <div class="content">
            <div class="address" v-for="(item,index) in data" :key="index">
                <div class="address-left">
                    <div class="xinxi">
                        <span class="name">{{item.name}}</span>
                        <span class="phone">{{item.tel}}</span>
                        <span class="home" v-if="item.isDefault==1?true:false">默认</span>
                    </div>
                    <div class="address-box">{{item.province}}{{item.city}}{{item.county}}{{item.addressDetail}}</div>
                </div>
                <div class="address-right">
                    <van-icon name="edit" size="30px" color="#ccc" @click="nextexdit(item.aid)"/>
                </div>
            </div>
        </div>
        <div class="button">
            <van-button 
            type="primary" 
            round 
            size="large" 
            color="#0C34BA"
            @click="nextpage"
            >
            添加地址
            </van-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:[],
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        nextexdit(id){
            this.$router.push({name: "exditAddress",query:{aid: id,default: this.default}})
        },
        nextpage(){
            this.$router.push({name:'newAddress'})
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
    },
    created(){
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
                        aid: item.aid
                    })
                });
                this.data=arr
            }
        })
        .catch(err=>{
            console.log(err)
        })
    },
}
</script>

<style lang="less" scoped>
.heade{
    width: 100%;
    height: 100px;
    background: #0C34BA;
}
.content{
    width: 95%;
    box-shadow: 0 0 1px 1px rgb(221, 220, 220);
    margin: auto;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    top: -30px;
    .address{
        width: 100%;
        height: 60px;
        background: #fff;
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .address-left{
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
        .address-right{
            margin-right: 20px;
            display: flex;
            align-items: center;
        }
    }
}
.button{
    width: 95%;
    position: absolute;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
}
</style>