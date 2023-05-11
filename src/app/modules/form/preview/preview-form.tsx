import { Flex } from '@mantine/core';
import {
  BubbleButton,
  InfoModal,
  AnswerModal,
  NotificationModal,
  InformationValues,
} from '@onfeed/components';
import { ButtonVariant, ONFEED_ROUTES, SLUG_KEY } from '@onfeed/helpers';
import {
  FormSliceState,
  removeIdFromQuestions,
  RootState,
  setForm,
} from '@onfeed/redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { formAPI } from '@onfeed/services';
import classnames from 'classnames';
import styles from './preview-form.module.scss';
import { v4 as uuid } from 'uuid';

interface PreviewFormProps {
  value?: string;
  goBack: (value: boolean) => void;
}

const PreviewForm: React.FC<PreviewFormProps> = ({ goBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { [SLUG_KEY]: formId } = useParams<{ [SLUG_KEY]: string }>();
  const editMode = !!formId;

  const { form, questions } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const [nextClick, setNextClick] = useState<boolean>(false);
  const [infoValues, setInfoValues] = useState<InformationValues>();

  const handleBubbleClickRight = () => {
    setNextClick(true);
  };

  const handleBubbleClickLeft = () => {
    goBack(false);
  };

  const handleInfoValues = (values: InformationValues) => {
    setInfoValues(values);
  };

  const handleConfirm = () => {
    dispatch(removeIdFromQuestions());
  };

  useEffect(() => {
    if (infoValues) {
      if (editMode) {
        formAPI
          .edit(formId, {
            title: infoValues?.title,
            description: infoValues.description,
            questions: questions,
          })
          .then((updatedForm) => {
            console.log(updatedForm)
            navigate(
              `${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.VIEW}/${updatedForm.id}`
            );
          });
      } else {
        formAPI
          .create({
            title: infoValues?.title,
            description: infoValues.description,
            questions: questions,
          })
          .then((newForm) => {
            console.log(newForm)
            navigate(
              `${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.VIEW}/${newForm.id}`
            );
          });
      }
    }
  }, [questions, editMode]);

  return (
    <>
      <Flex direction={'row'} gap="160px" justify={'center'}>
        <AnswerModal isEditMode={editMode} />
        <InfoModal
          form={editMode ? form : null}
          labelTitle="Form title"
          labelTextarea="Description"
          labelTags="Tags"
          sendInfo={handleInfoValues}
        />
      </Flex>
      <BubbleButton position="right" onClick={handleBubbleClickRight} />
      <BubbleButton position="left" onClick={handleBubbleClickLeft} />
      {/* the infoValues are rendered only if all fields from info modal are completed */}
      <NotificationModal
        visible={nextClick}
        question="A template is going to be saved with the following information:"
        description="Please make sure the informations are correct."
        buttonText="Save"
        buttonType={ButtonVariant.PRIMARY}
        handleCancel={() => setNextClick(false)}
        handleConfirm={handleConfirm}
      >
        <Flex direction="column" gap="lg">
          <Flex direction="column" gap="xs">
            <div className="caption">Title</div>
            <div className={classnames('caption', styles['info-values'])}>
              {editMode && form ? form.title : infoValues?.title}
            </div>
          </Flex>
          <Flex direction="column" gap="xs">
            <div className="caption">Description</div>
            <div className={classnames('caption', styles['info-values'])}>
              {editMode && form ? form.description : infoValues?.description}
            </div>
          </Flex>
          <Flex direction="column" gap="xs">
            <div className="caption">Tags</div>
            <div className={classnames('caption', styles['info-values'])}>
              {infoValues?.tags}
            </div>
          </Flex>
        </Flex>
      </NotificationModal>
    </>
  );
};

export { PreviewForm };
