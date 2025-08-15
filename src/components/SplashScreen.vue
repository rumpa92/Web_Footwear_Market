<template>
  <transition name="splash-fade" appear>
    <div v-if="showSplash" class="splash-screen">
      <div class="splash-content">
        <!-- Brand Logo -->
        <div class="logo-container">
          <div class="logo-wrapper">
            <span class="logo-emoji">👟</span>
            <h1 class="logo-text">FootMarket</h1>
          </div>
          <div class="logo-underline"></div>
        </div>

        <!-- Loading Text -->
        <div class="loading-text-container">
          <p class="loading-text">Loading your style for footwear</p>
          <div class="typing-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>

        <!-- Loading Animation -->
        <div class="loading-animation">
          <div class="shoe-track">
            <div class="animated-shoe">👟</div>
          </div>
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
        </div>

        <!-- Floating Shoes Animation -->
        <div class="floating-shoes">
          <span class="floating-shoe shoe-1">👟</span>
          <span class="floating-shoe shoe-2">👠</span>
          <span class="floating-shoe shoe-3">👞</span>
          <span class="floating-shoe shoe-4">🥿</span>
          <span class="floating-shoe shoe-5">🩴</span>
          <span class="floating-shoe shoe-6">🥾</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SplashScreen',
  data() {
    return {
      showSplash: true
    }
  },
  mounted() {
    console.log('SplashScreen mounted, will hide in 1.5 seconds')
    // Hide splash screen after animation completes
    setTimeout(() => {
      console.log('Hiding splash screen from SplashScreen component')
      this.showSplash = false
      this.$emit('splash-complete')
    }, 1500) // Reduced from 4000 to 1500
  }
}
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
}

.splash-content {
  text-align: center;
  color: white;
  position: relative;
  z-index: 2;
}

.logo-container {
  margin-bottom: var(--space-2xl);
  animation: logoAppear 1s ease-out;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.logo-emoji {
  font-size: 4rem;
  animation: bounce 2s ease-in-out infinite;
  transform-origin: center bottom;
}

.logo-text {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin: 0;
  letter-spacing: 0.05em;
  animation: slideInRight 1s ease-out 0.3s both;
}

.logo-underline {
  height: 4px;
  background: linear-gradient(90deg, transparent, white, transparent);
  border-radius: var(--border-radius-full);
  animation: expandLine 1.5s ease-out 0.8s both;
  transform: scaleX(0);
}

.loading-text-container {
  margin-bottom: var(--space-2xl);
  animation: fadeInUp 1s ease-out 1.5s both;
}

.loading-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  margin: 0 0 var(--space-md) 0;
  opacity: 0.9;
  letter-spacing: 0.02em;
}

.typing-dots {
  display: flex;
  justify-content: center;
  gap: var(--space-xs);
}

.dot {
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  animation: typingDot 1.5s ease-in-out infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

.loading-animation {
  margin-bottom: var(--space-xl);
  animation: fadeInUp 1s ease-out 2s both;
}

.shoe-track {
  position: relative;
  width: 200px;
  height: 40px;
  margin: 0 auto var(--space-md);
  border-radius: var(--border-radius-full);
  background: rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.animated-shoe {
  position: absolute;
  top: 50%;
  left: -30px;
  transform: translateY(-50%);
  font-size: 1.5rem;
  animation: moveShoe 3s ease-in-out infinite;
}

.progress-bar {
  width: 200px;
  height: 6px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.3);
  border-radius: var(--border-radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, white, rgba(255, 255, 255, 0.8), white);
  border-radius: var(--border-radius-full);
  animation: fillProgress 3s ease-out infinite;
  transform: translateX(-100%);
}

.floating-shoes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-shoe {
  position: absolute;
  font-size: 2rem;
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}

.shoe-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shoe-2 {
  top: 20%;
  right: 15%;
  animation-delay: 1s;
}

.shoe-3 {
  bottom: 30%;
  left: 5%;
  animation-delay: 2s;
}

.shoe-4 {
  bottom: 20%;
  right: 10%;
  animation-delay: 3s;
}

.shoe-5 {
  top: 60%;
  left: 20%;
  animation-delay: 4s;
}

.shoe-6 {
  top: 40%;
  right: 25%;
  animation-delay: 5s;
}

/* Animations */
@keyframes logoAppear {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes slideInRight {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes expandLine {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typingDot {
  0%, 60%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  30% {
    transform: scale(1.3);
    opacity: 0.7;
  }
}

@keyframes moveShoe {
  0% {
    left: -30px;
  }
  50% {
    left: calc(100% + 30px);
  }
  51% {
    left: -30px;
  }
  100% {
    left: -30px;
  }
}

@keyframes fillProgress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
    opacity: 0.4;
  }
}

/* Splash transition */
.splash-fade-enter-active {
  transition: opacity 0.5s ease-in;
}

.splash-fade-leave-active {
  transition: all 0.8s ease-out;
}

.splash-fade-enter {
  opacity: 0;
}

.splash-fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .logo-emoji {
    font-size: 3rem;
  }
  
  .logo-text {
    font-size: var(--font-size-3xl);
  }
  
  .loading-text {
    font-size: var(--font-size-base);
    padding: 0 var(--space-md);
  }
  
  .shoe-track {
    width: 150px;
  }
  
  .progress-bar {
    width: 150px;
  }
  
  .floating-shoe {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .logo-wrapper {
    flex-direction: column;
    gap: var(--space-sm);
  }
  
  .logo-emoji {
    font-size: 2.5rem;
  }
  
  .logo-text {
    font-size: var(--font-size-2xl);
  }
  
  .loading-text {
    font-size: var(--font-size-sm);
  }
}

/* Performance optimizations */
.splash-screen * {
  backface-visibility: hidden;
  perspective: 1000px;
}

/* High contrast mode support */
@media (prefers-reduced-motion: reduce) {
  .splash-screen *,
  .splash-screen *::before,
  .splash-screen *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
