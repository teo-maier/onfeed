import { BubbleButton, RecipientForm } from '@onfeed/components';
import { SLUG_KEY } from '@onfeed/helpers';
import { Session } from '@onfeed/models';
import { sessionAPI } from '@onfeed/services';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ViewFeedbackEmployee: React.FC = () => {
  const navigate = useNavigate();

  const { [SLUG_KEY]: sessionId } = useParams<{ [SLUG_KEY]: string }>();

  const [session, setSession] = useState<Session>();

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

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {session && session.form && <RecipientForm form={session?.form} />}
      <BubbleButton position="left" onClick={handleBubbleLeftClick} />
    </>
  );
};

export { ViewFeedbackEmployee };
