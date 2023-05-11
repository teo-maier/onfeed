import { AnswerTypeEnum, AnswerTypeEnumLabel } from '@onfeed/helpers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Form, Question } from 'src/app/models/form/form';
import { v4 as uuid } from 'uuid';

interface Options {
  questionId: string;
  values: Array<string>;
}

export interface FormSliceState {
  options: Options;
  form: Form | null;
  questions: Question[];
}

const initialState: FormSliceState = {
  options: {
    questionId: '',
    values: [],
  },
  form: null,
  questions: [
    {
      id: uuid(),
      value: '',
      answerType: {
        options: [],
        type: AnswerTypeEnum.NONE,
      },
    },
  ],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // addOpions: (state, { payload }: PayloadAction<string>) => {
    //   state.options.values.push(payload);
    // },
    // setOptions: (state, { payload }: PayloadAction<Options>) => {
    //   const found = state.questions.find((q) => q.id === payload.questionId);
    //   if (found && found.answerType.type === AnswerTypeEnum.NONE) {
    //     found.answerType.options = payload.values;
    //   }
    //   console.log(state.questions)
    // },
    // resetOptions: (state) => {
    //   state.options.values = [];
    // },
    removeOption: (state, { payload }: PayloadAction<string>) => {
      if (state.options) {
        const index = state.options.values.indexOf(payload);
        state.options.values.splice(index, 1);
      }
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
    setQuestionsArray: (state, { payload }: PayloadAction<Question[]>) => {
      state.questions = payload;
    },
    setDefaultQuestion: (state) => {
      state.questions = [
        ...state.questions,
        {
          id: uuid(),
          value: '',
          answerType: {
            options: [],
            type: AnswerTypeEnum.NONE,
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
  // addOpions,
  // setOptions,
  // resetOptions,
  removeOption,
  setQuestions,
  setQuestionsArray,
  setDefaultQuestion,
  removeQuestion,
  setForm,
} = formSlice.actions;

export default formSlice.reducer;
