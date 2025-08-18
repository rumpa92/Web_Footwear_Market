<template>
  <div class="upi-payment-page">
    <div class="payment-container">
      <!-- Header -->
      <div class="payment-header">
        <h1>UPI Payment</h1>
        <div class="payment-security">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
          </svg>
          Secure Payment
        </div>
      </div>

      <div class="payment-grid">
        <!-- Left Side - UPI Payment Options -->
        <div class="payment-options">
          <!-- Quick Pay Apps -->
          <div class="payment-section">
            <h2>Quick Pay with UPI Apps</h2>
            <p class="section-subtitle">Select your preferred UPI app to complete payment</p>
            
            <div class="upi-apps">
              <div 
                v-for="app in upiApps" 
                :key="app.id"
                class="upi-app"
                :class="{ selected: selectedApp === app.id }"
                @click="selectApp(app.id)"
              >
                <div class="app-icon" :style="{ background: app.color }">
                  <img :src="app.icon" :alt="app.name" v-if="app.icon" />
                  <span v-else>{{ app.name.charAt(0) }}</span>
                </div>
                <div class="app-details">
                  <h3>{{ app.name }}</h3>
                  <p>{{ app.description }}</p>
                </div>
                <div class="app-radio">
                  <div class="radio-circle" :class="{ active: selectedApp === app.id }">
                    <div class="radio-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- UPI ID Payment -->
          <div class="payment-section">
            <h2>Pay with UPI ID</h2>
            <p class="section-subtitle">Enter your UPI ID to pay directly</p>
            
            <div class="upi-id-form">
              <div class="form-group">
                <label>UPI ID</label>
                <div class="input-wrapper">
                  <input 
                    v-model="upiId" 
                    type="text" 
                    placeholder="yourname@paytm / yourname@gpay"
                    @input="validateUpiId"
                    :class="{ error: upiIdError }"
                  />
                  <div class="input-icon" v-if="upiIdValid">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                    </svg>
                  </div>
                </div>
                <p v-if="upiIdError" class="error-message">{{ upiIdError }}</p>
                <p v-else-if="upiIdValid" class="success-message">Valid UPI ID</p>
              </div>

              <button 
                @click="payWithUpiId" 
                class="pay-upi-btn"
                :disabled="!upiIdValid || isProcessing"
              >
                <span v-if="!isProcessing">
                  Pay ₹{{ finalTotal.toFixed(2) }}
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
                  </svg>
                </span>
                <span v-else>Processing...</span>
              </button>
            </div>
          </div>

          <!-- QR Code Section -->
          <div class="payment-section">
            <h2>Scan QR Code</h2>
            <p class="section-subtitle">Open any UPI app and scan the QR code to pay</p>
            
            <div class="qr-code-container">
              <div class="qr-code">
                <canvas ref="qrCanvas" width="200" height="200"></canvas>
              </div>
              <div class="qr-instructions">
                <div class="instruction">
                  <div class="step-number">1</div>
                  <p>Open any UPI app on your phone</p>
                </div>
                <div class="instruction">
                  <div class="step-number">2</div>
                  <p>Scan this QR code using your UPI app</p>
                </div>
                <div class="instruction">
                  <div class="step-number">3</div>
                  <p>Enter your UPI PIN to complete payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Order Summary -->
        <div class="order-summary">
          <div class="summary-header">
            <h2>Payment Summary</h2>
            <div class="payment-timer" v-if="showTimer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
              </svg>
              {{ formatTime(timeRemaining) }}
            </div>
          </div>

          <div class="summary-content">
            <!-- Items -->
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
                  <p class="item-options">{{ item.size }} | {{ item.color }}</p>
                  <p class="item-quantity">Qty: {{ item.quantity }}</p>
                </div>
                <div class="item-price">₹{{ (item.price * item.quantity).toFixed(2) }}</div>
              </div>
            </div>

            <!-- Delivery Address -->
            <div class="delivery-info">
              <h3>Delivery Address</h3>
              <div class="address">
                <p><strong>{{ deliveryAddress.name }}</strong></p>
                <p>{{ deliveryAddress.street }}</p>
                <p>{{ deliveryAddress.city }}, {{ deliveryAddress.state }} {{ deliveryAddress.pincode }}</p>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="price-breakdown">
              <div class="price-row">
                <span>Subtotal</span>
                <span>₹{{ cartTotal.toFixed(2) }}</span>
              </div>
              <div class="price-row">
                <span>Shipping</span>
                <span>₹{{ shippingCost.toFixed(2) }}</span>
              </div>
              <div class="price-row">
                <span>Tax</span>
                <span>₹{{ taxAmount.toFixed(2) }}</span>
              </div>
              <div v-if="discount" class="price-row discount">
                <span>Discount</span>
                <span>-₹{{ discount.toFixed(2) }}</span>
              </div>
              <div class="price-row total">
                <span>Total Amount</span>
                <span>₹{{ finalTotal.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Confirm Payment Button -->
            <button 
              @click="confirmPayment" 
              class="confirm-payment-btn"
              :disabled="!selectedApp || isProcessing"
              v-if="selectedApp"
            >
              <span v-if="!isProcessing">
                Pay with {{ getSelectedAppName() }}
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
                </svg>
              </span>
              <span v-else>
                Processing Payment...
                <div class="loading-spinner"></div>
              </span>
            </button>

            <!-- Security Info -->
            <div class="security-info">
              <div class="security-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                </svg>
                256-bit SSL Encrypted
              </div>
              <div class="security-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                </svg>
                UPI Secured Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Modal -->
    <div v-if="showLoadingModal" class="modal-overlay">
      <div class="loading-modal">
        <div class="loading-content">
          <div class="loading-spinner large"></div>
          <h3>Processing Payment</h3>
          <p>Please wait while we process your UPI payment...</p>
          <p class="payment-info">Amount: ₹{{ finalTotal.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UpiPayment',
  data() {
    return {
      selectedApp: '',
      upiId: '',
      upiIdValid: false,
      upiIdError: '',
      isProcessing: false,
      showLoadingModal: false,
      showTimer: true,
      timeRemaining: 600, // 10 minutes in seconds
      timerInterval: null,
      
      upiApps: [
        {
          id: 'gpay',
          name: 'Google Pay',
          description: 'Pay with Google Pay',
          color: '#4285f4',
          icon: null
        },
        {
          id: 'phonepe',
          name: 'PhonePe',
          description: 'Pay with PhonePe',
          color: '#5f259f',
          icon: null
        },
        {
          id: 'paytm',
          name: 'Paytm',
          description: 'Pay with Paytm',
          color: '#00baf2',
          icon: null
        },
        {
          id: 'bhim',
          name: 'BHIM UPI',
          description: 'Pay with BHIM',
          color: '#ff6b35',
          icon: null
        },
        {
          id: 'amazon',
          name: 'Amazon Pay',
          description: 'Pay with Amazon Pay',
          color: '#ff9900',
          icon: null
        },
        {
          id: 'freecharge',
          name: 'Freecharge',
          description: 'Pay with Freecharge',
          color: '#7c4dff',
          icon: null
        }
      ],

      deliveryAddress: {
        name: 'Sarah Johnson',
        street: '123 Beauty Street, Apt 4B',
        city: 'New York',
        state: 'NY',
        pincode: '10001'
      },

      shippingCost: 5.99,
      taxRate: 8.5,
      discount: 0
    }
  },

  computed: {
    ...mapGetters('cart', ['cartItems', 'cartTotal']),
    
    taxAmount() {
      return (this.cartTotal * this.taxRate) / 100
    },

    finalTotal() {
      return this.cartTotal + this.shippingCost + this.taxAmount - this.discount
    }
  },

  mounted() {
    this.generateQRCode()
    this.startTimer()
    
    // Get order data from route params or localStorage
    const orderData = this.$route.params.orderData || JSON.parse(localStorage.getItem('currentOrder') || '{}')
    if (orderData.deliveryAddress) {
      this.deliveryAddress = orderData.deliveryAddress
    }
    if (orderData.discount) {
      this.discount = orderData.discount
    }
  },

  beforeDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
    }
  },

  methods: {
    selectApp(appId) {
      this.selectedApp = appId
    },

    getSelectedAppName() {
      const app = this.upiApps.find(app => app.id === this.selectedApp)
      return app ? app.name : ''
    },

    validateUpiId() {
      const upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/
      
      if (!this.upiId) {
        this.upiIdError = ''
        this.upiIdValid = false
        return
      }

      if (this.upiId.length < 3) {
        this.upiIdError = 'UPI ID is too short'
        this.upiIdValid = false
        return
      }

      if (!upiPattern.test(this.upiId)) {
        this.upiIdError = 'Please enter a valid UPI ID (example@paytm)'
        this.upiIdValid = false
        return
      }

      this.upiIdError = ''
      this.upiIdValid = true
    },

    async payWithUpiId() {
      if (!this.upiIdValid) return
      
      this.isProcessing = true
      this.showLoadingModal = true
      
      try {
        // Simulate UPI payment processing
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // Generate order ID and redirect to confirmation
        const orderId = `UPI${Date.now().toString().slice(-8)}`
        this.redirectToConfirmation(orderId)
        
      } catch (error) {
        console.error('Payment failed:', error)
        this.showErrorMessage('Payment failed. Please try again.')
      } finally {
        this.isProcessing = false
        this.showLoadingModal = false
      }
    },

    async confirmPayment() {
      if (!this.selectedApp) return
      
      this.isProcessing = true
      this.showLoadingModal = true
      
      try {
        // Simulate opening UPI app and processing payment
        await new Promise(resolve => setTimeout(resolve, 4000))
        
        // Generate order ID and redirect to confirmation
        const orderId = `UPI${Date.now().toString().slice(-8)}`
        this.redirectToConfirmation(orderId)
        
      } catch (error) {
        console.error('Payment failed:', error)
        this.showErrorMessage('Payment failed. Please try again.')
      } finally {
        this.isProcessing = false
        this.showLoadingModal = false
      }
    },

    redirectToConfirmation(orderId) {
      // Store order details for confirmation page
      const orderDetails = {
        orderId,
        amount: this.finalTotal,
        items: this.cartItems,
        deliveryAddress: this.deliveryAddress,
        paymentMethod: 'UPI',
        paymentApp: this.getSelectedAppName() || 'UPI ID',
        timestamp: new Date().toISOString()
      }
      
      localStorage.setItem('orderConfirmation', JSON.stringify(orderDetails))
      
      // Clear cart
      this.$store.dispatch('cart/clearCart')
      
      // Redirect to order confirmation
      this.$router.push('/order-confirmation')
    },

    generateQRCode() {
      // Simple QR code generation (in real app, use a proper QR library)
      this.$nextTick(() => {
        const canvas = this.$refs.qrCanvas
        if (!canvas) return
        
        const ctx = canvas.getContext('2d')
        
        // Clear canvas
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, 200, 200)
        
        // Draw simple QR-like pattern
        ctx.fillStyle = '#000000'
        
        // Create a simple pattern
        for (let i = 0; i < 20; i++) {
          for (let j = 0; j < 20; j++) {
            if (Math.random() > 0.5) {
              ctx.fillRect(i * 10, j * 10, 10, 10)
            }
          }
        }
        
        // Add corner markers
        ctx.fillRect(0, 0, 70, 70)
        ctx.fillRect(130, 0, 70, 70)
        ctx.fillRect(0, 130, 70, 70)
        
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(10, 10, 50, 50)
        ctx.fillRect(140, 10, 50, 50)
        ctx.fillRect(10, 140, 50, 50)
        
        ctx.fillStyle = '#000000'
        ctx.fillRect(20, 20, 30, 30)
        ctx.fillRect(150, 20, 30, 30)
        ctx.fillRect(20, 150, 30, 30)
      })
    },

    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timeRemaining--
        if (this.timeRemaining <= 0) {
          this.timeRemaining = 0
          this.showTimer = false
          clearInterval(this.timerInterval)
        }
      }, 1000)
    },

    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    },

    showErrorMessage(message) {
      // You can implement a toast notification here
      alert(message)
    }
  }
}
</script>

<style scoped>
.upi-payment-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.payment-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Header */
.payment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f3f4f6;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #e5e7eb;
}

.back-btn svg {
  width: 20px;
  height: 20px;
}

.payment-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.payment-security {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10b981;
  font-weight: 500;
  font-size: 0.9rem;
}

.payment-security svg {
  width: 18px;
  height: 18px;
}

/* Payment Grid */
.payment-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

/* Payment Options */
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.payment-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.payment-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.section-subtitle {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0 0 1.5rem 0;
}

/* UPI Apps */
.upi-apps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.upi-app {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.upi-app:hover {
  border-color: #e91e63;
}

.upi-app.selected {
  border-color: #e91e63;
  background: #fef7f0;
}

.app-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.app-icon img {
  width: 32px;
  height: 32px;
}

.app-details {
  flex: 1;
}

.app-details h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.app-details p {
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0;
}

.app-radio .radio-circle {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.app-radio .radio-circle.active {
  border-color: #e91e63;
  background: #e91e63;
}

.app-radio .radio-dot {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.app-radio .radio-circle.active .radio-dot {
  opacity: 1;
}

/* UPI ID Form */
.upi-id-form {
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  color: #374151;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #e91e63;
}

.input-wrapper input.error {
  border-color: #ef4444;
}

.input-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #10b981;
}

.input-icon svg {
  width: 18px;
  height: 18px;
}

.error-message {
  color: #ef4444;
  font-size: 0.8rem;
  margin: 0.5rem 0 0 0;
}

.success-message {
  color: #10b981;
  font-size: 0.8rem;
  margin: 0.5rem 0 0 0;
}

.pay-upi-btn {
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
  margin-top: 1rem;
}

.pay-upi-btn:hover:not(:disabled) {
  background: #d81558;
  transform: translateY(-1px);
}

.pay-upi-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.pay-upi-btn svg {
  width: 18px;
  height: 18px;
}

/* QR Code */
.qr-code-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.qr-code {
  flex-shrink: 0;
  padding: 1rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  text-align: center;
}

.qr-instructions {
  flex: 1;
}

.instruction {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.step-number {
  width: 24px;
  height: 24px;
  background: #e91e63;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
}

.instruction p {
  color: #374151;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
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

.summary-header h2 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.payment-timer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f59e0b;
  font-weight: 600;
  font-size: 0.9rem;
}

.payment-timer svg {
  width: 16px;
  height: 16px;
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
}

.item-options {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0 0 0.25rem 0;
}

.item-quantity {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0;
}

.item-price {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
}

/* Delivery Info */
.delivery-info {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.delivery-info h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.75rem 0;
}

.address p {
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0.125rem 0;
  line-height: 1.4;
}

/* Price Breakdown */
.price-breakdown {
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

/* Confirm Payment Button */
.confirm-payment-btn {
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.confirm-payment-btn:hover:not(:disabled) {
  background: #d81558;
  transform: translateY(-1px);
}

.confirm-payment-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.confirm-payment-btn svg {
  width: 18px;
  height: 18px;
}

/* Security Info */
.security-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

/* Loading Modal */
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
}

.loading-modal {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.loading-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 1rem 0 0.5rem 0;
}

.loading-content p {
  color: #6b7280;
  margin: 0.5rem 0;
}

.payment-info {
  color: #e91e63 !important;
  font-weight: 600;
  font-size: 1.1rem;
}

/* Loading Spinner */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #e91e63;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-spinner.large {
  width: 48px;
  height: 48px;
  border-width: 4px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .payment-grid {
    grid-template-columns: 1fr;
  }
  
  .order-summary {
    position: static;
  }
  
  .qr-code-container {
    flex-direction: column;
    align-items: center;
  }
  
  .upi-apps {
    grid-template-columns: 1fr;
  }
  
  .payment-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
