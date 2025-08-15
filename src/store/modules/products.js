const state = {
  allProducts: [
    {
      id: 1,
      name: "Nike Air Force 1",
      brand: "Nike",
      price: 149.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      category: "sneakers",
      gender: "men",
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      colors: ["white", "black", "red"],
      description: "The classic basketball shoe with timeless style and comfort.",
      featured: true,
      inStock: true,
      rating: 4.8,
      reviews: 1250,
      isNew: false,
      isTrending: true
    },
    {
      id: 2,
      name: "Adidas UltraBoost 22",
      brand: "Adidas",
      price: 189.99,
      originalPrice: 189.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: "running",
      gender: "women",
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      colors: ["black", "white", "blue"],
      description: "Revolutionary running shoe with responsive BOOST midsole.",
      featured: true,
      inStock: true,
      rating: 4.7,
      reviews: 890,
      isNew: false,
      isTrending: false
    },
    {
      id: 3,
      name: "Converse Chuck Taylor All Star",
      brand: "Converse",
      price: 59.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      category: "casual",
      gender: "kids",
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      colors: ["black", "white", "red"],
      description: "Iconic canvas sneaker that's been a favorite for decades.",
      featured: false,
      inStock: true,
      rating: 4.5,
      reviews: 2150,
      isNew: true,
      isTrending: false
    },
    {
      id: 4,
      name: "Vans Old Skool",
      brand: "Vans",
      price: 79.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
      category: "skate",
      gender: "men",
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      colors: ["black", "white"],
      description: "Classic skate shoe with durable construction and timeless design.",
      featured: true,
      inStock: true,
      rating: 4.6,
      reviews: 750,
      isNew: false,
      isTrending: true
    },
    {
      id: 5,
      name: "New Balance 574",
      brand: "New Balance",
      price: 94.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
      category: "lifestyle",
      gender: "women",
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      colors: ["gray", "navy", "burgundy"],
      description: "Retro-inspired sneaker with premium suede and mesh construction.",
      featured: false,
      inStock: true,
      rating: 4.4,
      reviews: 420,
      isNew: true,
      isTrending: false
    },
    {
      id: 6,
      name: "Jordan Air Jordan 1",
      brand: "Jordan",
      price: 199.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
      category: "basketball",
      gender: "kids",
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      colors: ["black", "white", "red"],
      description: "Legendary basketball shoe that revolutionized sneaker culture.",
      featured: true,
      inStock: false,
      rating: 4.9,
      reviews: 3200,
      isNew: false,
      isTrending: true
    },
    {
      id: 7,
      name: "Puma RS-X Sneakers",
      brand: "Puma",
      price: 129.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1608667508764-33cf0726aae8?w=400&h=400&fit=crop",
      category: "lifestyle",
      gender: "men",
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      colors: ["white", "black", "gray"],
      description: "Retro-futuristic design meets contemporary comfort.",
      featured: false,
      inStock: true,
      rating: 4.3,
      reviews: 560,
      isNew: true,
      isTrending: false
    },
    {
      id: 8,
      name: "Reebok Classic Leather",
      brand: "Reebok",
      price: 79.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop",
      category: "casual",
      gender: "women",
      sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      colors: ["white", "black"],
      description: "Timeless classic with premium leather construction.",
      featured: false,
      inStock: true,
      rating: 4.6,
      reviews: 890,
      isNew: true,
      isTrending: true
    },
    {
      id: 9,
      name: "Under Armour HOVR Phantom",
      brand: "Under Armour",
      price: 159.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop",
      category: "running",
      gender: "men",
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      colors: ["black", "gray", "blue"],
      description: "Connected running shoe with smart coaching technology.",
      featured: false,
      inStock: true,
      rating: 4.4,
      reviews: 320,
      isNew: true,
      isTrending: false
    },
    {
      id: 10,
      name: "Asics Gel-Kayano 29",
      brand: "Asics",
      price: 169.99,
      originalPrice: 169.99,
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop",
      category: "running",
      gender: "women",
      sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      colors: ["blue", "pink", "black"],
      description: "Premium stability running shoe for overpronators.",
      featured: false,
      inStock: true,
      rating: 4.7,
      reviews: 760,
      isNew: false,
      isTrending: true
    },
    {
      id: 11,
      name: "Skechers D'Lites",
      brand: "Skechers",
      price: 69.99,
      originalPrice: 89.99,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop",
      category: "casual",
      gender: "kids",
      sizes: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
      colors: ["white", "pink", "black"],
      description: "Chunky sneaker with memory foam comfort.",
      featured: false,
      inStock: true,
      rating: 4.2,
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
