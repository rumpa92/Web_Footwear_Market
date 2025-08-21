<template>
  <div class="products-page">
    <!-- Category Banner -->
    <div v-if="currentCategory" class="category-banner" :style="{ backgroundImage: `url(${categoryBanner})` }">
      <div class="banner-overlay">
        <div class="container">
          <div class="banner-content">
            <h1 class="banner-title">{{ categoryTitle }}</h1>
            <p class="banner-subtitle">{{ categoryDescription }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- Breadcrumb Navigation Hidden -->
      <div class="breadcrumb-nav" style="display: none;">
        <router-link to="/" class="breadcrumb-link">
          <svg class="breadcrumb-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Home
        </router-link>
        <span v-if="showSubcategory" class="breadcrumb-separator">></span>
        <span v-if="showSubcategory" class="breadcrumb-current">{{ showSubcategory }}</span>
      </div>

      <!-- Default Page Header (shown when no category) -->
      <div v-if="!currentCategory" class="page-header">
        <h1 class="page-title">{{ pageTitle }}</h1>
        <p class="page-subtitle">{{ pageSubtitle }}</p>
      </div>

      <!-- Subcategories Section -->
      <div v-if="currentCategory && subcategories.length > 0 && !showSubcategory" class="subcategories-section">
        <h2 class="subcategories-title">Shop by Sub Category</h2>
        <div class="subcategories-slider">
          <router-link
            v-for="subcategory in subcategories"
            :key="subcategory.name"
            :to="subcategory.link"
            class="subcategory-item"
          >
            <div class="subcategory-image">
              <img :src="subcategory.image" :alt="subcategory.name" />
            </div>
            <div class="subcategory-info">
              <h3 class="subcategory-name">{{ subcategory.name }}</h3>
              <p class="subcategory-count">{{ subcategory.count }} items</p>
            </div>
          </router-link>
        </div>
      </div>

      <div v-if="!currentCategory || showSubcategory" class="products-content no-filters">
        <!-- Main Content -->
        <main class="products-main">
          <!-- Toolbar -->
          <div class="products-toolbar">
            <div class="results-info">
              <span class="results-count">{{ filteredProducts.length }} products found</span>
            </div>
            
            <div class="toolbar-actions">
              <!-- Sort -->
              <div class="sort-dropdown">
                <select v-model="sortBy" @change="updateSort" class="sort-select">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              <!-- View Toggle -->
              <div class="view-toggle">
                <button 
                  @click="viewMode = 'grid'" 
                  class="view-btn" 
                  :class="{ active: viewMode === 'grid' }"
                >
                  <svg class="view-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                </button>
                <button 
                  @click="viewMode = 'list'" 
                  class="view-btn" 
                  :class="{ active: viewMode === 'list' }"
                >
                  <svg class="view-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="products-container" :class="{ 'list-view': viewMode === 'list' }">
            <div v-if="filteredProducts.length === 0" class="no-products">
              <div class="no-products-content">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search criteria</p>
                <button @click="clearAllFilters" class="btn btn-primary">Clear Filters</button>
              </div>
            </div>
            
            <div v-else class="products-grid" :class="{ 'grid-view': viewMode === 'grid', 'list-view': viewMode === 'list' }">
              <ProductCard 
                v-for="product in filteredProducts" 
                :key="product.id" 
                :product="product"
                :class="{ 'list-item': viewMode === 'list' }"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProductCard from '../components/products/ProductCard.vue'
import ProductFilters from '../components/products/ProductFilters.vue'

export default {
  name: 'Products',
  components: {
    ProductCard,
    ProductFilters
  },
  data() {
    return {
      sortBy: 'featured',
      viewMode: 'grid'
    }
  },
  computed: {
    ...mapGetters('products', ['filteredProducts', 'allProducts']),
    currentCategory() {
      return this.$route.query.category
    },
    pageTitle() {
      if (this.$route.query.search) {
        return `Search Results for "${this.$route.query.search}"`
      }
      return 'All Products'
    },
    pageSubtitle() {
      if (this.$route.query.search) {
        return `Found ${this.filteredProducts.length} products matching your search`
      }
      return 'Discover our complete collection of premium footwear'
    },
    categoryTitle() {
      const categoryMap = {
        'men': "Men's Footwear",
        'women': "Women's Footwear",
        'kids': "Kids' Footwear",
        'running': 'Running Shoes',
        'lifestyle': 'Lifestyle Sneakers',
        'premium': 'Premium Collection',
        'casual': 'Casual Shoes',
        'basketball': 'Basketball Shoes',
        'training': 'Training Shoes'
      }
      return categoryMap[this.currentCategory] || this.currentCategory
    },
    categoryDescription() {
      const descriptionMap = {
        'men': 'Discover our complete range of footwear designed for the modern man',
        'women': 'Explore stylish and comfortable shoes crafted for every woman',
        'kids': 'Fun, colorful, and comfortable shoes for active kids',
        'running': 'High-performance running shoes for every distance and terrain',
        'lifestyle': 'Comfortable everyday sneakers that match your style',
        'premium': 'Luxury footwear collection featuring the finest materials',
        'casual': 'Relaxed and versatile shoes for everyday comfort',
        'basketball': 'Performance basketball shoes for court domination',
        'training': 'Versatile training shoes for all your workout needs'
      }
      return descriptionMap[this.currentCategory] || 'Explore our collection'
    },
    categoryBanner() {
      const bannerMap = {
        'men': 'https://cdn.builder.io/api/v1/image/assets%2F797156030b234cce89ce7e033f2e19b8%2F2726d4df49e449ab977fa2433a80964b?format=webp&width=800',
        'women': 'https://cdn.builder.io/api/v1/image/assets%2F797156030b234cce89ce7e033f2e19b8%2F2ec367f2b9a44441864b7c65b7c02b28?format=webp&width=800',
        'kids': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=400&fit=crop&q=90',
        'running': 'https://images.unsplash.com/photo-1608667508764-33cf0726aae8?w=1200&h=400&fit=crop&q=90',
        'lifestyle': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&h=400&fit=crop&q=90',
        'premium': 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1200&h=400&fit=crop&q=90',
        'casual': 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200&h=400&fit=crop&q=90',
        'basketball': 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=1200&h=400&fit=crop&q=90',
        'training': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&h=400&fit=crop&q=90'
      }
      return bannerMap[this.currentCategory] || ''
    },
    showSubcategory() {
      return this.$route.query.type
    },
    showFilters() {
      return false
    },
    subcategories() {
      const subcategoryMap = {
        'men': [
          { name: 'Sneakers', image: 'https://cdn.builder.io/api/v1/image/assets%2F797156030b234cce89ce7e033f2e19b8%2F2b7df37afbf648ada445ef36d30ccb53?format=webp&width=200', link: '/products?category=men&type=sneakers', count: this.getProductCount('men', 'sneakers') },
          { name: 'Formal', image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop&q=90', link: '/products?category=men&type=formal', count: this.getProductCount('men', 'formal') },
          { name: 'Boots', image: 'https://images.unsplash.com/photo-1608667508764-33cf0726aae8?w=200&h=200&fit=crop&q=90', link: '/products?category=men&type=boots', count: this.getProductCount('men', 'boots') },
          { name: 'Sandals', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop&q=90', link: '/products?category=men&type=sandals', count: this.getProductCount('men', 'sandals') }
        ],
        'women': [
          { name: 'Heels', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200&h=200&fit=crop&q=90', link: '/products?category=women&type=heels', count: this.getProductCount('women', 'heels') },
          { name: 'Flats', image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop&q=90', link: '/products?category=women&type=flats', count: this.getProductCount('women', 'flats') },
          { name: 'Sneakers', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop&q=90', link: '/products?category=women&type=sneakers', count: this.getProductCount('women', 'sneakers') },
          { name: 'Boots', image: 'https://images.unsplash.com/photo-1608667508764-33cf0726aae8?w=200&h=200&fit=crop&q=90', link: '/products?category=women&type=boots', count: this.getProductCount('women', 'boots') }
        ],
        'kids': [
          { name: 'School Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop&q=90', link: '/products?category=kids&type=school', count: this.getProductCount('kids', 'school') },
          { name: 'Sports', image: 'https://images.unsplash.com/photo-1608667508764-33cf0726aae8?w=200&h=200&fit=crop&q=90', link: '/products?category=kids&type=sports', count: this.getProductCount('kids', 'sports') },
          { name: 'Casual', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=200&h=200&fit=crop&q=90', link: '/products?category=kids&type=casual', count: this.getProductCount('kids', 'casual') },
          { name: 'Sandals', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop&q=90', link: '/products?category=kids&type=sandals', count: this.getProductCount('kids', 'sandals') }
        ]
      }
      return subcategoryMap[this.currentCategory] || []
    }
  },
  methods: {
    ...mapActions('products', ['setFilter', 'clearFilters', 'setSortBy']),
    updateSort() {
      this.setSortBy(this.sortBy)
    },
    clearAllFilters() {
      this.clearFilters()
      this.$router.push('/products')
    },
    getProductCount(category, type) {
      // For demo purposes, return random counts
      // In real app, you'd filter products by category and type
      return Math.floor(Math.random() * 50) + 10
    }
  },
  watch: {
    '$route'() {
      // Apply category filter when route changes
      if (this.$route.query.category) {
        this.setFilter({ type: 'category', value: this.$route.query.category })
      } else {
        this.clearFilters()
      }
    }
  },
  mounted() {
    // Apply initial filters from URL
    if (this.$route.query.category) {
      this.setFilter({ type: 'category', value: this.$route.query.category })
    }
    if (this.$route.query.search) {
      this.setFilter({ type: 'search', value: this.$route.query.search })
    }
  },
}
</script>

<style scoped>
.products-page {
  padding: 0;
}

/* Category Banner */
.category-banner {
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: var(--space-2xl);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4));
  display: flex;
  align-items: center;
}

.banner-content {
  color: var(--text-white);
  text-align: center;
  width: 100%;
}

.banner-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-md);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.banner-subtitle {
  font-size: var(--font-size-xl);
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* Breadcrumb Navigation */
.breadcrumb-nav {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-lg);
  padding: var(--space-md) 0;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: var(--transition-fast);
}

.breadcrumb-link:hover {
  color: var(--accent-color);
}

.breadcrumb-arrow {
  width: 1rem;
  height: 1rem;
}

.breadcrumb-separator {
  margin: 0 var(--space-sm);
  color: var(--text-secondary);
}

.breadcrumb-current {
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
}

/* Subcategories Section */
.subcategories-section {
  margin-bottom: var(--space-2xl);
  padding: 0 var(--space-md);
}

.subcategories-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  text-align: left;
  margin-bottom: var(--space-lg);
}

.subcategories-slider {
  display: flex;
  gap: var(--space-lg);
  overflow-x: auto;
  padding: var(--space-sm) 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.subcategories-slider::-webkit-scrollbar {
  display: none;
}

.subcategory-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--space-lg);
  transition: var(--transition-normal);
  box-shadow: var(--shadow-sm);
  min-width: 180px;
  flex-shrink: 0;
}

.subcategory-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.subcategory-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: var(--space-md);
  box-shadow: var(--shadow-md);
}

.subcategory-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-normal);
}

.subcategory-item:hover .subcategory-image img {
  transform: scale(1.05);
}

.subcategory-info {
  text-align: center;
}

.subcategory-name {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
}

.subcategory-count {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* Main content with padding when there's a category */
.products-page .container {
  padding-top: var(--space-xl);
  padding-bottom: var(--space-xl);
}

.page-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.page-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.page-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
}

.products-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-2xl);
}

.products-content.no-filters {
  grid-template-columns: 1fr;
}



.products-main {
  min-height: 400px;
}

.products-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--border-color);
}

.results-count {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.sort-select {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.view-toggle {
  display: flex;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

.view-btn {
  padding: var(--space-sm);
  background-color: var(--bg-primary);
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition-fast);
}

.view-btn:hover {
  background-color: var(--bg-light);
}

.view-btn.active {
  background-color: var(--accent-color);
  color: var(--text-white);
}

.view-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.no-products {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.no-products-content {
  text-align: center;
}

.no-products-content h3 {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.no-products-content p {
  color: var(--text-secondary);
  margin-bottom: var(--space-lg);
}

.products-grid.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-xl);
}

.products-grid.list-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.products-grid.list-view .product-card {
  display: flex;
  height: 200px;
}

@media (max-width: 1024px) {
  .products-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .products-toolbar {
    flex-direction: column;
    gap: var(--space-md);
    align-items: stretch;
  }
  
  .toolbar-actions {
    justify-content: space-between;
  }
  
  .products-grid.grid-view {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--space-md);
  }
}
</style>
