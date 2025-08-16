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
          <!-- User Profile Section -->
          <div class="sidebar-profile">
            <div class="sidebar-avatar">
              <img :src="currentUser.avatar" :alt="currentUser.name" class="sidebar-avatar-img" />
            </div>
            <div class="sidebar-user-info">
              <h3 class="sidebar-user-name">{{ currentUser.name }}</h3>
              <p class="sidebar-user-email">{{ currentUser.email }}</p>
              <div class="premium-badge">
                <svg class="premium-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Premium Member
              </div>
            </div>
          </div>

          <!-- Navigation Menu -->
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
              <span v-if="section.badge" class="nav-badge">{{ section.badge }}</span>
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
                <h2>{{ editMode ? 'Edit Profile' : 'Profile Information' }}</h2>
                <button class="edit-profile-btn" @click="toggleEditMode" :class="{ 'cancel-btn': editMode }">
                  <svg v-if="!editMode" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  {{ editMode ? 'Cancel' : 'Edit Profile' }}
                </button>
              </div>

              <!-- View Mode -->
              <div v-if="!editMode" class="profile-details">
                <div class="profile-avatar-section">
                  <img :src="currentUser.avatar" :alt="currentUser.name" class="profile-avatar" />
                </div>
                <div class="profile-info-section">
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

              <!-- Edit Mode -->
              <div v-else class="edit-profile-section">
                <p class="edit-description">
                  Update your personal details including name, profile picture, contact information, and preferences to keep your account up to date.
                </p>

                <form @submit.prevent="saveProfile" class="edit-profile-form">
                  <!-- Profile Picture Section -->
                  <div class="form-section">
                    <h3 class="section-title">Profile Picture</h3>
                    <div class="avatar-edit-section">
                      <div class="current-avatar">
                        <img :src="editForm.avatar" :alt="editForm.name" class="edit-avatar" />
                      </div>
                      <div class="avatar-actions">
                        <button type="button" class="upload-photo-btn" @click="uploadPhoto">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          Upload New Photo
                        </button>
                        <button type="button" class="remove-photo-btn" @click="removePhoto">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                          Remove Photo
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Personal Information -->
                  <div class="form-section">
                    <h3 class="section-title">Personal Information</h3>
                    <div class="form-grid">
                      <div class="form-group">
                        <label for="fullName">Full Name</label>
                        <input
                          id="fullName"
                          type="text"
                          v-model="editForm.name"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="email">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          v-model="editForm.email"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Contact Information -->
                  <div class="form-section">
                    <h3 class="section-title">Contact Information</h3>
                    <div class="form-grid">
                      <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input
                          id="phone"
                          type="tel"
                          v-model="editForm.phone"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div class="form-group">
                        <label for="dateOfBirth">Date of Birth</label>
                        <input
                          id="dateOfBirth"
                          type="date"
                          v-model="editForm.dateOfBirth"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Additional Information -->
                  <div class="form-section">
                    <h3 class="section-title">Additional Information</h3>
                    <div class="form-grid">
                      <div class="form-group">
                        <label for="gender">Gender</label>
                        <select id="gender" v-model="editForm.gender">
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="location">Location</label>
                        <input
                          id="location"
                          type="text"
                          v-model="editForm.location"
                          placeholder="City, State/Province"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Preferences -->
                  <div class="form-section">
                    <h3 class="section-title">Preferences</h3>
                    <div class="preferences-section">
                      <div class="preference-item">
                        <div class="preference-info">
                          <h4>Email Notifications</h4>
                          <p>Receive updates about orders, promotions, and new arrivals</p>
                        </div>
                        <div class="preference-toggle">
                          <input type="checkbox" v-model="editForm.emailNotifications" id="emailNotifications">
                          <label for="emailNotifications" class="toggle-label"></label>
                        </div>
                      </div>
                      <div class="preference-item">
                        <div class="preference-info">
                          <h4>SMS Notifications</h4>
                          <p>Get text messages for order updates and delivery notifications</p>
                        </div>
                        <div class="preference-toggle">
                          <input type="checkbox" v-model="editForm.smsNotifications" id="smsNotifications">
                          <label for="smsNotifications" class="toggle-label"></label>
                        </div>
                      </div>
                      <div class="preference-item">
                        <div class="preference-info">
                          <h4>Marketing Communications</h4>
                          <p>Receive promotional offers and product recommendations</p>
                        </div>
                        <div class="preference-toggle">
                          <input type="checkbox" v-model="editForm.marketingCommunications" id="marketingCommunications">
                          <label for="marketingCommunications" class="toggle-label"></label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Form Actions -->
                  <div class="form-actions">
                    <button type="button" class="cancel-form-btn" @click="cancelEdit">
                      Cancel
                    </button>
                    <button type="submit" class="save-form-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      Save Changes
                    </button>
                  </div>
                </form>
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
      editForm: {
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        location: '',
        avatar: '',
        emailNotifications: true,
        smsNotifications: false,
        marketingCommunications: false
      },
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
          name: 'Update Profile',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'
        },
        {
          id: 'notifications',
          name: 'Notifications',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>',
          badge: '3'
        },
        {
          id: 'customer-support',
          name: 'Customer Support',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/></svg>'
        },
        {
          id: 'language-region',
          name: 'Language & Region',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>'
        },
        {
          id: 'privacy-terms',
          name: 'Privacy & Terms',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>'
        },
        {
          id: 'account-deletion',
          name: 'Account Deletion',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-2.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>'
        },
        {
          id: 'refund-history',
          name: 'Refund History',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'
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
      if (this.editMode) {
        // Initialize edit form with current user data
        this.editForm = {
          name: this.currentUser.name || '',
          email: this.currentUser.email || '',
          phone: this.currentUser.phone || '9775637590',
          dateOfBirth: this.currentUser.dateOfBirth || '',
          gender: this.currentUser.gender || '',
          location: this.currentUser.location || '',
          avatar: this.currentUser.avatar || '',
          emailNotifications: this.currentUser.emailNotifications !== false,
          smsNotifications: this.currentUser.smsNotifications || false,
          marketingCommunications: this.currentUser.marketingCommunications || false
        }
      }
    },

    saveProfile() {
      // Update user profile with form data
      const updatedUser = {
        ...this.currentUser,
        ...this.editForm
      }

      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser))

      // Update Vuex store (you might need to dispatch an action)
      this.$store.commit('user/SET_USER', updatedUser)

      this.editMode = false
      this.$toast?.success('Profile updated successfully!')
    },

    cancelEdit() {
      this.editMode = false
      this.editForm = {}
    },

    uploadPhoto() {
      // Simulate photo upload
      this.$toast?.info('Photo upload functionality coming soon!')
    },

    removePhoto() {
      this.editForm.avatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
      this.$toast?.info('Profile photo removed')
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
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
  border: 1px solid #f1f3f4;
}

/* Sidebar Profile Section */
.sidebar-profile {
  padding: 1.5rem;
  border-bottom: 1px solid #f1f3f4;
  text-align: center;
}

.sidebar-avatar {
  margin-bottom: 1rem;
}

.sidebar-avatar-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f1f3f4;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background: #f9fafb;
}

.sidebar-user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.sidebar-user-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.sidebar-user-email {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}

.premium-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: #ec4899;
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

.premium-icon {
  width: 12px;
  height: 12px;
}

/* Navigation Menu */
.profile-nav {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  color: #374151;
  position: relative;
  border: none;
  background: none;
}

.nav-item:hover {
  background: #f9fafb;
  color: #1f2937;
}

.nav-item.active {
  background: #fef7f7;
  color: #ec4899;
  border-right: 3px solid #ec4899;
}

.nav-item.active .nav-icon {
  color: #ec4899;
}

.nav-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: #6b7280;
  transition: color 0.2s ease;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
}

.nav-text {
  font-weight: 500;
  font-size: 0.875rem;
  flex: 1;
}

.nav-badge {
  background: #ef4444;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 8px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
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
  display: flex;
  gap: 2rem;
  align-items: center;
}

.profile-avatar-section {
  flex-shrink: 0;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #f9fafb;
}

.profile-info-section {
  flex: 1;
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

/* Edit Profile Section */
.edit-profile-section {
  padding-top: 1rem;
}

.edit-description {
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.edit-profile-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title::before {
  content: '';
  width: 4px;
  height: 20px;
  background: #3b82f6;
  border-radius: 2px;
}

/* Avatar Edit Section */
.avatar-edit-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.current-avatar {
  flex-shrink: 0;
}

.edit-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #f9fafb;
}

.avatar-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.upload-photo-btn,
.remove-photo-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  font-size: 0.9rem;
}

.upload-photo-btn {
  background: #3b82f6;
  color: white;
}

.upload-photo-btn:hover {
  background: #2563eb;
}

.remove-photo-btn {
  background: #ef4444;
  color: white;
}

.remove-photo-btn:hover {
  background: #dc2626;
}

.upload-photo-btn svg,
.remove-photo-btn svg {
  width: 16px;
  height: 16px;
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
  background: white;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Preferences Section */
.preferences-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.preference-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.preference-info h4 {
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
  font-size: 0.95rem;
}

.preference-info p {
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0;
}

.preference-toggle {
  position: relative;
  flex-shrink: 0;
}

.preference-toggle input[type="checkbox"] {
  display: none;
}

.toggle-label {
  width: 50px;
  height: 24px;
  background: #d1d5db;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease;
  display: block;
}

.toggle-label::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.preference-toggle input[type="checkbox"]:checked + .toggle-label {
  background: #3b82f6;
}

.preference-toggle input[type="checkbox"]:checked + .toggle-label::after {
  transform: translateX(26px);
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.cancel-form-btn,
.save-form-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cancel-form-btn {
  background: #f3f4f6;
  color: #6b7280;
}

.cancel-form-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.save-form-btn {
  background: #10b981;
  color: white;
}

.save-form-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}

.save-form-btn svg {
  width: 16px;
  height: 16px;
}

/* Edit Profile Button States */
.edit-profile-btn.cancel-btn {
  background: #6b7280;
}

.edit-profile-btn.cancel-btn:hover {
  background: #4b5563;
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
    border-radius: 8px;
  }

  .sidebar-profile {
    padding: 1rem;
  }

  .sidebar-avatar-img {
    width: 50px;
    height: 50px;
  }

  .profile-nav {
    flex-direction: row;
    overflow-x: auto;
    padding: 0.5rem;
    gap: 0.25rem;
  }

  .nav-item {
    white-space: nowrap;
    flex-shrink: 0;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border-right: none;
  }

  .nav-item.active {
    border-right: none;
    border-bottom: 2px solid #ec4899;
  }

  .nav-text {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .profile-details {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .profile-info-section {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .avatar-edit-section {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .preference-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-form-btn,
  .save-form-btn {
    width: 100%;
    justify-content: center;
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
