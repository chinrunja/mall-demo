<template>
  <div class="feature">
    <a href="#"> <img :src="img" alt="" /></a>
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
  }
}
</script>

<style scoped>
.feature img {
  width: 100%;
}
</style>
