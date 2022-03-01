<template>
  <div class="tab-bar-item" @click="handleClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="isActive ? { color: activeColor } : {}">
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
      default: 'red'
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
    }
  }
}
</script>
