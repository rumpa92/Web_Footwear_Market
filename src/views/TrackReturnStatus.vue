<template>
  <div class="track-return-page">
    <!-- Header Section -->
    <div class="track-header">
      <div class="container">
        <div class="header-content">
          <div class="header-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <div class="header-text">
            <h1>Track Return Status</h1>
            <p>Monitor your return request progress in real-time</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Section -->
    <div class="search-section">
      <div class="container">
        <div class="search-card">
          <h2>Enter Return Details</h2>
          <div class="search-form">
            <div class="input-group">
              <label for="returnId">Return ID</label>
              <input 
                id="returnId"
                v-model="searchForm.returnId" 
                type="text" 
                placeholder="Enter your return ID (e.g., RET123456)"
                @input="validateForm"
                :class="{ 'error': searchForm.returnId && !isValidReturnId }"
              />
              <span v-if="searchForm.returnId && !isValidReturnId" class="error-text">
                Invalid return ID format
              </span>
            </div>
            <div class="input-group">
              <label for="orderNumber">Order Number (Optional)</label>
              <input 
                id="orderNumber"
                v-model="searchForm.orderNumber" 
                type="text" 
                placeholder="Enter your order number"
                @input="validateForm"
              />
            </div>
            <button 
              @click="trackReturn" 
              class="track-btn"
              :disabled="!canSearch || isLoading"
            >
              <svg v-if="!isLoading" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <svg v-else class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              {{ isLoading ? 'Searching...' : 'Track Return' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Return Status Section -->
    <div v-if="returnStatus" class="status-section">
      <div class="container">
        <!-- Return Overview -->
        <div class="overview-card">
          <div class="overview-header">
            <div class="return-info">
              <h2>Return #{{ returnStatus.returnId }}</h2>
              <div class="status-badge" :class="returnStatus.status.toLowerCase().replace(' ', '-')">
                {{ returnStatus.status }}
              </div>
            </div>
            <div class="return-meta">
              <span class="order-link">Order #{{ returnStatus.orderNumber }}</span>
              <span class="return-date">{{ formatDate(returnStatus.createdDate) }}</span>
            </div>
          </div>
          <div class="overview-content">
            <div class="overview-stats">
              <div class="stat-item">
                <span class="stat-label">Return Value</span>
                <span class="stat-value">${{ returnStatus.returnValue.toFixed(2) }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Items Count</span>
                <span class="stat-value">{{ returnStatus.items.length }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Expected Refund</span>
                <span class="stat-value refund-date">{{ returnStatus.expectedRefund }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Timeline -->
        <div class="timeline-card">
          <div class="card-header">
            <h3>Return Progress</h3>
            <div class="progress-indicator">
              {{ getProgressPercentage() }}% Complete
            </div>
          </div>
          <div class="card-content">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: getProgressPercentage() + '%' }"></div>
            </div>
            <div class="timeline">
              <div 
                v-for="(step, index) in returnStatus.timeline" 
                :key="index"
                class="timeline-step"
                :class="{ 
                  'completed': step.completed, 
                  'active': step.active,
                  'current': step.current 
                }"
              >
                <div class="step-icon">
                  <svg v-if="step.completed" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <svg v-else-if="step.current" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  <div v-else class="step-number">{{ index + 1 }}</div>
                </div>
                <div class="step-content">
                  <h4>{{ step.title }}</h4>
                  <p>{{ step.description }}</p>
                  <div class="step-meta">
                    <span v-if="step.completedDate" class="step-date">
                      Completed: {{ formatDateTime(step.completedDate) }}
                    </span>
                    <span v-else-if="step.estimatedDate" class="step-estimate">
                      Expected: {{ formatDate(step.estimatedDate) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Return Items -->
        <div class="items-card">
          <div class="card-header">
            <h3>Return Items</h3>
            <span class="items-count">{{ returnStatus.items.length }} items</span>
          </div>
          <div class="card-content">
            <div class="items-grid">
              <div 
                v-for="item in returnStatus.items" 
                :key="item.id"
                class="return-item"
              >
                <img :src="item.image" :alt="item.name" class="item-image" />
                <div class="item-details">
                  <h4>{{ item.name }}</h4>
                  <p class="item-variant">{{ item.variant }}</p>
                  <div class="item-meta">
                    <span class="quantity">Qty: {{ item.quantity }}</span>
                    <span class="price">${{ (item.price * item.quantity).toFixed(2) }}</span>
                  </div>
                  <div class="item-reason">
                    <span class="reason-label">Reason:</span>
                    <span class="reason-text">{{ formatReturnReason(item.reason) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact & Support -->
        <div class="support-section">
          <div class="support-cards">
            <div class="support-card">
              <div class="support-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="support-content">
                <h4>Need Help?</h4>
                <p>Contact our customer support team for assistance with your return</p>
                <button class="support-btn" @click="contactSupport">
                  Contact Support
                </button>
              </div>
            </div>
            <div class="support-card">
              <div class="support-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
              <div class="support-content">
                <h4>Refund Questions?</h4>
                <p>Learn more about our refund policy and processing times</p>
                <button class="support-btn" @click="viewRefundPolicy">
                  View Policy
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button @click="goToOrders" class="action-btn secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
            </svg>
            View All Orders
          </button>
          <button @click="trackAnother" class="action-btn primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            Track Another Return
          </button>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-if="searchAttempted && !returnStatus" class="no-results">
      <div class="container">
        <div class="no-results-content">
          <div class="no-results-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.383-1.065-5.759-2.709M15 17.24l-1.5-1.5M9 17.24l1.5-1.5"/>
            </svg>
          </div>
          <h3>Return Not Found</h3>
          <p>We couldn't find a return with the provided details. Please check your information and try again.</p>
          <div class="no-results-actions">
            <button @click="clearSearch" class="action-btn secondary">
              Try Again
            </button>
            <button @click="goToOrders" class="action-btn primary">
              View My Orders
            </button>
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
export default {
  name: 'TrackReturnStatus',
  data() {
    return {
      searchForm: {
        returnId: '',
        orderNumber: ''
      },
      returnStatus: null,
      isLoading: false,
      searchAttempted: false,
      showToast: false,
      toast: { message: '', type: '' }
    }
  },
  computed: {
    isValidReturnId() {
      return /^RET\d{6}$/.test(this.searchForm.returnId)
    },
    canSearch() {
      return this.searchForm.returnId.trim().length > 0 && this.isValidReturnId
    }
  },
  created() {
    // Check if return ID was passed from previous page
    if (this.$route.query.returnId) {
      this.searchForm.returnId = this.$route.query.returnId
      this.trackReturn()
    }
  },
  methods: {
    validateForm() {
      // Real-time validation feedback
    },

    async trackReturn() {
      if (!this.canSearch || this.isLoading) return

      this.isLoading = true
      this.searchAttempted = true
      this.showToastMessage('Searching for your return...', 'info')

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Mock return data - in real app this would come from API
        this.returnStatus = this.getMockReturnData()
        
        if (this.returnStatus) {
          this.showToastMessage('Return found successfully!', 'success')
        } else {
          this.showToastMessage('Return not found. Please check your details.', 'error')
        }
      } catch (error) {
        this.showToastMessage('Error searching for return. Please try again.', 'error')
      } finally {
        this.isLoading = false
      }
    },

    getMockReturnData() {
      // Mock data for demonstration
      const mockReturns = {
        'RET123456': {
          returnId: 'RET123456',
          orderNumber: 'ORD789012',
          status: 'In Transit',
          createdDate: new Date('2024-01-15'),
          returnValue: 89.99,
          expectedRefund: 'Jan 25, 2024',
          items: [
            {
              id: 1,
              name: 'Nike Air Max 270',
              variant: 'Black/White - Size 9',
              quantity: 1,
              price: 89.99,
              reason: 'wrong-size',
              image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'
            }
          ],
          timeline: [
            {
              title: 'Return Request Submitted',
              description: 'Your return request has been received and approved',
              completed: true,
              active: false,
              current: false,
              completedDate: new Date('2024-01-15T10:30:00')
            },
            {
              title: 'Pickup Scheduled',
              description: 'Item pickup has been scheduled and confirmed',
              completed: true,
              active: false,
              current: false,
              completedDate: new Date('2024-01-16T14:20:00')
            },
            {
              title: 'Item Collected',
              description: 'Item has been picked up and is in transit to our facility',
              completed: true,
              active: false,
              current: true,
              completedDate: new Date('2024-01-17T09:15:00')
            },
            {
              title: 'Quality Check',
              description: 'Item will be inspected at our return center',
              completed: false,
              active: true,
              current: false,
              estimatedDate: new Date('2024-01-20')
            },
            {
              title: 'Refund Processed',
              description: 'Refund will be processed to your original payment method',
              completed: false,
              active: false,
              current: false,
              estimatedDate: new Date('2024-01-25')
            }
          ]
        },
        'RET654321': {
          returnId: 'RET654321',
          orderNumber: 'ORD345678',
          status: 'Refund Processed',
          createdDate: new Date('2024-01-10'),
          returnValue: 129.99,
          expectedRefund: 'Completed',
          items: [
            {
              id: 2,
              name: 'Adidas Ultraboost 22',
              variant: 'White/Blue - Size 10',
              quantity: 1,
              price: 129.99,
              reason: 'defective',
              image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400'
            }
          ],
          timeline: [
            {
              title: 'Return Request Submitted',
              description: 'Your return request has been received and approved',
              completed: true,
              active: false,
              current: false,
              completedDate: new Date('2024-01-10T10:30:00')
            },
            {
              title: 'Pickup Scheduled',
              description: 'Item pickup has been scheduled and confirmed',
              completed: true,
              active: false,
              current: false,
              completedDate: new Date('2024-01-11T14:20:00')
            },
            {
              title: 'Item Collected',
              description: 'Item has been picked up and is in transit to our facility',
              completed: true,
              active: false,
              current: false,
              completedDate: new Date('2024-01-12T09:15:00')
            },
            {
              title: 'Quality Check',
              description: 'Item has been inspected and approved for refund',
              completed: true,
              active: false,
              current: false,
              completedDate: new Date('2024-01-15T16:30:00')
            },
            {
              title: 'Refund Processed',
              description: 'Refund has been processed to your original payment method',
              completed: true,
              active: false,
              current: false,
              completedDate: new Date('2024-01-18T11:45:00')
            }
          ]
        }
      }

      return mockReturns[this.searchForm.returnId] || null
    },

    getProgressPercentage() {
      if (!this.returnStatus) return 0
      const completedSteps = this.returnStatus.timeline.filter(step => step.completed).length
      return Math.round((completedSteps / this.returnStatus.timeline.length) * 100)
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },

    formatDateTime(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    formatReturnReason(reason) {
      const reasonMap = {
        'defective': 'Defective/Damaged',
        'wrong-size': 'Wrong Size',
        'wrong-item': 'Wrong Item',
        'not-as-described': 'Not as Described',
        'changed-mind': 'Changed Mind',
        'other': 'Other'
      }
      return reasonMap[reason] || reason
    },

    clearSearch() {
      this.searchForm.returnId = ''
      this.searchForm.orderNumber = ''
      this.returnStatus = null
      this.searchAttempted = false
    },

    trackAnother() {
      this.clearSearch()
      window.scrollTo(0, 0)
    },

    goToOrders() {
      this.$router.push('/orders')
    },

    contactSupport() {
      this.$router.push('/ticket')
    },

    viewRefundPolicy() {
      this.$router.push('/privacy-policy')
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
.track-return-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

/* Header Section */
.track-header {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  padding: var(--space-2xl) 0;
}

.header-content {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.header-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-icon svg {
  width: 30px;
  height: 30px;
}

.header-text h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: var(--space-sm);
}

.header-text p {
  font-size: var(--font-size-lg);
  opacity: 0.9;
}

/* Search Section */
.search-section {
  padding: var(--space-2xl) 0;
}

.search-card {
  background: white;
  border-radius: 16px;
  padding: var(--space-2xl);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 2px solid #e2e8f0;
  margin-bottom: var(--space-2xl);
}

.search-card h2 {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: #1f2937;
  margin-bottom: var(--space-lg);
  text-align: center;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  max-width: 500px;
  margin: 0 auto;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.input-group label {
  font-weight: 600;
  color: #374151;
}

.input-group input {
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: var(--font-size-base);
  transition: all 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-group input.error {
  border-color: #ef4444;
}

.error-text {
  font-size: var(--font-size-sm);
  color: #ef4444;
  font-weight: 500;
}

.track-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: 16px 32px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.track-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
}

.track-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.track-btn svg {
  width: 20px;
  height: 20px;
}

/* Status Section */
.status-section {
  padding-bottom: var(--space-2xl);
}

.overview-card,
.timeline-card,
.items-card {
  background: white;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  margin-bottom: var(--space-xl);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.overview-header {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: var(--space-xl);
  border-bottom: 1px solid #e2e8f0;
}

.return-info {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  margin-bottom: var(--space-md);
}

.return-info h2 {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: #1f2937;
}

.status-badge {
  padding: var(--space-xs) var(--space-md);
  border-radius: 20px;
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.submitted {
  background: #dbeafe;
  color: #1d4ed8;
}

.status-badge.approved {
  background: #dcfce7;
  color: #166534;
}

.status-badge.in-transit {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.refund-processed {
  background: #d1fae5;
  color: #065f46;
}

.return-meta {
  display: flex;
  gap: var(--space-lg);
  color: #6b7280;
  font-size: var(--font-size-sm);
}

.order-link {
  font-weight: 600;
  color: #3b82f6;
  cursor: pointer;
}

.overview-content {
  padding: var(--space-xl);
}

.overview-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-lg);
}

.stat-item {
  text-align: center;
  padding: var(--space-lg);
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.stat-label {
  display: block;
  font-size: var(--font-size-sm);
  color: #6b7280;
  margin-bottom: var(--space-sm);
  font-weight: 500;
}

.stat-value {
  display: block;
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: #1f2937;
}

.stat-value.refund-date {
  color: #10b981;
}

/* Timeline Card */
.card-header {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: var(--space-xl);
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: #1f2937;
}

.progress-indicator {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: #3b82f6;
}

.card-content {
  padding: var(--space-xl);
}

.progress-bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  margin-bottom: var(--space-xl);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.timeline-step {
  display: flex;
  gap: var(--space-lg);
  position: relative;
}

.timeline-step:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 25px;
  top: 60px;
  width: 2px;
  height: 60px;
  background: #e5e7eb;
}

.timeline-step.completed::after {
  background: #10b981;
}

.timeline-step.active::after {
  background: linear-gradient(to bottom, #10b981 50%, #e5e7eb 50%);
}

.step-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 2px solid;
  background: white;
}

.timeline-step.completed .step-icon {
  background: #10b981;
  color: white;
  border-color: #10b981;
}

.timeline-step.current .step-icon {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
  animation: pulse 2s infinite;
}

.timeline-step:not(.completed):not(.current) .step-icon {
  border-color: #d1d5db;
  color: #9ca3af;
}

.step-icon svg {
  width: 24px;
  height: 24px;
}

.step-number {
  font-weight: 600;
  font-size: var(--font-size-sm);
}

.step-content h4 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: var(--space-sm);
}

.step-content p {
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: var(--space-sm);
}

.step-meta {
  font-size: var(--font-size-sm);
}

.step-date {
  color: #10b981;
  font-weight: 500;
}

.step-estimate {
  color: #6b7280;
  font-style: italic;
}

/* Items Card */
.items-count {
  font-size: var(--font-size-sm);
  color: #6b7280;
  background: #e5e7eb;
  padding: var(--space-xs) var(--space-sm);
  border-radius: 6px;
}

.items-grid {
  display: grid;
  gap: var(--space-lg);
}

.return-item {
  display: flex;
  gap: var(--space-lg);
  padding: var(--space-lg);
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.item-image {
  width: 80px;
  height: 80px;
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
  margin-bottom: var(--space-sm);
}

.quantity {
  font-size: var(--font-size-sm);
  color: #6b7280;
}

.price {
  font-weight: 600;
  color: #10b981;
}

.item-reason {
  display: flex;
  gap: var(--space-sm);
  font-size: var(--font-size-sm);
}

.reason-label {
  color: #6b7280;
}

.reason-text {
  color: #374151;
  font-weight: 500;
}

/* Support Section */
.support-section {
  margin: var(--space-2xl) 0;
}

.support-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-lg);
}

.support-card {
  background: white;
  padding: var(--space-xl);
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.support-card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.support-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-lg);
}

.support-icon svg {
  width: 24px;
  height: 24px;
}

.support-content h4 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: var(--space-sm);
}

.support-content p {
  color: #6b7280;
  margin-bottom: var(--space-lg);
  line-height: 1.5;
}

.support-btn {
  padding: var(--space-sm) var(--space-lg);
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.support-btn:hover {
  background: #3b82f6;
  color: white;
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
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border-color: transparent;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
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

/* No Results */
.no-results {
  padding: var(--space-2xl) 0;
}

.no-results-content {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}

.no-results-icon {
  width: 80px;
  height: 80px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-lg);
}

.no-results-icon svg {
  width: 40px;
  height: 40px;
  color: #9ca3af;
}

.no-results-content h3 {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: #1f2937;
  margin-bottom: var(--space-md);
}

.no-results-content p {
  color: #6b7280;
  margin-bottom: var(--space-xl);
  line-height: 1.6;
}

.no-results-actions {
  display: flex;
  gap: var(--space-lg);
  justify-content: center;
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Toast Styles */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px 24px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: var(--font-size-sm);
  z-index: 10000;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
}

.toast.success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.toast.error {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.toast.info {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .header-text h1 {
    font-size: 2rem;
  }

  .search-form {
    max-width: none;
  }

  .overview-stats {
    grid-template-columns: 1fr;
  }

  .return-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-meta {
    width: 100%;
  }

  .timeline-step {
    flex-direction: column;
    align-items: flex-start;
  }

  .timeline-step::after {
    left: 25px;
    top: 60px;
  }

  .support-cards {
    grid-template-columns: 1fr;
  }

  .action-buttons,
  .no-results-actions {
    flex-direction: column;
    align-items: center;
  }

  .action-btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .toast {
    right: 10px;
    left: 10px;
    max-width: none;
  }
}
</style>
