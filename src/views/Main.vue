<template>
  <div class="main">
      <div class="content">
        <!-- 子路由位置 -->
        <transition name="van-fade">
            <router-view/>
        </transition>
      </div>

      <!-- 底部导航栏  route-->
      <van-tabbar v-model="active" active-color="#0C34BA" inactive-color="#000" route>
          <van-tabbar-item v-for="(item,index) in icon" :key="index" :to="item.to" :badge="index==2?countNumber==0?'':countNumber:''">
              <span>{{item.name}}</span>
              <template #icon="props">
                  <img :src="props.active ? item.active : item.inactive" />
              </template>
          </van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
export default{
  data(){
    return {
      active: 0,
      icon:[
        {
          active: require('../assets/images/home_active.png'),
          inactive: require('../assets/images/home.png'),
          name: "首页",
          to: {name: 'home'},// to: {name: 'home'}以路由名字跳转可以避免子路由层数过多时路径过长不好写    以路径跳转to: '/home',子路由不加斜杠设置route会出问题
        },
        {
          active: require('../assets/images/menu_active.png'),
          inactive: require('../assets/images/menu.png'),
          name: "菜单",
          to: {name: 'menu'},
        },
        {
          active: require('../assets/images/shopbag_active.png'),
          inactive: require('../assets/images/shopbag.png'),
          name: "购物袋",
          to: {name: 'shobag'},
        },
        {
          active: require('../assets/images/my_active.png'),
          inactive: require('../assets/images/my.png'),
          name: "我的",
          to: {name: 'my'},
        }
      ],
    }
  },
  computed:{
    countNumber(){
      return this.$store.state.count
    }
  },
  methods:{
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
  mounted(){
    this.visible=true
  },
  created(){
    this.getData('/shopcartCount','get')
    .then(res=>{
      // console.log(res)
      if(res.code==4000){
        this.$store.commit('getCount',res.result)
      }
    })
    .catch(err=>{
      consolg.log(err)
    })
  },
}
</script>

<style lang="less" scoped>
.div{
  width: 100px;
  height: 100px;
  background: red;
}
/deep/ .van-tabbar{
  z-index: 2000;
}
</style>