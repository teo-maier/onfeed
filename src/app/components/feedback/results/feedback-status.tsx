import { Badge, Flex } from '@mantine/core';
import { FeedbackStatusEnum, FeedbackStatusEnumLabel } from '@onfeed/helpers';
import { RootState, SessionSliceState } from '@onfeed/redux';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './feedback-status.module.scss';

interface FeedbackStatusProps {
  sessionId: string;
}

const FeedbackStatus: React.FC<FeedbackStatusProps> = ({ sessionId }) => {
  const { sessionStatusArray } = useSelector<RootState, SessionSliceState>(
    (state) => state.session
  );

  const [status, setStatus] = useState<FeedbackStatusEnum>();

  useEffect(() => {
    sessionStatusArray.forEach((sessionStatus) => {
      if (sessionStatus.sessionId === sessionId) {
        setStatus(sessionStatus.status);
      }
    });
  }, [sessionStatusArray]);


  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {sessionStatusArray.some((status) => status.sessionId === sessionId) && (
        <Flex justify="center">
          <Badge
            className={classnames('caption', styles['table-badge'], {
              [styles['table-badge--in-progress']]:
                status === FeedbackStatusEnum.IN_PROGRESS,
              [styles['table-badge--completed']]:
                status === FeedbackStatusEnum.COMPLETED,
            })}
            radius={8}
          >
            {FeedbackStatusEnumLabel[status as FeedbackStatusEnum]}
          </Badge>
        </Flex>
      )}
    </>
  );
};

export { FeedbackStatus };
