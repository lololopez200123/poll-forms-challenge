<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePollStore } from '../../stores/pollStore';

const props = defineProps<{
  id: string;
}>();

const pollStore = usePollStore();
const poll = computed(() => pollStore.getPollById(props.id));
const selectedOptionId = ref<string | null>(null);
const hasVoted = ref(false);
const error = ref('');

const submitVote = () => {
  if (!selectedOptionId.value) {
    error.value = 'Please select an option';
    return;
  }
  
  try {
    pollStore.vote(props.id, selectedOptionId.value);
    hasVoted.value = true;
    error.value = '';
  } catch (e) {
    error.value = 'Failed to submit your vote';
  }
};
</script>

<template>
  <div v-if="poll" class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4">{{ poll.question }}</h3>
    
    <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>
    
    <div v-if="hasVoted" class="results">
      <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Results</h4>
      <ul class="space-y-3">
        <li v-for="option in poll.options" :key="option.id" class="text-sm">
          <div class="flex justify-between">
            <span class="font-medium dark:text-white">{{ option.text }}</span>
            <span class="dark:text-gray-300">
              {{ option.count }} votes 
              ({{ poll.totalVotes ? Math.round((option.count / poll.totalVotes) * 100) : 0 }}%)
            </span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
            <div
              class="bg-primary dark:bg-primary h-2.5 rounded-full"
              :style="`width: ${poll.totalVotes ? (option.count / poll.totalVotes) * 100 : 0}%`"
            ></div>
          </div>
        </li>
      </ul>
      
      <div class="mt-4 text-center flex flex-col items-center">
        <span class="text-sm text-gray-500 dark:text-gray-400">
          Total votes: {{ poll.totalVotes }}
        </span>
        <button
          @click="$router.push('/')"
          class="btn btn-primary mt-2"
          >
          Continue
        </button>
      </div>
    </div>
    
    <div v-else class="voting">
      <form @submit.prevent="submitVote">
        <fieldset>
          <legend class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Cast your vote</legend>
          <div class="space-y-2">
            <div v-for="option in poll.options" :key="option.id" class="flex items-center">
              <input
                :id="option.id"
                v-model="selectedOptionId"
                type="radio"
                :value="option.id"
                name="poll-option"
                class="h-4 w-4 border-gray-300 dark:border-gray-600 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
              <label :for="option.id" class="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ option.text }}
              </label>
            </div>
          </div>
        </fieldset>
        
        <div class="mt-6">
          <button
            type="submit"
            class="btn btn-primary text-sm inline-flex "
          >
            Submit Vote
          </button>
        </div>
      </form>
    </div>
  </div>
  
  <div v-else class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
    <p class="text-gray-500 dark:text-gray-400">Poll not found</p>
  </div>
</template>
