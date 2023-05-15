import { getUserInitials } from '@onfeed/helpers';
import { TeamMember } from '@onfeed/models';
import { removeTeamMember, RootState, TeamSliceState } from '@onfeed/redux';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '../../avatar/avatar';
import styles from './feedback-footer.module.scss';

const FeedbackFooter = () => {
  const dispatch = useDispatch();

  const { selectedTeamMembers } = useSelector<RootState, TeamSliceState>(
    (state) => state.team
  );
  return (
    <div className={styles['members-footer-container']}>
      <div className={classnames('caption', styles['members-footer-title'])}>
        Request feedback to
      </div>
      <div className={styles['members-footer-content']}>
        {selectedTeamMembers.length ? (
          selectedTeamMembers?.map((member: TeamMember) => (
            <div
              key={member.id}
              className={classnames(styles['members-footer-item'])}
              onClick={() => dispatch(removeTeamMember(member))}
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

export {FeedbackFooter}
