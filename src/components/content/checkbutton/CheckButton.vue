<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.check-button {
  border: 1px solid #aaa;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.check {
  background-color: var(--color-high-text);
  border-color: var(--color-high-text);
}
</style>
