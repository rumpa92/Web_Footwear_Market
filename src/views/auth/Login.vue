<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1 class="welcome-title">Welcome Back</h1>
          <p class="welcome-subtitle">Enter your details to continue</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              class="form-input"
              placeholder="Enter your email"
              required
              :class="{ 'input-error': errors.email }"
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <div class="password-input-container">
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input password-input"
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

          <div class="form-options">
            <label class="checkbox-container">
              <input
                v-model="formData.rememberMe"
                type="checkbox"
                class="form-checkbox"
              />
              <span class="checkbox-label">Remember me</span>
            </label>
            <router-link to="/forgot-password" class="forgot-password-link">
              Forgot Password?
            </router-link>
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-full sign-in-btn"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="loading-spinner"></span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <div class="divider">
          <span class="divider-text">or</span>
        </div>

        <div class="social-login-options">
          <button
            @click="handleGoogleLogin"
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
            @click="handleAppleLogin"
            class="social-btn apple-btn"
            :disabled="isLoading"
          >
            <svg class="social-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Continue with Apple
          </button>
        </div>

        <div class="signup-prompt">
          <span class="signup-text">Don't have an account?</span>
          <router-link to="/register" class="signup-link">Sign Up</router-link>
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
      showPassword: false
    }
  },
  methods: {
    async handleLogin() {
      if (!this.validateForm()) return

      this.isLoading = true
      this.errors = {}

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock successful login
        if (this.formData.email === 'test@example.com' && this.formData.password === 'password') {
          this.$router.push('/')
        } else {
          this.errors.general = 'Invalid email or password'
        }
      } catch (error) {
        this.errors.general = 'An error occurred. Please try again.'
      } finally {
        this.isLoading = false
      }
    },
    
    async handleGoogleLogin() {
      this.isLoading = true
      try {
        // Simulate Google OAuth flow
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Google login initiated')
        // In a real app, you would integrate with Google OAuth
        this.$router.push('/')
      } catch (error) {
        console.error('Google login failed:', error)
      } finally {
        this.isLoading = false
      }
    },
    
    async handleAppleLogin() {
      this.isLoading = true
      try {
        // Simulate Apple OAuth flow
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Apple login initiated')
        // In a real app, you would integrate with Apple Sign In
        this.$router.push('/')
      } catch (error) {
        console.error('Apple login failed:', error)
      } finally {
        this.isLoading = false
      }
    },
    
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    
    validateForm() {
      this.errors = {}
      let isValid = true

      if (!this.formData.email) {
        this.errors.email = 'Email is required'
        isValid = false
      } else if (!this.isValidEmail(this.formData.email)) {
        this.errors.email = 'Please enter a valid email'
        isValid = false
      }

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
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: var(--space-md);
}

.login-container {
  width: 100%;
  max-width: 420px;
}

.login-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-2xl);
  box-shadow: var(--shadow-xl);
  padding: var(--space-2xl);
  border: 1px solid var(--border-light);
}

.login-header {
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

.login-form {
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

.form-input {
  width: 100%;
  padding: var(--space-md);
  font-size: var(--font-size-base);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition-fast);
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.input-error {
  border-color: var(--error-color);
}

.password-input-container {
  position: relative;
}

.password-input {
  padding-right: 3rem;
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
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.form-checkbox {
  margin-right: var(--space-sm);
  cursor: pointer;
}

.checkbox-label {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  cursor: pointer;
  user-select: none;
}

.forgot-password-link {
  font-size: var(--font-size-sm);
  color: #667eea;
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: var(--transition-fast);
}

.forgot-password-link:hover {
  color: #5a67d8;
  text-decoration: underline;
}

.sign-in-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: var(--text-white);
  font-weight: var(--font-weight-semibold);
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-base);
  margin-bottom: var(--space-lg);
  transition: var(--transition-normal);
  box-shadow: 0 4px 14px 0 rgba(102, 126, 234, 0.3);
}

.sign-in-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px 0 rgba(102, 126, 234, 0.4);
}

.sign-in-btn:disabled {
  opacity: 0.7;
  transform: none;
  cursor: not-allowed;
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

.social-login-options {
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

.signup-prompt {
  text-align: center;
  padding-top: var(--space-lg);
  border-top: 1px solid var(--border-light);
}

.signup-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-right: var(--space-xs);
}

.signup-link {
  font-size: var(--font-size-sm);
  color: #667eea;
  text-decoration: none;
  font-weight: var(--font-weight-semibold);
  transition: var(--transition-fast);
}

.signup-link:hover {
  color: #5a67d8;
  text-decoration: underline;
}

/* Mobile responsiveness */
@media (max-width: 480px) {
  .login-page {
    padding: var(--space-sm);
  }
  
  .login-card {
    padding: var(--space-xl);
  }
  
  .welcome-title {
    font-size: var(--font-size-2xl);
  }
  
  .social-login-options {
    gap: var(--space-sm);
  }
  
  .social-btn {
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-size-sm);
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
</style>
