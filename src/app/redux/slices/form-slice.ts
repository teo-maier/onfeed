import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Form, Question } from 'src/app/models/form/form';
import { v4 as uuid } from 'uuid';

export interface FormSliceState {
  options: Array<string>;
  form: Form | null;
  questions: Question[];
}

const initialState: FormSliceState = {
  options: [],
  form: null,
  questions: [
    {
      id: uuid(),
      value: 'Write your question here...',
      answerType: {
        options: [],
        type: '',
      },
    },
  ],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setOptions: (state, { payload }: PayloadAction<string>) => {
      state.options.push(payload);
    },
    removeOption: (state, { payload }: PayloadAction<string>) => {
      const index = state.options.indexOf(payload);
      state.options.splice(index, 1);
    },
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
    setDefaultQuestion: (state) => {
      state.questions = [
        ...state.questions,
        {
          id: uuid(),
          value: 'Write your question here...',
          answerType: {
            options: [],
            type: '',
          },
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
  },
});

export const {
  setOptions,
  removeOption,
  setQuestions,
  setDefaultQuestion,
  removeQuestion,
  setForm,
} = formSlice.actions;

export default formSlice.reducer;
