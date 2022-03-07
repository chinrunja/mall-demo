<template>
  <div class="detail">
    <div>详情页</div>
    <p>{{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  created() {
    console.log(this.$route)
  }
}
</script>

<style></style>
