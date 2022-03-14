<template>
  <div class="detail">
    <!-- <div>详情页</div> -->
    <!-- <p>{{ $route.params.id }}</p> -->
    <detail-nav-bar
      @titleClick="titleClick"
      :current-index="currentIndex"
    ></detail-nav-bar>
    <scroll class="scroll" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        :param-info="paramInfo"
        ref="param"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="goTop" v-show="isShowTop"></back-top>
  </div>
</template>

<script>
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backtop/BackTop.vue'

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from 'network/detail.js'
import { itemImgLoadMixin, backTopMixin } from 'common/mixin.js'

export default {
  name: 'Detail',
  mixins: [itemImgLoadMixin, backTopMixin],
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      position: {},
      topThemeYs: [],
      currentIndex: 0,
      refs: ['scroll', 'param', 'comment', 'recommend']
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    BackTop,
    Scroll
  },
  created() {
    this.id = this.$route.params.id

    getDetail(this.id).then((res) => {
      // this.topImages = res.data.recommend.list
      const data = res.result
      this.topImages = data.itemInfo.topImages
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule,
        data.itemParams.rule.disclaimer
      )

      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    getRecommend().then((res) => {
      this.recommends = res.recommend.list
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getTopThemeYs()
    },
    titleClick(i) {
      // console.log(this.$refs.scroll)
      this.currentIndex = i
      this.$refs.scroll.scrollTo(0, -this.topThemeYs[i])
    },
    getTopThemeYs() {
      // this.topThemeYs = this.elId.map((v) => document.getElementById(v).y)
      this.topThemeYs = this.refs.map((v) => this.$refs[v].$el.offsetTop)
    },
    setCurrentIndex() {
      let currentPosition = -this.position.y

      if (currentPosition < +this.topThemeYs[1]) {
        this.currentIndex = 0
      } else if (currentPosition < +this.topThemeYs[2]) {
        this.currentIndex = 1
      } else if (currentPosition < +this.topThemeYs[3]) {
        this.currentIndex = 2
      } else if (currentPosition > +this.topThemeYs[3]) {
        this.currentIndex = 3
      }

      console.log(currentPosition, this.position.y, this.topThemeYs)
    }
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.scroll {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 0px;
  left: 0;
  right: 0;
}
</style>
