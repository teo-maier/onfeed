import { ScrollArea } from '@mantine/core';
import { Form } from '@onfeed/models';
import { ViewFormDetails, ViewFormList } from '@onfeed/modules';
import { FormSliceState, RootState, setForm } from '@onfeed/redux';
import { formAPI, sessionAPI } from '@onfeed/services';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TemplatesSideMenu } from '../../templates-side-menu/templates-side-menu';
import styles from './feedback-step-two.module.scss';

interface FeedbackStepTwoProps {
  sessionId?: string;
}

const FeedbackStepTwo: React.FC<FeedbackStepTwoProps> = ({ sessionId }) => {
  const dispatch = useDispatch();
  const { form } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );
  const [allForms, setAllForms] = useState<Form[]>([]);

  const handleFormId = (formId: string | undefined) => {
    if (formId) {
      formAPI.getById(formId).then((formById) => dispatch(setForm(formById)));
    }
  };

  useEffect(() => {
    formAPI.getAll().then((forms) => setAllForms(forms));
  }, []);

  useEffect(() => {
    if (sessionId) {
      sessionAPI.getById(sessionId).then((session) => {
        if (session.form) {
          dispatch(setForm(session.form));
        } else {
          dispatch(setForm(null));
        }
      });
    }
  }, [sessionId]);

  return (
    <div className={styles['step-two-container']}>
      <ScrollArea scrollbarSize={8} w="25%" mt="42.6px" p="8px 0 0 0">
        <TemplatesSideMenu
          isForFeedback={true}
          getFormId={handleFormId}
          form={form ? form : undefined}
          allForms={allForms}
        />
      </ScrollArea>
      <ScrollArea scrollbarSize={8} w="50%" mt="42.6px">
        <ViewFormList />
      </ScrollArea>
    </div>
  );
};

export { FeedbackStepTwo };
