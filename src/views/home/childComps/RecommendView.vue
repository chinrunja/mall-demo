<template>
  <div class="recommend">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      class="recommend-item"
    >
      <a :href="item.link">
        <img :src="item.image" :alt="index" @load="imgLoad" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
import { imgLoadMixin } from 'common/mixin.js'

export default {
  name: 'RecommendView',
  mixins: [imgLoadMixin],
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 15px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  margin-bottom: 10px;
}
</style>
