<template>
  <div class="category-content">
    <grid-view
      :cols="3"
      :lineSpace="15"
      :v-margin="20"
      v-if="subcategories.list"
    >
      <div
        class="item"
        v-for="(item, index) in subcategories.list"
        :key="index"
      >
        <a :href="item.link">
          <img :src="item.image" class="item-img" @load="gridViewLoad" /><br />
        </a>
        <span class="item-text">{{ item.title }}</span>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from 'components/common/gridview/GridView.vue'

export default {
  name: 'CategoryContent',
  components: {
    GridView
  },
  props: {
    subcategories: {
      type: Object,
      default() {
        return []
      }
    }
  },
  methods: {
    gridViewLoad() {
      this.$bus.$emit('gridViewImgLoad')
    }
  }
}
</script>

<style scoped>
.panel img {
  width: 100%;
}
.item {
  text-align: center;
  font-size: 12px;
}
.item-img {
  width: 80%;
}
.item-text {
  display: inline;
  margin-top: 15px;
}
</style>
