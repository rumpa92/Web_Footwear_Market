<template>
  <div class="home">
    <!-- Banner Slider -->
    <BannerSlider />

    <!-- Sort By Section -->
    <section class="sort-section">
      <div class="container">
        <div class="sort-controls">
          <div class="sort-dropdown">
            <label class="sort-label">Sort by:</label>
            <select v-model="selectedSort" @change="updateSort" class="sort-select">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="filters-section">
      <div class="container">
        <div class="browse-products-header">
          <h2 class="browse-products-title">Browse Products</h2>
          <p class="browse-products-subtitle">Use filters to find exactly what you're looking for</p>
        </div>

        <div class="filters-content">
          <!-- Filters Sidebar -->
          <ProductFilters />

          <!-- Filtered Products -->
          <div class="filtered-products">
            <div v-if="filteredProducts.length === 0" class="no-products">
              <div class="no-products-content">
                <h3>No products found</h3>
                <p>Try adjusting your filters to see more products</p>
              </div>
            </div>

            <div v-else class="products-grid">
              <ProductCard
                v-for="product in filteredProducts.slice(0, 8)"
                :key="product.id"
                :product="product"
              />
            </div>

            <div v-if="filteredProducts.length > 8" class="section-footer">
              <router-link to="/products" class="btn btn-outline">View All Products</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="new-arrivals">
      <div class="container">
        <div class="new-arrivals-header">
          <h2 class="new-arrivals-title">New Arrivals</h2>
          <p class="new-arrivals-subtitle">Latest additions to our collection</p>
        </div>

        <div class="products-grid">
          <ProductCard
            v-for="product in newArrivals"
            :key="product.id"
            :product="product"
          />
        </div>

        <div class="section-footer">
          <router-link to="/products?filter=new" class="btn btn-outline">View All New Arrivals</router-link>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="categories">
      <div class="container">
        <div class="shop-category-header">
          <h2 class="shop-category-title">Shop by Category</h2>
          <p class="shop-category-subtitle">Find the perfect shoes for every occasion</p>
        </div>
        
        <div class="categories-grid">
          <router-link v-for="category in categories" :key="category.name" :to="category.link" class="category-card">
            <div class="category-circle">
              <div class="category-image">
                <img :src="category.image" :alt="category.name" />
              </div>
              <div class="category-overlay">
                <span class="category-icon">{{ category.icon }}</span>
              </div>
            </div>
            <div class="category-content">
              <h3 class="category-title">{{ category.name }}</h3>
              <p class="category-description">{{ category.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Suggested for You -->
    <section class="suggested-products">
      <div class="container">
        <div class="suggested-header">
          <h2 class="suggested-title">Suggested for You</h2>
          <p class="suggested-subtitle">Highly rated products you might love</p>
        </div>
        
        <div class="products-grid">
          <ProductCard 
            v-for="product in suggestedProducts" 
            :key="product.id" 
            :product="product"
          />
        </div>
        
        <div class="section-footer">
        </div>
      </div>
    </section>

    <!-- What's Trending Banner -->
    <section class="trending-banner">
      <div class="container">
        <div class="banner-content">
          <div class="banner-text">
            <h2 class="banner-title">What's Trending</h2>
            <p class="banner-subtitle">Discover the hottest shoes everyone's talking about</p>
            <router-link to="/products?filter=trending" class="btn btn-primary btn-lg">Explore Trends</router-link>
          </div>
          <div class="banner-image">
            <img src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=400&fit=crop" alt="Trending Shoes" />
          </div>
        </div>
      </div>
    </section>

    <!-- What's Trending Products -->
    <section class="trending-products">
      <div class="container">
        <div class="trending-header">
          <h2 class="trending-title">Trending Now</h2>
          <p class="trending-subtitle">Popular picks flying off our shelves</p>
        </div>
        
        <div class="products-grid">
          <ProductCard 
            v-for="product in trendingProducts" 
            :key="product.id" 
            :product="product"
          />
        </div>
        
        <div class="section-footer">
          <router-link to="/products?filter=trending" class="btn btn-outline">View All Trending</router-link>
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
import ProductFilters from '../components/products/ProductFilters.vue'

export default {
  name: 'Home',
  components: {
    ProductCard,
    ProductFilters
  },
  data() {
    return {
      email: '',
      selectedSort: 'featured',
      categories: [
        {
          name: 'Men',
          description: 'Footwear for men',
          image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop',
          icon: '👨',
          link: '/products?category=men'
        },
        {
          name: 'Women',
          description: 'Footwear for women',
          image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop',
          icon: '👩',
          link: '/products?category=women'
        },
        {
          name: 'Kids',
          description: 'Footwear for children',
          image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=300&h=300&fit=crop',
          icon: '👶',
          link: '/products?category=kids'
        },
        {
          name: 'Sports',
          description: 'Athletic and sports shoes',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
          icon: '⚽',
          link: '/products?category=sports'
        },
        {
          name: 'Casuals',
          description: 'Comfortable everyday shoes',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
          icon: '👟',
          link: '/products?category=casuals'
        },
        {
          name: 'Formal',
          description: 'Professional and dress shoes',
          image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=300&h=300&fit=crop',
          icon: '👞',
          link: '/products?category=formal'
        }
      ],
    }
  },
  computed: {
    ...mapGetters('products', ['featuredProducts', 'newArrivals', 'suggestedProducts', 'trendingProducts', 'filteredProducts'])
  },
  methods: {
    subscribeNewsletter() {
      if (this.email) {
        console.log('Newsletter subscription:', this.email)
        this.email = ''
        // Show success message
      }
    },
    updateSort() {
      this.$store.dispatch('products/setSortBy', this.selectedSort)
    }
  }
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #1a237e 0%, #283593 50%, #3f51b5 100%);
  padding: var(--space-3xl) 0;
  position: relative;
  overflow: hidden;
  min-height: 600px;
  display: flex;
  align-items: center;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
  align-items: center;
  position: relative;
  z-index: 10;
  width: 100%;
}

.hero-text {
  color: white;
  z-index: 10;
  position: relative;
}

.hero-badge {
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: var(--space-lg);
  opacity: 0.9;
  font-style: italic;
}

.hero-main-text {
  margin-bottom: var(--space-2xl);
}

.hero-title {
  font-size: 64px;
  font-weight: 700;
  color: #ffd700;
  line-height: 0.9;
  letter-spacing: 4px;
  margin: 0;
  text-transform: uppercase;
}

.hero-sale {
  font-size: 80px;
  font-weight: 900;
  color: white;
  display: block;
  margin-top: -10px;
}

.hero-actions {
  margin-bottom: var(--space-2xl);
}

.offer-now-btn {
  background-color: white;
  color: #1a237e;
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 25px;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: inline-block;
  text-transform: uppercase;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.offer-now-btn:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.hero-contact {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.contact-info {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 12px;
  color: white;
  opacity: 0.8;
}

.contact-icon {
  font-size: 14px;
}

.contact-text {
  font-weight: 500;
  letter-spacing: 0.5px;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
}

.hero-image img {
  max-width: 450px;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
}

.hero-image img:hover {
  transform: scale(1.03) rotate(-3deg);
}

.discount-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(255, 152, 0, 0.4);
  animation: pulse 2s infinite;
}

.discount-text {
  color: white;
  font-size: 18px;
  font-weight: 900;
  text-align: center;
  line-height: 1.2;
  letter-spacing: 1px;
}

.hero-logo {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 20;
}

.logo-text {
  color: white;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2px;
  opacity: 0.9;
}

.hero-dots {
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  gap: 8px;
  z-index: 20;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  opacity: 0.7;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 8px 20px rgba(255, 152, 0, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 10px 25px rgba(255, 152, 0, 0.6);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 8px 20px rgba(255, 152, 0, 0.4);
  }
}

.sort-section {
  padding: var(--space-lg) 0;
  background-color: var(--bg-light);
  border-bottom: 1px solid var(--border-color);
}

.sort-controls {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  align-items: center;
}

.sort-dropdown {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background-color: var(--bg-primary);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  margin-left: auto;
}

.sort-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  white-space: nowrap;
}

.sort-select {
  background-color: transparent;
  border: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  cursor: pointer;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2rem;
  min-width: 160px;
}

.sort-select:focus {
  color: var(--accent-color);
}

.filters-section {
  padding: var(--space-3xl) 0;
  background-color: #f8fafc;
}

.filters-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-2xl);
}

.filtered-products {
  min-height: 400px;
}

.no-products {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.no-products-content {
  text-align: center;
}

.no-products-content h3 {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.no-products-content p {
  color: var(--text-secondary);
  margin-bottom: var(--space-lg);
}


.new-arrivals {
  padding: var(--space-3xl) 0;
  background-color: #f0f9ff;
}

.suggested-products {
  padding: var(--space-3xl) 0;
  background-color: #f0fdf4;
}

.trending-products {
  padding: var(--space-3xl) 0;
  background-color: #fefce8;
}

.trending-banner {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  color: var(--text-white);
  padding: var(--space-3xl) 0;
}

.banner-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2xl);
  align-items: center;
  text-align: center;
}

.banner-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-md);
}

.banner-subtitle {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  margin-bottom: var(--space-xl);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.banner-image {
  display: flex;
  justify-content: center;
}

.banner-image img {
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 400px;
  width: 100%;
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.browse-products-header {
  text-align: left;
  margin-bottom: var(--space-2xl);
}

.browse-products-title {
  font-size: 30px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-md);
  line-height: 45px;
}

.browse-products-subtitle {
  color: rgb(127, 140, 141);
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  margin: 0;
}

.new-arrivals-header,
.shop-category-header,
.suggested-header,
.trending-header {
  text-align: left;
  margin-bottom: var(--space-2xl);
}

.new-arrivals-title,
.shop-category-title,
.suggested-title,
.trending-title {
  font-size: 30px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-md);
  line-height: 45px;
}

.new-arrivals-subtitle,
.shop-category-subtitle,
.suggested-subtitle,
.trending-subtitle {
  color: rgb(127, 140, 141);
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  margin: 0;
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
  background-color: #fdf2f8;
  padding: var(--space-3xl) 0;
}

.categories-grid {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-md);
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: var(--transition-normal);
  padding: var(--space-md);
  flex: 1;
  min-width: 140px;
  max-width: 180px;
}

.category-card:hover {
  transform: translateY(-8px);
}

.category-circle {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: var(--transition-normal);
  margin-bottom: var(--space-md);
}

.category-card:hover .category-circle {
  box-shadow: var(--shadow-xl);
  transform: scale(1.05);
}

.category-image {
  width: 100%;
  height: 100%;
  position: relative;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-normal);
}

.category-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(44, 62, 80, 0.8), rgba(52, 152, 219, 0.6));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-normal);
}

.category-card:hover .category-overlay {
  opacity: 1;
}

.category-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.category-content {
  text-align: center;
}

.category-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  transition: var(--transition-fast);
}

.category-card:hover .category-title {
  color: var(--accent-color);
}

.category-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: var(--line-height-tight);
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
  margin-right: auto;
}

.newsletter-input .form-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.newsletter-input .btn {
  margin-right: auto;
}

@media (max-width: 767px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: var(--space-lg);
  }

  .hero-title {
    font-size: 42px;
  }

  .hero-sale {
    font-size: 56px;
  }

  .hero-logo {
    top: 20px;
    left: 20px;
  }

  .logo-text {
    font-size: 16px;
  }

  .hero-dots {
    top: 20px;
    right: 20px;
  }

  .discount-badge {
    width: 80px;
    height: 80px;
    top: 10px;
    right: 10px;
  }

  .discount-text {
    font-size: 14px;
  }

  .hero-contact {
    margin-top: var(--space-lg);
  }

  .contact-info {
    justify-content: center;
  }
}

@media (min-width: 768px) {
  .hero-text {
    text-align: left;
  }

  .newsletter-content {
    grid-template-columns: 1fr 1fr;
    text-align: left;
  }

  .newsletter-input {
    margin: 0;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  .banner-content {
    grid-template-columns: 1fr 1fr;
    text-align: left;
  }

  .banner-subtitle {
    margin-left: 0;
    margin-right: 0;
  }
}

@media (max-width: 1200px) {
  .categories-grid {
    gap: var(--space-sm);
  }
}

@media (max-width: 1024px) {
  .filters-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .hero-title {
    font-size: var(--font-size-3xl);
  }

  .newsletter-input {
    flex-direction: column;
  }

  .categories-grid {
    gap: var(--space-xs);
    padding: 0 var(--space-sm);
  }

  .category-card {
    min-width: 100px;
    max-width: 120px;
    padding: var(--space-sm);
  }

  .category-circle {
    width: 100px;
    height: 100px;
  }

  .category-icon {
    font-size: 2rem;
  }

  .sort-dropdown {
    flex-direction: column;
    text-align: center;
  }

  .sort-select {
    min-width: 140px;
  }
}
</style>
