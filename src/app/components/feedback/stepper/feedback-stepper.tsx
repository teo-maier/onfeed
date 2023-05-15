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
import { ButtonVariant, getUserInitials, useCheckPath } from '@onfeed/helpers';
import { Employee, Team, TeamMember } from '@onfeed/models';
import {
  FormSliceState,
  removeTeamMember,
  RootState,
  SessionSliceState,
  TeamSliceState,
} from '@onfeed/redux';
import { employeeAPI, teamAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeedbackFooter } from '../footer/feedback-footer';
import styles from './feedback-stepper.module.scss';

interface FeedbackStepperProps {
  sessionTitle?: string;
}

const FeedbackStepper: React.FC<FeedbackStepperProps> = () => {
  const dispatch = useDispatch();

  const { selectedTeamMembers } = useSelector<RootState, TeamSliceState>(
    (state) => state.team
  );

  const { form } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const { sessionTitle } = useSelector<RootState, SessionSliceState>(
    (state) => state.session
  );

  const [infoValues, setInfoValues] = useState<InformationValues>();
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<Employee>();
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    teamAPI.getAll().then((teams) => setAllTeams(teams));
    employeeAPI
      .getLoggedInUser()
      .then((loggedInUser) => setLoggedInUser(loggedInUser));
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
    setInfoValues(info);
  };

  console.log(sessionTitle);
  console.log(selectedTeamMembers);
  console.log(form);
  console.log(infoValues);

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
                    <div>{infoValues?.anonChecked && 'Anonymous feedback'}</div>
                    <div>
                      {infoValues?.suggestionChecked && 'Ask for suggestions'}
                    </div>
                    <div>
                      {!infoValues?.suggestionChecked &&
                        !infoValues?.anonChecked &&
                        'No additional information'}
                    </div>
                  </div>
                </Flex>
              </Flex>
            </NotificationModal>
          </Stepper.Completed>
        </Stepper>
      </div>
      <FeedbackFooter />
      <BubbleButton position="right" onClick={handleBubbleRightClick} />
      {active > 0 && (
        <BubbleButton position="left" onClick={handleBubbleLeftClick} />
      )}
    </div>
  );
};

export { FeedbackStepper };
