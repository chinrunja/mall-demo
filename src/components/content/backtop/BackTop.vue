<template>
  <div class="back-top" @click="goTop">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  methods: {
    goTop() {
      this.$emit('goTop')
    }
  }
}
</script>

<style>
.back-top {
  position: fixed;
  right: 8px;
  bottom: 55px;
}

.back-top img {
  width: 43px;
  height: 43px;
  z-index: 9;
}
</style>
