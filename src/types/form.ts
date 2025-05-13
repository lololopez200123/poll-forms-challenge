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
