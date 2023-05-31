import { Flex } from '@mantine/core';
import { Button, CustomAnswer } from '@onfeed/components';
import {
  AnswerTypeEnumLabel,
  ButtonSize,
  ButtonVariant,
  ONFEED_ROUTES,
  SLUG_KEY,
} from '@onfeed/helpers';
import { Form } from '@onfeed/models';
import {
  FormSliceState,
  RootState,
  setForm,
  setQuestionsOnEditMode,
} from '@onfeed/redux';
import { formAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useLayoutEffect } from 'react';
import { IoPencil } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './view-form-details.module.scss';

interface ViewFormDetailsProps {
  selectForm?: Form;
}

const ViewFormDetails: React.FC<ViewFormDetailsProps> = ({ selectForm }) => {
  const { [SLUG_KEY]: formId } = useParams<{ [SLUG_KEY]: string }>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form, questions } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  useLayoutEffect(() => {
    if (formId) {
      formAPI.getById(formId).then((form) => {
        dispatch(setForm(form));
        // dispatch(setQuestionsOnEditMode(form.questions));
      });
    }
  }, [formId]);

  return (
    <Flex direction="column" w="calc(100vw - 631px)" gap="16px" p="0 16px">
      <Flex style={{ alignSelf: 'flex-end' }}>
        <Button
          className={classnames('button--secondary', styles['edit-button'])}
          variant={ButtonVariant.GHOST}
          size={ButtonSize.COMPACT}
          icon={<IoPencil />}
          onClick={() =>
            navigate(`${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.EDIT}/${formId}`)
          }
        >
          Edit form
        </Button>
      </Flex>
      <Flex direction="column" gap="lg" w="calc(100% - 120px)">
        {form?.questions.map((question) => (
          <Flex direction="column" gap="md">
            <div className={classnames('body--secondary')}>
              {question.value}
            </div>
            <CustomAnswer
              type={question.answerType}
              options={question.options}
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export { ViewFormDetails };
