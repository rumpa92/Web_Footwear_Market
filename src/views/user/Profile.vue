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
          <!-- Section 1: Profile Information -->
          <div v-if="activeSection === 'profile'" class="section">
            <div class="profile-info-card">
              <div class="card-header">
                <div class="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <h2>Profile Information</h2>
                <button class="edit-profile-btn" @click="toggleEditMode">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Edit Profile
                </button>
              </div>
              
              <div class="profile-details">
                <div class="detail-row">
                  <span class="detail-label">NAME:</span>
                  <span class="detail-value">{{ currentUser.name }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">EMAIL:</span>
                  <span class="detail-value">{{ currentUser.email }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">PHONE NUMBER:</span>
                  <span class="detail-value">{{ currentUser.phone || '9775637590' }}</span>
                </div>
              </div>
            </div>

            <!-- Personalized Feed Section -->
            <div class="feed-section">
              <div class="feed-header">
                <div class="feed-title">
                  <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <h3>Your Personalized Feed</h3>
                </div>
                <p class="feed-description">Curated products based on your preferences, skin profile, and purchase history</p>
              </div>

              <!-- AI Recommendations -->
              <div class="recommendations-section">
                <div class="recommendations-header">
                  <div class="ai-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    AI-Powered Recommendations
                  </div>
                </div>

                <div class="products-grid">
                  <div v-for="product in recommendedProducts" :key="product.id" class="product-card">
                    <div class="product-image-container">
                      <img :src="product.image" :alt="product.name" class="product-image" />
                      <div class="product-overlay">
                        <button class="quick-view-btn" @click="quickView(product)">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          </svg>
                          Quick View
                        </button>
                        <button class="wishlist-btn" @click="toggleWishlist(product)" :class="{ active: isInWishlist(product.id) }">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                          </svg>
                        </button>
                      </div>
                      <div v-if="product.discount" class="discount-badge">
                        SALE
                      </div>
                    </div>
                    <div class="product-info">
                      <h4 class="product-name">{{ product.name }}</h4>
                      <p class="product-brand">{{ product.brand }}</p>
                      <div class="product-pricing">
                        <span class="current-price">${{ product.price }}</span>
                        <span v-if="product.originalPrice" class="original-price">${{ product.originalPrice }}</span>
                      </div>
                      <div class="product-rating">
                        <div class="stars">
                          <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= product.rating }">★</span>
                        </div>
                        <span class="rating-text">({{ product.reviews }})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- View More Button -->
              <div class="view-more-section">
                <button class="view-more-btn" @click="loadMoreRecommendations">
                  <span>View More Recommendations</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Section 2: Avatar Management -->
          <div v-if="activeSection === 'avatar'" class="section">
            <div class="avatar-management-card">
              <div class="card-header">
                <div class="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h2>Avatar Management</h2>
              </div>
              
              <div class="avatar-content">
                <div class="current-avatar">
                  <img :src="currentUser.avatar" :alt="currentUser.name" class="avatar-preview" />
                  <div class="avatar-info">
                    <h3>{{ currentUser.name }}</h3>
                    <p>{{ currentUser.email }}</p>
                    <span class="member-since">Member since {{ formatDate(new Date()) }}</span>
                  </div>
                </div>
                
                <div class="avatar-options">
                  <button class="upload-btn" @click="uploadAvatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    Upload New Photo
                  </button>
                  <button class="remove-btn" @click="removeAvatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Remove Photo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Other sections remain the same but simplified -->
          <div v-if="activeSection === 'notifications'" class="section">
            <div class="simple-card">
              <h2>Notifications</h2>
              <p>Manage your notification preferences</p>
              <!-- Notification settings content -->
            </div>
          </div>

          <div v-if="activeSection === 'customer-support'" class="section">
            <div class="simple-card">
              <h2>Customer Support</h2>
              <p>Get help and assistance</p>
              <!-- Support content -->
            </div>
          </div>

          <div v-if="activeSection === 'language-region'" class="section">
            <div class="simple-card">
              <h2>Language & Region</h2>
              <p>Customize your language and regional settings</p>
              <!-- Language settings content -->
            </div>
          </div>

          <div v-if="activeSection === 'privacy-terms'" class="section">
            <div class="simple-card">
              <h2>Privacy & Terms</h2>
              <p>Review our policies and manage your privacy</p>
              <!-- Privacy settings content -->
            </div>
          </div>

          <div v-if="activeSection === 'account-deletion'" class="section">
            <div class="simple-card">
              <h2>Account Deletion</h2>
              <p>Permanently delete your account</p>
              <!-- Account deletion content -->
            </div>
          </div>

          <div v-if="activeSection === 'refund-history'" class="section">
            <div class="simple-card">
              <h2>Refund History</h2>
              <p>Track your refunds and reimbursements</p>
              <!-- Refund history content -->
            </div>
          </div>

          <div v-if="activeSection === 'delivery-management'" class="section">
            <div class="simple-card">
              <h2>Delivery Management</h2>
              <p>Manage your delivery preferences</p>
              <!-- Delivery management content -->
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
      activeSection: 'profile',
      editMode: false,
      recommendedProducts: [
        {
          id: 1,
          name: 'Premium Running Shoes',
          brand: 'Nike',
          price: 129.99,
          originalPrice: 159.99,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
          rating: 4.5,
          reviews: 142,
          discount: true
        },
        {
          id: 2,
          name: 'Classic White Sneakers',
          brand: 'Adidas',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
          rating: 4.2,
          reviews: 87
        },
        {
          id: 3,
          name: 'Luxury Cosmetic Set',
          brand: 'Clinique',
          price: 199.99,
          originalPrice: 249.99,
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
          rating: 4.7,
          reviews: 203,
          discount: true
        },
        {
          id: 4,
          name: 'Botanical Collection',
          brand: 'Nature Beauty',
          price: 156.00,
          image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=300&fit=crop',
          rating: 4.3,
          reviews: 95
        }
      ],
      profileSections: [
        {
          id: 'profile',
          name: 'Profile',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'
        },
        {
          id: 'avatar',
          name: 'Avatar',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/></svg>'
        },
        {
          id: 'notifications',
          name: 'Notifications',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>'
        },
        {
          id: 'customer-support',
          name: 'Customer Support',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>'
        },
        {
          id: 'language-region',
          name: 'Language & Region',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>'
        },
        {
          id: 'privacy-terms',
          name: 'Privacy & Terms',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>'
        },
        {
          id: 'account-deletion',
          name: 'Account Deletion',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>'
        },
        {
          id: 'refund-history',
          name: 'Refund History',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm.5-9H11v6l5.25 3.15.75-1.23-4.5-2.67V8z"/></svg>'
        },
        {
          id: 'delivery-management',
          name: 'Delivery Management',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser', 'wishlist']),
    
    isInWishlist() {
      return (productId) => {
        return this.wishlist.some(item => item.id === productId)
      }
    }
  },
  methods: {
    ...mapActions('user', ['addToWishlist', 'removeFromWishlist']),
    
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    
    toggleEditMode() {
      this.editMode = !this.editMode
      this.$toast?.info('Edit mode toggled')
    },
    
    quickView(product) {
      console.log('Quick view:', product)
      this.$toast?.info(`Quick view for ${product.name}`)
    },
    
    toggleWishlist(product) {
      if (this.isInWishlist(product.id)) {
        this.removeFromWishlist(product.id)
        this.$toast?.success('Removed from wishlist')
      } else {
        this.addToWishlist(product)
        this.$toast?.success('Added to wishlist')
      }
    },
    
    loadMoreRecommendations() {
      this.$toast?.info('Loading more recommendations...')
    },
    
    uploadAvatar() {
      this.$toast?.info('Avatar upload coming soon!')
    },
    
    removeAvatar() {
      this.$toast?.warning('Avatar removed')
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
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Profile Information Card */
.profile-info-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
}

.header-icon {
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}

.header-icon svg {
  width: 20px;
  height: 20px;
}

.card-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  flex: 1;
}

.edit-profile-btn {
  background: #ec4899;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.edit-profile-btn:hover {
  background: #db2777;
  transform: translateY(-2px);
}

.edit-profile-btn svg {
  width: 16px;
  height: 16px;
}

.profile-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
}

/* Feed Section */
.feed-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feed-header {
  margin-bottom: 2rem;
}

.feed-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.star-icon {
  width: 24px;
  height: 24px;
  color: #fbbf24;
}

.feed-title h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.feed-description {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

/* AI Recommendations */
.recommendations-section {
  margin-bottom: 2rem;
}

.recommendations-header {
  margin-bottom: 1.5rem;
}

.ai-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.ai-badge svg {
  width: 16px;
  height: 16px;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.product-card {
  background: #f8fafc;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: #e5e7eb;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.quick-view-btn,
.wishlist-btn {
  background: white;
  color: #1f2937;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.quick-view-btn:hover {
  background: #f3f4f6;
  transform: scale(1.05);
}

.wishlist-btn {
  width: 40px;
  height: 40px;
  justify-content: center;
}

.wishlist-btn.active {
  background: #ec4899;
  color: white;
}

.wishlist-btn:hover {
  background: #ec4899;
  color: white;
}

.quick-view-btn svg,
.wishlist-btn svg {
  width: 16px;
  height: 16px;
}

.discount-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #ef4444;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.product-info {
  padding: 1.5rem;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.product-brand {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0 0 0.75rem 0;
}

.product-pricing {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.current-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1f2937;
}

.original-price {
  font-size: 1rem;
  color: #9ca3af;
  text-decoration: line-through;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  display: flex;
  gap: 0.125rem;
}

.star {
  color: #d1d5db;
  font-size: 0.9rem;
}

.star.filled {
  color: #fbbf24;
}

.rating-text {
  font-size: 0.85rem;
  color: #6b7280;
}

/* View More Section */
.view-more-section {
  text-align: center;
}

.view-more-btn {
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.view-more-btn:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-2px);
}

.view-more-btn svg {
  width: 16px;
  height: 16px;
}

/* Avatar Management */
.avatar-management-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.avatar-content {
  display: flex;
  gap: 3rem;
  align-items: center;
}

.current-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar-preview {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #e5e7eb;
  margin-bottom: 1rem;
}

.avatar-info h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.avatar-info p {
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}

.member-since {
  font-size: 0.85rem;
  color: #9ca3af;
}

.avatar-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.upload-btn,
.remove-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
}

.upload-btn {
  background: #3b82f6;
  color: white;
}

.upload-btn:hover {
  background: #2563eb;
}

.remove-btn {
  background: #ef4444;
  color: white;
}

.remove-btn:hover {
  background: #dc2626;
}

.upload-btn svg,
.remove-btn svg {
  width: 16px;
  height: 16px;
}

/* Simple Cards for other sections */
.simple-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.simple-card h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.simple-card p {
  color: #6b7280;
  margin: 0;
}

/* Responsive Design */
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
    gap: 0.5rem;
  }
  
  .nav-item {
    white-space: nowrap;
    flex-shrink: 0;
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .profile-details {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .edit-profile-btn {
    align-self: flex-end;
  }
  
  .avatar-content {
    flex-direction: column;
    gap: 2rem;
  }
}

@media (max-width: 640px) {
  .container {
    padding: 0 1rem;
  }
  
  .profile-page {
    padding: 1rem 0;
  }
  
  .profile-info-card,
  .feed-section,
  .avatar-management-card,
  .simple-card {
    padding: 1.5rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
