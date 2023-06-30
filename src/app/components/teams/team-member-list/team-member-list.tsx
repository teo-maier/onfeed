import { ButtonVariant, showWarningNotification } from '@onfeed/helpers';
import { Employee, TeamMember } from '@onfeed/models';
import { resetAlreadySelected, RootState, TeamSliceState } from '@onfeed/redux';
import classnames from 'classnames';
import { useEffect } from 'react';
import { IoAdd } from 'react-icons/io5';
import { Button } from '../../button/button';
import styles from './team-member-list.module.scss';

interface TeamMemberListProps {
  members: Array<TeamMember> | Array<Employee>;
  onClick: (member: TeamMember) => void;
}

const TeamMemberList: React.FC<TeamMemberListProps> = ({
  members,
  onClick,
}) => {
  return (
    <div className={styles['team-container']}>
      {members?.map((member: TeamMember | Employee) => (
        <div className={styles['team-button']}>
          <Button
            variant={ButtonVariant.GHOST}
            fullWidth
            onClick={() => onClick(member)}
          >
            <div className={classnames(styles['team-content'], 'caption')}>
              <div className={styles['team-content-info']}>
                <div>{member.firstName}</div>
                <div className="body--secondary">{member.lastName}</div>
              </div>
              <Button icon={<IoAdd />} variant={ButtonVariant.GHOST} />
            </div>
          </Button>
        </div>
      ))}
    </div>
  );
};

export { TeamMemberList };
