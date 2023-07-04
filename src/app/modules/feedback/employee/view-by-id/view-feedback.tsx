import { BubbleButton, RecipientForm } from '@onfeed/components';
import { SLUG_KEY } from '@onfeed/helpers';
import { Session, SessionRecipients } from '@onfeed/models';
import { AuthSliceState, RootState } from '@onfeed/redux';
import { sessionAPI, sessionRecipientsAPI } from '@onfeed/services';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ViewFeedbackEmployee: React.FC = () => {
  const navigate = useNavigate();

  const { [SLUG_KEY]: sessionId } = useParams<{ [SLUG_KEY]: string }>();

  const { loggedInUser } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );

  const [session, setSession] = useState<Session>();
  const [recipient, setRecipient] = useState<SessionRecipients>();

  const handleBubbleLeftClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (sessionId) {
      sessionAPI.getById(sessionId).then((session) => {
        setSession(session);
      });
    }
  }, [sessionId]);

  useEffect(() => {
    if (loggedInUser && sessionId) {
      sessionRecipientsAPI
        .getByEmployeeIdAndSessionId(loggedInUser.id, sessionId)
        .then((recipient) => {
          setRecipient(recipient);
        });
    }
  }, [sessionId]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {session && recipient && (
        <RecipientForm session={session} recipient={recipient} />
      )}
      <BubbleButton position="left" onClick={handleBubbleLeftClick} />
    </>
  );
};

export { ViewFeedbackEmployee };
