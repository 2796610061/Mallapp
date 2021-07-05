<template>
    <div class="presonal">
        <van-nav-bar
        title="新增地址"
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
                    <li><van-field v-model="code" type="digit" label="邮政编码"  placeholder="邮政编码"/></li>
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
                保存地址
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
            message: '',
            name: '',
            tel: '',
            region: '',
            address: '',
            code: '',
            show: false,
            areaCode: 0,
            checked: false,
            default: 0,
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
        preservation(){
                let arr=this.region.split("/")
                this.getData('/addAddress','post',{
                    name: this.name,
                    tel: this.tel,
                    province: arr[0],
                    city: arr[1],
                    county: arr[2],
                    addressDetail: this.address,
                    areaCode: this.areaCode,
                    postalCode: this.code,
                    isDefault: this.default
                })
                .then(res=>{
                    if(res.code==9000){
                        this.$toast(res.msg)
                        this.name=''
                        this.tel=''
                        this.address=''
                        this.code=''
                        this.areaCode=''
                        this.checked=false
                        this.default=0
                        this.region=''
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            
        },
    },
    created(){
        
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
    margin: 100px auto;
}
</style>