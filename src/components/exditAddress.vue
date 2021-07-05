<template>
    <div class="presonal">
        <van-nav-bar
        title="编辑地址"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="content">
            <div class="text-box">
                <ul>
                    <li><van-field v-model="name" label="姓名" placeholder="收货人姓名"/></li>
                    <li><van-field v-model="tel" type="tel" label="电话" placeholder="收货人手机号"/></li>
                    <li><van-field v-model="region" label="地区" right-icon="arrow" placeholder="请选择省/市/区" @click-right-icon="show=true"/></li>
                    <li><van-field v-model="address" label="详细信息" placeholder="街道门牌、楼层房间号等信息"/></li>
                    <li><van-field v-model="postalCode" type="digit" label="邮政编码"  placeholder="邮政编码"/></li>
                </ul>
            </div>
            <div class="default">
                <van-cell center title="设为默认收货地址">
                    <template #right-icon>
                        <van-switch v-model="checked" size="24" @click="toggle"/>
                    </template>
                </van-cell>
            </div>
            <div class="button">
                <van-button 
                type="primary" 
                round 
                size="large" 
                color="#0C34BA"
                @click="preservation"
                >
                保存修改
                </van-button>
            </div>
            <div class="delect">
                 <van-button 
                    type="primary" 
                    round 
                    size="large" 
                    color="#fff"
                    @click="delectAddress"
                    >
                    删除地址
                    </van-button>
            </div>
            <van-popup v-model="show" round position="bottom" :style="{ height: '40%' }">
                <div class="select">
                    <van-area
                    :area-list="areaList"
                    @confirm="confirm"
                    @cancel="cancel"
                    :columns-placeholder="['请选择省', '请选择市', '请选择区/县城']"
                    />
                </div>
            </van-popup>
        </div>
    </div>
</template>

<script>
import { areaList } from '@vant/area-data';
export default {
    data(){
        return{
            areaList,
            name: '',
            tel: '',
            region: '',
            address: '',
            postalCode: '',
            show: false,
            areaCode: 0,
            checked: false,
            default: 0,
            aid: '',
            data: [],
            newdefault: 0,
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        //确定
        confirm(e){
            if(!e[0].name){
                this.$toast('请选择省')
                return
            }else{
                if(!e[1].name){
                    this.$toast('请选择市')
                    return
                }else{
                    if(!e[2].name){
                        this.$toast('请选择区/县城')
                        return
                    }
                }
            }
            this.areaCode=e[0].code
            let arr=[]
            arr.push(e[0].name)
            arr.push(e[1].name)
            arr.push(e[2].name)
            this.region=arr.join('/')
            this.show=false
        },
        //取消
        cancel(){
            this.show=false
        },
        toggle(){
            this.checked=!this.checked
            console.log(this.checked)
            if(this.checked){
                this.default=Number(this.checked)
            }else{
                this.default=Number(this.checked)
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
        // 修改地址
        preservation(){
                let arr=this.region.split("/")
                this.getData('/editAddress','post',{
                    aid: this.aid,
                    name: this.name,
                    tel: this.tel,
                    province: arr[0],
                    city: arr[1],
                    county: arr[2],
                    addressDetail: this.address,
                    areaCode: this.areaCode,
                    postalCode: this.postalCode,
                    isDefault: this.default
                })
                .then(res=>{
                    if(res.code==30000){
                        this.$toast(res.msg)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        // 删除地址
        delectAddress(){
            this.getData('/deleteAddress','post',{
            aid: this.aid
            })
            .then(res=>{
                if(res.code==10000){
                    this.$toast(res.msg)
                    this.name=''
                    this.tel=''
                    this.address=''
                    this.postalCode=''
                    this.areaCode=''
                    this.checked=false
                    this.default=0
                    this.region=''
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1500)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    created(){
        let b=this.$route.query.aid
        this.aid=b
        let d=this.$route.query.default
        this.newdefault=d
        this.getData('/findAddressByAid','get',{
            aid: b
        })
        .then(res=>{
            // console.log(res)
            if(res.code==40000){
                let arr=[]
                res.result.forEach(item => {
                    arr.push(item.province)
                    arr.push(item.city)
                    arr.push(item.county)
                    this.name=item.name
                    this.tel=item.tel
                    this.address=item.addressDetail
                    this.postalCode=item.postalCode
                    this.areaCode=item.areaCode
                    this.checked=Boolean(item.isDefault)
                    this.default=item.isDefault
                });
                // console.log(arr)
                this.region=arr.join('/')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
</script>

<style lang="less" scoped>
.text-box{
    width: 95%;
    margin: auto;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 10px;
}
.default{
    width: 95%;
    border-radius: 10px;
    overflow: hidden;
    margin: auto;
}
.button{
    width: 95%;
    margin: auto;
    margin-top: 50px;
}
.delect{
    width: 95%;
    margin: auto;
    margin-top: 50px;
    /deep/ .van-button__text{
        color: black;
    }
}
</style>