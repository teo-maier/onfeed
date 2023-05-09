import { AnswerTypeEnum } from "@onfeed/helpers";

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
  answerType: AnswerType;
}

export interface AnswerType {
  id?: string;
  type: AnswerTypeEnum;
  options?: Array<string>;
}
