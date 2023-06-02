import { Flex } from '@mantine/core';
import { FeedbackList } from '@onfeed/components';
import { Employee, Session, SessionByEmployee } from '@onfeed/models';
import { employeeAPI, sessionAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './feedback-page.module.scss';

const FeedbackPageEmployee = () => {
  const [loggedInUser, setLoggedInUser] = useState<Employee>();
  const [completedSessions, setCompletedSessions] = useState<Session[]>();
  const [notCompletedSessions, setNotCompletedSessions] = useState<Session[]>();

  useEffect(() => {
    employeeAPI.getLoggedInUser().then((employee) => setLoggedInUser(employee));
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      sessionAPI
        .getAllCompletedByEmployeeId(loggedInUser.id)
        .then((completedSessions) => {
          setCompletedSessions(completedSessions);
        });
      sessionAPI
        .getAllNotCompletedByEmployeeId(loggedInUser.id)
        .then((notCompletedSessions) => {
          setNotCompletedSessions(notCompletedSessions);
        });
    }
  }, [loggedInUser]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <Flex direction="row" justify="space-around" gap="120px">
      <Flex direction="column" gap="40px">
        <h6 style={{ margin: 0 }}>{'Requested'}</h6>
        {notCompletedSessions && notCompletedSessions?.length > 0 ? (
          notCompletedSessions.map((session) => (
            <FeedbackList isCompleted={false} session={session} />
          ))
        ) : (
          <div
            className={classnames('button--secondary', styles['empty-state'])}
          >
            You have no requests.
          </div>
        )}
      </Flex>
      <Flex direction="column" gap="40px">
        <h6 style={{ margin: 0 }}>{'Answered'}</h6>
        {completedSessions && completedSessions?.length > 0 ? (
          completedSessions.map((session) => (
            <FeedbackList isCompleted={true} session={session} />
          ))
        ) : (
          <div
            className={classnames('button--secondary', styles['empty-state'])}
          >
            You did not respond to any feedback.
          </div>
        )}
      </Flex>
    </Flex>
  );
};

export { FeedbackPageEmployee };
