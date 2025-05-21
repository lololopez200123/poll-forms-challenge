<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) =>
      ['primary', 'secondary', 'outline', 'text'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
  },
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
    validator: (value: string) => ['button', 'submit', 'reset'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

// Manejar el clic con una pequeña demora
const emit = defineEmits(['click']);

const handleClick = (event: MouseEvent) => {
  // Emitir el evento después de un breve retraso para que se vea la animación
  setTimeout(() => {
    emit('click', event);
  }, 150); // 150ms es suficiente para ver el efecto sin sentir retraso
};
</script>

<template>
  <button
    :type="type === 'submit' ? 'submit' : 'button'"
    :disabled="disabled"
    @click="type !== 'submit' ? handleClick($event) : null"
    :class="[
      'btn inline-flex items-center justify-center rounded-md font-medium transition-colors text-nowrap ',
      {
        'px-4 py-2 text-sm': size === 'sm',
        'px-5 py-2.5 text-sm': size === 'md',
        'px-6 py-3 text-base': size === 'lg',
        'bg-primary hover:bg-primary border border-primary text-white hover:glow-primary':
          variant === 'primary',
        'bg-secondary hover:bg-secondary border border-secondary text-white hover:glow-secondary':
          variant === 'secondary',
        'border border-gray-300 dark:border-gray-700  dark:bg-gray-800 text-gray-700 dark:text-gray-200':
          variant === 'outline',
        'text-black dark:text-white': variant === 'text',
        'btn-disabled': disabled,
      },
    ]"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.hover\:glow-primary:hover:not(:disabled) {
  box-shadow: 0 0 15px color-mix(in srgb, var(--primary) 50%, transparent);
}

.hover\:glow-secondary:hover:not(:disabled) {
  box-shadow: 0 0 15px color-mix(in srgb, var(--secondary) 50%, transparent);
}

.hover\:glow-outline:hover:not(:disabled) {
  box-shadow: 0 0 15px rgba(128, 128, 128, 0.3);
}

.hover\:glow-text:hover:not(:disabled) {
  box-shadow: 0 0 10px color-mix(in srgb, var(--primary) 30%, transparent);
}

.btn-disabled {
  cursor: not-allowed;
  position: relative;
}

.btn-disabled::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: inherit;
}

.dark .btn-disabled::before {
  background-color: rgba(0, 0, 0, 0.2);
}

button {
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

/* Efecto ripple más rápido */
button::after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.2s, opacity 0.2s;
}

button:active::after {
  transform: scale(0, 0);
  opacity: 0.5;
  transition: 0s;
}

.bg-primary {
  background-color: var(--primary);
}

.bg-secondary {
  background-color: var(--secondary);
}

.text-primary {
  color: var(--primary);
}
</style>
