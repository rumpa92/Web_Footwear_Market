const state = {
  items: [],
  isOpen: false,
  isAddedToCartModalVisible: false,
  addedProductInfo: null
}

const getters = {
  cartItems: state => state.items,
  cartTotal: state => {
    return state.items.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  },
  cartItemCount: state => {
    return state.items.reduce((count, item) => {
      return count + item.quantity
    }, 0)
  },
  isCartOpen: state => state.isOpen,
  getCartItem: state => (id, size, color) => {
    return state.items.find(item => 
      item.id === id && item.size === size && item.color === color
    )
  }
}

const mutations = {
  ADD_TO_CART(state, { product, size, color, quantity = 1 }) {
    const existingItem = state.items.find(item => 
      item.id === product.id && item.size === size && item.color === color
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      state.items.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        size,
        color,
        quantity
      })
    }
  },
  REMOVE_FROM_CART(state, { id, size, color }) {
    const index = state.items.findIndex(item => 
      item.id === id && item.size === size && item.color === color
    )
    if (index !== -1) {
      state.items.splice(index, 1)
    }
  },
  UPDATE_CART_ITEM_QUANTITY(state, { id, size, color, quantity }) {
    const item = state.items.find(item => 
      item.id === id && item.size === size && item.color === color
    )
    if (item) {
      if (quantity <= 0) {
        const index = state.items.indexOf(item)
        state.items.splice(index, 1)
      } else {
        item.quantity = quantity
      }
    }
  },
  CLEAR_CART(state) {
    state.items = []
  },
  TOGGLE_CART(state) {
    state.isOpen = !state.isOpen
  },
  SET_CART_OPEN(state, isOpen) {
    state.isOpen = isOpen
  }
}

const actions = {
  addToCart({ commit, state }, payload) {
    commit('ADD_TO_CART', payload)
    commit('SET_CART_OPEN', true)
  },
  removeFromCart({ commit }, payload) {
    commit('REMOVE_FROM_CART', payload)
  },
  updateCartItemQuantity({ commit }, payload) {
    commit('UPDATE_CART_ITEM_QUANTITY', payload)
  },
  clearCart({ commit }) {
    commit('CLEAR_CART')
    commit('SET_CART_OPEN', false)
  },
  toggleCart({ commit }) {
    commit('TOGGLE_CART')
  },
  setCartOpen({ commit }, isOpen) {
    commit('SET_CART_OPEN', isOpen)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
