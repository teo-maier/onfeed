import { Flex, ScrollArea } from '@mantine/core';
import { DoneIcon } from '@onfeed/assets';
import {
  Avatar,
  Button,
  EmptyState,
  RecipientForm,
  RecipientsHeader,
} from '@onfeed/components';
import {
  ButtonSize,
  ButtonVariant,
  getUserInitials,
  SLUG_KEY,
} from '@onfeed/helpers';
import { Form, SessionRecipients } from '@onfeed/models';
import {
  RootState,
  SessionSliceState,
  setSessionRecipientsBySessionId,
} from '@onfeed/redux';
import { formAPI, sessionAPI, sessionRecipientsAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { MdDone, MdOutlineDone } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './view-feedback.module.scss';

const ViewFeedbackAdmin = () => {
  const dispatch = useDispatch();
  const { [SLUG_KEY]: sessionId } = useParams<{ [SLUG_KEY]: string }>();
  const { sessionRecipientsBySessionId: recipients } = useSelector<
    RootState,
    SessionSliceState
  >((state) => state.session);

  const [form, setForm] = useState<Form>();

  useEffect(() => {
    if (sessionId) {
      sessionRecipientsAPI
        .getAllBySessionId(sessionId)
        .then((recipients) =>
          dispatch(setSessionRecipientsBySessionId(recipients))
        );
    }
  }, [sessionId]);

  const handleOnRecipientClick = (recipient: SessionRecipients) => {
    if (recipient.id) {
      formAPI
        .getByRecipientId(recipient.id)
        .then((formByRecipient) => setForm(formByRecipient));
    }
  };


  return (
    <Flex justify="center" direction="column" gap="36px" p="0 64px">
      <div className={styles['view-feedback-container']}>
        <RecipientsHeader
          recipients={recipients}
          handleOnRecipientClick={handleOnRecipientClick}
        />
      </div>
      <Flex justify="flex-start" w="100%" gap="100px">
        <div>
          <Button
            className="button--secondary"
            variant={ButtonVariant.GHOST}
            size={ButtonSize.COMPACT}
            icon={<MdOutlineDone />}
            onClick={() => console.log('set isReviewed')}
          >
            Reviewed
          </Button>
        </div>
        {/* should render answered form here */}
        {form && <RecipientForm form={form} />}
        <EmptyState isEmpty={form === undefined}>No one responded</EmptyState>
      </Flex>
    </Flex>
  );
};

export { ViewFeedbackAdmin };
