<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <button @click="closeModal" class="close-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="modal-content">
        <div class="success-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 class="modal-title">Added to Cart!</h2>
        
        <div v-if="addedProduct" class="product-info">
          <div class="product-image">
            <img :src="addedProduct.image" :alt="addedProduct.name" />
          </div>
          
          <div class="product-details">
            <div class="product-brand">{{ addedProduct.brand }}</div>
            <div class="product-name">{{ addedProduct.name }}</div>
            <div class="product-price">${{ addedProduct.price.toFixed(2) }}</div>
            <div v-if="addedProduct.size || addedProduct.color" class="product-options">
              <span v-if="addedProduct.size" class="option">Size: {{ addedProduct.size }}</span>
              <span v-if="addedProduct.color" class="option">Color: {{ addedProduct.color }}</span>
            </div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button @click="continueShopping" class="continue-btn">
            Continue Shopping
          </button>
          <button @click="goToCart" class="cart-btn">
            <svg class="cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5-5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
            </svg>
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddedToCartModal',
  computed: {
    isVisible() {
      return this.$store.getters['cart/isAddedToCartModalVisible']
    },
    addedProduct() {
      return this.$store.getters['cart/addedProductInfo']
    }
  },
  methods: {
    ...mapActions('cart', ['hideAddedToCartModal', 'setCartOpen']),
    closeModal() {
      this.hideAddedToCartModal()
    },
    continueShopping() {
      this.hideAddedToCartModal()
    },
    goToCart() {
      this.hideAddedToCartModal()
      this.setCartOpen(true)
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-lg);
}

.modal-container {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  max-width: 400px;
  width: 100%;
  position: relative;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: flex-end;
  padding: var(--space-md) var(--space-md) 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
  transition: var(--transition-fast);
}

.close-btn:hover {
  color: var(--text-primary);
  background-color: var(--bg-secondary);
}

.close-btn svg {
  width: 18px;
  height: 18px;
}

.modal-content {
  padding: 0 var(--space-lg) var(--space-lg);
  text-align: center;
}

.success-icon {
  width: 60px;
  height: 60px;
  background-color: var(--accent-color);
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-md);
  color: var(--text-white);
}

.success-icon svg {
  width: 32px;
  height: 32px;
  stroke-width: 3;
}

.modal-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-lg);
}

.product-info {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  padding: var(--space-md);
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-md);
  text-align: left;
}

.product-image {
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  flex-shrink: 0;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  flex: 1;
}

.product-brand {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-xs);
}

.product-name {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  line-height: var(--line-height-tight);
}

.product-price {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--accent-color);
  margin-bottom: var(--space-xs);
}

.product-options {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.option {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  background-color: var(--bg-primary);
  padding: 2px var(--space-xs);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--border-color);
}

.modal-actions {
  display: flex;
  gap: var(--space-sm);
  flex-direction: column;
}

.continue-btn {
  padding: var(--space-sm) var(--space-lg);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: var(--transition-fast);
}

.continue-btn:hover {
  background-color: var(--bg-primary);
  border-color: var(--accent-color);
}

.cart-btn {
  padding: var(--space-sm) var(--space-lg);
  background-color: var(--accent-color);
  color: var(--text-white);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
}

.cart-btn:hover {
  background-color: var(--accent-dark);
  transform: translateY(-2px);
}

.cart-icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: var(--space-md);
  }
  
  .modal-container {
    max-width: 100%;
  }
  
  .product-info {
    flex-direction: column;
    text-align: center;
  }
  
  .product-image {
    width: 80px;
    height: 80px;
  }
}
</style>
