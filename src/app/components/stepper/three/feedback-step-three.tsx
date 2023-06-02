import { ScrollArea } from '@mantine/core';
import { ViewFormList } from '@onfeed/modules';
import { FormSliceState, RootState } from '@onfeed/redux';
import { useDispatch, useSelector } from 'react-redux';
import { InfoModal, InformationValues } from '../../info-modal-form/info-modal';
import styles from './feedback-step-three.module.scss';

interface FeedbackStepThreeProps {
  getInfoModalValues?: (info: InformationValues) => void;
}

const FeedbackStepThree: React.FC<FeedbackStepThreeProps> = ({
  getInfoModalValues,
}) => {
  const dispatch = useDispatch();
  const { form } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const handleSaveInfo = (info: InformationValues) => {
    if (getInfoModalValues) {
      getInfoModalValues(info);
    }
  };

  return (
    <div className={styles['step-three-container']}>
      <InfoModal
        labelTitle="Session title"
        labelTextarea="Description"
        labelTags={null}
        sendInfo={handleSaveInfo}
      />
      <ScrollArea scrollbarSize={8} w="50%">
        <ViewFormList />
      </ScrollArea>
    </div>
  );
};

export { FeedbackStepThree };
