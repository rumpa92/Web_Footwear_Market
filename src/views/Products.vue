<template>
  <div class="products-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">All Products</h1>
        <p class="page-subtitle">Discover our complete collection of premium footwear</p>
      </div>

      <div class="products-content">
        <!-- Filters Sidebar -->
        <aside class="filters-sidebar">
          <div class="filters-header">
            <h3 class="filters-title">Filters</h3>
            <button @click="clearAllFilters" class="clear-filters-btn">Clear All</button>
          </div>

          <!-- Gender & Age Filter -->
          <div class="filter-group">
            <h4 class="filter-title">Gender & Age</h4>
            <div class="gender-toggle-buttons">
              <button
                v-for="gender in genders"
                :key="gender"
                @click="selectGender(gender)"
                class="gender-toggle-btn"
                :class="{ 'active': selectedGender === gender }"
              >
                {{ formatGender(gender) }}
              </button>
            </div>
          </div>

          <!-- Category Filter -->
          <div class="filter-group">
            <h4 class="filter-title">Category</h4>
            <div class="filter-options">
              <label v-for="category in categories" :key="category" class="filter-option">
                <input
                  type="radio"
                  :value="category"
                  v-model="selectedCategory"
                  @change="updateFilters"
                  class="filter-input"
                />
                <span class="filter-label">{{ formatCategory(category) }}</span>
              </label>
            </div>
          </div>

          <!-- Brand Filter -->
          <div class="filter-group">
            <h4 class="filter-title">Brand</h4>
            <div class="filter-options">
              <label v-for="brand in brands" :key="brand" class="filter-option">
                <input 
                  type="radio" 
                  :value="brand" 
                  v-model="selectedBrand"
                  @change="updateFilters"
                  class="filter-input"
                />
                <span class="filter-label">{{ brand }}</span>
              </label>
            </div>
          </div>

          <!-- Price Range Filter -->
          <div class="filter-group">
            <h4 class="filter-title">Price Range</h4>
            <div class="price-range">
              <input 
                type="range" 
                min="0" 
                max="500" 
                v-model="priceRange[0]"
                @input="updateFilters"
                class="price-slider"
              />
              <input 
                type="range" 
                min="0" 
                max="500" 
                v-model="priceRange[1]"
                @input="updateFilters"
                class="price-slider"
              />
              <div class="price-display">
                ${{ priceRange[0] }} - ${{ priceRange[1] }}
              </div>
            </div>
          </div>

          <!-- In Stock Filter -->
          <div class="filter-group">
            <label class="filter-option checkbox-option">
              <input 
                type="checkbox" 
                v-model="inStockOnly"
                @change="updateFilters"
                class="filter-checkbox"
              />
              <span class="filter-label">In Stock Only</span>
            </label>
          </div>
        </aside>

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

export default {
  name: 'Products',
  components: {
    ProductCard
  },
  data() {
    return {
      selectedCategory: '',
      selectedBrand: '',
      selectedGender: '',
      priceRange: [0, 500],
      inStockOnly: false,
      sortBy: 'featured',
      viewMode: 'grid'
    }
  },
  computed: {
    ...mapGetters('products', ['filteredProducts', 'categories', 'brands', 'genders'])
  },
  methods: {
    ...mapActions('products', ['setFilter', 'clearFilters', 'setSortBy']),
    updateFilters() {
      this.setFilter({ type: 'category', value: this.selectedCategory })
      this.setFilter({ type: 'brand', value: this.selectedBrand })
      this.setFilter({ type: 'gender', value: this.selectedGender })
      this.setFilter({ type: 'priceRange', value: this.priceRange })
      this.setFilter({ type: 'inStock', value: this.inStockOnly })
    },
    selectGender(gender) {
      this.selectedGender = this.selectedGender === gender ? '' : gender
      this.updateFilters()
    },
    updateSort() {
      this.setSortBy(this.sortBy)
    },
    clearAllFilters() {
      this.selectedCategory = ''
      this.selectedBrand = ''
      this.selectedGender = ''
      this.priceRange = [0, 500]
      this.inStockOnly = false
      this.clearFilters()
    },
    formatCategory(category) {
      return category.charAt(0).toUpperCase() + category.slice(1)
    },
    formatGender(gender) {
      const genderMap = {
        'men': "Men's",
        'women': "Women's",
        'kids': "Kids'"
      }
      return genderMap[gender] || gender
    }
  },
  mounted() {
    // Initialize filters from URL query params if available
    if (this.$route.query.category) {
      this.selectedCategory = this.$route.query.category
      this.updateFilters()
    }
  }
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

.filters-sidebar {
  background-color: var(--bg-primary);
  padding: var(--space-xl);
  border-radius: var(--border-radius-lg);
  height: fit-content;
  position: sticky;
  top: calc(80px + var(--space-md));
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--border-color);
}

.filters-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.clear-filters-btn {
  color: var(--accent-color);
  background: none;
  border: none;
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: var(--transition-fast);
}

.clear-filters-btn:hover {
  color: var(--accent-dark);
}

.filter-group {
  margin-bottom: var(--space-lg);
}

.filter-title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.filter-option {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  transition: var(--transition-fast);
}

.filter-option:hover {
  color: var(--accent-color);
}

.filter-input {
  width: 1rem;
  height: 1rem;
}

.filter-checkbox {
  width: 1.25rem;
  height: 1.25rem;
}

.filter-label {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

.price-range {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.price-slider {
  width: 100%;
}

.price-display {
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
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
  
  .filters-sidebar {
    position: static;
    margin-bottom: var(--space-xl);
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
