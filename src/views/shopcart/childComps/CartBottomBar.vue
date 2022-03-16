<template>
  <div class="bottom-bar">
    <div class="bottom-content left">
      <check-button
        class="check-all"
        @click.native="checkAll"
        :isChecked="isCheckedAll"
      ></check-button>
      <span class="check-all-text">全选</span>
      <span>合计：￥{{ totalPrice.toFixed(2) }}</span>
    </div>
    <div class="pay right" @click="pay">
      去结算({{ cartListChecked.length }})
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import CheckButton from 'components/content/checkbutton/CheckButton.vue'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  methods: {
    ...mapMutations(['check_all']),
    checkAll() {
      // this.$store.commit('check_all', { checked: this.isCheckedAll })
      this.check_all({ checked: this.isCheckedAll })
    },
    pay() {
      // console.log(this.$toast)
      if (!this.cartListChecked.length) {
        this.$toast.show('请选择想要购买的商品')
      } else {
        this.$toast.show('结算页面未完成')
      }
    }
  },
  computed: {
    ...mapGetters(['cartListChecked', 'cartList', 'cartLength']),
    totalPrice() {
      return this.cartListChecked.reduce(
        (acc, obj) => acc + obj.price * obj.count,
        0
      )
    },
    isCheckedAll() {
      if (!this.cartLength) return false

      return this.cartList.every((obj) => obj.checked)
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  position: relative;
  background-color: #f0f0f0;
}
.bottom-content {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.check-all {
  margin-left: 5px;
  margin-right: 5px;
}
.check-all-text {
  /* display: inline-block; */
  margin-right: 10px;
}
.pay {
  flex: 1;
  display: inline;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 40px;
  position: absolute;
  right: 0;
  background-color: var(--color-tint);
  color: #fff;
}
</style>
