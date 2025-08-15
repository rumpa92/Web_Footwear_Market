<template>
  <div class="product-detail-page">
    <div v-if="product" class="product-container">
      <!-- Product Image Carousel Section -->
      <div class="product-images-section">
        <div class="image-carousel-container">
          <div class="main-image-wrapper">
            <img 
              :src="selectedImage" 
              :alt="product.name"
              class="main-product-image"
              @mouseover="startZoom"
              @mousemove="updateZoom"
              @mouseleave="endZoom"
              ref="mainImage"
            />
            <div 
              v-if="isZooming"
              class="zoom-lens"
              ref="zoomLens"
            ></div>
            <div 
              v-if="isZooming"
              class="zoom-result"
              ref="zoomResult"
            ></div>
            
            <!-- Share Icons -->
            <div class="share-icons">
              <button @click="shareProduct('whatsapp')" class="share-btn whatsapp">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.687"/>
                </svg>
              </button>
              <button @click="shareProduct('instagram')" class="share-btn instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
              <button @click="shareProduct('facebook')" class="share-btn facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button @click="shareProduct('copy')" class="share-btn copy">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Thumbnail Images -->
          <div class="thumbnail-images">
            <div 
              v-for="(image, index) in productImages" 
              :key="index"
              class="thumbnail-wrapper"
              :class="{ active: selectedImage === image }"
              @click="selectedImage = image"
            >
              <img :src="image" :alt="`${product.name} view ${index + 1}`" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Product Details Section -->
      <div class="product-details-section">
        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>
          <p class="product-brand">{{ product.brand }}</p>
          
          <div class="rating-section">
            <div class="stars">
              <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= Math.floor(product.rating), half: star === Math.ceil(product.rating) && product.rating % 1 !== 0 }">★</span>
            </div>
            <span class="rating-text">{{ product.rating }} ({{ product.reviews }} reviews)</span>
          </div>
          
          <div class="price-section">
            <span class="current-price">${{ product.price }}</span>
            <span v-if="product.originalPrice > product.price" class="original-price">${{ product.originalPrice }}</span>
            <span v-if="product.originalPrice > product.price" class="discount">{{ Math.round((1 - product.price / product.originalPrice) * 100) }}% OFF</span>
          </div>
          
          <p class="product-description">{{ product.description }}</p>
          
          <!-- Size Selection -->
          <div class="size-selection">
            <h3>Size</h3>
            <div class="size-options">
              <button 
                v-for="size in product.sizes" 
                :key="size"
                class="size-btn"
                :class="{ selected: selectedSize === size }"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>
          
          <!-- Color Selection -->
          <div class="color-selection">
            <h3>Color</h3>
            <div class="color-options">
              <button
                v-for="color in product.colors"
                :key="color"
                class="color-btn"
                :class="{ selected: selectedColor === color }"
                :style="{ backgroundColor: getColorCode(color) }"
                @click="changeColor(color)"
                :title="color"
              >
                <span class="color-name">{{ color }}</span>
              </button>
            </div>
          </div>

          <!-- Quantity Selection -->
          <div class="quantity-selection">
            <h3>Quantity</h3>
            <div class="quantity-selector">
              <button
                @click="decreaseDesiredQuantity"
                class="quantity-selector-btn"
                :disabled="desiredQuantity <= 1"
              >−</button>
              <span class="quantity-display">{{ desiredQuantity }}</span>
              <button
                @click="increaseDesiredQuantity"
                class="quantity-selector-btn"
                :disabled="desiredQuantity >= 10"
              >+</button>
            </div>
          </div>
        </div>
        
        <!-- Add to Cart Section -->
        <div class="cart-section">
          <div v-if="!isInCart" class="add-to-cart-container">
            <button
              @click="addToCart"
              class="add-to-cart-btn"
              :disabled="!selectedSize || !selectedColor || !product.inStock"
              :class="{ adding: isAdding }"
            >
              <span v-if="!isAdding">Add to Cart</span>
              <span v-else>Adding...</span>
            </button>
            <button @click="clearSelections" class="remove-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" class="trash-icon">
                <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6"/>
              </svg>
            </button>
          </div>

          <div v-else class="modify-cart-container">
            <div class="quantity-controls">
              <button @click="decreaseQuantity" class="quantity-btn">−</button>
              <span class="quantity">{{ cartItemQuantity }}</span>
              <button @click="increaseQuantity" class="quantity-btn">+</button>
            </div>
            <button @click="removeFromCart" class="remove-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" class="trash-icon">
                <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- How to Use Section -->
        <div class="how-to-use-section">
          <div class="accordion-item">
            <button 
              class="accordion-header"
              @click="toggleAccordion('howToUse')"
              :class="{ active: activeAccordion === 'howToUse' }"
            >
              <span>How to Use</span>
              <svg class="accordion-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6z"/>
              </svg>
            </button>
            <div class="accordion-content" :class="{ active: activeAccordion === 'howToUse' }">
              <div class="usage-steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h4>Preparation</h4>
                    <p>Ensure feet are clean and dry before wearing.</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h4>Fitting</h4>
                    <p>Loosen laces completely, slide foot in, and adjust for comfort.</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h4>Care</h4>
                    <p>Clean regularly with appropriate materials for best longevity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Reviews Section -->
    <div v-if="product" class="reviews-section">
      <div class="reviews-header">
        <h2>Customer Reviews</h2>
        <button @click="openWriteReview" class="write-review-btn">Write a Review</button>
      </div>
      
      <div class="reviews-summary">
        <div class="average-rating">
          <div class="big-rating">{{ product.rating }}</div>
          <div class="stars-large">
            <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= Math.floor(product.rating) }">★</span>
          </div>
          <div class="total-reviews">based on {{ product.reviews }} reviews</div>
        </div>

        <div class="rating-breakdown">
          <div class="rating-row">
            <span class="rating-label">Excellent</span>
            <div class="bar-container">
              <div class="bar-fill excellent" :style="{ width: getRatingPercentage(5) + '%' }"></div>
            </div>
          </div>
          <div class="rating-row">
            <span class="rating-label">Good</span>
            <div class="bar-container">
              <div class="bar-fill good" :style="{ width: getRatingPercentage(4) + '%' }"></div>
            </div>
          </div>
          <div class="rating-row">
            <span class="rating-label">Average</span>
            <div class="bar-container">
              <div class="bar-fill average" :style="{ width: getRatingPercentage(3) + '%' }"></div>
            </div>
          </div>
          <div class="rating-row">
            <span class="rating-label">Below Average</span>
            <div class="bar-container">
              <div class="bar-fill below-average" :style="{ width: getRatingPercentage(2) + '%' }"></div>
            </div>
          </div>
          <div class="rating-row">
            <span class="rating-label">Poor</span>
            <div class="bar-container">
              <div class="bar-fill poor" :style="{ width: getRatingPercentage(1) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="reviews-filters">
        <button 
          v-for="filter in reviewFilters" 
          :key="filter.value"
          class="filter-btn"
          :class="{ active: activeReviewFilter === filter.value }"
          @click="activeReviewFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>
      
      <div class="reviews-list">
        <div v-for="review in filteredReviews" :key="review.id" class="review-item">
          <div class="reviewer-info">
            <img :src="review.avatar" :alt="review.name" class="reviewer-avatar" />
            <div class="reviewer-content">
              <div class="reviewer-header">
                <h4 class="reviewer-name">{{ review.name }}</h4>
                <span class="review-date">{{ formatDate(review.date) }}</span>
              </div>
              <div class="review-stars">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= review.rating }">��</span>
                <span class="rating-value">{{ review.rating }}.0</span>
              </div>
              <p class="review-text" :class="{ expanded: review.expanded }">{{ review.text }}</p>
              <button
                v-if="review.text.length > 150"
                @click="toggleReviewExpansion(review)"
                class="expand-btn"
              >
                {{ review.expanded ? 'Show Less' : 'Read More' }}
              </button>

              <div v-if="review.images && review.images.length" class="review-images">
                <img
                  v-for="(image, index) in review.images"
                  :key="index"
                  :src="image"
                  :alt="`Review image ${index + 1}`"
                  class="review-image"
                  @click="openImageModal(image)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Related Products Section -->
    <div v-if="product" class="related-products-section">
      <h2>You may also like</h2>
      <div class="related-products-carousel">
        <div class="products-container" ref="relatedProductsContainer">
          <div 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id"
            class="related-product-card"
            @click="goToProduct(relatedProduct.id)"
          >
            <img :src="relatedProduct.image" :alt="relatedProduct.name" />
            <h3>{{ relatedProduct.name }}</h3>
            <p class="brand">{{ relatedProduct.brand }}</p>
            <div class="price">
              <span class="current">${{ relatedProduct.price }}</span>
              <span v-if="relatedProduct.originalPrice > relatedProduct.price" class="original">${{ relatedProduct.originalPrice }}</span>
            </div>
          </div>
        </div>
        <button @click="scrollRelatedProducts('left')" class="carousel-btn left">‹</button>
        <button @click="scrollRelatedProducts('right')" class="carousel-btn right">›</button>
      </div>
    </div>
    
    <!-- Write Review Modal -->
    <div v-if="showWriteReviewModal" class="modal-overlay" @click="closeWriteReview">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Write a Review</h3>
          <button @click="closeWriteReview" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <div class="rating-input">
            <label>Rating</label>
            <div class="star-input">
              <button 
                v-for="star in 5" 
                :key="star"
                class="star-btn"
                :class="{ filled: star <= newReview.rating }"
                @click="newReview.rating = star"
              >★</button>
            </div>
          </div>
          <div class="text-input">
            <label>Review</label>
            <textarea 
              v-model="newReview.text"
              placeholder="Share your experience with this product..."
              rows="5"
            ></textarea>
          </div>
          <div class="name-input">
            <label>Name</label>
            <input v-model="newReview.name" type="text" placeholder="Your name" />
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeWriteReview" class="cancel-btn">Cancel</button>
          <button @click="submitReview" class="submit-btn" :disabled="!canSubmitReview">Submit Review</button>
        </div>
      </div>
    </div>
    
    <!-- Toast Messages -->
    <div v-if="showToast" class="toast" :class="toast.type">
      {{ toast.message }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductDetail',
  data() {
    return {
      selectedImage: '',
      selectedSize: null,
      selectedColor: null,
      desiredQuantity: 1,
      isZooming: false,
      isAdding: false,
      activeAccordion: null,
      activeReviewFilter: 'all',
      showWriteReviewModal: false,
      showToast: false,
      toast: { message: '', type: '' },
      newReview: {
        rating: 5,
        text: '',
        name: ''
      },
      reviewFilters: [
        { label: 'All', value: 'all' },
        { label: '5★', value: 5 },
        { label: '4★', value: 4 },
        { label: '3★', value: 3 },
        { label: '2★', value: 2 },
        { label: '1★', value: 1 }
      ],
      mockReviews: [
        {
          id: 1,
          name: 'Sarah Johnson',
          rating: 5,
          text: 'Absolutely love these shoes! The comfort is incredible and they look amazing with any outfit. Worth every penny.',
          date: new Date('2024-01-15'),
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=50&h=50&fit=crop&crop=face',
          images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop'],
          expanded: false
        },
        {
          id: 2,
          name: 'Mike Chen',
          rating: 4,
          text: 'Great quality and fast shipping. The size runs a bit large, so I recommend going half a size down. Overall very satisfied with the purchase.',
          date: new Date('2024-01-10'),
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
          images: [],
          expanded: false
        },
        {
          id: 3,
          name: 'Emily Rodriguez',
          rating: 5,
          text: 'These are my new favorite shoes! Super comfortable for walking all day and the style is perfect. I\'ve already ordered another pair in a different color.',
          date: new Date('2024-01-08'),
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
          images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop'],
          expanded: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters('products', ['productById', 'allProducts']),
    ...mapGetters('cart', ['getCartItem', 'cartItems']),
    
    product() {
      return this.productById(this.$route.params.id)
    },
    
    productImages() {
      if (!this.product) return []

      // Base image for the current color
      const baseImage = this.getImageForColor(this.selectedColor || this.product.colors[0])

      // Generate multiple image variations for the selected color
      return [
        baseImage,
        baseImage.replace('w=400', 'w=400&sat=-20'),
        baseImage.replace('w=400', 'w=400&hue=15'),
        baseImage.replace('w=400', 'w=400&flip=h')
      ]
    },

    colorImages() {
      if (!this.product) return {}

      // High-quality shoe images for different colors - matching actual colors
      const colorImageMap = {
        'black': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop', // Black Air Force 1
        'white': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', // White Converse
        'blue': 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop', // Blue Vans sneakers
        'red': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', // Red Nike (current image)
        'gray': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop', // Gray New Balance
        'navy': 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop', // Navy Under Armour
        'burgundy': 'https://images.unsplash.com/photo-1608667508764-33cf0726aae8?w=400&h=400&fit=crop', // Burgundy Puma
        'pink': 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop' // Pink Reebok
      }

      return colorImageMap
    },
    
    relatedProducts() {
      if (!this.product) return []
      return this.allProducts
        .filter(p => p.id !== this.product.id && (p.brand === this.product.brand || p.category === this.product.category))
        .slice(0, 6)
    },
    
    isInCart() {
      if (!this.product || !this.selectedSize || !this.selectedColor) return false
      return this.getCartItem(this.product.id, this.selectedSize, this.selectedColor)
    },
    
    cartItemQuantity() {
      const item = this.isInCart
      return item ? item.quantity : 0
    },
    
    filteredReviews() {
      if (this.activeReviewFilter === 'all') return this.mockReviews
      return this.mockReviews.filter(review => review.rating === this.activeReviewFilter)
    },
    
    canSubmitReview() {
      return this.newReview.rating > 0 && this.newReview.text.trim() && this.newReview.name.trim()
    }
  },
  
  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.initializeProduct()
      }
    },

    selectedColor: {
      handler(newColor) {
        console.log('Color changed to:', newColor)
        if (newColor && this.productImages.length > 0) {
          this.selectedImage = this.productImages[0]
          console.log('Updated selected image to:', this.selectedImage)
        }
      }
    },

    productImages: {
      handler(newImages) {
        if (newImages.length > 0) {
          this.selectedImage = newImages[0]
        }
      }
    }
  },
  
  methods: {
    ...mapActions('cart', ['addToCart', 'removeFromCart', 'updateCartItemQuantity']),
    
    initializeProduct() {
      if (this.product) {
        this.selectedColor = this.product.colors[0] // Set default color
        this.selectedImage = this.productImages[0]
        this.selectedSize = null
        this.desiredQuantity = 1 // Reset quantity to 1
      }
    },

    changeColor(color) {
      console.log('Changing color to:', color)
      this.selectedColor = color
      // Force update of images
      this.$nextTick(() => {
        if (this.productImages.length > 0) {
          this.selectedImage = this.productImages[0]
          console.log('Force updated image to:', this.selectedImage)
        }
      })
    },

    getImageForColor(color) {
      if (!this.product || !color) return this.product?.image || ''

      const colorLower = color.toLowerCase()
      console.log('Getting image for color:', colorLower, 'Available colors:', this.colorImages)

      // Return color-specific image or fallback to default
      return this.colorImages[colorLower] || this.product.image
    },
    
    getColorCode(color) {
      const colorMap = {
        'white': '#ffffff',
        'black': '#000000',
        'red': '#dc2626',
        'blue': '#2563eb',
        'gray': '#6b7280',
        'navy': '#1e3a8a',
        'burgundy': '#7c2d12',
        'pink': '#ec4899'
      }
      return colorMap[color.toLowerCase()] || '#6b7280'
    },
    
    startZoom(event) {
      this.isZooming = true
    },
    
    updateZoom(event) {
      if (!this.isZooming) return
      
      const img = this.$refs.mainImage
      const lens = this.$refs.zoomLens
      const result = this.$refs.zoomResult
      
      if (!img || !lens || !result) return
      
      const rect = img.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      lens.style.left = (x - lens.offsetWidth / 2) + 'px'
      lens.style.top = (y - lens.offsetHeight / 2) + 'px'
      
      const fx = result.offsetWidth / lens.offsetWidth
      const fy = result.offsetHeight / lens.offsetHeight
      
      result.style.backgroundImage = `url(${this.selectedImage})`
      result.style.backgroundSize = (img.width * fx) + 'px ' + (img.height * fy) + 'px'
      result.style.backgroundPosition = '-' + (x * fx - lens.offsetWidth / 2) + 'px -' + (y * fy - lens.offsetHeight / 2) + 'px'
    },
    
    endZoom() {
      this.isZooming = false
    },
    
    shareProduct(platform) {
      const url = window.location.href
      const text = `Check out this ${this.product.name} by ${this.product.brand}`
      
      switch (platform) {
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`)
          break
        case 'instagram':
          this.showToast({ message: 'Link copied! Share on Instagram', type: 'success' })
          navigator.clipboard.writeText(url)
          break
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
          break
        case 'copy':
          navigator.clipboard.writeText(url)
          this.showToastMessage('Link copied to clipboard!', 'success')
          break
      }
    },
    
    toggleAccordion(section) {
      this.activeAccordion = this.activeAccordion === section ? null : section
    },
    
    async addToCart() {
      if (!this.selectedSize || !this.selectedColor) {
        this.showToastMessage('Please select size and color', 'error')
        return
      }

      this.isAdding = true

      await this.addToCart({
        product: this.product,
        size: this.selectedSize,
        color: this.selectedColor,
        quantity: this.desiredQuantity
      })

      this.isAdding = false
      this.showToastMessage(`Added ${this.desiredQuantity} item${this.desiredQuantity > 1 ? 's' : ''} to cart!`, 'success')
    },
    
    increaseQuantity() {
      this.updateCartItemQuantity({
        id: this.product.id,
        size: this.selectedSize,
        color: this.selectedColor,
        quantity: this.cartItemQuantity + 1
      })
    },

    decreaseQuantity() {
      if (this.cartItemQuantity > 1) {
        this.updateCartItemQuantity({
          id: this.product.id,
          size: this.selectedSize,
          color: this.selectedColor,
          quantity: this.cartItemQuantity - 1
        })
      }
    },

    increaseDesiredQuantity() {
      if (this.desiredQuantity < 10) {
        this.desiredQuantity++
      }
    },

    decreaseDesiredQuantity() {
      if (this.desiredQuantity > 1) {
        this.desiredQuantity--
      }
    },
    
    removeFromCart() {
      this.removeFromCart({
        id: this.product.id,
        size: this.selectedSize,
        color: this.selectedColor
      })
      this.showToastMessage('Removed from cart', 'info')
    },

    clearSelections() {
      this.selectedSize = null
      this.selectedColor = this.product.colors[0]
      this.desiredQuantity = 1
      this.showToastMessage('Selections cleared', 'info')
    },
    
    getRatingPercentage(rating) {
      const total = this.mockReviews.length
      const count = this.mockReviews.filter(r => r.rating === rating).length
      return (count / total) * 100
    },
    
    getRatingCount(rating) {
      return this.mockReviews.filter(r => r.rating === rating).length
    },
    
    toggleReviewExpansion(review) {
      review.expanded = !review.expanded
    },
    
    formatDate(date) {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    },
    
    openWriteReview() {
      this.showWriteReviewModal = true
    },
    
    closeWriteReview() {
      this.showWriteReviewModal = false
      this.newReview = { rating: 5, text: '', name: '' }
    },
    
    submitReview() {
      // In a real app, this would submit to an API
      this.mockReviews.unshift({
        id: Date.now(),
        name: this.newReview.name,
        rating: this.newReview.rating,
        text: this.newReview.text,
        date: new Date(),
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        images: [],
        expanded: false
      })
      
      this.showToastMessage('Review submitted successfully!', 'success')
      this.closeWriteReview()
    },
    
    scrollRelatedProducts(direction) {
      const container = this.$refs.relatedProductsContainer
      const scrollAmount = 300
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    },
    
    goToProduct(productId) {
      this.$router.push(`/product/${productId}`)
    },
    
    openImageModal(image) {
      // Implement image modal functionality
      window.open(image, '_blank')
    },
    
    showToastMessage(message, type = 'info') {
      this.toast = { message, type }
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 2rem 0;
}

.product-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

/* Product Images Section */
.product-images-section {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.image-carousel-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image-wrapper {
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.main-product-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 12px;
  cursor: zoom-in;
  transition: transform 0.3s ease;
}

.zoom-lens {
  position: absolute;
  border: 2px solid #3b82f6;
  cursor: none;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.1);
  pointer-events: none;
}

.zoom-result {
  position: absolute;
  top: 0;
  right: -400px;
  width: 300px;
  height: 300px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background-repeat: no-repeat;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.share-icons {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
}

.share-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.share-btn svg {
  width: 20px;
  height: 20px;
}

.share-btn.whatsapp { color: #25d366; }
.share-btn.instagram { color: #e4405f; }
.share-btn.facebook { color: #1877f2; }
.share-btn.copy { color: #6b7280; }

.thumbnail-images {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem;
}

.thumbnail-wrapper {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.thumbnail-wrapper.active {
  border-color: #3b82f6;
  transform: scale(1.05);
}

.thumbnail-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Details Section */
.product-details-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.product-info {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.product-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.product-brand {
  font-size: 1.2rem;
  color: #6b7280;
  margin: 0 0 1.5rem 0;
  font-weight: 500;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stars {
  display: flex;
  gap: 0.2rem;
}

.star {
  color: #d1d5db;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.star.filled {
  color: #fbbf24;
}

.star.half {
  background: linear-gradient(90deg, #fbbf24 50%, #d1d5db 50%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.rating-text {
  color: #6b7280;
  font-size: 0.9rem;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.current-price {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.original-price {
  font-size: 1.2rem;
  color: #9ca3af;
  text-decoration: line-through;
}

.discount {
  background: #ef4444;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.product-description {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.size-selection, .color-selection, .quantity-selection {
  margin-bottom: 2rem;
}

.size-selection h3, .color-selection h3, .quantity-selection h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.size-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.size-btn {
  padding: 0.75rem 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 50px;
  background: white;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 60px;
}

.size-btn:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.size-btn.selected {
  border-color: #3b82f6;
  background: #3b82f6;
  color: white;
}

.color-options {
  display: flex;
  gap: 1rem;
}

.color-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.color-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.color-btn.selected {
  border-color: #3b82f6;
  transform: scale(1.15);
}

.color-name {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: #6b7280;
  font-weight: 500;
  text-transform: capitalize;
  white-space: nowrap;
}

/* Quantity Selection */
.quantity-selector {
  display: inline-flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 0.5rem;
  gap: 1rem;
}

.quantity-selector-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-selector-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: scale(1.05);
}

.quantity-selector-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  opacity: 0.5;
}

.quantity-display {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  min-width: 30px;
  text-align: center;
}

/* Cart Section */
.cart-section {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: sticky;
  bottom: 2rem;
}

.add-to-cart-btn {
  width: 100%;
  padding: 1rem 2rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.add-to-cart-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.add-to-cart-btn.adding {
  background: #10b981;
}

.modify-cart-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f3f4f6;
  padding: 0.5rem;
  border-radius: 12px;
  flex: 1;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity-btn:hover {
  background: #2563eb;
}

.quantity {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  min-width: 30px;
  text-align: center;
}

.remove-btn {
  width: 48px;
  height: 48px;
  background: #fef2f2;
  color: #ef4444;
  border: 2px solid #fecaca;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.remove-btn:hover {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
  transform: scale(1.05);
}

.trash-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* How to Use Section */
.how-to-use-section {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid #e5e7eb;
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-header {
  width: 100%;
  padding: 1.5rem 2rem;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  transition: all 0.3s ease;
}

.accordion-header:hover {
  background: #f9fafb;
}

.accordion-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.accordion-header.active .accordion-icon {
  transform: rotate(180deg);
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-content.active {
  max-height: 500px;
}

.usage-steps {
  padding: 0 2rem 2rem 2rem;
}

.step {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.step:last-child {
  margin-bottom: 0;
}

.step-number {
  width: 30px;
  height: 30px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-weight: 600;
}

.step-content p {
  margin: 0;
  color: #6b7280;
  line-height: 1.5;
}

/* Reviews Section */
.reviews-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 4rem;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 0 2rem;
  margin-bottom: 2rem;
}

.reviews-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.write-review-btn {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.write-review-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.reviews-summary {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 3rem;
  padding: 0 2rem;
  margin-bottom: 2rem;
}

.average-rating {
  text-align: center;
}

.big-rating {
  font-size: 4rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.stars-large {
  display: flex;
  justify-content: center;
  gap: 0.2rem;
  margin-bottom: 0.5rem;
}

.stars-large .star {
  font-size: 1.5rem;
  color: #d1d5db;
}

.stars-large .star.filled {
  color: #fbbf24;
}

.total-reviews {
  color: #6b7280;
  font-size: 0.9rem;
}

.rating-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.rating-label {
  font-size: 0.9rem;
  color: #6b7280;
  min-width: 100px;
  font-weight: 500;
}

.bar-container {
  flex: 1;
  height: 12px;
  background: #f3f4f6;
  border-radius: 6px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  transition: width 0.3s ease;
  border-radius: 6px;
}

.bar-fill.excellent {
  background: #22c55e;
}

.bar-fill.good {
  background: #84cc16;
}

.bar-fill.average {
  background: #f59e0b;
}

.bar-fill.below-average {
  background: #f97316;
}

.bar-fill.poor {
  background: #ef4444;
}

.reviews-filters {
  display: flex;
  gap: 1rem;
  padding: 0 2rem;
  margin-bottom: 2rem;
  overflow-x: auto;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 20px;
  background: white;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.filter-btn:hover {
  border-color: #3b82f6;
}

.filter-btn.active {
  border-color: #3b82f6;
  background: #3b82f6;
  color: white;
}

.reviews-list {
  padding: 0 2rem 2rem 2rem;
}

.review-item {
  border-bottom: 1px solid #e5e7eb;
  padding: 2rem 0;
}

.review-item:last-child {
  border-bottom: none;
}

.reviewer-info {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.reviewer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.reviewer-content {
  flex: 1;
}

.reviewer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.reviewer-name {
  margin: 0;
  font-weight: 600;
  color: #1f2937;
  font-size: 1rem;
}

.review-date {
  color: #9ca3af;
  font-size: 0.875rem;
}

.review-stars {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.review-stars .star {
  font-size: 1rem;
  color: #d1d5db;
}

.review-stars .star.filled {
  color: #fbbf24;
}

.rating-value {
  margin-left: 0.5rem;
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
}

.review-text {
  color: #4b5563;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
  max-height: 4.8em;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.review-text.expanded {
  max-height: none;
}

.expand-btn {
  background: none;
  border: none;
  color: #3b82f6;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1rem;
}

.review-images {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.review-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.review-image:hover {
  transform: scale(1.05);
}

/* Related Products Section */
.related-products-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  margin-bottom: 4rem;
}

.related-products-section h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2rem;
  text-align: center;
}

.related-products-carousel {
  position: relative;
}

.products-container {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem 0;
}

.products-container::-webkit-scrollbar {
  display: none;
}

.related-product-card {
  flex-shrink: 0;
  width: 250px;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.related-product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.related-product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.related-product-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.related-product-card .brand {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.related-product-card .price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price .current {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1f2937;
}

.price .original {
  color: #9ca3af;
  text-decoration: line-through;
  font-size: 0.9rem;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  color: #3b82f6;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.carousel-btn:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-50%) scale(1.1);
}

.carousel-btn.left {
  left: -25px;
}

.carousel-btn.right {
  right: -25px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 0 2rem;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  padding: 2rem;
}

.rating-input, .text-input, .name-input {
  margin-bottom: 2rem;
}

.rating-input label, .text-input label, .name-input label {
  display: block;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.star-input {
  display: flex;
  gap: 0.5rem;
}

.star-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #d1d5db;
  cursor: pointer;
  transition: color 0.3s ease;
}

.star-btn:hover,
.star-btn.filled {
  color: #fbbf24;
}

.text-input textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  transition: border-color 0.3s ease;
}

.text-input textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.name-input input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.name-input input:focus {
  outline: none;
  border-color: #3b82f6;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 0 2rem 2rem 2rem;
}

.cancel-btn, .submit-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #f3f4f6;
  color: #6b7280;
}

.cancel-btn:hover {
  background: #e5e7eb;
}

.submit-btn {
  background: #3b82f6;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background: #2563eb;
}

.submit-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

/* Toast Styles */
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideInUp 0.3s ease;
}

.toast.success {
  background: #10b981;
}

.toast.error {
  background: #ef4444;
}

.toast.info {
  background: #3b82f6;
}

@keyframes slideInUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .reviews-summary {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .zoom-result {
    display: none;
  }
}

@media (max-width: 768px) {
  .product-detail-page {
    padding: 1rem 0;
  }
  
  .product-container {
    padding: 0 1rem;
  }
  
  .reviews-section,
  .related-products-section {
    padding: 0 1rem;
  }
  
  .product-title {
    font-size: 2rem;
  }
  
  .main-product-image {
    height: 400px;
  }
  
  .reviews-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .carousel-btn {
    display: none;
  }
  
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-footer {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .share-icons {
    flex-wrap: wrap;
  }
  
  .size-options {
    justify-content: center;
  }
  
  .color-options {
    justify-content: center;
  }
  
  .product-title {
    font-size: 1.8rem;
  }
  
  .main-product-image {
    height: 300px;
  }
}
</style>
