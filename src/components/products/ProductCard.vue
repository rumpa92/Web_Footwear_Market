<template>
  <div class="product-card">
    <div class="product-image-container">
      <router-link :to="`/product/${product.id}`" class="product-image-link">
        <img :src="product.image" :alt="product.name" class="product-image" />
      </router-link>
      
      <!-- Sale Badge -->
      <div v-if="isOnSale" class="sale-badge">
        -{{ discountPercentage }}%
      </div>
      
      <!-- Stock Badge -->
      <div v-if="!product.inStock" class="stock-badge">
        Out of Stock
      </div>
      
      <!-- Wishlist Button -->
      <button @click="toggleWishlist" class="wishlist-btn" :class="{ active: isInWishlist }">
        <svg class="wishlist-icon" :fill="isInWishlist ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </button>
    </div>
    
    <div class="product-content">
      <div class="product-brand">{{ product.brand }}</div>
      <router-link :to="`/product/${product.id}`" class="product-name-link">
        <h3 class="product-name">{{ product.name }}</h3>
      </router-link>
      
      <!-- Rating -->
      <div class="product-rating">
        <div class="rating-stars">
          <span v-for="star in 5" :key="star" class="rating-star" :class="{ filled: star <= Math.floor(product.rating) }">
            ★
          </span>
        </div>
        <span class="rating-text">({{ product.reviews }})</span>
      </div>
      
      <!-- Price -->
      <div class="product-price">
        <span class="current-price">${{ product.price.toFixed(2) }}</span>
        <span v-if="isOnSale" class="original-price">${{ product.originalPrice.toFixed(2) }}</span>
      </div>
      
      <!-- Colors -->
      <div class="product-colors" v-if="product.colors && product.colors.length">
        <div class="color-options">
          <span v-for="color in product.colors.slice(0, 3)" :key="color" class="color-option" :class="color"></span>
          <span v-if="product.colors.length > 3" class="color-more">+{{ product.colors.length - 3 }}</span>
        </div>
      </div>

      <!-- Add to Cart Button -->
      <div class="product-actions">
        <button
          @click="quickAddToCart"
          class="add-to-cart-btn"
          :disabled="!product.inStock"
        >
          <svg class="cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5-5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
          </svg>
          {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('user', ['isInWishlist']),
    isOnSale() {
      return this.product.originalPrice > this.product.price
    },
    discountPercentage() {
      if (!this.isOnSale) return 0
      return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100)
    },
    isInWishlist() {
      return this.$store.getters['user/isInWishlist'](this.product.id)
    }
  },
  methods: {
    ...mapActions('user', ['toggleWishlist']),
    ...mapActions('cart', ['addToCart']),
    toggleWishlist() {
      this.$store.dispatch('user/toggleWishlist', this.product)
    },
    quickAddToCart() {
      if (!this.product.inStock) return
      
      // Add with default size and color
      const defaultSize = this.product.sizes && this.product.sizes.length ? this.product.sizes[0] : null
      const defaultColor = this.product.colors && this.product.colors.length ? this.product.colors[0] : null
      
      this.addToCart({
        product: this.product,
        size: defaultSize,
        color: defaultColor,
        quantity: 1
      })
    }
  }
}
</script>

<style scoped>
.product-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-normal);
  position: relative;
  border: 1px solid var(--border-light);
}

.product-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
  border-color: var(--border-color);
}

.product-image-container {
  position: relative;
  overflow: hidden;
  height: 200px;
  background: var(--bg-light);
}

.product-image-link {
  display: block;
  width: 100%;
  height: 100%;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-normal);
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.sale-badge {
  position: absolute;
  top: var(--space-xs);
  left: var(--space-xs);
  background-color: var(--secondary-color);
  color: var(--text-white);
  padding: 2px var(--space-xs);
  border-radius: var(--border-radius-md);
  font-size: 0.65rem;
  font-weight: var(--font-weight-bold);
  z-index: 1;
}

.stock-badge {
  position: absolute;
  top: var(--space-xs);
  right: var(--space-xs);
  background-color: var(--error-color);
  color: var(--text-white);
  padding: 2px var(--space-xs);
  border-radius: var(--border-radius-md);
  font-size: 0.65rem;
  font-weight: var(--font-weight-bold);
  z-index: 1;
}

.wishlist-btn {
  position: absolute;
  top: var(--space-xs);
  right: var(--space-xs);
  width: 2rem;
  height: 2rem;
  background-color: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast);
  color: var(--text-secondary);
  opacity: 0.8;
  z-index: 2;
  backdrop-filter: blur(10px);
}

.product-card:hover .wishlist-btn {
  background-color: var(--bg-primary);
  transform: scale(1.05);
}

.wishlist-btn:hover {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.wishlist-btn.active {
  color: #ef4444;
  background-color: rgba(239, 68, 68, 0.1);
  border: 2px solid rgba(239, 68, 68, 0.2);
}

.wishlist-btn.active:hover {
  background-color: rgba(239, 68, 68, 0.2);
  transform: scale(1.1);
}

.wishlist-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.product-actions {
  margin-top: 0;
}

.add-to-cart-btn {
  width: 100%;
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--text-primary);
  color: var(--text-white);
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  height: 2rem;
}

.add-to-cart-btn:hover:not(:disabled) {
  background-color: var(--accent-color);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
}

.add-to-cart-btn:disabled {
  background-color: var(--border-color);
  color: var(--text-secondary);
  cursor: not-allowed;
}

.cart-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.product-content {
  padding: var(--space-sm) var(--space-md) var(--space-md);
}

.product-brand {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}

.product-name-link {
  text-decoration: none;
  color: inherit;
}

.product-name {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  line-height: var(--line-height-tight);
  transition: var(--transition-fast);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-name-link:hover .product-name {
  color: var(--accent-color);
}

.product-rating {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin-bottom: var(--space-xs);
}

.rating-stars {
  display: flex;
  gap: 1px;
}

.rating-star {
  color: var(--border-color);
  font-size: 0.7rem;
}

.rating-star.filled {
  color: #fbbf24;
}

.rating-text {
  font-size: 0.65rem;
  color: var(--text-secondary);
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: var(--space-xs);
  margin-bottom: var(--space-sm);
}

.current-price {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.original-price {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  text-decoration: line-through;
}

.product-colors {
  margin-bottom: var(--space-sm);
}

.color-options {
  display: flex;
  align-items: center;
  gap: 6px;
}

.color-option {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: var(--border-radius-full);
  border: 1.5px solid var(--border-color);
  cursor: pointer;
  transition: var(--transition-fast);
}

.color-option:hover {
  transform: scale(1.2);
  border-color: var(--text-primary);
}

.color-option.white {
  background-color: #ffffff;
}

.color-option.black {
  background-color: #000000;
}

.color-option.red {
  background-color: #ef4444;
}

.color-option.blue {
  background-color: #3b82f6;
}

.color-option.gray {
  background-color: #6b7280;
}

.color-option.navy {
  background-color: #1e3a8a;
}

.color-option.burgundy {
  background-color: #7c2d12;
}

.color-more {
  font-size: 0.65rem;
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
}
</style>
