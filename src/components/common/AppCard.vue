<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  noPadding: {
    type: Boolean,
    default: false
  }
});

const cardClasses = computed(() => 
  `app-card bg-white dark:bg-dark backdrop-blur-sm rounded-lg relative overflow-hidden animation-slide-up ${props.noPadding ? '' : 'p-6'}`
);
</script>

<template>
  <div :class="cardClasses">
    <div class="card-glow"></div>
    <div v-if="title || subtitle" class="mb-4 relative z-10">
      <h3 v-if="title" class="text-lg font-medium dark:text-white text-gray-900">{{ title }}</h3>
      <p v-if="subtitle" class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ subtitle }}</p>
    </div>
    <div class="relative z-10">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

.app-card {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px 0 var(--bg-primary);
  border: 1px solid rgba(255, 255, 255, 0.18);
  animation: slide-up 0.5s ease-in-out;
}

animation-slide-up {
  animation: slide-up 0.3s ease-in-out;
}
@keyframes slide-up {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.dark .app-card {
  @apply bg-dark/50;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.card-glow {
  position: absolute;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(59, 130, 246, 0) 70%);
  border-radius: 50%;
  bottom: -100px;
  right: -100px;
  filter: blur(20px);
  pointer-events: none;
  z-index: 1;
}

.dark .card-glow {
  background: radial-gradient(circle, rgba(142, 96, 250, 0.2) 0%, rgba(96, 165, 250, 0) 70%);
}
</style>
