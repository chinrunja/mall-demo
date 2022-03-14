<template>
  <nav-bar class="detail-nav-bar">
    <div slot="left" @click="backHome">
      <img src="~assets/img/common/back.svg" alt="" class="back" />
    </div>
    <div slot="center" class="title">
      <div
        v-for="(item, i) in titles"
        :key="i"
        class="title-item"
        :class="{ active: i === currentIndex }"
        @click="titleClick(i)"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  props: {
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      titles: ['商品', '参数', '评价', '相似']
      // currentIndex: 0
    }
  },
  methods: {
    titleClick(i) {
      // this.currentIndex = i
      this.$emit('titleClick', i)
    },
    backHome() {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-tint);
  /* padding-bottom: 3px solid var(--color-tint); */
}
.back {
  margin-top: 10px;
}
</style>
