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
      reviews: 1250
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
      reviews: 890
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
      reviews: 2150
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
      reviews: 750
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
      reviews: 420
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
      reviews: 3200
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
    inStock: false
  },
  sortBy: 'featured'
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
  genders: state => [...new Set(state.allProducts.map(p => p.gender))]
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
      inStock: false
    }
  },
  SET_SORT_BY(state, sortBy) {
    state.sortBy = sortBy
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
