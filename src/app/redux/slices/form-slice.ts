import { AnswerTypeEnum, AnswerTypeEnumLabel } from '@onfeed/helpers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Form, Question } from 'src/app/models/form/form';
import { v4 as uuid } from 'uuid';

export interface FormSliceState {
  form: Form | null;
  questions: Question[];
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
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForm: (state, { payload }: PayloadAction<Form>) => {
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
      state.questions.map((question) => delete question['id']);
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
} = formSlice.actions;

export default formSlice.reducer;
