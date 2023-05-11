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
  RootState,
  setDefaultQuestion,
  setQuestions,
  setQuestionsArray,
} from '@onfeed/redux';
import { IoAddOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { CreateFormModal } from 'src/app/components/create-form-modal/create-form-modal';
import { Question } from 'src/app/models/form/form';
import { PreviewForm } from './../preview/preview-form';
import styles from './create-form.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EditForm } from '../edit/edit-form';
import classnames from 'classnames';

const CreateForm = () => {
  const dispatch = useDispatch();

  const { [SLUG_KEY]: formId } = useParams<{ [SLUG_KEY]: string }>();
  const editMode = !!formId;

  const { form, questions } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const [changePage, setChangePage] = useState<boolean>(false);

  const handleSaveQuestion = (question: Question) => {
    console.log('SET', question);
    if (question.answerType.type !== AnswerTypeEnumLabel.NONE) {
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
    // dispatch(setQuestionsArray(questions));
    setChangePage(true);
  };

  const handleGoBack = (value: boolean) => {
    setChangePage(value);
  };

  useEffect(() => {
    if (!editMode) {
      // get formById
    }
  }, []);

  console.log(questions);

  const questionsMock: Question[] = [
    {
      id: '1',
      value: 'How was your day?',
      answerType: {
        id: '1',
        type: AnswerTypeEnum.TEXTAREA,
      },
    },
    {
      id: '1',
      value: 'How was your day?',
      answerType: {
        id: '1',
        type: AnswerTypeEnum.TEXTAREA,
      },
    },
  ];

  return (
    <div className={styles['form-wrapper']}>
      <h6 className={styles['form-title']}>
        {editMode ? 'Edit template ' : 'Create template'}
      </h6>
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
          <Button
            className={classnames('button--secondary')}
            style={{ height: '36px' }}
            fullWidth
            variant={ButtonVariant.GHOST}
            onClick={handleAddQuestion}
            icon={<IoAddOutline size={'18px'} />}
          >
            Add question
          </Button>
          <BubbleButton position="right" onClick={handleBubbleClick} />
        </div>
      )}
    </div>
  );
};

export { CreateForm };
