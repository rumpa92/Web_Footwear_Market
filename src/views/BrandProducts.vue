<template>
  <div class="brand-products">
    <div class="container">
      <h1>{{ brand }} Products</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandProducts',
  props: ['brand']
}
</script>

<style scoped>
.brand-products {
  padding: var(--space-xl) 0;
}
</style>
