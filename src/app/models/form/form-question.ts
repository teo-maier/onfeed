
export interface FormQuestion {
  id: number;
  questionText: string;
  answerType: string;
  options?: Array<string>;
  maxGradeOrStars?: number;
}
