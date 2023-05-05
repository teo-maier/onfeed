import { BubbleButton, Button } from '@onfeed/components';
import { ButtonVariant } from '@onfeed/helpers';
import {
  FormSliceState,
  removeQuestion,
  RootState,
  setDefaultFormQuestion,
  setFormQuestions,
  setQuestion,
  setQuestionNumber,
} from '@onfeed/redux';
import { useEffect } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { ModalFormTemplate } from 'src/app/components/modal/modal';
import { FormQuestion } from 'src/app/models/form/form-question';
import styles from './form-page.module.scss';

const FormPage = () => {
  const dispatch = useDispatch();

  const { formQuestions, question, questionNumber } = useSelector<
    RootState,
    FormSliceState
  >((state) => state.form);

  const handleSave = (question: FormQuestion) => {
    if (question.answerType !== '') {
      dispatch(setQuestion(question));
    }
  };

  const handleRemoveQuestion = (question: number) => {
    // remove is wrong, check question's ids and makesure
    // they are also rendered properly based on index
    dispatch(removeQuestion(question));
  };

  const handleOnClick = () => {
    if (formQuestions.length === 0) {
      dispatch(setQuestionNumber(questionNumber + 1));
      dispatch(setDefaultFormQuestion());
    } else {
      if (question) {
        dispatch(setFormQuestions(question));
        dispatch(setDefaultFormQuestion());
      } else {
        dispatch(setDefaultFormQuestion());
      }
    }
  };

  return (
    <div className={styles['form-wrapper']}>
      <h6 className={styles['form-title']}>Create template</h6>
      <div className={styles['form-container']}>
        {formQuestions.map((question, index) => (
          <ModalFormTemplate
            inputPlaceholder="Write your question here..."
            handleSave={handleSave}
            handleRemoveQuestion={handleRemoveQuestion}
            questionNumber={question.id}
            questionIndex={index + 1}
          />
        ))}
        <div className={styles['form-button-container']}>
          <Button
            fullWidth
            variant={ButtonVariant.GHOST}
            onClick={handleOnClick}
            icon={<IoAddOutline size={'18px'} />}
          >
            {'Add question'}
          </Button>
        </div>
        <BubbleButton position="right" />
      </div>
    </div>
  );
};

export { FormPage };
