import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Simple toast notification plugin
Vue.prototype.$toast = {
  success(message) {
    console.log('✅ Success:', message)
    // In a real app, this would show a toast notification
  },
  error(message) {
    console.log('❌ Error:', message)
    // In a real app, this would show a toast notification
  },
  info(message) {
    console.log('ℹ️ Info:', message)
    // In a real app, this would show a toast notification
  }
}

// Initialize authentication state
store.dispatch('user/initializeAuth')

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
