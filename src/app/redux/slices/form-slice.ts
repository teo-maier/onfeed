import { AnswerTypeEnum } from '@onfeed/helpers';
import { Answer } from '@onfeed/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Form, Question } from 'src/app/models/form/form';
import { v4 as uuid } from 'uuid';

export interface FormSliceState {
  form: Form | null;
  questions: Question[];
  answers: Answer[];
  employeeAnswerId: string | number | null;
}

const initialState: FormSliceState = {
  form: null,
  questions: [
    {
      id: uuid(),
      value: '',
      answerType: AnswerTypeEnum.NONE,
      options: [],
    },
  ],
  answers: [],
  employeeAnswerId: null,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForm: (state, { payload }: PayloadAction<Form | null>) => {
      state.form = payload;
    },
    setQuestions: (state, { payload }: PayloadAction<Question>) => {
      if (state.questions.filter((q) => q.id === payload.id)) {
        const found = state.questions.find((q) => q.id === payload.id);
        if (found) {
          const index = state.questions.indexOf(found);
          state.questions[index] = payload;
        }
      } else {
        state.questions = [...state.questions, payload];
      }
    },
    setQuestionsOnEditMode: (state, { payload }: PayloadAction<Question[]>) => {
      state.questions = payload;
    },
    setDefaultQuestion: (state) => {
      state.questions = [
        ...state.questions,
        {
          id: uuid(),
          value: '',
          answerType: AnswerTypeEnum.NONE,
          options: [],
        },
      ];
    },
    removeQuestion: (state, { payload }: PayloadAction<Question>) => {
      const question = state.questions.find((q) => q.id === payload.id);
      if (question) {
        const index = state.questions.indexOf(question);
        state.questions.splice(index, 1);
      }
    },
    removeIdFromQuestions: (state) => {
      state.questions = state.questions.map((obj) => {
        const { id, ...rest } = obj;
        return rest;
      });
      // state.questions.map((question) => delete question['id']);
    },
    setAnswer: (state, { payload }: PayloadAction<Answer>) => {
      if (!state.answers.some((q) => q.question.id === payload.question.id)) {
        state.answers = [...state.answers, payload];
      } else {
        const found = state.answers.find(
          (q) => q.question.id === payload.question.id
        );
        if (found) {
          const index = state.answers.indexOf(found);
          state.answers[index] = payload;
        }
      }
    },
    setEmployeeAnswerId: (
      state,
      { payload }: PayloadAction<string | number>
    ) => {
      state.employeeAnswerId = payload;
    },
  },
});

export const {
  setQuestions,
  setDefaultQuestion,
  removeQuestion,
  setForm,
  removeIdFromQuestions,
  setQuestionsOnEditMode,
  setAnswer,
  setEmployeeAnswerId,
} = formSlice.actions;

export default formSlice.reducer;
