<script setup lang="ts">
import FormCreate from '../forms/FormCreate.vue';
import FormList from '../forms/FormList.vue';
</script>

<template>
  <div>
    <div class="mb-8">
      <FormCreate />
    </div>
    
    <div>
      <h2 class="text-xl font-semibold mb-4">Your Forms</h2>
      <FormList />
    </div>
  </div>
</template>
