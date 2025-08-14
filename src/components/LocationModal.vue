<template>
  <div v-if="showModal" class="location-modal-backdrop" @click="handleBackdropClick">
    <div class="location-modal" @click.stop>
      <div class="modal-header">
        <div class="location-icon">
          <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <h2 class="modal-title">Find the perfect shoes near you</h2>
        <p class="modal-subtitle">Enable location or search by city/ZIP for faster delivery and local deals.</p>
      </div>

      <div class="modal-content">
        <div class="benefits-list">
          <div class="benefit-item">
            <svg class="benefit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span>Faster delivery options</span>
          </div>
          <div class="benefit-item">
            <svg class="benefit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>Local store availability</span>
          </div>
          <div class="benefit-item">
            <svg class="benefit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
            <span>Exclusive local deals</span>
          </div>
        </div>

        <div class="manual-location" v-if="showManualInput">
          <div class="form-group">
            <label for="manualLocation" class="form-label">Enter your city or ZIP code</label>
            <input
              id="manualLocation"
              v-model="manualLocation"
              type="text"
              class="form-input"
              placeholder="e.g., New York, 10001"
              @keyup.enter="handleManualLocation"
            />
          </div>
        </div>
      </div>

      <div class="modal-actions">
        <button
          @click="requestLocation"
          class="btn btn-primary btn-full location-btn"
          :disabled="isLocating"
        >
          <svg v-if="isLocating" class="loading-spinner" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          {{ isLocating ? 'Getting your location...' : 'Enable Location Access' }}
        </button>

        <button
          @click="toggleManualInput"
          class="btn btn-outline btn-full manual-btn"
        >
          {{ showManualInput ? 'Use Current Location Instead' : 'Enter Location Manually' }}
        </button>

        <button
          v-if="showManualInput"
          @click="handleManualLocation"
          class="btn btn-secondary btn-full"
          :disabled="!manualLocation.trim()"
        >
          Set Location
        </button>

        <div class="skip-actions">
          <button @click="skipForNow" class="skip-btn">
            Skip for now
          </button>
          <button @click="dismissPermanently" class="skip-btn permanent-skip">
            Don't ask again
          </button>
        </div>
      </div>

      <button @click="closeModal" class="close-btn" aria-label="Close modal">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LocationModal',
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLocating: false,
      showManualInput: false,
      manualLocation: '',
      error: null
    }
  },
  methods: {
    ...mapActions('user', ['setUserLocation', 'setLocationPermission']),
    
    async requestLocation() {
      if (!navigator.geolocation) {
        this.error = 'Geolocation is not supported by this browser'
        this.showManualInput = true
        return
      }

      this.isLocating = true
      this.error = null

      try {
        const position = await this.getCurrentPosition()
        const { latitude, longitude } = position.coords
        
        // Reverse geocoding to get city name
        const locationData = await this.reverseGeocode(latitude, longitude)
        
        await this.setUserLocation({
          latitude,
          longitude,
          city: locationData.city,
          state: locationData.state,
          country: locationData.country,
          timestamp: Date.now()
        })
        
        await this.setLocationPermission('granted')
        this.$emit('location-set', locationData)
        this.closeModal()
        
      } catch (error) {
        console.error('Location error:', error)
        this.error = 'Unable to get your location. Please try manually.'
        this.showManualInput = true
        await this.setLocationPermission('denied')
      } finally {
        this.isLocating = false
      }
    },
    
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minutes
          }
        )
      })
    },
    
    async reverseGeocode(lat, lng) {
      try {
        // Using a mock geocoding service - in production, use Google Maps API or similar
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
        const data = await response.json()
        
        return {
          city: data.city || data.locality || 'Unknown City',
          state: data.principalSubdivision || '',
          country: data.countryName || '',
          formatted: `${data.city || data.locality}, ${data.principalSubdivision}`
        }
      } catch (error) {
        console.error('Geocoding error:', error)
        return {
          city: 'Unknown City',
          state: '',
          country: '',
          formatted: 'Unknown Location'
        }
      }
    },
    
    async handleManualLocation() {
      if (!this.manualLocation.trim()) return
      
      try {
        // Mock geocoding for manual input
        const locationData = {
          city: this.manualLocation.trim(),
          state: '',
          country: '',
          formatted: this.manualLocation.trim(),
          manual: true
        }
        
        await this.setUserLocation(locationData)
        this.$emit('location-set', locationData)
        this.closeModal()
        
      } catch (error) {
        console.error('Manual location error:', error)
        this.error = 'Unable to set location. Please try again.'
      }
    },
    
    toggleManualInput() {
      this.showManualInput = !this.showManualInput
      this.error = null
    },
    
    async skipForNow() {
      await this.setLocationPermission('skipped')
      this.closeModal()
    },
    
    async dismissPermanently() {
      await this.setLocationPermission('dismissed')
      this.closeModal()
    },
    
    closeModal() {
      this.$emit('close')
    },
    
    handleBackdropClick() {
      this.skipForNow()
    }
  }
}
</script>

<style scoped>
.location-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal-backdrop);
  padding: var(--space-md);
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease-out;
}

.location-modal {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-2xl);
  box-shadow: var(--shadow-xl);
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.4s ease-out;
}

.modal-header {
  text-align: center;
  padding: var(--space-2xl) var(--space-xl) var(--space-lg);
  border-bottom: 1px solid var(--border-light);
}

.location-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto var(--space-lg);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.location-icon .icon {
  width: 2rem;
  height: 2rem;
}

.modal-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0 0 var(--space-sm) 0;
  line-height: var(--line-height-tight);
}

.modal-subtitle {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  margin: 0;
  line-height: var(--line-height-normal);
}

.modal-content {
  padding: var(--space-xl);
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-light);
}

.benefit-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #667eea;
  flex-shrink: 0;
}

.benefit-item span {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.manual-location {
  margin-bottom: var(--space-lg);
}

.form-group {
  margin-bottom: var(--space-md);
}

.form-label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.form-input {
  width: 100%;
  padding: var(--space-md);
  font-size: var(--font-size-base);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition-fast);
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.modal-actions {
  padding: var(--space-xl);
  border-top: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.location-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-lg);
  transition: var(--transition-normal);
}

.location-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px 0 rgba(102, 126, 234, 0.4);
}

.manual-btn {
  border: 2px solid var(--border-color);
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.manual-btn:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.loading-spinner {
  width: 1.25rem;
  height: 1.25rem;
  animation: spin 1s linear infinite;
}

.skip-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-lg);
  margin-top: var(--space-md);
  padding-top: var(--space-md);
  border-top: 1px solid var(--border-light);
}

.skip-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-md);
  transition: var(--transition-fast);
}

.skip-btn:hover {
  color: var(--text-primary);
  background-color: var(--bg-light);
}

.permanent-skip {
  color: var(--error-color);
}

.permanent-skip:hover {
  color: var(--error-color);
  background-color: rgba(231, 76, 60, 0.1);
}

.close-btn {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
}

.close-btn:hover {
  color: var(--text-primary);
  background-color: var(--bg-light);
}

.close-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Animations */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Mobile responsiveness */
@media (max-width: 480px) {
  .location-modal {
    margin: var(--space-sm);
    max-width: calc(100vw - 2rem);
  }
  
  .modal-header {
    padding: var(--space-xl) var(--space-md) var(--space-lg);
  }
  
  .modal-content {
    padding: var(--space-lg) var(--space-md);
  }
  
  .modal-actions {
    padding: var(--space-lg) var(--space-md);
  }
  
  .modal-title {
    font-size: var(--font-size-xl);
  }
  
  .skip-actions {
    flex-direction: column;
    gap: var(--space-sm);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .location-modal-backdrop {
    animation: none;
  }
  
  .location-modal {
    animation: none;
  }
  
  .loading-spinner {
    animation: none;
  }
}
</style>
