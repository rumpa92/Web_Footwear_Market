<template>
  <div class="privacy-policy-page">
    <BackButton />
    <div class="container">
      <!-- Privacy Header -->
      <div class="privacy-header">
        <div class="header-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
        </div>
        <h1 class="page-title">Privacy & Terms</h1>
      </div>

      <!-- Data & Privacy Controls Section -->
      <div class="privacy-section">
        <h2 class="section-title">Data & Privacy Controls</h2>
        
        <div class="privacy-controls-list">
          <div class="privacy-control-item">
            <div class="control-content">
              <h3 class="control-title">Personalization</h3>
              <p class="control-description">Allow us to personalize your experience based on your activity</p>
            </div>
            <div class="control-toggle">
              <label class="toggle-switch">
                <input type="checkbox" v-model="settings.personalization" @change="saveSettings">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div class="privacy-control-item">
            <div class="control-content">
              <h3 class="control-title">Analytics</h3>
              <p class="control-description">Help us improve our service by sharing anonymous usage data</p>
            </div>
            <div class="control-toggle">
              <label class="toggle-switch">
                <input type="checkbox" v-model="settings.analytics" @change="saveSettings">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div class="privacy-control-item">
            <div class="control-content">
              <h3 class="control-title">Marketing Communications</h3>
              <p class="control-description">Receive personalized marketing emails and recommendations</p>
            </div>
            <div class="control-toggle">
              <label class="toggle-switch">
                <input type="checkbox" v-model="settings.marketing" @change="saveSettings">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Legal Information Section -->
      <div class="privacy-section">
        <h2 class="section-title">Legal Information</h2>
        
        <div class="legal-documents-grid">
          <div class="document-card" @click="openPrivacyPolicy">
            <div class="document-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
            </div>
            <div class="document-content">
              <h3 class="document-title">Privacy Policy</h3>
            </div>
            <div class="document-action">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </div>
          </div>

          <div class="document-card" @click="openTermsOfService">
            <div class="document-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
              </svg>
            </div>
            <div class="document-content">
              <h3 class="document-title">Terms of Service</h3>
            </div>
            <div class="document-action">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </div>
          </div>

          <div class="document-card" @click="openCookiePolicy">
            <div class="document-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div class="document-content">
              <h3 class="document-title">Cookie Policy</h3>
            </div>
            <div class="document-action">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </div>
          </div>

          <div class="document-card" @click="downloadMyData">
            <div class="document-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
              </svg>
            </div>
            <div class="document-content">
              <h3 class="document-title">Download My Data</h3>
            </div>
            <div class="document-action">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      settings: {
        personalization: true,
        analytics: true,
        marketing: false
      }
    }
  },
  methods: {
    saveSettings() {
      // Save settings to localStorage or API
      localStorage.setItem('privacySettings', JSON.stringify(this.settings));
      this.$toast?.success('Privacy preferences updated');
    },
    openPrivacyPolicy() {
      // Open privacy policy document
      window.open('/documents/privacy-policy.pdf', '_blank');
    },
    openTermsOfService() {
      // Open terms of service document
      window.open('/documents/terms-of-service.pdf', '_blank');
    },
    openCookiePolicy() {
      // Open cookie policy document
      window.open('/documents/cookie-policy.pdf', '_blank');
    },
    downloadMyData() {
      // Trigger data download
      this.$toast?.info('Your data export request has been submitted. You will receive an email when ready.');
    }
  },
  mounted() {
    // Load saved settings
    const savedSettings = localStorage.getItem('privacySettings');
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
    }
  }
}
</script>

<style scoped>
.privacy-policy-page {
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.privacy-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.header-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.privacy-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 1.5rem 0;
}

.privacy-controls-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.privacy-control-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.privacy-control-item:last-child {
  border-bottom: none;
}

.control-content {
  flex: 1;
}

.control-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.25rem 0;
}

.control-description {
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
  line-height: 1.4;
}

.control-toggle {
  margin-left: 1rem;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e0;
  transition: 0.3s;
  border-radius: 1.5rem;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 1.125rem;
  width: 1.125rem;
  left: 0.1875rem;
  bottom: 0.1875rem;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

input:checked + .toggle-slider {
  background-color: #48bb78;
}

input:checked + .toggle-slider:before {
  transform: translateX(1.5rem);
}

.legal-documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.document-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f7fafc;
  cursor: pointer;
  transition: all 0.2s ease;
}

.document-card:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  transform: translateY(-1px);
}

.document-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: #667eea;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.document-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.document-content {
  flex: 1;
}

.document-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.document-action {
  color: #718096;
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.document-action svg {
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .container {
    padding: 0 0.75rem;
  }
  
  .privacy-header {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .privacy-section {
    padding: 1rem;
  }
  
  .privacy-control-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .control-toggle {
    margin-left: 0;
    align-self: flex-end;
  }
  
  .legal-documents-grid {
    grid-template-columns: 1fr;
  }
}
</style>
