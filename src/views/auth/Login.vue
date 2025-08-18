<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- Left Side - Branding -->
      <div class="auth-branding">
        <div class="brand-content">
          <div class="brand-logo">
            <svg viewBox="0 0 64 64" class="logo-icon">
              <path d="M32 8L8 16v16c0 16 8 24 24 24s24-8 24-24V16L32 8z" fill="currentColor"/>
              <path d="M32 16L16 20v12c0 8 4 12 16 12s16-4 16-12V20L32 16z" fill="white" opacity="0.8"/>
            </svg>
            <h1 class="brand-name">FootMarket</h1>
          </div>
          <h2 class="brand-tagline">Step into Style</h2>
          <p class="brand-description">
            Discover the perfect footwear for every occasion. From casual comfort to luxury elegance, 
            find your ideal pair and step confidently into your next adventure.
          </p>
          
          <div class="features-list">
            <div class="feature-item">
              <svg class="feature-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
              </svg>
              <span>Premium Quality Guarantee</span>
            </div>
            <div class="feature-item">
              <svg class="feature-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"/>
              </svg>
              <span>Free Shipping & Easy Returns</span>
            </div>
            <div class="feature-item">
              <svg class="feature-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,17.56L16.07,16.43L16.62,10.33L9.38,10.33L9.93,16.43L12,17.56M7.34,7L8.57,3.5L15.43,3.5L16.66,7M18.75,9L17.77,18.78C17.73,19.2 17.38,19.5 16.96,19.5H7.04C6.62,19.5 6.27,19.2 6.23,18.78L5.25,9H18.75Z"/>
              </svg>
              <span>Exclusive Member Benefits</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <div class="auth-form-section">
        <div class="form-container">
          <!-- Header -->
          <div class="form-header">
            <h1 class="form-title">Welcome Back!</h1>
            <p class="form-subtitle">Sign in to your account to continue shopping</p>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="auth-form" novalidate>
            <!-- Email Field -->
            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <div class="input-wrapper" :class="{ 'input-focused': focusedField === 'email', 'input-error': errors.email }">
                <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  class="form-input"
                  placeholder="Enter your email"
                  autocomplete="email"
                  @focus="focusedField = 'email'"
                  @blur="focusedField = null"
                  @input="clearError('email')"
                  :aria-invalid="errors.email ? 'true' : 'false'"
                  :aria-describedby="errors.email ? 'email-error' : null"
                />
              </div>
              <div v-if="errors.email" id="email-error" class="error-message" role="alert">
                <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ errors.email }}
              </div>
            </div>

            <!-- Password Field -->
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <div class="input-wrapper" :class="{ 'input-focused': focusedField === 'password', 'input-error': errors.password }">
                <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <input
                  id="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-input"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                  @focus="focusedField = 'password'"
                  @blur="focusedField = null"
                  @input="clearError('password')"
                  :aria-invalid="errors.password ? 'true' : 'false'"
                  :aria-describedby="errors.password ? 'password-error' : null"
                />
                <button
                  type="button"
                  @click="togglePassword"
                  class="password-toggle"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                >
                  <svg v-if="showPassword" class="toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L15.121 15.121M15.121 15.121L21 21"/>
                  </svg>
                  <svg v-else class="toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
              <div v-if="errors.password" id="password-error" class="error-message" role="alert">
                <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ errors.password }}
              </div>
            </div>

            <!-- Options Row -->
            <div class="form-options">
              <label class="checkbox-wrapper">
                <input
                  v-model="formData.rememberMe"
                  type="checkbox"
                  class="checkbox-input"
                />
                <span class="checkbox-custom">
                  <svg class="checkbox-icon" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                  </svg>
                </span>
                <span class="checkbox-label">Remember me</span>
              </label>
              <router-link to="/forgot-password" class="forgot-link">
                Forgot password?
              </router-link>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="submit-btn"
              :disabled="isLoading"
              :class="{ 'btn-loading': isLoading }"
            >
              <span v-if="!isLoading" class="btn-content">
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                </svg>
                Sign In
              </span>
              <div v-else class="loading-spinner">
                <div class="spinner"></div>
                <span>Signing in...</span>
              </div>
            </button>

            <!-- General Error Message -->
            <div v-if="errors.general" class="general-error" role="alert">
              <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              {{ errors.general }}
            </div>
          </form>

          <!-- Divider -->
          <div class="divider">
            <span class="divider-text">Or continue with</span>
          </div>

          <!-- Social Login -->
          <div class="social-login">
            <button
              @click="handleGoogleLogin"
              class="social-btn google-btn"
              :disabled="isLoading"
            >
              <svg class="social-icon google-icon" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button
              @click="handleAppleLogin"
              class="social-btn apple-btn"
              :disabled="isLoading"
            >
              <svg class="social-icon apple-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          <!-- Sign up Link -->
          <div class="auth-switch">
            <span class="switch-text">Don't have an account?</span>
            <router-link to="/register" class="switch-link">
              Create Account
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      formData: {
        email: '',
        password: '',
        rememberMe: false
      },
      errors: {},
      isLoading: false,
      showPassword: false,
      focusedField: null
    }
  },
  methods: {
    async handleLogin() {
      if (!this.validateForm()) return

      this.isLoading = true
      this.errors = {}

      try {
        // Simulate API call with realistic delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Mock authentication logic
        if (this.formData.email === 'test@example.com' && this.formData.password === 'password') {
          // Store user data
          const userData = {
            email: this.formData.email,
            name: 'Test User',
            rememberMe: this.formData.rememberMe
          }
          
          if (this.formData.rememberMe) {
            localStorage.setItem('user', JSON.stringify(userData))
          } else {
            sessionStorage.setItem('user', JSON.stringify(userData))
          }

          // Success feedback
          this.showSuccessMessage()
          
          // Redirect after short delay
          setTimeout(() => {
            this.$router.push(this.$route.query.redirect || '/')
          }, 1000)
        } else {
          this.errors.general = 'Invalid email or password. Please try again.'
        }
      } catch (error) {
        this.errors.general = 'Something went wrong. Please try again later.'
        console.error('Login error:', error)
      } finally {
        this.isLoading = false
      }
    },
    
    async handleGoogleLogin() {
      this.isLoading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Google login initiated')
        // In a real app, integrate with Google OAuth
        this.showSuccessMessage()
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      } catch (error) {
        this.errors.general = 'Social login failed. Please try again.'
        console.error('Google login failed:', error)
      } finally {
        this.isLoading = false
      }
    },
    
    async handleAppleLogin() {
      this.isLoading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Apple login initiated')
        // In a real app, integrate with Apple Sign In
        this.showSuccessMessage()
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      } catch (error) {
        this.errors.general = 'Social login failed. Please try again.'
        console.error('Apple login failed:', error)
      } finally {
        this.isLoading = false
      }
    },
    
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    
    clearError(field) {
      if (this.errors[field]) {
        delete this.errors[field]
      }
      if (this.errors.general) {
        delete this.errors.general
      }
    },
    
    validateForm() {
      this.errors = {}
      let isValid = true

      // Email validation
      if (!this.formData.email) {
        this.errors.email = 'Email is required'
        isValid = false
      } else if (!this.isValidEmail(this.formData.email)) {
        this.errors.email = 'Please enter a valid email address'
        isValid = false
      }

      // Password validation
      if (!this.formData.password) {
        this.errors.password = 'Password is required'
        isValid = false
      } else if (this.formData.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters'
        isValid = false
      }

      return isValid
    },
    
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },

    showSuccessMessage() {
      // You can implement toast notification here
      console.log('Login successful!')
    }
  },

  mounted() {
    // Auto-focus first input
    this.$nextTick(() => {
      const emailInput = document.getElementById('email')
      if (emailInput) emailInput.focus()
    })
  }
}
</script>

<style scoped>
/* Main Layout */
.auth-page {
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.auth-container {
  display: flex;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  background: white;
  border-radius: 0;
}

/* Left Side - Branding */
.auth-branding {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.auth-branding::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23pattern)"/></svg>');
  pointer-events: none;
}

.brand-content {
  position: relative;
  z-index: 1;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.logo-icon {
  width: 48px;
  height: 48px;
  color: white;
}

.brand-name {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
}

.brand-tagline {
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  line-height: 1.2;
  background: linear-gradient(45deg, white, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0 0 3rem 0;
  opacity: 0.9;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.feature-icon {
  width: 24px;
  height: 24px;
  color: rgba(255, 255, 255, 0.9);
  flex-shrink: 0;
}

/* Right Side - Form */
.auth-form-section {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 2rem;
}

.form-container {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

/* Form Header */
.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

.form-subtitle {
  font-size: 1rem;
  color: #718096;
  margin: 0;
  line-height: 1.5;
}

/* Form Styles */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  transition: all 0.2s ease;
}

.input-wrapper:hover {
  border-color: #cbd5e0;
}

.input-wrapper.input-focused {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-wrapper.input-error {
  border-color: #e53e3e;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
}

.input-icon {
  width: 20px;
  height: 20px;
  color: #9ca3af;
  margin-left: 1rem;
  flex-shrink: 0;
}

.form-input {
  flex: 1;
  padding: 1rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #1a202c;
  outline: none;
}

.form-input::placeholder {
  color: #9ca3af;
}

.password-toggle {
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  color: #9ca3af;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.password-toggle:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.toggle-icon {
  width: 20px;
  height: 20px;
}

/* Error Messages */
.error-message,
.general-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e53e3e;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.25rem;
}

.general-error {
  padding: 0.75rem 1rem;
  background: #fed7d7;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  margin-top: 1rem;
}

.error-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* Form Options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  transition: all 0.2s ease;
}

.checkbox-input:checked + .checkbox-custom {
  background: #667eea;
  border-color: #667eea;
}

.checkbox-icon {
  width: 12px;
  height: 12px;
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.checkbox-input:checked + .checkbox-custom .checkbox-icon {
  opacity: 1;
}

.checkbox-label {
  font-size: 0.875rem;
  color: #374151;
  user-select: none;
}

.forgot-link {
  font-size: 0.875rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #5a67d8;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Divider */
.divider {
  position: relative;
  text-align: center;
  margin: 2rem 0 1.5rem;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, #e2e8f0, transparent);
}

.divider-text {
  background: white;
  padding: 0 1rem;
  font-size: 0.875rem;
  color: #718096;
  position: relative;
}

/* Social Login */
.social-login {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  color: #374151;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.social-btn:hover:not(:disabled) {
  border-color: #cbd5e0;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.social-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.google-btn:hover:not(:disabled) {
  border-color: #4285F4;
  background: rgba(66, 133, 244, 0.04);
}

.apple-btn:hover:not(:disabled) {
  border-color: #000;
  background: rgba(0, 0, 0, 0.04);
}

/* Auth Switch */
.auth-switch {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.switch-text {
  font-size: 0.95rem;
  color: #718096;
  margin-right: 0.5rem;
}

.switch-link {
  font-size: 0.95rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.switch-link:hover {
  color: #5a67d8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
  }
  
  .auth-branding {
    padding: 2rem;
    text-align: center;
  }
  
  .brand-tagline {
    font-size: 2rem;
  }
  
  .features-list {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .feature-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
    min-width: 120px;
  }
  
  .auth-form-section {
    padding: 1.5rem 1rem;
  }
  
  .form-title {
    font-size: 1.875rem;
  }
}

@media (max-width: 480px) {
  .auth-branding {
    padding: 1.5rem;
  }
  
  .brand-tagline {
    font-size: 1.75rem;
  }
  
  .form-container {
    padding: 0;
  }
  
  .social-login {
    gap: 0.5rem;
  }
  
  .social-btn {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
}
</style>
