<template>
  <div class="ticket-page">
    <div class="container">
      <!-- Back Button -->
      <div class="ticket-header">
        <button @click="goBack" class="back-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m7-7l-7 7 7 7"/>
          </svg>
          Back to Support
        </button>
      </div>

      <!-- Progress Steps -->
      <div class="progress-container">
        <div class="progress-steps">
          <div class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
            <div class="step-number">1</div>
            <div class="step-label">Issue Details</div>
          </div>
          <div class="step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
            <div class="step-number">2</div>
            <div class="step-label">Attachments</div>
          </div>
          <div class="step" :class="{ active: currentStep >= 3, completed: currentStep > 3 }">
            <div class="step-number">3</div>
            <div class="step-label">Submit</div>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
      </div>

      <!-- Step 1: Issue Details -->
      <div v-if="currentStep === 1" class="step-content">
        <div class="step-title">
          <h2>Tell us about your issue</h2>
        </div>

        <form @submit.prevent="nextStep" class="ticket-form">
          <div class="form-group">
            <label for="issueType">Issue Type</label>
            <select 
              id="issueType" 
              v-model="ticket.issueType" 
              required
              class="form-select"
            >
              <option value="">Select an issue type</option>
              <option value="order-issue">Order Issue</option>
              <option value="product-defect">Product Defect</option>
              <option value="shipping-problem">Shipping Problem</option>
              <option value="payment-issue">Payment Issue</option>
              <option value="account-problem">Account Problem</option>
              <option value="return-exchange">Return & Exchange</option>
              <option value="general-inquiry">General Inquiry</option>
              <option value="technical-support">Technical Support</option>
            </select>
          </div>

          <div class="form-group">
            <label for="subject">Subject</label>
            <input 
              type="text" 
              id="subject" 
              v-model="ticket.subject" 
              placeholder="Brief description of your issue"
              required
              maxlength="100"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea 
              id="description" 
              v-model="ticket.description" 
              placeholder="Please provide detailed information about your issue..."
              required
              rows="6"
              maxlength="1000"
              class="form-textarea"
            ></textarea>
            <div class="character-count">{{ ticket.description.length }}/1000</div>
          </div>

          <div class="form-group">
            <label class="priority-label">Priority</label>
            <div class="priority-options">
              <div 
                v-for="priority in priorityOptions" 
                :key="priority.value"
                @click="ticket.priority = priority.value"
                class="priority-option"
                :class="{ 
                  selected: ticket.priority === priority.value,
                  [priority.value]: true 
                }"
              >
                <div class="priority-header">
                  <div class="priority-name">{{ priority.name }}</div>
                  <div class="radio-indicator">
                    <div v-if="ticket.priority === priority.value" class="radio-selected"></div>
                  </div>
                </div>
                <div class="priority-description">{{ priority.description }}</div>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="next-button" :disabled="!isStep1Valid">
              Next: Add Attachments
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </form>
      </div>

      <!-- Step 2: Attachments -->
      <div v-if="currentStep === 2" class="step-content">
        <div class="step-title">
          <h2>Add Attachments (Optional)</h2>
          <p>You can upload screenshots, photos, or documents to help us better understand your issue.</p>
        </div>

        <div class="attachments-section">
          <div class="upload-area" @click="triggerFileInput">
            <input 
              ref="fileInput" 
              type="file" 
              multiple 
              accept="image/*,.pdf,.doc,.docx,.txt"
              @change="handleFileUpload"
              style="display: none"
            />
            <div class="upload-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </div>
            <div class="upload-text">
              <h3>Click to upload files</h3>
              <p>or drag and drop files here</p>
              <small>Supported formats: Images, PDF, Word documents (Max 10MB each)</small>
            </div>
          </div>

          <div v-if="ticket.attachments.length > 0" class="attached-files">
            <h4>Attached Files ({{ ticket.attachments.length }})</h4>
            <div class="files-list">
              <div v-for="(file, index) in ticket.attachments" :key="index" class="file-item">
                <div class="file-icon">
                  <svg v-if="file.type.startsWith('image/')" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                </div>
                <div class="file-info">
                  <div class="file-name">{{ file.name }}</div>
                  <div class="file-size">{{ formatFileSize(file.size) }}</div>
                </div>
                <button @click="removeFile(index)" class="remove-file-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button @click="previousStep" class="back-button-step">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
          <button @click="nextStep" class="next-button">
            Next: Submit
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Step 3: Submit -->
      <div v-if="currentStep === 3" class="step-content">
        <div class="step-title">
          <h2>Review and Submit</h2>
          <p>Please review your ticket details before submitting.</p>
        </div>

        <div class="review-section">
          <div class="review-card">
            <h3>Issue Details</h3>
            <div class="review-item">
              <span class="review-label">Issue Type:</span>
              <span class="review-value">{{ formatIssueType(ticket.issueType) }}</span>
            </div>
            <div class="review-item">
              <span class="review-label">Subject:</span>
              <span class="review-value">{{ ticket.subject }}</span>
            </div>
            <div class="review-item">
              <span class="review-label">Priority:</span>
              <span class="review-value priority" :class="ticket.priority">{{ formatPriority(ticket.priority) }}</span>
            </div>
            <div class="review-item description">
              <span class="review-label">Description:</span>
              <div class="review-description">{{ ticket.description }}</div>
            </div>
          </div>

          <div v-if="ticket.attachments.length > 0" class="review-card">
            <h3>Attachments ({{ ticket.attachments.length }})</h3>
            <div class="review-attachments">
              <div v-for="(file, index) in ticket.attachments" :key="index" class="review-file">
                <div class="file-icon-small">
                  <svg v-if="file.type.startsWith('image/')" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                </div>
                <span class="review-file-name">{{ file.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button @click="previousStep" class="back-button-step">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
          <button @click="submitTicket" class="submit-button" :disabled="isSubmitting">
            <svg v-if="!isSubmitting" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
            <svg v-else class="loading-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            {{ isSubmitting ? 'Submitting...' : 'Submit Ticket' }}
          </button>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="showSuccess" class="success-overlay">
        <div class="success-modal">
          <div class="success-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h2>Ticket Submitted Successfully!</h2>
          <p>Your ticket has been submitted with ID: <strong>#{{ generatedTicketId }}</strong></p>
          <p>We'll get back to you within {{ expectedResponseTime }} via email.</p>
          <div class="success-actions">
            <button @click="goToProfile" class="success-button primary">Back to Profile</button>
            <button @click="createAnotherTicket" class="success-button secondary">Create Another Ticket</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ticket',
  data() {
    return {
      currentStep: 1,
      isSubmitting: false,
      showSuccess: false,
      generatedTicketId: '',
      ticket: {
        issueType: '',
        subject: '',
        description: '',
        priority: 'medium',
        attachments: []
      },
      priorityOptions: [
        {
          value: 'low',
          name: 'Low',
          description: 'General questions, not urgent'
        },
        {
          value: 'medium',
          name: 'Medium',
          description: 'Standard issues, response within 24 hours'
        },
        {
          value: 'high',
          name: 'High',
          description: 'Urgent issues, response within 4 hours'
        }
      ]
    }
  },
  computed: {
    progressPercentage() {
      return ((this.currentStep - 1) / 2) * 100
    },
    isStep1Valid() {
      return this.ticket.issueType && 
             this.ticket.subject.trim() && 
             this.ticket.description.trim() && 
             this.ticket.priority
    },
    expectedResponseTime() {
      switch (this.ticket.priority) {
        case 'high': return '4 hours'
        case 'medium': return '24 hours'
        case 'low': return '48 hours'
        default: return '24 hours'
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push('/profile')
    },
    nextStep() {
      if (this.currentStep < 3) {
        this.currentStep++
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileUpload(event) {
      const files = Array.from(event.target.files)
      const maxSize = 10 * 1024 * 1024 // 10MB
      
      files.forEach(file => {
        if (file.size > maxSize) {
          this.$toast?.error(`File ${file.name} is too large. Maximum size is 10MB.`)
          return
        }
        
        if (this.ticket.attachments.length < 5) {
          this.ticket.attachments.push(file)
        } else {
          this.$toast?.error('Maximum 5 files allowed.')
        }
      })
      
      // Clear the input
      event.target.value = ''
    },
    removeFile(index) {
      this.ticket.attachments.splice(index, 1)
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },
    formatIssueType(type) {
      const types = {
        'order-issue': 'Order Issue',
        'product-defect': 'Product Defect',
        'shipping-problem': 'Shipping Problem',
        'payment-issue': 'Payment Issue',
        'account-problem': 'Account Problem',
        'return-exchange': 'Return & Exchange',
        'general-inquiry': 'General Inquiry',
        'technical-support': 'Technical Support'
      }
      return types[type] || type
    },
    formatPriority(priority) {
      const priorities = {
        'low': 'Low',
        'medium': 'Medium',
        'high': 'High'
      }
      return priorities[priority] || priority
    },
    async submitTicket() {
      this.isSubmitting = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Generate ticket ID
        this.generatedTicketId = 'TK' + Date.now().toString().substr(-6)
        
        // Show success
        this.showSuccess = true
        this.isSubmitting = false
        
        this.$toast?.success('Ticket submitted successfully!')
        
      } catch (error) {
        this.isSubmitting = false
        this.$toast?.error('Failed to submit ticket. Please try again.')
      }
    },
    goToProfile() {
      this.$router.push('/profile')
    },
    createAnotherTicket() {
      this.showSuccess = false
      this.currentStep = 1
      this.ticket = {
        issueType: '',
        subject: '',
        description: '',
        priority: 'medium',
        attachments: []
      }
    }
  }
}
</script>

<style scoped>
.ticket-page {
  min-height: 100vh;
  background: #f8fafc;
  padding: 20px 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.ticket-header {
  margin-bottom: 30px;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
}

.back-button:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #475569;
}

.back-button svg {
  width: 20px;
  height: 20px;
}

.progress-container {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  position: relative;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e2e8f0;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 8px;
  transition: all 0.3s;
  position: relative;
  z-index: 2;
}

.step.active .step-number {
  background: #ec4899;
  color: white;
}

.step.completed .step-number {
  background: #10b981;
  color: white;
}

.step-label {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.step.active .step-label {
  color: #ec4899;
}

.step.completed .step-label {
  color: #10b981;
}

.progress-bar {
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ec4899 0%, #be185d 100%);
  transition: width 0.3s ease;
}

.step-content {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.step-title {
  margin-bottom: 30px;
}

.step-title h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.step-title p {
  color: #64748b;
  margin: 0;
}

.ticket-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  font-size: 14px;
}

.form-select,
.form-input,
.form-textarea {
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: white;
}

.form-select:focus,
.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #ec4899;
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}

.character-count {
  text-align: right;
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
}

.priority-label {
  margin-bottom: 16px !important;
}

.priority-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.priority-option {
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.priority-option:hover {
  border-color: #d1d5db;
  background: #f9fafb;
}

.priority-option.selected {
  border-color: #ec4899;
  background: #fdf2f8;
}

.priority-option.selected.medium {
  border-color: #ec4899;
  background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
}

.priority-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.priority-name {
  font-weight: 600;
  color: #374151;
}

.radio-indicator {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;
}

.priority-option.selected .radio-indicator {
  border-color: #ec4899;
}

.radio-selected {
  width: 10px;
  height: 10px;
  background: #ec4899;
  border-radius: 50%;
}

.priority-description {
  font-size: 14px;
  color: #6b7280;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

.next-button,
.submit-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.next-button:hover,
.submit-button:hover {
  background: linear-gradient(135deg, #be185d 0%, #9d174d 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
}

.next-button:disabled,
.submit-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.next-button svg,
.submit-button svg {
  width: 20px;
  height: 20px;
}

.back-button-step {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #6b7280;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.back-button-step:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  color: #374151;
}

.back-button-step svg {
  width: 20px;
  height: 20px;
}

.attachments-section {
  margin-bottom: 30px;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: #f9fafb;
}

.upload-area:hover {
  border-color: #ec4899;
  background: #fdf2f8;
}

.upload-icon {
  margin-bottom: 16px;
}

.upload-icon svg {
  width: 48px;
  height: 48px;
  color: #9ca3af;
}

.upload-text h3 {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
}

.upload-text p {
  color: #6b7280;
  margin: 0 0 8px 0;
}

.upload-text small {
  color: #9ca3af;
  font-size: 12px;
}

.attached-files {
  margin-top: 24px;
}

.attached-files h4 {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 16px;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.file-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ec4899;
  border-radius: 8px;
  color: white;
}

.file-icon svg {
  width: 20px;
  height: 20px;
}

.file-info {
  flex: 1;
}

.file-name {
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
}

.file-size {
  font-size: 12px;
  color: #6b7280;
}

.remove-file-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.remove-file-btn:hover {
  background: #fecaca;
}

.remove-file-btn svg {
  width: 16px;
  height: 16px;
}

.review-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.review-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  background: #f9fafb;
}

.review-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 16px 0;
}

.review-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.review-item.description {
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
}

.review-label {
  font-weight: 600;
  color: #6b7280;
  min-width: 100px;
  font-size: 14px;
}

.review-value {
  color: #374151;
  flex: 1;
}

.review-value.priority {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
}

.review-value.priority.low {
  background: #dcfce7;
  color: #166534;
}

.review-value.priority.medium {
  background: #fef3c7;
  color: #92400e;
}

.review-value.priority.high {
  background: #fee2e2;
  color: #dc2626;
}

.review-description {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  color: #374151;
  line-height: 1.5;
}

.review-attachments {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.review-file {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.file-icon-small {
  width: 20px;
  height: 20px;
  color: #ec4899;
}

.file-icon-small svg {
  width: 100%;
  height: 100%;
}

.review-file-name {
  font-size: 14px;
  color: #374151;
}

.loading-spinner {
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

.success-overlay {
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
}

.success-modal {
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  max-width: 500px;
  margin: 20px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: #dcfce7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-icon svg {
  width: 40px;
  height: 40px;
  color: #10b981;
}

.success-modal h2 {
  font-size: 24px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 16px 0;
}

.success-modal p {
  color: #6b7280;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.success-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
}

.success-button {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.success-button.primary {
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
  color: white;
}

.success-button.primary:hover {
  background: linear-gradient(135deg, #be185d 0%, #9d174d 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
}

.success-button.secondary {
  background: white;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.success-button.secondary:hover {
  background: #f9fafb;
  color: #374151;
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .step-content {
    padding: 24px 20px;
  }
  
  .progress-container {
    padding: 20px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .next-button,
  .submit-button,
  .back-button-step {
    width: 100%;
    justify-content: center;
  }
  
  .success-actions {
    flex-direction: column;
  }
  
  .success-button {
    width: 100%;
    justify-content: center;
  }
  
  .progress-steps {
    margin-bottom: 16px;
  }
  
  .step-number {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  
  .step-label {
    font-size: 12px;
  }
}
</style>
