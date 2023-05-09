import { Flex } from '@mantine/core';
import { CreateFormModal } from '@onfeed/components';
import { AnswerTypeEnumLabel, SLUG_KEY } from '@onfeed/helpers';
import { Form } from '@onfeed/models';
import { FormSliceState, RootState } from '@onfeed/redux';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PreviewForm } from '../preview/preview-form';
import styles from './edit-form.module.scss';

interface EditFormProps {
  form?: Form;
}

const EditForm: React.FC<EditFormProps> = ({ form }) => {
  const { [SLUG_KEY]: formId } = useParams<{ [SLUG_KEY]: string }>();

  const questionsMock = [
    {
      id: '1',
      value: 'How was your day?',
      answerType: {
        id: '1',
        type: AnswerTypeEnumLabel.TEXTAREA,
      },
    },
    {
      id: '1',
      value: 'How was your day?',
      answerType: {
        id: '1',
        type: AnswerTypeEnumLabel.TEXTAREA,
      },
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {questionsMock.map((question, index) => (
        <CreateFormModal
          inputPlaceholder={question.value}
          handleSave={handleSaveQuestion}
          handleRemove={handleRemoveQuestion}
          question={question}
          questionIndex={index + 1}
        />
      ))}
    </>
  );
};

export { EditForm };
