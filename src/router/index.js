import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'main',
    component: ()=>import('../views/Main.vue'),
    children:[
      {
        path: 'home',
        alias: '',
        name: 'home',
        component: ()=>import('../views/Home.vue')
      },
      {
        path: 'menu',
        name: 'menu',
        component: ()=>import('../views/Menu.vue')
      },
      {
        path: 'shobag',
        name: 'shobag',
        component: ()=>import('../views/Shobag.vue')
      },
      {
        path: 'my',
        name: 'my',
        component: ()=>import('../views/My.vue')
      },
    ]
  },
  {
    path: '/detail',
    name: 'detail',
    component: ()=>import('../views/Detail.vue')
  },
  // 重定向
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('../views/Login.vue')
  },
  //订单结算
  {
    path: '/orderSettlement',
    name: 'orderSettlement',
    component: ()=>import('../components/orderSettlement.vue')
  },
  // 个人资料
  {
    path: '/personal',
    name: 'personal',
    component: ()=>import('../views/personal.vue')
  },
  // 我的订单
  {
    path: '/myOrder',
    name: 'myOrder',
    component: ()=>import('../views/myOrder.vue')
  },
  // 我的收藏
  {
    path: '/myCollection',
    name: 'myCollection',
    component: ()=>import('../views/myCollection.vue')
  },
  // 地址管理
  {
    path: '/myAddress',
    name: 'myAddress',
    component: ()=>import('../views/myAddress.vue')
  },
  //添加地址
  {
    path: '/newAddress',
    name: 'newAddress',
    component: ()=>import('../components/newAddress.vue')
  },
  //编辑地址
  {
    path: '/exditAddress',
    name: 'exditAddress',
    component: ()=>import('../components/exditAddress.vue')
  },
  // 安全中心
  {
    path: '/mySecurity',
    name: 'mySecurity',
    component: ()=>import('../views/mySecurity.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: ()=>import('../components/search.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
