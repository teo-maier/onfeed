import { Flex } from '@mantine/core';
import {
  Button,
  EmptyState,
  RecipientForm,
  RecipientsHeader,
} from '@onfeed/components';
import { ButtonSize, ButtonVariant, SLUG_KEY } from '@onfeed/helpers';
import { Form, Session, SessionRecipients } from '@onfeed/models';
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

  const [session, setSession] = useState<Session>();
  const [recipient, setRecipient] = useState<SessionRecipients>();

  const handleOnRecipientClick = (recipient: SessionRecipients) => {
    if (recipient && sessionId) {
      sessionAPI.getById(sessionId).then((session) => {
        setSession(session);
        setRecipient(recipient);
      });
    }
  };

  const onReviewClick = (recipient: SessionRecipients) => {
    if (sessionId) {
      sessionAPI.getById(sessionId).then((session) => {
        if (recipient.id) {
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
    if (recipients.length > 0 && sessionId) {
      const firstRecipient = recipients[0];
      if (firstRecipient.id && firstRecipient.completed) {
        sessionAPI.getById(sessionId).then((session) => {
          setSession(session);
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
      {session && recipient && (
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
          <RecipientForm session={session} recipient={recipient} />
        </Flex>
      )}
      <EmptyState isEmpty={session === undefined}>No one responded yet</EmptyState>
    </Flex>
  );
};

export { ViewFeedbackAdmin };
