import { ScrollArea } from '@mantine/core';
import { ViewFormDetails, ViewFormList } from '@onfeed/modules';
import { FormSliceState, RootState, setForm } from '@onfeed/redux';
import { formAPI } from '@onfeed/services';
import { useDispatch, useSelector } from 'react-redux';
import { TemplatesSideMenu } from '../../templates-side-menu/templates-side-menu';
import styles from './feedback-step-two.module.scss';

const FeedbackStepTwo = () => {
  const dispatch = useDispatch();
  const { form } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const handleFormId = (formId: string | undefined) => {
    if (formId) {
      formAPI.getById(formId).then((formById) => dispatch(setForm(formById)));
    }
  };

  return (
    <div className={styles['step-two-container']}>
      <ScrollArea scrollbarSize={8} w="25%" mt="42.6px" p="8px 0 0 0">
        <TemplatesSideMenu isForFeedback={true} getFormId={handleFormId} />
      </ScrollArea>
      <ScrollArea scrollbarSize={8} w="50%" mt="42.6px">
        <ViewFormList />
      </ScrollArea>
    </div>
  );
};

export { FeedbackStepTwo };
