import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormQuestion } from 'src/app/models/form/form-question';

export interface FormSliceState {
  options: Array<string>;
  formQuestions: FormQuestion[];
  question: FormQuestion | null;
  questionNumber: number;
  isBubbleClicked: boolean;
}

const initialState: FormSliceState = {
  options: [],
  formQuestions: [
    {
      id: 1,
      questionText: 'Write your question here...',
      answerType: '',
    },
  ],
  question: null,
  questionNumber: 1,
  isBubbleClicked: false,
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
    setQuestion: (state, { payload }: PayloadAction<FormQuestion>) => {
      state.question = payload;
    },
    setQuestionNumber: (state, { payload }: PayloadAction<number>) => {
      state.questionNumber = payload;
    },
    setFormQuestions: (state, { payload }: PayloadAction<FormQuestion>) => {
      if (state.formQuestions.filter((q) => q.id === payload.id)) {
        const found = state.formQuestions.find((q) => q.id === payload.id);
        if (found) {
          const index = state.formQuestions.indexOf(found);
          state.formQuestions[index] = payload;
        }
      } else {
        state.formQuestions = [...state.formQuestions, payload];
      }
    },
    setDefaultFormQuestion: (state) => {
      state.questionNumber = state.questionNumber + 1;
      state.formQuestions = [
        ...state.formQuestions,
        {
          id: state.questionNumber,
          questionText: 'Write your question here...',
          answerType: '',
        },
      ];
    },
    removeQuestion: (state, { payload }: PayloadAction<number>) => {
      state.questionNumber = state.questionNumber - 1;
      const question = state.formQuestions.find((q) => q.id === payload);
      if (question) {
        const index = state.formQuestions.indexOf(question);
        state.formQuestions.splice(index, 1);
      }
    },
    setIsBubbleClicked: (state, { payload }: PayloadAction<boolean>) => {
      state.isBubbleClicked = payload;
    },
  },
});

export const {
  setOptions,
  removeOption,
  setFormQuestions,
  setQuestion,
  setQuestionNumber,
  setDefaultFormQuestion,
  removeQuestion,
  setIsBubbleClicked,
} = formSlice.actions;

export default formSlice.reducer;
