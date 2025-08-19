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
          <!-- Background Geometric Patterns -->
          <div class="slide-background">
            <div class="geometric-shape shape-1"></div>
            <div class="geometric-shape shape-2"></div>
            <div class="geometric-shape shape-3"></div>
            <div class="dots-pattern"></div>
          </div>

          <div class="slide-content">
            <div class="slide-text">
              <div class="slide-badge">{{ slide.badge }}</div>
              <h1 class="slide-title">{{ slide.title }}</h1>
              <h2 class="slide-subtitle">{{ slide.subtitle }}</h2>
              <p class="slide-description">{{ slide.description }}</p>
              
              <div class="slide-actions">
                <router-link :to="slide.buttonLink" class="slide-btn primary">
                  {{ slide.buttonText }}
                </router-link>
              </div>

              <div class="slide-contact">
                <span class="contact-website">www.footmarket.com</span>
              </div>
            </div>

            <div class="slide-image">
              <div class="discount-circle">
                <span class="discount-text">{{ slide.discount }}%<br>OFF</span>
              </div>
              <img :src="slide.image" :alt="slide.title" />
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button class="nav-arrow prev" @click="prevSlide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button class="nav-arrow next" @click="nextSlide">
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
          badge: 'NEW COLLECTION',
          title: 'RUNNING',
          subtitle: 'SHOES',
          description: 'Clean & Comfortable',
          buttonText: 'ORDER NOW',
          buttonLink: '/products?category=running',
          image: 'https://cdn.builder.io/api/v1/image/assets%2F320fdd3319e444dc921d47bac71874f5%2F98ec80592d7444cbb4f2e6ed9630a8fe?format=webp&width=800',
          discount: 30
        },
        {
          badge: 'ATHLETIC PERFORMANCE',
          title: 'SPORTS',
          subtitle: 'FOOTWEAR',
          description: 'Professional & Durable',
          buttonText: 'SHOP NOW',
          buttonLink: '/products?category=sports',
          image: 'https://images.unsplash.com/photo-1608667508764-33cf0726aae8?w=600&h=600&fit=crop',
          discount: 25
        },
        {
          badge: 'PREMIUM QUALITY',
          title: 'CASUAL',
          subtitle: 'LIFESTYLE',
          description: 'Style & Comfort Combined',
          buttonText: 'EXPLORE',
          buttonLink: '/products?category=casual',
          image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop',
          discount: 35
        },
        {
          badge: 'LUXURY EDITION',
          title: 'FORMAL',
          subtitle: 'COLLECTION',
          description: 'Elegant & Sophisticated',
          buttonText: 'VIEW COLLECTION',
          buttonLink: '/products?category=formal',
          image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=600&fit=crop',
          discount: 20
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
      }, 4000)
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
  width: 100%;
  height: 80vh;
  min-height: 600px;
  overflow: hidden;
  background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%);
  z-index: 1;
  display: block;
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
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
}

.slide {
  min-width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%);
  display: flex;
  align-items: center;
  overflow: hidden;
}

.slide-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
}

.geometric-shape {
  position: absolute;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.shape-1 {
  width: 300px;
  height: 200px;
  top: 10%;
  right: 15%;
  transform: rotate(15deg);
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
}

.shape-2 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 20%;
  transform: rotate(-25deg);
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03));
}

.shape-3 {
  width: 100px;
  height: 250px;
  top: 30%;
  right: 5%;
  transform: rotate(45deg);
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
}

.dots-pattern {
  position: absolute;
  top: 15%;
  right: 25%;
  width: 120px;
  height: 80px;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 2px, transparent 2px);
  background-size: 15px 15px;
  opacity: 0.6;
}

.slide-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 3rem;
  position: relative;
  z-index: 10;
}

.slide-text {
  color: white;
  z-index: 10;
}

.slide-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.slide-title {
  font-size: 5rem;
  font-weight: 900;
  line-height: 0.8;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
}

.slide-subtitle {
  font-size: 5rem;
  font-weight: 900;
  line-height: 0.8;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 1.5rem;
}

.slide-description {
  font-size: 1.3rem;
  line-height: 1.4;
  margin-bottom: 3rem;
  opacity: 0.95;
  font-weight: 500;
  letter-spacing: 1px;
}

.slide-actions {
  margin-bottom: 2rem;
}

.slide-btn {
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #1e40af;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.slide-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
  background: #f8f9fa;
}

.slide-contact {
  font-size: 0.9rem;
  opacity: 0.8;
  font-weight: 500;
}

.contact-website {
  color: white;
  letter-spacing: 0.5px;
}

.slide-image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.slide-image img {
  max-width: 450px;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
}

.slide-image img:hover {
  transform: scale(1.05) rotate(-5deg);
}

.discount-circle {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
  z-index: 20;
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
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 20;
}

.nav-arrow:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.1);
}

.nav-arrow.prev {
  left: 2rem;
}

.nav-arrow.next {
  right: 2rem;
}

.nav-arrow svg {
  width: 20px;
  height: 20px;
}

.slide-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 20;
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
  transform: scale(1.3);
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.7);
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
    padding: 0 1.5rem;
  }

  .slide-title {
    font-size: 3rem;
  }

  .slide-subtitle {
    font-size: 3rem;
  }

  .slide-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .slide-image img {
    max-width: 300px;
  }

  .discount-circle {
    width: 100px;
    height: 100px;
    top: -20px;
    right: -20px;
  }

  .discount-text {
    font-size: 1rem;
  }

  .nav-arrow {
    width: 40px;
    height: 40px;
  }

  .nav-arrow.prev {
    left: 1rem;
  }

  .nav-arrow.next {
    right: 1rem;
  }

  .slide-indicators {
    bottom: 1rem;
  }

  .shape-1 {
    width: 200px;
    height: 150px;
  }

  .shape-2 {
    width: 100px;
    height: 100px;
  }

  .shape-3 {
    width: 80px;
    height: 180px;
  }

  .dots-pattern {
    width: 80px;
    height: 60px;
    background-size: 12px 12px;
  }
}

@media (max-width: 480px) {
  .slide-title {
    font-size: 2.5rem;
  }

  .slide-subtitle {
    font-size: 2.5rem;
  }

  .slide-description {
    font-size: 1rem;
  }

  .slide-btn {
    padding: 0.8rem 2rem;
    font-size: 0.9rem;
  }
}
</style>
