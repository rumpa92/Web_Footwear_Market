<template>
  <div class="checkout-page">
    <div class="checkout-container">
      <!-- Main Content Grid -->
      <div class="checkout-grid">
        <!-- Left Side - Checkout Form -->
        <div class="checkout-form">
          <!-- Delivery Address Section -->
          <div class="checkout-section delivering-to">
            <div class="section-header">
              <div class="section-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <h2>Delivering to</h2>
            </div>
            
            <div class="delivery-address">
              <div class="address-info">
                <h3>{{ selectedAddress.name }}</h3>
                <p>{{ selectedAddress.street }}</p>
                <p>{{ selectedAddress.city }}, {{ selectedAddress.state }} {{ selectedAddress.pincode }}</p>
              </div>
              <button @click="openAddressModal" class="change-address-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                </svg>
                Change
              </button>
            </div>
          </div>

          <!-- Payment Method Section -->
          <div class="checkout-section payment-section">
            <div class="section-header">
              <div class="section-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.11,4 20,4Z"/>
                </svg>
              </div>
              <h2>Payment Method</h2>
            </div>
            <p class="section-subtitle">Choose your preferred payment option</p>

            <div class="payment-methods">
              <!-- Credit/Debit Card -->
              <div 
                class="payment-method"
                :class="{ selected: selectedPayment === 'card' }"
                @click="selectPayment('card')"
              >
                <div class="payment-radio">
                  <div class="radio-circle" :class="{ active: selectedPayment === 'card' }">
                    <div class="radio-dot"></div>
                  </div>
                </div>
                <div class="payment-content">
                  <div class="payment-header">
                    <div class="payment-icon card-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.11,4 20,4Z"/>
                      </svg>
                    </div>
                    <div class="payment-title">Credit/Debit Card</div>
                  </div>
                  <div class="payment-subtitle">Safe and secure payment</div>
                  <div class="card-brands">
                    <div class="card-brand visa"></div>
                    <div class="card-brand mastercard"></div>
                  </div>
                </div>
              </div>

              <!-- UPI -->
              <div 
                class="payment-method"
                :class="{ selected: selectedPayment === 'upi' }"
                @click="selectPayment('upi')"
              >
                <div class="payment-radio">
                  <div class="radio-circle" :class="{ active: selectedPayment === 'upi' }">
                    <div class="radio-dot"></div>
                  </div>
                </div>
                <div class="payment-content">
                  <div class="payment-header">
                    <div class="payment-icon upi-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z"/>
                      </svg>
                    </div>
                    <div class="payment-title">UPI</div>
                  </div>
                  <div class="payment-subtitle">Secure & Quick payments</div>
                </div>
              </div>

              <!-- Digital Wallets -->
              <div 
                class="payment-method"
                :class="{ selected: selectedPayment === 'wallet' }"
                @click="selectPayment('wallet')"
              >
                <div class="payment-radio">
                  <div class="radio-circle" :class="{ active: selectedPayment === 'wallet' }">
                    <div class="radio-dot"></div>
                  </div>
                </div>
                <div class="payment-content">
                  <div class="payment-header">
                    <div class="payment-icon wallet-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5,6.09L7.91,3H16.09L19,6.09V17.91L16.09,21H7.91L5,17.91V6.09M17,7.5A1.5,1.5 0 0,0 15.5,6A1.5,1.5 0 0,0 14,7.5A1.5,1.5 0 0,0 15.5,9A1.5,1.5 0 0,0 17,7.5M7,10.5V12.5H11V10.5H7M7,14.5V16.5H17V14.5H7Z"/>
                      </svg>
                    </div>
                    <div class="payment-title">Digital Wallets</div>
                  </div>
                  <div class="payment-subtitle">Quick checkout</div>
                  <div class="wallet-brands">
                    <div class="wallet-brand">GPay</div>
                    <div class="wallet-brand">Paytm</div>
                    <div class="wallet-brand">PhonePe</div>
                  </div>
                </div>
              </div>

              <!-- Net Banking -->
              <div 
                class="payment-method"
                :class="{ selected: selectedPayment === 'netbanking' }"
                @click="selectPayment('netbanking')"
              >
                <div class="payment-radio">
                  <div class="radio-circle" :class="{ active: selectedPayment === 'netbanking' }">
                    <div class="radio-dot"></div>
                  </div>
                </div>
                <div class="payment-content">
                  <div class="payment-header">
                    <div class="payment-icon banking-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5,6.09L7.91,3H16.09L19,6.09V17.91L16.09,21H7.91L5,17.91V6.09M11,8V14H13V8H11M11,16V18H13V16H11Z"/>
                      </svg>
                    </div>
                    <div class="payment-title">Net Banking</div>
                  </div>
                  <div class="payment-subtitle">Secure bank gateway</div>
                  <div class="bank-logos">
                    <div class="bank-logo">HDFC</div>
                    <div class="bank-logo">SBI</div>
                    <div class="bank-logo">ICICI</div>
                  </div>
                </div>
              </div>

              <!-- Cash on Delivery -->
              <div 
                class="payment-method"
                :class="{ selected: selectedPayment === 'cod' }"
                @click="selectPayment('cod')"
              >
                <div class="payment-radio">
                  <div class="radio-circle" :class="{ active: selectedPayment === 'cod' }">
                    <div class="radio-dot"></div>
                  </div>
                </div>
                <div class="payment-content">
                  <div class="payment-header">
                    <div class="payment-icon cod-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
                      </svg>
                    </div>
                    <div class="payment-title">Cash on Delivery</div>
                  </div>
                  <div class="payment-subtitle">Pay when you receive</div>
                  <div class="cod-options">
                    <div class="cod-option">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
                      </svg>
                      <span>COD</span>
                    </div>
                    <div class="cod-option">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.11,4 20,4Z"/>
                      </svg>
                      <span>Cash</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Details Form (when card is selected) -->
            <div v-if="selectedPayment === 'card'" class="card-details-form">
              <div class="form-header">
                <div class="form-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.11,4 20,4Z"/>
                  </svg>
                </div>
                <h3>Card Details</h3>
                <div class="security-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                  </svg>
                  <span>Secured by SSL</span>
                </div>
              </div>

              <div class="card-form">
                <div class="form-group">
                  <label>Card Number</label>
                  <input 
                    v-model="cardDetails.number" 
                    type="text" 
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                    @input="formatCardNumber"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label>Expiry Date</label>
                    <input 
                      v-model="cardDetails.expiry" 
                      type="text" 
                      placeholder="MM/YY"
                      maxlength="5"
                      @input="formatExpiry"
                    />
                  </div>
                  <div class="form-group">
                    <label>CVV</label>
                    <input 
                      v-model="cardDetails.cvv" 
                      type="text" 
                      placeholder="123"
                      maxlength="3"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label>Cardholder Name</label>
                  <input 
                    v-model="cardDetails.name" 
                    type="text" 
                    placeholder="John Doe"
                  />
                </div>

                <div class="save-card-option">
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="saveCardForFuture" />
                    <span class="checkmark"></span>
                    Save this card for future purchases
                  </label>
                </div>

                <div class="card-continue-section">
                  <button
                    @click="continueToReview"
                    class="continue-btn"
                    :class="{ completed: cardFormCompleted && !isPlacingOrder, processing: isPlacingOrder }"
                    :disabled="!isCardFormValid || isPlacingOrder"
                  >
                    <span v-if="!cardFormCompleted && !isPlacingOrder">
                      Continue
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
                      </svg>
                    </span>
                    <span v-else-if="isPlacingOrder">
                      Processing Payment...
                      <svg class="loading-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                      </svg>
                    </span>
                    <span v-else>
                      Payment Completed
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Order Summary -->
        <div class="order-summary">
          <div class="summary-header">
            <div class="summary-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,7H18V6A2,2 0 0,0 16,4H8A2,2 0 0,0 6,6V7H5A1,1 0 0,0 4,8V19A3,3 0 0,0 7,22H17A3,3 0 0,0 20,19V8A1,1 0 0,0 19,7M8,6H16V7H8V6M18,19A1,1 0 0,1 17,20H7A1,1 0 0,1 6,19V9H8V10A1,1 0 0,0 9,11H10A1,1 0 0,0 11,10V9H13V10A1,1 0 0,0 14,11H15A1,1 0 0,0 16,10V9H18V19Z"/>
              </svg>
            </div>
            <h2>Order Summary</h2>
            <div class="item-count">{{ cartItemCount }} item{{ cartItemCount !== 1 ? 's' : '' }}</div>
          </div>

          <div class="summary-content">
            <!-- Product Items -->
            <div class="order-items">
              <div 
                v-for="item in cartItems" 
                :key="`${item.id}-${item.size}-${item.color}`"
                class="order-item"
              >
                <div class="item-image">
                  <img :src="item.image" :alt="item.name" />
                </div>
                <div class="item-details">
                  <h4>{{ item.name }}</h4>
                  <p class="item-brand">{{ item.brand }}</p>
                  <div class="item-options">
                    <span>Size: {{ item.size }}</span>
                    <span>Color: {{ item.color }}</span>
                  </div>
                </div>
                <div class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</div>
              </div>
            </div>

            <!-- Promo Code Section -->
            <div class="promo-section">
              <div class="promo-input">
                <input 
                  v-model="promoCode" 
                  type="text" 
                  placeholder="Enter promo code"
                  :disabled="appliedPromo"
                />
                <button 
                  @click="applyPromo" 
                  class="apply-promo-btn"
                  :disabled="!promoCode || appliedPromo"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                  </svg>
                  Apply
                </button>
              </div>
              
              <div v-if="appliedPromo" class="applied-promo">
                <div class="promo-info">
                  <span class="promo-code">{{ appliedPromo.code }}</span>
                  <span class="promo-discount">-${{ appliedPromo.discount.toFixed(2) }}</span>
                </div>
                <button @click="removePromo" class="remove-promo">×</button>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="price-summary">
              <div class="price-row">
                <span>Subtotal</span>
                <span>${{ cartTotal.toFixed(2) }}</span>
              </div>
              <div class="price-row">
                <span>Shipping</span>
                <span>${{ shippingCost.toFixed(2) }}</span>
              </div>
              <div class="price-row">
                <span>Tax</span>
                <span>${{ taxAmount.toFixed(2) }}</span>
              </div>
              <div v-if="appliedPromo" class="price-row discount">
                <span>Discount</span>
                <span>-${{ appliedPromo.discount.toFixed(2) }}</span>
              </div>
              <div class="price-row total">
                <span>Total</span>
                <span>${{ finalTotal.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Security Badges -->
            <div class="security-badges">
              <div class="security-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                </svg>
                <span>256-bit SSL Encrypted</span>
              </div>
              <div class="security-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                </svg>
                <span>Secure Payment</span>
              </div>
            </div>

            <!-- Place Order Button (Hidden for card payments) -->
            <button
              v-if="selectedPayment !== 'card'"
              @click="placeOrder"
              class="place-order-btn"
              :disabled="!selectedPayment || isPlacingOrder"
            >
              <span v-if="!isPlacingOrder">Place Order</span>
              <span v-else>Processing...</span>
            </button>

            <!-- Card Payment Message -->
            <div v-if="selectedPayment === 'card'" class="card-payment-notice">
              <div class="notice-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.11,4 20,4Z"/>
                </svg>
              </div>
              <div class="notice-text">
                <p>Fill in your card details and click <strong>Continue</strong> to complete your order</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Address Modal -->
    <div v-if="showAddressModal" class="modal-overlay" @click="closeAddressModal">
      <div class="address-modal" @click.stop>
        <div class="modal-header">
          <h3>Select or Add Address</h3>
          <button @click="closeAddressModal" class="close-btn">×</button>
        </div>
        <div class="modal-body">
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
                <div class="radio-circle" :class="{ active: selectedAddressId === address.id }">
                  <div class="radio-dot"></div>
                </div>
              </div>
              <div class="address-details">
                <h5>{{ address.name }}</h5>
                <p>{{ address.street }}</p>
                <p>{{ address.city }}, {{ address.state }} {{ address.pincode }}</p>
                <p>{{ address.phone }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Confirmation Modal -->
    <div v-if="showOrderConfirmation" class="modal-overlay" @click="closeOrderConfirmation">
      <div class="confirmation-modal" @click.stop>
        <div class="confirmation-content">
          <div class="success-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.41,10.09L6,11.5L11,16.5Z"/>
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
      // Payment
      selectedPayment: '',
      cardDetails: {
        number: '',
        expiry: '',
        cvv: '',
        name: ''
      },
      saveCardForFuture: false,
      cardFormCompleted: false,

      // Address
      showAddressModal: false,
      selectedAddressId: 1,
      savedAddresses: [
        {
          id: 1,
          name: 'Sarah Johnson',
          street: '123 Beauty Street, Apt 4B',
          city: 'New York',
          state: 'NY',
          pincode: '10001',
          phone: '+1 (555) 123-4567'
        },
        {
          id: 2,
          name: 'John Doe',
          street: '456 Oak Avenue, Suite 200',
          city: 'Los Angeles',
          state: 'CA',
          pincode: '90210',
          phone: '+1 (555) 987-6543'
        }
      ],

      // Promo
      promoCode: '',
      appliedPromo: null,
      availablePromos: [
        { code: 'SAVE10', discount: 10, type: 'fixed' },
        { code: 'WELCOME20', discount: 20, type: 'percentage' },
        { code: 'FIRST50', discount: 50, type: 'fixed' }
      ],

      // Order
      isPlacingOrder: false,
      showOrderConfirmation: false,
      orderConfirmation: {
        orderId: '',
        deliveryDate: ''
      },

      // Toast
      showToast: false,
      toast: { message: '', type: '' },

      // Pricing
      shippingCost: 5.99,
      taxRate: 8.5
    }
  },

  computed: {
    ...mapGetters('cart', ['cartItems', 'cartTotal', 'cartItemCount']),
    
    selectedAddress() {
      return this.savedAddresses.find(addr => addr.id === this.selectedAddressId) || this.savedAddresses[0]
    },

    taxAmount() {
      return (this.cartTotal * this.taxRate) / 100
    },

    discountAmount() {
      if (!this.appliedPromo) return 0
      
      if (this.appliedPromo.type === 'percentage') {
        return (this.cartTotal * this.appliedPromo.discount) / 100
      } else {
        return this.appliedPromo.discount
      }
    },

    finalTotal() {
      const total = this.cartTotal + this.shippingCost + this.taxAmount - this.discountAmount
      return Math.max(0, total)
    },

    isCardFormValid() {
      if (this.selectedPayment !== 'card') return true
      return this.cardDetails.number &&
             this.cardDetails.expiry &&
             this.cardDetails.cvv &&
             this.cardDetails.name &&
             this.cardDetails.number.replace(/\s/g, '').length >= 13 &&
             this.cardDetails.expiry.length === 5 &&
             this.cardDetails.cvv.length >= 3
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.cartItems.length === 0) {
        vm.$router.push('/cart')
      }
    })
  },

  methods: {
    selectPayment(method) {
      this.selectedPayment = method
    },

    formatCardNumber() {
      let value = this.cardDetails.number.replace(/\s/g, '').replace(/[^0-9]/gi, '')
      let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value
      this.cardDetails.number = formattedValue
    },

    formatExpiry() {
      let value = this.cardDetails.expiry.replace(/\D/g, '')
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4)
      }
      this.cardDetails.expiry = value
    },

    openAddressModal() {
      this.showAddressModal = true
    },

    closeAddressModal() {
      this.showAddressModal = false
    },

    selectAddress(address) {
      this.selectedAddressId = address.id
      this.closeAddressModal()
    },

    applyPromo() {
      const promo = this.availablePromos.find(p => p.code.toLowerCase() === this.promoCode.toLowerCase())
      
      if (promo) {
        this.appliedPromo = {
          ...promo,
          discount: promo.type === 'percentage' 
            ? (this.cartTotal * promo.discount) / 100 
            : promo.discount
        }
        this.promoCode = ''
        this.showToastMessage('Promo applied successfully!', 'success')
      } else {
        this.showToastMessage('Invalid promo code', 'error')
      }
    },

    removePromo() {
      this.appliedPromo = null
      this.showToastMessage('Promo removed', 'info')
    },

    async placeOrder() {
      if (!this.selectedPayment) {
        this.showToastMessage('Please select a payment method', 'error')
        return
      }

      if (this.selectedPayment === 'card') {
        if (!this.cardDetails.number || !this.cardDetails.expiry || !this.cardDetails.cvv || !this.cardDetails.name) {
          this.showToastMessage('Please fill in all card details', 'error')
          return
        }
      }

      // Handle UPI payment
      if (this.selectedPayment === 'upi') {
        this.redirectToUpiPayment()
        return
      }

      // Handle Wallet payment
      if (this.selectedPayment === 'wallet') {
        this.redirectToWalletPayment()
        return
      }

      // Handle Net Banking payment
      if (this.selectedPayment === 'netbanking') {
        this.redirectToNetBankingPayment()
        return
      }

      this.isPlacingOrder = true

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Generate order confirmation
      this.orderConfirmation = {
        orderId: `BM${Date.now().toString().slice(-8)}`,
        deliveryDate: this.getDeliveryDate()
      }

      this.isPlacingOrder = false
      this.showOrderConfirmation = true

      // Clear cart
      this.$store.dispatch('cart/clearCart')
    },

    redirectToUpiPayment() {
      // Store order data for UPI payment page
      const orderData = {
        deliveryAddress: this.selectedAddress,
        discount: this.appliedPromo ? this.appliedPromo.discount : 0,
        items: this.cartItems,
        subtotal: this.cartTotal,
        shipping: this.shippingCost,
        tax: this.taxAmount,
        total: this.finalTotal
      }

      localStorage.setItem('currentOrder', JSON.stringify(orderData))

      // Navigate to UPI payment page
      this.$router.push('/upi-payment')
    },

    redirectToWalletPayment() {
      // Store order data for wallet payment page
      const orderData = {
        deliveryAddress: this.selectedAddress,
        discount: this.appliedPromo ? this.appliedPromo.discount : 0,
        items: this.cartItems,
        subtotal: this.cartTotal,
        shipping: this.shippingCost,
        tax: this.taxAmount,
        total: this.finalTotal
      }

      localStorage.setItem('currentOrder', JSON.stringify(orderData))

      // Navigate to wallet payment page
      this.$router.push('/wallet-payment')
    },

    redirectToNetBankingPayment() {
      // Store order data for net banking payment page
      const orderData = {
        deliveryAddress: this.selectedAddress,
        discount: this.appliedPromo ? this.appliedPromo.discount : 0,
        items: this.cartItems,
        subtotal: this.cartTotal,
        shipping: this.shippingCost,
        tax: this.taxAmount,
        total: this.finalTotal
      }

      localStorage.setItem('currentOrder', JSON.stringify(orderData))

      // Navigate to net banking payment page
      this.$router.push('/netbanking-payment')
    },

    getDeliveryDate() {
      const date = new Date()
      date.setDate(date.getDate() + 5)
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

    async continueToReview() {
      if (!this.isCardFormValid) {
        this.showToastMessage('Please fill in all card details correctly', 'error')
        return
      }

      // Mark card form as completed
      this.cardFormCompleted = true
      this.isPlacingOrder = true

      try {
        // Simulate card payment processing
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Generate order confirmation for card payment
        this.orderConfirmation = {
          orderId: `CD${Date.now().toString().slice(-8)}`,
          deliveryDate: this.getDeliveryDate()
        }

        this.isPlacingOrder = false
        this.showOrderConfirmation = true

        // Clear cart
        this.$store.dispatch('cart/clearCart')

      } catch (error) {
        console.error('Card payment processing error:', error)
        this.showToastMessage('Payment processing failed. Please try again.', 'error')
        this.isPlacingOrder = false
        this.cardFormCompleted = false
      }
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
  background: #f8f9fa;
  padding: 2rem 0;
}

.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 2rem;
}

/* Checkout Form */
.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.checkout-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.section-icon {
  width: 24px;
  height: 24px;
  color: #e91e63;
}

.section-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.section-subtitle {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0 0 1.5rem 0;
}

/* Delivery Address */
.delivering-to .section-icon {
  background: #e91e63;
  color: white;
  border-radius: 50%;
  padding: 4px;
  width: 32px;
  height: 32px;
}

.delivery-address {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.address-info h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.address-info p {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0.125rem 0;
  line-height: 1.4;
}

.change-address-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #e91e63;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.change-address-btn:hover {
  background: #d81558;
}

.change-address-btn svg {
  width: 16px;
  height: 16px;
}

/* Payment Methods */
.payment-section .section-icon {
  background: #e91e63;
  color: white;
  border-radius: 50%;
  padding: 4px;
  width: 32px;
  height: 32px;
}

.payment-methods {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.payment-method {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.payment-method:hover {
  border-color: #e91e63;
}

.payment-method.selected {
  border-color: #e91e63;
  background: #fef7f0;
}

.payment-radio {
  position: absolute;
  top: 12px;
  right: 12px;
}

.radio-circle {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.radio-circle.active {
  border-color: #e91e63;
  background: #e91e63;
}

.radio-dot {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.radio-circle.active .radio-dot {
  opacity: 1;
}

.payment-content {
  margin-right: 2rem;
}

.payment-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.payment-icon {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.card-icon { background: #6366f1; }
.upi-icon { background: #059669; }
.wallet-icon { background: #f59e0b; }
.banking-icon { background: #3b82f6; }
.cod-icon { background: #8b5cf6; }

.payment-title {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.95rem;
}

.payment-subtitle {
  color: #6b7280;
  font-size: 0.8rem;
  margin-bottom: 0.75rem;
}

.card-brands, .wallet-brands, .bank-logos, .cod-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.card-brand {
  width: 32px;
  height: 20px;
  border-radius: 4px;
  background-size: contain;
  background-repeat: no-repeat;
}

.card-brand.visa {
  background: linear-gradient(45deg, #1a1f71, #0f3460);
}

.card-brand.mastercard {
  background: linear-gradient(45deg, #eb001b, #f79e1b);
}

.wallet-brand, .bank-logo {
  background: #f3f4f6;
  color: #6b7280;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
}

.cod-option {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  color: #6b7280;
}

.cod-option svg {
  width: 12px;
  height: 12px;
}

/* Card Details Form */
.card-details-form {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.form-header .form-icon {
  width: 20px;
  height: 20px;
  color: #e91e63;
}

.form-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.security-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #10b981;
  font-size: 0.8rem;
  font-weight: 500;
}

.security-badge svg {
  width: 14px;
  height: 14px;
}

.card-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: #374151;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #e91e63;
  box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1);
}

.save-card-option {
  margin-top: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #374151;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #e91e63;
}

/* Card Continue Section */
.card-continue-section {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.continue-btn {
  width: 100%;
  background: #e91e63;
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.continue-btn:hover:not(:disabled) {
  background: #d81558;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(233, 30, 99, 0.3);
}

.continue-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.continue-btn.completed {
  background: #10b981;
  cursor: default;
}

.continue-btn.completed:hover {
  background: #10b981;
  transform: none;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.continue-btn.processing {
  background: #3b82f6;
  cursor: default;
}

.continue-btn.processing:hover {
  background: #3b82f6;
  transform: none;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.continue-btn svg {
  width: 18px;
  height: 18px;
}

/* Order Summary */
.order-summary {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.summary-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.summary-header .summary-icon {
  width: 20px;
  height: 20px;
  color: #e91e63;
}

.summary-header h2 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-count {
  background: #e91e63;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.summary-content {
  padding: 1.5rem;
}

/* Order Items */
.order-items {
  margin-bottom: 1.5rem;
}

.order-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-details h4 {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
}

.item-brand {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0 0 0.5rem 0;
}

.item-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.item-options span {
  background: #f3f4f6;
  color: #6b7280;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
}

.item-price {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
}

/* Promo Section */
.promo-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.promo-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.promo-input input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
}

.promo-input input:focus {
  outline: none;
  border-color: #e91e63;
}

.apply-promo-btn {
  background: #e91e63;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s ease;
}

.apply-promo-btn:hover:not(:disabled) {
  background: #d81558;
}

.apply-promo-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.apply-promo-btn svg {
  width: 14px;
  height: 14px;
}

.applied-promo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ecfdf5;
  border: 1px solid #10b981;
  border-radius: 6px;
  padding: 0.75rem;
}

.promo-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.promo-code {
  font-weight: 600;
  color: #065f46;
  font-size: 0.85rem;
}

.promo-discount {
  color: #10b981;
  font-weight: 600;
  font-size: 0.9rem;
}

.remove-promo {
  background: #ef4444;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Price Summary */
.price-summary {
  margin-bottom: 1.5rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.price-row.discount {
  color: #10b981;
}

.price-row.total {
  color: #1f2937;
  font-size: 1.1rem;
  font-weight: 700;
  border-top: 1px solid #e5e7eb;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
  margin-bottom: 0;
}

/* Security Badges */
.security-badges {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.security-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10b981;
  font-size: 0.8rem;
  font-weight: 500;
}

.security-badge svg {
  width: 16px;
  height: 16px;
}

/* Place Order Button */
.place-order-btn {
  width: 100%;
  background: #e91e63;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.place-order-btn:hover:not(:disabled) {
  background: #d81558;
  transform: translateY(-1px);
}

.place-order-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

/* Card Payment Notice */
.card-payment-notice {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

.notice-icon {
  width: 24px;
  height: 24px;
  color: #0ea5e9;
  flex-shrink: 0;
}

.notice-text p {
  color: #075985;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.notice-text strong {
  color: #0c4a6e;
}

/* Modals */
.modal-overlay {
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

.address-modal, .confirmation-modal {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-btn:hover {
  background: #f3f4f6;
}

.modal-body {
  padding: 1.5rem;
}

.saved-addresses h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.address-option {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.address-option:hover {
  border-color: #e91e63;
}

.address-option.selected {
  border-color: #e91e63;
  background: #fef7f0;
}

.address-details h5 {
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
}

.address-details p {
  color: #6b7280;
  margin: 0.125rem 0;
  line-height: 1.4;
  font-size: 0.85rem;
}

/* Order Confirmation */
.confirmation-content {
  text-align: center;
  padding: 2rem;
}

.success-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.success-icon svg {
  width: 36px;
  height: 36px;
}

.confirmation-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.order-id {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.delivery-estimate {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.confirmation-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.track-order-btn, .continue-shopping-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 0.9rem;
}

.track-order-btn {
  background: #e91e63;
  color: white;
}

.track-order-btn:hover {
  background: #d81558;
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
@media (max-width: 768px) {
  .checkout-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .payment-methods {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .order-summary {
    position: static;
  }
  
  .confirmation-actions {
    flex-direction: column;
  }
  
  .modal-overlay {
    padding: 1rem;
  }
}
</style>
