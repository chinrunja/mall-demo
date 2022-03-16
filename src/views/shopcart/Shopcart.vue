<template>
  <div class="shopcart">
    <!-- <h2>购物车</h2> -->
    <nav-bar>
      <div slot="center" class="nav-bar">购物车({{ length }})</div>
    </nav-bar>
    <scroll class="scroll" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Shopcart',
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  computed: {
    // ...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>

<style scoped>
.shopcart {
  height: 100vh;
}
.nav-bar {
  color: #fff;
  background-color: var(--color-tint);
  justify-content: center;
}
.scroll {
  /* position: absolute; */
  overflow: hidden;
  /* top: 44px;
  bottom: 49px;
  left: 0;
  right: 0; */
  height: calc(100% - 44px - 49px - 40px);
}
</style>
