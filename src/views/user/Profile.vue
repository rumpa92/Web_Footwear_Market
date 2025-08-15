<template>
  <div class="profile-page">
    <div class="container">
      <!-- Profile Header -->
      <div class="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <!-- Profile Content -->
      <div class="profile-content">
        <!-- Sidebar Navigation -->
        <div class="profile-sidebar">
          <nav class="profile-nav">
            <a
              v-for="section in profileSections"
              :key="section.id"
              @click="activeSection = section.id"
              class="nav-item"
              :class="{ active: activeSection === section.id }"
            >
              <span class="nav-icon" v-html="section.icon"></span>
              <span class="nav-text">{{ section.name }}</span>
            </a>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="profile-main">
          <!-- Section 1: Profile Overview -->
          <div v-if="activeSection === 'overview'" class="section">
            <div class="section-header">
              <h2>Profile Overview</h2>
              <p>Your basic profile information</p>
            </div>
            
            <div class="overview-card">
              <div class="profile-avatar-section">
                <div class="avatar-container">
                  <img :src="currentUser.avatar" :alt="currentUser.name" class="profile-avatar" />
                  <button class="edit-avatar-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="profile-info">
                <h3>{{ currentUser.name }}</h3>
                <div class="contact-details">
                  <div class="detail-item">
                    <span class="label">Email:</span>
                    <span class="value">{{ currentUser.email }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">Phone:</span>
                    <span class="value">{{ currentUser.phone || '+1 (555) 123-4567' }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">Member since:</span>
                    <span class="value">{{ formatDate(currentUser.joinDate || new Date()) }}</span>
                  </div>
                </div>
                
                <button class="edit-profile-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <!-- Section 2: Account Details -->
          <div v-if="activeSection === 'account'" class="section">
            <div class="section-header">
              <h2>Account Details</h2>
              <p>Manage your account information and security</p>
            </div>
            
            <div class="account-cards">
              <div class="account-card">
                <h3>Personal Information</h3>
                <form class="account-form">
                  <div class="form-row">
                    <div class="form-group">
                      <label>Full Name</label>
                      <input v-model="accountForm.name" type="text" />
                    </div>
                    <div class="form-group">
                      <label>Email</label>
                      <input v-model="accountForm.email" type="email" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Phone</label>
                      <input v-model="accountForm.phone" type="tel" />
                    </div>
                    <div class="form-group">
                      <label>Date of Birth</label>
                      <input v-model="accountForm.dob" type="date" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Gender</label>
                    <select v-model="accountForm.gender">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button type="button" @click="updateAccount" class="save-btn">Save Changes</button>
                </form>
              </div>
              
              <div class="account-card">
                <h3>Security</h3>
                <div class="security-actions">
                  <button @click="changePassword" class="security-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <circle cx="12" cy="16" r="1"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                    Change Password
                  </button>
                  <button @click="forgotPassword" class="security-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Reset Password
                  </button>
                  <button @click="signOut" class="security-btn danger">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 3: Saved Addresses -->
          <div v-if="activeSection === 'addresses'" class="section">
            <div class="section-header">
              <h2>Saved Addresses</h2>
              <p>Manage your shipping and billing addresses</p>
              <button @click="addNewAddress" class="add-btn">Add New Address</button>
            </div>
            
            <div class="addresses-grid">
              <div v-for="address in addresses" :key="address.id" class="address-card">
                <div class="address-header">
                  <h4>{{ address.label }}</h4>
                  <span v-if="address.isDefault" class="default-badge">Default</span>
                </div>
                <div class="address-content">
                  <p>{{ address.name }}</p>
                  <p>{{ address.street }}</p>
                  <p>{{ address.city }}, {{ address.state }} {{ address.zip }}</p>
                  <p>{{ address.phone }}</p>
                </div>
                <div class="address-actions">
                  <button @click="editAddress(address)" class="edit-btn">Edit</button>
                  <button @click="deleteAddress(address.id)" class="delete-btn">Delete</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 4: Payment & Wallet -->
          <div v-if="activeSection === 'payment'" class="section">
            <div class="section-header">
              <h2>Payment & Wallet</h2>
              <p>Manage your payment methods and wallet</p>
            </div>
            
            <div class="payment-sections">
              <div class="payment-card">
                <h3>Wallet Balance</h3>
                <div class="wallet-info">
                  <div class="balance">
                    <span class="amount">${{ walletBalance.toFixed(2) }}</span>
                    <span class="label">Available Balance</span>
                  </div>
                  <button @click="topUpWallet" class="topup-btn">Top Up</button>
                </div>
                <div class="recent-transactions">
                  <h4>Recent Transactions</h4>
                  <div v-for="transaction in recentTransactions" :key="transaction.id" class="transaction-item">
                    <span class="transaction-desc">{{ transaction.description }}</span>
                    <span class="transaction-amount" :class="transaction.type">{{ transaction.type === 'credit' ? '+' : '-' }}${{ transaction.amount }}</span>
                  </div>
                </div>
              </div>
              
              <div class="payment-card">
                <h3>Saved Cards</h3>
                <div class="cards-list">
                  <div v-for="card in savedCards" :key="card.id" class="card-item">
                    <div class="card-info">
                      <span class="card-number">**** **** **** {{ card.lastFour }}</span>
                      <span class="card-type">{{ card.type }}</span>
                    </div>
                    <div class="card-actions">
                      <button @click="editCard(card)" class="edit-btn">Edit</button>
                      <button @click="deleteCard(card.id)" class="delete-btn">Remove</button>
                    </div>
                  </div>
                </div>
                <button @click="addNewCard" class="add-card-btn">Add New Card</button>
              </div>
            </div>
          </div>

          <!-- Section 5: Orders & Tracking -->
          <div v-if="activeSection === 'orders'" class="section">
            <div class="section-header">
              <h2>Orders & Tracking</h2>
              <p>View your order history and track current orders</p>
            </div>
            
            <div class="orders-content">
              <div class="orders-filter">
                <select v-model="orderFilter">
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div class="orders-list">
                <div v-for="order in filteredOrders" :key="order.id" class="order-card">
                  <div class="order-header">
                    <div class="order-info">
                      <h4>Order #{{ order.id }}</h4>
                      <span class="order-date">{{ formatDate(order.date) }}</span>
                    </div>
                    <div class="order-status">
                      <span class="status-badge" :class="order.status">{{ order.status }}</span>
                      <span class="order-total">${{ order.total.toFixed(2) }}</span>
                    </div>
                  </div>
                  
                  <div class="order-items">
                    <div v-for="item in order.items" :key="item.id" class="order-item">
                      <img :src="item.image" :alt="item.name" class="item-image" />
                      <div class="item-details">
                        <h5>{{ item.name }}</h5>
                        <p>Size: {{ item.size }}, Color: {{ item.color }}</p>
                        <p>Qty: {{ item.quantity }}</p>
                      </div>
                      <div class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</div>
                    </div>
                  </div>
                  
                  <div class="order-actions">
                    <button @click="trackOrder(order)" class="track-btn">Track Order</button>
                    <button @click="reorderItems(order)" class="reorder-btn">Reorder</button>
                    <button v-if="order.status === 'delivered'" @click="returnOrder(order)" class="return-btn">Return</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 6: Wishlist & Recently Viewed -->
          <div v-if="activeSection === 'wishlist'" class="section">
            <div class="section-header">
              <h2>Wishlist & Recently Viewed</h2>
              <p>Your saved items and browsing history</p>
            </div>
            
            <div class="wishlist-content">
              <div class="wishlist-section">
                <h3>Wishlist ({{ wishlist.length }})</h3>
                <div class="products-grid">
                  <div v-for="item in wishlist" :key="item.id" class="product-card">
                    <img :src="item.image" :alt="item.name" />
                    <h4>{{ item.name }}</h4>
                    <p class="brand">{{ item.brand }}</p>
                    <p class="price">${{ item.price }}</p>
                    <div class="card-actions">
                      <button @click="addToCart(item)" class="add-cart-btn">Add to Cart</button>
                      <button @click="removeFromWishlist(item.id)" class="remove-btn">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="recently-viewed-section">
                <h3>Recently Viewed</h3>
                <div class="products-carousel">
                  <div v-for="item in recentlyViewed" :key="item.id" class="product-card">
                    <img :src="item.image" :alt="item.name" />
                    <h4>{{ item.name }}</h4>
                    <p class="brand">{{ item.brand }}</p>
                    <p class="price">${{ item.price }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 7: Returns, Refunds & Reviews -->
          <div v-if="activeSection === 'returns'" class="section">
            <div class="section-header">
              <h2>Returns, Refunds & Reviews</h2>
              <p>Manage returns, track refunds, and submit reviews</p>
            </div>
            
            <div class="returns-content">
              <div class="returns-section">
                <h3>Return Requests</h3>
                <div v-for="returnReq in returnRequests" :key="returnReq.id" class="return-card">
                  <div class="return-info">
                    <h4>Return #{{ returnReq.id }}</h4>
                    <span class="return-status">{{ returnReq.status }}</span>
                  </div>
                  <p>Order #{{ returnReq.orderId }} - {{ returnReq.reason }}</p>
                  <div class="return-progress">
                    <div class="progress-bar" :style="{ width: returnReq.progress + '%' }"></div>
                  </div>
                </div>
              </div>
              
              <div class="reviews-section">
                <h3>Pending Reviews</h3>
                <div v-for="review in pendingReviews" :key="review.id" class="review-card">
                  <img :src="review.product.image" :alt="review.product.name" />
                  <div class="review-details">
                    <h4>{{ review.product.name }}</h4>
                    <button @click="writeReview(review)" class="review-btn">Write Review</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 8: Support & Help -->
          <div v-if="activeSection === 'support'" class="section">
            <div class="section-header">
              <h2>Support & Help</h2>
              <p>Get help and support for your account</p>
            </div>
            
            <div class="support-content">
              <div class="support-options">
                <div class="support-card">
                  <h3>FAQ & Help Center</h3>
                  <p>Find answers to common questions</p>
                  <button @click="openFAQ" class="support-btn">View FAQ</button>
                </div>
                
                <div class="support-card">
                  <h3>Live Chat</h3>
                  <p>Chat with our support team</p>
                  <button @click="startChat" class="support-btn">Start Chat</button>
                </div>
                
                <div class="support-card">
                  <h3>Support Tickets</h3>
                  <p>Track your support requests</p>
                  <button @click="viewTickets" class="support-btn">View Tickets</button>
                </div>
              </div>
              
              <div class="contact-info">
                <h3>Contact Information</h3>
                <div class="contact-details">
                  <p><strong>Email:</strong> support@footmarket.com</p>
                  <p><strong>Phone:</strong> 1-800-FOOTMARKET</p>
                  <p><strong>Hours:</strong> 24/7 Customer Support</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 9: Policies & Legal -->
          <div v-if="activeSection === 'policies'" class="section">
            <div class="section-header">
              <h2>Policies & Legal</h2>
              <p>Review our terms, privacy policy, and legal information</p>
            </div>
            
            <div class="policies-content">
              <div class="policy-links">
                <a href="/terms" class="policy-link">
                  <h4>Terms of Service</h4>
                  <p>Read our terms and conditions</p>
                </a>
                
                <a href="/privacy" class="policy-link">
                  <h4>Privacy Policy</h4>
                  <p>How we handle your personal data</p>
                </a>
                
                <a href="/return-policy" class="policy-link">
                  <h4>Return Policy</h4>
                  <p>Our return and exchange guidelines</p>
                </a>
                
                <a href="/shipping-policy" class="policy-link">
                  <h4>Shipping Policy</h4>
                  <p>Delivery terms and conditions</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Profile',
  data() {
    return {
      activeSection: 'overview',
      accountForm: {
        name: '',
        email: '',
        phone: '',
        dob: '',
        gender: ''
      },
      orderFilter: 'all',
      walletBalance: 245.50,
      recentTransactions: [
        { id: 1, description: 'Order #12345', amount: 89.99, type: 'debit' },
        { id: 2, description: 'Wallet Top-up', amount: 100.00, type: 'credit' },
        { id: 3, description: 'Refund #12340', amount: 45.50, type: 'credit' }
      ],
      savedCards: [
        { id: 1, lastFour: '4567', type: 'Visa' },
        { id: 2, lastFour: '8901', type: 'Mastercard' }
      ],
      returnRequests: [
        { id: 1001, orderId: 12345, reason: 'Size too small', status: 'Processing', progress: 60 }
      ],
      pendingReviews: [
        { id: 1, product: { name: 'Nike Air Force 1', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100&h=100&fit=crop' } }
      ],
      recentlyViewed: [
        { id: 1, name: 'Nike Air Force 1', brand: 'Nike', price: 149.99, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop' }
      ],
      profileSections: [
        { id: 'overview', name: 'Profile Overview', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>' },
        { id: 'account', name: 'Account Details', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' },
        { id: 'addresses', name: 'Saved Addresses', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>' },
        { id: 'payment', name: 'Payment & Wallet', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>' },
        { id: 'orders', name: 'Orders & Tracking', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z"/></svg>' },
        { id: 'wishlist', name: 'Wishlist & Recently Viewed', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>' },
        { id: 'returns', name: 'Returns & Reviews', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>' },
        { id: 'support', name: 'Support & Help', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>' },
        { id: 'policies', name: 'Policies & Legal', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>' }
      ]
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser', 'wishlist', 'addresses', 'orders']),
    ...mapGetters('cart', ['cartItems']),
    
    filteredOrders() {
      if (this.orderFilter === 'all') return this.orders
      return this.orders.filter(order => order.status === this.orderFilter)
    }
  },
  methods: {
    ...mapActions('user', ['logout', 'updateProfile', 'addAddress', 'updateAddress', 'deleteAddress']),
    ...mapActions('cart', ['addToCart']),
    
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    
    updateAccount() {
      this.updateProfile(this.accountForm)
      this.$toast.success('Account updated successfully!')
    },
    
    changePassword() {
      // Implementation for password change
      console.log('Change password')
    },
    
    forgotPassword() {
      // Implementation for password reset
      console.log('Forgot password')
    },
    
    signOut() {
      this.logout()
      this.$router.push('/')
    },
    
    addNewAddress() {
      // Implementation for adding new address
      console.log('Add new address')
    },
    
    editAddress(address) {
      // Implementation for editing address
      console.log('Edit address', address)
    },
    
    deleteAddress(addressId) {
      // Implementation for deleting address
      console.log('Delete address', addressId)
    },
    
    topUpWallet() {
      // Implementation for wallet top-up
      console.log('Top up wallet')
    },
    
    addNewCard() {
      // Implementation for adding new card
      console.log('Add new card')
    },
    
    editCard(card) {
      // Implementation for editing card
      console.log('Edit card', card)
    },
    
    deleteCard(cardId) {
      // Implementation for deleting card
      console.log('Delete card', cardId)
    },
    
    trackOrder(order) {
      // Implementation for order tracking
      console.log('Track order', order)
    },
    
    reorderItems(order) {
      // Implementation for reordering
      console.log('Reorder', order)
    },
    
    returnOrder(order) {
      // Implementation for return request
      console.log('Return order', order)
    },
    
    removeFromWishlist(productId) {
      // Implementation for wishlist removal
      console.log('Remove from wishlist', productId)
    },
    
    writeReview(review) {
      // Implementation for writing review
      console.log('Write review', review)
    },
    
    openFAQ() {
      // Implementation for FAQ
      console.log('Open FAQ')
    },
    
    startChat() {
      // Implementation for live chat
      console.log('Start chat')
    },
    
    viewTickets() {
      // Implementation for support tickets
      console.log('View tickets')
    }
  },
  
  mounted() {
    // Initialize form with current user data
    this.accountForm = {
      name: this.currentUser.name || '',
      email: this.currentUser.email || '',
      phone: this.currentUser.phone || '',
      dob: this.currentUser.dob || '',
      gender: this.currentUser.gender || ''
    }
  }
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 2rem 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.profile-header {
  text-align: center;
  margin-bottom: 3rem;
}

.profile-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.profile-header p {
  color: #6b7280;
  font-size: 1.1rem;
}

.profile-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3rem;
}

/* Sidebar Navigation */
.profile-sidebar {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.profile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #6b7280;
}

.nav-item:hover {
  background: #f8fafc;
  color: #3b82f6;
}

.nav-item.active {
  background: #3b82f6;
  color: white;
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
}

.nav-text {
  font-weight: 500;
  font-size: 0.9rem;
}

/* Main Content */
.profile-main {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.section-header {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.section-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: #6b7280;
  margin-bottom: 0;
}

.add-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

/* Profile Overview */
.overview-card {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
}

.profile-avatar-section {
  flex-shrink: 0;
}

.avatar-container {
  position: relative;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.edit-avatar-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #3b82f6;
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-avatar-btn:hover {
  background: #2563eb;
  transform: scale(1.1);
}

.edit-avatar-btn svg {
  width: 18px;
  height: 18px;
}

.profile-info h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.contact-details {
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  margin-bottom: 0.5rem;
}

.detail-item .label {
  font-weight: 600;
  color: #374151;
  min-width: 120px;
}

.detail-item .value {
  color: #6b7280;
}

.edit-profile-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #10b981;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-profile-btn:hover {
  background: #059669;
  transform: translateY(-2px);
}

.edit-profile-btn svg {
  width: 16px;
  height: 16px;
}

/* Account Details */
.account-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.account-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
}

.account-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.account-form {
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
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
}

.save-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.save-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.security-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.security-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: #374151;
}

.security-btn:hover {
  border-color: #3b82f6;
  background: #f8fafc;
}

.security-btn.danger {
  border-color: #ef4444;
  color: #ef4444;
}

.security-btn.danger:hover {
  background: #fef2f2;
}

.security-btn svg {
  width: 20px;
  height: 20px;
}

/* Addresses */
.addresses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.address-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

.address-card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.address-header h4 {
  font-weight: 600;
  color: #1f2937;
}

.default-badge {
  background: #10b981;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.address-content p {
  margin-bottom: 0.25rem;
  color: #6b7280;
}

.address-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.edit-btn,
.delete-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn {
  background: #3b82f6;
  color: white;
  border: none;
}

.edit-btn:hover {
  background: #2563eb;
}

.delete-btn {
  background: #ef4444;
  color: white;
  border: none;
}

.delete-btn:hover {
  background: #dc2626;
}

/* Payment & Wallet */
.payment-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.payment-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
}

.payment-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.wallet-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.balance .amount {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  display: block;
}

.balance .label {
  color: #6b7280;
  font-size: 0.9rem;
}

.topup-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.topup-btn:hover {
  background: #059669;
  transform: translateY(-2px);
}

.recent-transactions h4 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-desc {
  color: #374151;
  font-weight: 500;
}

.transaction-amount {
  font-weight: 600;
}

.transaction-amount.credit {
  color: #10b981;
}

.transaction-amount.debit {
  color: #ef4444;
}

.cards-list {
  margin-bottom: 1.5rem;
}

.card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 2px solid #e5e7eb;
}

.card-info {
  display: flex;
  flex-direction: column;
}

.card-number {
  font-weight: 600;
  color: #1f2937;
}

.card-type {
  color: #6b7280;
  font-size: 0.85rem;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.add-card-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.add-card-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

/* Orders */
.orders-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.orders-filter select {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

.order-card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.order-info h4 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.order-date {
  color: #6b7280;
  font-size: 0.9rem;
}

.order-status {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.shipped {
  background: #dbeafe;
  color: #1d4ed8;
}

.status-badge.delivered {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.order-total {
  font-weight: 700;
  color: #1f2937;
  font-size: 1.1rem;
}

.order-items {
  margin-bottom: 1rem;
}

.order-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  margin-bottom: 0.75rem;
  border: 2px solid #e5e7eb;
}

.order-item:last-child {
  margin-bottom: 0;
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

.item-details h5 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.item-details p {
  color: #6b7280;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.item-price {
  font-weight: 600;
  color: #1f2937;
  align-self: center;
}

.order-actions {
  display: flex;
  gap: 0.75rem;
}

.track-btn,
.reorder-btn,
.return-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.track-btn {
  background: #3b82f6;
  color: white;
  border: none;
}

.track-btn:hover {
  background: #2563eb;
}

.reorder-btn {
  background: #10b981;
  color: white;
  border: none;
}

.reorder-btn:hover {
  background: #059669;
}

.return-btn {
  background: #ef4444;
  color: white;
  border: none;
}

.return-btn:hover {
  background: #dc2626;
}

/* Wishlist */
.wishlist-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.wishlist-section h3,
.recently-viewed-section h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.products-grid,
.products-carousel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
  text-align: center;
}

.product-card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.product-card h4 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.product-card .brand {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.product-card .price {
  font-weight: 700;
  color: #3b82f6;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.add-cart-btn,
.remove-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-cart-btn {
  background: #3b82f6;
  color: white;
  border: none;
  flex: 1;
}

.add-cart-btn:hover {
  background: #2563eb;
}

.remove-btn {
  background: #ef4444;
  color: white;
  border: none;
}

.remove-btn:hover {
  background: #dc2626;
}

/* Returns */
.returns-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.returns-section h3,
.reviews-section h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.return-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  margin-bottom: 1rem;
}

.return-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.return-info h4 {
  font-weight: 600;
  color: #1f2937;
}

.return-status {
  background: #dbeafe;
  color: #1d4ed8;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.return-progress {
  background: #e5e7eb;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 1rem;
}

.progress-bar {
  background: #3b82f6;
  height: 100%;
  transition: width 0.3s ease;
}

.review-card {
  display: flex;
  gap: 1rem;
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  margin-bottom: 1rem;
}

.review-card img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
}

.review-details {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-details h4 {
  font-weight: 600;
  color: #1f2937;
}

.review-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.review-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

/* Support */
.support-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.support-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.support-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  text-align: center;
  transition: all 0.3s ease;
}

.support-card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.support-card h3 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.support-card p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.support-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.support-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.contact-info {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
}

.contact-info h3 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.contact-details p {
  margin-bottom: 0.5rem;
  color: #374151;
}

/* Policies */
.policies-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.policy-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.policy-link {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: block;
}

.policy-link:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.policy-link h4 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.policy-link p {
  color: #6b7280;
  margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .profile-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .profile-sidebar {
    position: static;
  }
  
  .profile-nav {
    flex-direction: row;
    overflow-x: auto;
    gap: 1rem;
  }
  
  .nav-item {
    white-space: nowrap;
    flex-shrink: 0;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .profile-page {
    padding: 1rem 0;
  }
  
  .profile-header h1 {
    font-size: 2rem;
  }
  
  .overview-card {
    flex-direction: column;
    text-align: center;
  }
  
  .account-cards,
  .payment-sections {
    grid-template-columns: 1fr;
  }
  
  .addresses-grid {
    grid-template-columns: 1fr;
  }
  
  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .order-actions {
    flex-wrap: wrap;
  }
  
  .support-options {
    grid-template-columns: 1fr;
  }
  
  .policy-links {
    grid-template-columns: 1fr;
  }
}
</style>
