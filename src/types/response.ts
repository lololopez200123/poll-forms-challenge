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
