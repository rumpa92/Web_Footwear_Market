<template>
  <div class="product-detail">
    <div class="container">
      <h1>Product Detail</h1>
      <p>Product ID: {{ $route.params.id }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail'
}
</script>

<style scoped>
.product-detail {
  padding: var(--space-xl) 0;
}
</style>
