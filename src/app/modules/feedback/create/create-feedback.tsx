import { createStyles, Flex, Stepper } from '@mantine/core';
import { DoneIcon, ListIcon, UsersIcon } from '@onfeed/assets';
import {
  Avatar,
  BubbleButton,
  FeedbackStepOne,
  FeedbackStepThree,
  FeedbackStepTwo,
  InformationValues,
  NotificationModal,
} from '@onfeed/components';
import { ButtonVariant, getUserInitials } from '@onfeed/helpers';
import { Team, TeamMember } from '@onfeed/models';
import { removeTeamMember, RootState, TeamSliceState } from '@onfeed/redux';
import { teamAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './create-feedback.module.scss';

const CreateFeedback = () => {
  const dispatch = useDispatch();
  const { selectedTeamMembers } = useSelector<RootState, TeamSliceState>(
    (state) => state.team
  );

  const [infoValues, setInfoValues] = useState<InformationValues>();
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [active, setActive] = useState(1);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    teamAPI.getAll().then((teams) => setAllTeams(teams));
  }, []);

  const handleBubbleRightClick = () => {
    nextStep();
  };

  const handleBubbleLeftClick = () => {
    prevStep();
  };

  const handleConfirm = () => {
    console.log('confirm');
  };

  const handleInfoValues = (info: InformationValues) => {
    console.log(info);
    setInfoValues(info);
  };

  return (
    <div>
      <div className={styles['stepper-container']}>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          size="md"
          w="calc(100% - 468px)"
        >
          <Stepper.Step
            label="First step"
            description="Select employees"
            icon={<UsersIcon />}
          >
            <FeedbackStepOne teams={allTeams} />
          </Stepper.Step>
          <Stepper.Step
            label="Second step"
            description="Select form"
            icon={<ListIcon />}
          >
            <FeedbackStepTwo />
          </Stepper.Step>
          <Stepper.Step
            label="Final step"
            description="Preview and send"
            icon={<DoneIcon />}
          >
            <FeedbackStepThree getInfoModalValues={handleInfoValues} />
          </Stepper.Step>
          <Stepper.Completed>
            <FeedbackStepThree getInfoModalValues={handleInfoValues} />
            <NotificationModal
              visible={active === 3}
              question="A feeedback is going to be sent with the following information:"
              description="Please make sure the informations are correct."
              buttonText="Send"
              buttonType={ButtonVariant.PRIMARY}
              handleCancel={() => setActive(2)}
              handleConfirm={handleConfirm}
            >
              <Flex direction="column" gap="lg">
                <Flex direction="column" gap="xs">
                  <div className="caption">Title</div>
                  <div className={classnames('caption', styles['info-values'])}>
                    {infoValues?.title}
                  </div>
                </Flex>
                <Flex direction="column" gap="xs">
                  <div className="caption">Description</div>
                  <div className={classnames('caption', styles['info-values'])}>
                    {infoValues?.description}
                  </div>
                </Flex>
                <Flex direction="column" gap="xs">
                  <div className="caption">Additional information</div>
                  <div className={classnames('caption', styles['info-values'])}>
                    <div>
                      {/* {infoValues?.anonChecked &&
                        'Individual responses will not be identified or attributed to any specific employee.'} */}
                      {infoValues?.anonChecked && 'Anonymous feedback'}
                    </div>
                    <div>
                      {/* {infoValues?.suggestionChecked &&
                        'The employees will be able to share their suggestions at the end of the form.'} */}
                      {infoValues?.anonChecked && 'Ask for suggestions'}
                    </div>
                  </div>
                </Flex>
              </Flex>
            </NotificationModal>
          </Stepper.Completed>
        </Stepper>
      </div>
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
      <BubbleButton position="right" onClick={handleBubbleRightClick} />
      {active > 0 && (
        <BubbleButton position="left" onClick={handleBubbleLeftClick} />
      )}
    </div>
  );
};

export { CreateFeedback };
