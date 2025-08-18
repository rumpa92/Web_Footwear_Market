<template>
  <div class="wallet-payment-page">
    <div class="payment-container">
      <!-- Header -->
      <div class="payment-header">
        <h1>Wallet Payment</h1>
        <div class="payment-security">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
          </svg>
          Secure Payment
        </div>
      </div>

      <div class="payment-grid">
        <!-- Left Side - Wallet Selection & Payment -->
        <div class="wallet-options">
          <!-- Wallet Selection -->
          <div class="payment-section">
            <h2>Select Your Wallet</h2>
            <p class="section-subtitle">Choose from your linked wallets</p>
            
            <div class="wallets-list">
              <div 
                v-for="wallet in wallets" 
                :key="wallet.id"
                class="wallet-card"
                :class="{ 
                  selected: selectedWallet === wallet.id,
                  'low-balance': wallet.balance < finalTotal 
                }"
                @click="selectWallet(wallet.id)"
              >
                <div class="wallet-header">
                  <div class="wallet-logo" :style="{ background: wallet.color }">
                    <img :src="wallet.logo" :alt="wallet.name" v-if="wallet.logo" />
                    <span v-else>{{ wallet.name.charAt(0) }}</span>
                  </div>
                  <div class="wallet-info">
                    <h3>{{ wallet.name }}</h3>
                    <p class="wallet-id">{{ wallet.walletId }}</p>
                  </div>
                  <div class="wallet-radio">
                    <div class="radio-circle" :class="{ active: selectedWallet === wallet.id }">
                      <div class="radio-dot"></div>
                    </div>
                  </div>
                </div>
                
                <div class="wallet-balance">
                  <div class="balance-info">
                    <span class="balance-label">Available Balance</span>
                    <span class="balance-amount" :class="{ 'low-balance': wallet.balance < finalTotal }">
                      ₹{{ wallet.balance.toFixed(2) }}
                    </span>
                  </div>
                  
                  <div v-if="wallet.balance < finalTotal" class="insufficient-balance">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>
                    </svg>
                    Insufficient Balance
                  </div>
                </div>

                <!-- Offers Section -->
                <div v-if="wallet.offers && wallet.offers.length > 0" class="wallet-offers">
                  <div class="offers-header">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V7H9V9H3V19A2,2 0 0,0 5,21H10V19H5V9H21Z"/>
                    </svg>
                    Available Offers
                  </div>
                  <div class="offers-list">
                    <div v-for="offer in wallet.offers" :key="offer.id" class="offer-item">
                      <span class="offer-text">{{ offer.text }}</span>
                      <span class="offer-value">{{ offer.value }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Top-up Section -->
          <div v-if="selectedWalletData && selectedWalletData.balance < finalTotal" class="payment-section topup-section">
            <h2>Add Money to Wallet</h2>
            <p class="section-subtitle">You need ₹{{ (finalTotal - selectedWalletData.balance).toFixed(2) }} more to complete this payment</p>
            
            <div class="topup-options">
              <div class="quick-amounts">
                <h4>Quick Add</h4>
                <div class="amount-buttons">
                  <button 
                    v-for="amount in quickTopupAmounts" 
                    :key="amount"
                    @click="selectTopupAmount(amount)"
                    class="amount-btn"
                    :class="{ selected: selectedTopupAmount === amount }"
                  >
                    ₹{{ amount }}
                  </button>
                </div>
              </div>
              
              <div class="custom-amount">
                <h4>Custom Amount</h4>
                <div class="amount-input">
                  <input 
                    v-model="customTopupAmount" 
                    type="number" 
                    placeholder="Enter amount"
                    min="1"
                    @input="onCustomAmountChange"
                  />
                  <button 
                    @click="addMoney" 
                    class="add-money-btn"
                    :disabled="!selectedTopupAmount || isAddingMoney"
                  >
                    <span v-if="!isAddingMoney">Add Money</span>
                    <span v-else>Adding...</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Confirmation -->
          <div v-if="selectedWalletData && selectedWalletData.balance >= finalTotal" class="payment-section">
            <h2>Payment Details</h2>
            <div class="payment-breakdown">
              <div class="breakdown-row">
                <span>Total Amount</span>
                <span>₹{{ finalTotal.toFixed(2) }}</span>
              </div>
              <div class="breakdown-row">
                <span>Wallet Balance</span>
                <span>₹{{ selectedWalletData.balance.toFixed(2) }}</span>
              </div>
              <div class="breakdown-row final">
                <span>Remaining Balance</span>
                <span>₹{{ (selectedWalletData.balance - finalTotal).toFixed(2) }}</span>
              </div>
            </div>

            <!-- Applied Offers -->
            <div v-if="appliedOffer" class="applied-offer">
              <div class="offer-header">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                </svg>
                Offer Applied
              </div>
              <div class="offer-details">
                <span>{{ appliedOffer.text }}</span>
                <span class="offer-savings">You saved {{ appliedOffer.value }}</span>
              </div>
            </div>

            <button 
              @click="confirmPayment" 
              class="confirm-payment-btn"
              :disabled="isProcessing"
            >
              <span v-if="!isProcessing">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                </svg>
                Pay ₹{{ finalTotal.toFixed(2) }}
              </span>
              <span v-else>
                Processing...
                <div class="loading-spinner"></div>
              </span>
            </button>
          </div>
        </div>

        <!-- Right Side - Order Summary -->
        <div class="order-summary">
          <div class="summary-header">
            <h2>Order Summary</h2>
            <div class="payment-method-info" v-if="selectedWalletData">
              <div class="method-badge">
                <div class="method-logo" :style="{ background: selectedWalletData.color }">
                  <span>{{ selectedWalletData.name.charAt(0) }}</span>
                </div>
                {{ selectedWalletData.name }}
              </div>
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
              <div v-if="appliedOffer" class="price-row cashback">
                <span>{{ appliedOffer.text }}</span>
                <span>{{ appliedOffer.value }}</span>
              </div>
              <div class="price-row total">
                <span>Total Amount</span>
                <span>₹{{ finalTotal.toFixed(2) }}</span>
              </div>
            </div>

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
                Wallet Secured Payment
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
          <p>Please wait while we process your wallet payment...</p>
          <p class="payment-info">Amount: ₹{{ finalTotal.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'WalletPayment',
  data() {
    return {
      selectedWallet: '',
      selectedTopupAmount: 0,
      customTopupAmount: '',
      isAddingMoney: false,
      isProcessing: false,
      showLoadingModal: false,
      appliedOffer: null,
      
      quickTopupAmounts: [100, 200, 500, 1000, 2000],
      
      wallets: [
        {
          id: 'paytm',
          name: 'Paytm Wallet',
          walletId: '98**********45',
          balance: 850.75,
          color: '#00baf2',
          logo: null,
          offers: [
            { id: 1, text: 'Cashback 5%', value: 'Up to ₹50' },
            { id: 2, text: 'First Payment', value: '₹25 bonus' }
          ]
        },
        {
          id: 'gpay',
          name: 'Google Pay',
          walletId: '92**********78',
          balance: 125.50,
          color: '#4285f4',
          logo: null,
          offers: [
            { id: 1, text: 'Scratch Card', value: 'Win up to ₹1000' }
          ]
        },
        {
          id: 'phonepe',
          name: 'PhonePe Wallet',
          walletId: '95**********23',
          balance: 1250.00,
          color: '#5f259f',
          logo: null,
          offers: [
            { id: 1, text: 'Cashback 3%', value: 'Up to ₹75' },
            { id: 2, text: 'Weekend Special', value: '₹20 extra' }
          ]
        },
        {
          id: 'amazon',
          name: 'Amazon Pay',
          walletId: '97**********56',
          balance: 75.25,
          color: '#ff9900',
          logo: null,
          offers: [
            { id: 1, text: 'Prime Reward', value: '₹30 back' }
          ]
        },
        {
          id: 'mobikwik',
          name: 'MobiKwik',
          walletId: '91**********89',
          balance: 450.00,
          color: '#2874f0',
          logo: null,
          offers: [
            { id: 1, text: 'SuperCash 10%', value: 'Up to ₹100' }
          ]
        },
        {
          id: 'freecharge',
          name: 'Freecharge',
          walletId: '93**********12',
          balance: 320.80,
          color: '#7c4dff',
          logo: null,
          offers: [
            { id: 1, text: 'Instant Discount', value: '₹15 off' }
          ]
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
    },

    selectedWalletData() {
      return this.wallets.find(wallet => wallet.id === this.selectedWallet)
    }
  },

  mounted() {
    // Get order data from route params or localStorage
    const orderData = this.$route.params.orderData || JSON.parse(localStorage.getItem('currentOrder') || '{}')
    if (orderData.deliveryAddress) {
      this.deliveryAddress = orderData.deliveryAddress
    }
    if (orderData.discount) {
      this.discount = orderData.discount
    }

    // Auto-select first wallet with sufficient balance
    const sufficientWallet = this.wallets.find(wallet => wallet.balance >= this.finalTotal)
    if (sufficientWallet) {
      this.selectedWallet = sufficientWallet.id
      this.autoApplyOffer()
    }
  },

  methods: {
    selectWallet(walletId) {
      this.selectedWallet = walletId
      this.autoApplyOffer()
    },

    autoApplyOffer() {
      const wallet = this.selectedWalletData
      if (wallet && wallet.offers && wallet.offers.length > 0) {
        // Auto-apply best offer
        this.appliedOffer = wallet.offers[0]
      }
    },

    selectTopupAmount(amount) {
      this.selectedTopupAmount = amount
      this.customTopupAmount = amount.toString()
    },

    onCustomAmountChange() {
      this.selectedTopupAmount = parseFloat(this.customTopupAmount) || 0
    },

    async addMoney() {
      if (!this.selectedTopupAmount || this.selectedTopupAmount <= 0) return
      
      this.isAddingMoney = true
      
      try {
        // Simulate adding money to wallet
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Update wallet balance
        const wallet = this.selectedWalletData
        if (wallet) {
          wallet.balance += this.selectedTopupAmount
          this.showSuccessMessage(`₹${this.selectedTopupAmount} added to your ${wallet.name}`)
          this.selectedTopupAmount = 0
          this.customTopupAmount = ''
        }
        
      } catch (error) {
        console.error('Failed to add money:', error)
        this.showErrorMessage('Failed to add money. Please try again.')
      } finally {
        this.isAddingMoney = false
      }
    },

    async confirmPayment() {
      if (!this.selectedWalletData) return
      
      this.isProcessing = true
      this.showLoadingModal = true
      
      try {
        // Simulate wallet payment processing
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // Generate order ID and redirect to confirmation
        const orderId = `WAL${Date.now().toString().slice(-8)}`
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
        paymentMethod: 'Wallet',
        paymentApp: this.selectedWalletData.name,
        timestamp: new Date().toISOString(),
        appliedOffer: this.appliedOffer
      }
      
      localStorage.setItem('orderConfirmation', JSON.stringify(orderDetails))
      
      // Clear cart
      this.$store.dispatch('cart/clearCart')
      
      // Redirect to order confirmation
      this.$router.push('/order-confirmation')
    },

    showSuccessMessage(message) {
      // You can implement a toast notification here
      alert(message)
    },

    showErrorMessage(message) {
      // You can implement a toast notification here
      alert(message)
    }
  }
}
</script>

<style scoped>
.wallet-payment-page {
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

/* Wallet Options */
.wallet-options {
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

/* Wallets List */
.wallets-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.wallet-card {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.wallet-card:hover {
  border-color: #e91e63;
}

.wallet-card.selected {
  border-color: #e91e63;
  background: #fef7f0;
}

.wallet-card.low-balance {
  border-color: #fbbf24;
  background: #fffbeb;
}

.wallet-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.wallet-logo {
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

.wallet-info {
  flex: 1;
}

.wallet-info h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.wallet-id {
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0;
}

.wallet-radio .radio-circle {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.wallet-radio .radio-circle.active {
  border-color: #e91e63;
  background: #e91e63;
}

.wallet-radio .radio-dot {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.wallet-radio .radio-circle.active .radio-dot {
  opacity: 1;
}

/* Wallet Balance */
.wallet-balance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.balance-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.balance-label {
  color: #6b7280;
  font-size: 0.85rem;
}

.balance-amount {
  font-size: 1.1rem;
  font-weight: 700;
  color: #10b981;
}

.balance-amount.low-balance {
  color: #ef4444;
}

.insufficient-balance {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ef4444;
  font-size: 0.85rem;
  font-weight: 500;
}

.insufficient-balance svg {
  width: 16px;
  height: 16px;
}

/* Wallet Offers */
.wallet-offers {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

.offers-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f59e0b;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.offers-header svg {
  width: 16px;
  height: 16px;
}

.offers-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.offer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fef3c7;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #fbbf24;
}

.offer-text {
  color: #92400e;
  font-size: 0.85rem;
}

.offer-value {
  color: #f59e0b;
  font-size: 0.85rem;
  font-weight: 600;
}

/* Top-up Section */
.topup-section {
  border: 2px solid #fbbf24;
  background: #fffbeb;
}

.topup-options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.quick-amounts h4,
.custom-amount h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.75rem 0;
}

.amount-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.75rem;
}

.amount-btn {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.amount-btn:hover {
  border-color: #e91e63;
}

.amount-btn.selected {
  border-color: #e91e63;
  background: #fef7f0;
  color: #e91e63;
}

.amount-input {
  display: flex;
  gap: 0.75rem;
}

.amount-input input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}

.amount-input input:focus {
  outline: none;
  border-color: #e91e63;
}

.add-money-btn {
  background: #e91e63;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.add-money-btn:hover:not(:disabled) {
  background: #d81558;
}

.add-money-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

/* Payment Breakdown */
.payment-breakdown {
  margin-bottom: 1.5rem;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.breakdown-row.final {
  color: #1f2937;
  font-weight: 600;
  border-top: 1px solid #e5e7eb;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
}

/* Applied Offer */
.applied-offer {
  background: #ecfdf5;
  border: 1px solid #10b981;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.offer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #065f46;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.offer-header svg {
  width: 16px;
  height: 16px;
}

.offer-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.offer-savings {
  color: #10b981;
  font-weight: 600;
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

.payment-method-info {
  display: flex;
  align-items: center;
}

.method-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f3f4f6;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #374151;
}

.method-logo {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
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

.price-row.cashback {
  color: #f59e0b;
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
  
  .amount-buttons {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .payment-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .wallet-header {
    flex-wrap: wrap;
  }
  
  .amount-input {
    flex-direction: column;
  }
}
</style>
