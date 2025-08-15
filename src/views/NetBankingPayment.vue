<template>
  <div class="netbanking-payment-page">
    <div class="netbanking-container">
      <!-- Header Section -->
      <div class="payment-header">
        <button @click="goBack" class="back-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
          </svg>
          Back to Payment
        </button>
        
        <div class="header-content">
          <div class="payment-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M5,6.09L7.91,3H16.09L19,6.09V17.91L16.09,21H7.91L5,17.91V6.09M11,8V14H13V8H11M11,16V18H13V16H11Z"/>
            </svg>
          </div>
          <div class="header-text">
            <h1>Net Banking</h1>
            <p>Select your bank to complete the payment securely</p>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="payment-grid">
        <!-- Left Side - Bank Selection -->
        <div class="bank-selection-section">
          <!-- Search Bar -->
          <div class="search-section">
            <div class="search-box">
              <svg class="search-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
              </svg>
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search for your bank..."
                @input="filterBanks"
              />
              <button v-if="searchQuery" @click="clearSearch" class="clear-search">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Popular Banks Section -->
          <div v-if="!searchQuery" class="popular-banks-section">
            <h3>Popular Banks</h3>
            <div class="banks-grid">
              <div 
                v-for="bank in popularBanks" 
                :key="bank.id"
                class="bank-card"
                :class="{ selected: selectedBank?.id === bank.id }"
                @click="selectBank(bank)"
              >
                <div class="bank-radio">
                  <div class="radio-circle" :class="{ active: selectedBank?.id === bank.id }">
                    <div class="radio-dot"></div>
                  </div>
                </div>
                <div class="bank-logo">
                  <svg class="bank-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5,6.09L7.91,3H16.09L19,6.09V17.91L16.09,21H7.91L5,17.91V6.09M11,8V14H13V8H11M11,16V18H13V16H11Z"/>
                  </svg>
                </div>
                <div class="bank-info">
                  <h4>{{ bank.name }}</h4>
                  <p>{{ bank.description }}</p>
                </div>
                <div class="bank-status">
                  <span class="status-indicator" :class="bank.status">
                    <svg v-if="bank.status === 'available'" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                    </svg>
                    {{ bank.status === 'available' ? 'Available' : 'Maintenance' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Search Results Section (only when searching) -->
          <div v-if="searchQuery" class="search-results-section">
            <h3>Search Results</h3>
            <div v-if="filteredBanks.length === 0" class="no-results">
              <div class="no-results-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                </svg>
              </div>
              <h4>No banks found</h4>
              <p>Try searching with a different keyword from the popular banks available.</p>
              <button @click="clearSearch" class="browse-all-btn">View Popular Banks</button>
            </div>

            <div v-else class="banks-list">
              <div
                v-for="bank in filteredBanks"
                :key="bank.id"
                class="bank-list-item"
                :class="{
                  selected: selectedBank?.id === bank.id,
                  disabled: bank.status !== 'available'
                }"
                @click="selectBank(bank)"
              >
                <div class="bank-radio">
                  <div class="radio-circle" :class="{ active: selectedBank?.id === bank.id }">
                    <div class="radio-dot"></div>
                  </div>
                </div>
                <div class="bank-details">
                  <div class="bank-name">{{ bank.name }}</div>
                  <div class="bank-description">{{ bank.description }}</div>
                </div>
                <div class="bank-status">
                  <span class="status-indicator" :class="bank.status">
                    <svg v-if="bank.status === 'available'" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                    </svg>
                    {{ bank.status === 'available' ? 'Available' : 'Under Maintenance' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Security Notice -->
          <div class="security-notice">
            <div class="security-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
              </svg>
            </div>
            <div class="security-content">
              <h4>Secure Payment Gateway</h4>
              <p>You will be redirected to your bank's secure payment gateway. Your banking credentials will be processed directly by your bank and will not be shared with us.</p>
            </div>
          </div>
        </div>

        <!-- Right Side - Order Summary -->
        <div class="order-summary-section">
          <div class="order-summary">
            <div class="summary-header">
              <div class="summary-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,7H18V6A2,2 0 0,0 16,4H8A2,2 0 0,0 6,6V7H5A1,1 0 0,0 4,8V19A3,3 0 0,0 7,22H17A3,3 0 0,0 20,19V8A1,1 0 0,0 19,7M8,6H16V7H8V6M18,19A1,1 0 0,1 17,20H7A1,1 0 0,1 6,19V9H8V10A1,1 0 0,0 9,11H10A1,1 0 0,0 11,10V9H13V10A1,1 0 0,0 14,11H15A1,1 0 0,0 16,10V9H18V19Z"/>
                </svg>
              </div>
              <h3>Order Summary</h3>
              <div class="item-count">{{ orderData.items?.length || 0 }} item{{ (orderData.items?.length || 0) !== 1 ? 's' : '' }}</div>
            </div>

            <div class="summary-content">
              <!-- Order Items -->
              <div class="order-items" v-if="orderData.items && orderData.items.length > 0">
                <div 
                  v-for="item in orderData.items" 
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
                      <span>Qty: {{ item.quantity }}</span>
                    </div>
                  </div>
                  <div class="item-price">₹{{ (item.price * item.quantity).toFixed(2) }}</div>
                </div>
              </div>

              <!-- Price Breakdown -->
              <div class="price-summary">
                <div class="price-row">
                  <span>Subtotal</span>
                  <span>₹{{ orderData.subtotal?.toFixed(2) || '0.00' }}</span>
                </div>
                <div class="price-row">
                  <span>Shipping</span>
                  <span>₹{{ orderData.shipping?.toFixed(2) || '0.00' }}</span>
                </div>
                <div class="price-row">
                  <span>Tax</span>
                  <span>₹{{ orderData.tax?.toFixed(2) || '0.00' }}</span>
                </div>
                <div v-if="orderData.discount && orderData.discount > 0" class="price-row discount">
                  <span>Discount</span>
                  <span>-₹{{ orderData.discount.toFixed(2) }}</span>
                </div>
                <div class="price-row total">
                  <span>Total Payable</span>
                  <span>₹{{ orderData.total?.toFixed(2) || '0.00' }}</span>
                </div>
              </div>

              <!-- Proceed to Pay Button -->
              <button 
                @click="proceedToPay" 
                class="proceed-pay-btn"
                :disabled="!selectedBank || selectedBank.status !== 'available' || isProcessing"
              >
                <span v-if="!isProcessing">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                  </svg>
                  Proceed to Pay ₹{{ orderData.total?.toFixed(2) || '0.00' }}
                </span>
                <span v-else>
                  <svg class="loading-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                  </svg>
                  Redirecting to {{ selectedBank?.name }}...
                </span>
              </button>

              <!-- Selected Bank Info -->
              <div v-if="selectedBank" class="selected-bank-info">
                <div class="bank-preview">
                  <img :src="selectedBank.logo" :alt="selectedBank.name" />
                  <div class="bank-text">
                    <div class="bank-name">{{ selectedBank.name }}</div>
                    <div class="bank-redirect">You will be redirected to {{ selectedBank.name }}'s secure gateway</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Processing Modal -->
    <div v-if="showProcessingModal" class="modal-overlay">
      <div class="processing-modal">
        <div class="processing-animation">
          <div class="loading-spinner"></div>
        </div>
        <h3>Redirecting to {{ selectedBank?.name }}</h3>
        <p>Please wait while we securely redirect you to your bank's payment gateway...</p>
        <div class="security-info">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
          </svg>
          <span>Secured by SSL encryption</span>
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
export default {
  name: 'NetBankingPayment',
  data() {
    return {
      searchQuery: '',
      selectedBank: null,
      isProcessing: false,
      showProcessingModal: false,
      orderData: {},
      
      // Toast
      showToast: false,
      toast: { message: '', type: '' },

      // Popular banks - shown prominently
      popularBanks: [
        {
          id: 'sbi',
          name: 'State Bank of India',
          description: 'India\'s largest bank',
          status: 'available'
        },
        {
          id: 'hdfc',
          name: 'HDFC Bank',
          description: 'Private banking leader',
          status: 'available'
        },
        {
          id: 'icici',
          name: 'ICICI Bank',
          description: 'Digital banking pioneer',
          status: 'available'
        },
        {
          id: 'axis',
          name: 'Axis Bank',
          description: 'Modern banking solutions',
          status: 'available'
        },
        {
          id: 'kotak',
          name: 'Kotak Mahindra Bank',
          description: 'Premium banking services',
          status: 'available'
        },
        {
          id: 'pnb',
          name: 'Punjab National Bank',
          description: 'Trusted nationwide banking',
          status: 'available'
        }
      ],

      filteredBanks: []
    }
  },

  mounted() {
    this.loadOrderData()
  },

  methods: {
    loadOrderData() {
      // Get order data from localStorage
      const orderData = localStorage.getItem('currentOrder')
      if (orderData) {
        this.orderData = JSON.parse(orderData)
      } else {
        // Fallback data for testing
        this.orderData = {
          items: [],
          subtotal: 0,
          shipping: 0,
          tax: 0,
          total: 0,
          deliveryAddress: {}
        }
      }
    },

    goBack() {
      this.$router.go(-1)
    },

    selectBank(bank) {
      if (bank.status !== 'available') {
        this.showToastMessage('This bank is currently under maintenance. Please select another bank.', 'error')
        return
      }
      this.selectedBank = bank
    },

    filterBanks() {
      if (!this.searchQuery.trim()) {
        this.filteredBanks = []
        return
      }

      const query = this.searchQuery.toLowerCase()
      this.filteredBanks = this.popularBanks.filter(bank =>
        bank.name.toLowerCase().includes(query) ||
        bank.description.toLowerCase().includes(query)
      )
    },

    clearSearch() {
      this.searchQuery = ''
      this.filteredBanks = []
    },

    async proceedToPay() {
      if (!this.selectedBank) {
        this.showToastMessage('Please select a bank to proceed', 'error')
        return
      }

      if (this.selectedBank.status !== 'available') {
        this.showToastMessage('Selected bank is currently under maintenance', 'error')
        return
      }

      this.isProcessing = true
      this.showProcessingModal = true

      try {
        // Simulate bank redirect process
        await new Promise(resolve => setTimeout(resolve, 3000))

        // Store order confirmation data
        const orderConfirmation = {
          orderId: `NB${Date.now().toString().slice(-8)}`,
          amount: this.orderData.total,
          timestamp: new Date().toISOString(),
          paymentMethod: 'Net Banking',
          paymentApp: this.selectedBank.name,
          deliveryAddress: this.orderData.deliveryAddress,
          items: this.orderData.items
        }

        localStorage.setItem('orderConfirmation', JSON.stringify(orderConfirmation))

        // Redirect to order confirmation
        this.$router.push('/order-confirmation')

      } catch (error) {
        console.error('Payment processing error:', error)
        this.showToastMessage('Payment processing failed. Please try again.', 'error')
      } finally {
        this.isProcessing = false
        this.showProcessingModal = false
      }
    },

    showToastMessage(message, type = 'info') {
      this.toast = { message, type }
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 4000)
    }
  }
}
</script>

<style scoped>
.netbanking-payment-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem 0;
}

.netbanking-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header Section */
.payment-header {
  margin-bottom: 2rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #6b7280;
  border: 1px solid #e5e7eb;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;
}

.back-btn:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.back-btn svg {
  width: 18px;
  height: 18px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.payment-icon {
  width: 48px;
  height: 48px;
  background: #e91e63;
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-text h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.header-text p {
  color: #6b7280;
  margin: 0;
  font-size: 1rem;
}

/* Main Content Grid */
.payment-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

/* Bank Selection Section */
.bank-selection-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Search Section */
.search-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  width: 20px;
  height: 20px;
  color: #9ca3af;
  z-index: 1;
}

.search-box input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #e91e63;
  box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1);
}

.clear-search {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.clear-search:hover {
  color: #6b7280;
  background: #f3f4f6;
}

.clear-search svg {
  width: 18px;
  height: 18px;
}

/* Popular Banks Section */
.popular-banks-section,
.search-results-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.popular-banks-section h3,
.search-results-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.banks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
}

.bank-card {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.bank-card:hover {
  border-color: #e91e63;
  box-shadow: 0 4px 12px rgba(233, 30, 99, 0.1);
}

.bank-card.selected {
  border-color: #e91e63;
  background: #fef7f0;
}

.bank-radio {
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

.bank-logo {
  width: 80px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.bank-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bank-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.bank-info p {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.bank-status {
  margin-top: auto;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-indicator.available {
  color: #10b981;
}

.status-indicator.maintenance {
  color: #f59e0b;
}

.status-indicator svg {
  width: 14px;
  height: 14px;
}

/* All Banks List */
.banks-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.bank-list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bank-list-item:hover:not(.disabled) {
  border-color: #e91e63;
  background: #fef7f0;
}

.bank-list-item.selected {
  border-color: #e91e63;
  background: #fef7f0;
}

.bank-list-item.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.bank-details {
  flex: 1;
}

.bank-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.bank-description {
  color: #6b7280;
  font-size: 0.875rem;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 2rem;
}

.no-results-icon {
  width: 48px;
  height: 48px;
  color: #9ca3af;
  margin: 0 auto 1rem;
}

.no-results h4 {
  color: #1f2937;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.no-results p {
  color: #6b7280;
  margin: 0 0 1rem 0;
}

.browse-all-btn {
  background: #e91e63;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.browse-all-btn:hover {
  background: #d81558;
}

/* Security Notice */
.security-notice {
  display: flex;
  gap: 1rem;
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 12px;
  padding: 1.5rem;
}

.security-icon {
  width: 24px;
  height: 24px;
  color: #0ea5e9;
  flex-shrink: 0;
}

.security-content h4 {
  color: #0c4a6e;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.security-content p {
  color: #075985;
  margin: 0;
  line-height: 1.5;
  font-size: 0.9rem;
}

/* Order Summary Section */
.order-summary-section {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.order-summary {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.summary-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.summary-icon {
  width: 20px;
  height: 20px;
  color: #e91e63;
}

.summary-header h3 {
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

/* Proceed to Pay Button */
.proceed-pay-btn {
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
  margin-bottom: 1rem;
}

.proceed-pay-btn:hover:not(:disabled) {
  background: #d81558;
  transform: translateY(-1px);
}

.proceed-pay-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.proceed-pay-btn svg {
  width: 18px;
  height: 18px;
}

.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Selected Bank Info */
.selected-bank-info {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.bank-preview {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.bank-preview img {
  width: 40px;
  height: 25px;
  border-radius: 4px;
  object-fit: cover;
}

.bank-text .bank-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.bank-redirect {
  color: #6b7280;
  font-size: 0.8rem;
}

/* Processing Modal */
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

.processing-modal {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.processing-animation {
  margin-bottom: 1.5rem;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #e91e63;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

.processing-modal h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.processing-modal p {
  color: #6b7280;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.security-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #10b981;
  font-size: 0.9rem;
  font-weight: 500;
}

.security-info svg {
  width: 16px;
  height: 16px;
}

/* Toast Messages */
.toast {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: #1f2937;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  font-weight: 500;
  max-width: 400px;
}

.toast.success {
  background: #10b981;
}

.toast.error {
  background: #ef4444;
}

.toast.info {
  background: #3b82f6;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .payment-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .order-summary-section {
    position: static;
  }
  
  .banks-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .netbanking-container {
    padding: 0 0.5rem;
  }
  
  .header-content {
    padding: 1rem;
  }
  
  .header-text h1 {
    font-size: 1.5rem;
  }
  
  .bank-card {
    padding: 0.75rem;
  }
  
  .popular-banks-section,
  .all-banks-section,
  .search-section {
    padding: 1rem;
  }
  
  .summary-content {
    padding: 1rem;
  }
  
  .summary-header {
    padding: 1rem 1rem 0.75rem;
  }
}
</style>
