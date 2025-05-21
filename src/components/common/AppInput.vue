<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (value: string) =>
      ['text', 'email', 'password', 'number', 'tel', 'url'].includes(value),
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
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
      <span v-if="required" class="text-violet-500">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$event => emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      class="block w-full rounded-lg border-gray-100 border-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-primary focus:ring-primary outline-none transition-colors duration-200"
    />
  </div>
</template>
