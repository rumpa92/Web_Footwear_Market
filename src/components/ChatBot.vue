<template>
  <div class="chatbot-container">
    <!-- Chatbot Icon -->
    <div
      v-if="!isOpen"
      @click="toggleChat"
      class="chatbot-icon"
    >
      <div class="icon-container">
        <svg viewBox="0 0 32 32" fill="none" class="chat-icon">
          <defs>
            <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
            </linearGradient>
          </defs>
          <!-- Chat bubble background -->
          <path d="M16 4C9.373 4 4 8.925 4 15c0 2.836 1.106 5.432 2.907 7.479L5 28l5.799-1.822C12.432 27.37 14.16 28 16 28c6.627 0 12-4.925 12-11S22.627 4 16 4z" fill="url(#chatGradient)"/>
          <!-- Message dots -->
          <circle cx="12" cy="15" r="1.5" fill="white" opacity="0.9"/>
          <circle cx="16" cy="15" r="1.5" fill="white" opacity="0.9"/>
          <circle cx="20" cy="15" r="1.5" fill="white" opacity="0.9"/>
          <!-- Sparkle accent -->
          <path d="M24 8l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" fill="white" opacity="0.7"/>
        </svg>
        <div class="pulse-ring"></div>
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
  width: 3.5rem;
  height: 3.5rem;
  background: var(--bg-primary);
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: var(--transition-normal);
  position: relative;
  border: 2px solid var(--border-light);
}

.chatbot-icon:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
  border-color: var(--accent-color);
}

.chat-icon-image {
  width: 2rem;
  height: 2rem;
  object-fit: cover;
  border-radius: var(--border-radius-full);
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
