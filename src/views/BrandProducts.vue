<template>
  <div class="brand-products">
    <BackButton />
    <div class="container">
      <h1>{{ brand }} Products</h1>
    </div>
  </div>
</template>

<script>
import BackButton from '../components/layout/BackButton.vue'

export default {
  name: 'BrandProducts',
  components: {
    BackButton
  },
  props: ['brand']
}
</script>

<style scoped>
.brand-products {
  padding: var(--space-xl) 0;
}
</style>
