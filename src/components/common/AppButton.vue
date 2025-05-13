<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'outline', 'text'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)},
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
    validator: (value: string) => ['button', 'submit', 'reset'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'btn btn-primary inline-flex items-center justify-center rounded-md font-medium transition-colors text-nowrap ',
      {
        'px-4 py-2 text-sm': size === 'sm',
        'px-5 py-2.5 text-sm': size === 'md',
        'px-6 py-3 text-base': size === 'lg',
        'bg-primary hover:bg-primary text-white': variant === 'primary',
        'bg-secondary hover:bg-secondary text-white': variant === 'secondary',
        'border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700': variant === 'outline',
        'text-primary dark:text-primary hover:bg-gray-100 dark:hover:bg-gray-800': variant === 'text',
        'opacity-50 cursor-not-allowed': disabled
      }
    ]"
  >
    <slot></slot>
  </button>
</template>
