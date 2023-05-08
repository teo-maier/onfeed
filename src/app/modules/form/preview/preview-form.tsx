import { Flex } from '@mantine/core';
import {
  BubbleButton,
  InfoModal,
  AnswerModal,
  NotificationModal,
  InformationValues,
} from '@onfeed/components';
import { ButtonVariant, ONFEED_ROUTES } from '@onfeed/helpers';
import { FormSliceState, RootState, setForm } from '@onfeed/redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import classnames from 'classnames';
import styles from './preview-form.module.scss';

interface PreviewFormProps {
  value?: string;
  goBack: (value: boolean) => void;
}

const PreviewForm: React.FC<PreviewFormProps> = ({ goBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (infoValues) {
      // [DB save]
      dispatch(
        setForm({
          id: uuid(),
          title: infoValues?.title,
          description: infoValues.description,
          tags: infoValues.tags,
          questions: questions,
        })
      );
    }
  };

  useEffect(() => {
    // this is just for testing
    if (form) {
      navigate(`${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.VIEW}/${form.id}`);
    }
  }, [form]);

  console.log(form);

  return (
    <>
      <Flex direction={'row'} gap="160px" justify={'center'}>
        <AnswerModal />
        <InfoModal
          questions={questions}
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
        // description="You won’t be able to undo this action!"
        buttonText="Save"
        buttonType={ButtonVariant.PRIMARY}
        handleCancel={() => setNextClick(false)}
        handleConfirm={handleConfirm}
      >
        <Flex direction="column" gap="lg">
          <Flex direction="column" gap="xs">
            <div className="caption">Title</div>
            <div className={classnames('caption', styles['info-values'])}>
              {infoValues?.title}
            </div>
          </Flex>
          <Flex direction="column" gap="xs">
            <div className="caption">Description</div>
            <div className={classnames('caption', styles['info-values'])}>
              {infoValues?.description}
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
