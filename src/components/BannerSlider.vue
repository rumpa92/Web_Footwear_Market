<template>
  <div class="hero-banner">
    <div class="hero-container">
      <!-- Background Elements -->
      <div class="hero-background">
        <div class="bg-circle circle-1"></div>
        <div class="bg-circle circle-2"></div>
        <div class="bg-grid"></div>
      </div>

      <!-- Main Hero Content -->
      <div class="hero-content">
        <div class="hero-text-section">
          <div class="hero-badge">
            <span class="badge-icon">🔥</span>
            <span>Featured Collection</span>
          </div>
          
          <h1 class="hero-title">
            Step Into
            <span class="title-highlight">Style</span>
          </h1>
          
          <p class="hero-description">
            Discover premium footwear that combines comfort, style, and innovation. 
            From casual sneakers to professional dress shoes - find your perfect pair.
          </p>

          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">500+</span>
              <span class="stat-label">Premium Brands</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">50K+</span>
              <span class="stat-label">Happy Customers</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">4.9★</span>
              <span class="stat-label">Customer Rating</span>
            </div>
          </div>

          <div class="hero-actions">
            <router-link to="/products" class="hero-btn primary">
              <span>Shop Collection</span>
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </router-link>
            <button class="hero-btn secondary" @click="scrollToCategories">
              <span>Browse Categories</span>
            </button>
          </div>
        </div>

        <!-- Product Showcase -->
        <div class="hero-showcase">
          <div class="showcase-container">
            <!-- Featured Product -->
            <div class="featured-product">
              <div class="product-badge">Best Seller</div>
              <img 
                :src="featuredProduct.image" 
                :alt="featuredProduct.name"
                class="product-image"
              />
              <div class="product-info">
                <h3 class="product-name">{{ featuredProduct.name }}</h3>
                <div class="product-price">
                  <span class="current-price">${{ featuredProduct.price }}</span>
                  <span class="original-price" v-if="featuredProduct.originalPrice">
                    ${{ featuredProduct.originalPrice }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Product Grid -->
            <div class="product-grid">
              <div 
                v-for="(product, index) in showcaseProducts" 
                :key="index"
                class="grid-product"
                :class="`product-${index + 1}`"
              >
                <img :src="product.image" :alt="product.name" />
                <div class="product-overlay">
                  <span class="product-category">{{ product.category }}</span>
                  <span class="product-price">${{ product.price }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating Elements -->
          <div class="floating-elements">
            <div class="floating-badge badge-1">
              <span class="badge-text">Free Shipping</span>
            </div>
            <div class="floating-badge badge-2">
              <span class="badge-text">30-Day Returns</span>
            </div>
            <div class="floating-badge badge-3">
              <span class="badge-text">Premium Quality</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust Indicators -->
      <div class="trust-section">
        <div class="trust-item">
          <div class="trust-icon">🚚</div>
          <span>Free Delivery</span>
        </div>
        <div class="trust-item">
          <div class="trust-icon">🔄</div>
          <span>Easy Returns</span>
        </div>
        <div class="trust-item">
          <div class="trust-icon">⭐</div>
          <span>Premium Quality</span>
        </div>
        <div class="trust-item">
          <div class="trust-icon">🛡️</div>
          <span>Secure Payment</span>
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
      featuredProduct: {
        name: 'Premium Air Runner',
        price: 129.99,
        originalPrice: 159.99,
        image: 'https://cdn.builder.io/api/v1/image/assets%2F320fdd3319e444dc921d47bac71874f5%2F98ec80592d7444cbb4f2e6ed9630a8fe?format=webp&width=800'
      },
      showcaseProducts: [
        {
          name: 'Sports Elite',
          category: 'Athletic',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1608667508764-33cf0726aae8?w=300&h=300&fit=crop'
        },
        {
          name: 'Casual Comfort',
          category: 'Lifestyle',
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop'
        },
        {
          name: 'Business Class',
          category: 'Formal',
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=300&h=300&fit=crop'
        },
        {
          name: 'Urban Street',
          category: 'Trendy',
          price: 99.99,
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop'
        }
      ]
    }
  },
  methods: {
    scrollToCategories() {
      const categoriesSection = document.querySelector('.categories')
      if (categoriesSection) {
        categoriesSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
.hero-banner {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
}

.hero-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 10;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
}

.circle-1 {
  width: 400px;
  height: 400px;
  top: -200px;
  right: -200px;
}

.circle-2 {
  width: 300px;
  height: 300px;
  bottom: -150px;
  left: -150px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
}

.bg-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.5;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 80vh;
}

.hero-text-section {
  z-index: 20;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.badge-icon {
  font-size: 1rem;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 900;
  line-height: 1.1;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.02em;
}

.title-highlight {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #64748b;
  margin-bottom: 2rem;
  max-width: 500px;
}

.hero-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 1.5rem 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: 900;
  color: #1e293b;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #64748b;
  margin-top: 0.25rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.hero-btn.primary {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.hero-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
}

.hero-btn.secondary {
  background: white;
  color: #3b82f6;
  border: 2px solid #e2e8f0;
}

.hero-btn.secondary:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.btn-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.hero-btn:hover .btn-icon {
  transform: translateX(3px);
}

.hero-showcase {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.showcase-container {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.featured-product {
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 10;
}

.product-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.product-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
}

.product-info {
  text-align: center;
}

.product-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.product-price {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 900;
  color: #3b82f6;
}

.original-price {
  font-size: 1rem;
  color: #94a3b8;
  text-decoration: line-through;
}

.product-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.grid-product {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.grid-product img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 0.5rem;
  font-size: 0.7rem;
}

.product-category {
  display: block;
  font-weight: 600;
}

.product-1 {
  top: 10%;
  left: -40px;
  animation: float 3s ease-in-out infinite;
}

.product-2 {
  top: 60%;
  left: -30px;
  animation: float 3s ease-in-out infinite 0.5s;
}

.product-3 {
  top: 15%;
  right: -40px;
  animation: float 3s ease-in-out infinite 1s;
}

.product-4 {
  bottom: 20%;
  right: -30px;
  animation: float 3s ease-in-out infinite 1.5s;
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-badge {
  position: absolute;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
  font-weight: 600;
  color: #3b82f6;
}

.badge-1 {
  top: 20%;
  right: 50%;
  animation: bounce 2s ease-in-out infinite;
}

.badge-2 {
  bottom: 30%;
  left: 20%;
  animation: bounce 2s ease-in-out infinite 0.7s;
}

.badge-3 {
  top: 70%;
  right: 20%;
  animation: bounce 2s ease-in-out infinite 1.4s;
}

.trust-section {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 4rem;
  padding: 2rem 0;
  border-top: 1px solid #e2e8f0;
}

.trust-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #64748b;
}

.trust-icon {
  font-size: 1.5rem;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-title {
    font-size: 3.5rem;
  }

  .hero-stats {
    justify-content: center;
  }

  .trust-section {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    min-height: 90vh;
  }

  .hero-container {
    padding: 1rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-stats {
    gap: 1rem;
    flex-wrap: wrap;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .hero-btn {
    width: 100%;
    justify-content: center;
  }

  .trust-section {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .grid-product {
    width: 60px;
    height: 60px;
  }

  .floating-badge {
    display: none;
  }
}
</style>
