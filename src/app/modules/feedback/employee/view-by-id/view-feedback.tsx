import { Flex } from '@mantine/core';
import { RecipientForm } from '@onfeed/components';
import { SLUG_KEY } from '@onfeed/helpers';
import { Session } from '@onfeed/models';
import { sessionAPI } from '@onfeed/services';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewFeedbackEmployee: React.FC = () => {
  const { [SLUG_KEY]: sessionId } = useParams<{ [SLUG_KEY]: string }>();

  const [session, setSession] = useState<Session>();

  useEffect(() => {
    if (sessionId) {
      sessionAPI.getById(sessionId).then((session) => {
        setSession(session);
      });
    }
  }, [sessionId]);

  return (
    <Flex justify="center">
      {session && session.form && <RecipientForm form={session?.form} />}
    </Flex>
  );
};

export { ViewFeedbackEmployee };
