import { ScrollArea } from '@mantine/core';
import { Team, TeamMember } from '@onfeed/models';
import {
  resetAlreadySelected,
  RootState,
  setAllMembers,
  setSelectedTeamMember,
  TeamSliceState,
} from '@onfeed/redux';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import styles from './feedback-step-one.module.scss';
import { ButtonVariant, showWarningNotification } from '@onfeed/helpers';
import { useEffect, useState } from 'react';
import { TeamList, TeamMemberList } from '../../teams';
import { Input as CustomInput } from '../../custom-input/custom-input';
import { Button } from '../../button/button';

interface FeedbackStepOneProps {
  teams: Team[];
}

const FeedbackStepOne: React.FC<FeedbackStepOneProps> = ({ teams }) => {
  const dispatch = useDispatch();

  const { selectedTeam } = useSelector<
    RootState,
    TeamSliceState
  >((state) => state.team);

  const getAllMembers = () => {
    let allMembers: TeamMember[] = [];
    teams.forEach(({ members }) => {
      if (!members.find((o) => allMembers.some(({ id }) => o.id === id))) {
        allMembers = [...allMembers, ...members];
      }
    });
    return allMembers;
  };

  const handleOnTeamMemberClick = (member: TeamMember) => {
    dispatch(setSelectedTeamMember(member));
  };

  return (
    <div className={styles['step-one-container']}>
      <div style={{ width: '100%' }}>
        <h6 className={styles['team-title']}>My teams</h6>
        <ScrollArea h="70%" scrollbarSize={8}>
          <TeamList teams={teams} />
        </ScrollArea>
      </div>
      <div className={styles['vertical-bar-team']}>
        <div
          className="vertical-bar"
          style={{ height: '70%', marginBottom: '32px' }}
        ></div>
      </div>
      <div style={{ width: '100%' }}>
        <div className={styles['member-title']}>
          <h6 style={{ margin: '0' }}>Members</h6>
          <Button
            className="button--secondary"
            variant={ButtonVariant.GHOST}
            onClick={() => {
              dispatch(setAllMembers(getAllMembers()));
            }}
          >
            Choose all
          </Button>
        </div>
        {selectedTeam?.members ? (
          <>
            <CustomInput
              type="search"
              placeholder="Search member"
              onChange={() => console.log('onChange')}
              className={classnames('caption')}
              style={{ fontWeight: '400' }}
            />
            <ScrollArea h="70%" scrollbarSize={8}>
              <TeamMemberList
                members={selectedTeam?.members}
                onClick={handleOnTeamMemberClick}
              />
            </ScrollArea>
          </>
        ) : (
          <div
            className={classnames('button--secondary', styles['empty-state'])}
          >
            No team selected
          </div>
        )}
      </div>
    </div>
  );
};

export { FeedbackStepOne };
