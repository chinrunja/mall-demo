<template>
  <div class="home">
    <!-- <h2>首页</h2> -->
    <nav-bar class="home-nav">
      <div slot="center" @click="refresh">mobile mall demo</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isShowTabControl"
      class="tab-control"
    ></tab-control>
    <scroll
      class="scroll"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pulling-up="loadMore"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view :img="feature" @getOffset="getTabOffsetTop"></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="goTop" v-show="isShowTop"></back-top>
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
import { itemImgLoadMixin, backTopMixin } from 'common/mixin.js'

export default {
  name: 'Home',
  mixins: [itemImgLoadMixin, backTopMixin],
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
      currentType: 'pop',
      position: {},
      tabOffsetTop: 0,
      isShowTabControl: false,
      saveY: 0
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
  /* mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)

    // this.$bus.$on('itemImageLoad', () => {
    // this.$refs.scroll && this.$refs.scroll.refresh()
    //   refresh()
    // })

    // console.log(this.$refs.tabControl2.$el)
  }
  */
  methods: {
    refresh() {
      // console.log(this.$router)
      this.$router.go(0)
    },
    tabClick(index) {
      const arr = ['pop', 'new', 'sell']
      this.currentType = arr[index]
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    /* goTop() {
      // window.scrollTo(0, 0)
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      this.$refs.scroll.scrollTo(0, 20, 500)
      // console.log('test')
    }, */
    loadMore() {
      // console.log('load more...')
      // setTimeout(() => {
      //   this.$refs.scroll.finishPullUp()
      // }, 1000)
      this.getHomeGoods(this.currentType)
      // this.$refs.scroll.refresh()
    },
    getTabOffsetTop() {
      // console.log(this.$refs.tabControl2.$el)
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(JSON.stringify(res))
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      }, console.log)
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1

      getHomeGoods(type, page).then((res) => {
        // console.log(JSON.stringify(res[type].list))
        this.goods[type].list.push(...res[type].list, ...res[type].list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      }, console.log)
    },
    getHomeFeature() {
      getHomeFeature().then((res) => {
        this.feature = res
      }, console.log)
    }
  },
  computed: {
    showGoods() {
      // console.log(this.goods[this.currentType].list)
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
.home {
  /* padding-top: 44px; */
  /* padding-bottom: 49px; */
  height: 100vh;
  /* overflow: hidden; */
}
.home-nav {
  background-color: var(--color-tint);
  color: white;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
}
.scroll {
  /* height: 100%; */
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* padding-top: 44px; */
}
</style>
