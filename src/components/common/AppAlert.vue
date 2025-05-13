<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value: string) => ['success', 'error', 'info', 'warning'].includes(value)
  },
  message: {
    type: String,
    required: true
  },
  dismissible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['dismiss']);
</script>

<template>
  <div
    :class="[
      'px-4 py-3 rounded mb-4 border',
      {
        'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400': type === 'success',
        'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400': type === 'error',
        'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400': type === 'info',
        'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400': type === 'warning'
      }
    ]"
  >
    <div class="flex justify-between items-start">
      <div>{{ message }}</div>
      <button
        v-if="dismissible"
        @click="emit('dismiss')"
        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 ml-2"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>
