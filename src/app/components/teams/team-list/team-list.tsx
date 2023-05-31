/* eslint-disable react/jsx-no-useless-fragment */
import { ButtonVariant, showWarningNotification } from '@onfeed/helpers';
import { Team } from '@onfeed/models';
import { RootState, resetAlreadySelected, setSelectedTeam, TeamSliceState } from '@onfeed/redux';
import classnames from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '../../avatar/avatar';
import { Button } from '../../button/button';
import styles from './team-list.module.scss';

interface TeamListProps {
  teams: Array<Team> | undefined;
}

const TeamList: React.FC<TeamListProps> = ({ teams }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles['team-list-container']}>
      {teams?.map((team: Team) => (
        <div className={styles['team-list-item-container']}>
          <Button
            variant={ButtonVariant.GHOST}
            icon={
              <Avatar
                square
                size={40}
                initials={team?.teamName?.charAt(0) || ''}
              />
            }
            fullWidth
            onClick={() => {
              dispatch(setSelectedTeam(team));
            }}
          >
            <div className={styles['team-list-item-info']}>
              <div className={'caption'}>{team.teamName}</div>
              <span
                className={classnames(
                  'body--secondary',
                  styles['team-details-text']
                )}
              >
                {team.members.length} members
              </span>
            </div>
          </Button>
        </div>
      ))}
    </div>
  );
};

export { TeamList };
