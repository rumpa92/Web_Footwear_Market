<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- Left Side - Form -->
      <div class="auth-form-section">
        <div class="form-container">
          <!-- Header -->
          <div class="form-header">
            <h1 class="form-title">Join FootMarket</h1>
            <p class="form-subtitle">Create your account and discover amazing footwear</p>
          </div>

          <!-- Register Form -->
          <form @submit.prevent="handleRegister" class="auth-form" novalidate>
            <!-- Name Field -->
            <div class="form-group">
              <label for="name" class="form-label">Full Name</label>
              <div class="input-wrapper" :class="{ 'input-focused': focusedField === 'name', 'input-error': errors.name }">
                <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  class="form-input"
                  placeholder="Enter your full name"
                  autocomplete="name"
                  @focus="focusedField = 'name'"
                  @blur="focusedField = null"
                  @input="clearError('name')"
                  :aria-invalid="errors.name ? 'true' : 'false'"
                  :aria-describedby="errors.name ? 'name-error' : null"
                />
              </div>
              <div v-if="errors.name" id="name-error" class="error-message" role="alert">
                <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ errors.name }}
              </div>
            </div>

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
                  placeholder="Create a password"
                  autocomplete="new-password"
                  @focus="focusedField = 'password'"
                  @blur="focusedField = null"
                  @input="clearError('password'); updatePasswordStrength()"
                  :aria-invalid="errors.password ? 'true' : 'false'"
                  :aria-describedby="errors.password ? 'password-error' : 'password-strength'"
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
              
              <!-- Password Strength Indicator -->
              <div v-if="formData.password" id="password-strength" class="password-strength">
                <div class="strength-bar">
                  <div 
                    class="strength-fill"
                    :class="[`strength-${passwordStrength.level}`]"
                    :style="{ width: `${(passwordStrength.score / 4) * 100}%` }"
                  ></div>
                </div>
                <div class="strength-text" :class="[`strength-${passwordStrength.level}`]">
                  {{ passwordStrength.label }}
                </div>
              </div>

              <div v-if="errors.password" id="password-error" class="error-message" role="alert">
                <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ errors.password }}
              </div>
            </div>

            <!-- Confirm Password Field -->
            <div class="form-group">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <div class="input-wrapper" :class="{ 'input-focused': focusedField === 'confirmPassword', 'input-error': errors.confirmPassword }">
                <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <input
                  id="confirmPassword"
                  v-model="formData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="form-input"
                  placeholder="Confirm your password"
                  autocomplete="new-password"
                  @focus="focusedField = 'confirmPassword'"
                  @blur="focusedField = null"
                  @input="clearError('confirmPassword')"
                  :aria-invalid="errors.confirmPassword ? 'true' : 'false'"
                  :aria-describedby="errors.confirmPassword ? 'confirm-password-error' : null"
                />
                <button
                  type="button"
                  @click="toggleConfirmPassword"
                  class="password-toggle"
                  :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
                >
                  <svg v-if="showConfirmPassword" class="toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L15.121 15.121M15.121 15.121L21 21"/>
                  </svg>
                  <svg v-else class="toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
              <div v-if="errors.confirmPassword" id="confirm-password-error" class="error-message" role="alert">
                <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ errors.confirmPassword }}
              </div>
            </div>

            <!-- Terms and Conditions -->
            <div class="form-group">
              <label class="checkbox-wrapper">
                <input
                  v-model="formData.acceptTerms"
                  type="checkbox"
                  class="checkbox-input"
                  @change="clearError('acceptTerms')"
                  :aria-invalid="errors.acceptTerms ? 'true' : 'false'"
                  :aria-describedby="errors.acceptTerms ? 'terms-error' : null"
                />
                <span class="checkbox-custom">
                  <svg class="checkbox-icon" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                  </svg>
                </span>
                <span class="checkbox-label">
                  I agree to the
                  <router-link to="/privacy-policy" class="terms-link">Terms of Service</router-link>
                  and
                  <router-link to="/privacy-policy" class="terms-link">Privacy Policy</router-link>
                </span>
              </label>
              <div v-if="errors.acceptTerms" id="terms-error" class="error-message" role="alert">
                <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ errors.acceptTerms }}
              </div>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
                Create Account
              </span>
              <div v-else class="loading-spinner">
                <div class="spinner"></div>
                <span>Creating account...</span>
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
            <span class="divider-text">Or sign up with</span>
          </div>

          <!-- Social Login -->
          <div class="social-login">
            <button
              @click="handleGoogleSignup"
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
              @click="handleAppleSignup"
              class="social-btn apple-btn"
              :disabled="isLoading"
            >
              <svg class="social-icon apple-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          <!-- Sign in Link -->
          <div class="auth-switch">
            <span class="switch-text">Already have an account?</span>
            <router-link to="/login" class="switch-link">
              Sign In
            </router-link>
          </div>
        </div>
      </div>

      <!-- Right Side - Branding -->
      <div class="auth-branding">
        <div class="brand-content">
          <div class="brand-logo">
            <svg viewBox="0 0 64 64" class="logo-icon">
              <path d="M32 8L8 16v16c0 16 8 24 24 24s24-8 24-24V16L32 8z" fill="currentColor"/>
              <path d="M32 16L16 20v12c0 8 4 12 16 12s16-4 16-12V20L32 16z" fill="white" opacity="0.8"/>
            </svg>
            <h1 class="brand-name">FootMarket</h1>
          </div>
          <h2 class="brand-tagline">Your Journey Starts Here</h2>
          <p class="brand-description">
            Join thousands of footwear enthusiasts who trust FootMarket for their perfect pair. 
            Experience premium quality, exclusive collections, and personalized recommendations.
          </p>
          
          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"/>
                </svg>
              </div>
              <h3>Verified Quality</h3>
              <p>Every product verified for authenticity and quality</p>
            </div>
            
            <div class="benefit-card">
              <div class="benefit-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                </svg>
              </div>
              <h3>Personal Stylist</h3>
              <p>AI-powered recommendations based on your style</p>
            </div>
            
            <div class="benefit-card">
              <div class="benefit-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2,7H22L20,17H4L2,7M6,9V15H10V9H6M12,9V15H16V9H12M18,9V15H20V9H18Z"/>
                </svg>
              </div>
              <h3>Exclusive Access</h3>
              <p>Early access to limited collections and sales</p>
            </div>
          </div>

          <div class="trust-indicators">
            <div class="trust-item">
              <span class="trust-number">50K+</span>
              <span class="trust-label">Happy Customers</span>
            </div>
            <div class="trust-item">
              <span class="trust-number">4.9★</span>
              <span class="trust-label">Average Rating</span>
            </div>
            <div class="trust-item">
              <span class="trust-number">1000+</span>
              <span class="trust-label">Premium Brands</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
      },
      errors: {},
      isLoading: false,
      showPassword: false,
      showConfirmPassword: false,
      focusedField: null,
      passwordStrength: {
        score: 0,
        level: 'weak',
        label: 'Very Weak'
      }
    }
  },
  methods: {
    async handleRegister() {
      if (!this.validateForm()) return

      this.isLoading = true
      this.errors = {}

      try {
        // Simulate API call with realistic delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Mock registration logic
        const userData = {
          name: this.formData.name,
          email: this.formData.email,
          registered: new Date().toISOString()
        }
        
        // Store user data
        sessionStorage.setItem('user', JSON.stringify(userData))

        // Success feedback
        this.showSuccessMessage()
        
        // Redirect after short delay
        setTimeout(() => {
          this.$router.push('/')
        }, 1500)

      } catch (error) {
        this.errors.general = 'Failed to create account. Please try again.'
        console.error('Registration error:', error)
      } finally {
        this.isLoading = false
      }
    },
    
    async handleGoogleSignup() {
      this.isLoading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Google signup initiated')
        this.showSuccessMessage()
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      } catch (error) {
        this.errors.general = 'Social signup failed. Please try again.'
        console.error('Google signup failed:', error)
      } finally {
        this.isLoading = false
      }
    },
    
    async handleAppleSignup() {
      this.isLoading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Apple signup initiated')
        this.showSuccessMessage()
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      } catch (error) {
        this.errors.general = 'Social signup failed. Please try again.'
        console.error('Apple signup failed:', error)
      } finally {
        this.isLoading = false
      }
    },
    
    togglePassword() {
      this.showPassword = !this.showPassword
    },

    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword
    },
    
    clearError(field) {
      if (this.errors[field]) {
        delete this.errors[field]
      }
      if (this.errors.general) {
        delete this.errors.general
      }
    },

    updatePasswordStrength() {
      const password = this.formData.password
      let score = 0
      let level = 'weak'
      let label = 'Very Weak'

      if (!password) {
        this.passwordStrength = { score: 0, level: 'weak', label: 'Very Weak' }
        return
      }

      // Length check
      if (password.length >= 8) score++
      if (password.length >= 12) score++

      // Character diversity checks
      if (/[a-z]/.test(password)) score++
      if (/[A-Z]/.test(password)) score++
      if (/[0-9]/.test(password)) score++
      if (/[^A-Za-z0-9]/.test(password)) score++

      // Determine level and label
      if (score <= 2) {
        level = 'weak'
        label = password.length < 6 ? 'Too Short' : 'Weak'
      } else if (score <= 3) {
        level = 'fair'
        label = 'Fair'
      } else if (score <= 4) {
        level = 'good'
        label = 'Good'
      } else {
        level = 'strong'
        label = 'Strong'
      }

      this.passwordStrength = { score, level, label }
    },
    
    validateForm() {
      this.errors = {}
      let isValid = true

      // Name validation
      if (!this.formData.name.trim()) {
        this.errors.name = 'Full name is required'
        isValid = false
      } else if (this.formData.name.trim().length < 2) {
        this.errors.name = 'Name must be at least 2 characters'
        isValid = false
      }

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
      } else if (this.formData.password.length < 8) {
        this.errors.password = 'Password must be at least 8 characters'
        isValid = false
      } else if (this.passwordStrength.score < 3) {
        this.errors.password = 'Password is too weak. Try adding numbers and special characters'
        isValid = false
      }

      // Confirm password validation
      if (!this.formData.confirmPassword) {
        this.errors.confirmPassword = 'Please confirm your password'
        isValid = false
      } else if (this.formData.password !== this.formData.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match'
        isValid = false
      }

      // Terms validation
      if (!this.formData.acceptTerms) {
        this.errors.acceptTerms = 'Please accept the terms and conditions'
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
      console.log('Registration successful!')
    }
  },

  mounted() {
    // Auto-focus first input
    this.$nextTick(() => {
      const nameInput = document.getElementById('name')
      if (nameInput) nameInput.focus()
    })
  }
}
</script>

<style scoped>
/* Shared Auth Page Styles */
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

/* Password Strength Indicator */
.password-strength {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.strength-bar {
  flex: 1;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.strength-fill.strength-weak {
  background: #e53e3e;
}

.strength-fill.strength-fair {
  background: #dd6b20;
}

.strength-fill.strength-good {
  background: #38a169;
}

.strength-fill.strength-strong {
  background: #00a86b;
}

.strength-text {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.strength-text.strength-weak {
  color: #e53e3e;
}

.strength-text.strength-fair {
  color: #dd6b20;
}

.strength-text.strength-good {
  color: #38a169;
}

.strength-text.strength-strong {
  color: #00a86b;
}

/* Terms and Conditions Styling */
.terms-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.terms-link:hover {
  color: #5a67d8;
  text-decoration: underline;
}

/* Register-specific branding styles */
.benefits-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.benefit-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease;
}

.benefit-card:hover {
  transform: translateY(-2px);
}

.benefit-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.benefit-icon svg {
  width: 20px;
  height: 20px;
  color: white;
}

.benefit-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: white;
}

.benefit-card p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.4;
}

.trust-indicators {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.trust-item {
  text-align: center;
}

.trust-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
}

.trust-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Responsive adjustments for Register */
@media (max-width: 768px) {
  .auth-container {
    flex-direction: column-reverse;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .benefit-card {
    padding: 1rem;
  }
  
  .trust-indicators {
    gap: 1rem;
  }
  
  .trust-number {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .benefit-card h3 {
    font-size: 1rem;
  }
  
  .benefit-card p {
    font-size: 0.85rem;
  }
  
  .trust-indicators {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
