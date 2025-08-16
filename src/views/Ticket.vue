<template>
  <div class="ticket-page">
    <div class="container">
      <!-- Enhanced Header -->
      <div class="ticket-header">
        <div class="header-content">
          <div class="header-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <div class="header-text">
            <h1>Support Tickets</h1>
            <p>Create and track your support requests</p>
          </div>
        </div>
      </div>

      <!-- Ticket Navigation Bar -->
      <div class="ticket-nav-bar" v-if="!showSuccess">
        <div class="nav-section">
          <button
            @click="switchToCreateTicket"
            class="nav-option create-ticket"
            :class="{ active: isCreateTicketView }"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span>Create Ticket</span>
          </button>
        </div>
        <div class="nav-section">
          <button
            @click="switchToMyTickets"
            class="nav-option my-tickets"
            :class="{ active: isMyTicketsView }"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8m4-12H9m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7v8a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2H9z"/>
            </svg>
            <span>My Tickets</span>
            <div v-if="userTickets.length > 0" class="ticket-count">{{ userTickets.length }}</div>
          </button>
        </div>
      </div>

      <!-- Enhanced Progress Steps -->
      <div class="progress-container" v-if="isCreateTicketView">
        <div class="progress-steps">
          <div 
            v-for="(step, index) in steps" 
            :key="step.id"
            class="step" 
            :class="{ 
              active: currentStep >= index + 1, 
              completed: currentStep > index + 1,
              current: currentStep === index + 1
            }"
          >
            <div class="step-indicator">
              <div class="step-number" v-if="currentStep <= index + 1">{{ index + 1 }}</div>
              <svg v-else class="step-check" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            </div>
            <div class="step-content">
              <div class="step-title">{{ step.title }}</div>
              <div class="step-description">{{ step.description }}</div>
            </div>
          </div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
          </div>
        </div>
      </div>

      <!-- Step 1: Issue Details -->
      <div v-if="currentStep === 1 && isCreateTicketView" class="step-content-wrapper">
        <div class="content-card">
          <div class="card-header">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
              </svg>
            </div>
            <div class="card-title">
              <h2>Tell us about your issue</h2>
              <p>Please provide detailed information to help us assist you better</p>
            </div>
          </div>

          <form @submit.prevent="nextStep" class="ticket-form">
            <!-- Issue Type Selection -->
            <div class="form-section">
              <label class="form-label">
                <span class="label-text">Issue Type</span>
                <span class="label-required">*</span>
              </label>
              <div class="select-container">
                <select 
                  v-model="ticket.issueType" 
                  required
                  class="form-select"
                  :class="{ 'has-value': ticket.issueType }"
                >
                  <option value="">Select an issue type</option>
                  <option value="order-issue">🛍️ Order Issue</option>
                  <option value="product-defect">🔧 Product Defect</option>
                  <option value="shipping-problem">📦 Shipping Problem</option>
                  <option value="payment-issue">💳 Payment Issue</option>
                  <option value="account-problem">👤 Account Problem</option>
                  <option value="return-exchange">🔄 Return & Exchange</option>
                  <option value="general-inquiry">💬 General Inquiry</option>
                  <option value="technical-support">⚙️ Technical Support</option>
                </select>
                <div class="select-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Subject -->
            <div class="form-section">
              <label for="subject" class="form-label">
                <span class="label-text">Subject</span>
                <span class="label-required">*</span>
              </label>
              <div class="input-container">
                <input 
                  type="text" 
                  id="subject" 
                  v-model="ticket.subject" 
                  placeholder="Brief description of your issue"
                  required
                  maxlength="100"
                  class="form-input"
                  :class="{ 'has-value': ticket.subject }"
                />
                <div class="input-border"></div>
              </div>
            </div>

            <!-- Description -->
            <div class="form-section">
              <label for="description" class="form-label">
                <span class="label-text">Description</span>
                <span class="label-required">*</span>
              </label>
              <div class="textarea-container">
                <textarea 
                  id="description" 
                  v-model="ticket.description" 
                  placeholder="Please provide detailed information about your issue..."
                  required
                  rows="5"
                  maxlength="1000"
                  class="form-textarea"
                  :class="{ 'has-value': ticket.description }"
                ></textarea>
                <div class="character-count" :class="{ 'near-limit': ticket.description.length > 900 }">
                  {{ ticket.description.length }}/1000
                </div>
                <div class="input-border"></div>
              </div>
            </div>

            <!-- Enhanced Priority Selection -->
            <div class="form-section">
              <label class="form-label">
                <span class="label-text">Priority Level</span>
                <span class="label-required">*</span>
              </label>
              <div class="priority-grid">
                <div 
                  v-for="priority in priorityOptions" 
                  :key="priority.value"
                  @click="ticket.priority = priority.value"
                  class="priority-card"
                  :class="{ 
                    selected: ticket.priority === priority.value,
                    [priority.value]: true 
                  }"
                >
                  <div class="priority-icon" :class="priority.value">
                    <component :is="priority.icon" />
                  </div>
                  <div class="priority-content">
                    <div class="priority-name">{{ priority.name }}</div>
                    <div class="priority-description">{{ priority.description }}</div>
                    <div class="priority-response">{{ priority.responseTime }}</div>
                  </div>
                  <div class="priority-selector">
                    <div class="radio-button" :class="{ selected: ticket.priority === priority.value }">
                      <div v-if="ticket.priority === priority.value" class="radio-dot"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Help -->
            <div class="quick-help">
              <div class="help-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
              </div>
              <div class="help-content">
                <div class="help-title">Need help choosing priority?</div>
                <div class="help-text">Select based on urgency: High for urgent issues, Medium for standard problems, Low for general questions.</div>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="next-button" :disabled="!isStep1Valid">
                <span>Continue to Attachments</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Step 2: Enhanced Attachments -->
      <div v-if="currentStep === 2 && isCreateTicketView" class="step-content-wrapper">
        <div class="content-card">
          <div class="card-header">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM12 19l-4-4h3V9h2v6h3l-4 4z"/>
              </svg>
            </div>
            <div class="card-title">
              <h2>Add Supporting Files</h2>
              <p>Upload screenshots, documents, or images to help us understand your issue</p>
            </div>
          </div>

          <div class="attachments-section">
            <div 
              class="upload-zone" 
              :class="{ 'drag-over': isDragOver }"
              @click="triggerFileInput"
              @drop="handleDrop"
              @dragover.prevent="isDragOver = true"
              @dragleave="isDragOver = false"
            >
              <input 
                ref="fileInput" 
                type="file" 
                multiple 
                accept="image/*,.pdf,.doc,.docx,.txt"
                @change="handleFileUpload"
                style="display: none"
              />
              
              <div class="upload-content">
                <div class="upload-icon-container">
                  <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                </div>
                <div class="upload-text">
                  <h3>Drop files here or click to upload</h3>
                  <p>Support for images, PDF, Word documents</p>
                  <div class="upload-specs">
                    <span class="spec-item">📁 Max 5 files</span>
                    <span class="spec-item">📏 Up to 10MB each</span>
                    <span class="spec-item">🖼️ JPG, PNG, PDF, DOC</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- File List -->
            <div v-if="ticket.attachments.length > 0" class="files-section">
              <div class="files-header">
                <h4>Attached Files ({{ ticket.attachments.length }}/5)</h4>
                <button @click="clearAllFiles" class="clear-all-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  Clear All
                </button>
              </div>
              
              <div class="files-grid">
                <div v-for="(file, index) in ticket.attachments" :key="index" class="file-card">
                  <div class="file-preview">
                    <div class="file-icon" :class="getFileType(file)">
                      <component :is="getFileIcon(file)" />
                    </div>
                  </div>
                  <div class="file-details">
                    <div class="file-name" :title="file.name">{{ truncateFileName(file.name) }}</div>
                    <div class="file-meta">
                      <span class="file-size">{{ formatFileSize(file.size) }}</span>
                      <span class="file-type">{{ getFileExtension(file.name) }}</span>
                    </div>
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
              <span>Back</span>
            </button>
            <button @click="nextStep" class="next-button">
              <span>Review & Submit</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Step 3: Enhanced Review -->
      <div v-if="currentStep === 3 && isCreateTicketView" class="step-content-wrapper">
        <div class="content-card">
          <div class="card-header">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            </div>
            <div class="card-title">
              <h2>Review Your Ticket</h2>
              <p>Please verify all information before submitting your support request</p>
            </div>
          </div>

          <div class="review-sections">
            <!-- Issue Summary -->
            <div class="review-card">
              <div class="review-header">
                <div class="review-icon issue">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                  </svg>
                </div>
                <h3>Issue Details</h3>
                <button @click="currentStep = 1" class="edit-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Edit
                </button>
              </div>
              <div class="review-content">
                <div class="review-item">
                  <span class="item-label">Type:</span>
                  <span class="item-value type">{{ formatIssueType(ticket.issueType) }}</span>
                </div>
                <div class="review-item">
                  <span class="item-label">Subject:</span>
                  <span class="item-value">{{ ticket.subject }}</span>
                </div>
                <div class="review-item">
                  <span class="item-label">Priority:</span>
                  <span class="item-value priority" :class="ticket.priority">
                    {{ formatPriority(ticket.priority) }}
                  </span>
                </div>
                <div class="review-item description-item">
                  <span class="item-label">Description:</span>
                  <div class="item-description">{{ ticket.description }}</div>
                </div>
              </div>
            </div>

            <!-- Attachments Summary -->
            <div v-if="ticket.attachments.length > 0" class="review-card">
              <div class="review-header">
                <div class="review-icon attachments">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
                  </svg>
                </div>
                <h3>Attachments ({{ ticket.attachments.length }})</h3>
                <button @click="currentStep = 2" class="edit-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Edit
                </button>
              </div>
              <div class="review-content">
                <div class="attachments-preview">
                  <div v-for="(file, index) in ticket.attachments" :key="index" class="attachment-chip">
                    <div class="chip-icon" :class="getFileType(file)">
                      <component :is="getFileIcon(file)" />
                    </div>
                    <span class="chip-name">{{ truncateFileName(file.name, 20) }}</span>
                    <span class="chip-size">{{ formatFileSize(file.size) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Expected Response -->
            <div class="response-info">
              <div class="response-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div class="response-content">
                <h4>Expected Response Time</h4>
                <p>Based on your {{ formatPriority(ticket.priority).toLowerCase() }} priority selection, our support team will respond within <strong>{{ expectedResponseTime }}</strong>.</p>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button @click="previousStep" class="back-button-step">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              <span>Back</span>
            </button>
            <button @click="submitTicket" class="submit-button" :disabled="isSubmitting">
              <div v-if="!isSubmitting" class="submit-content">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
                <span>Submit Ticket</span>
              </div>
              <div v-else class="submit-loading">
                <div class="loading-spinner"></div>
                <span>Submitting...</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Enhanced Success Modal -->
      <div v-if="showSuccess" class="success-overlay">
        <div class="success-modal">
          <div class="success-animation">
            <div class="success-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div class="success-ring"></div>
          </div>
          <div class="success-content">
            <h2>Ticket Created Successfully!</h2>
            <div class="ticket-info">
              <div class="ticket-id">
                <span class="id-label">Ticket ID:</span>
                <span class="id-value">#{{ generatedTicketId }}</span>
              </div>
              <div class="response-time">
                <span class="time-icon">⏱️</span>
                <span>Expected response: {{ expectedResponseTime }}</span>
              </div>
            </div>
            <p class="success-message">
              We've received your support request and our team will review it shortly. 
              You'll receive email updates as we work on your ticket.
            </p>
          </div>
          <div class="success-actions">
            <button @click="goToProfile" class="success-button primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m7-7l-7 7 7 7"/>
              </svg>
              Back to Profile
            </button>
            <button @click="createAnotherTicket" class="success-button secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Create Another Ticket
            </button>
            <button @click="showMyTickets" class="success-button primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8m4-12H9m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7v8a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2H9z"/>
              </svg>
              View My Tickets
            </button>
          </div>
        </div>
      </div>

      <!-- My Tickets List -->
      <div v-if="showTicketList && !showTicketDetails" class="step-content-wrapper">
        <div class="content-card">
          <div class="card-header">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8m4-12H9m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7v8a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2H9z"/>
              </svg>
            </div>
            <div class="card-title">
              <h2>My Tickets</h2>
              <p>Track and manage your support requests</p>
            </div>
            <button @click="backToTicketList" class="create-new-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Create New Ticket
            </button>
          </div>

          <div v-if="userTickets.length === 0" class="no-tickets">
            <div class="no-tickets-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8m4-12H9m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7v8a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2H9z"/>
              </svg>
            </div>
            <h3>No tickets found</h3>
            <p>You haven't created any support tickets yet.</p>
            <button @click="backToTicketList" class="create-first-ticket-btn">
              Create Your First Ticket
            </button>
          </div>

          <div v-else class="tickets-list">
            <div v-for="ticket in userTickets" :key="ticket.id" class="ticket-card" @click="viewTicketDetails(ticket)">
              <div class="ticket-header">
                <div class="ticket-id-subject">
                  <h3 class="ticket-id">#{{ ticket.id }}</h3>
                  <p class="ticket-subject">{{ ticket.subject }}</p>
                </div>
                <div class="ticket-status" :class="getStatusClass(ticket.status)">
                  <span class="status-dot"></span>
                  <span class="status-text">{{ ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).replace('-', ' ') }}</span>
                </div>
              </div>

              <div class="ticket-meta">
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span>{{ formatDate(ticket.dateRaised) }}</span>
                </div>
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v11a2 2 0 002 2h6a2 2 0 002-2V7M9 7h6M9 11h6M9 15h6"/>
                  </svg>
                  <span>{{ formatIssueType(ticket.issueType) }}</span>
                </div>
                <div class="meta-item priority" :class="ticket.priority">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  <span>{{ ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1) }}</span>
                </div>
              </div>

              <div class="ticket-preview">
                <p>{{ ticket.description.substring(0, 120) }}{{ ticket.description.length > 120 ? '...' : '' }}</p>
              </div>

              <div class="ticket-footer">
                <div class="ticket-stats">
                  <span class="stat-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    {{ ticket.replies.length }} replies
                  </span>
                  <span v-if="ticket.attachments > 0" class="stat-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
                    </svg>
                    {{ ticket.attachments }} files
                  </span>
                </div>
                <div class="last-activity">
                  Last activity: {{ formatDate(ticket.lastReply) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ticket Details View -->
      <div v-if="showTicketDetails && selectedTicket" class="step-content-wrapper">
        <div class="content-card">
          <div class="card-header">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8m4-12H9m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7v8a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2H9z"/>
              </svg>
            </div>
            <div class="card-title">
              <h2>Ticket #{{ selectedTicket.id }}</h2>
              <p>{{ selectedTicket.subject }}</p>
            </div>
            <button @click="closeTicketDetails" class="back-to-list-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Back to Tickets
            </button>
          </div>

          <div class="ticket-details-content">
            <!-- Ticket Information -->
            <div class="ticket-info-section">
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Status:</span>
                  <span class="info-value status" :class="getStatusClass(selectedTicket.status)">
                    {{ selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1).replace('-', ' ') }}
                  </span>
                </div>
                <div class="info-item">
                  <span class="info-label">Priority:</span>
                  <span class="info-value priority" :class="selectedTicket.priority">
                    {{ selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1) }}
                  </span>
                </div>
                <div class="info-item">
                  <span class="info-label">Issue Type:</span>
                  <span class="info-value">{{ formatIssueType(selectedTicket.issueType) }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Date Raised:</span>
                  <span class="info-value">{{ formatDate(selectedTicket.dateRaised) }}</span>
                </div>
              </div>
            </div>

            <!-- Original Description -->
            <div class="original-message">
              <h4>Original Message</h4>
              <div class="message-content">
                <p>{{ selectedTicket.description }}</p>
              </div>
            </div>

            <!-- Conversation -->
            <div class="conversation-section">
              <h4>Conversation with Support</h4>
              <div v-if="selectedTicket.replies.length === 0" class="no-replies">
                <p>No replies yet. Our support team will respond soon.</p>
              </div>
              <div v-else class="replies-list">
                <div v-for="reply in selectedTicket.replies" :key="reply.id" class="reply-item" :class="reply.sender">
                  <div class="reply-avatar">
                    <svg v-if="reply.sender === 'support'" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                  </div>
                  <div class="reply-content">
                    <div class="reply-header">
                      <span class="reply-sender">{{ reply.sender === 'support' ? 'Support Team' : 'You' }}</span>
                      <span class="reply-time">{{ formatDate(reply.timestamp) }}</span>
                    </div>
                    <div class="reply-text">{{ reply.text }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Reply Section -->
            <div v-if="selectedTicket.status !== 'closed'" class="add-reply-section">
              <h4>Add Reply</h4>
              <div class="reply-form">
                <textarea
                  v-model="newReplyText"
                  placeholder="Type your message here..."
                  rows="4"
                  class="reply-textarea"
                ></textarea>
                <div class="reply-actions">
                  <button @click="addReply(selectedTicket.id)" class="add-reply-btn" :disabled="!newReplyText.trim()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    Send Reply
                  </button>
                </div>
              </div>
            </div>

            <!-- Ticket Actions -->
            <div class="ticket-actions-section">
              <div class="actions-grid">
                <button
                  v-if="selectedTicket.status !== 'closed'"
                  @click="closeTicket(selectedTicket.id)"
                  class="action-btn close-ticket"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Close Ticket
                </button>
                <button class="action-btn add-attachment">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
                  </svg>
                  Add Attachment
                </button>
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
  name: 'Ticket',
  data() {
    return {
      currentStep: 1,
      isSubmitting: false,
      showSuccess: false,
      showTicketList: false,
      showTicketDetails: false,
      generatedTicketId: '',
      isDragOver: false,
      selectedTicket: null,
      newReplyText: '',
      userTickets: [
        // Sample existing tickets for demonstration
        {
          id: 'TK001234',
          subject: 'Product not received',
          issueType: 'shipping-problem',
          priority: 'high',
          status: 'in-progress',
          dateRaised: '2024-01-15T10:30:00Z',
          lastReply: '2024-01-16T14:20:00Z',
          description: 'I ordered a pair of sneakers but haven\'t received them yet.',
          attachments: 2,
          replies: [
            {
              id: 1,
              text: 'Thank you for contacting us. We are looking into your shipping issue.',
              timestamp: '2024-01-15T12:00:00Z',
              sender: 'support'
            },
            {
              id: 2,
              text: 'We found your package and it will be delivered tomorrow.',
              timestamp: '2024-01-16T14:20:00Z',
              sender: 'support'
            }
          ]
        },
        {
          id: 'TK001235',
          subject: 'Refund Request - Order #5678',
          issueType: 'return-exchange',
          priority: 'medium',
          status: 'resolved',
          dateRaised: '2024-01-10T09:15:00Z',
          lastReply: '2024-01-12T16:45:00Z',
          description: 'I would like to return these shoes as they don\'t fit properly.',
          attachments: 1,
          replies: [
            {
              id: 1,
              text: 'We have processed your refund request. You should receive the refund in 3-5 business days.',
              timestamp: '2024-01-12T16:45:00Z',
              sender: 'support'
            }
          ]
        }
      ],
      steps: [
        {
          id: 1,
          title: 'Issue Details',
          description: 'Describe your problem'
        },
        {
          id: 2,
          title: 'Attachments',
          description: 'Add supporting files'
        },
        {
          id: 3,
          title: 'Submit',
          description: 'Review and submit'
        }
      ],
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
          name: 'Low Priority',
          description: 'General questions, not urgent',
          responseTime: 'Response within 48 hours',
          icon: {
            template: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
          }
        },
        {
          value: 'medium',
          name: 'Medium Priority',
          description: 'Standard issues, needs attention',
          responseTime: 'Response within 24 hours',
          icon: {
            template: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z"/></svg>'
          }
        },
        {
          value: 'high',
          name: 'High Priority',
          description: 'Urgent issues, immediate attention',
          responseTime: 'Response within 4 hours',
          icon: {
            template: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>'
          }
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
    },
    isCreateTicketView() {
      return !this.showTicketList && !this.showTicketDetails
    },
    isMyTicketsView() {
      return this.showTicketList || this.showTicketDetails
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
    handleDrop(event) {
      event.preventDefault()
      this.isDragOver = false
      const files = Array.from(event.dataTransfer.files)
      this.processFiles(files)
    },
    handleFileUpload(event) {
      const files = Array.from(event.target.files)
      this.processFiles(files)
      event.target.value = ''
    },
    processFiles(files) {
      const maxSize = 10 * 1024 * 1024 // 10MB
      const maxFiles = 5
      
      files.forEach(file => {
        if (this.ticket.attachments.length >= maxFiles) {
          this.$toast?.error(`Maximum ${maxFiles} files allowed.`)
          return
        }
        
        if (file.size > maxSize) {
          this.$toast?.error(`File ${file.name} is too large. Maximum size is 10MB.`)
          return
        }
        
        this.ticket.attachments.push(file)
      })
    },
    removeFile(index) {
      this.ticket.attachments.splice(index, 1)
    },
    clearAllFiles() {
      this.ticket.attachments = []
    },
    getFileType(file) {
      if (file.type.startsWith('image/')) return 'image'
      if (file.type === 'application/pdf') return 'pdf'
      if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) return 'document'
      return 'file'
    },
    getFileIcon(file) {
      const type = this.getFileType(file)
      const icons = {
        image: {
          template: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>'
        },
        pdf: {
          template: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>'
        },
        document: {
          template: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>'
        },
        file: {
          template: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>'
        }
      }
      return icons[type] || icons.file
    },
    getFileExtension(filename) {
      return filename.split('.').pop().toUpperCase()
    },
    truncateFileName(name, maxLength = 25) {
      if (name.length <= maxLength) return name
      const ext = name.split('.').pop()
      const nameWithoutExt = name.substring(0, name.lastIndexOf('.'))
      const truncated = nameWithoutExt.substring(0, maxLength - ext.length - 4) + '...'
      return truncated + '.' + ext
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
    },
    formatIssueType(type) {
      const types = {
        'order-issue': '🛍️ Order Issue',
        'product-defect': '🔧 Product Defect',
        'shipping-problem': '📦 Shipping Problem',
        'payment-issue': '💳 Payment Issue',
        'account-problem': '👤 Account Problem',
        'return-exchange': '🔄 Return & Exchange',
        'general-inquiry': '💬 General Inquiry',
        'technical-support': '⚙️ Technical Support'
      }
      return types[type] || type
    },
    formatPriority(priority) {
      const priorities = {
        'low': 'Low Priority',
        'medium': 'Medium Priority',
        'high': 'High Priority'
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
      this.showTicketList = false
      this.currentStep = 1
      this.ticket = {
        issueType: '',
        subject: '',
        description: '',
        priority: 'medium',
        attachments: []
      }
    },
    showMyTickets() {
      this.showSuccess = false
      this.showTicketList = true
      this.loadUserTickets()
    },
    loadUserTickets() {
      // In a real app, this would fetch from API
      // For now, we'll add the newly created ticket to the list
      if (this.generatedTicketId && !this.userTickets.find(t => t.id === this.generatedTicketId)) {
        const newTicket = {
          id: this.generatedTicketId,
          subject: this.ticket.subject,
          issueType: this.ticket.issueType,
          priority: this.ticket.priority,
          status: 'open',
          dateRaised: new Date().toISOString(),
          lastReply: new Date().toISOString(),
          description: this.ticket.description,
          attachments: this.ticket.attachments.length,
          replies: []
        }
        this.userTickets.unshift(newTicket)
      }
    },
    getStatusClass(status) {
      const statusClasses = {
        'open': 'status-open',
        'in-progress': 'status-in-progress',
        'resolved': 'status-resolved',
        'closed': 'status-closed'
      }
      return statusClasses[status] || 'status-open'
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    viewTicketDetails(ticket) {
      this.selectedTicket = ticket
      this.showTicketDetails = true
    },
    closeTicketDetails() {
      this.showTicketDetails = false
      this.selectedTicket = null
    },
    addReply(ticketId) {
      if (!this.newReplyText.trim()) return

      const ticket = this.userTickets.find(t => t.id === ticketId)
      if (ticket) {
        const reply = {
          id: Date.now(),
          text: this.newReplyText,
          timestamp: new Date().toISOString(),
          sender: 'user'
        }
        ticket.replies.push(reply)
        ticket.lastReply = reply.timestamp
        this.newReplyText = ''
        this.$toast?.success('Reply added successfully!')
      }
    },
    closeTicket(ticketId) {
      const ticket = this.userTickets.find(t => t.id === ticketId)
      if (ticket) {
        ticket.status = 'closed'
        this.$toast?.success('Ticket closed successfully!')
      }
    },
    backToTicketList() {
      this.showTicketList = false
      this.showTicketDetails = false
      this.currentStep = 1
    },
    switchToCreateTicket() {
      this.showSuccess = false
      this.showTicketList = false
      this.showTicketDetails = false
      this.currentStep = 1
      this.selectedTicket = null
    },
    switchToMyTickets() {
      this.showSuccess = false
      this.showTicketList = true
      this.showTicketDetails = false
      this.loadUserTickets()
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
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Enhanced Header */
.ticket-header {
  margin-bottom: 30px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: white;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.header-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 20px rgba(236, 72, 153, 0.3);
}

.header-icon svg {
  width: 30px;
  height: 30px;
}

.header-text h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.header-text p {
  color: #64748b;
  margin: 0;
  font-size: 16px;
}

/* Ticket Navigation Bar */
.ticket-nav-bar {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.nav-section {
  display: flex;
  align-items: center;
}

.nav-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  color: #6b7280;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-option:hover {
  border-color: #cbd5e1;
  background: #f9fafb;
  color: #374151;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-option.active {
  border-color: #ec4899;
  background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
  color: #ec4899;
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(236, 72, 153, 0.2);
}

.nav-option svg {
  width: 18px;
  height: 18px;
}

.nav-option.create-ticket svg {
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

.nav-option.create-ticket:hover svg {
  transform: rotate(90deg);
}

.ticket-count {
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
}

.nav-option.active .ticket-count {
  background: #ec4899;
}

/* Enhanced Progress Steps */
.progress-container {
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  position: relative;
}

.step {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  position: relative;
  z-index: 2;
}

.step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 20px;
  right: -50%;
  width: 100%;
  height: 2px;
  background: #e2e8f0;
  z-index: 1;
}

.step.completed:not(:last-child)::after {
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
}

.step-indicator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e2e8f0;
  color: #64748b;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.step.active .step-indicator {
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 20px rgba(236, 72, 153, 0.4);
}

.step.completed .step-indicator {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.step-check {
  width: 20px;
  height: 20px;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  color: #374151;
  margin-bottom: 2px;
}

.step.active .step-title {
  color: #ec4899;
}

.step.completed .step-title {
  color: #10b981;
}

.step-description {
  font-size: 12px;
  color: #6b7280;
}

.progress-bar-container {
  position: relative;
  height: 6px;
  background: #f1f5f9;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #e2e8f0;
  border-radius: 3px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ec4899 0%, #be185d 100%);
  transition: width 0.5s ease;
  border-radius: 3px;
}

/* Enhanced Content Cards */
.step-content-wrapper {
  margin-bottom: 30px;
}

.content-card {
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f1f5f9;
}

.card-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 20px rgba(236, 72, 153, 0.3);
}

.card-icon svg {
  width: 24px;
  height: 24px;
}

.card-title h2 {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.card-title p {
  color: #64748b;
  margin: 0;
  font-size: 16px;
}

/* Enhanced Form Styling */
.ticket-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  margin-bottom: 8px;
}

.label-required {
  color: #ef4444;
  font-size: 12px;
}

/* Enhanced Select Styling */
.select-container {
  position: relative;
}

.form-select {
  width: 100%;
  padding: 16px 48px 16px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  background: white;
  transition: all 0.3s ease;
  appearance: none;
  cursor: pointer;
}

.form-select:focus,
.form-select.has-value {
  border-color: #ec4899;
  box-shadow: 0 0 0 4px rgba(236, 72, 153, 0.1);
  outline: none;
}

.select-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #6b7280;
}

.select-arrow svg {
  width: 20px;
  height: 20px;
}

/* Enhanced Input Styling */
.input-container,
.textarea-container {
  position: relative;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  background: white;
  transition: all 0.3s ease;
  font-family: inherit;
  resize: vertical;
}

.form-input:focus,
.form-textarea:focus,
.form-input.has-value,
.form-textarea.has-value {
  border-color: #ec4899;
  box-shadow: 0 0 0 4px rgba(236, 72, 153, 0.1);
  outline: none;
}

.form-textarea {
  min-height: 120px;
  line-height: 1.6;
}

.character-count {
  position: absolute;
  bottom: 12px;
  right: 16px;
  font-size: 12px;
  color: #9ca3af;
  background: white;
  padding: 2px 6px;
  border-radius: 4px;
}

.character-count.near-limit {
  color: #ef4444;
  font-weight: 600;
}

/* Enhanced Priority Selection */
.priority-grid {
  display: grid;
  gap: 16px;
}

.priority-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.priority-card:hover {
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.priority-card.selected {
  border-color: #ec4899;
  background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.2);
}

.priority-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.priority-icon.low {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.priority-icon.medium {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.priority-icon.high {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.priority-icon svg {
  width: 20px;
  height: 20px;
}

.priority-content {
  flex: 1;
}

.priority-name {
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
}

.priority-description {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 4px;
}

.priority-response {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
}

.priority-selector {
  flex-shrink: 0;
}

.radio-button {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;
}

.radio-button.selected {
  border-color: #ec4899;
}

.radio-dot {
  width: 8px;
  height: 8px;
  background: #ec4899;
  border-radius: 50%;
}

/* Quick Help */
.quick-help {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-radius: 12px;
  border: 1px solid #bfdbfe;
}

.help-icon {
  color: #3b82f6;
  flex-shrink: 0;
}

.help-icon svg {
  width: 20px;
  height: 20px;
}

.help-title {
  font-weight: 600;
  color: #1e40af;
  font-size: 14px;
  margin-bottom: 4px;
}

.help-text {
  color: #1e40af;
  font-size: 13px;
  line-height: 1.4;
}

/* Enhanced File Upload */
.upload-zone {
  border: 2px dashed #cbd5e1;
  border-radius: 16px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
}

.upload-zone::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(190, 24, 93, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.upload-zone:hover::before,
.upload-zone.drag-over::before {
  opacity: 1;
}

.upload-zone:hover,
.upload-zone.drag-over {
  border-color: #ec4899;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.15);
}

.upload-content {
  position: relative;
  z-index: 1;
}

.upload-icon-container {
  margin-bottom: 16px;
}

.upload-icon {
  width: 48px;
  height: 48px;
  color: #6b7280;
  margin: 0 auto;
}

.upload-text h3 {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
}

.upload-text p {
  color: #6b7280;
  margin: 0 0 16px 0;
}

.upload-specs {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.spec-item {
  font-size: 12px;
  color: #9ca3af;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

/* Enhanced File Cards */
.files-section {
  margin-top: 24px;
}

.files-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.files-header h4 {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.clear-all-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-all-btn:hover {
  background: #fecaca;
}

.clear-all-btn svg {
  width: 14px;
  height: 14px;
}

.files-grid {
  display: grid;
  gap: 12px;
}

.file-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.2s;
}

.file-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.file-preview {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.file-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.file-icon.image {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.file-icon.pdf {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.file-icon.document {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.file-icon.file {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
}

.file-icon svg {
  width: 20px;
  height: 20px;
}

.file-details {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-meta {
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: #9ca3af;
}

.remove-file-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.remove-file-btn:hover {
  background: #fecaca;
}

.remove-file-btn svg {
  width: 16px;
  height: 16px;
}

/* Enhanced Review Section */
.review-sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.review-card {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.review-header h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.review-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.review-icon.issue {
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
}

.review-icon.attachments {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.review-icon svg {
  width: 16px;
  height: 16px;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #6b7280;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;
}

.edit-btn:hover {
  background: #f9fafb;
  color: #374151;
}

.edit-btn svg {
  width: 14px;
  height: 14px;
}

.review-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.review-item.description-item {
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
}

.item-label {
  font-weight: 600;
  color: #6b7280;
  min-width: 100px;
  font-size: 14px;
}

.item-value {
  color: #374151;
  flex: 1;
}

.item-value.type {
  font-weight: 500;
}

.item-value.priority {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
}

.item-value.priority.low {
  background: #dcfce7;
  color: #166534;
}

.item-value.priority.medium {
  background: #fef3c7;
  color: #92400e;
}

.item-value.priority.high {
  background: #fee2e2;
  color: #dc2626;
}

.item-description {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  color: #374151;
  line-height: 1.6;
  font-size: 14px;
}

.attachments-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.attachment-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 12px;
}

.chip-icon {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.chip-icon.image {
  background: #10b981;
}

.chip-icon.pdf {
  background: #ef4444;
}

.chip-icon.document {
  background: #3b82f6;
}

.chip-icon.file {
  background: #6b7280;
}

.chip-icon svg {
  width: 12px;
  height: 12px;
}

.chip-name {
  color: #374151;
  font-weight: 500;
}

.chip-size {
  color: #9ca3af;
}

/* Response Info */
.response-info {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border: 1px solid #a7f3d0;
  border-radius: 16px;
  margin-top: 24px;
}

.response-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.response-icon svg {
  width: 20px;
  height: 20px;
}

.response-content h4 {
  font-size: 16px;
  font-weight: 600;
  color: #065f46;
  margin: 0 0 8px 0;
}

.response-content p {
  color: #047857;
  margin: 0;
  line-height: 1.5;
}

/* Enhanced Action Buttons */
.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.next-button,
.submit-button,
.back-button-step {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  border: none;
}

.next-button,
.submit-button {
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(236, 72, 153, 0.3);
}

.next-button:hover,
.submit-button:hover {
  background: linear-gradient(135deg, #be185d 0%, #9d174d 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.4);
}

.next-button:disabled,
.submit-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.back-button-step {
  background: white;
  border: 2px solid #e5e7eb;
  color: #6b7280;
}

.back-button-step:hover {
  background: #f9fafb;
  border-color: #cbd5e1;
  color: #374151;
  transform: translateY(-1px);
}

.submit-content,
.submit-loading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Enhanced Success Modal */
.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.success-modal {
  background: white;
  border-radius: 24px;
  padding: 40px;
  text-align: center;
  max-width: 500px;
  margin: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-animation {
  position: relative;
  display: inline-block;
  margin-bottom: 24px;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  z-index: 2;
  animation: pulse 2s infinite;
}

.success-icon svg {
  width: 40px;
  height: 40px;
}

.success-ring {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 3px solid #10b981;
  border-radius: 50%;
  opacity: 0.3;
  animation: ring 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes ring {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.success-content h2 {
  font-size: 28px;
  font-weight: 700;
  color: #374151;
  margin: 0 0 20px 0;
}

.ticket-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
  padding: 20px;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-radius: 16px;
  border: 1px solid #bbf7d0;
}

.ticket-id {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 18px;
}

.id-label {
  color: #065f46;
  font-weight: 500;
}

.id-value {
  color: #047857;
  font-weight: 700;
  font-family: monospace;
  background: white;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #a7f3d0;
}

.response-time {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #065f46;
  font-weight: 500;
}

.success-message {
  color: #6b7280;
  line-height: 1.6;
  margin: 20px 0;
}

.success-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 28px;
}

.success-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.success-button.primary {
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(236, 72, 153, 0.3);
}

.success-button.primary:hover {
  background: linear-gradient(135deg, #be185d 0%, #9d174d 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.4);
}

.success-button.secondary {
  background: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
}

.success-button.secondary:hover {
  background: #f9fafb;
  color: #374151;
  border-color: #cbd5e1;
}

.success-button svg {
  width: 16px;
  height: 16px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .content-card {
    padding: 24px 20px;
  }
  
  .progress-container {
    padding: 20px;
  }
  
  .progress-steps {
    flex-direction: column;
    gap: 16px;
  }
  
  .step:not(:last-child)::after {
    display: none;
  }
  
  .card-header {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .success-actions {
    flex-direction: column;
  }
  
  .success-button {
    width: 100%;
    justify-content: center;
  }
  
  .files-grid {
    grid-template-columns: 1fr;
  }
  
  .upload-specs {
    flex-direction: column;
    gap: 8px;
  }
  
  .review-header {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .edit-btn {
    align-self: flex-end;
  }
}

/* Ticket List Styles */
.create-new-btn,
.back-to-list-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.create-new-btn:hover,
.back-to-list-btn:hover {
  background: linear-gradient(135deg, #be185d 0%, #9d174d 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.4);
}

.create-new-btn svg,
.back-to-list-btn svg {
  width: 16px;
  height: 16px;
}

.no-tickets {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

.no-tickets-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  color: #d1d5db;
}

.no-tickets-icon svg {
  width: 100%;
  height: 100%;
}

.no-tickets h3 {
  font-size: 24px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.create-first-ticket-btn {
  margin-top: 20px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.create-first-ticket-btn:hover {
  background: linear-gradient(135deg, #be185d 0%, #9d174d 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.4);
}

.tickets-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ticket-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.ticket-card:hover {
  border-color: #ec4899;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.15);
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.ticket-id-subject {
  flex: 1;
}

.ticket-id {
  font-size: 18px;
  font-weight: 700;
  color: #374151;
  margin: 0 0 4px 0;
}

.ticket-subject {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.ticket-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-open {
  background: #dbeafe;
  color: #1e40af;
}

.status-open .status-dot {
  background: #3b82f6;
}

.status-in-progress {
  background: #fef3c7;
  color: #92400e;
}

.status-in-progress .status-dot {
  background: #f59e0b;
}

.status-resolved {
  background: #dcfce7;
  color: #166534;
}

.status-resolved .status-dot {
  background: #10b981;
}

.status-closed {
  background: #f3f4f6;
  color: #4b5563;
}

.status-closed .status-dot {
  background: #6b7280;
}

.ticket-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6b7280;
}

.meta-item svg {
  width: 14px;
  height: 14px;
}

.meta-item.priority.high {
  color: #dc2626;
}

.meta-item.priority.medium {
  color: #d97706;
}

.meta-item.priority.low {
  color: #059669;
}

.ticket-preview {
  margin-bottom: 16px;
}

.ticket-preview p {
  color: #4b5563;
  line-height: 1.5;
  margin: 0;
}

.ticket-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
}

.ticket-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6b7280;
}

.stat-item svg {
  width: 12px;
  height: 12px;
}

.last-activity {
  font-size: 11px;
  color: #9ca3af;
}

/* Ticket Details Styles */
.ticket-details-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.ticket-info-section {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-label {
  font-weight: 600;
  color: #6b7280;
  font-size: 14px;
  min-width: 80px;
}

.info-value {
  color: #374151;
  font-weight: 500;
}

.info-value.status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value.priority {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value.priority.low {
  background: #dcfce7;
  color: #166534;
}

.info-value.priority.medium {
  background: #fef3c7;
  color: #92400e;
}

.info-value.priority.high {
  background: #fee2e2;
  color: #dc2626;
}

.original-message,
.conversation-section,
.add-reply-section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
}

.original-message h4,
.conversation-section h4,
.add-reply-section h4 {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 16px 0;
}

.message-content {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e5e7eb;
}

.message-content p {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

.no-replies {
  text-align: center;
  padding: 20px;
  color: #6b7280;
}

.replies-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.reply-item {
  display: flex;
  gap: 12px;
}

.reply-item.support {
  flex-direction: row;
}

.reply-item.user {
  flex-direction: row-reverse;
}

.reply-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.reply-item.support .reply-avatar {
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
  color: white;
}

.reply-item.user .reply-avatar {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.reply-avatar svg {
  width: 20px;
  height: 20px;
}

.reply-content {
  flex: 1;
  min-width: 0;
}

.reply-item.user .reply-content {
  text-align: right;
}

.reply-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.reply-item.user .reply-header {
  justify-content: flex-end;
}

.reply-sender {
  font-weight: 600;
  color: #374151;
  font-size: 14px;
}

.reply-time {
  font-size: 12px;
  color: #9ca3af;
}

.reply-text {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 16px;
  color: #4b5563;
  line-height: 1.5;
}

.reply-item.support .reply-text {
  border-bottom-left-radius: 4px;
}

.reply-item.user .reply-text {
  border-bottom-right-radius: 4px;
  background: #eff6ff;
  border-color: #bfdbfe;
}

.reply-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reply-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.2s;
}

.reply-textarea:focus {
  outline: none;
  border-color: #ec4899;
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
}

.reply-actions {
  display: flex;
  justify-content: flex-end;
}

.add-reply-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.add-reply-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #be185d 0%, #9d174d 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
}

.add-reply-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.add-reply-btn svg {
  width: 16px;
  height: 16px;
}

.ticket-actions-section {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
}

.actions-grid {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  color: #6b7280;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 14px;
}

.action-btn:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  color: #374151;
}

.action-btn.close-ticket {
  border-color: #10b981;
  color: #047857;
}

.action-btn.close-ticket:hover {
  background: #dcfce7;
  border-color: #059669;
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

@media (max-width: 768px) {
  .ticket-nav-bar {
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }

  .nav-section {
    width: 100%;
  }

  .nav-option {
    flex: 1;
    justify-content: center;
    padding: 14px 16px;
  }

  .card-header {
    flex-direction: column;
    gap: 16px;
  }

  .create-new-btn,
  .back-to-list-btn {
    align-self: stretch;
    justify-content: center;
  }

  .ticket-header {
    flex-direction: column;
    gap: 12px;
  }

  .ticket-meta {
    gap: 12px;
  }

  .ticket-footer {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .reply-item {
    flex-direction: column;
    align-items: stretch;
  }

  .reply-item.user {
    flex-direction: column;
  }

  .reply-header {
    justify-content: flex-start !important;
  }

  .reply-content {
    text-align: left !important;
  }

  .actions-grid {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .priority-card {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  .upload-zone {
    padding: 24px 16px;
  }

  .success-modal {
    padding: 24px 20px;
    margin: 16px;
  }

  .ticket-card {
    padding: 16px;
  }

  .original-message,
  .conversation-section,
  .add-reply-section,
  .ticket-actions-section {
    padding: 16px;
  }
}
</style>
