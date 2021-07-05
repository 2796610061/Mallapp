<template>
    <div class="presonal">
        <van-nav-bar
        title="个人资料"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="heade"></div>
        <div class="content">
            <ul>
                <!-- ../assets/images/touxiang.jpeg -->
                <li>
                    <span>头像</span><span class="img">
                        <img :src="data.userImg" alt="">
                        <van-uploader :after-read="afterRead" />
                    </span>
                </li>
                <li><span>用户id</span><span>{{data.userid}}</span></li>
                <li><span>昵称</span><span @click="modify(data.name,'name')">{{data.name}}</span></li>
                <li><span>手机号码</span><span>{{data.phone}}</span></li>
                <li>
                    <span>简介</span><span class="text van-ellipsis" @click="modify(data.desc,'desc')">{{data.desc?data.desc:'这家伙很懒，什么也没有留下'}}</span>
                </li>
            </ul>
        </div>

        <van-popup v-model="show">
           <div class="box">
               <div class="title">编辑</div>
                <van-field
                v-model="val"
                rows="1"
                autosize
                type="textarea"
                show-word-limit
                clearable
                />
                <div class="select">
                    <div @click="exit">取消</div>
                    <div @click="confirm">确认</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:{},
            show: false,
            val: "",
            type: '',
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
        getUser(){
            this.getData('/findAccountInfo','get')
            .then(res=>{
                if(res.code=="B001"){
                    // console.log(res)
                    let arr={}
                    res.result.forEach(v => {
                            arr.name=v.nickName,
                            arr.userImg=v.userImg,
                            arr.vip=v.vip
                            arr.desc=v.desc
                            arr.phone=v.phone
                            arr.userid=v.userId
                    });
                    // console.log(arr)
                    this.data=arr
                }
            })
            .catch(err=>{
                conaole.log(err)
            })
        },
        // 修改
        modify(e,call){
            this.show=true
            this.val=e
            this.type=call
        },
        // 退出修改
        exit(){
            this.show=false
        },
        // 确认修改
        confirm(){
            let url=''
            let data={}
            if(this.type=="name"){
                url='/updateNickName'
                data={nickName: this.val}
            }else if(this.type=="desc"){
                url='/updateDesc'
                data={desc: this.val}
            }
            if(this.val!=""){
                this.show=false
                this.getData(url,'post',data)
                .then(res=>{
                    this.getUser()
                })
                .catch(err=>{
                    console.log(err)
                })
            }else{
                this.$toast("不允许为空")
            }
        },
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            let url=file.content.replace(/^data:image\/[A-Za-z]+;base64,/, '')
            this.getData('/updateAvatar','post',{
                imgType: 'jpeg',
                serverBase64Img: url
            })
            .then(res=>{
                if(res.code=='H001'){
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
.heade{
    width: 100%;
    height: 150px;
    background: #0C34BA;
}
.content{
    width: 95%;
    box-shadow: 0 0 1px 1px rgb(221, 220, 220);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: #fff;
    position: relative;
    top: -30px;
    margin: auto;
    ul{
        width: 95%;
        margin: auto;
        padding-top: 20px;     
        li:first-child{
            .img{
                display: block;
                position: relative;
                width: 35px;
                height: 35px;
                min-width: 35px;
                min-height: 35px;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
                /deep/ .van-uploader{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                }
            }
        }
        li{
            height: 50px;
            font-size: 14px;
            color: #afadad;
            border-bottom: 1px solid rgb(228, 226, 226);
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
                min-width: 50px;
                min-height: 30px;
                line-height: 30px;
            }
            .text{
                max-width: 185px;
            }
        }
    }
}
/deep/ .van-field__control{
    margin-left: 20px;
    font-size: 14px;
}
.box{
    .title{
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        color: #fff;
        background: rgb(230, 45, 45);
    }
    /deep/ .van-field__control{
        margin-left: 0;
        font-size: 14px;
    }
    .select{
        display: flex;
        border-top: 1px solid #ccc;
        div:first-child{
            border-right: 1px solid #ccc;
        }
        div{
            height: 40px;
            line-height: 40px;
            width: 50%;
            text-align: center;
        }
        div:last-child{
            color: #0C34BA;
        }
    }
}
/deep/ .van-popup--center{
    border-radius: 10px;
}
</style>