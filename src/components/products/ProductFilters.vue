<template>
  <aside class="filters-sidebar">
    <div class="filters-header">
      <h3 class="filters-title">Filters</h3>
      <button @click="clearAllFilters" class="clear-filters-btn">Clear All</button>
    </div>

    <!-- Gender & Age Filter -->
    <div class="filter-group">
      <h4 class="filter-title">Gender & Age</h4>
      <div class="filter-options">
        <label v-for="gender in genders" :key="gender" class="filter-option">
          <input
            type="radio"
            :value="gender"
            v-model="selectedGender"
            @change="updateFilters"
            class="filter-input"
          />
          <span class="filter-label">{{ formatGender(gender) }}</span>
        </label>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductFilters',
  data() {
    return {
      selectedCategory: '',
      selectedBrand: '',
      selectedGender: '',
      priceRange: [0, 500],
      inStockOnly: false
    }
  },
  computed: {
    ...mapGetters('products', ['categories', 'brands', 'genders'])
  },
  methods: {
    ...mapActions('products', ['setFilter', 'clearFilters']),
    updateFilters() {
      this.setFilter({ type: 'category', value: this.selectedCategory })
      this.setFilter({ type: 'brand', value: this.selectedBrand })
      this.setFilter({ type: 'gender', value: this.selectedGender })
      this.setFilter({ type: 'priceRange', value: this.priceRange })
      this.setFilter({ type: 'inStock', value: this.inStockOnly })
    },
    clearAllFilters() {
      this.selectedCategory = ''
      this.selectedBrand = ''
      this.selectedGender = ''
      this.priceRange = [0, 500]
      this.inStockOnly = false
      this.clearFilters()
      // Remove search query param from URL if exists
      if (this.$route.query.search) {
        this.$router.replace({ query: {} })
      }
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
    if (this.$route.query.search) {
      this.setFilter({ type: 'search', value: this.$route.query.search })
    }
  },
  watch: {
    '$route.query.search'(newSearch) {
      if (newSearch) {
        this.setFilter({ type: 'search', value: newSearch })
      } else {
        this.setFilter({ type: 'search', value: '' })
      }
    }
  }
}
</script>

<style scoped>
.filters-sidebar {
  background-color: var(--bg-primary);
  padding: var(--space-xl);
  border-radius: var(--border-radius-lg);
  height: fit-content;
  position: sticky;
  top: calc(80px + var(--space-md));
  box-shadow: var(--shadow-sm);
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

@media (max-width: 1024px) {
  .filters-sidebar {
    position: static;
    margin-bottom: var(--space-xl);
  }
}
</style>
