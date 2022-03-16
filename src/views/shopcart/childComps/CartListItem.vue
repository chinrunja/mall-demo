<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <check-button @click.native="checkClick" :is-checked="cartItem.checked">
      </check-button>
    </div>
    <div class="item-img">
      <img :src="'.' + cartItem.image.image" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ cartItem.title }}</div>
      <div class="item-desc">{{ cartItem.desc }}</div>
      <!-- <p>item-id: {{ item.id }}</p> -->
      <div class="info-bottom">
        <div class="item-price left">单价￥{{ cartItem.price }}</div>
        <div class="item-count right">
          数量
          <span class="operate" @click="decrease">-</span>
          {{ cartItem.count }}
          <span class="operate" @click="increase">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import CheckButton from 'components/content/checkbutton/CheckButton.vue'

export default {
  name: 'CartListItem',
  props: ['cartItem'],
  components: {
    CheckButton
  },
  methods: {
    ...mapMutations(['increase_num', 'decrease_num']),
    checkClick() {
      // this.cartItem.checked = !this.cartItem.checked
      this.$store.commit('check_item', { id: this.cartItem.id })
    },
    decrease() {
      this.cartItem.count <= 1
        ? ''
        : this.decrease_num({ id: this.cartItem.id })
    },
    increase() {
      this.increase_num({ id: this.cartItem.id })
    }
  }
}
</script>

<style scoped>
.cart-list-item {
  display: flex;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  flex: 1;
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.info-bottom .item-price {
  color: orangered;
}
.operate {
  padding: 5px;
  margin: 5px;
  background-color: #f0f0f0;
}
</style>
