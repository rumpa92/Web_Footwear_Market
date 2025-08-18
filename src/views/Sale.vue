<template>
  <div class="sale">
    <BackButton />
    <div class="container">
      <h1>Sale Items</h1>
      <p>Special offers and discounted products</p>
    </div>
  </div>
</template>

<script>
import BackButton from '../components/layout/BackButton.vue'

export default {
  name: 'Sale',
  components: {
    BackButton
  }
}
</script>

<style scoped>
.sale {
  padding: var(--space-xl) 0;
}
</style>
