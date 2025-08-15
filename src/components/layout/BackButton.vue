<template>
  <div class="back-button-container" v-if="shouldShowBackButton">
    <button @click="goBack" class="back-button">
      <svg class="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Back</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BackButton',
  computed: {
    shouldShowBackButton() {
      // Show back button on all pages except home page
      return this.$route.path !== '/'
    }
  },
  methods: {
    goBack() {
      // Check if there's browser history to go back to
      if (window.history.length > 1) {
        this.$router.go(-1)
      } else {
        // If no history, go to home page
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.back-button-container {
  padding: 1rem 2rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #475569;
  transform: translateX(-2px);
}

.back-icon {
  width: 16px;
  height: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .back-button-container {
    padding: 0.75rem 1rem;
  }
  
  .back-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
  
  .back-icon {
    width: 14px;
    height: 14px;
  }
}
</style>
