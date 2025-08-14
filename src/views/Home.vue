<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">Step Into Style</h1>
            <p class="hero-subtitle">
              Discover the latest in premium footwear from top brands.
              Quality, comfort, and style in every step.
            </p>
            <div class="hero-actions">
              <router-link to="/products" class="btn btn-primary btn-lg">Shop Now</router-link>
              <router-link to="/sale" class="btn btn-outline btn-lg">View Sale</router-link>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop" alt="Featured Shoes" />
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Products</h2>
          <p class="section-subtitle">Handpicked favorites from our collection</p>
        </div>
        
        <div class="products-grid">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id" 
            :product="product"
          />
        </div>
        
        <div class="section-footer">
          <router-link to="/products" class="btn btn-outline">View All Products</router-link>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="categories">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Shop by Category</h2>
          <p class="section-subtitle">Find the perfect shoes for every occasion</p>
        </div>
        
        <div class="categories-grid">
          <div class="category-card" v-for="category in categories" :key="category.name">
            <div class="category-image">
              <img :src="category.image" :alt="category.name" />
            </div>
            <div class="category-content">
              <h3 class="category-title">{{ category.name }}</h3>
              <p class="category-description">{{ category.description }}</p>
              <router-link :to="category.link" class="category-link">Shop {{ category.name }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Brands -->
    <section class="brands">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Popular Brands</h2>
          <p class="section-subtitle">Shop from the world's leading footwear brands</p>
        </div>
        
        <div class="brands-grid">
          <div class="brand-card" v-for="brand in brands" :key="brand.name">
            <div class="brand-logo">{{ brand.logo }}</div>
            <h3 class="brand-name">{{ brand.name }}</h3>
            <router-link :to="`/brands/${brand.slug}`" class="brand-link">Shop {{ brand.name }}</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter">
      <div class="container">
        <div class="newsletter-content">
          <div class="newsletter-text">
            <h2 class="newsletter-title">Stay Updated</h2>
            <p class="newsletter-description">
              Get the latest updates on new arrivals, exclusive offers, and style tips.
            </p>
          </div>
          <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
            <div class="newsletter-input">
              <input 
                type="email" 
                placeholder="Your email address" 
                v-model="email"
                class="form-input"
                required
              />
              <button type="submit" class="btn btn-primary">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductCard from '../components/products/ProductCard.vue'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  data() {
    return {
      email: '',
      categories: [
        {
          name: 'Sneakers',
          description: 'Casual and athletic sneakers for everyday wear',
          image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop',
          link: '/products?category=sneakers'
        },
        {
          name: 'Running',
          description: 'High-performance running shoes for athletes',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
          link: '/products?category=running'
        },
        {
          name: 'Basketball',
          description: 'Professional basketball shoes for court performance',
          image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop',
          link: '/products?category=basketball'
        },
        {
          name: 'Casual',
          description: 'Comfortable everyday shoes for any occasion',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
          link: '/products?category=casual'
        }
      ],
      brands: [
        { name: 'Nike', logo: '✓', slug: 'nike' },
        { name: 'Adidas', logo: '⚡', slug: 'adidas' },
        { name: 'Jordan', logo: '🏀', slug: 'jordan' },
        { name: 'Converse', logo: '⭐', slug: 'converse' },
        { name: 'Vans', logo: '🛹', slug: 'vans' },
        { name: 'New Balance', logo: 'N', slug: 'new-balance' }
      ]
    }
  },
  computed: {
    ...mapGetters('products', ['featuredProducts'])
  },
  methods: {
    subscribeNewsletter() {
      if (this.email) {
        console.log('Newsletter subscription:', this.email)
        this.email = ''
        // Show success message
      }
    }
  }
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-light) 100%);
  padding: var(--space-3xl) 0;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2xl);
  align-items: center;
  min-height: 500px;
}

.hero-text {
  text-align: center;
}

.hero-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-md);
  line-height: var(--line-height-tight);
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-bottom: var(--space-xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  flex-wrap: wrap;
}

.hero-image {
  display: flex;
  justify-content: center;
}

.hero-image img {
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 100%;
}

.featured-products {
  padding: var(--space-3xl) 0;
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.section-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.section-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

.section-footer {
  text-align: center;
}

.categories {
  background-color: var(--bg-light);
  padding: var(--space-3xl) 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-xl);
}

.category-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: var(--transition-normal);
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.category-image {
  height: 200px;
  overflow: hidden;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-normal);
}

.category-card:hover .category-image img {
  transform: scale(1.05);
}

.category-content {
  padding: var(--space-lg);
}

.category-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.category-description {
  color: var(--text-secondary);
  margin-bottom: var(--space-md);
}

.category-link {
  color: var(--accent-color);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-fast);
}

.category-link:hover {
  color: var(--accent-dark);
}

.brands {
  padding: var(--space-3xl) 0;
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-lg);
}

.brand-card {
  background-color: var(--bg-primary);
  padding: var(--space-xl);
  border-radius: var(--border-radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-normal);
}

.brand-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.brand-logo {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-md);
}

.brand-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.brand-link {
  color: var(--accent-color);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-fast);
}

.brand-link:hover {
  color: var(--accent-dark);
}

.newsletter {
  background-color: var(--primary-color);
  color: var(--text-white);
  padding: var(--space-3xl) 0;
}

.newsletter-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
  align-items: center;
  text-align: center;
}

.newsletter-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-md);
}

.newsletter-description {
  font-size: var(--font-size-lg);
  opacity: 0.9;
}

.newsletter-input {
  display: flex;
  gap: var(--space-sm);
  max-width: 400px;
  margin: 0 auto;
}

.newsletter-input .form-input {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: var(--text-white);
}

.newsletter-input .form-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

@media (min-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr 1fr;
  }
  
  .hero-text {
    text-align: left;
  }
  
  .hero-actions {
    justify-content: flex-start;
  }
  
  .newsletter-content {
    grid-template-columns: 1fr 1fr;
    text-align: left;
  }
  
  .newsletter-input {
    margin: 0;
  }
}

@media (max-width: 767px) {
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .newsletter-input {
    flex-direction: column;
  }
}
</style>
