<template>
  <div class="order-confirmation-page">
    <div class="confirmation-container">
      <!-- Success Header -->
      <div class="success-header">
        <div class="success-animation">
          <div class="checkmark-circle">
            <svg class="checkmark" viewBox="0 0 52 52">
              <circle class="checkmark-circle-bg" cx="26" cy="26" r="25" fill="none"/>
              <path class="checkmark-check" fill="none" d="m16,26 8,8 16,-16"/>
            </svg>
          </div>
        </div>
        <h1>Order Confirmed!</h1>
        <p class="success-message">Thank you for your purchase. Your order has been successfully placed.</p>
      </div>

      <!-- Order Details Card -->
      <div class="order-details-card">
        <div class="order-header">
          <div class="order-info">
            <h2>Order Details</h2>
            <div class="order-meta">
              <div class="order-id">
                <strong>Order ID: {{ orderDetails.orderId }}</strong>
              </div>
              <div class="order-date">
                {{ formatDate(orderDetails.timestamp) }}
              </div>
            </div>
          </div>
          <div class="payment-badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
            </svg>
            Payment Successful
          </div>
        </div>

        <!-- Payment Information -->
        <div class="payment-info-section">
          <h3>Payment Information</h3>
          <div class="payment-details">
            <div class="payment-row">
              <span>Payment Method</span>
              <span>{{ orderDetails.paymentMethod }} ({{ orderDetails.paymentApp }})</span>
            </div>
            <div class="payment-row">
              <span>Amount Paid</span>
              <span class="amount">₹{{ orderDetails.amount?.toFixed(2) }}</span>
            </div>
            <div class="payment-row">
              <span>Transaction Status</span>
              <span class="status-success">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                </svg>
                Completed
              </span>
            </div>
          </div>
        </div>

        <!-- Delivery Information -->
        <div class="delivery-info-section">
          <h3>Delivery Information</h3>
          <div class="delivery-details">
            <div class="delivery-address">
              <div class="address-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22S19,14.25 19,9C19,5.13 15.87,2 12,2M12,11.5C10.62,11.5 9.5,10.38 9.5,9C9.5,7.62 10.62,6.5 12,6.5C13.38,6.5 14.5,7.62 14.5,9C14.5,10.38 13.38,11.5 12,11.5Z"/>
                </svg>
              </div>
              <div class="address-content">
                <p><strong>{{ orderDetails.deliveryAddress?.name }}</strong></p>
                <p>{{ orderDetails.deliveryAddress?.street }}</p>
                <p>{{ orderDetails.deliveryAddress?.city }}, {{ orderDetails.deliveryAddress?.state }} {{ orderDetails.deliveryAddress?.pincode }}</p>
              </div>
            </div>
            
            <div class="delivery-timeline">
              <div class="timeline-item completed">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>Order Confirmed</h4>
                  <p>{{ formatDate(orderDetails.timestamp) }}</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>Processing</h4>
                  <p>{{ getProcessingDate() }}</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>Shipped</h4>
                  <p>{{ getShippingDate() }}</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>Delivered</h4>
                  <p>{{ getDeliveryDate() }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="order-items-section">
          <h3>Order Items</h3>
          <div class="items-list">
            <div 
              v-for="item in orderDetails.items" 
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
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button @click="trackOrder" class="track-order-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
          </svg>
          Track Your Order
        </button>
        
        <button @click="downloadInvoice" class="download-invoice-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
          Download Invoice
        </button>
        
        <button @click="continueShopping" class="continue-shopping-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5H5.21L4.27,3H1M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
          </svg>
          Continue Shopping
        </button>
      </div>

      <!-- Support Information -->
      <div class="support-section">
        <div class="support-card">
          <div class="support-header">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
            </svg>
            <h3>Need Help?</h3>
          </div>
          <p>Our customer support team is here to help with any questions about your order.</p>
          <div class="support-options">
            <button @click="contactSupport" class="support-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,15.5C18.75,15.5 17.55,15.3 16.43,14.93C16.08,14.82 15.69,14.9 15.41,15.18L13.21,17.38C10.38,15.94 8.06,13.62 6.62,10.79L8.82,8.59C9.1,8.31 9.18,7.92 9.07,7.57C8.7,6.45 8.5,5.25 8.5,4A1,1 0 0,0 7.5,3H4A1,1 0 0,0 3,4A17,17 0 0,0 20,21A1,1 0 0,0 21,20V16.5A1,1 0 0,0 20,15.5Z"/>
              </svg>
              Call Support
            </button>
            <button @click="openChat" class="support-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,3C6.5,3 2,6.58 2,11A7.22,7.22 0 0,0 2.75,14.75L2,22L9.25,21.25A11,11 0 0,0 12,21C17.5,21 22,17.42 22,13S17.5,3 12,3M13,17H11V15H13V17M13,13H11C11,12.5 11,12 11.5,11.5C12,11 12.5,10.5 12.5,10A1.5,1.5 0 0,0 11,8.5A1.5,1.5 0 0,0 9.5,10H8A3,3 0 0,1 11,7A3,3 0 0,1 14,10C14,10.88 13.5,11.5 13,13Z"/>
              </svg>
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderConfirmation',
  data() {
    return {
      orderDetails: {}
    }
  },

  mounted() {
    this.loadOrderDetails()
    this.animateCheckmark()
  },

  methods: {
    loadOrderDetails() {
      // Get order details from localStorage
      const orderData = localStorage.getItem('orderConfirmation')
      if (orderData) {
        this.orderDetails = JSON.parse(orderData)
      } else {
        // Fallback if no order data (for testing)
        this.orderDetails = {
          orderId: 'UPI12345678',
          amount: 299.97,
          timestamp: new Date().toISOString(),
          paymentMethod: 'UPI',
          paymentApp: 'Google Pay',
          deliveryAddress: {
            name: 'Sarah Johnson',
            street: '123 Beauty Street, Apt 4B',
            city: 'New York',
            state: 'NY',
            pincode: '10001'
          },
          items: []
        }
      }
    },

    animateCheckmark() {
      this.$nextTick(() => {
        const checkmark = document.querySelector('.checkmark')
        if (checkmark) {
          checkmark.style.animation = 'checkmark 0.6s ease-in-out 0.3s both'
        }
      })
    },

    formatDate(timestamp) {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    getProcessingDate() {
      const date = new Date()
      date.setDate(date.getDate() + 1)
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })
    },

    getShippingDate() {
      const date = new Date()
      date.setDate(date.getDate() + 2)
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })
    },

    getDeliveryDate() {
      const date = new Date()
      date.setDate(date.getDate() + 5)
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      })
    },

    trackOrder() {
      // Navigate to orders page with this order ID
      this.$router.push({
        name: 'Orders',
        query: { orderId: this.orderDetails.orderId }
      })
    },

    downloadInvoice() {
      // Generate and download invoice
      const invoiceData = {
        orderId: this.orderDetails.orderId,
        date: new Date().toISOString(),
        customer: this.orderDetails.deliveryAddress,
        items: this.orderDetails.items,
        total: this.orderDetails.amount
      }
      
      // Create a simple text invoice (in real app, use PDF generation)
      const invoiceText = this.generateInvoiceText(invoiceData)
      const blob = new Blob([invoiceText], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `invoice-${this.orderDetails.orderId}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    },

    generateInvoiceText(data) {
      return `
FOOTWEAR MARKET - INVOICE
==========================

Order ID: ${data.orderId}
Date: ${new Date(data.date).toLocaleDateString()}

Customer Details:
${data.customer?.name}
${data.customer?.street}
${data.customer?.city}, ${data.customer?.state} ${data.customer?.pincode}

Items:
${data.items?.map(item => `${item.name} (${item.size}, ${item.color}) - Qty: ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`).join('\n')}

Total Amount: ₹${data.total?.toFixed(2)}

Payment Method: ${this.orderDetails.paymentMethod} (${this.orderDetails.paymentApp})

Thank you for shopping with us!
      `.trim()
    },

    continueShopping() {
      // Clear order data and go to home
      localStorage.removeItem('orderConfirmation')
      this.$router.push('/')
    },

    contactSupport() {
      // Open phone dialer or support page
      window.open('tel:+1-800-SUPPORT', '_blank')
    },

    openChat() {
      // Open live chat (in real app, integrate with chat service)
      alert('Live chat feature coming soon! Please call our support number for immediate assistance.')
    }
  }
}
</script>

<style scoped>
.order-confirmation-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 2rem 0;
}

.confirmation-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Success Header */
.success-header {
  text-align: center;
  margin-bottom: 2rem;
}

.success-animation {
  margin-bottom: 1.5rem;
}

.checkmark-circle {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  position: relative;
}

.checkmark {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
  stroke-width: 3;
  stroke: #10b981;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #10b981;
}

.checkmark-circle-bg {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 3;
  stroke-miterlimit: 10;
  stroke: #10b981;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

.success-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.success-message {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
}

/* Order Details Card */
.order-details-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.order-info h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.order-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.order-id {
  color: #e91e63;
  font-size: 1.1rem;
}

.order-date {
  color: #6b7280;
  font-size: 0.9rem;
}

.payment-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #ecfdf5;
  color: #065f46;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  border: 1px solid #10b981;
}

.payment-badge svg {
  width: 18px;
  height: 18px;
}

/* Section Styles */
.payment-info-section,
.delivery-info-section,
.order-items-section {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f3f4f6;
}

.payment-info-section:last-child,
.delivery-info-section:last-child,
.order-items-section:last-child {
  border-bottom: none;
}

.payment-info-section h3,
.delivery-info-section h3,
.order-items-section h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

/* Payment Details */
.payment-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.payment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
}

.payment-row span:first-child {
  color: #6b7280;
  font-weight: 500;
}

.payment-row .amount {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
}

.status-success {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10b981;
  font-weight: 600;
}

.status-success svg {
  width: 16px;
  height: 16px;
}

/* Delivery Details */
.delivery-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.delivery-address {
  display: flex;
  gap: 1rem;
}

.address-icon {
  width: 24px;
  height: 24px;
  color: #e91e63;
  flex-shrink: 0;
}

.address-content p {
  margin: 0.25rem 0;
  color: #374151;
  line-height: 1.5;
}

/* Delivery Timeline */
.delivery-timeline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 12px;
  top: 24px;
  width: 2px;
  height: 2rem;
  background: #e5e7eb;
}

.timeline-item.completed .timeline-dot {
  background: #10b981;
  border-color: #10b981;
}

.timeline-item.completed::after {
  background: #10b981;
}

.timeline-dot {
  width: 24px;
  height: 24px;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  background: white;
  flex-shrink: 0;
  z-index: 1;
}

.timeline-content h4 {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.timeline-content p {
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0;
}

/* Order Items */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.item-image {
  width: 64px;
  height: 64px;
  border-radius: 8px;
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
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.item-brand {
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0 0 0.5rem 0;
}

.item-options {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.item-options span {
  background: white;
  color: #6b7280;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid #e5e7eb;
}

.item-price {
  font-weight: 700;
  color: #1f2937;
  font-size: 1.1rem;
}

/* Action Buttons */
.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.track-order-btn,
.download-invoice-btn,
.continue-shopping-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.track-order-btn {
  background: #e91e63;
  color: white;
}

.track-order-btn:hover {
  background: #d81558;
  transform: translateY(-1px);
}

.download-invoice-btn {
  background: #6366f1;
  color: white;
}

.download-invoice-btn:hover {
  background: #5856eb;
  transform: translateY(-1px);
}

.continue-shopping-btn {
  background: #10b981;
  color: white;
}

.continue-shopping-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}

.track-order-btn svg,
.download-invoice-btn svg,
.continue-shopping-btn svg {
  width: 20px;
  height: 20px;
}

/* Support Section */
.support-section {
  margin-top: 2rem;
}

.support-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.support-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.support-header svg {
  width: 24px;
  height: 24px;
  color: #e91e63;
}

.support-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.support-card p {
  color: #6b7280;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
}

.support-options {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.support-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.support-btn:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.support-btn svg {
  width: 18px;
  height: 18px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .order-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .delivery-details {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .action-buttons {
    grid-template-columns: 1fr;
  }
  
  .support-options {
    flex-direction: column;
    align-items: center;
  }
  
  .support-btn {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }
  
  .payment-info-section,
  .delivery-info-section,
  .order-items-section {
    padding: 1rem 1.5rem;
  }
  
  .order-header {
    padding: 1.5rem 1.5rem 0.5rem;
  }
}
</style>
