import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { Question, QuestionType, RadioQuestion } from '../types';

export function useFormQuestions() {
  const questions = ref<Question[]>([]);

  const initializeQuestions = () => {
    questions.value = [
      {
        id: uuidv4(),
        text: '',
        type: 'short-answer',
        required: false,
        placeholder: undefined,
      },
    ];
  };

  const addQuestion = () => {
    questions.value.push({
      id: uuidv4(),
      text: '',
      type: 'short-answer',
      required: false,
      placeholder: undefined,
    });
  };

  const removeQuestion = (index: number) => {
    if (questions.value.length > 1) {
      questions.value.splice(index, 1);
    }
  };

  const setQuestionType = (questionIndex: number, type: QuestionType) => {
    const question = questions.value[questionIndex];

    if (type === 'radio') {
      questions.value[questionIndex] = {
        ...question,
        type,
        options: [
          { id: uuidv4(), text: '' },
          { id: uuidv4(), text: '' },
        ],
      } as RadioQuestion;
    } else {
      // For non-radio types, just construct a new question without options
      questions.value[questionIndex] = {
        ...question,
        type,
        placeholder:
          question.type === 'radio' ? undefined : question.placeholder,
      } as Question;
    }
  };

  const addOption = (questionIndex: number) => {
    const question = questions.value[questionIndex];
    if (question.type === 'radio') {
      const radioQuestion = question as RadioQuestion;
      if (!radioQuestion.options) {
        radioQuestion.options = [];
      }
      radioQuestion.options.push({ id: uuidv4(), text: '' });
    }
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const question = questions.value[questionIndex];
    if (question.type === 'radio') {
      const radioQuestion = question as RadioQuestion;
      if (radioQuestion.options && radioQuestion.options.length > 1) {
        radioQuestion.options.splice(optionIndex, 1);
      }
    }
  };

  const validateQuestions = (): string | null => {
    for (const question of questions.value) {
      if (!question.text.trim()) {
        return 'All questions must have text';
      }

      if (question.type === 'radio') {
        const radioQuestion = question as RadioQuestion;
        if (radioQuestion.options) {
          const validOptions = radioQuestion.options.filter((opt) =>
            opt.text.trim()
          );
          if (validOptions.length < 2) {
            return 'Radio questions must have at least 2 options';
          }
        }
      }
    }

    return null;
  };

  return {
    questions,
    initializeQuestions,
    addQuestion,
    removeQuestion,
    setQuestionType,
    addOption,
    removeOption,
    validateQuestions,
  };
}
