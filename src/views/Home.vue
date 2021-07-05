<template>
    <div class="home">
        <!-- 顶部导航栏 -->
        <van-nav-bar  @click-left="onClickLeft" fixed placeholder>
            <slot slot="left"  name="left"><span class="t-left">下午好</span><span class="t-right">{{username}}</span></slot>
            <template #right>
                <van-search class="search" v-model="value" placeholder="请输入搜索关键词" @click="search" shape="round"/>
            </template>
        </van-nav-bar>

        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in imgArr" :key="index"><img :src="item" alt=""></van-swipe-item>
        </van-swipe>

        <!-- 热门商品 -->
        <div class="hoticon"><div class="icon">热卖推荐</div></div>
        <div class="commodity">
            <div class="list" v-for="(item,index) in dataArr" :key="index" v-lazy="item.url" ref="list" @click="getId(item.id)">
                <hot-table>
                    <template v-slot:hot>
                        <div class="hot">hot</div>
                    </template>
                    <template v-slot:img>
                        <img :src="item.url" alt="">
                    </template>
                    <template v-slot:content>
                        <li>{{item.name}}</li>
                        <li>{{item.enname}}</li>
                        <li>￥{{item.price}}</li>
                    </template>
                </hot-table>
            </div>
        </div>
       
    </div>
</template>

<script scoped>
import { Toast } from 'vant';
import hotTable from '../components/hotTable.vue'

export default {
    components:{
        hotTable,
    },
    data(){
        return{
            value: '',//输入框值
            current: 0,//分页器
            imgArr: [],//轮播图片
            dataArr: [],//热门商品
            height: 0,
            username: ''
        }
    },
    methods: {
        // 顶部导航栏左边跳转
        onClickLeft() {
            
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
        getId(itemId){
            this.$router.push({name: 'detail', query: {itemId}});
        },
        search(){
            this.$router.push({name: "search"})
        }
    },
    mounted(){
       this.getData('/typeProducts','get',
       {key: 'isHot',value: 1})
       .then(res=>{
           if(res.code==500){
            //    console.log(res)
               res.result.forEach((item,index) => {
                    if(index<5){
                            this.imgArr.push(item.largeImg)
                    }
                    this.dataArr.push({
                        id: item.pid,
                        name: item.name,
                        price: item.price,
                        url: item.smallImg,
                        enname: item.enname
                    })
                });
                this.current=this.imgArr.length
           }
           
       })
       .catch(err=>{
           console.log(err)
       })
    },
    created(){
        this.getData('/findMy','get')
        .then(res=>{
            if(res.code=='A001'){
                // console.log(res)
                let arr=''
                res.result.forEach(v => {
                        arr=v.nickName
                });
                // console.log(arr)
                this.username=arr
            }
        })
        .catch(err=>{
            console.log(err)
        })
    },
}
</script>

<style lang="less" scoped>
.home{
    width: 100%;
    background: #F1F1F1;
    padding-bottom: 50px;
    .t-left{
        font-weight: bold;
        color: #7B7672;
    }
    .t-right{
        color: #0C34BA;
        font-weight: bolder;
        margin-left: 10px;
    }
    .search{
        margin-right: -20px;
        height: 100%;
    }
    .hoticon{
        height: 50px;
        background: #ffffffaf;
        margin: auto;
        margin: 0 10px;
        position: relative;
        .icon{
            width: 80px;
            height: 30px;
            background: #0C34BA;
            color: #ffffff;
            line-height: 30px;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            border-top-right-radius: 20px;
        }
    }
    .commodity{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .list{
            width: 100%;
            height: 100%;
            padding: 10px;
            box-sizing: border-box;
            flex: 1 0 50%;
        }
    }
    // 轮播图样式
    .my-swipe{
        margin: auto;
        margin: 10px;
        border-radius: 10px;
    }
    .my-swipe .van-swipe-item {
        height: 100%;
        color: #fff;
        text-align: center;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>