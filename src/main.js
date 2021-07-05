import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import store from './store'
import 'lib-flexible/flexible'//自适应插件引入
import {validateTokenUrls} from './assets/js/url'

//vant组件引入
import { 
  Tabbar, 
  TabbarItem, 
  NavBar, 
  Search, 
  Swipe, 
  SwipeItem, 
  Toast, 
  Lazyload, 
  GoodsAction, GoodsActionIcon, GoodsActionButton,
  Stepper,
  Card,
  Tag,
  SubmitBar ,
  Checkbox, CheckboxGroup,
  SwipeCell ,Button ,
  Form ,Field ,
  Icon ,
  Popup ,
  Overlay ,
  Tab, Tabs ,
  Area ,
  Switch ,
  Cell, CellGroup,
  Dialog ,
  Uploader,
} from 'vant';

Vue.use(Tabbar)
.use(TabbarItem)
.use(NavBar)
.use(Search)
.use(Swipe)
.use(SwipeItem)
.use(Toast)
.use(Lazyload)
.use(GoodsAction)
.use(GoodsActionIcon)
.use(GoodsActionButton)
.use(Stepper)
.use(Card)
.use(Tag)
.use(SubmitBar)
.use(Checkbox)
.use(CheckboxGroup) 
.use(SwipeCell)
.use(Button)
.use(Form)
.use(Field)
.use(Icon)
.use(Popup)
.use(Overlay)
.use(Tab)
.use(Tabs)
.use(Area)
.use(Switch)
.use(Cell)
.use(CellGroup) 
.use(Dialog)
.use(Uploader)


Vue.use(VueAxios, axios)
Vue.use(VueCookies)
Vue.config.productionTip = false


axios.defaults.baseURL = 'http://www.kangliuyong.com:10002'

//设置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002'

//axios拦截器
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //发送请求之前，显示加载中
  let arrurl=['/shopcartCount','/findAllShopcart','/modifyShopcartCount']
  if(arrurl.indexOf(config.url)==-1){
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      });
  }

  // console.log('config ==> ', config);

  let appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';
  // let token = Vue.$cookies.get('token')
  let token=sessionStorage.getItem('token');
  if (config.method === 'post') {

    //进行post请求参数序列化
    config.data = config.data || {};
    let dataString = '';
    for (let key in config.data) {
      dataString += `${key}=${config.data[key]}&`
    }

    config.data = dataString + 'appkey=' + appkey;

    if (validateTokenUrls.indexOf(config.url) > -1) {
      config.data += `&tokenString=${token}`;
    }

  } else if (config.method === 'get') {
    config.params = config.params || {};
    config.params.appkey = appkey;

    //找到则需要验证token
    if (validateTokenUrls.indexOf(config.url) > -1) {
      config.params.tokenString = token;
    }
  }


  return config;

}, error => {
  // 对请求错误做些什么
  Toast.clear();
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  //服务器响应数据后，关闭加载提示
  Toast.clear();
  return response.data;
}, error => {
  // 对响应错误做点什么
  Toast.clear();
  return Promise.reject(error);
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
