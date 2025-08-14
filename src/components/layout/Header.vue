<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <router-link to="/" class="logo">
          <span class="logo-text">👟 FootMarket</span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="nav-desktop">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/products" class="nav-link">Products</router-link>
          <router-link to="/brands" class="nav-link">Brands</router-link>
          <router-link to="/sale" class="nav-link">Sale</router-link>
        </nav>

        <!-- Search Bar -->
        <div class="search-bar">
          <div class="search-input">
            <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              placeholder="Search shoes..."
              class="form-input"
              v-model="searchQuery"
              @input="handleSearch"
            />
          </div>
        </div>

        <!-- User Actions -->
        <div class="user-actions">
          <!-- Wishlist -->
          <button class="action-btn" @click="goToWishlist">
            <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            <span class="action-count" v-if="wishlistCount">{{ wishlistCount }}</span>
          </button>

          <!-- Cart -->
          <button class="action-btn" @click="toggleCart">
            <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5-5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
            </svg>
            <span class="action-count" v-if="cartItemCount">{{ cartItemCount }}</span>
          </button>

          <!-- User Menu -->
          <div class="user-menu" v-if="isAuthenticated">
            <img :src="currentUser.avatar" :alt="currentUser.name" class="user-avatar" />
            <div class="dropdown">
              <div class="dropdown-menu" v-if="showUserMenu">
                <router-link to="/profile" class="dropdown-item">Profile</router-link>
                <router-link to="/orders" class="dropdown-item">Orders</router-link>
                <button @click="logout" class="dropdown-item">Logout</button>
              </div>
            </div>
          </div>
          <router-link v-else to="/login" class="btn btn-primary">Sign In</router-link>

          <!-- Mobile Menu Toggle -->
          <button class="mobile-menu-btn" @click="toggleMobileMenu">
            <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <nav class="nav-mobile" v-if="showMobileMenu">
        <router-link to="/" class="nav-link-mobile">Home</router-link>
        <router-link to="/products" class="nav-link-mobile">Products</router-link>
        <router-link to="/brands" class="nav-link-mobile">Brands</router-link>
        <router-link to="/sale" class="nav-link-mobile">Sale</router-link>
        <router-link v-if="!isAuthenticated" to="/login" class="nav-link-mobile">Sign In</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      searchQuery: '',
      showUserMenu: false,
      showMobileMenu: false
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'currentUser', 'wishlist']),
    ...mapGetters('cart', ['cartItemCount']),
    wishlistCount() {
      return this.wishlist.length
    }
  },
  methods: {
    ...mapActions('cart', ['toggleCart']),
    ...mapActions('user', ['logout']),
    handleSearch() {
      // Implement search functionality
      console.log('Searching for:', this.searchQuery)
    },
    goToWishlist() {
      this.$router.push('/wishlist')
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    }
  }
}
</script>

<style scoped>
.header {
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  box-shadow: var(--shadow-sm);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) 0;
  gap: var(--space-md);
}

.logo {
  flex-shrink: 0;
}

.logo-text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
}

.nav-desktop {
  display: none;
  align-items: center;
  gap: var(--space-lg);
}

.nav-link {
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-fast);
  position: relative;
}

.nav-link:hover {
  color: var(--accent-color);
}

.nav-link.router-link-active {
  color: var(--accent-color);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--accent-color);
}

.search-bar {
  flex: 1;
  max-width: 400px;
  margin: 0 var(--space-md);
}

.user-actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.action-btn {
  position: relative;
  padding: var(--space-sm);
  background: none;
  border: none;
  color: var(--text-secondary);
  transition: var(--transition-fast);
  border-radius: var(--border-radius-md);
}

.action-btn:hover {
  color: var(--text-primary);
  background-color: var(--bg-light);
}

.action-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.action-count {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--secondary-color);
  color: white;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  padding: 2px 6px;
  border-radius: var(--border-radius-full);
  min-width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-menu {
  position: relative;
}

.user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: var(--border-radius-full);
  cursor: pointer;
}

.mobile-menu-btn {
  display: flex;
  background: none;
  border: none;
  color: var(--text-primary);
  padding: var(--space-sm);
}

.menu-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.nav-mobile {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: var(--space-md) 0;
  border-top: 1px solid var(--border-color);
  margin-top: var(--space-md);
}

.nav-link-mobile {
  padding: var(--space-sm) 0;
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-fast);
}

.nav-link-mobile:hover {
  color: var(--accent-color);
}

@media (min-width: 768px) {
  .nav-desktop {
    display: flex;
  }
  
  .mobile-menu-btn {
    display: none;
  }
  
  .nav-mobile {
    display: none;
  }
}

@media (max-width: 767px) {
  .search-bar {
    display: none;
  }
}
</style>
