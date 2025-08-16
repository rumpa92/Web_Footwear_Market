<template>
  <div class="back-button-container" v-if="shouldShowBackButton">
    <button @click="goBack" class="back-button">
      <svg class="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>{{ backButtonText }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BackButton',
  computed: {
    shouldShowBackButton() {
      // Hide back button on home page, sign in, and sign up pages
      const excludedRoutes = ['/', '/login', '/register']
      return !excludedRoutes.includes(this.$route.path)
    },
    backButtonText() {
      // Map route paths to readable page names
      const pageNames = {
        '/products': 'Back to Products',
        '/brands': 'Back to Brands',
        '/sale': 'Back to Sale',
        '/cart': 'Back to Cart',
        '/wishlist': 'Back to Wishlist',
        '/profile': 'Back to Profile',
        '/orders': 'Back to Orders',
        '/checkout': 'Back to Checkout',
        '/ticket': 'Back to Support',
        '/upi-payment': 'Back to Payment',
        '/wallet-payment': 'Back to Payment',
        '/netbanking-payment': 'Back to Payment',
        '/order-confirmation': 'Back to Orders'
      }

      // Handle 404 Not Found page
      if (this.$route.name === 'NotFound') {
        return 'Back to Home'
      }

      // Handle dynamic routes (like /product/:id, /brands/:brand)
      if (this.$route.path.startsWith('/product/')) {
        return 'Back to Products'
      }
      if (this.$route.path.startsWith('/brands/')) {
        return 'Back to Brands'
      }

      // Return mapped page name or default "Back"
      return pageNames[this.$route.path] || 'Back'
    }
  },
  methods: {
    goBack() {
      // Check if there's browser history to go back to
      if (window.history.length > 1) {
        this.$router.go(-1)
      } else {
        // If no history, go to appropriate parent page based on current route
        if (this.$route.path.startsWith('/product/')) {
          this.$router.push('/products')
        } else if (this.$route.path.startsWith('/brands/')) {
          this.$router.push('/brands')
        } else {
          // Default fallback to home page
          this.$router.push('/')
        }
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
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.back-button:hover {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-color: #cbd5e1;
  color: #475569;
  transform: translateX(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.back-button:active {
  transform: translateX(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.back-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.back-button:hover .back-icon {
  transform: translateX(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .back-button-container {
    padding: 0.75rem 1rem;
  }
  
  .back-button {
    padding: 0.625rem 1rem;
    font-size: 0.85rem;
  }
  
  .back-icon {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .back-button-container {
    padding: 0.5rem 0.75rem;
  }
  
  .back-button {
    padding: 0.5rem 0.875rem;
    font-size: 0.8rem;
  }
  
  .back-icon {
    width: 14px;
    height: 14px;
  }
}
</style>
