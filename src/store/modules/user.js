const state = {
  currentUser: {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612789c?w=100&h=100&fit=crop'
  },
  isAuthenticated: true,
  wishlist: [],
  addresses: [],
  orders: []
}

const getters = {
  currentUser: state => state.currentUser,
  isAuthenticated: state => state.isAuthenticated,
  wishlist: state => state.wishlist,
  addresses: state => state.addresses,
  orders: state => state.orders,
  isInWishlist: state => productId => {
    return state.wishlist.some(item => item.id === productId)
  }
}

const mutations = {
  SET_USER(state, user) {
    state.currentUser = user
    state.isAuthenticated = !!user
  },
  LOGOUT_USER(state) {
    state.currentUser = null
    state.isAuthenticated = false
    state.wishlist = []
    state.addresses = []
    state.orders = []
  },
  ADD_TO_WISHLIST(state, product) {
    const exists = state.wishlist.find(item => item.id === product.id)
    if (!exists) {
      state.wishlist.push(product)
    }
  },
  REMOVE_FROM_WISHLIST(state, productId) {
    const index = state.wishlist.findIndex(item => item.id === productId)
    if (index !== -1) {
      state.wishlist.splice(index, 1)
    }
  },
  ADD_ADDRESS(state, address) {
    state.addresses.push({
      id: Date.now(),
      ...address,
      isDefault: state.addresses.length === 0
    })
  },
  UPDATE_ADDRESS(state, { id, address }) {
    const index = state.addresses.findIndex(addr => addr.id === id)
    if (index !== -1) {
      state.addresses.splice(index, 1, { id, ...address })
    }
  },
  DELETE_ADDRESS(state, id) {
    const index = state.addresses.findIndex(addr => addr.id === id)
    if (index !== -1) {
      state.addresses.splice(index, 1)
    }
  },
  ADD_ORDER(state, order) {
    state.orders.unshift({
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'confirmed',
      ...order
    })
  }
}

const actions = {
  login({ commit }, credentials) {
    // Simulate login - in real app, this would call an API
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: 1,
          name: 'Rumpa Samanta',
          email: credentials.email,
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c2002c?w=100&h=100&fit=crop'
        }
        // Save to localStorage for persistence
        localStorage.setItem('user', JSON.stringify(user))
        commit('SET_USER', user)
        resolve(user)
      }, 1000)
    })
  },
  logout({ commit }) {
    // Clear localStorage
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')
    commit('LOGOUT_USER')
  },
  // Initialize user from localStorage on app start
  initializeAuth({ commit }) {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user')
    if (user) {
      try {
        const parsedUser = JSON.parse(user)
        commit('SET_USER', parsedUser)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
      }
    }
  },
  register({ commit }, userData) {
    // Simulate registration - in real app, this would call an API
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: Date.now(),
          ...userData,
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c2002c?w=100&h=100&fit=crop'
        }
        // Save to localStorage for persistence
        localStorage.setItem('user', JSON.stringify(user))
        commit('SET_USER', user)
        resolve(user)
      }, 1000)
    })
  },
  addToWishlist({ commit }, product) {
    commit('ADD_TO_WISHLIST', product)
  },
  removeFromWishlist({ commit }, productId) {
    commit('REMOVE_FROM_WISHLIST', productId)
  },
  toggleWishlist({ commit, getters }, product) {
    if (getters.isInWishlist(product.id)) {
      commit('REMOVE_FROM_WISHLIST', product.id)
    } else {
      commit('ADD_TO_WISHLIST', product)
    }
  },
  addAddress({ commit }, address) {
    commit('ADD_ADDRESS', address)
  },
  updateAddress({ commit }, payload) {
    commit('UPDATE_ADDRESS', payload)
  },
  deleteAddress({ commit }, id) {
    commit('DELETE_ADDRESS', id)
  },
  placeOrder({ commit, rootGetters }, orderData) {
    const cartItems = rootGetters['cart/cartItems']
    const total = rootGetters['cart/cartTotal']
    
    const order = {
      items: cartItems,
      total,
      ...orderData
    }
    
    commit('ADD_ORDER', order)
    commit('cart/CLEAR_CART', null, { root: true })
    
    return Promise.resolve(order)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
