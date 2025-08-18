<template>
  <div class="products-page">
    <BackButton />
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">{{ pageTitle }}</h1>
        <p class="page-subtitle">{{ pageSubtitle }}</p>
      </div>

      <div class="products-content">
        <!-- Filters Sidebar -->
        <ProductFilters />

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
import BackButton from '../components/layout/BackButton.vue'

export default {
  name: 'Products',
  components: {
    ProductCard,
    ProductFilters,
    BackButton
  },
  data() {
    return {
      sortBy: 'featured',
      viewMode: 'grid'
    }
  },
  computed: {
    ...mapGetters('products', ['filteredProducts']),
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
    }
  },
  methods: {
    ...mapActions('products', ['setFilter', 'clearFilters', 'setSortBy']),
    updateSort() {
      this.setSortBy(this.sortBy)
    },
  },
}
</script>

<style scoped>
.products-page {
  padding: var(--space-xl) 0;
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
