<template>
  <div class="banner-slider">
    <div class="slider-container">
      <div class="slides-wrapper" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div 
          v-for="(slide, index) in slides" 
          :key="index" 
          class="slide"
          :class="{ active: index === currentSlide }"
        >
          <div class="slide-content">
            <div class="slide-text">
              <div class="slide-badge">{{ slide.badge }}</div>
              <h1 class="slide-title">{{ slide.title }}</h1>
              <h2 class="slide-subtitle">{{ slide.subtitle }}</h2>
              <p class="slide-description">{{ slide.description }}</p>

              <!-- Features List -->
              <div class="slide-features" v-if="slide.features">
                <div class="feature-item" v-for="feature in slide.features" :key="feature">
                  <span class="feature-check">✓</span>
                  <span class="feature-text">{{ feature }}</span>
                </div>
              </div>

              <div class="slide-actions">
                <router-link :to="slide.buttonLink" class="slide-btn primary">
                  <span>{{ slide.buttonText }}</span>
                  <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </router-link>
                <router-link to="/products" class="slide-btn secondary">
                  <span>View All</span>
                </router-link>
              </div>

              <div class="slide-stats">
                <div class="stat-item">
                  <span class="stat-number">50K+</span>
                  <span class="stat-label">Happy Customers</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">4.9★</span>
                  <span class="stat-label">Rating</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">24/7</span>
                  <span class="stat-label">Support</span>
                </div>
              </div>
            </div>
            <div class="slide-image">
              <img :src="slide.image" :alt="slide.title" />
              <div class="discount-badge" v-if="slide.discount">
                <span class="discount-text">{{ slide.discount }}%<br>OFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button class="nav-arrow prev" @click="prevSlide" :disabled="currentSlide === 0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button class="nav-arrow next" @click="nextSlide" :disabled="currentSlide === slides.length - 1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <!-- Slide Indicators -->
      <div class="slide-indicators">
        <button 
          v-for="(slide, index) in slides" 
          :key="index"
          class="indicator"
          :class="{ active: index === currentSlide }"
          @click="goToSlide(index)"
        ></button>
      </div>

      <!-- Logo -->
      <div class="banner-logo">
        <span>FOOTMARKET</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BannerSlider',
  data() {
    return {
      currentSlide: 0,
      autoSlideInterval: null,
      slides: [
        {
          badge: '🔥 New Collection 2024',
          title: 'PREMIUM',
          subtitle: 'SNEAKERS',
          description: 'Experience the perfect blend of style and comfort with our exclusive premium collection. Engineered for the modern lifestyle.',
          buttonText: 'SHOP PREMIUM',
          buttonLink: '/products?category=premium',
          image: 'https://cdn.builder.io/api/v1/image/assets%2F320fdd3319e444dc921d47bac71874f5%2F98ec80592d7444cbb4f2e6ed9630a8fe?format=webp&width=800',
          discount: 75,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          features: ['Premium Materials', 'All-Day Comfort', 'Limited Stock']
        },
        {
          badge: '⚡ Performance Ready',
          title: 'ATHLETIC',
          subtitle: 'EXCELLENCE',
          description: 'Dominate every workout with cutting-edge athletic footwear. Built for champions, designed for victory.',
          buttonText: 'GEAR UP NOW',
          buttonLink: '/products?category=sports',
          image: 'https://images.unsplash.com/photo-1608667508764-33cf0726aae8?w=600&h=600&fit=crop',
          discount: 60,
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
          features: ['Pro Performance', 'Impact Protection', 'Breathable Design']
        },
        {
          badge: '✨ Exclusive Edition',
          title: 'LUXURY',
          subtitle: 'CRAFTED',
          description: 'Handcrafted masterpieces that redefine elegance. Where traditional artistry meets contemporary innovation.',
          buttonText: 'EXPLORE LUXURY',
          buttonLink: '/products?category=luxury',
          image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=600&fit=crop',
          discount: 40,
          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
          features: ['Handcrafted', 'Italian Leather', 'Lifetime Quality']
        },
        {
          badge: '🌟 Customer Favorite',
          title: 'EVERYDAY',
          subtitle: 'COMFORT',
          description: 'Your perfect daily companion. Versatile designs that seamlessly transition from office to weekend adventures.',
          buttonText: 'SHOP COMFORT',
          buttonLink: '/products?category=casual',
          image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop',
          discount: 50,
          background: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
          features: ['All-Day Wear', 'Versatile Style', 'Memory Foam']
        },
        {
          badge: '👑 Trending Now',
          title: 'STREET',
          subtitle: 'CULTURE',
          description: 'Make a statement with our boldest designs. Where street culture meets high fashion in perfect harmony.',
          buttonText: 'JOIN THE TREND',
          buttonLink: '/products?category=streetwear',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop',
          discount: 65,
          background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
          features: ['Bold Designs', 'Street Style', 'Urban Culture']
        }
      ]
    }
  },
  mounted() {
    this.startAutoSlide()
  },
  beforeDestroy() {
    this.stopAutoSlide()
  },
  methods: {
    nextSlide() {
      if (this.currentSlide < this.slides.length - 1) {
        this.currentSlide++
      } else {
        this.currentSlide = 0
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--
      } else {
        this.currentSlide = this.slides.length - 1
      }
    },
    goToSlide(index) {
      this.currentSlide = index
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide()
      }, 5000)
    },
    stopAutoSlide() {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval)
      }
    }
  }
}
</script>

<style scoped>
.banner-slider {
  position: relative;
  height: 80vh;
  min-height: 600px;
  overflow: hidden;
  background: #000;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slides-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide {
  min-width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
}

.slide:nth-child(1) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.slide:nth-child(2) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.slide:nth-child(3) {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.slide:nth-child(4) {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.slide-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.slide-text {
  color: white;
  animation: slideInLeft 1s ease-out;
}

.slide.active .slide-text {
  animation: slideInLeft 1s ease-out;
}

.slide-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  letter-spacing: 1px;
}

.slide-title {
  font-size: 4rem;
  font-weight: 900;
  line-height: 0.9;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #ffd700);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.slide-subtitle {
  font-size: 3rem;
  font-weight: 700;
  line-height: 0.9;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 1.5rem;
}

.slide-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.95;
  max-width: 500px;
}

.slide-features {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.95rem;
  font-weight: 500;
}

.feature-check {
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: #4ade80;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.feature-text {
  color: rgba(255, 255, 255, 0.9);
}

.slide-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.slide-btn {
  padding: 1rem 2rem;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.slide-btn.primary {
  background: white;
  color: #333;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.slide-btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
  background: #f8f9fa;
}

.slide-btn.secondary {
  background: transparent;
  color: white;
  border-color: white;
}

.slide-btn.secondary:hover {
  background: white;
  color: #333;
  transform: translateY(-3px);
}

.btn-arrow {
  width: 16px;
  height: 16px;
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.slide-btn:hover .btn-arrow {
  transform: translateX(3px);
}

.slide-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.2rem;
  font-weight: 900;
  color: white;
  line-height: 1;
  margin-bottom: 0.3rem;
}

.stat-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.slide-contact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

.contact-icon {
  font-size: 1rem;
}

.slide-image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slideInRight 1s ease-out;
}

.slide.active .slide-image {
  animation: slideInRight 1s ease-out;
}

.slide-image img {
  max-width: 500px;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
}

.slide-image img:hover {
  transform: scale(1.05) rotate(-5deg);
}

.discount-badge {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(238, 90, 36, 0.4);
  animation: pulse 2s infinite;
}

.discount-text {
  color: white;
  font-size: 1.1rem;
  font-weight: 900;
  text-align: center;
  line-height: 1.2;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.nav-arrow:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%) scale(1.1);
}

.nav-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-arrow.prev {
  left: 2rem;
}

.nav-arrow.next {
  right: 2rem;
}

.nav-arrow svg {
  width: 24px;
  height: 24px;
}

.slide-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 10;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: white;
  transform: scale(1.2);
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.7);
}

.banner-logo {
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 10;
}

.banner-logo span {
  color: white;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 10px 30px rgba(238, 90, 36, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(238, 90, 36, 0.6);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 10px 30px rgba(238, 90, 36, 0.4);
  }
}

@media (max-width: 768px) {
  .banner-slider {
    height: 70vh;
    min-height: 500px;
  }

  .slide-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
    padding: 0 1rem;
  }

  .slide-title {
    font-size: 2.5rem;
  }

  .slide-subtitle {
    font-size: 2rem;
  }

  .slide-description {
    font-size: 1rem;
    margin: 0 auto 2rem;
  }

  .slide-actions {
    justify-content: center;
    flex-wrap: wrap;
  }

  .slide-btn {
    padding: 0.8rem 1.5rem;
    font-size: 0.8rem;
  }

  .slide-image img {
    max-width: 350px;
  }

  .discount-badge {
    width: 100px;
    height: 100px;
    top: -15px;
    right: -15px;
  }

  .discount-text {
    font-size: 1rem;
  }

  .nav-arrow {
    width: 50px;
    height: 50px;
  }

  .nav-arrow.prev {
    left: 1rem;
  }

  .nav-arrow.next {
    right: 1rem;
  }

  .banner-logo {
    top: 1rem;
    left: 1rem;
  }

  .banner-logo span {
    font-size: 1.2rem;
  }

  .slide-indicators {
    bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .slide-title {
    font-size: 2rem;
  }

  .slide-subtitle {
    font-size: 1.5rem;
  }

  .slide-actions {
    flex-direction: column;
    align-items: center;
  }

  .slide-btn {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
}
</style>
