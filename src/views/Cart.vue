<template>
  <div class="cart-page">
    <div class="cart-container">
      <div class="cart-header">
        <h1>Shopping Cart</h1>
        <p class="cart-description">Review your selected items, adjust quantities, apply coupons, and proceed to checkout.</p>
        <div class="breadcrumb">
          <span class="active">Cart</span>
          <span class="separator">→</span>
          <span>Checkout</span>
          <span class="separator">→</span>
          <span>Payment</span>
        </div>
      </div>

      <div v-if="cartItems.length === 0" class="empty-cart">
        <div class="empty-cart-content">
          <div class="empty-cart-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V18C19 19.1 18.1 20 17 20H7C5.9 20 5 19.1 5 18V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7M9 3V4H15V3H9M7 6V18H17V6H7Z"/>
            </svg>
          </div>
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart to get started!</p>
          <button @click="continueShopping" class="continue-shopping-btn">Continue Shopping</button>
        </div>
      </div>

      <div v-else class="cart-content">
        <!-- Cart Items -->
        <div class="cart-items-section">
          <div class="cart-items-header">
            <h2>Cart Items ({{ cartItemCount }})</h2>
            <button @click="clearCart" class="clear-cart-btn">Clear Cart</button>
          </div>

          <div class="cart-items">
            <div 
              v-for="item in cartItems" 
              :key="`${item.id}-${item.size}-${item.color}`"
              class="cart-item"
            >
              <div class="item-image">
                <img :src="item.image" :alt="item.name" />
              </div>
              
              <div class="item-details">
                <h3>{{ item.name }}</h3>
                <p class="item-brand">{{ item.brand }}</p>
                <div class="item-specs">
                  <span class="spec-tag">Size: {{ item.size }}</span>
                  <span class="spec-tag">Color: {{ item.color }}</span>
                </div>
                <div class="item-price">
                  <span class="current-price">${{ item.price.toFixed(2) }}</span>
                  <span v-if="item.originalPrice && item.originalPrice > item.price" class="original-price">
                    ${{ item.originalPrice.toFixed(2) }}
                  </span>
                </div>
              </div>

              <div class="item-actions">
                <div class="quantity-controls">
                  <button @click="decreaseQuantity(item)" class="quantity-btn" :disabled="item.quantity <= 1">−</button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
                </div>
                <div class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</div>
                <button @click="removeItem(item)" class="remove-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Suggested Products -->
          <div v-if="suggestedProducts.length > 0" class="suggested-products">
            <h3>You might also like</h3>
            <div class="suggested-products-grid">
              <div 
                v-for="product in suggestedProducts" 
                :key="product.id"
                class="suggested-product"
                @click="goToProduct(product.id)"
              >
                <img :src="product.image" :alt="product.name" />
                <h4>{{ product.name }}</h4>
                <p class="suggested-brand">{{ product.brand }}</p>
                <div class="suggested-price">
                  <span>${{ product.price.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="cart-summary">
          <div class="summary-card">
            <h2>Order Summary</h2>
            
            <!-- Price Breakdown -->
            <div class="price-breakdown">
              <div class="price-row">
                <span>Subtotal ({{ cartItemCount }} items)</span>
                <span>${{ cartTotal.toFixed(2) }}</span>
              </div>
              <div class="price-row">
                <span>Estimated Shipping</span>
                <span>${{ estimatedShipping.toFixed(2) }}</span>
              </div>
              <div class="price-row">
                <span>Estimated Tax</span>
                <span>${{ estimatedTax.toFixed(2) }}</span>
              </div>
              <div class="price-row total">
                <span>Total</span>
                <span>${{ estimatedTotal.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Coupon Section -->
            <div class="coupon-section">
              <div class="coupon-input">
                <input 
                  v-model="couponCode" 
                  type="text" 
                  placeholder="Enter coupon code"
                  @keyup.enter="applyCoupon"
                />
                <button @click="applyCoupon" :disabled="!couponCode" class="apply-coupon-btn">Apply</button>
              </div>
              <div v-if="appliedCoupon" class="applied-coupon">
                <span>{{ appliedCoupon.code }} applied</span>
                <span class="coupon-discount">-${{ appliedCoupon.discount.toFixed(2) }}</span>
                <button @click="removeCoupon" class="remove-coupon">×</button>
              </div>
            </div>

            <!-- Checkout Button -->
            <button @click="proceedToCheckout" class="proceed-checkout-btn">
              Proceed to Checkout
            </button>

            <!-- Security Features -->
            <div class="security-features">
              <div class="security-item">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                </svg>
                <span>Secure Checkout</span>
              </div>
              <div class="security-item">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z"/>
                </svg>
                <span>Free Returns</span>
              </div>
              <div class="security-item">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A3,3 0 0,1 15,5V7H16A2,2 0 0,1 18,9V19A2,2 0 0,1 16,21H8A2,2 0 0,1 6,19V9A2,2 0 0,1 8,7H9V5A3,3 0 0,1 12,2M12,4A1,1 0 0,0 11,5V7H13V5A1,1 0 0,0 12,4Z"/>
                </svg>
                <span>Safe & Secure</span>
              </div>
            </div>

            <!-- Continue Shopping Link -->
            <div class="continue-shopping">
              <button @click="continueShopping" class="continue-link">
                ← Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Messages -->
    <div v-if="showToast" class="toast" :class="toast.type">
      {{ toast.message }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Cart',
  data() {
    return {
      couponCode: '',
      appliedCoupon: null,
      showToast: false,
      toast: { message: '', type: '' },
      availableCoupons: [
        { code: 'SAVE10', discount: 10, type: 'fixed' },
        { code: 'WELCOME20', discount: 20, type: 'percentage' },
        { code: 'FIRST50', discount: 50, type: 'fixed' }
      ]
    }
  },
  
  computed: {
    ...mapGetters('cart', ['cartItems', 'cartTotal', 'cartItemCount']),
    ...mapGetters('products', ['suggestedProducts']),
    
    estimatedShipping() {
      return this.cartTotal > 100 ? 0 : 5.99
    },
    
    estimatedTax() {
      return this.cartTotal * 0.085 // 8.5% tax
    },
    
    discountAmount() {
      if (!this.appliedCoupon) return 0
      
      if (this.appliedCoupon.type === 'percentage') {
        return (this.cartTotal * this.appliedCoupon.discount) / 100
      } else {
        return this.appliedCoupon.discount
      }
    },
    
    estimatedTotal() {
      return Math.max(0, this.cartTotal + this.estimatedShipping + this.estimatedTax - this.discountAmount)
    }
  },
  
  methods: {
    ...mapActions('cart', ['updateCartItemQuantity', 'removeFromCart', 'clearCart']),
    
    increaseQuantity(item) {
      this.updateCartItemQuantity({
        id: item.id,
        size: item.size,
        color: item.color,
        quantity: item.quantity + 1
      })
    },
    
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        this.updateCartItemQuantity({
          id: item.id,
          size: item.size,
          color: item.color,
          quantity: item.quantity - 1
        })
      }
    },
    
    removeItem(item) {
      this.removeFromCart({
        id: item.id,
        size: item.size,
        color: item.color
      })
      this.showToastMessage('Item removed from cart', 'info')
    },
    
    applyCoupon() {
      const coupon = this.availableCoupons.find(c => c.code.toLowerCase() === this.couponCode.toLowerCase())
      
      if (coupon) {
        this.appliedCoupon = {
          ...coupon,
          discount: coupon.type === 'percentage' 
            ? (this.cartTotal * coupon.discount) / 100 
            : coupon.discount
        }
        this.couponCode = ''
        this.showToastMessage('Coupon applied successfully!', 'success')
      } else {
        this.showToastMessage('Invalid coupon code', 'error')
      }
    },
    
    removeCoupon() {
      this.appliedCoupon = null
      this.showToastMessage('Coupon removed', 'info')
    },
    
    proceedToCheckout() {
      // Store coupon in session for checkout page
      if (this.appliedCoupon) {
        sessionStorage.setItem('appliedCoupon', JSON.stringify(this.appliedCoupon))
      }
      this.$router.push('/checkout')
    },
    
    continueShopping() {
      this.$router.push('/products')
    },
    
    goToProduct(productId) {
      this.$router.push(`/product/${productId}`)
    },
    
    showToastMessage(message, type = 'info') {
      this.toast = { message, type }
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 2rem 0;
}

.cart-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.cart-header {
  text-align: center;
  margin-bottom: 3rem;
}

.cart-header h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #6b7280;
  font-size: 1.1rem;
}

.breadcrumb .active {
  color: #3b82f6;
  font-weight: 600;
}

.separator {
  color: #d1d5db;
}

/* Empty Cart */
.empty-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.empty-cart-content {
  text-align: center;
  max-width: 400px;
}

.empty-cart-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 2rem;
  color: #d1d5db;
}

.empty-cart-icon svg {
  width: 100%;
  height: 100%;
}

.empty-cart-content h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.empty-cart-content p {
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.continue-shopping-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.continue-shopping-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

/* Cart Content */
.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
}

/* Cart Items Section */
.cart-items-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.cart-items-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.cart-items-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.clear-cart-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-cart-btn:hover {
  background: #dc2626;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 2px solid #f3f4f6;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.cart-item:hover {
  border-color: #e5e7eb;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.item-image {
  flex-shrink: 0;
}

.item-image img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.item-brand {
  color: #6b7280;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
}

.item-specs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.spec-tag {
  background: #f3f4f6;
  color: #6b7280;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

.item-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.current-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
}

.original-price {
  font-size: 0.9rem;
  color: #9ca3af;
  text-decoration: line-through;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f3f4f6;
  padding: 0.5rem;
  border-radius: 12px;
}

.quantity-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity-btn:hover:not(:disabled) {
  background: #2563eb;
}

.quantity-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.quantity {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  min-width: 30px;
  text-align: center;
}

.item-total {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1f2937;
}

.remove-btn {
  background: #ef4444;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: #dc2626;
}

.remove-btn svg {
  width: 20px;
  height: 20px;
}

/* Suggested Products */
.suggested-products {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #f3f4f6;
}

.suggested-products h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.suggested-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.suggested-product {
  background: #f9fafb;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.suggested-product:hover {
  background: #f3f4f6;
  transform: translateY(-2px);
}

.suggested-product img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.suggested-product h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.suggested-brand {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}

.suggested-price {
  font-weight: 600;
  color: #3b82f6;
}

/* Cart Summary */
.cart-summary {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.summary-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.summary-card h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 2rem 0;
  text-align: center;
}

.price-breakdown {
  margin-bottom: 2rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #6b7280;
}

.price-row.total {
  color: #1f2937;
  font-size: 1.2rem;
  font-weight: 700;
  border-top: 2px solid #f3f4f6;
  padding-top: 1rem;
  margin-top: 1rem;
  margin-bottom: 0;
}

/* Coupon Section */
.coupon-section {
  margin-bottom: 2rem;
}

.coupon-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.coupon-input input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
}

.coupon-input input:focus {
  outline: none;
  border-color: #3b82f6;
}

.apply-coupon-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.apply-coupon-btn:hover:not(:disabled) {
  background: #059669;
}

.apply-coupon-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.applied-coupon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #d1fae5;
  border: 1px solid #10b981;
  border-radius: 8px;
  padding: 0.75rem;
}

.coupon-discount {
  color: #10b981;
  font-weight: 600;
}

.remove-coupon {
  background: #ef4444;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.remove-coupon:hover {
  background: #dc2626;
}

/* Proceed to Checkout */
.proceed-checkout-btn {
  width: 100%;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 1.5rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.proceed-checkout-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

/* Security Features */
.security-features {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.security-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.security-item svg {
  width: 18px;
  height: 18px;
  color: #10b981;
}

/* Continue Shopping */
.continue-shopping {
  text-align: center;
}

.continue-link {
  background: none;
  border: none;
  color: #3b82f6;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.continue-link:hover {
  background: #eff6ff;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideInUp 0.3s ease;
}

.toast.success { background: #10b981; }
.toast.error { background: #ef4444; }
.toast.info { background: #3b82f6; }

@keyframes slideInUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .cart-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-page {
    padding: 1rem 0;
  }
  
  .cart-container {
    padding: 0 1rem;
  }
  
  .cart-header h1 {
    font-size: 2rem;
  }
  
  .breadcrumb {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .cart-items-section {
    padding: 1.5rem;
  }
  
  .cart-items-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .cart-item {
    flex-direction: column;
    gap: 1rem;
  }
  
  .item-actions {
    flex-direction: row;
    justify-content: space-between;
  }
  
  .suggested-products-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

@media (max-width: 480px) {
  .cart-header h1 {
    font-size: 1.8rem;
  }
  
  .cart-items-section {
    padding: 1rem;
  }
  
  .summary-card {
    padding: 1.5rem;
  }
  
  .item-image img {
    width: 100px;
    height: 100px;
  }
  
  .item-details h3 {
    font-size: 1rem;
  }
}
</style>
