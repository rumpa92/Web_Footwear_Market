<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-section">
          <div class="footer-brand">
            <span class="footer-logo">👟 FootMarket</span>
            <p class="footer-description">
              Premium footwear marketplace offering the latest styles from top brands.
              Quality, comfort, and style in every step.
            </p>
          </div>
          
          <!-- Social Links -->
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Facebook">
              <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.73-3.016-1.804-.318-.601-.5-1.29-.5-2.023 0-2.367 1.917-4.283 4.284-4.283.732 0 1.421.183 2.023.5 1.075.567 1.804 1.718 1.804 3.015-.001 2.367-1.918 4.284-4.285 4.284l-.31.001zm7.424-5.306c0 .211-.024.42-.071.624-.396 1.71-1.944 2.99-3.787 2.99-2.137 0-3.87-1.733-3.87-3.87s1.733-3.87 3.87-3.87c2.136 0 3.87 1.733 3.87 3.87-.001.085-.006.17-.012.256z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="YouTube">
              <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Links Sections -->
        <div class="footer-links">
          <div class="link-group">
            <h3 class="link-title">Shop by Category</h3>
            <ul class="link-list">
              <li><router-link to="/products" class="footer-link">All Products</router-link></li>
              <li><router-link to="/products?category=men" class="footer-link">Men's Footwear</router-link></li>
              <li><router-link to="/products?category=women" class="footer-link">Women's Footwear</router-link></li>
              <li><router-link to="/products?category=kids" class="footer-link">Kids' Footwear</router-link></li>
              <li><router-link to="/products?category=running" class="footer-link">Running Shoes</router-link></li>
              <li><router-link to="/products?category=lifestyle" class="footer-link">Lifestyle</router-link></li>
            </ul>
          </div>

          <div class="link-group">
            <h3 class="link-title">Popular Categories</h3>
            <ul class="link-list">
              <li><router-link to="/products?category=premium" class="footer-link">Premium Collection</router-link></li>
              <li><router-link to="/products?category=casual" class="footer-link">Casual Shoes</router-link></li>
              <li><router-link to="/products?category=basketball" class="footer-link">Basketball</router-link></li>
              <li><router-link to="/products?category=training" class="footer-link">Training</router-link></li>
              <li><router-link to="/products?filter=new" class="footer-link">New Arrivals</router-link></li>
              <li><router-link to="/sale" class="footer-link">Sale Items</router-link></li>
            </ul>
          </div>

          <div class="link-group">
            <h3 class="link-title">Top Brands</h3>
            <ul class="link-list">
              <li><router-link to="/brands/nike" class="footer-link">Nike</router-link></li>
              <li><router-link to="/brands/adidas" class="footer-link">Adidas</router-link></li>
              <li><router-link to="/brands/jordan" class="footer-link">Jordan</router-link></li>
              <li><router-link to="/brands/converse" class="footer-link">Converse</router-link></li>
              <li><router-link to="/brands/puma" class="footer-link">Puma</router-link></li>
              <li><router-link to="/brands/new-balance" class="footer-link">New Balance</router-link></li>
            </ul>
          </div>

          <div class="link-group">
            <h3 class="link-title">Customer Care</h3>
            <ul class="link-list">
              <li><router-link to="/contact" class="footer-link">Contact Us</router-link></li>
              <li><router-link to="/size-guide" class="footer-link">Size Guide</router-link></li>
              <li><router-link to="/shipping" class="footer-link">Shipping Info</router-link></li>
              <li><router-link to="/returns" class="footer-link">Returns</router-link></li>
              <li><router-link to="/faq" class="footer-link">FAQ</router-link></li>
              <li><router-link to="/support" class="footer-link">Support</router-link></li>
            </ul>
          </div>

          <div class="link-group">
            <h3 class="link-title">Company</h3>
            <ul class="link-list">
              <li><router-link to="/about" class="footer-link">About Us</router-link></li>
              <li><router-link to="/careers" class="footer-link">Careers</router-link></li>
              <li><router-link to="/press" class="footer-link">Press</router-link></li>
              <li><router-link to="/privacy" class="footer-link">Privacy Policy</router-link></li>
              <li><router-link to="/terms" class="footer-link">Terms of Service</router-link></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Newsletter Section -->
      <div class="newsletter-section">
        <div class="newsletter-content">
          <div class="newsletter-text">
            <h3 class="newsletter-title">Stay in the Loop</h3>
            <p class="newsletter-description">
              Get exclusive access to new arrivals, special offers, and style updates.
            </p>
          </div>
          <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
            <div class="newsletter-input-group">
              <input
                type="email"
                placeholder="Enter your email"
                class="newsletter-input"
                v-model="email"
                required
              />
              <button type="submit" class="newsletter-btn">Subscribe</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">
            © 2024 FootMarket. All rights reserved.
          </p>
          <div class="payment-methods">
            <span class="payment-text">We accept:</span>
            <div class="payment-icons">
              <div class="payment-card">VISA</div>
              <div class="payment-card">MC</div>
              <div class="payment-card">AMEX</div>
              <div class="payment-card">PP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    subscribeNewsletter() {
      if (this.email) {
        // Handle newsletter subscription
        console.log('Newsletter subscription:', this.email)
        this.email = ''
        // Show success message
      }
    }
  }
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: var(--text-white);
  margin-top: auto;
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
}

.footer-content {
  padding: var(--space-3xl) 0 var(--space-xl);
  display: grid;
  gap: var(--space-xl);
  grid-template-columns: 1fr;
}

.footer-section {
  grid-column: 1 / -1;
}

.footer-brand {
  margin-bottom: var(--space-lg);
}

.footer-logo {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-white);
  display: block;
  margin-bottom: var(--space-md);
}

.footer-description {
  color: #bdc3c7;
  line-height: var(--line-height-relaxed);
  max-width: 400px;
}

.social-links {
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-full);
  color: var(--text-white);
  transition: var(--transition-normal);
}

.social-link:hover {
  background-color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(52, 152, 219, 0.3);
}

.social-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-xl);
}

.link-group {
  display: flex;
  flex-direction: column;
}

.link-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-white);
  margin-bottom: var(--space-md);
  position: relative;
}

.link-title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 30px;
  height: 2px;
  background-color: var(--accent-color);
  border-radius: 2px;
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-list li {
  margin-bottom: var(--space-sm);
}

.footer-link {
  color: #bdc3c7;
  font-size: var(--font-size-sm);
  transition: var(--transition-fast);
}

.footer-link:hover {
  color: var(--accent-color);
  padding-left: var(--space-xs);
}

.newsletter-section {
  padding: var(--space-xl) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.newsletter-content {
  display: grid;
  gap: var(--space-lg);
  grid-template-columns: 1fr;
  align-items: center;
}

.newsletter-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-white);
  margin-bottom: var(--space-sm);
}

.newsletter-description {
  color: #bdc3c7;
  font-size: var(--font-size-base);
}

.newsletter-form {
  width: 100%;
  max-width: 400px;
}

.newsletter-input-group {
  display: flex;
  gap: var(--space-sm);
}

.newsletter-input {
  flex: 1;
  padding: var(--space-md);
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius-md);
  color: var(--text-white);
  font-size: var(--font-size-base);
}

.newsletter-input::placeholder {
  color: #bdc3c7;
}

.newsletter-input:focus {
  outline: none;
  border-color: var(--accent-color);
  background-color: rgba(255, 255, 255, 0.15);
}

.newsletter-btn {
  padding: var(--space-md) var(--space-lg);
  background-color: var(--accent-color);
  color: var(--text-white);
  border: none;
  border-radius: var(--border-radius-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: var(--transition-fast);
}

.newsletter-btn:hover {
  background-color: var(--accent-dark);
}

.footer-bottom {
  padding: var(--space-lg) 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.copyright {
  color: #bdc3c7;
  font-size: var(--font-size-sm);
}

.payment-methods {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.payment-text {
  color: #bdc3c7;
  font-size: var(--font-size-sm);
}

.payment-icons {
  display: flex;
  gap: var(--space-sm);
}

.payment-card {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-white);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: var(--transition-fast);
}

.payment-card:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr 2fr;
    gap: var(--space-2xl);
  }
  
  .footer-section {
    grid-column: 1;
  }
  
  .footer-links {
    grid-column: 2;
  }
  
  .newsletter-content {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 767px) {
  .newsletter-input-group {
    flex-direction: column;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
