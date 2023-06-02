import { AnswerTypeEnum } from '@onfeed/helpers';

export interface Form {
  id?: string;
  title: string;
  description: string;
  tags?: Array<string>;
  questions: Question[];
}

export interface Question {
  id?: string;
  value: string;
  answerType: AnswerTypeEnum;
  options?: Option[];
}

export interface Option {
  id?: string;
  value: string;
}

export type OptionValues = Pick<Option, 'value'>;
