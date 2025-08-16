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


          <!-- Notifications Section -->
          <div v-if="activeSection === 'notifications'" class="section">
            <div class="notifications-card">
              <div class="card-header">
                <div class="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                  </svg>
                </div>
                <h2>Notifications</h2>
                <button
                  v-if="unreadNotifications.length > 0"
                  @click="markAllAsRead"
                  class="mark-all-read-btn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Mark All as Read
                </button>
              </div>

              <!-- Recent Notifications -->
              <div class="notifications-content">
                <div class="notifications-list-section">
                  <h3 class="section-title">Recent Alerts</h3>
                  <div class="notifications-list">
                    <div
                      v-for="notification in notifications"
                      :key="notification.id"
                      class="notification-item"
                      :class="{ 'unread': !notification.read }"
                    >
                      <div class="notification-icon" :class="notification.type">
                        <svg v-if="notification.type === 'order'" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 7h-3V5a2 2 0 00-2-2H10a2 2 0 00-2 2v2H5a1 1 0 000 2h1v11a3 3 0 003 3h6a3 3 0 003-3V9h1a1 1 0 000-2zM10 5h4v2h-4V5zm6 15a1 1 0 01-1 1H9a1 1 0 01-1-1V9h8v11z"/>
                        </svg>
                        <svg v-else-if="notification.type === 'promotion'" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.79 21L3 11.21v2c0 .53.21 1.04.59 1.41l7.79 7.79c.78.78 2.05.78 2.83 0l6.21-6.21c.78-.78.78-2.05 0-2.83L12.79 21z"/>
                          <path d="M11.38 17.41c.78.78 2.05.78 2.83 0l6.21-6.21c.78-.78.78-2.05 0-2.83L12.63.58C12.25.21 11.74 0 11.21 0H5C3.9 0 3 .9 3 2v6.21c0 .53.21 1.04.59 1.41l7.79 7.79z"/>
                        </svg>
                        <svg v-else-if="notification.type === 'delivery'" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                        </svg>
                        <svg v-else viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div class="notification-content">
                        <div class="notification-header">
                          <h4 class="notification-title">{{ notification.title }}</h4>
                          <span class="notification-time">{{ formatNotificationTime(notification.time) }}</span>
                        </div>
                        <p class="notification-message">{{ notification.message }}</p>
                        <div v-if="notification.action" class="notification-action">
                          <button @click="handleNotificationAction(notification)" class="notification-action-btn">
                            {{ notification.action.text }}
                          </button>
                        </div>
                      </div>
                      <button
                        v-if="!notification.read"
                        @click="markAsRead(notification.id)"
                        class="mark-read-btn"
                        title="Mark as read"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Notification Settings -->
                <div class="notification-settings-section">
                  <h3 class="section-title">Notification Settings</h3>
                  <div class="settings-list">
                    <div class="setting-item">
                      <div class="setting-info">
                        <div class="setting-icon order">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 7h-3V5a2 2 0 00-2-2H10a2 2 0 00-2 2v2H5a1 1 0 000 2h1v11a3 3 0 003 3h6a3 3 0 003-3V9h1a1 1 0 000-2z"/>
                          </svg>
                        </div>
                        <div class="setting-content">
                          <h4>Order Updates</h4>
                          <p>Get notified about order confirmations, shipping updates, and delivery status</p>
                        </div>
                      </div>
                      <div class="setting-toggle">
                        <input type="checkbox" v-model="notificationSettings.orderUpdates" id="orderUpdates">
                        <label for="orderUpdates" class="toggle-label"></label>
                      </div>
                    </div>

                    <div class="setting-item">
                      <div class="setting-info">
                        <div class="setting-icon promotion">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.79 21L3 11.21v2c0 .53.21 1.04.59 1.41l7.79 7.79c.78.78 2.05.78 2.83 0l6.21-6.21c.78-.78.78-2.05 0-2.83L12.79 21z"/>
                          </svg>
                        </div>
                        <div class="setting-content">
                          <h4>Promotions & Offers</h4>
                          <p>Receive exclusive deals, discounts, and promotional campaigns</p>
                        </div>
                      </div>
                      <div class="setting-toggle">
                        <input type="checkbox" v-model="notificationSettings.promotions" id="promotions">
                        <label for="promotions" class="toggle-label"></label>
                      </div>
                    </div>

                    <div class="setting-item">
                      <div class="setting-info">
                        <div class="setting-icon delivery">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/>
                          </svg>
                        </div>
                        <div class="setting-content">
                          <h4>Delivery Reminders</h4>
                          <p>Get alerts about upcoming deliveries and pickup reminders</p>
                        </div>
                      </div>
                      <div class="setting-toggle">
                        <input type="checkbox" v-model="notificationSettings.deliveryReminders" id="deliveryReminders">
                        <label for="deliveryReminders" class="toggle-label"></label>
                      </div>
                    </div>

                    <div class="setting-item">
                      <div class="setting-info">
                        <div class="setting-icon general">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </div>
                        <div class="setting-content">
                          <h4>General Alerts</h4>
                          <p>Account security, policy updates, and important announcements</p>
                        </div>
                      </div>
                      <div class="setting-toggle">
                        <input type="checkbox" v-model="notificationSettings.generalAlerts" id="generalAlerts">
                        <label for="generalAlerts" class="toggle-label"></label>
                      </div>
                    </div>
                  </div>

                  <div class="settings-actions">
                    <button @click="saveNotificationSettings" class="save-settings-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Customer Support Section -->
          <div v-if="activeSection === 'customer-support'" class="section">
            <div class="modern-support-container">
              <!-- Hero Section -->
              <div class="support-hero">
                <div class="hero-content">
                  <div class="hero-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <div class="hero-text">
                    <h2>How can we help you today?</h2>
                    <p>Our support team is here to assist you with any questions or issues you might have.</p>
                  </div>
                </div>
                <div class="hero-stats">
                  <div class="stat-item">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">Support Available</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-number">< 2min</div>
                    <div class="stat-label">Avg Response Time</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-number">99.9%</div>
                    <div class="stat-label">Customer Satisfaction</div>
                  </div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="quick-actions-section">
                <h3 class="section-heading">Get Instant Help</h3>
                <div class="quick-actions-grid">
                  <!-- Live Chat Card -->
                  <div class="action-card premium" @click="startLiveChat">
                    <div class="card-badge">Most Popular</div>
                    <div class="card-icon chat">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                      </svg>
                    </div>
                    <div class="card-content">
                      <h4>Live Chat</h4>
                      <p>Chat with our support agents in real-time</p>
                      <div class="status-indicator online">
                        <span class="status-dot"></span>
                        <span>3 agents online</span>
                      </div>
                    </div>
                    <div class="card-action">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                      Start Chat
                    </div>
                  </div>

                  <!-- Support Ticket Card -->
                  <div class="action-card" @click="createTicket">
                    <div class="card-icon ticket">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 10V6a2 2 0 00-2-2H4a2 2 0 00-2 2v4a2 2 0 102 0V8h16v2a2 2 0 102 0zM2 14a2 2 0 102 0v4h16v-4a2 2 0 102 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                      </svg>
                    </div>
                    <div class="card-content">
                      <h4>Support Ticket</h4>
                      <p>Submit detailed requests and track progress</p>
                      <div class="ticket-info">
                        <span class="info-item">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          Priority support
                        </span>
                      </div>
                    </div>
                    <div class="card-action">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                      </svg>
                      Create Ticket
                    </div>
                  </div>

                  <!-- Phone Support Card -->
                  <div class="action-card" @click="callSupport">
                    <div class="card-icon phone">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <div class="card-content">
                      <h4>Phone Support</h4>
                      <p>Speak directly with our support team</p>
                      <div class="phone-info">
                        <span class="phone-number">+1 (555) 123-4567</span>
                        <span class="availability">9 AM - 8 PM EST</span>
                      </div>
                    </div>
                    <div class="card-action">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      Call Now
                    </div>
                  </div>

                  <!-- Email Support Card -->
                  <div class="action-card" @click="emailSupport">
                    <div class="card-icon email">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <div class="card-content">
                      <h4>Email Support</h4>
                      <p>Send us detailed questions via email</p>
                      <div class="email-info">
                        <span class="email-address">support@footmarket.com</span>
                        <span class="response-time">Response within 4 hours</span>
                      </div>
                    </div>
                    <div class="card-action">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      Send Email
                    </div>
                  </div>
                </div>
              </div>

              <!-- Self-Service Section -->
              <div class="self-service-section">
                <div class="section-header">
                  <h3 class="section-heading">Self-Service Options</h3>
                  <p class="section-description">Find answers quickly with our self-help resources</p>
                </div>

                <!-- FAQ Section -->
                <div class="modern-faq-container">
                  <div class="faq-header">
                    <div class="faq-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                      </svg>
                    </div>
                    <div class="faq-title">
                      <h4>Frequently Asked Questions</h4>
                      <p>Quick answers to common questions</p>
                    </div>
                  </div>

                  <div class="modern-faq-list">
                    <div v-for="faq in faqs" :key="faq.id" class="modern-faq-item" :class="{ 'expanded': faq.expanded }">
                      <button @click="toggleFaq(faq.id)" class="modern-faq-question">
                        <span class="question-text">{{ faq.question }}</span>
                        <div class="question-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                          </svg>
                        </div>
                      </button>
                      <div class="modern-faq-answer">
                        <div class="answer-content">
                          <p>{{ faq.answer }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Additional Resources -->
                <div class="additional-resources">
                  <div class="resource-card" @click="visitHelpCenter">
                    <div class="resource-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div class="resource-content">
                      <h4>Help Center</h4>
                      <p>Comprehensive guides and tutorials</p>
                    </div>
                    <div class="resource-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>

                  <div class="resource-card" @click="openCommunityForum">
                    <div class="resource-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-.83.67-1.5 1.5-1.5S12 9.67 12 10.5V11h2.5c.83 0 1.5.67 1.5 1.5V18h2v-6.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V18h2v-7c0-2.21-1.79-4-4-4H13c-1.1 0-2 .9-2 2v1.5c-.83 0-1.5.67-1.5 1.5S9.67 12 10.5 12V18H4z"/>
                      </svg>
                    </div>
                    <div class="resource-content">
                      <h4>Community Forum</h4>
                      <p>Connect with other customers</p>
                    </div>
                    <div class="resource-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>

                  <div class="resource-card" @click="viewVideoTutorials">
                    <div class="resource-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div class="resource-content">
                      <h4>Video Tutorials</h4>
                      <p>Step-by-step video guides</p>
                    </div>
                    <div class="resource-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Help Center Modal -->
                <div v-if="showHelpCenter" class="modal-overlay" @click="closeHelpCenter">
                  <div class="modal-content help-center-modal" @click.stop>
                    <div class="modal-header">
                      <h3>Help Center</h3>
                      <button @click="closeHelpCenter" class="modal-close-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="help-categories">
                        <div v-for="category in helpCategories" :key="category.id" class="help-category" @click="selectHelpCategory(category)">
                          <div class="category-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor" v-html="category.icon"></svg>
                          </div>
                          <div class="category-content">
                            <h4>{{ category.title }}</h4>
                            <p>{{ category.description }}</p>
                            <span class="article-count">{{ category.articles }} articles</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Community Forum Modal -->
                <div v-if="showCommunityForum" class="modal-overlay" @click="closeCommunityForum">
                  <div class="modal-content community-modal" @click.stop>
                    <div class="modal-header">
                      <h3>Community Forum</h3>
                      <button @click="closeCommunityForum" class="modal-close-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="forum-stats">
                        <div class="stat-box">
                          <div class="stat-number">12.5K</div>
                          <div class="stat-label">Members</div>
                        </div>
                        <div class="stat-box">
                          <div class="stat-number">3.2K</div>
                          <div class="stat-label">Topics</div>
                        </div>
                        <div class="stat-box">
                          <div class="stat-number">847</div>
                          <div class="stat-label">Online Now</div>
                        </div>
                      </div>
                      <div class="forum-topics">
                        <h4>Popular Topics</h4>
                        <div v-for="topic in forumTopics" :key="topic.id" class="forum-topic">
                          <div class="topic-avatar">
                            <img :src="topic.author.avatar" :alt="topic.author.name" />
                          </div>
                          <div class="topic-content">
                            <h5>{{ topic.title }}</h5>
                            <p>{{ topic.excerpt }}</p>
                            <div class="topic-meta">
                              <span>By {{ topic.author.name }}</span>
                              <span>{{ topic.replies }} replies</span>
                              <span>{{ formatDate(topic.lastActivity) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="forum-actions">
                        <button class="forum-btn primary">Join Community</button>
                        <button class="forum-btn secondary">Browse All Topics</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Video Tutorials Modal -->
                <div v-if="showVideoTutorials" class="modal-overlay" @click="closeVideoTutorials">
                  <div class="modal-content video-modal" @click.stop>
                    <div class="modal-header">
                      <h3>Video Tutorials</h3>
                      <button @click="closeVideoTutorials" class="modal-close-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="video-categories">
                        <div class="category-tabs">
                          <button
                            v-for="category in videoCategories"
                            :key="category.id"
                            @click="selectedVideoCategory = category.id"
                            class="category-tab"
                            :class="{ 'active': selectedVideoCategory === category.id }"
                          >
                            {{ category.name }}
                          </button>
                        </div>
                      </div>
                      <div class="video-list">
                        <div v-for="video in filteredVideos" :key="video.id" class="video-item" @click="playVideo(video)">
                          <div class="video-thumbnail">
                            <img :src="video.thumbnail" :alt="video.title" />
                            <div class="play-overlay">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                            <div class="video-duration">{{ video.duration }}</div>
                          </div>
                          <div class="video-info">
                            <h5>{{ video.title }}</h5>
                            <p>{{ video.description }}</p>
                            <div class="video-meta">
                              <span>{{ video.views }} views</span>
                              <span>{{ formatDate(video.publishedAt) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Language & Region Section -->
          <div v-if="activeSection === 'language-region'" class="section">
            <div class="language-region-card">
              <div class="card-header-simple">
                <div class="header-icon-simple">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2z"/>
                  </svg>
                </div>
                <h2>Language & Region</h2>
              </div>

              <div class="language-region-content">
                <!-- Language Preference -->
                <div class="language-preference-section">
                  <h3 class="preference-section-title">Language Preference</h3>
                  <div class="language-cards">
                    <div
                      v-for="language in availableLanguages"
                      :key="language.code"
                      @click="selectLanguage(language)"
                      class="language-card"
                      :class="{ 'selected': selectedLanguage.code === language.code }"
                    >
                      <div class="language-flag-container">
                        <img :src="language.flag" :alt="language.name" class="language-flag" />
                      </div>
                      <div class="language-details">
                        <div class="language-name">{{ language.name }}</div>
                        <div class="language-native">{{ language.nativeName }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Currency & Region -->
                <div class="currency-region-section">
                  <h3 class="preference-section-title">Currency & Region</h3>

                  <div class="form-row">
                    <div class="form-field">
                      <label for="currency-select">Currency</label>
                      <select v-model="selectedCurrency" @change="updateCurrency" id="currency-select" class="region-select">
                        <option v-for="currency in availableCurrencies" :key="currency.code" :value="currency.code">
                          {{ currency.code }} - {{ currency.name }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-field">
                      <label for="region-select">Country/Region</label>
                      <select v-model="selectedRegion" @change="updateRegion" id="region-select" class="region-select">
                        <option v-for="region in availableRegions" :key="region.code" :value="region.code">
                          {{ region.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Privacy & Terms Section -->
          <div v-if="activeSection === 'privacy-terms'" class="section">
            <div class="privacy-terms-card">
              <div class="card-header">
                <div class="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <h2>Privacy & Terms</h2>
              </div>

              <div class="privacy-terms-content">
                <!-- Policy Documents -->
                <div class="policy-section">
                  <h3 class="section-title">Legal Documents</h3>
                  <div class="policy-documents">
                    <div class="policy-document">
                      <div class="document-icon privacy">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.58L18 9l-8 8z"/>
                        </svg>
                      </div>
                      <div class="document-info">
                        <h4>Privacy Policy</h4>
                        <p>Learn how we collect, use, and protect your personal information</p>
                        <span class="last-updated">Last updated: March 15, 2024</span>
                      </div>
                      <button @click="viewPrivacyPolicy" class="document-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                        View Policy
                      </button>
                    </div>

                    <div class="policy-document">
                      <div class="document-icon terms">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM16 18H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                        </svg>
                      </div>
                      <div class="document-info">
                        <h4>Terms & Conditions</h4>
                        <p>Review the terms that govern your use of our services</p>
                        <span class="last-updated">Last updated: March 10, 2024</span>
                      </div>
                      <button @click="viewTerms" class="document-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                        View Terms
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Data Protection & Consent -->
                <div class="consent-section">
                  <h3 class="section-title">Data Protection & Consent</h3>
                  <div class="consent-options">
                    <div class="consent-item">
                      <div class="consent-info">
                        <h4>Data Processing Consent</h4>
                        <p>Allow us to process your data for account management and service improvement</p>
                      </div>
                      <div class="consent-toggle">
                        <input type="checkbox" v-model="privacySettings.dataProcessing" id="dataProcessing" disabled>
                        <label for="dataProcessing" class="toggle-label required"></label>
                        <span class="required-label">Required</span>
                      </div>
                    </div>

                    <div class="consent-item">
                      <div class="consent-info">
                        <h4>Marketing Communications</h4>
                        <p>Receive personalized offers and promotional content via email and SMS</p>
                      </div>
                      <div class="consent-toggle">
                        <input type="checkbox" v-model="privacySettings.marketing" id="marketing">
                        <label for="marketing" class="toggle-label"></label>
                      </div>
                    </div>

                    <div class="consent-item">
                      <div class="consent-info">
                        <h4>Analytics & Performance</h4>
                        <p>Help us improve our services by sharing anonymous usage analytics</p>
                      </div>
                      <div class="consent-toggle">
                        <input type="checkbox" v-model="privacySettings.analytics" id="analytics">
                        <label for="analytics" class="toggle-label"></label>
                      </div>
                    </div>

                    <div class="consent-item">
                      <div class="consent-info">
                        <h4>Third-party Integrations</h4>
                        <p>Allow data sharing with trusted partners for enhanced functionality</p>
                      </div>
                      <div class="consent-toggle">
                        <input type="checkbox" v-model="privacySettings.thirdParty" id="thirdParty">
                        <label for="thirdParty" class="toggle-label"></label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Data Download -->
                <div class="data-download-section">
                  <h3 class="section-title">Your Data</h3>
                  <div class="data-download-card">
                    <div class="download-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM12 19l-4-4h3V9h2v6h3l-4 4z"/>
                      </svg>
                    </div>
                    <div class="download-info">
                      <h4>Download Your Data</h4>
                      <p>Get a copy of all your personal data we have on file, including your profile, orders, and preferences.</p>
                      <div class="download-details">
                        <span>Format: JSON/CSV</span>
                        <span>Processing time: 24-48 hours</span>
                        <span>Delivery: Email link</span>
                      </div>
                    </div>
                    <button @click="requestDataDownload" class="download-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                      </svg>
                      Request Data Export
                    </button>
                  </div>
                </div>

                <!-- Save Settings -->
                <div class="settings-actions">
                  <button @click="savePrivacySettings" class="save-settings-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Save Privacy Settings
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Deletion Section -->
          <div v-if="activeSection === 'account-deletion'" class="section">
            <div class="account-deletion-card">
              <div class="card-header">
                <div class="header-icon danger">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                </div>
                <h2>Account Management</h2>
              </div>

              <div class="account-deletion-content">
                <!-- Deactivation Option -->
                <div class="deactivation-section">
                  <div class="option-card temporary">
                    <div class="option-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div class="option-content">
                      <h3>Temporary Deactivation</h3>
                      <p>Take a break from your account. Your data will be preserved and you can reactivate anytime.</p>

                      <div class="deactivation-info">
                        <h4>What happens when you deactivate:</h4>
                        <ul>
                          <li>Your profile becomes invisible to others</li>
                          <li>Active orders and subscriptions continue normally</li>
                          <li>You can reactivate by simply logging in</li>
                          <li>All your data and preferences are preserved</li>
                          <li>You won't receive marketing emails</li>
                        </ul>
                      </div>

                      <div class="deactivation-duration">
                        <label for="deactivationPeriod">Deactivation Period</label>
                        <select v-model="deactivationPeriod" id="deactivationPeriod">
                          <option value="1-week">1 Week</option>
                          <option value="1-month">1 Month</option>
                          <option value="3-months">3 Months</option>
                          <option value="indefinite">Indefinite (until I reactivate)</option>
                        </select>
                      </div>
                    </div>
                    <button @click="initiateDeactivation" class="deactivation-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9V5a3 3 0 00-6 0v4M10 9a3 3 0 11-6 0m6 0a3 3 0 006 0v4M10 9v10a1 1 0 001 1h8a1 1 0 001-1V9"/>
                      </svg>
                      Deactivate Account
                    </button>
                  </div>
                </div>

                <!-- Permanent Deletion -->
                <div class="deletion-section">
                  <div class="option-card permanent">
                    <div class="option-icon danger">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </div>
                    <div class="option-content">
                      <h3>Permanent Account Deletion</h3>
                      <p class="danger-text">This action cannot be undone. Your account and all associated data will be permanently deleted.</p>

                      <div class="deletion-warning">
                        <div class="warning-header">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                          </svg>
                          <span>Important: What will be deleted</span>
                        </div>
                        <ul class="deletion-list">
                          <li>Your profile and personal information</li>
                          <li>Order history and purchase records</li>
                          <li>Saved addresses and payment methods</li>
                          <li>Wishlist and product preferences</li>
                          <li>All account settings and customizations</li>
                          <li>Loyalty points and rewards</li>
                        </ul>
                      </div>

                      <div class="deletion-exceptions">
                        <h4>What we keep (for legal compliance):</h4>
                        <ul>
                          <li>Transaction records (as required by law)</li>
                          <li>Support ticket history</li>
                          <li>Fraud prevention data</li>
                        </ul>
                        <p>This data is anonymized and cannot be linked back to you.</p>
                      </div>
                    </div>

                    <button @click="initiateDeletion" class="deletion-btn danger">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      Delete Account Permanently
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Refund History Section -->
          <div v-if="activeSection === 'refund-history'" class="section">
            <div class="refund-history-card">
              <div class="card-header">
                <div class="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                  </svg>
                </div>
                <h2>Refund History</h2>
                <div class="refund-summary">
                  <div class="summary-item">
                    <span class="summary-label">Total Refunds:</span>
                    <span class="summary-value">{{ refunds.length }}</span>
                  </div>
                  <div class="summary-item">
                    <span class="summary-label">Total Amount:</span>
                    <span class="summary-value">{{ calculateTotalRefunds() }}</span>
                  </div>
                </div>
              </div>

              <div class="refund-history-content">
                <!-- Refund Filters -->
                <div class="refund-filters">
                  <div class="filter-group">
                    <label for="statusFilter">Filter by Status:</label>
                    <select v-model="refundStatusFilter" @change="filterRefunds" id="statusFilter">
                      <option value="">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div class="filter-group">
                    <label for="dateFilter">Date Range:</label>
                    <select v-model="refundDateFilter" @change="filterRefunds" id="dateFilter">
                      <option value="">All Time</option>
                      <option value="30-days">Last 30 days</option>
                      <option value="90-days">Last 90 days</option>
                      <option value="1-year">Last year</option>
                    </select>
                  </div>
                </div>

                <!-- Refund List -->
                <div class="refunds-list">
                  <div v-if="filteredRefunds.length === 0" class="no-refunds">
                    <div class="no-refunds-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <h3>No Refunds Found</h3>
                    <p>You haven't requested any refunds yet, or no refunds match your current filters.</p>
                  </div>

                  <div v-else class="refund-items">
                    <div v-for="refund in filteredRefunds" :key="refund.id" class="refund-item">
                      <div class="refund-header">
                        <div class="refund-basic-info">
                          <h4 class="refund-id">Refund #{{ refund.id }}</h4>
                          <span class="refund-date">{{ formatDate(refund.requestDate) }}</span>
                        </div>
                        <div class="refund-status" :class="refund.status">
                          <span class="status-indicator"></span>
                          <span class="status-text">{{ formatStatus(refund.status) }}</span>
                        </div>
                      </div>

                      <div class="refund-details">
                        <div class="refund-order-info">
                          <div class="order-details">
                            <span class="order-label">Order:</span>
                            <span class="order-id">#{{ refund.orderId }}</span>
                            <span class="order-date">{{ formatDate(refund.orderDate) }}</span>
                          </div>
                          <div class="product-details">
                            <span class="product-name">{{ refund.productName }}</span>
                            <span class="product-variant">{{ refund.variant }}</span>
                          </div>
                        </div>

                        <div class="refund-amount-info">
                          <div class="amount-breakdown">
                            <div class="amount-item">
                              <span class="amount-label">Product Price:</span>
                              <span class="amount-value">{{ formatCurrency(refund.productPrice) }}</span>
                            </div>
                            <div class="amount-item">
                              <span class="amount-label">Shipping:</span>
                              <span class="amount-value">{{ formatCurrency(refund.shippingCost) }}</span>
                            </div>
                            <div class="amount-item total">
                              <span class="amount-label">Refund Amount:</span>
                              <span class="amount-value">{{ formatCurrency(refund.refundAmount) }}</span>
                            </div>
                          </div>
                        </div>

                        <div class="refund-payment-info">
                          <div class="payment-method">
                            <span class="payment-label">Refunded to:</span>
                            <div class="payment-details">
                              <span class="payment-type">{{ refund.paymentMethod }}</span>
                              <span class="payment-account">{{ refund.paymentAccount }}</span>
                            </div>
                          </div>
                          <div v-if="refund.processedDate" class="processed-date">
                            <span class="processed-label">Processed:</span>
                            <span class="processed-value">{{ formatDate(refund.processedDate) }}</span>
                          </div>
                        </div>

                        <div v-if="refund.reason" class="refund-reason">
                          <span class="reason-label">Reason:</span>
                          <span class="reason-text">{{ refund.reason }}</span>
                        </div>

                        <div v-if="refund.adminNotes" class="admin-notes">
                          <span class="notes-label">Notes:</span>
                          <span class="notes-text">{{ refund.adminNotes }}</span>
                        </div>
                      </div>

                      <div class="refund-actions">
                        <button v-if="refund.status === 'pending'" @click="cancelRefund(refund.id)" class="cancel-refund-btn">
                          Cancel Request
                        </button>
                        <button @click="viewRefundDetails(refund.id)" class="view-details-btn">
                          View Details
                        </button>
                        <button v-if="refund.status === 'rejected'" @click="resubmitRefund(refund.id)" class="resubmit-btn">
                          Resubmit Request
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Delivery Management Section -->
          <div v-if="activeSection === 'delivery-management'" class="section">
            <div class="delivery-management-card">
              <div class="card-header">
                <div class="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 1L20 7l-8 4"/>
                  </svg>
                </div>
                <h2>Delivery Management</h2>
                <button @click="addNewAddress" class="add-address-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  Add New Address
                </button>
              </div>

              <div class="delivery-management-content">
                <!-- Saved Addresses -->
                <div class="addresses-section">
                  <h3 class="section-title">Saved Addresses</h3>
                  <div class="addresses-list">
                    <div v-for="address in savedAddresses" :key="address.id" class="address-item" :class="{ 'default': address.isDefault }">
                      <div class="address-content">
                        <div class="address-header">
                          <div class="address-type">
                            <span class="type-icon" :class="address.type">
                              <svg v-if="address.type === 'home'" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                              </svg>
                              <svg v-else-if="address.type === 'work'" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 6h-2.5l1.5-1.5L17.5 3L15 5.5 12.5 3 11 4.5 13.5 7H4v14h16V6z"/>
                              </svg>
                              <svg v-else viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                              </svg>
                            </span>
                            <span class="type-text">{{ formatAddressType(address.type) }}</span>
                          </div>
                          <div v-if="address.isDefault" class="default-badge">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            Default
                          </div>
                        </div>

                        <div class="address-details">
                          <div class="address-name">{{ address.name }}</div>
                          <div class="address-line">{{ address.street }}</div>
                          <div class="address-line">{{ address.city }}, {{ address.state }} {{ address.zipCode }}</div>
                          <div class="address-phone">{{ address.phone }}</div>
                        </div>

                        <div class="address-actions">
                          <button v-if="!address.isDefault" @click="setDefaultAddress(address.id)" class="set-default-btn">
                            Set as Default
                          </button>
                          <button @click="editAddress(address.id)" class="edit-address-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                            Edit
                          </button>
                          <button @click="deleteAddress(address.id)" class="delete-address-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Delivery Preferences -->
                <div class="delivery-preferences-section">
                  <h3 class="section-title">Delivery Preferences</h3>
                  <div class="preferences-grid">
                    <div class="preference-card">
                      <h4>Preferred Delivery Time</h4>
                      <div class="time-slots">
                        <div
                          v-for="slot in deliveryTimeSlots"
                          :key="slot.id"
                          @click="selectTimeSlot(slot.id)"
                          class="time-slot"
                          :class="{ 'selected': selectedTimeSlot === slot.id }"
                        >
                          <div class="slot-time">{{ slot.time }}</div>
                          <div class="slot-description">{{ slot.description }}</div>
                        </div>
                      </div>
                    </div>

                    <div class="preference-card">
                      <h4>Delivery Instructions</h4>
                      <textarea
                        v-model="deliveryInstructions"
                        placeholder="Add special delivery instructions (e.g., leave at door, ring bell, etc.)"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Active Deliveries -->
                <div class="active-deliveries-section">
                  <h3 class="section-title">Active Deliveries</h3>
                  <div v-if="activeDeliveries.length === 0" class="no-deliveries">
                    <div class="no-deliveries-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 1L20 7l-8 4"/>
                      </svg>
                    </div>
                    <h4>No Active Deliveries</h4>
                    <p>You don't have any packages on the way right now.</p>
                  </div>

                  <div v-else class="delivery-items">
                    <div v-for="delivery in activeDeliveries" :key="delivery.id" class="delivery-item">
                      <div class="delivery-header">
                        <div class="delivery-info">
                          <h4>Order #{{ delivery.orderId }}</h4>
                          <span class="delivery-status" :class="delivery.status">{{ formatDeliveryStatus(delivery.status) }}</span>
                        </div>
                        <div class="estimated-delivery">
                          <span class="delivery-label">Estimated Delivery:</span>
                          <span class="delivery-date">{{ formatDate(delivery.estimatedDate) }}</span>
                        </div>
                      </div>

                      <div class="delivery-progress">
                        <div class="progress-bar">
                          <div class="progress-fill" :style="{ width: delivery.progress + '%' }"></div>
                        </div>
                        <div class="progress-steps">
                          <div v-for="step in delivery.steps" :key="step.id" class="progress-step" :class="{ 'completed': step.completed, 'current': step.current }">
                            <div class="step-icon">
                              <svg v-if="step.completed" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                              </svg>
                              <div v-else class="step-dot"></div>
                            </div>
                            <div class="step-details">
                              <span class="step-title">{{ step.title }}</span>
                              <span v-if="step.time" class="step-time">{{ formatTime(step.time) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="delivery-actions">
                        <button @click="trackPackage(delivery.id)" class="track-btn">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          Track Package
                        </button>
                        <button @click="contactCourier(delivery.id)" class="contact-courier-btn">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                          </svg>
                          Contact Courier
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Save Settings -->
                <div class="settings-actions">
                  <button @click="saveDeliverySettings" class="save-settings-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Save Delivery Preferences
                  </button>
                </div>
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
      notifications: [
        {
          id: 1,
          type: 'order',
          title: 'Order Confirmed',
          message: 'Your order #12345 for Premium Running Shoes has been confirmed and is being processed.',
          time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          read: false,
          action: {
            text: 'View Order',
            url: '/orders/12345'
          }
        },
        {
          id: 2,
          type: 'promotion',
          title: 'Special Offer: 25% Off',
          message: 'Limited time offer! Get 25% off on all Nike products. Use code NIKE25 at checkout.',
          time: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
          read: false,
          action: {
            text: 'Shop Now',
            url: '/brands/nike'
          }
        },
        {
          id: 3,
          type: 'delivery',
          title: 'Out for Delivery',
          message: 'Your order #12340 is out for delivery and will arrive today between 2-4 PM.',
          time: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
          read: false,
          action: {
            text: 'Track Package',
            url: '/orders/12340/track'
          }
        },
        {
          id: 4,
          type: 'order',
          title: 'Order Delivered',
          message: 'Your order #12338 has been successfully delivered. Thank you for shopping with us!',
          time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          read: true
        },
        {
          id: 5,
          type: 'promotion',
          title: 'New Arrivals',
          message: 'Check out the latest footwear collection from top brands. Fresh styles just added!',
          time: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
          read: true,
          action: {
            text: 'Browse Collection',
            url: '/products/new-arrivals'
          }
        }
      ],
      notificationSettings: {
        orderUpdates: true,
        promotions: true,
        deliveryReminders: true,
        generalAlerts: true
      },
      // Support data
      faqs: [
        {
          id: 1,
          question: "How do I track my order?",
          answer: "You can track your order by going to the 'Orders' section in your profile or using the tracking link in your confirmation email.",
          expanded: false
        },
        {
          id: 2,
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for unused items in original packaging. Simply initiate a return request through your order history.",
          expanded: false
        },
        {
          id: 3,
          question: "How long does shipping take?",
          answer: "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. Delivery times may vary based on location.",
          expanded: false
        },
        {
          id: 4,
          question: "Can I change my order after placing it?",
          answer: "Orders can be modified within 1 hour of placement. After that, you'll need to contact our support team for assistance.",
          expanded: false
        }
      ],
      // Language & Region data
      selectedLanguage: {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        flag: 'https://flagcdn.com/us.svg'
      },
      availableLanguages: [
        { code: 'en', name: 'English', nativeName: 'English', flag: 'https://flagcdn.com/us.svg' },
        { code: 'es', name: 'Spanish', nativeName: 'Español', flag: 'https://flagcdn.com/es.svg' },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: 'https://flagcdn.com/fr.svg' },
        { code: 'de', name: 'German', nativeName: 'Deutsch', flag: 'https://flagcdn.com/de.svg' },
        { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: 'https://flagcdn.com/it.svg' },
        { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: 'https://flagcdn.com/pt.svg' }
      ],
      selectedCurrency: 'USD',
      availableCurrencies: [
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'British Pound', symbol: '£' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
        { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥' }
      ],
      selectedRegion: 'US',
      availableRegions: [
        { code: 'US', name: 'United States', flag: '🇺🇸' },
        { code: 'CA', name: 'Canada', flag: '🇨🇦' },
        { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
        { code: 'DE', name: 'Germany', flag: '🇩🇪' },
        { code: 'FR', name: 'France', flag: '🇫🇷' },
        { code: 'IT', name: 'Italy', flag: '🇮🇹' },
        { code: 'ES', name: 'Spain', flag: '🇪🇸' },
        { code: 'AU', name: 'Australia', flag: '🇦🇺' },
        { code: 'JP', name: 'Japan', flag: '🇯🇵' }
      ],
      // Privacy settings
      privacySettings: {
        dataProcessing: true,
        marketing: false,
        analytics: true,
        thirdParty: false
      },
      // Account deletion
      deactivationPeriod: 'indefinite',
      // Refund data
      refundStatusFilter: '',
      refundDateFilter: '',
      refunds: [
        {
          id: 'REF001',
          orderId: '12345',
          orderDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          requestDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
          processedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
          status: 'completed',
          productName: 'Premium Running Shoes',
          variant: 'Size 10, Black',
          productPrice: 129.99,
          shippingCost: 9.99,
          refundAmount: 139.98,
          paymentMethod: 'Credit Card',
          paymentAccount: '**** 1234',
          reason: 'Product defect - sole separation'
        },
        {
          id: 'REF002',
          orderId: '12346',
          orderDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          requestDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          status: 'pending',
          productName: 'Classic White Sneakers',
          variant: 'Size 9, White',
          productPrice: 89.99,
          shippingCost: 5.99,
          refundAmount: 95.98,
          paymentMethod: 'PayPal',
          paymentAccount: 'anushka.sen@email.com',
          reason: 'Wrong size ordered'
        },
        {
          id: 'REF003',
          orderId: '12344',
          orderDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
          requestDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
          status: 'rejected',
          productName: 'Luxury Boots',
          variant: 'Size 8, Brown',
          productPrice: 199.99,
          shippingCost: 0,
          refundAmount: 199.99,
          paymentMethod: 'Credit Card',
          paymentAccount: '**** 5678',
          reason: 'Changed mind',
          adminNotes: 'Item returned after 30-day return window expired'
        }
      ],
      // Delivery data
      savedAddresses: [
        {
          id: 1,
          type: 'home',
          name: 'Anushka Sen',
          street: '123 Main Street, Apt 4B',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          phone: '+1 (555) 123-4567',
          isDefault: true
        },
        {
          id: 2,
          type: 'work',
          name: 'Anushka Sen',
          street: '456 Business Ave, Floor 10',
          city: 'New York',
          state: 'NY',
          zipCode: '10002',
          phone: '+1 (555) 123-4567',
          isDefault: false
        }
      ],
      deliveryTimeSlots: [
        { id: 1, time: '9:00 AM - 12:00 PM', description: 'Morning delivery' },
        { id: 2, time: '12:00 PM - 5:00 PM', description: 'Afternoon delivery' },
        { id: 3, time: '5:00 PM - 8:00 PM', description: 'Evening delivery' },
        { id: 4, time: 'Any time', description: 'No preference' }
      ],
      selectedTimeSlot: 4,
      deliveryInstructions: '',
      activeDeliveries: [
        {
          id: 1,
          orderId: '12347',
          status: 'out-for-delivery',
          estimatedDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
          progress: 75,
          steps: [
            { id: 1, title: 'Order Confirmed', completed: true, time: new Date(Date.now() - 72 * 60 * 60 * 1000) },
            { id: 2, title: 'Processing', completed: true, time: new Date(Date.now() - 48 * 60 * 60 * 1000) },
            { id: 3, title: 'Shipped', completed: true, time: new Date(Date.now() - 24 * 60 * 60 * 1000) },
            { id: 4, title: 'Out for Delivery', completed: false, current: true, time: null },
            { id: 5, title: 'Delivered', completed: false, time: null }
          ]
        }
      ],
      // Modal states
      showHelpCenter: false,
      showCommunityForum: false,
      showVideoTutorials: false,
      selectedVideoCategory: 1,
      // Help Center data
      helpCategories: [
        {
          id: 1,
          title: 'Getting Started',
          description: 'Learn the basics of using our platform',
          articles: 12,
          icon: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
        },
        {
          id: 2,
          title: 'Orders & Shipping',
          description: 'Everything about orders, shipping, and delivery',
          articles: 24,
          icon: '<path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 1L20 7l-8 4"/>'
        },
        {
          id: 3,
          title: 'Account Management',
          description: 'Manage your profile, settings, and preferences',
          articles: 18,
          icon: '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>'
        },
        {
          id: 4,
          title: 'Returns & Refunds',
          description: 'Process returns and request refunds',
          articles: 8,
          icon: '<path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>'
        }
      ],
      // Community Forum data
      forumTopics: [
        {
          id: 1,
          title: 'Best running shoes for beginners?',
          excerpt: 'Looking for recommendations for someone just starting their running journey...',
          author: { name: 'Sarah M.', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612789c?w=40&h=40&fit=crop&crop=face' },
          replies: 23,
          lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: 2,
          title: 'Nike vs Adidas sizing comparison',
          excerpt: 'Has anyone noticed differences in sizing between these brands?',
          author: { name: 'Mike L.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
          replies: 15,
          lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000)
        },
        {
          id: 3,
          title: 'Care tips for leather shoes',
          excerpt: 'Share your best practices for maintaining leather footwear...',
          author: { name: 'Emma R.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
          replies: 31,
          lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000)
        }
      ],
      // Video Tutorial data
      videoCategories: [
        { id: 1, name: 'Getting Started' },
        { id: 2, name: 'Shopping Tips' },
        { id: 3, name: 'Care & Maintenance' },
        { id: 4, name: 'Sizing Guide' }
      ],
      videos: [
        {
          id: 1,
          title: 'How to Find Your Perfect Size',
          description: 'Learn how to measure your feet and find the right size',
          thumbnail: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300&h=200&fit=crop',
          duration: '3:45',
          views: '12.3K',
          publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          categoryId: 4
        },
        {
          id: 2,
          title: 'Creating Your First Account',
          description: 'Step-by-step guide to setting up your FootMarket account',
          thumbnail: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=300&h=200&fit=crop',
          duration: '2:30',
          views: '8.7K',
          publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          categoryId: 1
        },
        {
          id: 3,
          title: 'Cleaning Your Sneakers',
          description: 'Professional tips for keeping your sneakers looking fresh',
          thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop',
          duration: '5:20',
          views: '25.1K',
          publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
          categoryId: 3
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
          badge: this.unreadNotifications?.length || '3'
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
    },

    unreadNotifications() {
      return this.notifications.filter(notification => !notification.read)
    },

    filteredRefunds() {
      let filtered = this.refunds

      if (this.refundStatusFilter) {
        filtered = filtered.filter(refund => refund.status === this.refundStatusFilter)
      }

      if (this.refundDateFilter) {
        const now = new Date()
        const filterDays = {
          '30-days': 30,
          '90-days': 90,
          '1-year': 365
        }

        if (filterDays[this.refundDateFilter]) {
          const cutoffDate = new Date(now - filterDays[this.refundDateFilter] * 24 * 60 * 60 * 1000)
          filtered = filtered.filter(refund => refund.requestDate >= cutoffDate)
        }
      }

      return filtered.sort((a, b) => b.requestDate - a.requestDate)
    },

    filteredVideos() {
      return this.videos.filter(video => video.categoryId === this.selectedVideoCategory)
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

    // Notification methods
    formatNotificationTime(time) {
      const now = new Date()
      const diff = now - time
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const days = Math.floor(hours / 24)

      if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`
      } else {
        const minutes = Math.floor(diff / (1000 * 60))
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
      }
    },

    markAsRead(notificationId) {
      const notification = this.notifications.find(n => n.id === notificationId)
      if (notification) {
        notification.read = true
        this.updateNotificationBadge()
        this.$toast?.success('Notification marked as read')
      }
    },

    markAllAsRead() {
      this.notifications.forEach(notification => {
        notification.read = true
      })
      this.updateNotificationBadge()
      this.$toast?.success('All notifications marked as read')
    },

    handleNotificationAction(notification) {
      if (notification.action) {
        this.$toast?.info(`Navigating to ${notification.action.text}`)
        // In a real app, you would navigate to the URL
        // this.$router.push(notification.action.url)
      }
    },

    updateNotificationBadge() {
      const notificationSection = this.profileSections.find(s => s.id === 'notifications')
      if (notificationSection) {
        const unreadCount = this.unreadNotifications.length
        notificationSection.badge = unreadCount > 0 ? unreadCount.toString() : undefined
      }
    },

    saveNotificationSettings() {
      // Save settings to localStorage or API
      localStorage.setItem('notificationSettings', JSON.stringify(this.notificationSettings))
      this.$toast?.success('Notification settings saved successfully!')
    },

    // Support methods
    startLiveChat() {
      this.$toast?.info('Starting live chat...')
      // In a real app, this would open a chat widget
    },

    createTicket() {
      this.$toast?.info('Opening support ticket form...')
      // In a real app, this would open a ticket creation modal
    },

    emailSupport() {
      window.location.href = 'mailto:support@footmarket.com'
    },

    callSupport() {
      this.$toast?.info('Calling +1 (555) 123-4567...')
    },

    toggleFaq(faqId) {
      const faq = this.faqs.find(f => f.id === faqId)
      if (faq) {
        faq.expanded = !faq.expanded
      }
    },

    visitHelpCenter() {
      this.showHelpCenter = true
    },

    closeHelpCenter() {
      this.showHelpCenter = false
    },

    selectHelpCategory(category) {
      this.$toast?.success(`Opening ${category.title} articles...`)
      this.closeHelpCenter()
    },

    openCommunityForum() {
      this.showCommunityForum = true
    },

    closeCommunityForum() {
      this.showCommunityForum = false
    },

    viewVideoTutorials() {
      this.showVideoTutorials = true
    },

    closeVideoTutorials() {
      this.showVideoTutorials = false
    },

    playVideo(video) {
      this.$toast?.success(`Playing: ${video.title}`)
      this.closeVideoTutorials()
    },

    // Language & Region methods
    selectLanguage(language) {
      this.selectedLanguage = language
      this.$toast?.success(`Language changed to ${language.name}`)
    },

    updateCurrency() {
      this.$toast?.success(`Currency changed to ${this.selectedCurrency}`)
    },

    updateRegion() {
      this.$toast?.success(`Region changed to ${this.selectedRegion}`)
    },

    formatCurrencyPreview(amount) {
      const currency = this.availableCurrencies.find(c => c.code === this.selectedCurrency)
      return currency ? `${currency.symbol}${amount.toFixed(2)}` : `$${amount.toFixed(2)}`
    },

    saveLanguageSettings() {
      const settings = {
        language: this.selectedLanguage.code,
        currency: this.selectedCurrency,
        region: this.selectedRegion
      }
      localStorage.setItem('languageSettings', JSON.stringify(settings))
      this.$toast?.success('Language & region settings saved!')
    },

    // Privacy methods
    viewPrivacyPolicy() {
      this.$toast?.info('Opening Privacy Policy...')
      // In a real app, this would open the privacy policy
    },

    viewTerms() {
      this.$toast?.info('Opening Terms & Conditions...')
      // In a real app, this would open the terms
    },

    requestDataDownload() {
      this.$toast?.info('Data export request submitted. You will receive an email within 24-48 hours.')
    },

    savePrivacySettings() {
      localStorage.setItem('privacySettings', JSON.stringify(this.privacySettings))
      this.$toast?.success('Privacy settings saved!')
    },

    // Account deletion methods
    initiateDeactivation() {
      this.$toast?.info('Account deactivation process initiated. You will receive a confirmation email.')
    },

    initiateDeletion() {
      // In a real app, this would open a confirmation modal
      this.$toast?.info('Opening account deletion confirmation...')
    },

    // Refund methods
    filterRefunds() {
      // Filtering is handled by computed property
    },

    formatStatus(status) {
      const statusMap = {
        'pending': 'Pending Review',
        'approved': 'Approved',
        'rejected': 'Rejected',
        'completed': 'Completed'
      }
      return statusMap[status] || status
    },

    calculateTotalRefunds() {
      const total = this.refunds
        .filter(r => r.status === 'completed')
        .reduce((sum, refund) => sum + refund.refundAmount, 0)
      return this.formatCurrency(total)
    },

    formatCurrency(amount) {
      return `$${amount.toFixed(2)}`
    },

    cancelRefund(refundId) {
      this.$toast?.info(`Cancelling refund request ${refundId}...`)
    },

    viewRefundDetails(refundId) {
      this.$toast?.info(`Viewing details for refund ${refundId}...`)
    },

    resubmitRefund(refundId) {
      this.$toast?.info(`Resubmitting refund request ${refundId}...`)
    },

    // Delivery methods
    addNewAddress() {
      this.$toast?.info('Opening address form...')
      // In a real app, this would open an address form modal
    },

    setDefaultAddress(addressId) {
      this.savedAddresses.forEach(addr => {
        addr.isDefault = addr.id === addressId
      })
      this.$toast?.success('Default address updated!')
    },

    editAddress(addressId) {
      this.$toast?.info(`Editing address ${addressId}...`)
      // In a real app, this would open an edit form
    },

    deleteAddress(addressId) {
      const index = this.savedAddresses.findIndex(addr => addr.id === addressId)
      if (index !== -1) {
        this.savedAddresses.splice(index, 1)
        this.$toast?.success('Address deleted!')
      }
    },

    formatAddressType(type) {
      const typeMap = {
        'home': 'Home',
        'work': 'Work',
        'other': 'Other'
      }
      return typeMap[type] || type
    },

    selectTimeSlot(slotId) {
      this.selectedTimeSlot = slotId
    },

    formatDeliveryStatus(status) {
      const statusMap = {
        'processing': 'Processing',
        'shipped': 'Shipped',
        'out-for-delivery': 'Out for Delivery',
        'delivered': 'Delivered'
      }
      return statusMap[status] || status
    },

    formatTime(time) {
      if (!time) return ''
      return time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    },

    trackPackage(deliveryId) {
      this.$toast?.info(`Opening tracking for delivery ${deliveryId}...`)
    },

    contactCourier(deliveryId) {
      this.$toast?.info(`Contacting courier for delivery ${deliveryId}...`)
    },

    saveDeliverySettings() {
      const settings = {
        selectedTimeSlot: this.selectedTimeSlot,
        deliveryInstructions: this.deliveryInstructions
      }
      localStorage.setItem('deliverySettings', JSON.stringify(settings))
      this.$toast?.success('Delivery preferences saved!')
    }
  },

  created() {
    // Load notification settings from localStorage
    const savedSettings = localStorage.getItem('notificationSettings')
    if (savedSettings) {
      try {
        this.notificationSettings = { ...this.notificationSettings, ...JSON.parse(savedSettings) }
      } catch (error) {
        console.error('Error loading notification settings:', error)
      }
    }

    // Update notification badge on load
    this.$nextTick(() => {
      this.updateNotificationBadge()
    })
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

/* Notifications Card */
.notifications-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.mark-all-read-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.mark-all-read-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}

.mark-all-read-btn svg {
  width: 14px;
  height: 14px;
}

/* Notifications Content */
.notifications-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* Notifications List */
.notifications-list-section {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
}

.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 500px;
  overflow-y: auto;
}

.notification-item {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
}

.notification-item.unread {
  border-color: #3b82f6;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
}

.notification-item.unread::before {
  content: '';
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
}

.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notification-icon.order {
  background: #dbeafe;
  color: #3b82f6;
}

.notification-icon.promotion {
  background: #fef3c7;
  color: #f59e0b;
}

.notification-icon.delivery {
  background: #d1fae5;
  color: #10b981;
}

.notification-icon.general {
  background: #e5e7eb;
  color: #6b7280;
}

.notification-icon svg {
  width: 20px;
  height: 20px;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 1rem;
}

.notification-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
}

.notification-time {
  font-size: 0.75rem;
  color: #9ca3af;
  white-space: nowrap;
  flex-shrink: 0;
}

.notification-message {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
}

.notification-action {
  margin-top: 0.75rem;
}

.notification-action-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.notification-action-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.mark-read-btn {
  background: #f3f4f6;
  color: #6b7280;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mark-read-btn:hover {
  background: #10b981;
  color: white;
}

.mark-read-btn svg {
  width: 14px;
  height: 14px;
}

/* Notification Settings */
.notification-settings-section {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.setting-item {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.setting-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.setting-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.setting-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.setting-icon.order {
  background: #dbeafe;
  color: #3b82f6;
}

.setting-icon.promotion {
  background: #fef3c7;
  color: #f59e0b;
}

.setting-icon.delivery {
  background: #d1fae5;
  color: #10b981;
}

.setting-icon.general {
  background: #e5e7eb;
  color: #6b7280;
}

.setting-icon svg {
  width: 20px;
  height: 20px;
}

.setting-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.setting-content p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.setting-toggle {
  position: relative;
  flex-shrink: 0;
}

.setting-toggle input[type="checkbox"] {
  display: none;
}

.setting-toggle .toggle-label {
  width: 50px;
  height: 24px;
  background: #d1d5db;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease;
  display: block;
}

.setting-toggle .toggle-label::after {
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

.setting-toggle input[type="checkbox"]:checked + .toggle-label {
  background: #3b82f6;
}

.setting-toggle input[type="checkbox"]:checked + .toggle-label::after {
  transform: translateX(26px);
}

.settings-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
}

.save-settings-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.save-settings-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}

.save-settings-btn svg {
  width: 16px;
  height: 16px;
}

/* Language & Region Card */
.language-region-card {
  background: white;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.card-header-simple {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1.5rem 0 1.5rem;
  margin-bottom: 1.5rem;
}

.header-icon-simple {
  width: 20px;
  height: 20px;
  color: #374151;
}

.header-icon-simple svg {
  width: 100%;
  height: 100%;
}

.card-header-simple h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.language-region-content {
  padding: 0 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Language Preference Section */
.language-preference-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preference-section-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin: 0;
}

.language-cards {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.language-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}

.language-card:hover {
  border-color: #d1d5db;
  background: #f9fafb;
}

.language-card.selected {
  background: #fdf2f8;
  border-color: #ec4899;
  box-shadow: 0 0 0 1px #ec4899;
}

.language-flag-container {
  width: 24px;
  height: 18px;
  border-radius: 2px;
  overflow: hidden;
  flex-shrink: 0;
}

.language-flag {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.language-details {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.language-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  line-height: 1.2;
}

.language-native {
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.2;
}

/* Currency & Region Section */
.currency-region-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: flex;
  flex-direction: column;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-field label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.region-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #1f2937;
  background: white;
  transition: border-color 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.region-select:focus {
  outline: none;
  border-color: #ec4899;
  box-shadow: 0 0 0 1px #ec4899;
}

.region-select:hover {
  border-color: #9ca3af;
}

/* Modern Support Container */
.modern-support-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Support Hero Section */
.support-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.support-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 100%;
  height: 200%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
  animation: float 20s infinite linear;
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-20px) rotate(360deg); }
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  z-index: 2;
  position: relative;
}

.hero-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hero-icon svg {
  width: 32px;
  height: 32px;
}

.hero-text h2 {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-text p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
  line-height: 1.5;
}

.hero-stats {
  display: flex;
  gap: 2rem;
  z-index: 2;
  position: relative;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
}

/* Quick Actions Section */
.quick-actions-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.section-heading {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1.5rem 0;
}

.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Action Cards */
.action-card {
  background: white;
  border: 2px solid #f1f3f4;
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.action-card:hover {
  border-color: #ec4899;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.15);
}

.action-card.premium {
  border-color: #ec4899;
  background: linear-gradient(135deg, #fef7f7 0%, #fdf2f8 100%);
}

.card-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ec4899;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.card-icon.chat {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.card-icon.ticket {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.card-icon.phone {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
}

.card-icon.email {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
}

.card-icon svg {
  width: 24px;
  height: 24px;
}

.card-content h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.card-content p {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-indicator.online {
  color: #10b981;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.ticket-info, .phone-info, .email-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8rem;
  color: #ec4899;
  font-weight: 500;
}

.info-item svg {
  width: 12px;
  height: 12px;
}

.phone-number, .email-address {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
}

.availability, .response-time {
  font-size: 0.75rem;
  color: #6b7280;
}

.card-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ec4899;
  margin-top: 1rem;
}

.card-action svg {
  width: 16px;
  height: 16px;
}

/* Self-Service Section */
.self-service-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.section-header {
  margin-bottom: 2rem;
}

.section-description {
  color: #6b7280;
  font-size: 1rem;
  margin: 0.5rem 0 0 0;
}

/* Modern FAQ */
.modern-faq-container {
  margin-bottom: 2rem;
}

.faq-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
}

.faq-icon {
  width: 40px;
  height: 40px;
  background: #ec4899;
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.faq-icon svg {
  width: 20px;
  height: 20px;
}

.faq-title h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.faq-title p {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.modern-faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modern-faq-item {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.modern-faq-item:hover {
  border-color: #d1d5db;
}

.modern-faq-item.expanded {
  border-color: #ec4899;
  box-shadow: 0 2px 8px rgba(236, 72, 153, 0.1);
}

.modern-faq-question {
  width: 100%;
  padding: 1rem 1.25rem;
  background: white;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;
}

.modern-faq-question:hover {
  background: #f9fafb;
}

.question-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
}

.question-icon {
  width: 20px;
  height: 20px;
  color: #9ca3af;
  transition: transform 0.3s ease;
}

.modern-faq-item.expanded .question-icon {
  transform: rotate(180deg);
  color: #ec4899;
}

.question-icon svg {
  width: 100%;
  height: 100%;
}

.modern-faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.modern-faq-item.expanded .modern-faq-answer {
  max-height: 200px;
}

.answer-content {
  padding: 0 1.25rem 1rem 1.25rem;
  border-top: 1px solid #f3f4f6;
}

.answer-content p {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0.75rem 0 0 0;
}

/* Additional Resources */
.additional-resources {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.resource-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.resource-card:hover {
  border-color: #ec4899;
  background: #fdf2f8;
  transform: translateY(-1px);
}

.resource-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.resource-icon svg {
  width: 20px;
  height: 20px;
}

.resource-content {
  flex: 1;
}

.resource-content h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.resource-content p {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}

.resource-arrow {
  width: 20px;
  height: 20px;
  color: #9ca3af;
  transition: transform 0.3s ease;
}

.resource-card:hover .resource-arrow {
  transform: translateX(4px);
  color: #ec4899;
}

.resource-arrow svg {
  width: 100%;
  height: 100%;
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

  /* Notifications responsive */
  .notifications-content {
    gap: 2rem;
  }

  .notification-item {
    padding: 1rem;
    gap: 0.75rem;
  }

  .notification-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .setting-item {
    padding: 1rem;
    gap: 0.75rem;
  }

  .setting-info {
    gap: 0.75rem;
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

  /* Notifications mobile */
  .mark-all-read-btn {
    width: 100%;
    justify-content: center;
  }

  .notification-item {
    padding: 0.875rem;
    gap: 0.625rem;
  }

  .notification-icon {
    width: 32px;
    height: 32px;
  }

  .notification-icon svg {
    width: 16px;
    height: 16px;
  }

  .notification-title {
    font-size: 0.9rem;
  }

  .notification-message {
    font-size: 0.8rem;
  }

  .notification-time {
    font-size: 0.7rem;
  }

  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .setting-info {
    width: 100%;
  }

  .setting-icon {
    width: 32px;
    height: 32px;
  }

  .setting-icon svg {
    width: 16px;
    height: 16px;
  }

  .setting-content h4 {
    font-size: 0.9rem;
  }

  .setting-content p {
    font-size: 0.8rem;
  }

  .settings-actions {
    margin-top: 1.5rem;
  }

  .save-settings-btn {
    width: 100%;
    justify-content: center;
  }

  /* Language & Region responsive */
  .language-region-card {
    margin: 0 -0.5rem;
  }

  .card-header-simple {
    padding: 1rem 1rem 0 1rem;
    margin-bottom: 1rem;
  }

  .language-region-content {
    padding: 0 1rem 1rem 1rem;
    gap: 1.5rem;
  }

  .language-card {
    padding: 0.75rem;
  }

  .language-flag-container {
    width: 20px;
    height: 15px;
  }

  .language-name {
    font-size: 0.8rem;
  }

  .language-native {
    font-size: 0.7rem;
  }

  /* Modern Support responsive */
  .support-hero {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .hero-content {
    flex-direction: column;
    gap: 1rem;
  }

  .hero-stats {
    gap: 1rem;
  }

  .quick-actions-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .action-card {
    padding: 1.25rem;
  }

  .card-badge {
    top: 0.75rem;
    right: 0.75rem;
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }

  .additional-resources {
    grid-template-columns: 1fr;
  }

  .resource-card {
    padding: 1rem;
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
  .notifications-card,
  .simple-card {
    padding: 1.5rem;
  }

  .notifications-list-section,
  .notification-settings-section {
    padding: 1rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
