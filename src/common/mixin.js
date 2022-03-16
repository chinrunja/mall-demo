import BackTop from 'components/content/backtop/BackTop.vue'

import { debounce } from './utils'

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
      this.isShowTop = -this.position.y > 1000
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
