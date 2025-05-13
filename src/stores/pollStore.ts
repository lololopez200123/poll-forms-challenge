import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { Poll, PollOption } from '../types';

export const usePollStore = defineStore('poll', () => {
  const polls = ref<Poll[]>([]);

  // Getters
  const getAllPolls = computed(() => polls.value);

  const getPollById = computed(() => {
    return (id: string) => polls.value.find((poll) => poll.id === id);
  });

  // Actions
  function createPoll(question: string, optionTexts: string[]): string {
    const pollId = uuidv4();

    const options: PollOption[] = optionTexts.map((text) => ({
      id: uuidv4(),
      text,
      count: 0,
    }));

    const newPoll: Poll = {
      id: pollId,
      question,
      options,
      totalVotes: 0,
      createdAt: new Date(),
    };

    polls.value.push(newPoll);
    return pollId;
  }

  function vote(pollId: string, optionId: string): void {
    const poll = polls.value.find((p) => p.id === pollId);
    if (!poll) return;

    const option = poll.options.find((o) => o.id === optionId);
    if (!option) return;

    option.count++;
    poll.totalVotes++;
  }

  function deletePoll(pollId: string): void {
    const index = polls.value.findIndex((p) => p.id === pollId);
    if (index !== -1) {
      polls.value.splice(index, 1);
    }
  }

  return {
    polls,
    getAllPolls,
    getPollById,
    createPoll,
    vote,
    deletePoll,
  };
});
