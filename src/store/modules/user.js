// Check if user exists in localStorage, if not create a default user for testing
const defaultUser = {
  id: 1,
  name: 'Anushka Sen',
  email: 'anushka.sen@example.com',
  avatar: 'https://cdn.builder.io/api/v1/image/assets%2Ff38a76fc1a294379bcaebc0d09797bbf%2F38eb38427e56410a909961865907d050?format=webp&width=800'
}

// Set default user for testing if no user exists
if (!localStorage.getItem('user')) {
  localStorage.setItem('user', JSON.stringify(defaultUser))
} else {
  // Update existing user with new name and avatar
  const existingUser = JSON.parse(localStorage.getItem('user'))
  existingUser.name = 'Anushka Sen'
  existingUser.email = 'anushka.sen@example.com'
  existingUser.avatar = 'https://cdn.builder.io/api/v1/image/assets%2Ff38a76fc1a294379bcaebc0d09797bbf%2F38eb38427e56410a909961865907d050?format=webp&width=800'
  localStorage.setItem('user', JSON.stringify(existingUser))
}

const state = {
  currentUser: defaultUser,
  isAuthenticated: true,
  wishlist: [],
  addresses: [],
  orders: [],
  location: {
    city: 'New York',
    state: 'NY',
    country: 'USA',
    latitude: null,
    longitude: null,
    formatted: 'New York, NY',
    manual: false,
    timestamp: null
  },
  locationPermission: 'pending' // 'pending', 'granted', 'denied', 'skipped', 'dismissed'
}

const getters = {
  currentUser: state => state.currentUser,
  isAuthenticated: state => state.isAuthenticated,
  wishlist: state => state.wishlist,
  addresses: state => state.addresses,
  orders: state => state.orders,
  location: state => state.location,
  locationPermission: state => state.locationPermission,
  formattedLocation: state => {
    return state.location.formatted || `${state.location.city}, ${state.location.state}`
  },
  shouldShowLocationModal: state => {
    return state.locationPermission === 'pending'
  },
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
  },
  SET_USER_LOCATION(state, locationData) {
    state.location = {
      ...state.location,
      ...locationData,
      timestamp: Date.now()
    }
    // Save location to localStorage
    localStorage.setItem('userLocation', JSON.stringify(state.location))
  },
  SET_LOCATION_PERMISSION(state, permission) {
    state.locationPermission = permission
    localStorage.setItem('locationPermission', permission)
  },
  LOAD_LOCATION_DATA(state) {
    const savedLocation = localStorage.getItem('userLocation')
    const savedPermission = localStorage.getItem('locationPermission')

    if (savedLocation) {
      try {
        state.location = JSON.parse(savedLocation)
      } catch (error) {
        console.error('Error parsing saved location:', error)
      }
    }

    if (savedPermission) {
      state.locationPermission = savedPermission
    }
  }
}

const actions = {
  login({ commit }, credentials) {
    // Simulate login - in real app, this would call an API
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: 1,
          name: 'Anushka Sen',
          email: credentials.email,
          avatar: 'https://cdn.builder.io/api/v1/image/assets%2Ff38a76fc1a294379bcaebc0d09797bbf%2F38eb38427e56410a909961865907d050?format=webp&width=800'
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
          avatar: 'https://cdn.builder.io/api/v1/image/assets%2Ff38a76fc1a294379bcaebc0d09797bbf%2F38eb38427e56410a909961865907d050?format=webp&width=800'
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
  },
  setUserLocation({ commit }, locationData) {
    commit('SET_USER_LOCATION', locationData)
  },
  setLocationPermission({ commit }, permission) {
    commit('SET_LOCATION_PERMISSION', permission)
  },
  loadLocationData({ commit }) {
    commit('LOAD_LOCATION_DATA')
  },
  resetLocationPermission({ commit }) {
    commit('SET_LOCATION_PERMISSION', 'pending')
    localStorage.removeItem('locationPermission')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
