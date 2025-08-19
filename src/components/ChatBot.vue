<template>
  <div class="chatbot-container">
    <!-- Chatbot Icon -->
    <div
      v-if="!isOpen"
      @click="toggleChat"
      class="chatbot-icon"
    >
      <div class="robot-container">
        <svg viewBox="0 0 48 48" fill="none" class="robot-icon">
          <defs>
            <linearGradient id="robotBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#00bcd4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#0097a7;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="robotHeadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#26c6da;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#00acc1;stop-opacity:1" />
            </linearGradient>
          </defs>

          <!-- Robot Body -->
          <rect x="12" y="20" width="24" height="20" rx="4" fill="url(#robotBodyGradient)" stroke="#006064" stroke-width="1"/>

          <!-- Robot Head -->
          <rect x="14" y="8" width="20" height="16" rx="6" fill="url(#robotHeadGradient)" stroke="#006064" stroke-width="1"/>

          <!-- Antenna -->
          <circle cx="24" cy="6" r="1.5" fill="#ff5722"/>
          <line x1="24" y1="8" x2="24" y2="6" stroke="#455a64" stroke-width="1.5"/>

          <!-- Eyes -->
          <rect x="18" y="12" width="4" height="6" rx="2" fill="#1a1a1a"/>
          <rect x="26" y="12" width="4" height="6" rx="2" fill="#1a1a1a"/>

          <!-- Eye glow -->
          <circle cx="20" cy="15" r="1" fill="#00e676"/>
          <circle cx="28" cy="15" r="1" fill="#00e676"/>

          <!-- Mouth -->
          <rect x="21" y="19" width="6" height="2" rx="1" fill="#1a1a1a"/>

          <!-- Body details -->
          <circle cx="18" cy="26" r="1.5" fill="#b3e5fc"/>
          <circle cx="24" cy="28" r="1.5" fill="#b3e5fc"/>
          <circle cx="30" cy="26" r="1.5" fill="#b3e5fc"/>

          <!-- Arms -->
          <rect x="8" y="22" width="4" height="8" rx="2" fill="url(#robotBodyGradient)" stroke="#006064" stroke-width="1"/>
          <rect x="36" y="22" width="4" height="8" rx="2" fill="url(#robotBodyGradient)" stroke="#006064" stroke-width="1"/>

          <!-- Speech bubble hint -->
          <path d="M38 10 c2 0 4 2 4 4 v4 c0 2 -2 4 -4 4 h-2 l-2 2 v-2 h-2 c-2 0 -4 -2 -4 -4 v-4 c0 -2 2 -4 4 -4 z" fill="white" stroke="#00bcd4" stroke-width="1" opacity="0.9"/>
          <text x="36" y="16" font-size="6" fill="#00bcd4" text-anchor="middle">Hi!</text>
        </svg>
        <div class="robot-glow"></div>
      </div>
      <div class="notification-badge" v-if="hasNewMessage">!</div>
    </div>

    <!-- Chatbot Interface -->
    <div v-if="isOpen" class="chatbot-interface">
      <!-- Header -->
      <div class="chatbot-header">
        <div class="header-content">
          <div class="assistant-avatar">🤖</div>
          <div class="header-text">
            <h3 class="assistant-name">Shopping Assistant</h3>
            <p class="status-text">Online</p>
          </div>
        </div>
        <button @click="toggleChat" class="close-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Chat Content -->
      <div class="chatbot-content">
        <!-- Welcome Message -->
        <div v-if="!conversationStarted" class="welcome-section">
          <div class="welcome-message">
            <div class="message-bubble assistant-message">
              <p>Hi 👋 I'm your shopping assistant. How can I help you today?</p>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div class="quick-actions">
            <button 
              v-for="action in quickActions" 
              :key="action.id"
              @click="selectQuickAction(action)"
              class="quick-action-btn"
            >
              <span class="action-icon">{{ action.icon }}</span>
              <span class="action-text">{{ action.text }}</span>
            </button>
          </div>
        </div>

        <!-- Conversation Area -->
        <div v-if="conversationStarted" class="conversation-area">
          <div class="messages-container" ref="messagesContainer">
            <div 
              v-for="message in messages" 
              :key="message.id"
              class="message-wrapper"
              :class="message.type"
            >
              <div class="message-bubble" :class="message.type + '-message'">
                <p>{{ message.text }}</p>
                <span class="message-time">{{ formatTime(message.timestamp) }}</span>
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="typing-indicator">
            <div class="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div v-if="conversationStarted" class="chatbot-input">
        <div class="input-container">
          <input 
            v-model="currentMessage"
            @keypress.enter="sendMessage"
            placeholder="Type your message..."
            class="message-input"
          />
          <button 
            @click="sendMessage"
            :disabled="!currentMessage.trim()"
            class="send-button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBot',
  data() {
    return {
      isOpen: false,
      conversationStarted: false,
      hasNewMessage: false,
      isTyping: false,
      currentMessage: '',
      messages: [],
      quickActions: [
        { id: 1, icon: '🔍', text: 'Track My Order' },
        { id: 2, icon: '📦', text: 'Return / Exchange' },
        { id: 3, icon: '👗', text: 'Find Products / Size Guide' },
        { id: 4, icon: '💳', text: 'Payment / Offers Help' },
        { id: 5, icon: '🙋', text: 'Talk to Support' }
      ]
    }
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.hasNewMessage = false
      }
    },
    selectQuickAction(action) {
      this.conversationStarted = true
      this.addMessage('user', action.text)
      
      // Simulate AI response based on action
      setTimeout(() => {
        this.handleQuickActionResponse(action)
      }, 1000)
    },
    addMessage(type, text) {
      this.messages.push({
        id: Date.now(),
        type,
        text,
        timestamp: new Date()
      })
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    sendMessage() {
      if (!this.currentMessage.trim()) return
      
      const message = this.currentMessage.trim()
      this.addMessage('user', message)
      this.currentMessage = ''
      
      // Show typing indicator
      this.isTyping = true
      
      // Simulate AI response
      setTimeout(() => {
        this.isTyping = false
        this.handleUserMessage(message)
      }, 1500)
    },
    handleQuickActionResponse(action) {
      let response = ''
      
      switch(action.id) {
        case 1: // Track My Order
          response = "I can help you track your order! Please provide your order number or email address associated with your purchase."
          break
        case 2: // Return / Exchange
          response = "I'll help you with returns and exchanges. You can return items within 30 days of purchase. Do you have a specific order you'd like to return?"
          break
        case 3: // Find Products / Size Guide
          response = "I can help you find the perfect products and sizes! What type of footwear are you looking for? I can also provide sizing recommendations."
          break
        case 4: // Payment / Offers Help
          response = "I can assist with payment issues and current offers. We accept all major credit cards and offer free shipping on orders over $75. Any specific payment questions?"
          break
        case 5: // Talk to Support
          response = "I'll connect you to a live support agent right away. Please hold while I transfer your conversation..."
          break
        default:
          response = "How can I assist you today?"
      }
      
      this.addMessage('assistant', response)
    },
    handleUserMessage(message) {
      const lowerMessage = message.toLowerCase()
      let response = ''
      
      // Basic keyword matching for responses
      if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
        response = "To track your order, I'll need your order number. It should be in your confirmation email. You can also check your account under 'My Orders'."
      } else if (lowerMessage.includes('return') || lowerMessage.includes('exchange')) {
        response = "Our return policy allows returns within 30 days. Items must be unworn and in original packaging. Would you like me to start a return request?"
      } else if (lowerMessage.includes('size') || lowerMessage.includes('fit')) {
        response = "I can help with sizing! Our products run true to size. Check our size guide or tell me your usual size and the product you're interested in."
      } else if (lowerMessage.includes('payment') || lowerMessage.includes('card')) {
        response = "We accept Visa, MasterCard, American Express, and PayPal. If you're having payment issues, please check your card details or try a different payment method."
      } else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
        response = "We offer free shipping on orders over $75. Standard delivery takes 3-5 business days, express delivery 1-2 days."
      } else {
        response = "I understand you need help with that. Let me connect you to a live support agent who can better assist you with your specific question."
      }
      
      this.addMessage('assistant', response)
    },
    formatTime(timestamp) {
      return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    }
  }
}
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: var(--space-lg);
  right: var(--space-lg);
  z-index: var(--z-modal);
}

.chatbot-icon {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: var(--border-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-normal);
  position: relative;
  background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
  box-shadow: 0 6px 24px rgba(0, 188, 212, 0.3);
  border: 2px solid rgba(0, 188, 212, 0.2);
}

.chatbot-icon:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 12px 36px rgba(0, 188, 212, 0.4);
  border-color: rgba(0, 188, 212, 0.4);
}

.chatbot-icon:hover .robot-glow {
  animation: robotGlow 2s ease-in-out infinite;
}

.chatbot-icon:hover .robot-icon {
  animation: robotBob 1s ease-in-out infinite;
}

.robot-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.robot-icon {
  width: 3rem;
  height: 3rem;
  z-index: 2;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.robot-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-xl);
  background: radial-gradient(circle, rgba(0, 230, 118, 0.1) 0%, transparent 70%);
  z-index: 1;
}

@keyframes robotGlow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

@keyframes robotBob {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

.notification-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 1.25rem;
  height: 1.25rem;
  background-color: var(--secondary-color);
  color: var(--text-white);
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: var(--font-weight-bold);
  border: 2px solid var(--bg-primary);
}

.chatbot-interface {
  width: 350px;
  height: 500px;
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-xl);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-light);
}

.chatbot-header {
  background: linear-gradient(135deg, var(--accent-color), var(--accent-dark));
  color: var(--text-white);
  padding: var(--space-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.assistant-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.header-text {
  flex: 1;
}

.assistant-name {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  margin: 0;
  line-height: 1.2;
}

.status-text {
  font-size: var(--font-size-xs);
  margin: 0;
  opacity: 0.9;
}

.close-button {
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  color: var(--text-white);
  cursor: pointer;
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
}

.close-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.close-button svg {
  width: 1.25rem;
  height: 1.25rem;
}

.chatbot-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.welcome-section {
  padding: var(--space-md);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.welcome-message {
  margin-bottom: var(--space-lg);
}

.message-bubble {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-lg);
  position: relative;
  word-wrap: break-word;
}

.assistant-message {
  background-color: var(--bg-light);
  color: var(--text-primary);
  margin-right: var(--space-lg);
}

.user-message {
  background-color: var(--accent-color);
  color: var(--text-white);
  margin-left: var(--space-lg);
  align-self: flex-end;
}

.message-bubble p {
  margin: 0;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
}

.message-time {
  font-size: 0.65rem;
  opacity: 0.7;
  margin-top: var(--space-xs);
  display: block;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: var(--transition-fast);
  text-align: left;
  width: 100%;
}

.quick-action-btn:hover {
  background-color: var(--bg-light);
  border-color: var(--accent-color);
  transform: translateY(-1px);
}

.action-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.action-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.conversation-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--space-md);
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding-right: var(--space-xs);
}

.messages-container::-webkit-scrollbar {
  width: 4px;
}

.messages-container::-webkit-scrollbar-track {
  background: var(--bg-light);
  border-radius: var(--border-radius-sm);
}

.messages-container::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: var(--border-radius-sm);
}

.message-wrapper {
  display: flex;
}

.message-wrapper.user {
  justify-content: flex-end;
}

.message-wrapper.assistant {
  justify-content: flex-start;
}

.typing-indicator {
  padding: var(--space-sm) var(--space-md);
  margin-bottom: var(--space-sm);
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.typing-dots span {
  width: 6px;
  height: 6px;
  background-color: var(--text-secondary);
  border-radius: var(--border-radius-full);
  animation: typing 1.4s infinite;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.chatbot-input {
  padding: var(--space-md);
  border-top: 1px solid var(--border-light);
  background-color: var(--bg-secondary);
}

.input-container {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
}

.message-input {
  flex: 1;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-full);
  background-color: var(--bg-primary);
  font-size: var(--font-size-sm);
  outline: none;
  transition: var(--transition-fast);
}

.message-input:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.send-button {
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--accent-color);
  border: none;
  border-radius: var(--border-radius-full);
  color: var(--text-white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
}

.send-button:hover:not(:disabled) {
  background-color: var(--accent-dark);
  transform: scale(1.05);
}

.send-button:disabled {
  background-color: var(--border-color);
  cursor: not-allowed;
}

.send-button svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .chatbot-container {
    bottom: var(--space-md);
    right: var(--space-md);
  }
  
  .chatbot-interface {
    width: 320px;
    height: 450px;
  }
}
</style>
