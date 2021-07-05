<template>
    <div class="search-box">
        <van-nav-bar  @click-left="onClickLeft" fixed placeholder left-text="返回" left-arrow>
            <template #right>
                <van-search class="search" v-model="value" placeholder="请输入搜索关键词" shape="round"/>
            </template>
        </van-nav-bar>
        <div class="content">
            <div class="item" v-for="(item,index) in data" :key="index" @click="getId(item.pid)">
                <van-card
                :tag="item.hot==1?'hot':''"
                :price="item.price"
                :desc="item.enname"
                :title="item.name"
                :thumb="item.url"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            value: '',
            data: [],
        }
    },
    methods:{
        onClickLeft(){
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
        getsearch(){
            this.getData('/search','get',{
                name: this.value
            })
            .then(res=>{
                // console.log(res.result)
                let arr=[]
                res.result.forEach(v => {
                    arr.push({
                        name: v.name,
                        enname: v.enname,
                        hot: v.isHot,
                        pid: v.pid,
                        url: v.smallImg,
                        price: v.price
                    })
                });
                // console.log(arr)
                this.data=arr
            })
            .catch(err=>{
                console.log(err)
            })
        },
        getId(itemId){
            this.$router.push({name: 'detail', query: {itemId}});
        },
    },
    created(){
        this.getsearch()
    },
    watch:{
        value(){
            this.getsearch()
        }
    }
}
</script>

<style lang="less" scoped>
.search{
    margin-right: -20px;
    width: 300px;
    height: 100%;
}
.content{
    width: 95%;
    margin: auto;
    .item:first-child{
        margin-top: 10px;
    }
    .item{
        width: 100%;
        height: 100px;
        margin-top: 10px;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        /deep/ .van-card{
            width: 100%;
            height: 100px;
        }
        /deep/ .van-card__thumb{
            height: 80px;
        }
        /deep/ .van-card__title{
            margin-top: 20px;
        }
        /deep/ .van-card__price{
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            font-size: 16px;
            color: #0C34BA;
        }
        /deep/ .van-tag--danger{
            background-color: #0C34BA!important;
        }
    }
    
}
</style>