const state = {
  allProducts: [
    {
      id: 1,
      name: "Urban Runner",
      brand: "Nike",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://cdn.builder.io/api/v1/image/assets%2F320fdd3319e444dc921d47bac71874f5%2F6fd2df8bb40048d9ab174abfc501efb5?format=webp&width=600",
      category: "sneakers",
      gender: "men",
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      colors: ["grey", "black", "white"],
      description: "Modern urban runner with advanced cushioning and breathable mesh design.",
      featured: true,
      inStock: true,
      rating: 4.8,
      reviews: 3104,
      isNew: false,
      isTrending: true
    },
    {
      id: 2,
      name: "Classic Leather",
      brand: "Nike",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://cdn.builder.io/api/v1/image/assets%2F320fdd3319e444dc921d47bac71874f5%2F0af7a1c7254d4db7bbca56748c65097d?format=webp&width=600",
      category: "casual",
      gender: "women",
      sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      colors: ["brown", "tan", "white"],
      description: "Premium leather construction with timeless design and superior comfort.",
      featured: true,
      inStock: true,
      rating: 4.9,
      reviews: 856,
      isNew: false,
      isTrending: false
    },
    {
      id: 3,
      name: "Air Max Elite",
      brand: "Nike",
      price: 159.99,
      originalPrice: 189.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=90",
      category: "running",
      gender: "men",
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      colors: ["black", "white", "red"],
      description: "High-performance running shoe with responsive Air Max cushioning.",
      featured: true,
      inStock: true,
      rating: 4.7,
      reviews: 1250,
      isNew: true,
      isTrending: true
    },
    {
      id: 4,
      name: "Sport Pro Runner",
      brand: "Adidas",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://cdn.builder.io/api/v1/image/assets%2F797156030b234cce89ce7e033f2e19b8%2F2b3c4d5e6f789012abcdef0123456789?format=webp&width=600",
      category: "running",
      gender: "women",
      sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      colors: ["white", "pink", "grey"],
      description: "Professional-grade running shoe with BOOST technology.",
      featured: true,
      inStock: true,
      rating: 4.6,
      reviews: 890,
      isNew: false,
      isTrending: true
    },
    {
      id: 5,
      name: "Lifestyle Comfort",
      brand: "New Balance",
      price: 94.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop&q=90",
      category: "lifestyle",
      gender: "men",
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      colors: ["grey", "navy", "burgundy"],
      description: "All-day comfort with premium materials and classic styling.",
      featured: false,
      inStock: true,
      rating: 4.4,
      reviews: 420,
      isNew: true,
      isTrending: false
    },
    {
      id: 6,
      name: "Street Style Pro",
      brand: "Jordan",
      price: 179.99,
      originalPrice: 199.99,
      image: "https://cdn.builder.io/api/v1/image/assets%2F797156030b234cce89ce7e033f2e19b8%2F3c4d5e6f78901234bcdef0123456789a?format=webp&width=600",
      category: "basketball",
      gender: "kids",
      sizes: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
      colors: ["black", "white", "red"],
      description: "Iconic basketball style meets street fashion in perfect harmony.",
      featured: true,
      inStock: true,
      rating: 4.9,
      reviews: 3200,
      isNew: false,
      isTrending: true
    },
    {
      id: 7,
      name: "Premium Trainer",
      brand: "Puma",
      price: 139.99,
      originalPrice: 169.99,
      image: "https://cdn.builder.io/api/v1/image/assets%2F797156030b234cce89ce7e033f2e19b8%2F9f8e7d6c5b4a3210fedcba0987654321?format=webp&width=600",
      category: "training",
      gender: "men",
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      colors: ["white", "black", "blue"],
      description: "Cross-training shoe designed for versatility and performance.",
      featured: false,
      inStock: true,
      rating: 4.5,
      reviews: 560,
      isNew: true,
      isTrending: false
    },
    {
      id: 8,
      name: "Classic Canvas",
      brand: "Converse",
      price: 69.99,
      originalPrice: 79.99,
      image: "https://cdn.builder.io/api/v1/image/assets%2F797156030b234cce89ce7e033f2e19b8%2F4d5e6f7890123456cdef0123456789ab?format=webp&width=600",
      category: "casual",
      gender: "women",
      sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      colors: ["white", "black", "red"],
      description: "Timeless canvas sneaker with vintage appeal and modern comfort.",
      featured: false,
      inStock: true,
      rating: 4.3,
      reviews: 890,
      isNew: true,
      isTrending: true
    },
    {
      id: 9,
      name: "Tech Runner",
      brand: "Under Armour",
      price: 149.99,
      originalPrice: 179.99,
      image: "https://cdn.builder.io/api/v1/image/assets%2F797156030b234cce89ce7e033f2e19b8%2F5e6f78901234567def0123456789abcd?format=webp&width=600",
      category: "running",
      gender: "men",
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      colors: ["black", "grey", "blue"],
      description: "Smart running shoe with connected technology and premium cushioning.",
      featured: false,
      inStock: true,
      rating: 4.6,
      reviews: 320,
      isNew: true,
      isTrending: false
    },
    {
      id: 10,
      name: "Stability Pro",
      brand: "Asics",
      price: 159.99,
      originalPrice: 179.99,
      image: "https://cdn.builder.io/api/v1/image/assets%2F797156030b234cce89ce7e033f2e19b8%2F6f789012345678ef0123456789abcdef?format=webp&width=600",
      category: "running",
      gender: "women",
      sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      colors: ["blue", "pink", "black"],
      description: "Professional stability running shoe with advanced support system.",
      featured: false,
      inStock: true,
      rating: 4.7,
      reviews: 760,
      isNew: false,
      isTrending: true
    },
    {
      id: 11,
      name: "Comfort Plus",
      brand: "Skechers",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://cdn.builder.io/api/v1/image/assets%2F797156030b234cce89ce7e033f2e19b8%2F789012345678901f0123456789abcdef?format=webp&width=600",
      category: "casual",
      gender: "kids",
      sizes: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
      colors: ["white", "pink", "black"],
      description: "Ultra-comfortable lifestyle shoe with memory foam technology.",
      featured: false,
      inStock: true,
      rating: 4.4,
      reviews: 445,
      isNew: true,
      isTrending: false
    }
  ],
  filteredProducts: [],
  currentProduct: null,
  filters: {
    category: '',
    brand: '',
    gender: '',
    age: '',
    priceRange: [0, 500],
    sizes: [],
    colors: [],
    inStock: false,
    search: ''
  },
  sortBy: 'featured',
  searchSuggestions: []
}

const getters = {
  allProducts: state => state.allProducts,
  featuredProducts: state => state.allProducts.filter(product => product.featured),
  filteredProducts: state => {
    let products = state.allProducts

    if (state.filters.category) {
      products = products.filter(p => p.category === state.filters.category)
    }
    if (state.filters.brand) {
      products = products.filter(p => p.brand === state.filters.brand)
    }
    if (state.filters.gender) {
      products = products.filter(p => p.gender === state.filters.gender)
    }
    if (state.filters.age) {
      products = products.filter(p => p.ageGroup === state.filters.age)
    }
    if (state.filters.inStock) {
      products = products.filter(p => p.inStock)
    }
    if (state.filters.search) {
      const searchTerm = state.filters.search.toLowerCase()
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm) ||
        p.gender.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.colors.some(color => color.toLowerCase().includes(searchTerm))
      )
    }

    products = products.filter(p =>
      p.price >= state.filters.priceRange[0] && p.price <= state.filters.priceRange[1]
    )

    switch (state.sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price)
      case 'price-high':
        return products.sort((a, b) => b.price - a.price)
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating)
      case 'newest':
        return products.sort((a, b) => b.id - a.id)
      default:
        return products.sort((a, b) => b.featured - a.featured)
    }
  },
  currentProduct: state => state.currentProduct,
  productById: state => id => state.allProducts.find(product => product.id === parseInt(id)),
  brands: state => [...new Set(state.allProducts.map(p => p.brand))],
  categories: state => [...new Set(state.allProducts.map(p => p.category))],
  genders: state => [...new Set(state.allProducts.map(p => p.gender))],
  newArrivals: state => state.allProducts.filter(product => product.isNew).slice(0, 4),
  suggestedProducts: state => state.allProducts.filter(product => product.rating >= 4.5).slice(0, 4),
  trendingProducts: state => state.allProducts.filter(product => product.isTrending).slice(0, 4),
  searchSuggestions: state => state.searchSuggestions,
  generateSearchSuggestions: state => query => {
    if (!query || query.length < 2) return []

    const suggestions = new Set()
    const searchTerm = query.toLowerCase()

    // Add matching brands
    state.allProducts.forEach(product => {
      if (product.brand.toLowerCase().includes(searchTerm)) {
        suggestions.add(product.brand)
      }
      if (product.category.toLowerCase().includes(searchTerm)) {
        suggestions.add(product.category.charAt(0).toUpperCase() + product.category.slice(1))
      }
      if (product.gender.toLowerCase().includes(searchTerm)) {
        const genderMap = { 'men': "Men's", 'women': "Women's", 'kids': "Kids'" }
        suggestions.add(genderMap[product.gender] || product.gender)
      }
      if (product.name.toLowerCase().includes(searchTerm)) {
        suggestions.add(product.name)
      }
      product.colors.forEach(color => {
        if (color.toLowerCase().includes(searchTerm)) {
          suggestions.add(color.charAt(0).toUpperCase() + color.slice(1))
        }
      })
    })

    return Array.from(suggestions).slice(0, 8)
  }
}

const mutations = {
  SET_CURRENT_PRODUCT(state, product) {
    state.currentProduct = product
  },
  SET_FILTER(state, { type, value }) {
    state.filters[type] = value
  },
  CLEAR_FILTERS(state) {
    state.filters = {
      category: '',
      brand: '',
      gender: '',
      age: '',
      priceRange: [0, 500],
      sizes: [],
      colors: [],
      inStock: false,
      search: ''
    }
  },
  SET_SORT_BY(state, sortBy) {
    state.sortBy = sortBy
  },
  SET_SEARCH_SUGGESTIONS(state, suggestions) {
    state.searchSuggestions = suggestions
  }
}

const actions = {
  setCurrentProduct({ commit }, product) {
    commit('SET_CURRENT_PRODUCT', product)
  },
  setFilter({ commit }, filter) {
    commit('SET_FILTER', filter)
  },
  clearFilters({ commit }) {
    commit('CLEAR_FILTERS')
  },
  setSortBy({ commit }, sortBy) {
    commit('SET_SORT_BY', sortBy)
  },
  generateSearchSuggestions({ commit, getters }, query) {
    const suggestions = getters.generateSearchSuggestions(query)
    commit('SET_SEARCH_SUGGESTIONS', suggestions)
    return suggestions
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
