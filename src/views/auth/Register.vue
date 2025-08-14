<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <h1 class="welcome-title">Welcome Back</h1>
          <p class="welcome-subtitle">Create your account</p>
        </div>

        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-group">
            <label for="name" class="form-label">Name</label>
            <div class="input-container">
              <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                class="form-input input-with-icon"
                placeholder="Enter your name"
                required
                :class="{ 'input-error': errors.name }"
              />
            </div>
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <div class="input-container">
              <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="form-input input-with-icon"
                placeholder="Email"
                required
                :class="{ 'input-error': errors.email }"
              />
            </div>
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <div class="input-container">
              <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input input-with-icon password-input"
                placeholder="Enter your password"
                required
                :class="{ 'input-error': errors.password }"
              />
              <button
                type="button"
                @click="togglePassword"
                class="password-toggle-btn"
                aria-label="Toggle password visibility"
              >
                <svg v-if="showPassword" class="password-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L15.121 15.121M15.121 15.121L21 21"></path>
                </svg>
                <svg v-else class="password-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>

          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <div class="input-container">
              <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <input
                id="confirmPassword"
                v-model="formData.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="form-input input-with-icon password-input"
                placeholder="Enter your confirm password"
                required
                :class="{ 'input-error': errors.confirmPassword }"
              />
              <button
                type="button"
                @click="toggleConfirmPassword"
                class="password-toggle-btn"
                aria-label="Toggle confirm password visibility"
              >
                <svg v-if="showConfirmPassword" class="password-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L15.121 15.121M15.121 15.121L21 21"></path>
                </svg>
                <svg v-else class="password-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
            <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
          </div>

          <div class="terms-agreement">
            <label class="checkbox-container">
              <input
                v-model="formData.agreeToTerms"
                type="checkbox"
                class="form-checkbox"
                required
              />
              <span class="checkbox-label">
                I agree to the 
                <a href="/terms" class="terms-link">Terms of Service</a> 
                and 
                <a href="/privacy" class="terms-link">Privacy Policy</a>
              </span>
            </label>
            <span v-if="errors.agreeToTerms" class="error-message">{{ errors.agreeToTerms }}</span>
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-full sign-up-btn"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="loading-spinner"></span>
            <span v-else>Sign Up</span>
          </button>

          <div v-if="errors.general" class="general-error">
            {{ errors.general }}
          </div>
        </form>

        <div class="divider">
          <span class="divider-text">or</span>
        </div>

        <div class="social-signup-options">
          <button
            @click="handleGoogleSignup"
            class="social-btn google-btn"
            :disabled="isLoading"
          >
            <svg class="social-icon" viewBox="0 0 24 24">
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
            <svg class="social-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Continue with Apple
          </button>
        </div>

        <div class="signin-prompt">
          <span class="signin-text">You already have account?</span>
          <router-link to="/login" class="signin-link">Sign in</router-link>
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
        agreeToTerms: false
      },
      errors: {},
      isLoading: false,
      showPassword: false,
      showConfirmPassword: false
    }
  },
  methods: {
    async handleRegister() {
      if (!this.validateForm()) return

      this.isLoading = true
      this.errors = {}

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Mock successful registration
        console.log('Registration successful', this.formData)
        
        // Redirect to login or dashboard
        this.$router.push('/login')
      } catch (error) {
        this.errors.general = 'Registration failed. Please try again.'
      } finally {
        this.isLoading = false
      }
    },
    
    async handleGoogleSignup() {
      this.isLoading = true
      try {
        // Simulate Google OAuth flow
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Google signup initiated')
        // In a real app, you would integrate with Google OAuth
        this.$router.push('/')
      } catch (error) {
        console.error('Google signup failed:', error)
      } finally {
        this.isLoading = false
      }
    },
    
    async handleAppleSignup() {
      this.isLoading = true
      try {
        // Simulate Apple OAuth flow
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Apple signup initiated')
        // In a real app, you would integrate with Apple Sign In
        this.$router.push('/')
      } catch (error) {
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
    
    validateForm() {
      this.errors = {}
      let isValid = true

      // Name validation
      if (!this.formData.name.trim()) {
        this.errors.name = 'Name is required'
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
        this.errors.email = 'Please enter a valid email'
        isValid = false
      }

      // Password validation
      if (!this.formData.password) {
        this.errors.password = 'Password is required'
        isValid = false
      } else if (this.formData.password.length < 8) {
        this.errors.password = 'Password must be at least 8 characters'
        isValid = false
      } else if (!this.isStrongPassword(this.formData.password)) {
        this.errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
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

      // Terms agreement validation
      if (!this.formData.agreeToTerms) {
        this.errors.agreeToTerms = 'You must agree to the Terms of Service and Privacy Policy'
        isValid = false
      }

      return isValid
    },
    
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    
    isStrongPassword(password) {
      const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
      return strongRegex.test(password)
    }
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: var(--space-md);
}

.register-container {
  width: 100%;
  max-width: 450px;
}

.register-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-2xl);
  box-shadow: var(--shadow-xl);
  padding: var(--space-2xl);
  border: 1px solid var(--border-light);
}

.register-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.welcome-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0 0 var(--space-sm) 0;
  line-height: var(--line-height-tight);
}

.welcome-subtitle {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  margin: 0;
  line-height: var(--line-height-normal);
}

.register-form {
  margin-bottom: var(--space-xl);
}

.form-group {
  margin-bottom: var(--space-lg);
}

.form-label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.input-container {
  position: relative;
}

.input-icon {
  position: absolute;
  left: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: var(--text-secondary);
  z-index: 1;
}

.form-input {
  width: 100%;
  padding: var(--space-md);
  font-size: var(--font-size-base);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  transition: var(--transition-fast);
  box-sizing: border-box;
}

.input-with-icon {
  padding-left: 3rem;
}

.password-input {
  padding-right: 3rem;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background-color: var(--bg-primary);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.input-error {
  border-color: var(--error-color);
  background-color: rgba(231, 76, 60, 0.05);
}

.password-toggle-btn {
  position: absolute;
  right: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.password-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.error-message {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--error-color);
  margin-top: var(--space-xs);
  line-height: var(--line-height-normal);
}

.terms-agreement {
  margin-bottom: var(--space-xl);
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  gap: var(--space-sm);
}

.form-checkbox {
  margin-top: 2px;
  cursor: pointer;
  flex-shrink: 0;
}

.checkbox-label {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  cursor: pointer;
  user-select: none;
  line-height: var(--line-height-normal);
}

.terms-link {
  color: #667eea;
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.terms-link:hover {
  text-decoration: underline;
}

.sign-up-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: var(--text-white);
  font-weight: var(--font-weight-semibold);
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-base);
  margin-bottom: var(--space-md);
  transition: var(--transition-normal);
  box-shadow: 0 4px 14px 0 rgba(102, 126, 234, 0.3);
}

.sign-up-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px 0 rgba(102, 126, 234, 0.4);
}

.sign-up-btn:disabled {
  opacity: 0.7;
  transform: none;
  cursor: not-allowed;
}

.general-error {
  background-color: rgba(231, 76, 60, 0.1);
  color: var(--error-color);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  text-align: center;
  margin-top: var(--space-sm);
}

.divider {
  position: relative;
  text-align: center;
  margin: var(--space-xl) 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--border-color);
}

.divider-text {
  background-color: var(--bg-primary);
  padding: 0 var(--space-md);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  position: relative;
}

.social-signup-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: var(--transition-fast);
  text-decoration: none;
}

.social-btn:hover:not(:disabled) {
  border-color: var(--border-dark);
  background-color: var(--bg-secondary);
  transform: translateY(-1px);
}

.social-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.social-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.google-btn:hover:not(:disabled) {
  border-color: #4285F4;
  background-color: rgba(66, 133, 244, 0.05);
}

.apple-btn:hover:not(:disabled) {
  border-color: #000;
  background-color: rgba(0, 0, 0, 0.05);
}

.signin-prompt {
  text-align: center;
  padding-top: var(--space-lg);
  border-top: 1px solid var(--border-light);
}

.signin-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-right: var(--space-xs);
}

.signin-link {
  font-size: var(--font-size-sm);
  color: #667eea;
  text-decoration: none;
  font-weight: var(--font-weight-semibold);
  transition: var(--transition-fast);
}

.signin-link:hover {
  color: #5a67d8;
  text-decoration: underline;
}

/* Mobile responsiveness */
@media (max-width: 480px) {
  .register-page {
    padding: var(--space-sm);
  }
  
  .register-card {
    padding: var(--space-xl);
  }
  
  .welcome-title {
    font-size: var(--font-size-2xl);
  }
  
  .social-signup-options {
    gap: var(--space-sm);
  }
  
  .social-btn {
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-size-sm);
  }
  
  .checkbox-label {
    font-size: var(--font-size-xs);
  }
}

/* Loading state */
.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Form field animations */
.form-input:focus + .input-icon,
.form-input:not(:placeholder-shown) + .input-icon {
  color: #667eea;
}

/* Password strength indicator */
.password-strength {
  margin-top: var(--space-xs);
  font-size: var(--font-size-xs);
}

.strength-weak { color: var(--error-color); }
.strength-medium { color: var(--warning-color); }
.strength-strong { color: var(--success-color); }
</style>
