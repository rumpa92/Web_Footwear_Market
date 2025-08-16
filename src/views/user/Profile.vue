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
          <!-- Section 1: Update Profile -->
          <div v-if="activeSection === 'update-profile'" class="section">
            <div class="section-header">
              <h2>Update Profile</h2>
              <p>Manage your personal information and account details</p>
            </div>
            
            <div class="profile-update-content">
              <!-- Avatar Section -->
              <div class="avatar-section">
                <div class="avatar-container">
                  <img :src="currentUser.avatar" :alt="currentUser.name" class="profile-avatar" />
                  <button class="edit-avatar-btn" @click="changeAvatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </button>
                </div>
                <h3>{{ currentUser.name }}</h3>
                <p class="user-email">{{ currentUser.email }}</p>
              </div>

              <!-- Update Form -->
              <div class="update-form-section">
                <form class="profile-form" @submit.prevent="updateProfile">
                  <div class="form-row">
                    <div class="form-group">
                      <label>Full Name</label>
                      <input v-model="profileForm.name" type="text" placeholder="Enter your full name" required />
                    </div>
                    <div class="form-group">
                      <label>Email Address</label>
                      <input v-model="profileForm.email" type="email" placeholder="Enter your email" required />
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group">
                      <label>Phone Number</label>
                      <input v-model="profileForm.phone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div class="form-group">
                      <label>Date of Birth</label>
                      <input v-model="profileForm.dob" type="date" />
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label>Gender</label>
                      <select v-model="profileForm.gender">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Location</label>
                      <input v-model="profileForm.location" type="text" placeholder="City, State" />
                    </div>
                  </div>

                  <div class="form-group">
                    <label>Bio</label>
                    <textarea v-model="profileForm.bio" placeholder="Tell us about yourself..." rows="3"></textarea>
                  </div>

                  <button type="submit" class="save-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>

          <!-- Section 2: Customer Support -->
          <div v-if="activeSection === 'customer-support'" class="section">
            <div class="section-header">
              <h2>Customer Support</h2>
              <p>Get help and assistance with your account</p>
            </div>
            
            <div class="support-content">
              <div class="support-options">
                <div class="support-card" @click="startLiveChat">
                  <div class="support-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                  </div>
                  <h3>Live Chat</h3>
                  <p>Chat with our support team in real-time</p>
                  <span class="support-status online">Available 24/7</span>
                </div>

                <div class="support-card" @click="createTicket">
                  <div class="support-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                    </svg>
                  </div>
                  <h3>Support Ticket</h3>
                  <p>Create a detailed support request</p>
                  <span class="support-status">Response within 24hrs</span>
                </div>

                <div class="support-card" @click="callSupport">
                  <div class="support-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <h3>Phone Support</h3>
                  <p>Call us directly for immediate assistance</p>
                  <span class="support-phone">1-800-FOOTMARKET</span>
                </div>

                <div class="support-card" @click="openFAQ">
                  <div class="support-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3>FAQ & Help Center</h3>
                  <p>Find answers to common questions</p>
                  <span class="support-link">Browse FAQ →</span>
                </div>
              </div>

              <div class="recent-tickets" v-if="supportTickets.length > 0">
                <h3>Your Recent Tickets</h3>
                <div class="tickets-list">
                  <div v-for="ticket in supportTickets" :key="ticket.id" class="ticket-item">
                    <div class="ticket-info">
                      <h4>{{ ticket.subject }}</h4>
                      <p>{{ ticket.description }}</p>
                      <span class="ticket-date">{{ formatDate(ticket.date) }}</span>
                    </div>
                    <div class="ticket-status">
                      <span class="status-badge" :class="ticket.status">{{ ticket.status }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 3: Language & Region -->
          <div v-if="activeSection === 'language-region'" class="section">
            <div class="section-header">
              <h2>Language & Region</h2>
              <p>Customize your language preferences and regional settings</p>
            </div>
            
            <div class="language-region-content">
              <div class="settings-card">
                <h3>Language Preferences</h3>
                <div class="setting-item">
                  <label>Display Language</label>
                  <select v-model="settings.language">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="it">Italiano</option>
                    <option value="pt">Português</option>
                    <option value="zh">中文</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>
              </div>

              <div class="settings-card">
                <h3>Regional Settings</h3>
                <div class="setting-item">
                  <label>Country/Region</label>
                  <select v-model="settings.country">
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="IT">Italy</option>
                    <option value="ES">Spain</option>
                    <option value="JP">Japan</option>
                    <option value="CN">China</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
                <div class="setting-item">
                  <label>Currency</label>
                  <select v-model="settings.currency">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD ($)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="CNY">CNY (¥)</option>
                    <option value="AUD">AUD ($)</option>
                  </select>
                </div>
                <div class="setting-item">
                  <label>Time Zone</label>
                  <select v-model="settings.timezone">
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                    <option value="Europe/Paris">Central European Time (CET)</option>
                    <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
                    <option value="Asia/Shanghai">China Standard Time (CST)</option>
                  </select>
                </div>
              </div>

              <div class="settings-card">
                <h3>Format Preferences</h3>
                <div class="setting-item">
                  <label>Date Format</label>
                  <select v-model="settings.dateFormat">
                    <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY (UK)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                    <option value="DD.MM.YYYY">DD.MM.YYYY (DE)</option>
                  </select>
                </div>
                <div class="setting-item">
                  <label>Number Format</label>
                  <select v-model="settings.numberFormat">
                    <option value="1,234.56">1,234.56 (US)</option>
                    <option value="1.234,56">1.234,56 (EU)</option>
                    <option value="1 234,56">1 234,56 (FR)</option>
                  </select>
                </div>
              </div>

              <button @click="saveLanguageSettings" class="save-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Save Language & Region Settings
              </button>
            </div>
          </div>

          <!-- Section 4: Privacy & Terms -->
          <div v-if="activeSection === 'privacy-terms'" class="section">
            <div class="section-header">
              <h2>Privacy & Terms</h2>
              <p>Review our policies and manage your privacy preferences</p>
            </div>
            
            <div class="privacy-content">
              <div class="privacy-settings">
                <h3>Privacy Settings</h3>
                <div class="privacy-item">
                  <div class="privacy-info">
                    <h4>Data Collection</h4>
                    <p>Allow FootMarket to collect data to improve your experience</p>
                  </div>
                  <div class="privacy-toggle">
                    <input type="checkbox" v-model="privacySettings.dataCollection" id="dataCollection">
                    <label for="dataCollection" class="toggle-label"></label>
                  </div>
                </div>

                <div class="privacy-item">
                  <div class="privacy-info">
                    <h4>Marketing Communications</h4>
                    <p>Receive promotional emails and marketing updates</p>
                  </div>
                  <div class="privacy-toggle">
                    <input type="checkbox" v-model="privacySettings.marketing" id="marketing">
                    <label for="marketing" class="toggle-label"></label>
                  </div>
                </div>

                <div class="privacy-item">
                  <div class="privacy-info">
                    <h4>Analytics & Performance</h4>
                    <p>Help us improve our service with anonymous usage data</p>
                  </div>
                  <div class="privacy-toggle">
                    <input type="checkbox" v-model="privacySettings.analytics" id="analytics">
                    <label for="analytics" class="toggle-label"></label>
                  </div>
                </div>

                <div class="privacy-item">
                  <div class="privacy-info">
                    <h4>Personalized Recommendations</h4>
                    <p>Show personalized product recommendations based on your browsing</p>
                  </div>
                  <div class="privacy-toggle">
                    <input type="checkbox" v-model="privacySettings.personalization" id="personalization">
                    <label for="personalization" class="toggle-label"></label>
                  </div>
                </div>
              </div>

              <div class="policy-links">
                <h3>Legal Documents</h3>
                <div class="policy-list">
                  <a href="/terms-of-service" class="policy-link" target="_blank">
                    <div class="policy-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <div class="policy-info">
                      <h4>Terms of Service</h4>
                      <p>Our terms and conditions for using FootMarket</p>
                    </div>
                    <svg class="policy-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>

                  <a href="/privacy-policy" class="policy-link" target="_blank">
                    <div class="policy-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </div>
                    <div class="policy-info">
                      <h4>Privacy Policy</h4>
                      <p>How we collect, use, and protect your personal data</p>
                    </div>
                    <svg class="policy-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>

                  <a href="/return-policy" class="policy-link" target="_blank">
                    <div class="policy-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                      </svg>
                    </div>
                    <div class="policy-info">
                      <h4>Return & Exchange Policy</h4>
                      <p>Guidelines for returns, exchanges, and refunds</p>
                    </div>
                    <svg class="policy-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>

                  <a href="/shipping-policy" class="policy-link" target="_blank">
                    <div class="policy-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                      </svg>
                    </div>
                    <div class="policy-info">
                      <h4>Shipping Policy</h4>
                      <p>Delivery options, timeframes, and shipping costs</p>
                    </div>
                    <svg class="policy-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>

              <button @click="savePrivacySettings" class="save-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Save Privacy Settings
              </button>
            </div>
          </div>

          <!-- Section 5: Account Deletion -->
          <div v-if="activeSection === 'account-deletion'" class="section">
            <div class="section-header">
              <h2>Account Deletion</h2>
              <p>Permanently delete your account and all associated data</p>
            </div>
            
            <div class="deletion-content">
              <div class="warning-card">
                <div class="warning-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                </div>
                <h3>Before You Delete Your Account</h3>
                <p>Account deletion is permanent and cannot be undone. Please consider the following:</p>
                <ul class="warning-list">
                  <li>All your personal data will be permanently deleted</li>
                  <li>Your order history will be removed</li>
                  <li>Saved addresses and payment methods will be deleted</li>
                  <li>Wishlist items will be lost</li>
                  <li>Any pending orders or returns will be cancelled</li>
                  <li>You won't be able to access your account or recover any data</li>
                </ul>
              </div>

              <div class="alternatives-card">
                <h3>Alternatives to Account Deletion</h3>
                <div class="alternative-options">
                  <div class="alternative-option" @click="deactivateAccount">
                    <div class="option-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18 21l-5.197-5.197m0 0L5.636 5.636M18.364 18.364L12 12"/>
                      </svg>
                    </div>
                    <div class="option-info">
                      <h4>Deactivate Account</h4>
                      <p>Temporarily disable your account without losing data</p>
                    </div>
                  </div>

                  <div class="alternative-option" @click="updatePrivacy">
                    <div class="option-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </div>
                    <div class="option-info">
                      <h4>Update Privacy Settings</h4>
                      <p>Control what data we collect and how it's used</p>
                    </div>
                  </div>

                  <div class="alternative-option" @click="unsubscribeEmails">
                    <div class="option-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0L12 13 4 13"/>
                      </svg>
                    </div>
                    <div class="option-info">
                      <h4>Unsubscribe from Emails</h4>
                      <p>Stop receiving marketing emails while keeping your account</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="deletion-form-card">
                <h3>Delete Account</h3>
                <p>If you're sure you want to proceed, please confirm your decision:</p>
                
                <form @submit.prevent="initiateAccountDeletion" class="deletion-form">
                  <div class="form-group">
                    <label>Please tell us why you're leaving (optional)</label>
                    <select v-model="deletionReason">
                      <option value="">Select a reason</option>
                      <option value="privacy-concerns">Privacy concerns</option>
                      <option value="not-using">Not using the service</option>
                      <option value="found-alternative">Found an alternative</option>
                      <option value="too-expensive">Too expensive</option>
                      <option value="poor-experience">Poor user experience</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div class="form-group" v-if="deletionReason === 'other'">
                    <label>Please specify</label>
                    <textarea v-model="deletionReasonOther" placeholder="Tell us more about your reason..." rows="3"></textarea>
                  </div>

                  <div class="confirmation-checkbox">
                    <input type="checkbox" v-model="confirmDeletion" id="confirmDeletion" required>
                    <label for="confirmDeletion">
                      I understand that this action is permanent and cannot be undone. I want to delete my account and all associated data.
                    </label>
                  </div>

                  <button type="submit" class="delete-btn" :disabled="!confirmDeletion">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Delete My Account
                  </button>
                </form>
              </div>
            </div>
          </div>

          <!-- Section 6: Refund History -->
          <div v-if="activeSection === 'refund-history'" class="section">
            <div class="section-header">
              <h2>Refund History</h2>
              <p>Track your refunds and reimbursements</p>
            </div>
            
            <div class="refund-content">
              <div class="refund-summary">
                <div class="summary-card">
                  <h3>Total Refunds</h3>
                  <p class="summary-amount">${{ totalRefunds.toFixed(2) }}</p>
                  <span class="summary-period">All time</span>
                </div>
                <div class="summary-card">
                  <h3>Pending Refunds</h3>
                  <p class="summary-amount">${{ pendingRefunds.toFixed(2) }}</p>
                  <span class="summary-period">Processing</span>
                </div>
                <div class="summary-card">
                  <h3>This Year</h3>
                  <p class="summary-amount">${{ yearlyRefunds.toFixed(2) }}</p>
                  <span class="summary-period">{{ new Date().getFullYear() }}</span>
                </div>
              </div>

              <div class="refund-filters">
                <select v-model="refundFilter">
                  <option value="all">All Refunds</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                <select v-model="refundYear">
                  <option value="all">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>

              <div class="refund-list">
                <div v-if="filteredRefunds.length === 0" class="no-refunds">
                  <div class="no-refunds-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0L12 13 4 13"/>
                    </svg>
                  </div>
                  <h3>No Refunds Found</h3>
                  <p>You don't have any refunds matching the selected criteria.</p>
                </div>

                <div v-else>
                  <div v-for="refund in filteredRefunds" :key="refund.id" class="refund-item">
                    <div class="refund-info">
                      <div class="refund-details">
                        <h4>Refund #{{ refund.id }}</h4>
                        <p class="refund-description">{{ refund.description }}</p>
                        <span class="refund-date">{{ formatDate(refund.date) }}</span>
                      </div>
                      <div class="refund-order">
                        <span class="order-link">Order #{{ refund.orderId }}</span>
                        <span class="refund-method">{{ refund.method }}</span>
                      </div>
                    </div>
                    <div class="refund-status-amount">
                      <span class="refund-amount">${{ refund.amount.toFixed(2) }}</span>
                      <span class="refund-status" :class="refund.status">{{ refund.status }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 7: Delivery Management -->
          <div v-if="activeSection === 'delivery-management'" class="section">
            <div class="section-header">
              <h2>Delivery Management</h2>
              <p>Manage your delivery preferences and saved addresses</p>
            </div>
            
            <div class="delivery-content">
              <div class="delivery-preferences">
                <h3>Delivery Preferences</h3>
                <div class="preference-card">
                  <div class="preference-item">
                    <div class="preference-info">
                      <h4>Default Delivery Speed</h4>
                      <p>Choose your preferred delivery option</p>
                    </div>
                    <select v-model="deliveryPreferences.defaultSpeed">
                      <option value="standard">Standard (5-7 days) - Free</option>
                      <option value="express">Express (2-3 days) - $9.99</option>
                      <option value="overnight">Overnight (1 day) - $19.99</option>
                    </select>
                  </div>

                  <div class="preference-item">
                    <div class="preference-info">
                      <h4>Delivery Instructions</h4>
                      <p>Special instructions for delivery drivers</p>
                    </div>
                    <textarea v-model="deliveryPreferences.instructions" placeholder="Leave at front door, ring doorbell, etc." rows="2"></textarea>
                  </div>

                  <div class="preference-item">
                    <div class="preference-info">
                      <h4>Delivery Notifications</h4>
                      <p>Get updates about your deliveries</p>
                    </div>
                    <div class="notification-options">
                      <div class="notification-option">
                        <input type="checkbox" v-model="deliveryPreferences.smsNotifications" id="smsNotifications">
                        <label for="smsNotifications">SMS notifications</label>
                      </div>
                      <div class="notification-option">
                        <input type="checkbox" v-model="deliveryPreferences.emailNotifications" id="emailNotifications">
                        <label for="emailNotifications">Email notifications</label>
                      </div>
                      <div class="notification-option">
                        <input type="checkbox" v-model="deliveryPreferences.pushNotifications" id="pushNotifications">
                        <label for="pushNotifications">Push notifications</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="saved-addresses">
                <div class="addresses-header">
                  <h3>Saved Addresses</h3>
                  <button @click="addNewAddress" class="add-address-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    Add New Address
                  </button>
                </div>

                <div class="addresses-grid">
                  <div v-for="address in deliveryAddresses" :key="address.id" class="address-card">
                    <div class="address-header">
                      <h4>{{ address.label }}</h4>
                      <div class="address-badges">
                        <span v-if="address.isDefault" class="default-badge">Default</span>
                        <span v-if="address.type === 'home'" class="type-badge home">Home</span>
                        <span v-else-if="address.type === 'work'" class="type-badge work">Work</span>
                        <span v-else class="type-badge other">Other</span>
                      </div>
                    </div>
                    
                    <div class="address-details">
                      <p class="address-name">{{ address.name }}</p>
                      <p class="address-line">{{ address.street }}</p>
                      <p class="address-line">{{ address.city }}, {{ address.state }} {{ address.zip }}</p>
                      <p class="address-line">{{ address.country }}</p>
                      <p class="address-phone">{{ address.phone }}</p>
                    </div>

                    <div class="address-actions">
                      <button @click="editAddress(address)" class="edit-address-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Edit
                      </button>
                      <button @click="setDefaultAddress(address.id)" v-if="!address.isDefault" class="default-btn">
                        Set as Default
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

              <button @click="saveDeliverySettings" class="save-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Save Delivery Settings
              </button>
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
      activeSection: 'update-profile',
      profileForm: {
        name: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        location: '',
        bio: ''
      },
      settings: {
        language: 'en',
        country: 'US',
        currency: 'USD',
        timezone: 'America/New_York',
        dateFormat: 'MM/DD/YYYY',
        numberFormat: '1,234.56'
      },
      privacySettings: {
        dataCollection: true,
        marketing: false,
        analytics: true,
        personalization: true
      },
      deletionReason: '',
      deletionReasonOther: '',
      confirmDeletion: false,
      refundFilter: 'all',
      refundYear: 'all',
      deliveryPreferences: {
        defaultSpeed: 'standard',
        instructions: '',
        smsNotifications: true,
        emailNotifications: true,
        pushNotifications: false
      },
      supportTickets: [
        {
          id: 1001,
          subject: 'Order delivery issue',
          description: 'Package was not delivered to the correct address',
          date: new Date('2024-01-15'),
          status: 'open'
        },
        {
          id: 1002,
          subject: 'Product defect report',
          description: 'Received damaged shoes',
          date: new Date('2024-01-10'),
          status: 'resolved'
        }
      ],
      refunds: [
        {
          id: 'REF001',
          orderId: '12345',
          description: 'Defective product return',
          amount: 89.99,
          date: new Date('2024-01-20'),
          status: 'completed',
          method: 'Credit Card'
        },
        {
          id: 'REF002',
          orderId: '12346',
          description: 'Size exchange refund',
          amount: 45.50,
          date: new Date('2024-01-15'),
          status: 'pending',
          method: 'PayPal'
        },
        {
          id: 'REF003',
          orderId: '12347',
          description: 'Cancelled order refund',
          amount: 129.99,
          date: new Date('2023-12-28'),
          status: 'completed',
          method: 'Credit Card'
        }
      ],
      deliveryAddresses: [
        {
          id: 1,
          label: 'Home',
          name: 'John Doe',
          street: '123 Main Street, Apt 4B',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'United States',
          phone: '+1 (555) 123-4567',
          type: 'home',
          isDefault: true
        },
        {
          id: 2,
          label: 'Work',
          name: 'John Doe',
          street: '456 Business Ave, Suite 200',
          city: 'New York',
          state: 'NY',
          zip: '10002',
          country: 'United States',
          phone: '+1 (555) 987-6543',
          type: 'work',
          isDefault: false
        }
      ],
      profileSections: [
        {
          id: 'update-profile',
          name: 'Update Profile',
          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'
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
    ...mapGetters('user', ['currentUser']),
    
    filteredRefunds() {
      let filtered = this.refunds
      
      if (this.refundFilter !== 'all') {
        filtered = filtered.filter(refund => refund.status === this.refundFilter)
      }
      
      if (this.refundYear !== 'all') {
        filtered = filtered.filter(refund => refund.date.getFullYear().toString() === this.refundYear)
      }
      
      return filtered.sort((a, b) => b.date - a.date)
    },
    
    totalRefunds() {
      return this.refunds.filter(r => r.status === 'completed').reduce((sum, refund) => sum + refund.amount, 0)
    },
    
    pendingRefunds() {
      return this.refunds.filter(r => r.status === 'pending').reduce((sum, refund) => sum + refund.amount, 0)
    },
    
    yearlyRefunds() {
      const currentYear = new Date().getFullYear()
      return this.refunds
        .filter(r => r.date.getFullYear() === currentYear && r.status === 'completed')
        .reduce((sum, refund) => sum + refund.amount, 0)
    }
  },
  methods: {
    ...mapActions('user', ['updateUserProfile']),
    
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    
    updateProfile() {
      this.updateUserProfile(this.profileForm)
      this.$toast?.success('Profile updated successfully!')
    },
    
    changeAvatar() {
      console.log('Change avatar clicked')
      // Implementation for avatar change
    },
    
    saveLanguageSettings() {
      localStorage.setItem('userSettings', JSON.stringify(this.settings))
      this.$toast?.success('Language & region settings saved!')
    },
    
    savePrivacySettings() {
      localStorage.setItem('privacySettings', JSON.stringify(this.privacySettings))
      this.$toast?.success('Privacy settings updated!')
    },
    
    saveDeliverySettings() {
      localStorage.setItem('deliveryPreferences', JSON.stringify(this.deliveryPreferences))
      this.$toast?.success('Delivery settings saved!')
    },
    
    initiateAccountDeletion() {
      if (!this.confirmDeletion) return
      
      // Implementation for account deletion
      console.log('Initiating account deletion with reason:', this.deletionReason)
      this.$toast?.warning('Account deletion request submitted. You will receive a confirmation email.')
    },
    
    deactivateAccount() {
      this.$toast?.info('Account deactivation feature coming soon!')
    },
    
    updatePrivacy() {
      this.activeSection = 'privacy-terms'
    },
    
    unsubscribeEmails() {
      this.privacySettings.marketing = false
      this.savePrivacySettings()
    },
    
    // Support methods
    startLiveChat() {
      console.log('Starting live chat')
      this.$toast?.info('Live chat will open in a new window')
    },
    
    createTicket() {
      console.log('Creating support ticket')
      this.$toast?.info('Support ticket form will open')
    },
    
    callSupport() {
      console.log('Calling support')
      this.$toast?.info('Redirecting to phone support')
    },
    
    openFAQ() {
      window.open('/faq', '_blank')
    },
    
    // Address management
    addNewAddress() {
      console.log('Adding new address')
      this.$toast?.info('Add address form will open')
    },
    
    editAddress(address) {
      console.log('Editing address:', address)
      this.$toast?.info('Edit address form will open')
    },
    
    setDefaultAddress(addressId) {
      this.deliveryAddresses.forEach(addr => {
        addr.isDefault = addr.id === addressId
      })
      this.$toast?.success('Default address updated!')
    },
    
    deleteAddress(addressId) {
      this.deliveryAddresses = this.deliveryAddresses.filter(addr => addr.id !== addressId)
      this.$toast?.success('Address deleted successfully!')
    }
  },
  
  mounted() {
    // Initialize forms with current user data
    this.profileForm = {
      name: this.currentUser.name || '',
      email: this.currentUser.email || '',
      phone: this.currentUser.phone || '',
      dob: this.currentUser.dob || '',
      gender: this.currentUser.gender || '',
      location: this.currentUser.location || '',
      bio: this.currentUser.bio || ''
    }
    
    // Load saved settings
    const savedSettings = localStorage.getItem('userSettings')
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) }
    }
    
    const savedPrivacySettings = localStorage.getItem('privacySettings')
    if (savedPrivacySettings) {
      this.privacySettings = { ...this.privacySettings, ...JSON.parse(savedPrivacySettings) }
    }
    
    const savedDeliveryPreferences = localStorage.getItem('deliveryPreferences')
    if (savedDeliveryPreferences) {
      this.deliveryPreferences = { ...this.deliveryPreferences, ...JSON.parse(savedDeliveryPreferences) }
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

/* Update Profile Section */
.profile-update-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
}

.avatar-section {
  text-align: center;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.profile-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.edit-avatar-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #3b82f6;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.edit-avatar-btn:hover {
  background: #2563eb;
  transform: scale(1.1);
}

.edit-avatar-btn svg {
  width: 20px;
  height: 20px;
}

.avatar-section h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.user-email {
  color: #6b7280;
  font-size: 0.9rem;
}

.update-form-section {
  padding-left: 2rem;
  border-left: 1px solid #e5e7eb;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
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
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
  background: white;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-group textarea {
  resize: vertical;
  font-family: inherit;
}

/* Customer Support Section */
.support-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.support-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.support-card {
  background: #f8fafc;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.support-card:hover {
  border-color: #3b82f6;
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
}

.support-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.support-icon svg {
  width: 30px;
  height: 30px;
}

.support-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.support-card p {
  color: #6b7280;
  margin-bottom: 1rem;
}

.support-status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #10b981;
  color: white;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.support-status.online {
  background: #10b981;
}

.support-phone {
  font-weight: 600;
  color: #3b82f6;
}

.support-link {
  color: #3b82f6;
  font-weight: 500;
}

.recent-tickets h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.tickets-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ticket-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8fafc;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
}

.ticket-info h4 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.ticket-info p {
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.ticket-date {
  font-size: 0.85rem;
  color: #9ca3af;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.open {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.resolved {
  background: #d1fae5;
  color: #065f46;
}

/* Language & Region Section */
.language-region-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-card {
  background: #f8fafc;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 2rem;
}

.settings-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.setting-item:last-child {
  margin-bottom: 0;
}

.setting-item label {
  font-weight: 500;
  color: #374151;
  flex: 1;
}

.setting-item select {
  width: 200px;
  padding: 0.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
}

/* Privacy & Terms Section */
.privacy-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.privacy-settings h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.privacy-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8fafc;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.privacy-info h4 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.privacy-info p {
  color: #6b7280;
  font-size: 0.9rem;
}

.privacy-toggle {
  position: relative;
}

.privacy-toggle input[type="checkbox"] {
  display: none;
}

.toggle-label {
  width: 50px;
  height: 24px;
  background: #e5e7eb;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease;
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
}

.privacy-toggle input[type="checkbox"]:checked + .toggle-label {
  background: #3b82f6;
}

.privacy-toggle input[type="checkbox"]:checked + .toggle-label::after {
  transform: translateX(26px);
}

.policy-links h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.policy-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.policy-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.policy-link:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.policy-icon {
  width: 40px;
  height: 40px;
  background: #3b82f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.policy-icon svg {
  width: 20px;
  height: 20px;
}

.policy-info {
  flex: 1;
}

.policy-info h4 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.policy-info p {
  color: #6b7280;
  font-size: 0.9rem;
}

.policy-arrow {
  width: 20px;
  height: 20px;
  color: #6b7280;
  flex-shrink: 0;
}

/* Account Deletion Section */
.deletion-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.warning-card {
  background: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: 16px;
  padding: 2rem;
}

.warning-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  background: #ef4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.warning-icon svg {
  width: 30px;
  height: 30px;
}

.warning-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #991b1b;
  margin-bottom: 1rem;
  text-align: center;
}

.warning-card p {
  color: #7f1d1d;
  margin-bottom: 1rem;
  text-align: center;
}

.warning-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.warning-list li {
  color: #7f1d1d;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.warning-list li::before {
  content: '•';
  color: #ef4444;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.alternatives-card {
  background: #f0f9ff;
  border: 2px solid #bae6fd;
  border-radius: 16px;
  padding: 2rem;
}

.alternatives-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #0c4a6e;
  margin-bottom: 1.5rem;
}

.alternative-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.alternative-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: 2px solid #e0f2fe;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.alternative-option:hover {
  border-color: #0ea5e9;
  transform: translateY(-2px);
}

.option-icon {
  width: 40px;
  height: 40px;
  background: #0ea5e9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.option-icon svg {
  width: 20px;
  height: 20px;
}

.option-info h4 {
  font-weight: 600;
  color: #0c4a6e;
  margin-bottom: 0.25rem;
}

.option-info p {
  color: #0369a1;
  font-size: 0.9rem;
}

.deletion-form-card {
  background: #f8fafc;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 2rem;
}

.deletion-form-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.deletion-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.confirmation-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1rem;
}

.confirmation-checkbox input[type="checkbox"] {
  margin-top: 0.25rem;
}

.confirmation-checkbox label {
  font-size: 0.9rem;
  color: #374151;
  line-height: 1.5;
}

.delete-btn {
  background: #ef4444;
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
  justify-content: center;
}

.delete-btn:hover:not(:disabled) {
  background: #dc2626;
  transform: translateY(-2px);
}

.delete-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.delete-btn svg {
  width: 16px;
  height: 16px;
}

/* Refund History Section */
.refund-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.refund-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: #f8fafc;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
}

.summary-card h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.summary-amount {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.summary-period {
  font-size: 0.8rem;
  color: #9ca3af;
}

.refund-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.refund-filters select {
  padding: 0.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  font-size: 0.9rem;
}

.refund-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.no-refunds {
  text-align: center;
  padding: 3rem;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px dashed #d1d5db;
}

.no-refunds-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}

.no-refunds-icon svg {
  width: 40px;
  height: 40px;
}

.no-refunds h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.no-refunds p {
  color: #6b7280;
}

.refund-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8fafc;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.refund-item:hover {
  border-color: #3b82f6;
}

.refund-info {
  display: flex;
  gap: 2rem;
  flex: 1;
}

.refund-details h4 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.refund-description {
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.refund-date {
  font-size: 0.85rem;
  color: #9ca3af;
}

.refund-order {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.order-link {
  color: #3b82f6;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
}

.refund-method {
  font-size: 0.85rem;
  color: #6b7280;
}

.refund-status-amount {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.refund-amount {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
}

.refund-status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.refund-status.completed {
  background: #d1fae5;
  color: #065f46;
}

.refund-status.pending {
  background: #fef3c7;
  color: #92400e;
}

.refund-status.failed {
  background: #fee2e2;
  color: #991b1b;
}

/* Delivery Management Section */
.delivery-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.delivery-preferences h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.preference-card {
  background: #f8fafc;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 2rem;
}

.preference-item {
  margin-bottom: 2rem;
}

.preference-item:last-child {
  margin-bottom: 0;
}

.preference-info h4 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.preference-info p {
  color: #6b7280;
  margin-bottom: 1rem;
}

.preference-item select,
.preference-item textarea {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  font-size: 0.9rem;
}

.notification-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.notification-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.notification-option input[type="checkbox"] {
  width: auto;
}

.notification-option label {
  color: #374151;
  font-weight: 500;
}

.saved-addresses h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.addresses-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.add-address-btn {
  background: #3b82f6;
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

.add-address-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.add-address-btn svg {
  width: 16px;
  height: 16px;
}

.addresses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.address-card {
  background: #f8fafc;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.address-card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.address-header h4 {
  font-weight: 600;
  color: #1f2937;
}

.address-badges {
  display: flex;
  gap: 0.5rem;
}

.default-badge {
  background: #10b981;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.type-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.type-badge.home {
  background: #dbeafe;
  color: #1d4ed8;
}

.type-badge.work {
  background: #fef3c7;
  color: #92400e;
}

.type-badge.other {
  background: #f3e8ff;
  color: #7c3aed;
}

.address-details {
  margin-bottom: 1.5rem;
}

.address-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.address-line {
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.address-phone {
  color: #6b7280;
  font-size: 0.9rem;
}

.address-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.edit-address-btn,
.delete-address-btn,
.default-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.edit-address-btn {
  background: #3b82f6;
  color: white;
}

.edit-address-btn:hover {
  background: #2563eb;
}

.default-btn {
  background: #10b981;
  color: white;
}

.default-btn:hover {
  background: #059669;
}

.delete-address-btn {
  background: #ef4444;
  color: white;
}

.delete-address-btn:hover {
  background: #dc2626;
}

.edit-address-btn svg,
.delete-address-btn svg {
  width: 14px;
  height: 14px;
}

/* Common Styles */
.save-btn {
  background: #3b82f6;
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
  justify-content: center;
  margin-top: 2rem;
}

.save-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.save-btn svg {
  width: 16px;
  height: 16px;
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
  .profile-update-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .update-form-section {
    padding-left: 0;
    border-left: none;
    border-top: 1px solid #e5e7eb;
    padding-top: 2rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .support-options {
    grid-template-columns: 1fr;
  }
  
  .refund-summary {
    grid-template-columns: 1fr;
  }
  
  .addresses-grid {
    grid-template-columns: 1fr;
  }
  
  .refund-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .refund-status-amount {
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
}

@media (max-width: 640px) {
  .container {
    padding: 0 1rem;
  }
  
  .profile-page {
    padding: 1rem 0;
  }
  
  .profile-main {
    padding: 1.5rem;
  }
  
  .address-actions {
    flex-direction: column;
  }
  
  .alternative-options {
    grid-template-columns: 1fr;
  }
}
</style>
