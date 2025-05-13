// Poll types
export interface PollOption {
  id: string;
  text: string;
  count: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  createdAt: Date;
}

// Form types
export type QuestionType = 'short-answer' | 'long-answer' | 'number' | 'radio';

export interface QuestionBase {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
}

export interface ShortAnswerQuestion extends QuestionBase {
  type: 'short-answer';
  placeholder?: string;
}

export interface LongAnswerQuestion extends QuestionBase {
  type: 'long-answer';
  placeholder?: string;
}

export interface NumberQuestion extends QuestionBase {
  type: 'number';
  placeholder?: string;
}

export interface RadioQuestion extends QuestionBase {
  type: 'radio';
  options: { id: string; text: string }[];
}

export type Question =
  | ShortAnswerQuestion
  | LongAnswerQuestion
  | NumberQuestion
  | RadioQuestion;

export interface Form {
  id: string;
  title: string;
  questions: Question[];
  createdAt: Date;
}

export interface ShortAnswerResponse {
  questionId: string;
  type: 'short-answer';
  value: string;
}

export interface LongAnswerResponse {
  questionId: string;
  type: 'long-answer';
  value: string;
}

export interface NumberResponse {
  questionId: string;
  type: 'number';
  value: number;
}

export interface RadioResponse {
  questionId: string;
  type: 'radio';
  optionId: string;
}

export type QuestionResponse =
  | ShortAnswerResponse
  | LongAnswerResponse
  | NumberResponse
  | RadioResponse;

export interface FormResponse {
  id: string;
  formId: string;
  responses: QuestionResponse[];
  submittedAt: Date;
}
