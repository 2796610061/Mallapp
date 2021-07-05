<template>
    <div class="presonal">
        <van-nav-bar
        title="安全中心"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="heade"></div>
        <div class="content">
            <ul>
                <li><span>修改密码</span><van-icon name="arrow" @click="message=true"/></li>
                <li><span>注销账号</span><van-icon name="arrow" @click="mask=true"/></li>
            </ul>
        </div>
        <div class="button">
            <van-button type="primary" round color="#0C34BA" @click="userExit" size="large">退出登入</van-button>
        </div>

        <van-popup
        v-model="message"
        closeable
        position="bottom"
        :style="{ height: '40%' }"
        >
            <div class="content-item">
                 <div class="showtitle">修改密码</div>
                <van-form @submit="submit" validate-trigger="submit">
                    <van-field
                    v-model="password"
                    :type="showornot"
                    name="password"
                    label="旧密码"
                    placeholder="旧密码"
                    :rules="[{ pattern, message: '密码以字母开头' }]"
                    clearable
                    autocomplete="off"
                    >
                        <template #button>
                            <span @click="isShowone">
                            <van-icon name="closed-eye" v-if="show" />
                            <van-icon name="eye-o" v-else />
                            </span>
                        </template>
                    </van-field>

                    <van-field
                    v-model="newpassword"
                    :type="showornot"
                    name="newpassword"
                    label="密码"
                    placeholder="新密码"
                    :rules="[{ pattern, message: '密码以字母开头' }]"
                    clearable
                    autocomplete="off"
                    >
                        <template #button>
                            <span @click="isShowtwo">
                            <van-icon name="closed-eye" v-if="isShow" />
                            <van-icon name="eye-o" v-else />
                            </span>
                        </template>
                    </van-field>
                    <div class="submit">
                        <van-button round block type="info" color="#0C34BA" native-type="submit">修改密码</van-button>
                    </div>
                </van-form>
            </div>
        </van-popup>

        <van-overlay :show="mask" @click="mask = false">
            <div class="wrapper" >
                <div class="block">
                    <div class="title">
                        <h3>注销账号</h3>
                        <span>是否确定注销账号，一旦注销无法恢复!</span>
                    </div>
                    <div class="btn">
                        <div>取消</div>
                        <div @click="cancellation">确认</div>
                    </div>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
export default {
    data(){
        return{
            message: false,
            mask: false,
            show: true,
            isShow: true,
            password: '',
            newpassword: '',
            showornot: 'password',
            pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/,
            flag: false,
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        // 修改密码
        modify(){
            this.flag=!this.flag
        },
        isShowone() {
            this.show = !this.show
            if (this.show === true) {
                this.showornot = 'password'
            } else {
                this.showornot = 'text'
            }
        },
        isShowtwo() {
            this.isShow = !this.isShow
            if (this.isShow === true) {
                this.showornot = 'password'
            } else {
                this.showornot = 'text'
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
        submit(values){
            // console.log(values.newpassword)
            this.getData('/updatePassword','post',{
                password: values.newpassword,
                oldPassword: values.password
            })
            .then(res=>{
                console.log(res)
                if(res.code=="E003"){
                    this.$toast(res.msg)
                }
                if(res.code=="E001"){
                    this.$toast(res.msg)
                    setTimeout(()=>{
                        this.$router.push({name: 'login'})
                    },1500)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        //注销
        cancellation(){
            this.getData('/destroyAccount','post')
            .then(res=>{
                if(res.code=="G001"){
                    setTimeout(()=>{
                        this.$router.replace({name:'login'})
                    },1000)
                }
            })
            .catch(err=>{
                console.log(err)
            })
            
        },
        // 退出登入
        userExit(){
            this.getData('/logout','post')
            .then(res=>{
                if(res.code=="F001"){
                    this.$store.commit('getCount',0)
                    setTimeout(()=>{
                        this.$router.push({name: 'login'})
                    },1500)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
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
            img{
                width: 35px;
                height: 35px;
                border-radius: 50%;
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
        }
        li:last-child{
            border-bottom: none;
        }
        
    }
}
.button{
    width: 90%;
    margin: auto;
    margin-top: 250px;
}
.content-item{
    position: relative;
    margin-top: 60px;
    .showtitle{
        font-size: 16px;
        position: absolute;
        top: -45px;
        left: 10px;
        z-index: 1000;
    }
    .submit{
        margin-top: 30px;
    }
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    width: 80%;
    height: 150px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    .title{
        height: 70px;
        border-bottom: 1px solid #f1f1f1;
    }
    h3{
        font-size: 16px;
        text-align: center;
        margin-top: 30px;
        margin-bottom: 10px;
    }
    span{
        display: block;
        text-align: center;
        color: rgb(172, 169, 169);
    }
    .btn{
        height: 50px;
        display: flex;
        div:first-child{
            border-right: 1px solid #f1f1f1;
            color: #ccc;
        }
        div{
            width: 50%;
            height: 100%;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            color: #1438C3;
        }
    }

}
</style>