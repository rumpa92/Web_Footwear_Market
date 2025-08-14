<template>
  <div class="cart-item">
    <div class="item-image">
      <img :src="item.image" :alt="item.name" />
    </div>
    
    <div class="item-details">
      <div class="item-info">
        <h4 class="item-name">{{ item.name }}</h4>
        <p class="item-brand">{{ item.brand }}</p>
        <div class="item-variants">
          <span v-if="item.size" class="variant">Size: {{ item.size }}</span>
          <span v-if="item.color" class="variant">Color: {{ formatColor(item.color) }}</span>
        </div>
      </div>
      
      <div class="item-actions">
        <div class="quantity-controls">
          <button @click="decreaseQuantity" class="quantity-btn" :disabled="item.quantity <= 1">
            <svg class="quantity-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
            </svg>
          </button>
          <span class="quantity-display">{{ item.quantity }}</span>
          <button @click="increaseQuantity" class="quantity-btn">
            <svg class="quantity-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
        
        <button @click="removeItem" class="remove-btn">
          <svg class="remove-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="item-price">
      <div class="price-current">${{ (item.price * item.quantity).toFixed(2) }}</div>
      <div class="price-unit">${{ item.price.toFixed(2) }} each</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    increaseQuantity() {
      this.$emit('update-quantity', {
        id: this.item.id,
        size: this.item.size,
        color: this.item.color,
        quantity: this.item.quantity + 1
      })
    },
    decreaseQuantity() {
      if (this.item.quantity > 1) {
        this.$emit('update-quantity', {
          id: this.item.id,
          size: this.item.size,
          color: this.item.color,
          quantity: this.item.quantity - 1
        })
      }
    },
    removeItem() {
      this.$emit('remove-item', {
        id: this.item.id,
        size: this.item.size,
        color: this.item.color
      })
    },
    formatColor(color) {
      return color.charAt(0).toUpperCase() + color.slice(1)
    }
  }
}
</script>

<style scoped>
.cart-item {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-lg);
  border-bottom: 1px solid var(--border-light);
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.item-info {
  margin-bottom: var(--space-md);
}

.item-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  line-height: var(--line-height-tight);
}

.item-brand {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-sm);
}

.item-variants {
  display: flex;
  gap: var(--space-md);
}

.variant {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  background-color: var(--bg-light);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
}

.item-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background-color: var(--bg-light);
  border-radius: var(--border-radius-md);
  padding: var(--space-xs);
}

.quantity-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  background-color: var(--bg-primary);
  border: none;
  border-radius: var(--border-radius-sm);
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition-fast);
}

.quantity-btn:hover:not(:disabled) {
  background-color: var(--accent-color);
  color: var(--text-white);
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.quantity-display {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  min-width: 1.5rem;
  text-align: center;
}

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--border-radius-md);
  transition: var(--transition-fast);
}

.remove-btn:hover {
  background-color: var(--error-color);
  color: var(--text-white);
}

.remove-icon {
  width: 1rem;
  height: 1rem;
}

.item-price {
  flex-shrink: 0;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
}

.price-current {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
}

.price-unit {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

@media (max-width: 480px) {
  .cart-item {
    padding: var(--space-md);
  }
  
  .item-image {
    width: 60px;
    height: 60px;
  }
  
  .item-variants {
    flex-direction: column;
    gap: var(--space-xs);
  }
  
  .item-actions {
    flex-direction: column;
    gap: var(--space-sm);
    align-items: flex-start;
  }
}
</style>
