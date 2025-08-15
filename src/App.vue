<template>
  <div id="app">
    <!-- Splash Screen -->
    <SplashScreen
      v-if="showSplash"
      @splash-complete="handleSplashComplete"
    />

    <!-- Main App Content -->
    <div v-else class="app-content">
      <Header />
      <main class="main-content">
        <router-view />
      </main>
      <Footer />
      <ShoppingCart />
      <AddedToCartModal />
    </div>
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import ShoppingCart from './components/cart/ShoppingCart.vue'
import SplashScreen from './components/SplashScreen.vue'
import AddedToCartModal from './components/AddedToCartModal.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    ShoppingCart,
    SplashScreen
  },
  data() {
    return {
      showSplash: true
    }
  },
  methods: {
    handleSplashComplete() {
      this.showSplash = false
    }
  },
  mounted() {
    console.log('App mounted, splash screen will hide in 2 seconds')
    // Also hide splash screen after maximum time as fallback
    setTimeout(() => {
      console.log('Hiding splash screen from App.vue fallback')
      this.showSplash = false
    }, 2000) // Reduced from 5000 to 2000
  }
}
</script>

<style>
@import './assets/styles/variables.css';
@import './assets/styles/utilities.css';
@import './assets/styles/components.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family-primary);
  line-height: var(--line-height-normal);
  color: var(--text-primary);
  background-color: var(--bg-secondary);
}

#app {
  min-height: 100vh;
  position: relative;
}

.app-content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  animation: fadeInApp 0.8s ease-out;
}

.main-content {
  flex: 1;
  padding: 0;
}

@keyframes fadeInApp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  border: none;
  cursor: pointer;
  font-family: inherit;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
