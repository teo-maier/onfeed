import { BubbleButton, Button } from '@onfeed/components';
import { ButtonVariant } from '@onfeed/helpers';
import {
  FormSliceState,
  removeQuestion,
  RootState,
  setDefaultQuestion,
  setForm,
  setQuestions,
} from '@onfeed/redux';
import { IoAddOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { CreateFormModal } from 'src/app/components/create-form-modal/create-form-modal';
import { Question } from 'src/app/models/form/form';
import { PreviewForm } from './preview-form-page';
import styles from './create-form.module.scss';
import { useState } from 'react';

const CreateForm = () => {
  const dispatch = useDispatch();

  const { form, questions } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const [changePage, setChangePage] = useState<boolean>(false);

  const handleSaveQuestion = (question: Question) => {
    if (question.answer.type !== '') {
      dispatch(setQuestions(question));
    }
  };

  const handleRemoveQuestion = (question: Question) => {
    if (questions) {
      dispatch(removeQuestion(question));
    }
  };

  const handleAddQuestion = () => {
    dispatch(setDefaultQuestion());
  };

  const handleBubbleClick = () => {
    // set questions
    // dispatch(setForm({

    // }))
    setChangePage(true);
  };

  const handleGoBack = (value: boolean) => {
    setChangePage(value);
  };

  return (
    <div className={styles['form-wrapper']}>
      <h6 className={styles['form-title']}>Create template</h6>
      {changePage ? (
        <PreviewForm goBack={handleGoBack} />
      ) : (
        <div className={styles['form-container']}>
          {questions.map((question, index) => (
            <CreateFormModal
              inputPlaceholder="Write your question here..."
              handleSave={handleSaveQuestion}
              handleRemove={handleRemoveQuestion}
              question={question}
              questionIndex={index + 1}
            />
          ))}
          <div className={styles['form-button-container']}>
            <Button
              fullWidth
              variant={ButtonVariant.GHOST}
              onClick={handleAddQuestion}
              icon={<IoAddOutline size={'18px'} />}
            >
              Add question
            </Button>
          </div>
          <BubbleButton position="right" onClick={handleBubbleClick} />
        </div>
      )}
    </div>
  );
};

export { CreateForm };
