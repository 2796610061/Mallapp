<template>
    <div class="my">
        <div class="image">
            <img :src="data.userBg?data.userBg:url" alt="">
            <van-uploader :after-read="afterRead" />
        </div>
        <div class="homepage">
            <div class="icon">
                <img :src="data.userImg?data.userImg:touurl" alt="">
            </div>
            <div class="user">
                <div class="name">{{data.name}}</div>
                <div class="text">{{data.desc?data.desc:'这家伙很懒，什么也没有留下'}}</div>
            </div>
        </div>
        <div class="list">
            <ul>
                <li @click="personal"><span>个人资料</span><van-icon name="arrow" /></li>
                <li @click="myOrder"><span>我的订单</span><van-icon name="arrow" /></li>
                <li @click="myCollection"><span>我的收藏</span><van-icon name="arrow" /></li>
                <li @click="myAddress"><span>地址管理</span><van-icon name="arrow" /></li>
                <li @click="mySecurity"><span>安全中心</span><van-icon name="arrow" /></li>
                <li v-if="show" @click="login"><span>前往登入</span><van-icon name="arrow" /></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            url: require('../assets/images/background.jpg'),
            touurl: require('../assets/images/my_active.png'),
            data: {},
            show: true,
        }
    },
    methods:{
        personal(){
            // 个人资料
            this.$router.push({name:'personal'})
        },
        myOrder(){
            // 我的订单
            this.$router.push({name:'myOrder'})
        },
        myCollection(){
            // 我的收藏
            this.$router.push({name:'myCollection'})
        },
        myAddress(){
            // 地址管理
            this.$router.push({name:'myAddress'})
        },
        mySecurity(){
            // 安全中心
            this.$router.push({name:'mySecurity'})
        },
        login(){
            this.$router.push({name:'login'})
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
        getUser(){
            this.getData('/findMy','get')
            .then(res=>{
                // console.log(res)
                if(res.code=='A001'){
                    // console.log(res)
                    this.show=false
                    let arr={}
                    res.result.forEach(v => {
                            arr.name=v.nickName,
                            arr.userBg=v.userBg,
                            arr.userImg=v.userImg,
                            arr.vip=v.vip
                            arr.desc=v.desc
                    });
                    // console.log(arr)
                    this.data=arr
                }
                if(res.code==700){
                    this.show=true
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        afterRead(file) {
            let url=file.content.replace(/^data:image\/[A-Za-z]+;base64,/, '')
            this.getData('/updateUserBg','post',{
                imgType: 'jpeg',
                serverBase64Img: url
            })
            .then(res=>{
                if(res.code=='I001'){
                    this.getUser()
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
    },
    created(){
        this.getUser()
    }

}
</script>

<style lang="less" scoped>
.my{
    width: 100%;
    height: 100%;
    .image{
        width: 100%;
        height: 200px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        /deep/ .van-uploader{
            width: 100%;
            height: 200px;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
        }
        /deep/ .van-uploader__upload{
            width: 100%;
            height: 200px;
            margin: 0;
        }
    }
    .homepage{
        background: rgba(255, 255, 255, .5);
        width: 95%;
        height: 120px;
        margin: auto;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        position: relative;
        top: -40px;
        display: flex;
        .icon{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgb(228, 226, 226);
            margin: 10px 10px 0 10px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .user{
            margin: 15px 10px 0 10px;
            .name{
                font-size: 18px;
                color: #1A3FBC;
                font-weight: 600;
                margin-bottom: 10px;
            }
            .text{
                color: #747171;
            }
        }
    }
    .list{
        width: 95%;
        position: relative;
        top: -40px;
        background: rgba(255, 255, 255, .7);
        margin: auto;
        ul{
            width: 95%;
            margin: auto;
            li{
                height: 50px;
                width: 100%;
                border-bottom: 1px solid rgb(230, 229, 229);
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
                color: #afadad;
            }
        }
    }
}
</style>