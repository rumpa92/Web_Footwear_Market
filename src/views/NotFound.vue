<template>
  <div class="not-found">
    <BackButton />
    <div class="container">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <router-link to="/" class="btn btn-primary">Go Home</router-link>
    </div>
  </div>
</template>

<script>
import BackButton from '../components/layout/BackButton.vue'

export default {
  name: 'NotFound',
  components: {
    BackButton
  }
}
</script>

<style scoped>
.not-found {
  padding: var(--space-xl) 0;
  text-align: center;
}
</style>
