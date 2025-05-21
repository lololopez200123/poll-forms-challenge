<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

interface ProgressCounterProps {
  count: number;
  total: number;
}

const props = defineProps<ProgressCounterProps>();
const animateProgress = ref(false);

onMounted(() => {
  setTimeout(() => {
    animateProgress.value = true;
  }, 100);
});

const percentage = computed((): number => {
  const calculatedPercentage =
    props.total > 0 ? (props.count / props.total) * 100 : 0;
  return animateProgress.value ? calculatedPercentage : 0;
});
</script>

<template>
  <div>
    <div class="flex justify-between">
      <slot name="label"></slot>
      <slot name="count"></slot>
    </div>
    <div class="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mt-1">
      <div
        class="bg-primary dark:bg-primary h-2 rounded-full transition-all"
        :class="{ 'animate-progress': animateProgress }"
        :style="`width: ${percentage}%`"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.animate-progress {
  transition: width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
