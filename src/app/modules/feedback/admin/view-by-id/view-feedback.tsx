import { Flex } from '@mantine/core';
import {
  Button,
  EmptyState,
  RecipientForm,
  RecipientsHeader,
} from '@onfeed/components';
import { ButtonSize, ButtonVariant, SLUG_KEY } from '@onfeed/helpers';
import { Form, SessionRecipients } from '@onfeed/models';
import {
  RootState,
  SessionSliceState,
  setSessionRecipientsBySessionId,
} from '@onfeed/redux';
import { formAPI, sessionAPI, sessionRecipientsAPI } from '@onfeed/services';
import { useEffect, useState } from 'react';
import { MdOutlineDone } from 'react-icons/md';
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
  const [recipient, setRecipient] = useState<SessionRecipients>();

  const handleOnRecipientClick = (recipient: SessionRecipients) => {
    if (recipient.id) {
      formAPI.getByRecipientId(recipient.id).then((formByRecipient) => {
        setForm(formByRecipient);
        setRecipient(recipient);
      });
    }
  };

  const onReviewClick = (recipient: SessionRecipients) => {
    if (sessionId) {
      sessionAPI.getById(sessionId).then((session) => {
        if (recipient.id) {
          console.log(recipient);
          sessionRecipientsAPI
            .edit(recipient.id, {
              id: recipient.id,
              employee: recipient.employee,
              session: session,
              completed: recipient.completed,
              reviewed: true,
              createdAt: recipient.createdAt,
              updatedAt: recipient.updatedAt,
            })
            .then((editedRecipient) => setRecipient(editedRecipient));
            // here
        }
      });
    }
  };

  useEffect(() => {
    if (sessionId) {
      sessionRecipientsAPI
        .getAllBySessionId(sessionId)
        .then((recipients) =>
          dispatch(setSessionRecipientsBySessionId(recipients))
        );
    }
  }, [sessionId]);

  useEffect(() => {
    if (recipients.length > 0) {
      const firstRecipient = recipients[0];
      if (firstRecipient.id && firstRecipient.completed) {
        formAPI.getByRecipientId(firstRecipient.id).then((formByRecipient) => {
          setForm(formByRecipient);
          setRecipient(firstRecipient);
        });
      }
    }
  }, [recipients]);

  return (
    <Flex justify="center" direction="column" gap="36px" p="0 64px">
      <div className={styles['view-feedback-container']}>
        <RecipientsHeader
          recipients={recipients}
          handleOnRecipientClick={handleOnRecipientClick}
        />
      </div>
      {form && recipient && (
        <Flex justify="flex-start" w="100%" gap="100px">
          <Button
            className="button--secondary"
            variant={
              recipient.reviewed
                ? ButtonVariant.SECONDARY_SUCCESS
                : ButtonVariant.GHOST
            }
            size={ButtonSize.COMPACT}
            icon={<MdOutlineDone />}
            onClick={() => onReviewClick(recipient)}
            style={{ height: 'fit-content' }}
          >
            Reviewed
          </Button>
          <RecipientForm form={form} recipient={recipient} />
        </Flex>
      )}
      <EmptyState isEmpty={form === undefined}>No one responded yet</EmptyState>
    </Flex>
  );
};

export { ViewFeedbackAdmin };
