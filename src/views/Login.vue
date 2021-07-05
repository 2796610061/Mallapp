<template>
    <div class="login">
        <van-nav-bar border>
            <template #left>
                <img src="../assets/images/home_active.png" alt="">
                <span class="t-left">Luckin Coffee</span>
            </template>
            <template #right>
                <span class="t-right" @click="next">先逛一逛</span>
            </template>
        </van-nav-bar>

        <!-- 登入 -->
        <div class="layout">
            <div class="title">欢迎回来!</div>
            <div class="Tips">Please login to your accounts</div> 
            <van-form @submit="onSubmit" validate-trigger="onSubmit">
                <van-field
                    v-model="username"
                    name="username"
                    label="手机号"
                    placeholder="手机号"
                    :rules="[{ pattern, message: '请填写正确手机号' }]"
                    left-icon="phone"
                    clearable
                    autocomplete="off"
                />
                <van-field
                v-model="password"
                :type="showornot"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '密码必须以字母开头' }]"
                left-icon="lock"
                clearable
                autocomplete="off"
                >
                    <template #button>
                        <span @click="isShow">
                        <van-icon name="closed-eye" v-if="show" />
                        <van-icon name="eye-o" v-else />
                        </span>
                    </template>
                </van-field>
                <div class="forget">忘记密码?</div>
                <div class="submit">
                    <van-button round block type="info" color="#0C34BA" native-type="submit">登入</van-button>
                </div>
            </van-form>
            <div class="register">
                    <van-button @click="btnShow=!btnShow" round block type="info" color="#fff">注册</van-button>
            </div>
        </div>

        <!-- 注册 -->
        <van-popup
        v-model="btnShow"
        closeable
        position="bottom"
        :style="{ height: '50%' }"
        >
            <div class="content">
                 <div class="showtitle">注册</div>
                 <van-form @submit="onBlur" validate-trigger="submit">
                    <van-field
                        v-model="reusername"
                        name="reusername"
                        label="手机号"
                        placeholder="手机号"
                        :rules="[{ pattern, message: '请填写正确手机号' }]"
                        clearable
                        autocomplete="off"
                    />
                    <van-field
                    v-model="repassword"
                    :type="showornot"
                    name="repassword"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ validator: asyncValidator, message: '密码必须包含字母和数字' }]"
                    clearable
                    autocomplete="off"
                    >
                        <template #button>
                            <span @click="isShow">
                            <van-icon name="closed-eye" v-if="show" />
                            <van-icon name="eye-o" v-else />
                            </span>
                        </template>
                    </van-field>
                    <van-field
                        v-model="nickname"
                        name="nickname"
                        label="昵称"
                        placeholder="昵称"
                        :rules="[{ required: true, message: '请输入昵称' }]"
                        clearable
                        autocomplete="off"
                    />
                    <div class="submit">
                        <van-button round block type="info" color="#0C34BA" native-type="submit">注册</van-button>
                    </div>
                </van-form>
            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
    data() {
        return {
            appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
            username: '',
            password: '',
            show: true,
            showornot: 'password',
            pattern: /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/,
            btnShow: false,
            reusername: '',//注册拥护
            repassword: '',//注册密码
            nickname: '',//昵称
        };
    },
    methods: {
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
        // 登入
        onSubmit(values) {
            // console.log('submit1', values);
            this.getData('/login','post',{
                // appkey: this.appkey,
                password: values.password,
                phone: values.username,
            })
            .then(res=>{
                // console.log(res)
                if(res.code==200){
                    this.$toast(res.msg);
                    // this.$cookies.set('token', res.token, 5000)
                    sessionStorage.setItem('token', res.token);
                    setTimeout(()=>{
                        this.$router.push({name:'home'})
                    },1000)
                }else if(res.code==201){
                    this.$toast(res.msg);
                }else if(res.code==202){
                    this.$toast(res.msg);
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        isShow() {
            this.show = !this.show
            if (this.show === true) {
                this.showornot = 'password'
            } else {
                this.showornot = 'text'
            }
        },

        // 注册
        onBlur(values){
            this.getData('/register','post',{
                // appkey: this.appkey,
                nickName: values.nickname,
                password: values.repassword,
                phone: values.reusername,
            })
            .then(res=>{
                // console.log(res)
                if(res.code==100){
                    this.btnShow=false
                    this.$toast(res.msg);
                }
                if(res.code==102){
                    this.$toast(res.msg);
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        asyncValidator(){
            return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/.test(this.repassword)
        },
        next(){
            this.$router.push('main')
        },
    },
};
</script>

<style lang="less" scoped>
.login{
    width: 100%;
    height: 100%;
    background: #fff;
    img{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    .t-left{
        font-weight: 700;
    }
    .t-right{
        color: #0C34BA;
        font-weight: bold;
    }
    .layout{
        width: 100%;
        .title{
            padding: 20px 10px;
            font-size: 25px;
            font-weight: bolder;
            color: #646566;
            margin-top: 80px;
        }
        .Tips{
            padding: 10px 10px;
            color: #646566;
            margin-bottom: 40px;
        }
        .forget{
            text-align: right;
            padding:20px 10px 40px;
            font-size: 14px;
            color: #646566;
        }
        .submit{
            padding: 0 10px;
        }
        .register{
            padding: 0 10px;
            margin-top: 50px;
             /deep/ .van-button{
                border: 1px solid #ccc!important;
                color: black!important;
            }
        }
    }
    .content{
        .showtitle{
            font-size: 18px;
            padding: 15px 10px 30px;
        }
        .submit{
            padding: 10px 10px;
        }
    }
}
</style>