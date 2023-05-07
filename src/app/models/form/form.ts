export interface Form {
  id?: string;
  title: string;
  description: string;
  tags: Array<string>;
  questions: Question[];
}

export interface Question {
  id?: string;
  value: string;
  answer: Answer;
}

export interface Answer {
  id?: string;
  type: string;
  options?: Array<string>;
}
