<template>
  <div class="return-confirmation-page">
    <!-- Success Hero Section -->
    <div class="confirmation-hero">
      <div class="container">
        <div class="hero-content">
          <div class="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div class="hero-text">
            <h1>Return Request Submitted!</h1>
            <p class="confirmation-message">
              Your return request has been submitted successfully. We'll review your request and share pickup & refund updates shortly. Track the status anytime in My Orders.
            </p>
            <div class="return-id">
              <span class="label">Return ID:</span>
              <span class="id-value">{{ returnData.returnId }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Return Details Section -->
    <div class="return-details-section">
      <div class="container">
        <div class="details-grid">
          <!-- Return Summary -->
          <div class="summary-card">
            <div class="card-header">
              <h3>Return Summary</h3>
              <div class="order-reference">
                Order #{{ returnData.orderNumber }}
              </div>
            </div>
            <div class="card-content">
              <div class="summary-item">
                <span class="label">Return Date:</span>
                <span class="value">{{ formatDate(returnData.returnDate) }}</span>
              </div>
              <div class="summary-item">
                <span class="label">Return Value:</span>
                <span class="value amount">${{ returnData.returnValue.toFixed(2) }}</span>
              </div>
              <div class="summary-item">
                <span class="label">Return Reason:</span>
                <span class="value">{{ formatReturnReason(returnData.returnReason) }}</span>
              </div>
              <div class="summary-item">
                <span class="label">Items Count:</span>
                <span class="value">{{ returnData.returnItems.length }} item{{ returnData.returnItems.length > 1 ? 's' : '' }}</span>
              </div>
            </div>
          </div>

          <!-- Return Items -->
          <div class="items-card">
            <div class="card-header">
              <h3>Return Items</h3>
            </div>
            <div class="card-content">
              <div class="return-items-list">
                <div v-for="item in returnData.returnItems" :key="item.id" class="return-item">
                  <img :src="item.image" :alt="item.name" class="item-image" />
                  <div class="item-details">
                    <h4>{{ item.name }}</h4>
                    <p class="item-variant">{{ item.variant }}</p>
                    <div class="item-meta">
                      <span class="quantity">Qty: {{ item.returnQuantity }}</span>
                      <span class="price">${{ (item.price * item.returnQuantity).toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Process Timeline -->
        <div class="timeline-card">
          <div class="card-header">
            <h3>What Happens Next?</h3>
          </div>
          <div class="card-content">
            <div class="timeline">
              <div class="timeline-item active">
                <div class="timeline-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div class="timeline-content">
                  <h4>Return Request Submitted</h4>
                  <p>Your return request has been received and is being reviewed.</p>
                  <span class="timeline-time">Just now</span>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div class="timeline-content">
                  <h4>Return Approved</h4>
                  <p>We'll approve your return and schedule a pickup.</p>
                  <span class="timeline-time">Within 24 hours</span>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="timeline-content">
                  <h4>Pickup Scheduled</h4>
                  <p>We'll contact you to schedule a convenient pickup time.</p>
                  <span class="timeline-time">1-2 business days</span>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
                <div class="timeline-content">
                  <h4>Refund Processed</h4>
                  <p>Refund will be processed after we receive and inspect the items.</p>
                  <span class="timeline-time">3-5 business days after pickup</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pickup & Refund Info -->
        <div class="info-grid">
          <div class="pickup-info-card">
            <div class="card-header">
              <h3>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Pickup Information
              </h3>
            </div>
            <div class="card-content">
              <div class="pickup-details">
                <p><strong>Pickup Address:</strong></p>
                <p class="address">{{ returnData.pickupAddress }}</p>
                <div class="pickup-note">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Our team will contact you within 24 hours to schedule pickup</span>
                </div>
              </div>
            </div>
          </div>

          <div class="refund-info-card">
            <div class="card-header">
              <h3>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
                Refund Information
              </h3>
            </div>
            <div class="card-content">
              <div class="refund-details">
                <div class="refund-method">
                  <span class="label">Refund Method:</span>
                  <span class="method">{{ returnData.refundMethod }}</span>
                </div>
                <div class="refund-timeline">
                  <span class="label">Expected Timeline:</span>
                  <span class="timeline-text">{{ returnData.refundTimeline }}</span>
                </div>
                <div class="refund-amount">
                  <span class="label">Refund Amount:</span>
                  <span class="amount">${{ returnData.returnValue.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button @click="trackReturnStatus" class="action-btn primary" :disabled="isNavigating">
            <svg v-if="!isNavigating" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <svg v-else class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            {{ isNavigating ? 'Opening...' : 'Track Return Status' }}
          </button>
          <button @click="goToOrders" class="action-btn secondary" :disabled="isNavigating">
            <svg v-if="!isNavigating" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
            </svg>
            <svg v-else class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            {{ isNavigating ? 'Redirecting...' : 'Go to My Orders' }}
          </button>
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
  name: 'ReturnConfirmation',
  data() {
    return {
      returnData: {
        returnId: 'RET000000',
        orderNumber: '00000',
        returnDate: new Date(),
        returnValue: 0,
        returnReason: '',
        returnItems: [],
        pickupAddress: '',
        refundMethod: 'Original Payment Method',
        refundTimeline: '5-7 business days'
      },
      showToast: false,
      toast: { message: '', type: '' },
      isNavigating: false
    }
  },
  created() {
    // Get return data from route params or query
    this.loadReturnData()
  },
  methods: {
    loadReturnData() {
      // In a real app, this would come from route params or API
      const routeData = this.$route.params
      
      if (routeData && Object.keys(routeData).length > 0) {
        this.returnData = { ...this.returnData, ...routeData }
      } else {
        // Fallback - redirect to orders if no data
        this.$router.push('/orders')
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },

    formatReturnReason(reason) {
      const reasonMap = {
        'defective': 'Defective/Damaged Item',
        'wrong-size': 'Wrong Size',
        'wrong-item': 'Wrong Item Received',
        'not-as-described': 'Not as Described',
        'changed-mind': 'Changed Mind',
        'other': 'Other'
      }
      return reasonMap[reason] || reason
    },

    trackReturnStatus() {
      if (this.isNavigating) return

      this.isNavigating = true
      this.showToastMessage('Opening return tracking...', 'info')

      setTimeout(() => {
        // Navigate to orders page with return tracking query
        this.$router.push({
          path: '/orders',
          query: {
            trackReturn: this.returnData.returnId,
            highlight: 'return-' + this.returnData.returnId
          }
        })
      }, 1000)
    },

    goToOrders() {
      if (this.isNavigating) return

      this.isNavigating = true
      this.showToastMessage('Redirecting to My Orders...', 'info')

      setTimeout(() => {
        this.$router.push('/orders')
      }, 800)
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
.return-confirmation-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

/* Hero Section */
.confirmation-hero {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: var(--space-2xl) 0;
  text-align: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}

.success-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: successPulse 2s ease-out;
}

.success-icon svg {
  width: 40px;
  height: 40px;
  stroke-width: 3;
}

.hero-text h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: var(--space-md);
}

.confirmation-message {
  font-size: var(--font-size-lg);
  line-height: 1.6;
  max-width: 600px;
  margin-bottom: var(--space-lg);
  opacity: 0.95;
}

.return-id {
  background: rgba(255, 255, 255, 0.15);
  padding: var(--space-md) var(--space-lg);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-weight: 600;
}

.return-id .label {
  opacity: 0.8;
}

.return-id .id-value {
  font-family: monospace;
  font-size: var(--font-size-lg);
  letter-spacing: 1px;
}

/* Details Section */
.return-details-section {
  padding: var(--space-2xl) 0;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

/* Cards */
.summary-card,
.items-card,
.timeline-card,
.pickup-info-card,
.refund-info-card {
  background: white;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.summary-card:hover,
.items-card:hover,
.timeline-card:hover,
.pickup-info-card:hover,
.refund-info-card:hover {
  border-color: #10b981;
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(16, 185, 129, 0.15);
}

.card-header {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: var(--space-lg);
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.card-header h3 svg {
  width: 20px;
  height: 20px;
  color: #10b981;
}

.order-reference {
  font-size: var(--font-size-sm);
  color: #6b7280;
  background: #e5e7eb;
  padding: var(--space-xs) var(--space-sm);
  border-radius: 6px;
}

.card-content {
  padding: var(--space-lg);
}

/* Summary Card */
.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) 0;
  border-bottom: 1px solid #f3f4f6;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item .label {
  color: #6b7280;
  font-weight: 500;
}

.summary-item .value {
  font-weight: 600;
  color: #1f2937;
}

.summary-item .value.amount {
  color: #10b981;
  font-size: var(--font-size-lg);
}

/* Return Items */
.return-items-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.return-item {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-md);
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.item-details {
  flex: 1;
}

.item-details h4 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: var(--space-xs);
}

.item-variant {
  font-size: var(--font-size-sm);
  color: #6b7280;
  margin-bottom: var(--space-sm);
}

.item-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantity {
  font-size: var(--font-size-sm);
  color: #6b7280;
}

.price {
  font-weight: 600;
  color: #10b981;
}

/* Timeline */
.timeline-card {
  grid-column: 1 / -1;
  margin-bottom: var(--space-xl);
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.timeline-item {
  display: flex;
  gap: var(--space-md);
  position: relative;
}

.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 20px;
  top: 60px;
  width: 2px;
  height: 40px;
  background: #e5e7eb;
}

.timeline-item.active .timeline-icon {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.timeline-item.active::after {
  background: #10b981;
}

.timeline-icon {
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 2px solid #e5e7eb;
}

.timeline-icon svg {
  width: 20px;
  height: 20px;
}

.timeline-content h4 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: var(--space-xs);
}

.timeline-content p {
  color: #6b7280;
  margin-bottom: var(--space-xs);
  line-height: 1.5;
}

.timeline-time {
  font-size: var(--font-size-sm);
  color: #10b981;
  font-weight: 500;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

.pickup-details,
.refund-details {
  line-height: 1.6;
}

.pickup-details .address {
  color: #374151;
  margin-bottom: var(--space-md);
  padding: var(--space-sm);
  background: #f9fafb;
  border-radius: 6px;
  border-left: 4px solid #10b981;
}

.pickup-note {
  display: flex;
  gap: var(--space-sm);
  color: #6b7280;
  font-size: var(--font-size-sm);
  background: #fef3c7;
  padding: var(--space-sm);
  border-radius: 6px;
  border: 1px solid #f59e0b;
}

.pickup-note svg {
  width: 16px;
  height: 16px;
  color: #f59e0b;
  flex-shrink: 0;
}

.refund-method,
.refund-timeline,
.refund-amount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) 0;
  border-bottom: 1px solid #f3f4f6;
}

.refund-amount {
  border-bottom: none;
}

.refund-details .label {
  color: #6b7280;
  font-weight: 500;
}

.refund-details .method,
.refund-details .timeline-text {
  font-weight: 600;
  color: #1f2937;
}

.refund-details .amount {
  font-weight: 700;
  color: #10b981;
  font-size: var(--font-size-lg);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: var(--space-lg);
  justify-content: center;
  margin-top: var(--space-2xl);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 16px 32px;
  border: 2px solid;
  border-radius: 12px;
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.action-btn svg {
  width: 20px;
  height: 20px;
}

.action-btn.primary {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-color: transparent;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
}

.action-btn.secondary {
  background: white;
  color: #374151;
  border-color: #d1d5db;
}

.action-btn.secondary:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  transform: translateY(-2px);
}

@keyframes successPulse {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-text h1 {
    font-size: 2rem;
  }

  .confirmation-message {
    font-size: var(--font-size-base);
  }

  .details-grid,
  .info-grid {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .return-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-meta {
    width: 100%;
  }

  .timeline-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .timeline-item::after {
    left: 20px;
    top: 60px;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .action-btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}
</style>
