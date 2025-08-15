<template>
  <div class="checkout-page">
    <!-- Order Confirmation Modal -->
    <div v-if="showOrderConfirmation" class="order-confirmation-overlay" @click="closeOrderConfirmation">
      <div class="order-confirmation-modal" @click.stop>
        <div class="confirmation-content">
          <div class="success-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h2>Order Confirmed!</h2>
          <p class="order-id">Order ID: <strong>{{ orderConfirmation.orderId }}</strong></p>
          <p class="delivery-estimate">Estimated Delivery: {{ orderConfirmation.deliveryDate }}</p>
          <div class="confirmation-actions">
            <button @click="trackOrder" class="track-order-btn">Track Order</button>
            <button @click="continueShopping" class="continue-shopping-btn">Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Address Selection Modal -->
    <div v-if="showAddressModal" class="address-modal-overlay" @click="closeAddressModal">
      <div class="address-modal" @click.stop>
        <div class="modal-header">
          <h3>Select or Add Address</h3>
          <button @click="closeAddressModal" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <!-- Saved Addresses -->
          <div class="saved-addresses">
            <h4>Saved Addresses</h4>
            <div 
              v-for="address in savedAddresses" 
              :key="address.id"
              class="address-option"
              :class="{ selected: selectedAddressId === address.id }"
              @click="selectAddress(address)"
            >
              <div class="address-radio">
                <input 
                  type="radio" 
                  :checked="selectedAddressId === address.id"
                  @change="selectAddress(address)"
                />
              </div>
              <div class="address-details">
                <h5>{{ address.name }}</h5>
                <p>{{ address.street }}</p>
                <p>{{ address.city }}, {{ address.state }} {{ address.pincode }}</p>
                <p>{{ address.phone }}</p>
              </div>
            </div>
          </div>
          
          <!-- Add New Address Form -->
          <div class="add-new-address">
            <h4>Add New Address</h4>
            <form @submit.prevent="addNewAddress" class="address-form">
              <div class="form-row">
                <input v-model="newAddress.name" type="text" placeholder="Full Name" required />
                <input v-model="newAddress.phone" type="tel" placeholder="Phone Number" required />
              </div>
              <input v-model="newAddress.street" type="text" placeholder="Street Address" required />
              <div class="form-row">
                <input v-model="newAddress.city" type="text" placeholder="City" required />
                <input v-model="newAddress.state" type="text" placeholder="State" required />
              </div>
              <input v-model="newAddress.pincode" type="text" placeholder="Pincode" required />
              <button type="submit" class="add-address-btn">Add Address</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="checkout-container">
      <div class="checkout-header">
        <h1>Checkout</h1>
        <div class="breadcrumb">
          <span>Cart</span>
          <span class="separator">→</span>
          <span class="active">Checkout</span>
          <span class="separator">→</span>
          <span>Payment</span>
        </div>
      </div>

      <div class="checkout-content">
        <!-- Left Side - Checkout Details -->
        <div class="checkout-details">
          <!-- Shipping Address Section -->
          <div class="checkout-section">
            <div class="section-header">
              <h2>Shipping Address</h2>
              <button @click="openAddressModal" class="change-btn">Change</button>
            </div>
            <div class="address-display">
              <div class="address-info">
                <h3>{{ selectedAddress.name }}</h3>
                <p>{{ selectedAddress.street }}</p>
                <p>{{ selectedAddress.city }}, {{ selectedAddress.state }} {{ selectedAddress.pincode }}</p>
                <p>{{ selectedAddress.phone }}</p>
              </div>
            </div>
          </div>

          <!-- Delivery Options Section -->
          <div class="checkout-section">
            <div class="section-header">
              <h2>Delivery Options</h2>
            </div>
            <div class="delivery-options">
              <div
                class="delivery-option"
                :class="{ selected: selectedDelivery === 'standard' }"
                @click="selectedDelivery = 'standard'"
              >
                <input type="radio" name="delivery" value="standard" v-model="selectedDelivery" />
                <div class="delivery-info">
                  <div class="delivery-title">Standard Delivery</div>
                  <div class="delivery-time">5-7 business days</div>
                  <div class="delivery-price">$5.99</div>
                </div>
              </div>
              <div
                class="delivery-option"
                :class="{ selected: selectedDelivery === 'express' }"
                @click="selectedDelivery = 'express'"
              >
                <input type="radio" name="delivery" value="express" v-model="selectedDelivery" />
                <div class="delivery-info">
                  <div class="delivery-title">Express Delivery</div>
                  <div class="delivery-time">2-3 business days</div>
                  <div class="delivery-price">$12.99</div>
                </div>
              </div>
              <div
                class="delivery-option"
                :class="{ selected: selectedDelivery === 'overnight' }"
                @click="selectedDelivery = 'overnight'"
              >
                <input type="radio" name="delivery" value="overnight" v-model="selectedDelivery" />
                <div class="delivery-info">
                  <div class="delivery-title">Overnight Delivery</div>
                  <div class="delivery-time">Next business day</div>
                  <div class="delivery-price">$24.99</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Discount Section -->
          <div class="checkout-section">
            <div class="section-header">
              <h2>Discount Code</h2>
            </div>
            <div class="discount-section">
              <div class="coupon-input">
                <input
                  v-model="couponCode"
                  type="text"
                  placeholder="Enter coupon code"
                  :disabled="appliedCoupon"
                />
                <button
                  @click="applyCoupon"
                  class="apply-btn"
                  :disabled="!couponCode || appliedCoupon"
                >
                  Apply
                </button>
              </div>
              <div v-if="appliedCoupon" class="applied-coupon">
                <div class="coupon-info">
                  <span class="coupon-name">{{ appliedCoupon.code }}</span>
                  <span class="coupon-discount">-${{ appliedCoupon.discount.toFixed(2) }}</span>
                </div>
                <button @click="removeCoupon" class="remove-coupon">×</button>
              </div>
            </div>
          </div>

          <!-- Payment Options Section -->
          <div class="checkout-section">
            <div class="section-header">
              <h2>Payment Method</h2>
            </div>
            <div class="payment-methods">
              <!-- Credit/Debit Cards -->
              <div 
                class="payment-option"
                :class="{ selected: selectedPayment === 'card' }"
                @click="selectedPayment = 'card'"
              >
                <input type="radio" name="payment" value="card" v-model="selectedPayment" />
                <div class="payment-info">
                  <div class="payment-title">Credit/Debit Card</div>
                  <div class="card-logos">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" alt="MasterCard" />
                  </div>
                </div>
              </div>

              <!-- Digital Wallets -->
              <div 
                class="payment-option"
                :class="{ selected: selectedPayment === 'wallet' }"
                @click="selectedPayment = 'wallet'"
              >
                <input type="radio" name="payment" value="wallet" v-model="selectedPayment" />
                <div class="payment-info">
                  <div class="payment-title">Digital Wallets</div>
                  <div class="wallet-logos">
                    <div class="wallet-logo">GPay</div>
                    <div class="wallet-logo">Paytm</div>
                    <div class="wallet-logo">PhonePe</div>
                  </div>
                </div>
              </div>

              <!-- UPI -->
              <div 
                class="payment-option"
                :class="{ selected: selectedPayment === 'upi' }"
                @click="selectedPayment = 'upi'"
              >
                <input type="radio" name="payment" value="upi" v-model="selectedPayment" />
                <div class="payment-info">
                  <div class="payment-title">UPI</div>
                  <div class="upi-info">Pay using any UPI app</div>
                </div>
              </div>

              <!-- Net Banking -->
              <div
                class="payment-option"
                :class="{ selected: selectedPayment === 'netbanking' }"
                @click="selectedPayment = 'netbanking'"
              >
                <input type="radio" name="payment" value="netbanking" v-model="selectedPayment" />
                <div class="payment-info">
                  <div class="payment-title">Net Banking</div>
                  <div class="bank-info">Select your bank</div>
                </div>
              </div>

              <!-- Cash on Delivery -->
              <div
                class="payment-option"
                :class="{ selected: selectedPayment === 'cod' }"
                @click="selectedPayment = 'cod'"
              >
                <input type="radio" name="payment" value="cod" v-model="selectedPayment" />
                <div class="payment-info">
                  <div class="payment-title">Cash on Delivery</div>
                  <div class="cod-info">Pay when you receive</div>
                </div>
              </div>
            </div>

            <!-- Payment Details Form -->
            <div v-if="selectedPayment === 'card'" class="payment-form">
              <div class="card-form">
                <input v-model="cardDetails.number" type="text" placeholder="Card Number" maxlength="19" />
                <div class="form-row">
                  <input v-model="cardDetails.expiry" type="text" placeholder="MM/YY" maxlength="5" />
                  <input v-model="cardDetails.cvv" type="text" placeholder="CVV" maxlength="3" />
                </div>
                <input v-model="cardDetails.name" type="text" placeholder="Cardholder Name" />
              </div>
            </div>

            <div v-if="selectedPayment === 'upi'" class="payment-form">
              <input v-model="upiId" type="text" placeholder="Enter UPI ID" />
            </div>
          </div>
        </div>

        <!-- Right Side - Order Summary -->
        <div class="order-summary">
          <div class="summary-card">
            <h2>Order Summary</h2>
            
            <!-- Cart Items -->
            <div class="cart-items">
              <div 
                v-for="item in cartItems" 
                :key="`${item.id}-${item.size}-${item.color}`"
                class="cart-item"
              >
                <img :src="item.image" :alt="item.name" />
                <div class="item-details">
                  <h4>{{ item.name }}</h4>
                  <p>{{ item.brand }}</p>
                  <div class="item-specs">
                    <span>Size: {{ item.size }}</span>
                    <span>Color: {{ item.color }}</span>
                    <span>Qty: {{ item.quantity }}</span>
                  </div>
                </div>
                <div class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</div>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="price-breakdown">
              <div class="price-row">
                <span>Subtotal ({{ cartItemCount }} items)</span>
                <span>${{ cartTotal.toFixed(2) }}</span>
              </div>
              <div class="price-row">
                <span>Shipping</span>
                <span>${{ shippingCost.toFixed(2) }}</span>
              </div>
              <div class="price-row">
                <span>Tax ({{ taxRate }}%)</span>
                <span>${{ taxAmount.toFixed(2) }}</span>
              </div>
              <div v-if="appliedCoupon" class="price-row discount">
                <span>Discount ({{ appliedCoupon.code }})</span>
                <span>-${{ appliedCoupon.discount.toFixed(2) }}</span>
              </div>
              <div class="price-row total">
                <span>Total</span>
                <span>${{ finalTotal.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Place Order Button -->
            <button 
              @click="placeOrder" 
              class="place-order-btn"
              :disabled="!selectedPayment || isPlacingOrder"
              :class="{ placing: isPlacingOrder }"
            >
              <span v-if="!isPlacingOrder">Place Order - ${{ finalTotal.toFixed(2) }}</span>
              <span v-else>Processing...</span>
            </button>

            <!-- Security Info -->
            <div class="security-info">
              <div class="security-item">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                </svg>
                <span>Secure Payment</span>
              </div>
              <div class="security-item">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9,12L11,14L15,10L13.59,8.59L11,11.17L10.41,10.59L9,12M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
                </svg>
                <span>Money Back Guarantee</span>
              </div>
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
import { mapGetters } from 'vuex'

export default {
  name: 'Checkout',
  data() {
    return {
      showAddressModal: false,
      showOrderConfirmation: false,
      showToast: false,
      toast: { message: '', type: '' },
      
      // Address Management
      selectedAddressId: 1,
      savedAddresses: [
        {
          id: 1,
          name: 'John Doe',
          street: '123 Main Street, Apartment 4B',
          city: 'New York',
          state: 'NY',
          pincode: '10001',
          phone: '+1 (555) 123-4567'
        },
        {
          id: 2,
          name: 'Jane Smith',
          street: '456 Oak Avenue, Suite 200',
          city: 'Los Angeles',
          state: 'CA',
          pincode: '90210',
          phone: '+1 (555) 987-6543'
        }
      ],
      newAddress: {
        name: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        pincode: ''
      },
      
      // Delivery
      selectedDelivery: 'standard',
      deliveryOptions: {
        standard: { price: 5.99, days: '5-7' },
        express: { price: 12.99, days: '2-3' },
        overnight: { price: 24.99, days: '1' }
      },

      // Payment
      selectedPayment: '',
      cardDetails: {
        number: '',
        expiry: '',
        cvv: '',
        name: ''
      },
      upiId: '',
      
      // Coupons
      couponCode: '',
      appliedCoupon: null,
      availableCoupons: [
        { code: 'SAVE10', discount: 10, type: 'fixed' },
        { code: 'WELCOME20', discount: 20, type: 'percentage' },
        { code: 'FIRST50', discount: 50, type: 'fixed' }
      ],
      
      // Order
      isPlacingOrder: false,
      orderConfirmation: {
        orderId: '',
        deliveryDate: ''
      },
      
      // Pricing
      taxRate: 8.5
    }
  },
  
  computed: {
    ...mapGetters('cart', ['cartItems', 'cartTotal', 'cartItemCount']),
    
    selectedAddress() {
      return this.savedAddresses.find(addr => addr.id === this.selectedAddressId) || this.savedAddresses[0]
    },

    shippingCost() {
      return this.deliveryOptions[this.selectedDelivery]?.price || 5.99
    },

    taxAmount() {
      return (this.cartTotal * this.taxRate) / 100
    },
    
    discountAmount() {
      if (!this.appliedCoupon) return 0
      
      if (this.appliedCoupon.type === 'percentage') {
        return (this.cartTotal * this.appliedCoupon.discount) / 100
      } else {
        return this.appliedCoupon.discount
      }
    },
    
    finalTotal() {
      const total = this.cartTotal + this.shippingCost + this.taxAmount - this.discountAmount
      return Math.max(0, total)
    }
  },
  
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.cartItems.length === 0) {
        vm.$router.push('/cart')
      }
    })
  },

  mounted() {
    // Check for applied coupon from cart
    const savedCoupon = sessionStorage.getItem('appliedCoupon')
    if (savedCoupon) {
      this.appliedCoupon = JSON.parse(savedCoupon)
      sessionStorage.removeItem('appliedCoupon')
    }
  },
  
  methods: {
    openAddressModal() {
      this.showAddressModal = true
    },
    
    closeAddressModal() {
      this.showAddressModal = false
      this.newAddress = {
        name: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        pincode: ''
      }
    },
    
    selectAddress(address) {
      this.selectedAddressId = address.id
      this.closeAddressModal()
    },
    
    addNewAddress() {
      const newId = Math.max(...this.savedAddresses.map(a => a.id)) + 1
      const newAddr = { ...this.newAddress, id: newId }
      this.savedAddresses.push(newAddr)
      this.selectedAddressId = newId
      this.closeAddressModal()
      this.showToastMessage('Address added successfully!', 'success')
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
    
    async placeOrder() {
      if (!this.selectedPayment) {
        this.showToastMessage('Please select a payment method', 'error')
        return
      }
      
      this.isPlacingOrder = true
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate order confirmation
      this.orderConfirmation = {
        orderId: `FT${Date.now().toString().slice(-8)}`,
        deliveryDate: this.getDeliveryDate()
      }
      
      this.isPlacingOrder = false
      this.showOrderConfirmation = true
      
      // Clear cart (you would typically do this through Vuex)
      this.$store.dispatch('cart/clearCart')
    },
    
    getDeliveryDate() {
      const date = new Date()
      date.setDate(date.getDate() + 5) // 5 days from now
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    },
    
    closeOrderConfirmation() {
      this.showOrderConfirmation = false
    },
    
    trackOrder() {
      this.$router.push('/orders')
    },
    
    continueShopping() {
      this.$router.push('/')
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
.checkout-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 2rem 0;
}

.checkout-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.checkout-header {
  text-align: center;
  margin-bottom: 3rem;
}

.checkout-header h1 {
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

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
}

/* Checkout Details */
.checkout-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.checkout-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.checkout-section:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.change-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.change-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

/* Address Display */
.address-display {
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
}

.address-info h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.address-info p {
  color: #6b7280;
  margin: 0.25rem 0;
  line-height: 1.5;
}

/* Discount Section */
.coupon-input {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.coupon-input input {
  flex: 1;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.coupon-input input:focus {
  outline: none;
  border-color: #3b82f6;
}

.apply-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.apply-btn:hover:not(:disabled) {
  background: #059669;
}

.apply-btn:disabled {
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
  padding: 1rem;
}

.coupon-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.coupon-name {
  font-weight: 600;
  color: #065f46;
}

.coupon-discount {
  color: #10b981;
  font-weight: 600;
}

.remove-coupon {
  background: #ef4444;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.remove-coupon:hover {
  background: #dc2626;
}

/* Payment Methods */
.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.payment-option:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);
}

.payment-option.selected {
  border-color: #3b82f6;
  background: #eff6ff;
}

.payment-option input[type="radio"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.payment-info {
  flex: 1;
}

.payment-title {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.card-logos {
  display: flex;
  gap: 0.5rem;
}

.card-logos img {
  width: 40px;
  height: 25px;
  object-fit: contain;
}

.wallet-logos {
  display: flex;
  gap: 0.5rem;
}

.wallet-logo {
  background: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 600;
}

.upi-info, .bank-info {
  color: #6b7280;
  font-size: 0.9rem;
}

/* Payment Forms */
.payment-form {
  margin-top: 1rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.card-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-form input {
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.card-form input:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* Order Summary */
.order-summary {
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

.cart-items {
  margin-bottom: 2rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
}

.item-details h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.item-details p {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}

.item-specs {
  display: flex;
  gap: 0.5rem;
  font-size: 0.7rem;
  color: #9ca3af;
}

.item-specs span {
  background: #f3f4f6;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
}

.item-price {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
}

/* Price Breakdown */
.price-breakdown {
  border-top: 2px solid #f3f4f6;
  padding-top: 1rem;
  margin-bottom: 2rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #6b7280;
}

.price-row.discount {
  color: #10b981;
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

/* Place Order Button */
.place-order-btn {
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
  position: relative;
  overflow: hidden;
}

.place-order-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.place-order-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.place-order-btn.placing {
  background: #10b981;
}

/* Security Info */
.security-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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

/* Modals */
.address-modal-overlay, .order-confirmation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.address-modal, .order-confirmation-modal {
  background: white;
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 0 2rem;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  padding: 2rem;
}

.saved-addresses {
  margin-bottom: 2rem;
}

.saved-addresses h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.address-option {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.address-option:hover {
  border-color: #3b82f6;
}

.address-option.selected {
  border-color: #3b82f6;
  background: #eff6ff;
}

.address-radio input {
  width: 20px;
  height: 20px;
}

.address-details h5 {
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.address-details p {
  color: #6b7280;
  margin: 0.25rem 0;
  line-height: 1.4;
}

.add-new-address h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.address-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.address-form input {
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.address-form input:focus {
  outline: none;
  border-color: #3b82f6;
}

.add-address-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-address-btn:hover {
  background: #2563eb;
}

/* Order Confirmation */
.confirmation-content {
  text-align: center;
  padding: 3rem 2rem;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.success-icon svg {
  width: 50px;
  height: 50px;
}

.confirmation-content h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.order-id {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.delivery-estimate {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.confirmation-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.track-order-btn, .continue-shopping-btn {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.track-order-btn {
  background: #3b82f6;
  color: white;
}

.track-order-btn:hover {
  background: #2563eb;
}

.continue-shopping-btn {
  background: #f3f4f6;
  color: #6b7280;
}

.continue-shopping-btn:hover {
  background: #e5e7eb;
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
  .checkout-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .order-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .checkout-page {
    padding: 1rem 0;
  }
  
  .checkout-container {
    padding: 0 1rem;
  }
  
  .checkout-header h1 {
    font-size: 2rem;
  }
  
  .breadcrumb {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .checkout-section {
    padding: 1.5rem;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .confirmation-actions {
    flex-direction: column;
  }
  
  .address-modal, .order-confirmation-modal {
    margin: 1rem;
    max-width: calc(100vw - 2rem);
  }
}

@media (max-width: 480px) {
  .checkout-header h1 {
    font-size: 1.8rem;
  }
  
  .checkout-section {
    padding: 1rem;
  }
  
  .summary-card {
    padding: 1.5rem;
  }
  
  .cart-item {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .item-specs {
    flex-wrap: wrap;
  }
}
</style>
