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
      // Hide back button on home, success, sign in, sign up, and forgot password pages
      const excludedRoutes = [
        '/',
        '/login',
        '/register',
        '/forgot-password',
        '/order-confirmation',
        '/return-confirmation',
        '/track-return-status'
      ]
      return !excludedRoutes.includes(this.$route.path)
    },
    backButtonText() {
      // Map route paths to readable page names
      const pageNames = {
        '/products': 'Products',
        '/brands': 'Brands',
        '/sale': 'Sale',
        '/cart': 'Cart',
        '/wishlist': 'Wishlist',
        '/profile': 'Profile',
        '/orders': 'Orders',
        '/checkout': 'Checkout',
        '/ticket': 'Support',
        '/upi-payment': 'UPI Payment',
        '/wallet-payment': 'Wallet Payment',
        '/netbanking-payment': 'Net Banking',
        '/privacy-policy': 'Privacy Policy'
      }

      // Handle 404 Not Found page
      if (this.$route.name === 'NotFound') {
        return 'Page Not Found'
      }

      // Handle dynamic routes (like /product/:id, /brands/:brand)
      if (this.$route.path.startsWith('/product/')) {
        return 'Product Details'
      }
      if (this.$route.path.startsWith('/brands/')) {
        return 'Brand Products'
      }

      // Return mapped page name or route name
      return pageNames[this.$route.path] || this.$route.name || 'Back'
    }
  },
  methods: {
    goBack() {
      // Smart back navigation based on current route
      const currentPath = this.$route.path

      // Define specific navigation paths for each route
      const backNavigation = {
        '/products': '/',
        '/brands': '/',
        '/sale': '/',
        '/cart': '/',
        '/wishlist': '/',
        '/profile': '/',
        '/orders': '/profile',
        '/checkout': '/cart',
        '/ticket': '/profile',
        '/upi-payment': '/checkout',
        '/wallet-payment': '/checkout',
        '/netbanking-payment': '/checkout',
        '/order-confirmation': '/'
      }

      // Handle dynamic routes
      if (currentPath.startsWith('/product/')) {
        this.$router.push('/products')
        return
      }

      if (currentPath.startsWith('/brands/')) {
        this.$router.push('/brands')
        return
      }

      // Handle 404 pages
      if (this.$route.name === 'NotFound') {
        this.$router.push('/')
        return
      }

      // Navigate to the defined back route or fallback to browser back
      const backRoute = backNavigation[currentPath]
      if (backRoute) {
        this.$router.push(backRoute)
      } else {
        // Fallback: try browser back, then home
        try {
          this.$router.go(-1)
          // Set a timeout to check if navigation happened
          setTimeout(() => {
            // If we're still on the same route after attempting to go back,
            // it means there was no history, so go to home
            if (this.$route.path === currentPath) {
              this.$router.push('/')
            }
          }, 100)
        } catch (error) {
          // If router.go fails, go to home
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
