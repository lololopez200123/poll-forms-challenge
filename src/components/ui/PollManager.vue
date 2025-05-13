<script setup lang="ts">
import PollCreate from '../polls/PollCreate.vue';
import PollList from '../polls/PollList.vue';
</script>

<template>
  <div>
    <div class="mb-8">
      <PollCreate />
    </div>
    
    <div>
      <h2 class="text-xl font-semibold mb-4">Your Polls</h2>
      <PollList />
    </div>
  </div>
</template>
