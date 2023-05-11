import { Flex } from '@mantine/core';
import { Button, CustomAnswer } from '@onfeed/components';
import {
  AnswerTypeEnumLabel,
  ButtonSize,
  ButtonVariant,
  ONFEED_ROUTES,
  SLUG_KEY,
} from '@onfeed/helpers';
import { FormSliceState, RootState } from '@onfeed/redux';
import classnames from 'classnames';
import { IoPencil } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './view-form-details.module.scss';

interface ViewFormDetailsProps {
  value?: string;
}

const ViewFormDetails: React.FC<ViewFormDetailsProps> = () => {
  const { [SLUG_KEY]: formId } = useParams<{ [SLUG_KEY]: string }>();
  console.log(formId)
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
      id: '2',
      value: 'What is your opinion regarding...?',
      answerType: {
        id: '2',
        type: AnswerTypeEnumLabel.MULTIPLE_SELECT,
        options: ['fantastisch', 'toll', 'aufgeregt'],
      },
    },
    {
      id: '3',
      value: 'How would you rate your experience?',
      answerType: {
        id: '3',
        type: AnswerTypeEnumLabel.STAR,
      },
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  return (
    <Flex direction="column" w="calc(100vw - 631px)" gap="16px" p="0 16px">
      <Flex style={{ alignSelf: 'flex-end' }}>
        <Button
          className={classnames('button--secondary', styles['edit-button'])}
          variant={ButtonVariant.GHOST}
          size={ButtonSize.COMPACT}
          icon={<IoPencil />}
          onClick={() =>
            navigate(
              `${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.EDIT}/${formId}`
            )
          }
        >
          Edit form
        </Button>
      </Flex>
      <Flex direction="column" gap="lg" w="calc(100% - 120px)">
        {questionsMock.map((question) => (
          <Flex direction="column" gap='md'>
            <div className={classnames('body--secondary')}>
              {question.value}
            </div>
            <CustomAnswer
              type={question.answerType.type}
              options={question.answerType.options}
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export { ViewFormDetails };
