<template>
  <div class="category">
    <!-- <h2>分类</h2> -->
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <tab-control
      :titles="['综合', '新品', '销量']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control1"
      v-show="isShowTabControl"
      :style="{ width: `calc(100% - ${tabOffsetLeft}px)` }"
    />
    <div class="content">
      <category-menu
        :categories="categories"
        @selectItem="selectItem"
      ></category-menu>
      <scroll
        class="scroll"
        :data="[categoryData]"
        :probe-type="3"
        @scroll="contentScroll"
        ref="scroll"
      >
        <div>
          <category-content :subcategories="showSubcategory"></category-content>
          <tab-control
            :titles="['综合', '新品', '销量']"
            @tabClick="tabClick"
            ref="tabControl2"
            class="tab-control2"
          ></tab-control>
          <goods-list :goods="showCategoryDetail"></goods-list>
        </div>
      </scroll>
    </div>

    <back-top v-show="isShowTop" @click.native="goTop"></back-top>
  </div>
</template>

<script>
import CategoryMenu from './childComps/CategoryMenu.vue'
import CategoryContent from './childComps/CategoryContent.vue'

import NavBar from 'components/common/navbar/NavBar.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import { POP, NEW, SELL } from 'common/const'

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from 'network/category'
import { itemImgLoadMixin, backTopMixin, tabControlMixin } from 'common/mixin'

export default {
  name: 'Category',
  components: {
    CategoryMenu,
    NavBar,
    CategoryContent,
    Scroll,
    GoodsList
  },
  mixins: [itemImgLoadMixin, backTopMixin, tabControlMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      scroll: null,
      currentIndex: -1,
      saveY: 0,
      tabOffsetTop: 0,
      tabOffsetLeft: 0
    }
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) {
        return {}
      }

      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) {
        return []
      }

      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ].list
    }
  },
  created() {
    this._getCategory()
  },
  mounted() {
    this.$bus.$on('gridViewImgLoad', () => {
      this.itemImgListener()
      this.setOffset()
    })
  },
  activated() {
    this.$refs.scroll && this.$refs.scroll.scrollTo(0, this.saveY, 10)
    // this.setOffset()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    setOffset() {
      let t = setTimeout(() => {
        this.tabOffsetLeft = this.$refs.scroll.$el.offsetLeft
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop + 44
        clearTimeout(t)
      }, 200)
    },
    selectItem(index) {
      this._getSubCategories(index)
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, -44, 100)
      this.$refs.scroll && this.$refs.scroll.refresh()
      this.setOffset()
    },
    _getCategory() {
      getCategory().then((res) => {
        this.categories = res.data.category.list

        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          }
        }

        this._getSubCategories(0)
      })
    },
    _getSubCategories(index) {
      this.currentIndex = index
      const maitKey = this.categories[index].maitKey
      getSubcategory(maitKey).then((res) => {
        this.categoryData[index].subcategories = res.data.subcategory[index]
        this.categoryData = { ...this.categoryData }
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      })
    },
    _getCategoryDetail(type) {
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      getCategoryDetail(miniWallkey, type).then((res) => {
        this.categoryData[this.currentIndex].categoryDetail[type] =
          res.data.categoryDetail[type]
        this.categoryData = { ...this.categoryData }
      })
    }
  }
}
</script>

<style scoped>
.category {
  height: 100vh;
  overflow: hidden;
}
.nav-bar {
  position: relative;
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  z-index: 3;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
}
.scroll {
  padding-top: 44px;
  overflow: hidden;
  height: calc(100vh - 49px - 44px);
  flex: 1;
}
.tab-control1 {
  position: absolute;
  z-index: 3;
  right: 0;
}
</style>
