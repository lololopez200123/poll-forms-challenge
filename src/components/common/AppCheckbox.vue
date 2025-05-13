<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: true
  },
  id: {
    type: String,
    default: () => `checkbox-${Math.random().toString(36).substring(2, 9)}`
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const inputId = computed(() => props.id);
</script>

<template>
  <div class="flex items-center">
    <input 
      :id="inputId"
      type="checkbox"
      :checked="modelValue"
      @change="$event => emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      :disabled="disabled"
      class="h-4 w-4 border-gray-300 dark:border-gray-600 rounded text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700"
    />
    <label :for="inputId" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
      {{ label }}
    </label>
  </div>
</template>
