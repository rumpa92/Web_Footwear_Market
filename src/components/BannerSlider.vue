<template>
  <div class="modern-hero">
    <!-- Animated Background -->
    <div class="hero-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>

    <div class="hero-container">
      <!-- Main Hero Content -->
      <div class="hero-main">
        <div class="hero-content">
          <!-- Left Content -->
          <div class="content-left">
            <div class="hero-badge">
              <span class="badge-pulse"></span>
              <span class="badge-text">New Collection 2024</span>
            </div>
            
            <h1 class="hero-title">
              <span class="title-line">Discover Your</span>
              <span class="title-main">Perfect</span>
              <span class="title-highlight">Footwear</span>
            </h1>

            <p class="hero-subtitle">
              Premium collection of sneakers, boots, and dress shoes. 
              Crafted with precision for ultimate comfort and style.
            </p>

            <div class="hero-features">
              <div class="feature">
                <div class="feature-icon">⚡</div>
                <span>Lightning Fast Delivery</span>
              </div>
              <div class="feature">
                <div class="feature-icon">🏆</div>
                <span>Premium Quality</span>
              </div>
              <div class="feature">
                <div class="feature-icon">💎</div>
                <span>Exclusive Designs</span>
              </div>
            </div>

            <div class="hero-actions">
              <router-link to="/products" class="cta-button primary">
                <span>Shop Now</span>
                <div class="button-glow"></div>
              </router-link>
              <router-link to="/products?category=new" class="cta-button secondary">
                <span>View Collection</span>
              </router-link>
            </div>

            <div class="social-proof">
              <div class="proof-item">
                <span class="proof-number">10K+</span>
                <span class="proof-text">Happy Customers</span>
              </div>
              <div class="proof-item">
                <span class="proof-number">500+</span>
                <span class="proof-text">Premium Brands</span>
              </div>
              <div class="proof-item">
                <span class="proof-number">4.9★</span>
                <span class="proof-text">Customer Rating</span>
              </div>
            </div>
          </div>

          <!-- Right Content - Product Showcase -->
          <div class="content-right">
            <div class="product-showcase">
              <!-- Main Featured Product -->
              <div class="featured-shoe">
                <div class="shoe-glow"></div>
                <img 
                  :src="currentProduct.image" 
                  :alt="currentProduct.name" 
                  class="shoe-image"
                />
                <div class="product-info-card">
                  <h3>{{ currentProduct.name }}</h3>
                  <div class="price-tag">
                    <span class="current-price">${{ currentProduct.price }}</span>
                    <span class="original-price" v-if="currentProduct.originalPrice">
                      ${{ currentProduct.originalPrice }}
                    </span>
                  </div>
                  <div class="rating">
                    <span class="stars">★★★★★</span>
                    <span class="rating-count">({{ currentProduct.reviews }})</span>
                  </div>
                </div>
              </div>

              <!-- Product Thumbnails -->
              <div class="product-thumbnails">
                <div 
                  v-for="(product, index) in products" 
                  :key="index"
                  class="thumbnail"
                  :class="{ active: index === currentIndex }"
                  @click="switchProduct(index)"
                >
                  <img :src="product.image" :alt="product.name" />
                </div>
              </div>

              <!-- Floating Badges -->
              <div class="floating-badges">
                <div class="floating-badge badge-discount">
                  <span>30% OFF</span>
                </div>
                <div class="floating-badge badge-free">
                  <span>Free Shipping</span>
                </div>
                <div class="floating-badge badge-quality">
                  <span>Premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Stats Bar -->
      <div class="stats-bar">
        <div class="stat-item">
          <div class="stat-icon">🚚</div>
          <span>Free Delivery</span>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🔄</div>
          <span>30-Day Returns</span>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🛡️</div>
          <span>Secure Payment</span>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🎯</div>
          <span>Perfect Fit Guarantee</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BannerSlider',
  data() {
    return {
      currentIndex: 0,
      products: [
        {
          name: 'Air Max Premium',
          price: 149.99,
          originalPrice: 179.99,
          reviews: 2847,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&q=80'
        },
        {
          name: 'Sport Elite Pro',
          price: 129.99,
          originalPrice: 159.99,
          reviews: 1923,
          image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=800&fit=crop&q=80'
        },
        {
          name: 'Urban Runner',
          price: 89.99,
          reviews: 3104,
          image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop&q=80'
        },
        {
          name: 'Classic Leather',
          price: 199.99,
          originalPrice: 249.99,
          reviews: 856,
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop&q=80'
        }
      ]
    }
  },
  computed: {
    currentProduct() {
      return this.products[this.currentIndex]
    }
  },
  mounted() {
    this.startAutoRotation()
  },
  beforeDestroy() {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval)
    }
  },
  methods: {
    switchProduct(index) {
      this.currentIndex = index
    },
    startAutoRotation() {
      this.rotationInterval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.products.length
      }, 4000)
    }
  }
}
</script>

<style scoped>
.modern-hero {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b69 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.6;
  animation: float 6s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  top: -200px;
  right: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #10b981, #3b82f6);
  bottom: -150px;
  left: -150px;
  animation-delay: 2s;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(45deg, #f59e0b, #ef4444);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 4s;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  animation: drift 8s ease-in-out infinite;
}

.shape-1 {
  width: 60px;
  height: 60px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 40px;
  height: 40px;
  top: 60%;
  right: 20%;
  animation-delay: 2s;
}

.shape-3 {
  width: 80px;
  height: 80px;
  bottom: 30%;
  left: 30%;
  animation-delay: 4s;
}

.shape-4 {
  width: 50px;
  height: 50px;
  top: 40%;
  right: 10%;
  animation-delay: 6s;
}

.hero-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 10;
}

.hero-main {
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
}

.content-left {
  color: white;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  margin-bottom: 2rem;
}

.badge-pulse {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.badge-text {
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.title-line {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  font-size: 2.5rem;
  font-weight: 500;
}

.title-main {
  display: block;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}

.title-highlight {
  display: block;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #10b981);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease-in-out infinite;
}

.hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  max-width: 500px;
}

.hero-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.feature-icon {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.cta-button.primary {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.6);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.button-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.cta-button.primary:hover .button-glow {
  left: 100%;
}

.social-proof {
  display: flex;
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.proof-item {
  text-align: center;
}

.proof-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
  line-height: 1;
}

.proof-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.content-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-showcase {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.featured-shoe {
  position: relative;
  text-align: center;
  z-index: 10;
}

.shoe-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(50px);
  animation: glow 3s ease-in-out infinite alternate;
}

.shoe-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));
  transition: transform 0.5s ease;
  animation: levitate 4s ease-in-out infinite;
}

.shoe-image:hover {
  transform: scale(1.05) rotateY(10deg);
}

.product-info-card {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 1rem 1.5rem;
  color: white;
  text-align: center;
  min-width: 200px;
}

.product-info-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.price-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.current-price {
  font-size: 1.3rem;
  font-weight: 900;
  color: #10b981;
}

.original-price {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: line-through;
}

.rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.stars {
  color: #fbbf24;
}

.rating-count {
  color: rgba(255, 255, 255, 0.7);
}

.product-thumbnails {
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 20;
}

.thumbnail {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.thumbnail.active {
  border-color: #3b82f6;
  transform: scale(1.1);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.floating-badges {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-badge {
  position: absolute;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  animation: bobbing 3s ease-in-out infinite;
}

.badge-discount {
  top: 10%;
  right: -20px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  animation-delay: 0s;
}

.badge-free {
  bottom: 40%;
  left: -30px;
  background: linear-gradient(135deg, #10b981, #059669);
  animation-delay: 1s;
}

.badge-quality {
  top: 60%;
  right: -40px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  animation-delay: 2s;
}

.stats-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 1rem 2rem;
  margin-top: 3rem;
  color: white;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.stat-icon {
  font-size: 1.2rem;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}

@keyframes drift {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-10px) translateX(10px); }
  50% { transform: translateY(-20px) translateX(-5px); }
  75% { transform: translateY(-5px) translateX(-10px); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes glow {
  0% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
}

@keyframes levitate {
  0%, 100% { transform: translateY(0px) rotateZ(0deg); }
  25% { transform: translateY(-10px) rotateZ(1deg); }
  50% { transform: translateY(-5px) rotateZ(0deg); }
  75% { transform: translateY(-15px) rotateZ(-1deg); }
}

@keyframes bobbing {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .title-line {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .modern-hero {
    min-height: 90vh;
  }
  
  .hero-container {
    padding: 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .title-line {
    font-size: 1.5rem;
  }
  
  .hero-actions {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .cta-button {
    width: 100%;
  }
  
  .social-proof {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .stats-bar {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
  
  .floating-badge {
    display: none;
  }
}
</style>
