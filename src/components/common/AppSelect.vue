<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  options: {
    type: Array as () => Array<{ id: string; text: string; }>,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="w-full">
    <label 
      v-if="label" 
      :for="id" 
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      :id="id"
      :value="modelValue"
      @change="$event => emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      :required="required"
      :disabled="disabled"
     class="block w-full rounded-lg border-gray-100 border-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-primary focus:ring-primary outline-none transition-colors duration-200"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option 
        v-for="option in options" 
        :key="option.id" 
        :value="option.id"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
