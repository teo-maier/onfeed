import { Flex } from '@mantine/core';
import { FeedbackStatusEnum } from '@onfeed/helpers';
import { SessionResults } from '@onfeed/models';
import {
  setSessionStatus,
} from '@onfeed/redux';
import { sessionRecipientsAPI } from '@onfeed/services';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BubbleNumberComponent } from '../../bubble-number/bubble-number';
import styles from './feedback-bubble-results.module.scss';

interface FeedbackBubbleResultsProps {
  sessionId: string | number;
}

const FeedbackBubbleResults: React.FC<FeedbackBubbleResultsProps> = ({
  sessionId,
}) => {
  const dispatch = useDispatch();

  const [sessionResult, setSessionResults] = useState<SessionResults>();

  useEffect(() => {
    sessionRecipientsAPI
      .getSessionResultBySessionId(+sessionId as number)
      .then((sessionResult) => setSessionResults(sessionResult));
  }, []);

  useEffect(() => {
    if (sessionResult?.answered === sessionResult?.total) {
      dispatch(
        setSessionStatus({
          sessionId: sessionId,
          status: FeedbackStatusEnum.COMPLETED,
        })
      );
    } else {
      dispatch(
        setSessionStatus({
          sessionId: sessionId,
          status: FeedbackStatusEnum.IN_PROGRESS,
        })
      );
    }
  }, [sessionResult]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {sessionResult && (
        <Flex justify="center" gap="8px">
          <BubbleNumberComponent
            value={sessionResult.answered}
            bubbleType={'answered'}
          />
          <BubbleNumberComponent
            value={sessionResult.notAnswered}
            bubbleType={'notAnswered'}
          />
          <BubbleNumberComponent
            value={sessionResult.total}
            bubbleType={'total'}
          />
        </Flex>
      )}
    </>
  );
};

export { FeedbackBubbleResults };
