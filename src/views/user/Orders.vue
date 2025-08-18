<template>
  <div class="orders-page">
    <!-- Hero Header -->
    <div class="orders-hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
            </svg>
          </div>
          <div class="hero-text">
            <h1>My Orders</h1>
            <p>Track and manage all your footwear purchases in one place. View current orders with live tracking, check past purchases, reorder favorites, download invoices, or request returns and refunds.</p>
          </div>
        </div>
        <div class="orders-stats">
          <div class="stat-item">
            <div class="stat-number">{{ orders.length }}</div>
            <div class="stat-label">Total Orders</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ activeOrders.length }}</div>
            <div class="stat-label">Active Orders</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${{ totalSpent.toFixed(2) }}</div>
            <div class="stat-label">Total Spent</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="orders-filters">
      <div class="container">
        <div class="filters-row">
          <div class="search-box">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35"/>
            </svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search orders by product name, order ID..."
              class="search-input"
            />
          </div>
          <div class="filter-controls">
            <select v-model="statusFilter" class="status-filter">
              <option value="">All Statuses</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="out-for-delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select v-model="timeFilter" class="time-filter">
              <option value="">All Time</option>
              <option value="30-days">Last 30 days</option>
              <option value="90-days">Last 90 days</option>
              <option value="1-year">Last year</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders List -->
    <div class="orders-content">
      <div class="container">
        <div v-if="filteredOrders.length === 0" class="empty-orders">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"/>
            </svg>
          </div>
          <h3>No Orders Found</h3>
          <p>You haven't placed any orders yet or no orders match your current filters.</p>
          <button @click="$router.push('/')" class="shop-now-btn">
            Start Shopping
          </button>
        </div>

        <div v-else class="orders-grid">
          <div v-for="order in filteredOrders" :key="order.id" class="order-card">
            <!-- Order Header -->
            <div class="order-header">
              <div class="order-info">
                <div class="order-id-section">
                  <h3 class="order-id">Order #{{ order.orderNumber }}</h3>
                  <span class="order-date">{{ formatDate(order.date) }}</span>
                </div>
                <div class="order-status-section">
                  <span class="status-badge" :class="order.status">
                    <div class="status-dot"></div>
                    {{ formatOrderStatus(order.status) }}
                  </span>
                  <div class="order-total">${{ order.total.toFixed(2) }}</div>
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div class="order-items">
              <div v-for="item in order.items" :key="item.id" class="order-item">
                <div class="item-image-container">
                  <img :src="item.image" :alt="item.name" class="item-image" />
                  <div class="item-quantity-badge">{{ item.quantity }}</div>
                </div>
                <div class="item-details">
                  <h4 class="item-name">{{ item.name }}</h4>
                  <p class="item-variant">{{ item.variant }}</p>
                  <div class="item-price">${{ item.price.toFixed(2) }}</div>
                </div>
              </div>
            </div>

            <!-- Tracking Info -->
            <div v-if="order.tracking && order.status !== 'cancelled'" class="tracking-section">
              <div class="tracking-header">
                <div class="tracking-info">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <div class="tracking-details">
                    <span class="tracking-carrier">{{ order.tracking.carrier }}</span>
                    <span class="tracking-number">{{ order.tracking.trackingNumber }}</span>
                  </div>
                </div>
                <div v-if="order.tracking.estimatedDelivery" class="eta-info">
                  <span class="eta-label">ETA:</span>
                  <span class="eta-date">{{ formatDate(order.tracking.estimatedDelivery) }}</span>
                </div>
              </div>
              
              <!-- Progress Bar -->
              <div v-if="order.status !== 'delivered'" class="tracking-progress">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: getProgressPercentage(order.status) + '%' }"></div>
                </div>
                <div class="progress-labels">
                  <span :class="{ active: ['processing', 'shipped', 'out-for-delivery', 'delivered'].includes(order.status) }">Processing</span>
                  <span :class="{ active: ['shipped', 'out-for-delivery', 'delivered'].includes(order.status) }">Shipped</span>
                  <span :class="{ active: ['out-for-delivery', 'delivered'].includes(order.status) }">Out for Delivery</span>
                  <span :class="{ active: order.status === 'delivered' }">Delivered</span>
                </div>
              </div>
            </div>

            <!-- Order Actions -->
            <div class="order-actions">
              <div class="primary-actions">
                <button 
                  v-if="order.tracking && order.tracking.trackingNumber !== 'N/A'"
                  @click="trackOrder(order)" 
                  class="action-btn primary"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Live Tracking
                </button>
                
                <button @click="reorderItems(order)" class="action-btn secondary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Reorder
                </button>

                <button @click="downloadInvoice(order)" class="action-btn ghost">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Invoice
                </button>
              </div>

              <div class="secondary-actions">
                <button 
                  v-if="order.canReturn && order.status === 'delivered'"
                  @click="initiateReturn(order)" 
                  class="action-btn return"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                  </svg>
                  Return
                </button>

                <button 
                  v-if="order.canCancel && ['processing', 'shipped'].includes(order.status)"
                  @click="cancelOrder(order)" 
                  class="action-btn cancel"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  Cancel
                </button>

                <button @click="viewOrderDetails(order)" class="action-btn details">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Details Modal -->
    <div v-if="showOrderDetailsModal && selectedOrder" class="modal-overlay" @click="closeOrderDetailsModal">
      <div class="modal-content order-details-modal" @click.stop>
        <div class="modal-header">
          <h3>Order Details #{{ selectedOrder.orderNumber }}</h3>
          <button @click="closeOrderDetailsModal" class="modal-close-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="order-details-content">
            <!-- Order Summary -->
            <div class="detail-section">
              <h4>Order Summary</h4>
              <div class="summary-grid">
                <div class="summary-item">
                  <span class="label">Order Date:</span>
                  <span class="value">{{ formatDate(selectedOrder.date) }}</span>
                </div>
                <div class="summary-item">
                  <span class="label">Status:</span>
                  <span class="value status" :class="selectedOrder.status">{{ formatOrderStatus(selectedOrder.status) }}</span>
                </div>
                <div class="summary-item">
                  <span class="label">Total Amount:</span>
                  <span class="value total">${{ selectedOrder.total.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Items -->
            <div class="detail-section">
              <h4>Items ({{ selectedOrder.items.length }})</h4>
              <div class="modal-items-list">
                <div v-for="item in selectedOrder.items" :key="item.id" class="modal-item">
                  <img :src="item.image" :alt="item.name" class="modal-item-image" />
                  <div class="modal-item-details">
                    <h5>{{ item.name }}</h5>
                    <p>{{ item.variant }}</p>
                    <div class="modal-item-pricing">
                      <span class="quantity">Qty: {{ item.quantity }}</span>
                      <span class="price">${{ item.price.toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Shipping Address -->
            <div class="detail-section">
              <h4>Shipping Address</h4>
              <div class="address-info">
                <p>{{ selectedOrder.shipping.address }}</p>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="detail-section">
              <h4>Payment Method</h4>
              <div class="payment-info">
                <span>{{ selectedOrder.payment.method }}</span>
                <span v-if="selectedOrder.payment.last4"> ending in {{ selectedOrder.payment.last4 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Orders',
  data() {
    return {
      searchQuery: '',
      statusFilter: '',
      timeFilter: '',
      showOrderDetailsModal: false,
      selectedOrder: null,
      showTrackingModal: false,
      selectedTrackingOrder: null,
      trackingUpdates: [],
      trackingUpdateInterval: null,
      showReturnModal: false,
      selectedReturnOrder: null,
      returnReason: '',
      returnItems: [],
      orders: [
        {
          id: 'ORD-12347',
          orderNumber: '12347',
          date: new Date('2024-01-15'),
          status: 'delivered',
          total: 189.97,
          items: [
            {
              id: 1,
              name: 'Nike Air Max 270',
              variant: 'Black/White - Size 9',
              price: 89.99,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop'
            },
            {
              id: 2,
              name: 'Adidas UltraBoost 22',
              variant: 'Core Black - Size 9',
              price: 49.99,
              quantity: 2,
              image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=100&h=100&fit=crop'
            }
          ],
          shipping: {
            method: 'Standard Delivery',
            cost: 0,
            address: '123 Park Avenue, Apt 4B, New York, NY 10012'
          },
          payment: {
            method: 'Credit Card',
            last4: '4242'
          },
          tracking: {
            carrier: 'FootTrack Express',
            trackingNumber: 'FT12347890',
            deliveredDate: new Date('2024-01-18')
          },
          canReturn: true,
          canCancel: false,
          returnDeadline: new Date('2024-02-18')
        },
        {
          id: 'ORD-12346',
          orderNumber: '12346',
          date: new Date('2024-01-10'),
          status: 'out-for-delivery',
          total: 124.98,
          items: [
            {
              id: 3,
              name: 'Converse Chuck Taylor All Star',
              variant: 'White High Top - Size 9',
              price: 65.99,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1611537227264-3b99df41e8c2?w=100&h=100&fit=crop'
            },
            {
              id: 4,
              name: 'Vans Old Skool',
              variant: 'Black/White - Size 9',
              price: 58.99,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=100&h=100&fit=crop'
            }
          ],
          shipping: {
            method: 'Express Delivery',
            cost: 9.00,
            address: '123 Park Avenue, Apt 4B, New York, NY 10012'
          },
          payment: {
            method: 'PayPal',
            last4: 'PayPal'
          },
          tracking: {
            carrier: 'SneakerShip Express',
            trackingNumber: 'SS12346789',
            estimatedDelivery: new Date('2024-01-16')
          },
          canReturn: false,
          canCancel: true
        },
        {
          id: 'ORD-12345',
          orderNumber: '12345',
          date: new Date('2024-01-05'),
          status: 'processing',
          total: 75.50,
          items: [
            {
              id: 5,
              name: 'Puma RS-X3',
              variant: 'White/Blue - Size 9',
              price: 75.50,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=100&h=100&fit=crop'
            }
          ],
          shipping: {
            method: 'Standard Delivery',
            cost: 0,
            address: '123 Park Avenue, Apt 4B, New York, NY 10012'
          },
          payment: {
            method: 'Credit Card',
            last4: '1234'
          },
          tracking: {
            carrier: 'FootTrack Express',
            trackingNumber: 'FT12345678',
            estimatedDelivery: new Date('2024-01-12')
          },
          canReturn: false,
          canCancel: true
        },
        {
          id: 'ORD-12344',
          orderNumber: '12344',
          date: new Date('2023-12-20'),
          status: 'cancelled',
          total: 45.99,
          items: [
            {
              id: 6,
              name: 'New Balance 990v5',
              variant: 'Grey - Size 10',
              price: 45.99,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop'
            }
          ],
          shipping: {
            method: 'Standard Delivery',
            cost: 0,
            address: '123 Park Avenue, Apt 4B, New York, NY 10012'
          },
          payment: {
            method: 'Credit Card',
            last4: '1234'
          },
          tracking: {
            carrier: 'N/A',
            trackingNumber: 'N/A',
            cancelledDate: new Date('2023-12-21')
          },
          canReturn: false,
          canCancel: false
        }
      ]
    }
  },
  computed: {
    filteredOrders() {
      let filtered = this.orders

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(order => 
          order.orderNumber.toLowerCase().includes(query) ||
          order.items.some(item => item.name.toLowerCase().includes(query))
        )
      }

      // Filter by status
      if (this.statusFilter) {
        filtered = filtered.filter(order => order.status === this.statusFilter)
      }

      // Filter by time
      if (this.timeFilter) {
        const now = new Date()
        const filterDays = {
          '30-days': 30,
          '90-days': 90,
          '1-year': 365
        }

        if (filterDays[this.timeFilter]) {
          const cutoffDate = new Date(now - filterDays[this.timeFilter] * 24 * 60 * 60 * 1000)
          filtered = filtered.filter(order => order.date >= cutoffDate)
        }
      }

      return filtered.sort((a, b) => b.date - a.date)
    },

    activeOrders() {
      return this.orders.filter(order => ['processing', 'shipped', 'out-for-delivery'].includes(order.status))
    },

    totalSpent() {
      return this.orders
        .filter(order => order.status !== 'cancelled')
        .reduce((sum, order) => sum + order.total, 0)
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },

    formatOrderStatus(status) {
      const statusMap = {
        'processing': 'Processing',
        'shipped': 'Shipped',
        'out-for-delivery': 'Out for Delivery',
        'delivered': 'Delivered',
        'cancelled': 'Cancelled'
      }
      return statusMap[status] || status
    },

    getProgressPercentage(status) {
      const progressMap = {
        'processing': 25,
        'shipped': 50,
        'out-for-delivery': 75,
        'delivered': 100
      }
      return progressMap[status] || 0
    },

    trackOrder(order) {
      // Open tracking modal with live tracking info
      this.selectedTrackingOrder = order
      this.showTrackingModal = true

      // Simulate live tracking updates
      this.startLiveTracking(order)

      this.$toast?.success(`Live tracking opened for order #${order.orderNumber}`)
    },

    reorderItems(order) {
      // Add all items from the order to cart
      order.items.forEach(item => {
        // Map order item to product format for cart
        const product = {
          id: item.id,
          name: item.name,
          brand: item.brand || 'Generic',
          price: item.price,
          image: item.image
        }

        // Extract size and color from variant (e.g., "Black/White - Size 9")
        const variantParts = item.variant.split(' - ')
        const color = variantParts[0] || 'Default'
        const size = variantParts[1] ? variantParts[1].replace('Size ', '') : 'M'

        this.$store.dispatch('cart/addToCart', {
          product,
          size,
          color,
          quantity: item.quantity
        })
      })

      this.$toast?.success(`${order.items.length} items added to cart for reorder!`)
      this.$router.push('/cart')
    },

    downloadInvoice(order) {
      // Generate and download invoice PDF
      this.generateInvoicePDF(order)
      this.$toast?.success(`Invoice downloaded for order #${order.orderNumber}`)
    },

    initiateReturn(order) {
      // Open return request modal
      this.selectedReturnOrder = order
      this.showReturnModal = true
      this.$toast?.info(`Return request opened for order #${order.orderNumber}`)
    },

    cancelOrder(order) {
      if (confirm(`Are you sure you want to cancel order #${order.orderNumber}? This action cannot be undone.`)) {
        // In a real app, this would make an API call
        const orderIndex = this.orders.findIndex(o => o.id === order.id)
        if (orderIndex !== -1) {
          this.orders[orderIndex].status = 'cancelled'
          this.orders[orderIndex].canCancel = false
          this.$toast?.success(`Order #${order.orderNumber} has been cancelled`)
        }
      }
    },

    viewOrderDetails(order) {
      this.selectedOrder = order
      this.showOrderDetailsModal = true
    },

    closeOrderDetailsModal() {
      this.showOrderDetailsModal = false
      this.selectedOrder = null
    },

    startLiveTracking(order) {
      // Clear any existing interval
      if (this.trackingUpdateInterval) {
        clearInterval(this.trackingUpdateInterval)
      }

      // Initialize tracking updates with current status
      this.trackingUpdates = this.generateTrackingHistory(order)

      // Simulate live updates every 30 seconds
      this.trackingUpdateInterval = setInterval(() => {
        if (order.status !== 'delivered' && order.status !== 'cancelled') {
          this.simulateTrackingUpdate(order)
        }
      }, 30000)
    },

    generateTrackingHistory(order) {
      const now = new Date()
      const orderDate = new Date(order.date)

      const updates = [
        {
          status: 'Order Placed',
          description: `Order #${order.orderNumber} has been placed successfully`,
          timestamp: orderDate,
          location: 'Online',
          completed: true
        }
      ]

      if (['shipped', 'out-for-delivery', 'delivered'].includes(order.status)) {
        updates.push({
          status: 'Processing',
          description: 'Your order is being prepared for shipment',
          timestamp: new Date(orderDate.getTime() + 1 * 60 * 60 * 1000), // +1 hour
          location: 'Warehouse',
          completed: true
        })
      }

      if (['shipped', 'out-for-delivery', 'delivered'].includes(order.status)) {
        updates.push({
          status: 'Shipped',
          description: `Package shipped via ${order.tracking.carrier}`,
          timestamp: new Date(orderDate.getTime() + 24 * 60 * 60 * 1000), // +1 day
          location: 'Distribution Center',
          completed: true
        })
      }

      if (['out-for-delivery', 'delivered'].includes(order.status)) {
        updates.push({
          status: 'Out for Delivery',
          description: 'Package is out for delivery',
          timestamp: new Date(orderDate.getTime() + 48 * 60 * 60 * 1000), // +2 days
          location: 'Local Facility',
          completed: true
        })
      }

      if (order.status === 'delivered') {
        updates.push({
          status: 'Delivered',
          description: 'Package delivered successfully',
          timestamp: order.tracking.deliveredDate || new Date(orderDate.getTime() + 72 * 60 * 60 * 1000),
          location: 'Customer Address',
          completed: true
        })
      }

      return updates.reverse() // Most recent first
    },

    simulateTrackingUpdate(order) {
      const randomUpdates = [
        'Package is in transit',
        'Package arrived at sorting facility',
        'Package is being processed',
        'Package loaded for delivery'
      ]

      const randomUpdate = randomUpdates[Math.floor(Math.random() * randomUpdates.length)]

      this.trackingUpdates.unshift({
        status: 'In Transit',
        description: randomUpdate,
        timestamp: new Date(),
        location: 'Transit Hub',
        completed: false
      })
    },

    closeTrackingModal() {
      this.showTrackingModal = false
      this.selectedTrackingOrder = null
      this.trackingUpdates = []

      if (this.trackingUpdateInterval) {
        clearInterval(this.trackingUpdateInterval)
        this.trackingUpdateInterval = null
      }
    },

    generateInvoicePDF(order) {
      // Create invoice content
      const invoiceContent = this.createInvoiceHTML(order)

      // Create a new window for printing
      const printWindow = window.open('', '_blank')
      printWindow.document.write(invoiceContent)
      printWindow.document.close()

      // Wait for content to load then print
      printWindow.onload = () => {
        printWindow.print()
        printWindow.close()
      }
    },

    createInvoiceHTML(order) {
      const currentDate = new Date().toLocaleDateString()
      const orderDate = this.formatDate(order.date)

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invoice - Order #${order.orderNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
            .invoice-header { border-bottom: 2px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; }
            .invoice-title { color: #3b82f6; font-size: 2rem; margin: 0; }
            .invoice-info { display: flex; justify-content: space-between; margin: 20px 0; }
            .invoice-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .invoice-table th { background-color: #f8f9fa; font-weight: bold; }
            .total-row { background-color: #f8f9fa; font-weight: bold; }
            .company-info { margin-bottom: 30px; }
            .customer-info { margin: 20px 0; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <h1 class="invoice-title">INVOICE</h1>
            <div class="company-info">
              <h3>Footwear Market</h3>
              <p>123 Commerce Street<br>City, State 12345<br>Phone: (555) 123-4567</p>
            </div>
          </div>

          <div class="invoice-info">
            <div>
              <h4>Bill To:</h4>
              <div class="customer-info">
                <p><strong>Customer Address:</strong><br>${order.shipping.address}</p>
              </div>
            </div>
            <div>
              <p><strong>Invoice Date:</strong> ${currentDate}</p>
              <p><strong>Order Number:</strong> #${order.orderNumber}</p>
              <p><strong>Order Date:</strong> ${orderDate}</p>
              <p><strong>Status:</strong> ${this.formatOrderStatus(order.status)}</p>
            </div>
          </div>

          <table class="invoice-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Variant</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.variant}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td>$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="4"><strong>Shipping (${order.shipping.method})</strong></td>
                <td><strong>$${order.shipping.cost.toFixed(2)}</strong></td>
              </tr>
              <tr class="total-row">
                <td colspan="4"><strong>Total Amount</strong></td>
                <td><strong>$${order.total.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top: 40px;">
            <h4>Payment Information:</h4>
            <p><strong>Payment Method:</strong> ${order.payment.method}</p>
            ${order.payment.last4 ? `<p><strong>Card:</strong> **** **** **** ${order.payment.last4}</p>` : ''}
          </div>

          ${order.tracking ? `
            <div style="margin-top: 30px;">
              <h4>Shipping Information:</h4>
              <p><strong>Carrier:</strong> ${order.tracking.carrier}</p>
              <p><strong>Tracking Number:</strong> ${order.tracking.trackingNumber}</p>
            </div>
          ` : ''}

          <div style="margin-top: 40px; text-align: center; color: #666; font-size: 0.9rem;">
            <p>Thank you for your business!</p>
            <p>For questions about this invoice, contact us at support@footwearmarket.com</p>
          </div>
        </body>
        </html>
      `
    },

    closeReturnModal() {
      this.showReturnModal = false
      this.selectedReturnOrder = null
      this.returnReason = ''
      this.returnItems = []
    },

    initializeReturnItems(order) {
      this.returnItems = order.items.map(item => ({
        ...item,
        selected: false,
        returnQuantity: 1
      }))
    },

    submitReturnRequest() {
      const selectedItems = this.returnItems.filter(item => item.selected)

      if (selectedItems.length === 0) {
        this.$toast?.error('Please select at least one item to return')
        return
      }

      if (!this.returnReason.trim()) {
        this.$toast?.error('Please provide a reason for the return')
        return
      }

      // In a real app, this would make an API call
      const returnId = 'RET' + Math.floor(Math.random() * 100000)

      this.$toast?.success(`Return request #${returnId} submitted successfully! We'll contact you within 24 hours.`)
      this.closeReturnModal()
    }
  }
}
</script>

<style scoped>
.orders-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

/* Hero Section */
.orders-hero {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  padding: var(--space-2xl) 0;
  border-bottom: 1px solid #e1e5e9;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.hero-content {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
  margin-bottom: var(--space-xl);
}

.hero-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
}

.hero-icon svg {
  width: 32px;
  height: 32px;
}

.hero-text h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: var(--space-sm);
  background: linear-gradient(135deg, #1f2937 0%, #3b82f6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-text p {
  font-size: var(--font-size-lg);
  color: #64748b;
  line-height: 1.6;
  max-width: 600px;
}

.orders-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-xl);
}

.stat-item {
  text-align: center;
  padding: var(--space-lg);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border: 1px solid #e1e5e9;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: var(--space-xs);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Filters */
.orders-filters {
  background: white;
  padding: var(--space-xl) 0;
  border-bottom: 1px solid #e1e5e9;
}

.filters-row {
  display: flex;
  gap: var(--space-lg);
  align-items: center;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #6b7280;
}

.search-input {
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: var(--font-size-sm);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.filter-controls {
  display: flex;
  gap: var(--space-md);
}

.status-filter,
.time-filter {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-filter:focus,
.time-filter:focus {
  outline: none;
  border-color: #3b82f6;
}

/* Orders Content */
.orders-content {
  padding: var(--space-2xl) 0;
}

.empty-orders {
  text-align: center;
  padding: var(--space-2xl);
  background: white;
  border-radius: 16px;
  border: 1px solid #e1e5e9;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--space-lg);
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon svg {
  width: 40px;
  height: 40px;
  color: #6b7280;
}

.empty-orders h3 {
  font-size: var(--font-size-xl);
  color: #1f2937;
  margin-bottom: var(--space-sm);
}

.empty-orders p {
  color: #6b7280;
  margin-bottom: var(--space-lg);
}

.shop-now-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.shop-now-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
}

/* Order Cards */
.orders-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.order-card {
  background: white;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  padding: var(--space-xl);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.order-card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
}

.order-header {
  margin-bottom: var(--space-lg);
}

.order-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.order-id {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: #1f2937;
  margin-bottom: var(--space-xs);
}

.order-date {
  font-size: var(--font-size-sm);
  color: #6b7280;
}

.order-status-section {
  text-align: right;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  border-radius: 8px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--space-sm);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-badge.processing {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.processing .status-dot {
  background: #d97706;
  animation: pulse 2s infinite;
}

.status-badge.shipped {
  background: #dbeafe;
  color: #1d4ed8;
}

.status-badge.shipped .status-dot {
  background: #1d4ed8;
}

.status-badge.out-for-delivery {
  background: #fecaca;
  color: #dc2626;
}

.status-badge.out-for-delivery .status-dot {
  background: #dc2626;
  animation: pulse 2s infinite;
}

.status-badge.delivered {
  background: #d1fae5;
  color: #10b981;
}

.status-badge.delivered .status-dot {
  background: #10b981;
}

.status-badge.cancelled {
  background: #f3f4f6;
  color: #6b7280;
}

.status-badge.cancelled .status-dot {
  background: #6b7280;
}

.order-total {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: #1f2937;
}

/* Order Items */
.order-items {
  display: flex;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
  flex-wrap: wrap;
}

.order-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex: 1;
  min-width: 250px;
}

.item-image-container {
  position: relative;
  flex-shrink: 0;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
}

.item-quantity-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #3b82f6;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: #1f2937;
  margin-bottom: var(--space-xs);
}

.item-variant {
  font-size: var(--font-size-sm);
  color: #6b7280;
  margin-bottom: var(--space-xs);
}

.item-price {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: #10b981;
}

/* Tracking Section */
.tracking-section {
  background: #f8fafc;
  border-radius: 12px;
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  border: 1px solid #e2e8f0;
}

.tracking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.tracking-info {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.tracking-info svg {
  width: 20px;
  height: 20px;
  color: #3b82f6;
}

.tracking-details {
  display: flex;
  flex-direction: column;
}

.tracking-carrier {
  font-weight: 600;
  color: #1f2937;
  font-size: var(--font-size-sm);
}

.tracking-number {
  font-size: var(--font-size-xs);
  color: #6b7280;
}

.eta-info {
  text-align: right;
}

.eta-label {
  font-size: var(--font-size-xs);
  color: #6b7280;
  display: block;
}

.eta-date {
  font-weight: 600;
  color: #1f2937;
  font-size: var(--font-size-sm);
}

/* Progress Bar */
.tracking-progress {
  margin-top: var(--space-md);
}

.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: var(--space-sm);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  border-radius: 8px;
  transition: width 0.3s ease;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: #6b7280;
}

.progress-labels span.active {
  color: #10b981;
  font-weight: 600;
}

/* Order Actions */
.order-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.primary-actions,
.secondary-actions {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 12px 20px;
  border: 2px solid;
  border-radius: 8px;
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.action-btn.primary {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border-color: transparent;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
}

.action-btn.secondary {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-color: transparent;
}

.action-btn.secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
}

.action-btn.ghost {
  background: white;
  color: #374151;
  border-color: #d1d5db;
}

.action-btn.ghost:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.action-btn.return {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  border-color: transparent;
}

.action-btn.return:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
}

.action-btn.cancel {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border-color: transparent;
}

.action-btn.cancel:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
}

.action-btn.details {
  background: white;
  color: #6b7280;
  border-color: #e5e7eb;
}

.action-btn.details:hover {
  background: #f9fafb;
  color: #374151;
}

/* Modal */
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
  padding: var(--space-lg);
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg) var(--space-xl);
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.modal-header h3 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: #1f2937;
}

.modal-close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #f3f4f6;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: #e5e7eb;
}

.modal-close-btn svg {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.modal-body {
  padding: var(--space-xl);
  overflow-y: auto;
  max-height: calc(80vh - 100px);
}

.detail-section {
  margin-bottom: var(--space-xl);
}

.detail-section h4 {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: #1f2937;
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid #e5e7eb;
}

.summary-grid {
  display: grid;
  gap: var(--space-md);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-item .label {
  color: #6b7280;
  font-size: var(--font-size-sm);
}

.summary-item .value {
  font-weight: 600;
  color: #1f2937;
}

.summary-item .value.status {
  padding: var(--space-xs) var(--space-sm);
  border-radius: 6px;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
}

.summary-item .value.total {
  font-size: var(--font-size-lg);
  color: #10b981;
}

.modal-items-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.modal-item {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-md);
  background: #f9fafb;
  border-radius: 8px;
}

.modal-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.modal-item-details {
  flex: 1;
}

.modal-item-details h5 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: var(--space-xs);
}

.modal-item-details p {
  font-size: var(--font-size-sm);
  color: #6b7280;
  margin-bottom: var(--space-sm);
}

.modal-item-pricing {
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

.address-info,
.payment-info {
  color: #374151;
  line-height: 1.5;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(245, 158, 11, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: var(--space-lg);
  }

  .hero-text h1 {
    font-size: 2rem;
  }

  .filters-row {
    flex-direction: column;
    gap: var(--space-md);
  }

  .search-box {
    max-width: none;
  }

  .filter-controls {
    width: 100%;
    justify-content: space-between;
  }

  .order-info {
    flex-direction: column;
    gap: var(--space-md);
  }

  .order-status-section {
    text-align: left;
  }

  .order-items {
    flex-direction: column;
  }

  .order-item {
    min-width: auto;
  }

  .tracking-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }

  .eta-info {
    text-align: left;
  }

  .primary-actions,
  .secondary-actions {
    flex-direction: column;
  }

  .action-btn {
    justify-content: center;
  }

  .orders-stats {
    grid-template-columns: 1fr;
  }

  .modal-content {
    margin: var(--space-sm);
    max-width: none;
  }
}
</style>
