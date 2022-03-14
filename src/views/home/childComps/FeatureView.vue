<template>
  <div class="feature">
    <a href="#"> <img :src="img" alt="" @load="imgLoad" /></a>
  </div>
</template>

<script>
export default {
  name: 'FeatureView',
  props: {
    img: {
      type: String,
      default: ''
    }
  },
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
</script>

<style scoped>
.feature img {
  width: 100%;
}
</style>
