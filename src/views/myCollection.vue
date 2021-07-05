<template>
    <div class="presonal">
        <van-nav-bar
        title="我的收藏"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="heade"></div>
        <div class="content">
            <ul>
                <li v-for="(item,index) in data" :key="index">
                    <div class="item">
                        <div class="tag" v-if="item.hot==1?true:false">hot</div>
                        <img :src="item.url" alt="">
                        <div class="title">{{item.name}}</div>
                        <div class="text van-ellipsis">{{item.enname}}</div>
                        <div class="price">
                            <span>￥{{item.price}}</span>
                            <van-icon name="delete-o" size="16px" @click="delect(item.pid)"/>
                        </div>
                    </div>
                </li>
            </ul>
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
       getdata(){
           this.getData("/findAllLike",'get')
            .then(res=>{
                // console.log(res)
                if(res.code==2000){
                    let arr=[]
                    res.result.forEach(item => {
                        arr.push({
                            name: item.name,
                            enname: item.enname,
                            price: item.price,
                            pid: item.pid,
                            url: item.smallImg,
                            hot: item.isHot,
                        })
                    });
                    this.data=arr
                }
                if(res.code==700){
                    
                }
            })
            .catch(err=>{
                console.log(err)
            })
       },
       delect(id){
           this.getData('/notlike','post',{pid: id})
           .then(res=>{
               if(res.code==900){
                   this.$toast(res.msg)
                   this.getdata()
               }
           })
           .catch(err=>{
               console.log(err)
           })
       }
    },
    created(){
        this.getdata()
    }
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
    min-height: 50px;
    margin: auto;
    overflow: hidden;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: relative;
    top: -30px;
    background: #fff;
    ul{
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        flex-wrap: wrap;
        li{
            width: calc(100% / 3);
            .item{
                width: 85%;
                margin: auto;
                margin-top: 10px;
                position: relative;
                .tag{
                    height: 12px;
                    position: absolute;
                    top: 5px;
                    left: 0;
                    padding: 1px 4px;
                    line-height: 12px;
                    background: #1A3BC2;
                    color: #fff;
                    border-top-right-radius: 12px;
                    border-bottom-right-radius: 12px;
                }
                img{
                    width: 100%;
                    height: 100%;
                }
                .title{
                    font-size: 14px;
                    color: #838181;
                    margin: 5px 0;
                }
                .text{
                    color: #9E9E9E;
                    margin-bottom: 10px;
                }
                .price{
                    display: flex;
                    justify-content: space-between;
                    span{
                        color: #1A3BC2;
                        font-size: 12px;
                        font-weight: 800;
                    }
                }
            }
        }
    }
}
</style>