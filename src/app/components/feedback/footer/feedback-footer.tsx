import { getUserInitials, SLUG_KEY } from '@onfeed/helpers';
import { Employee, TeamMember } from '@onfeed/models';
import {
  removeRecipient,
  removeTeamMember,
  RootState,
  SessionSliceState,
  setAllMembers,
  setSelectedTeamMember,
  setSessionRecipients,
  setSessionRecipientsOnEditMode,
  TeamSliceState,
} from '@onfeed/redux';
import { sessionRecipientsAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Avatar } from '../../avatar/avatar';
import styles from './feedback-footer.module.scss';

const FeedbackFooter = () => {
  const { [SLUG_KEY]: sessionId } = useParams<{ [SLUG_KEY]: string }>();

  const dispatch = useDispatch();

  const [recipients, setRecipients] = useState<TeamMember[] | Employee[]>();

  const { selectedTeamMembers } = useSelector<RootState, TeamSliceState>(
    (state) => state.team
  );

  const { sessionRecipients } = useSelector<RootState, SessionSliceState>(
    (state) => state.session
  );

  useEffect(() => {
    if (sessionRecipients.length > 0) {
      setRecipients(sessionRecipients.map((r) => r.employee));
    } else {
      setRecipients([]);
    }
  }, [sessionRecipients]);

  useEffect(() => {
    if (sessionId) {
      sessionRecipientsAPI.getAllBySessionId(sessionId).then((recipients) => {
        dispatch(setSessionRecipientsOnEditMode(recipients));
        dispatch(setAllMembers([]));
      });
    }
  }, [sessionId]);

  useEffect(() => {
    dispatch(setSessionRecipients(selectedTeamMembers));
  }, [selectedTeamMembers]);

  return (
    <div className={styles['members-footer-container']}>
      <div className={classnames('caption', styles['members-footer-title'])}>
        Request feedback to
      </div>
      <div className={styles['members-footer-content']}>
        {recipients && recipients.length > 0 ? (
          recipients?.map((member: TeamMember | Employee) => (
            <div
              key={member.id}
              className={classnames(styles['members-footer-item'])}
              onClick={() => {
                dispatch(removeTeamMember(member));
                dispatch(removeRecipient(member));
              }}
            >
              <Avatar
                size={40}
                initials={getUserInitials(member)}
                className={styles['members-footer-item--avatar']}
              />
              <div className={styles['members-side-item--name']}>
                <div className="caption">{member.firstName}</div>
                <div className="caption">{member.lastName}</div>
              </div>
            </div>
          ))
        ) : (
          <div
            className={classnames('button--secondary', styles['empty-state'])}
          >
            No employees selected
          </div>
        )}
      </div>
    </div>
  );
};

export { FeedbackFooter };
