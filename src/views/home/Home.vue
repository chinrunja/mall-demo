<template>
  <div class="home">
    <!-- <h2>首页</h2> -->
    <nav-bar class="home-nav">
      <div slot="center">Data From FakerJS</div>
    </nav-bar>
    <scroll class="scroll">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view :img="feature"></feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @goTop="goTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backtop/BackTop.vue'

import { getHomeMultidata, getHomeGoods, getHomeFeature } from 'network/home'

export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      feature: '',
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop'
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop,
    Scroll
  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    this.getHomeFeature()
  },
  methods: {
    tabClick(index) {
      const arr = ['pop', 'new', 'sell']
      this.currentType = arr[index]
    },
    goTop() {
      window.scrollTo(0, 0)
      console.log('test')
    },
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(JSON.stringify(res))
        this.banners = res.data.banner
        this.recommends = res.data.recommend
      }, console.log)
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1

      getHomeGoods(type, page).then((res) => {
        // console.log(JSON.stringify(res))
        this.goods[type].list.push(...res[type].list)
        this.goods[type].page += 1
      }, console.log)
    },
    getHomeFeature() {
      getHomeFeature().then((res) => {
        this.feature = res
      }, console.log)
    }
  }
}
</script>

<style scoped>
.home {
  padding-top: 44px;
  padding-bottom: 49px;
  height: 100vh;
  overflow: hidden;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  /* position: sticky; */
  /* top: 44px; */
}
.scroll {
  height: calc(100%);
  /* padding-top: 44px; */
}
</style>
