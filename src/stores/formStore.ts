import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { Form, FormResponse, Question, QuestionResponse } from '../types';

export const useFormStore = defineStore(
  'form',
  () => {
    const forms = ref<Form[]>([]);
    const responses = ref<FormResponse[]>([]);

    // Getters
    const getAllForms = computed(() => forms.value);

    const getFormById = computed(() => {
      return (id: string) => forms.value.find((form) => form.id === id);
    });

    const getFormResponses = computed(() => {
      return (formId: string) =>
        responses.value.filter((response) => response.formId === formId);
    });

    // Actions
    function createForm(title: string, questions: Question[]): string {
      const formId = uuidv4();

      const newForm: Form = {
        id: formId,
        title,
        questions,
        createdAt: new Date(),
      };

      forms.value.push(newForm);
      return formId;
    }

    function deleteForm(formId: string): void {
      const formIndex = forms.value.findIndex((f) => f.id === formId);
      if (formIndex !== -1) {
        forms.value.splice(formIndex, 1);

        // Also delete all responses for this form
        responses.value = responses.value.filter(
          (response) => response.formId !== formId
        );
      }
    }

    function submitFormResponse(
      formId: string,
      questionResponses: QuestionResponse[]
    ): string {
      const responseId = uuidv4();

      const formResponse: FormResponse = {
        id: responseId,
        formId,
        responses: questionResponses,
        submittedAt: new Date(),
      };

      responses.value.push(formResponse);
      return responseId;
    }

    return {
      forms,
      responses,
      getAllForms,
      getFormById,
      getFormResponses,
      createForm,
      deleteForm,
      submitFormResponse,
    };
  },
  {
    persist: true,
  }
);
