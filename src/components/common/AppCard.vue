<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useMousePosition } from '../../composables/useMousePosition';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  noPadding: {
    type: Boolean,
    default: false,
  },
  glow: {
    type: Boolean,
    default: false,
  },
});

const cardClasses = computed(
  () =>
    `app-card rounded-lg relative overflow-hidden animation-slide-up ${
      props.noPadding ? '' : 'p-6'
    }`
);
const cardRef = ref<HTMLElement | null>(null);
const blobRef = ref<HTMLElement | null>(null);
const fakeBlobRef = ref<HTMLElement | null>(null);

// Usando reactive refs para manejar la posición del mouse
const { x: mouseX, y: mouseY } = useMousePosition();

// watchEffect se ejecutará cada vez que sus dependencias cambien o el componente se monte
// Esto garantiza que funcione correctamente cuando el componente se desmonta y se vuelve a montar
watchEffect(() => {
  // Solo actualizar cuando glow está activo y las referencias existen
  if (!props.glow || !blobRef.value || !fakeBlobRef.value) return;

  const newX = mouseX.value;
  const newY = mouseY.value;
  const fblob = fakeBlobRef.value;
  const blob = blobRef.value;
  const rec = fblob.getBoundingClientRect();

  blob.style.opacity = '1';
  blob.animate(
    [
      {
        transform: `translate(${newX - rec.left - rec.width / 2}px,${
          newY - rec.top - rec.height / 2
        }px)`,
      },
    ],
    { duration: 300, fill: 'forwards' }
  );
});
</script>

<template>
  <div class="card-outer" ref="cardRef">
    <div :class="cardClasses">
      <div v-if="title || subtitle" class="mb-4 relative z-10">
        <h3
          v-if="title"
          class="text-lg font-medium dark:text-white text-gray-900"
        >
          {{ title }}
        </h3>
        <p
          v-if="subtitle"
          class="text-sm text-gray-500 dark:text-gray-400 mt-1"
        >
          {{ subtitle }}
        </p>
      </div>
      <div class="relative z-10">
        <slot></slot>
      </div>
    </div>
    <div class="blob" ref="blobRef"></div>
    <div class="fakeblob" ref="fakeBlobRef"></div>
  </div>
</template>

<style scoped>
.card-outer {
  position: relative;
  padding: 2px;
  overflow: hidden;
  transition: all 300ms ease-in-out;
  @apply rounded-lg;
}

.app-card {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 32px 0 var(--bg-primary);
  border: 1px solid rgba(255, 255, 255, 0.18);
  animation: slide-up 0.5s ease-in-out;
  z-index: 2;
  height: 100%;
}

.animation-slide-up {
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
  @apply bg-dark/95;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.blob {
  filter: blur(80px);
  position: absolute;
  z-index: 0;
  top: 0;
  opacity: 0;
  left: 0;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: #10b981;
  transition: all 300ms ease-in-out;
}

.fakeblob {
  visibility: hidden;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
