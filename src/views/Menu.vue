<template>
  <div class="menu">
    <div class="seach-box">
      <van-search v-model="searchValue" shape="round" placeholder="请输入搜索关键词" @click="search"/>
    </div>
    <div class="menu-box">
        <div class="menu-list">
            <div class="menu-list-item" 
              :class="{active: activeIndex === index}" 
              v-for="(item,index) in typeArr" :key="item.id" 
              @click="toggleActive(index,item.type)"
            >
              {{item.typeDesc}}
            </div>
        </div>
      <div class="commodity">
            <div class="list" v-for="(item,index) in commodityArr" 
            :key="index" v-lazy="item.url" ref="list" @click="getId(item.id)">
                <hot-table >
                    <template v-slot:hot v-if="item.hot==1?true:false">
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
            <div class="list" v-if="addlength">
               
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import hotTable from '../components/hotTable.vue'
  export default {
    name: 'Menu',
    components: {
      hotTable
    },
    data() {
      return {
        searchValue: '',//搜索框值
        activeIndex: 0,// 侧边栏切换高亮
        typeArr: [],// 商品分类数据
        commodityArr: [],//商品数据
        addlength: false,//占位切换
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
      //获取商品类型
      getHotdata(){
        this.getData('/type','get',
          {key: 'isHot'})
          .then(res=>{
              if(res.code==400){
                //  console.log(res)
                  res.result.unshift({id: 0,type: 'isHot', typeDesc: '热卖推荐'})
                  res.result.forEach(item => {
                      this.typeArr.push(
                        {
                          id: item.id,
                          type: item.type, 
                          typeDesc: item.typeDesc,
                        }
                      )
                  });
              }
              
          })
          .catch(err=>{
              console.log(err)
          })
      },

      //根据商品类型获取商品
      parsingData(data,val){
        this.getData('/typeProducts','get',
          {appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',key: data,value: val})
          .then(res=>{
              if(res.code==500){
                  // console.log(res)
                  this.commodityArr=[]
                  res.result.forEach(item => {
                      this.commodityArr.push(
                        {
                          id: item.pid,
                          name: item.name, 
                          url: item.smallImg,
                          enname: item.enname,
                          price: item.price,
                          bigurl: item.largeImg,
                          desc: item.desc,
                          hot: item.isHot
                        }
                      )
                  });
                  // console.log(this.commodityArr)
                  if((this.commodityArr.length)%2!=0){
                      this.addlength=true
                  }else{
                    this.addlength=false
                  }
              }
              
          })
          .catch(err=>{
              console.log(err)
          })
      },
      //切换高亮  根据商品类型获取商品
      toggleActive(index,type){
        this.activeIndex=index
        if(type=="isHot"){
          this.parsingData(type,1)
        }else{
          this.parsingData("type",type)
        }
      },

      getId(itemId){
        this.$router.push({name: 'detail', query: {itemId}});
      },

      search(){
          this.$router.push({name: "search"})
      }
    },

    created() {
      this.getHotdata()
      this.parsingData("isHot",1)
    },

  }
</script>

<style lang="less" scoped>
.menu{
  background: #F1F1F1;
}
.menu-pro{
  width: calc(~"50% - 5px");
  margin-right: 10px;
  margin-bottom: 10px;
  &:nth-child(2n){
    margin-right: 0;
  }
}
.menu-products{
  display: flex;
  flex-wrap: wrap;
}
.seach-box{
  position: sticky;
  top: 0;
}

.menu-box{
  position: fixed;
  top: 54px;
  right: 0;
  left: 0;
  bottom: 50px;
  display: flex;
}

.menu-list{
  width: 100px;
  height: 100%;
  font-size: 14px;
  overflow-y: auto;
  background: #fff;
  border-right: 1px solid #f1f1f1;
}

.menu-list-item{
  height: 40px;
  text-align: center;
  line-height: 40px;
}

.menu-list-item.active{
  background-color: rgba(204, 204, 204, 0.342);
  color: #0C34BA;
}

.commodity{
    width: 100%;
    background: #F1F1F1;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .list{
        width: 50%;
        padding: 5px;
        background: #F1F1F1;
        box-sizing: border-box;
        flex: 1 50%;
    }
  }
</style>