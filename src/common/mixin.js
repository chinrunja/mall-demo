import BackTop from 'components/content/backtop/BackTop.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'

import { debounce } from './utils'

import { POP, SELL, NEW, TOP_DISTANCE } from './const'

export const itemImgLoadMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh)
    this.itemImgListener = () => {
      refresh()
    }

    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowTop: false,
      isShowTabControl: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    goTop() {
      this.$refs.scroll.scrollTo(0, 20, 500)
    },
    contentScroll(position) {
      this.position = position
      this.isShowTop = -this.position.y > TOP_DISTANCE
      this.isShowTabControl = -this.position.y > this.tabOffsetTop

      if (this.setCurrentIndex) {
        this.setCurrentIndex()
      }
    }
  }
}

export const imgLoadMixin = {
  data() {
    return {
      isImgLoad: false
    }
  },
  methods: {
    imgLoad() {
      if (!this.isImgLoad) {
        // console.log('imgLoad')
        this.$emit('getOffset')
        this.isImgLoad = true
      }
    }
  }
}

export const tabControlMixin = {
  components: {
    TabControl
  },
  data() {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      // const arr = ['pop', 'new', 'sell']
      // this.currentType = arr[index]
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index

      switch (index) {
        case 0: {
          if (this.currentType != POP && this.isShowTabControl) {
            this.$refs.scroll &&
              this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 300)
          }
          this.currentType = POP
          break
        }
        case 1: {
          if (this.currentType != NEW && this.isShowTabControl) {
            this.$refs.scroll &&
              this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 300)
          }
          this.currentType = NEW
          break
        }
        case 2: {
          if (this.currentType != SELL && this.isShowTabControl) {
            this.$refs.scroll &&
              this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 300)
          }
          this.currentType = SELL
          break
        }
      }
    }
  }
}
