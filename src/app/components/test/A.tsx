import { BubbleButton, Button } from '@onfeed/components';
import {
  AnswerTypeEnum,
  AnswerTypeEnumLabel,
  ButtonVariant,
  SLUG_KEY,
} from '@onfeed/helpers';
import {
  FormSliceState,
  removeQuestion,
  resetOptions,
  RootState,
  setDefaultQuestion,
  addOpions,
  setQuestions,
  setQuestionsArray,
} from '@onfeed/redux';
import { IoAddOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { CreateFormModal } from 'src/app/components/create-form-modal/create-form-modal';
import { Question } from 'src/app/models/form/form';
import { useEffect, useState } from 'react';
import { B } from './B';

const A = () => {
  const dispatch = useDispatch();

  const { questions } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const [q, setQ] = useState<Question>();

  const handleSave = (question: Question) => {
    console.log(question);
    // setQ(question);
  };

  const handleRemoveQuestion = (question: Question) => {
    if (questions) {
      dispatch(removeQuestion(question));
    }
  };

  const handleAddQuestion = () => {
    dispatch(resetOptions());
    // dispatch(setQuestions());
    dispatch(setDefaultQuestion());
  };

  const handleBubbleClick = () => {
    dispatch(setQuestionsArray(questions));
  };

  return (
    <div>
      {questions.map((question, index) => (
        <B
          inputPlaceholder="Write your question here..."
          question={question}
          handleSave={handleSave}
        />
      ))}
      <button onClick={handleAddQuestion}>Add question</button>
      <BubbleButton position="right" onClick={handleBubbleClick} />
    </div>
  );
};

export { A };
