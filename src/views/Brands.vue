<template>
  <div class="brands">
    <BackButton />
    <div class="container">
      <h1>Brands</h1>
      <p>Explore all brands</p>
    </div>
  </div>
</template>

<script>
import BackButton from '../components/layout/BackButton.vue'

export default {
  name: 'Brands',
  components: {
    BackButton
  }
}
</script>

<style scoped>
.brands {
  padding: var(--space-xl) 0;
}
</style>
