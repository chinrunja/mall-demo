<template>
  <div class="tab-bar">
    <tab-bar-item addr="/home" activeColor="green">
      <img slot="item-icon" src="~/assets/img/tabbar/home.jpg" alt="" />
      <img
        slot="item-icon-active"
        src="~/assets/img/tabbar/home_active.jpg"
        alt=""
      />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item addr="/category" activeColor="green">
      <img slot="item-icon" src="~/assets/img/tabbar/category.jpg" alt="" />
      <img
        slot="item-icon-active"
        src="~/assets/img/tabbar/category_active.jpg"
        alt=""
      />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item addr="/shopcart" activeColor="green">
      <img slot="item-icon" src="~/assets/img/tabbar/shopcart.jpg" alt="" />
      <img
        slot="item-icon-active"
        src="~/assets/img/tabbar/shopcart_active.jpg"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item addr="/profile" activeColor="green">
      <img slot="item-icon" src="~/assets/img/tabbar/profile.jpg" alt="" />
      <img
        slot="item-icon-active"
        src="~/assets/img/tabbar/profile_active.jpg"
        alt=""
      />
      <div slot="item-text">我的</div>
    </tab-bar-item>
    <!-- <tab-bar-item
      v-for="tabItem in tabBarItems"
      :addr="tabItem.addr"
      :id="tabItem.id"
      :key="tabItem.id"
      :isActive="tabItem.isActive"
      @activate="handleActivate"
    >
      <img :src="tabItem.img" slot="item-icon">
      <img :src="tabItem.imgAct"slot="item-icon-active">
      <div slot="item-text">{{tabItem.text}}</div>
    </tab-bar-item> -->
  </div>
</template>

<script>
import TabBarItem from './TabBarItem.vue'

export default {
  name: 'TabBar',
  components: {
    TabBarItem
  }
}
</script>

<style>
.tab-bar {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #f6f6f6;
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
}
.tab-bar-item {
  margin-top: 3px;
  height: 40px;
  flex: 1;
  text-align: center;
  font-size: 13px;
  vertical-align: middle;
  margin-left: 60px;
  margin-right: 60px;
  padding: 5px;
}
.tab-bar-item:hover {
  cursor: pointer;
  background-color: lightblue;
}
.tab-bar-item img {
  width: 24px;
}
</style>
