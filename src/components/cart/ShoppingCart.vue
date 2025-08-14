<template>
  <div class="cart-overlay" v-if="isCartOpen" @click.self="closeCart">
    <div class="cart-panel">
      <div class="cart-header">
        <h2 class="cart-title">Shopping Cart</h2>
        <button @click="closeCart" class="close-btn">
          <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="cart-content">
        <!-- Empty Cart -->
        <div v-if="cartItems.length === 0" class="empty-cart">
          <div class="empty-cart-icon">🛒</div>
          <h3 class="empty-cart-title">Your cart is empty</h3>
          <p class="empty-cart-text">Add some products to get started</p>
          <button @click="closeCart" class="btn btn-primary">Continue Shopping</button>
        </div>

        <!-- Cart Items -->
        <div v-else class="cart-items">
          <div class="cart-items-list">
            <CartItem 
              v-for="item in cartItems" 
              :key="`${item.id}-${item.size}-${item.color}`"
              :item="item"
              @update-quantity="updateQuantity"
              @remove-item="removeItem"
            />
          </div>

          <!-- Cart Summary -->
          <div class="cart-summary">
            <div class="summary-row">
              <span class="summary-label">Subtotal ({{ cartItemCount }} items)</span>
              <span class="summary-value">${{ cartTotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Shipping</span>
              <span class="summary-value">{{ shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}` }}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Tax</span>
              <span class="summary-value">${{ tax.toFixed(2) }}</span>
            </div>
            <div class="summary-row total-row">
              <span class="summary-label">Total</span>
              <span class="summary-value">${{ finalTotal.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Cart Actions -->
          <div class="cart-actions">
            <button @click="closeCart" class="btn btn-ghost">Continue Shopping</button>
            <router-link to="/checkout" @click.native="closeCart" class="btn btn-primary btn-full">
              Proceed to Checkout
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CartItem from './CartItem.vue'

export default {
  name: 'ShoppingCart',
  components: {
    CartItem
  },
  computed: {
    ...mapGetters('cart', ['cartItems', 'cartTotal', 'cartItemCount', 'isCartOpen']),
    shipping() {
      return this.cartTotal >= 100 ? 0 : 9.99
    },
    tax() {
      return (this.cartTotal + this.shipping) * 0.08 // 8% tax
    },
    finalTotal() {
      return this.cartTotal + this.shipping + this.tax
    }
  },
  methods: {
    ...mapActions('cart', ['setCartOpen', 'updateCartItemQuantity', 'removeFromCart']),
    closeCart() {
      this.setCartOpen(false)
    },
    updateQuantity(payload) {
      this.updateCartItemQuantity(payload)
    },
    removeItem(payload) {
      this.removeFromCart(payload)
    }
  }
}
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: var(--z-modal);
  display: flex;
  justify-content: flex-end;
}

.cart-panel {
  width: 100%;
  max-width: 480px;
  height: 100%;
  background-color: var(--bg-primary);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xl);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg);
  border-bottom: 1px solid var(--border-color);
}

.cart-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.close-btn {
  padding: var(--space-sm);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--border-radius-md);
  transition: var(--transition-fast);
}

.close-btn:hover {
  background-color: var(--bg-light);
  color: var(--text-primary);
}

.close-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.cart-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.empty-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--space-2xl);
  text-align: center;
}

.empty-cart-icon {
  font-size: 4rem;
  margin-bottom: var(--space-lg);
  opacity: 0.5;
}

.empty-cart-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.empty-cart-text {
  color: var(--text-secondary);
  margin-bottom: var(--space-xl);
}

.cart-items {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cart-items-list {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-md) 0;
}

.cart-summary {
  padding: var(--space-lg);
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-light);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-sm);
}

.summary-row:last-child {
  margin-bottom: 0;
}

.summary-label {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.summary-value {
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
}

.total-row {
  padding-top: var(--space-md);
  border-top: 1px solid var(--border-color);
  margin-top: var(--space-sm);
}

.total-row .summary-label,
.total-row .summary-value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.cart-actions {
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

@media (max-width: 480px) {
  .cart-panel {
    max-width: 100%;
  }
}
</style>
