<script setup lang="ts">
import { computed } from 'vue';
import { usePollStore } from '../../stores/pollStore';
import AppShareButton from '../common/AppShareButton.vue';
import AppProgressCounter from '../common/AppProgressCounter.vue';
import AppButton from '../common/AppButton.vue';

const location = computed(() => {
  return typeof window !== 'undefined' ? window.location : { origin: '' };
});

defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
});

const pollStore = usePollStore();
const polls = computed(() => pollStore.getAllPolls);

const deletePoll = (pollId: string) => {
  if (confirm('Are you sure you want to delete this poll?')) {
    pollStore.deletePoll(pollId);
  }
};

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString();
};
</script>

<template>
  <div class="space-y-4">
    <div v-if="polls.length === 0" class="text-center py-6">
      <p class="text-gray-500 dark:text-gray-400">
        {{
          compact
            ? 'No polls created yet'
            : 'No polls created yet. Create your first poll above!'
        }}
      </p>
    </div>

    <div
      v-else
      v-for="poll in polls"
      :key="poll.id"
      :class="[
        'bg-white dark:bg-gray-800 rounded-lg overflow-hidden',
        compact ? 'border border-gray-200 dark:border-gray-700' : 'shadow-sm',
      ]"
    >
      <div class="p-5">
        <div class="flex justify-between items-start">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {{ poll.question }}
          </h3>
          <button
            @click="deletePoll(poll.id)"
            class="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Delete poll"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div class="mt-2 mb-3">
          <span class="text-xs text-gray-500 dark:text-gray-400"
            >Created on {{ formatDate(poll.createdAt) }}</span
          >
          <span
            class="ml-3 text-xs font-medium text-primary-600 dark:text-primary-400"
            >{{ poll.totalVotes }} votes</span
          >
        </div>

        <template v-if="!compact || (compact && poll.options.length <= 2)">
          <ul class="space-y-2">
            <li v-for="option in poll.options" :key="option.id" class="text-sm">
              <app-progress-counter
                :count="option.count"
                :total="poll.totalVotes"
              >
                <template #label>
                  <span class="dark:text-gray-200">{{ option.text }}</span>
                </template>
                <template #count>
                  <span class="text-gray-500 dark:text-gray-400"
                    >{{ option.count }} votes</span
                  >
                </template>
              </app-progress-counter>
            </li>
          </ul>
        </template>
        <template v-else>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ poll.options.length }} options available
          </p>
        </template>

        <div class="mt-4">
          <div class="flex space-x-2">
            <app-share-button
              :url="`${location.origin}/polls/${poll.id}`"
              title="Share"
              variant="primary"
            />
            <app-button variant="outline" type="button">
              <router-link :to="`/polls/${poll.id}?view=results`" class="">
                Results
              </router-link>
            </app-button>
            <app-button variant="text" type="button">
              <router-link :to="`/polls/${poll.id}`" class="">
                Preview
              </router-link>
            </app-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
