<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <router-link to="/" class="logo">
          <span class="logo-text">👟 FootMarket</span>
        </router-link>

        <!-- Location -->
        <button class="location-display" @click="openLocationModal">
          <svg class="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="location-text">{{ currentLocationText }}</span>
        </button>

        <!-- Desktop Navigation -->
        <nav class="nav-desktop">
        </nav>

        <!-- Search Bar -->
        <div class="search-bar" v-click-outside="closeSuggestions">
          <div class="search-input">
            <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              placeholder="Search by brand, category, size, color..."
              class="form-input"
              v-model="searchQuery"
              @input="handleSearch"
              @focus="showSuggestions = true"
              @keydown.enter="performSearch"
              @keydown.down="navigateSuggestions(1)"
              @keydown.up="navigateSuggestions(-1)"
              @keydown.esc="closeSuggestions"
            />
            <button v-if="searchQuery" @click="clearSearch" class="clear-search-btn">
              <svg class="clear-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Search Suggestions Dropdown -->
          <div v-if="showSuggestions && suggestions.length > 0" class="suggestions-dropdown">
            <div class="suggestions-header">
              <span class="suggestions-title">Suggestions</span>
            </div>
            <ul class="suggestions-list">
              <li
                v-for="(suggestion, index) in suggestions"
                :key="index"
                @click="selectSuggestion(suggestion)"
                class="suggestion-item"
                :class="{ 'highlighted': index === highlightedIndex }"
              >
                <svg class="suggestion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span class="suggestion-text">{{ suggestion }}</span>
              </li>
            </ul>
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
          <div class="user-menu" v-if="isAuthenticated" @click="showUserMenu = !showUserMenu" v-click-outside="closeDropdown">
            <div class="user-profile-info">
              <img :src="currentUser.avatar" :alt="currentUser.name" class="user-avatar" />
              <div class="user-details">
                <div class="user-name">{{ currentUser.name }}</div>
                <div class="user-status">Orders</div>
              </div>
              <svg class="dropdown-arrow" :class="{ 'rotated': showUserMenu }" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9l6 6 6-6"/>
              </svg>
            </div>
            <div class="dropdown">
              <div class="dropdown-menu" v-if="showUserMenu">
                <router-link to="/profile" class="dropdown-item" @click="closeDropdown">My Profile</router-link>
                <router-link to="/orders" class="dropdown-item" @click="closeDropdown">My Orders</router-link>
                <router-link to="/login" class="dropdown-item" @click="closeDropdown">Sign In</router-link>
                <button @click="handleLogout" class="dropdown-item">Sign Out</button>
              </div>
            </div>
          </div>

          <!-- User Profile Section for non-authenticated users -->
          <div v-else class="user-profile-section">
            <button class="action-btn profile-btn" @click="goToProfile">
              <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </button>
            <router-link to="/login" class="btn btn-primary">Sign In</router-link>
          </div>

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

    <!-- Location Modal -->
    <LocationModal
      :showModal="showLocationModal"
      @close="closeLocationModal"
      @location-set="handleLocationSet"
    />
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LocationModal from '../LocationModal.vue'

export default {
  name: 'Header',
  components: {
    LocationModal
  },
  data() {
    return {
      searchQuery: '',
      showUserMenu: false,
      showMobileMenu: false,
      showSuggestions: false,
      suggestions: [],
      highlightedIndex: -1,
      searchTimeout: null,
      showLocationModal: false
    }
  },
  directives: {
    'click-outside': {
      bind(el, binding) {
        el._clickOutside = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value()
          }
        }
        document.addEventListener('click', el._clickOutside)
      },
      unbind(el) {
        document.removeEventListener('click', el._clickOutside)
      }
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'currentUser', 'wishlist', 'userLocation']),
    ...mapGetters('cart', ['cartItemCount']),
    ...mapGetters('products', ['searchSuggestions']),
    wishlistCount() {
      return this.wishlist.length
    },
    currentLocationText() {
      if (this.userLocation && this.userLocation.formatted) {
        return this.userLocation.formatted
      }
      return 'New York, NY'
    }
  },
  methods: {
    ...mapActions('cart', ['toggleCart']),
    ...mapActions('user', ['logout']),
    ...mapActions('products', ['generateSearchSuggestions', 'setFilter']),
    handleSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        if (this.searchQuery.length >= 2) {
          this.suggestions = this.generateSearchSuggestions(this.searchQuery)
          this.showSuggestions = true
          this.highlightedIndex = -1
        } else {
          this.suggestions = []
          this.showSuggestions = false
        }
      }, 300)
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion
      this.closeSuggestions()
      this.performSearch()
    },
    performSearch() {
      if (this.searchQuery.trim()) {
        this.setFilter({ type: 'search', value: this.searchQuery.trim() })
        this.$router.push({ name: 'Products', query: { search: this.searchQuery.trim() } })
        this.closeSuggestions()
      }
    },
    clearSearch() {
      this.searchQuery = ''
      this.suggestions = []
      this.showSuggestions = false
      this.setFilter({ type: 'search', value: '' })
    },
    closeSuggestions() {
      this.showSuggestions = false
      this.highlightedIndex = -1
    },
    navigateSuggestions(direction) {
      if (!this.showSuggestions || this.suggestions.length === 0) return

      this.highlightedIndex += direction

      if (this.highlightedIndex >= this.suggestions.length) {
        this.highlightedIndex = 0
      } else if (this.highlightedIndex < 0) {
        this.highlightedIndex = this.suggestions.length - 1
      }

      if (this.highlightedIndex >= 0) {
        this.searchQuery = this.suggestions[this.highlightedIndex]
      }
    },
    goToWishlist() {
      this.$router.push('/wishlist')
    },
    goToProfile() {
      this.$router.push('/login')
    },
    closeDropdown() {
      this.showUserMenu = false
    },
    handleLogout() {
      this.logout()
      this.showUserMenu = false
      this.$router.push('/')
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
    openLocationModal() {
      this.showLocationModal = true
    },
    closeLocationModal() {
      this.showLocationModal = false
    },
    handleLocationSet(locationData) {
      console.log('Location set:', locationData)
      this.showLocationModal = false
    }
  },
  mounted() {
    // Initialize search from query params
    if (this.$route.query.search) {
      this.searchQuery = this.$route.query.search
      this.setFilter({ type: 'search', value: this.searchQuery })
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
  padding: var(--space-md) 0;
  gap: var(--space-lg);
  color: rgba(0, 0, 0, 1);
}

.logo {
  flex-shrink: 0;
  min-width: 140px;
}

.logo-text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
}

.location-display {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--bg-light);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: var(--transition-fast);
  min-width: 120px;
  flex-shrink: 0;
}

.location-display:hover {
  background-color: var(--bg-primary);
  border-color: var(--accent-color);
}

.location-display:hover .location-icon {
  color: var(--accent-color);
}

.location-icon {
  width: 1rem;
  height: 1rem;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.location-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
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
  position: relative;
}

.search-input {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: var(--space-sm);
  width: 1.25rem;
  height: 1.25rem;
  color: var(--text-secondary);
  z-index: 1;
}

.form-input {
  width: 100%;
  padding: var(--space-sm) var(--space-2xl) var(--space-sm) 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-light);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  transition: var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px var(--accent-color-20);
}

.clear-search-btn {
  position: absolute;
  right: var(--space-sm);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--space-xs);
  border-radius: var(--border-radius-sm);
  transition: var(--transition-fast);
}

.clear-search-btn:hover {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}

.clear-icon {
  width: 1rem;
  height: 1rem;
}

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-dropdown);
  margin-top: var(--space-xs);
  max-height: 300px;
  overflow-y: auto;
}

.suggestions-header {
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-light);
}

.suggestions-title {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.suggestions-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  cursor: pointer;
  transition: var(--transition-fast);
  border-bottom: 1px solid var(--border-light);
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover,
.suggestion-item.highlighted {
  background-color: var(--bg-light);
  color: var(--accent-color);
}

.suggestion-icon {
  width: 1rem;
  height: 1rem;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.suggestion-item:hover .suggestion-icon,
.suggestion-item.highlighted .suggestion-icon {
  color: var(--accent-color);
}

.suggestion-text {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
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
  cursor: pointer;
}

.user-profile-info {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-light);
  border: 1px solid var(--border-color);
  transition: var(--transition-fast);
}

.user-profile-info:hover {
  background-color: var(--bg-primary);
  border-color: var(--accent-color);
}

.user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: var(--border-radius-full);
  flex-shrink: 0;
}

.user-details {
  display: flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
}

.user-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-status {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  white-space: nowrap;
}

.dropdown-arrow {
  width: 1rem;
  height: 1rem;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-left: var(--space-xs);
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.user-profile-info:hover .dropdown-arrow {
  color: var(--accent-color);
}

.user-profile-section {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.profile-btn {
  background-color: var(--bg-light);
  border: 1px solid var(--border-color);
}

.profile-btn:hover {
  background-color: var(--bg-primary);
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-dropdown);
  margin-top: var(--space-xs);
  min-width: 160px;
  overflow: hidden;
}

.dropdown-item {
  display: block;
  padding: var(--space-sm) var(--space-md);
  color: var(--text-primary);
  text-decoration: none;
  transition: var(--transition-fast);
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-size: var(--font-size-sm);
}

.dropdown-item:hover {
  background-color: var(--bg-light);
  color: var(--accent-color);
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
    order: 1;
    width: 100%;
    margin: var(--space-md) 0 0 0;
    max-width: none;
  }

  .header-content {
    flex-wrap: wrap;
  }

  .user-actions {
    order: 0;
  }

  .location-display {
    display: none;
  }
}
</style>
