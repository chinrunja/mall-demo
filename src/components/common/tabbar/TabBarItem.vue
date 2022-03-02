<template>
  <div class="tab-bar-item" @click="handleClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    activeColor: {
      type: String,
      default: '#ff5777'
    },
    addr: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick() {
      if (this.$route.path === this.addr) {
        return
      }
      this.$router.push(this.addr)
    }
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.addr)
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  margin-top: 3px;
  /* height: 40px; */
  height: 49px;
  flex: 1;
  text-align: center;
  font-size: 13px;
  vertical-align: middle;
  /* margin-left: 60px; */
  /* margin-right: 60px; */
  padding: 5px;
}
/* .tab-bar-item:hover {
  cursor: pointer;
  background-color: #ff8198;
} */
.tab-bar-item img {
  width: 24px;
}
</style>
