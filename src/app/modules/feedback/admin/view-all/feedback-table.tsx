import { createStyles, Flex, Table } from '@mantine/core';
import { FeedbackBubbleResults, FeedbackStatus } from '@onfeed/components';
import { ONFEED_ROUTES } from '@onfeed/helpers';
import { Session } from '@onfeed/models';
import { RootState, SessionSliceState, setAllSessions } from '@onfeed/redux';
import { sessionAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './feedback-table.module.scss';

const useStyles = createStyles(() => ({
  input: {
    color: '#909090',
    fontFamily: 'Montserrat',
    fontSize: '12px',
  },
}));

const FeedbackPageAdmin = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allSessions, sessionRecipientsBySessionId } = useSelector<
    RootState,
    SessionSliceState
  >((state) => state.session);

  useEffect(() => {
    // here your should get them by creator id
    sessionAPI
      .getAll()
      .then((allSessions) => dispatch(setAllSessions(allSessions)));
  }, []);


  const handleOnRowClick = (id: string) => {
    navigate(`${ONFEED_ROUTES.FEEDBACK}/${ONFEED_ROUTES.VIEW}/${id}`);
  };

  const rows =
    allSessions.length > 0 &&
    allSessions.map((session: Session) => (
      <tr key={session.id} onClick={() => handleOnRowClick(session.id!)}>
        <td className="body--secondary">{session.title}</td>
        <td className="body--secondary">
          <FeedbackBubbleResults sessionId={session.id!} />
        </td>
        <td>
          <FeedbackStatus sessionId={session.id!} />
        </td>
        <td className="body--secondary">{session.updatedAt?.toString()}</td>
        <td>
          <span
            className={classnames(styles['table-anon'], {
              [styles['table-anon--isAnon']]: session.anonymous,
            })}
          ></span>
        </td>
      </tr>
    ));

  return (
    <Flex justify={'center'}>
      <div className={classnames(styles['table-container'])}>
        <Table highlightOnHover verticalSpacing="12px">
          <thead>
            <tr>
              <th>Session title</th>
              <th>Results</th>
              <th>Status</th>
              <th>Date</th>
              <th>Anonymous</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </Flex>
  );
};

export { FeedbackPageAdmin };
