import { Flex } from '@mantine/core';
import { Button, CustomAnswer, NotificationModal } from '@onfeed/components';
import {
  ButtonSize,
  ButtonVariant,
  ONFEED_ROUTES,
  showErrorNotification,
  SLUG_KEY,
} from '@onfeed/helpers';
import { Form } from '@onfeed/models';
import { FormSliceState, RootState, setForm } from '@onfeed/redux';
import { formAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useLayoutEffect, useState } from 'react';
import { IoPencil, IoTrash } from 'react-icons/io5';
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

  const { form } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const [toggleModal, setToggleModal] = useState(false);

  useLayoutEffect(() => {
    if (formId) {
      formAPI.getById(formId).then((form) => {
        dispatch(setForm(form));
      });
    }
  }, [formId]);

  const handleConfirmDelete = () => {
    formId &&
      formAPI
        .delete(formId)
        .then(() => navigate(`${ONFEED_ROUTES.FORM}`))
        .catch(() => {
          setToggleModal(false);
          showErrorNotification(
            'Cannot delete a form that was assigned to a session!'
          );
        });
  };

  return (
    <Flex
      direction="column"
      w="calc(100vw - 631px)"
      h="600px"
      gap="16px"
      p="0 16px"
      justify="space-between"
    >
      <Flex direction="column">
        <Flex style={{ alignSelf: 'flex-end' }}>
          <Button
            className={classnames('button--secondary')}
            variant={ButtonVariant.GHOST}
            size={ButtonSize.COMPACT}
            icon={<IoPencil />}
            onClick={() =>
              navigate(`${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.EDIT}/${formId}`)
            }
          >
            Edit
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
      <Flex style={{ alignSelf: 'flex-end' }}>
        <Button
          className={classnames('button--secondary')}
          variant={ButtonVariant.PRIMARY_DANGER}
          size={ButtonSize.COMPACT}
          icon={<IoTrash />}
          onClick={() => setToggleModal(true)}
        >
          Delete
        </Button>
      </Flex>
      <NotificationModal
        visible={toggleModal}
        question="Are you sure you want to delete this form?"
        description="You won’t be able to undo this action!"
        buttonText="Delete form"
        buttonType={ButtonVariant.PRIMARY_DANGER}
        handleCancel={() => setToggleModal(false)}
        handleConfirm={handleConfirmDelete}
      />
    </Flex>
  );
};

export { ViewFormDetails };
