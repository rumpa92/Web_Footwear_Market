<template>
  <div class="wishlist">
    <BackButton />
    <div class="container">
      <h1>Wishlist</h1>
      <p>Your saved items</p>
    </div>
  </div>
</template>

<script>
import BackButton from '../components/layout/BackButton.vue'

export default {
  name: 'Wishlist',
  components: {
    BackButton
  }
}
</script>

<style scoped>
.wishlist {
  padding: var(--space-xl) 0;
}
</style>
