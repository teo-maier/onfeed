import { Flex } from '@mantine/core';
import {
  BubbleButton,
  AnswerFeedbackForm,
  NotificationModal,
} from '@onfeed/components';
import { ButtonVariant, SLUG_KEY } from '@onfeed/helpers';
import { Session } from '@onfeed/models';
import { FormSliceState, RootState } from '@onfeed/redux';
import { answerAPI, sessionAPI } from '@onfeed/services';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './answer-feedback.module.scss';

const AnswerFeedback = () => {
  const navigate = useNavigate();

  const { [SLUG_KEY]: sessionId } = useParams<{ [SLUG_KEY]: string }>();

  const { answers } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const [session, setSession] = useState<Session>();
  const [isBubbleClicked, setIsBubbleClicked] = useState<boolean>(false);

  useEffect(() => {
    if (sessionId) {
      sessionAPI.getById(sessionId).then((session) => {
        setSession(session);
      });
    }
  }, [sessionId]);

  const handleBubbleRightClick = () => {
    setIsBubbleClicked(true);
  };

  const handleBubbleLeftClick = () => {
    navigate(-1);
  };

  console.log(session);
  const handleConfirm = () => {
    if (session) {
      answerAPI.create(answers, session).then(() => navigate(-1));
    }
  };

  return (
    <>
      <Flex justify="center">
        {session && (
          <AnswerFeedbackForm session={session} canSave={isBubbleClicked} />
        )}
      </Flex>
      <BubbleButton position="right" onClick={handleBubbleRightClick} />
      <BubbleButton position="left" onClick={handleBubbleLeftClick} />
      <NotificationModal
        visible={isBubbleClicked}
        question="A template is going to be saved with the following information:"
        description="Please make sure the informations are correct."
        buttonText="Save"
        buttonType={ButtonVariant.PRIMARY}
        handleCancel={() => setIsBubbleClicked(false)}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export { AnswerFeedback };
