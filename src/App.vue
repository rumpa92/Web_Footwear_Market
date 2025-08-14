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
    </div>
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import ShoppingCart from './components/cart/ShoppingCart.vue'
import SplashScreen from './components/SplashScreen.vue'

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
    // Also hide splash screen after maximum time as fallback
    setTimeout(() => {
      this.showSplash = false
    }, 5000)
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
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 0;
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
