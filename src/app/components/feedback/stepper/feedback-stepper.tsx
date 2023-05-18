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
import {
  ButtonVariant,
  getUserInitials,
  ONFEED_ROUTES,
  SLUG_KEY,
  useCheckPath,
} from '@onfeed/helpers';
import { Employee, Team, TeamMember } from '@onfeed/models';
import {
  FormSliceState,
  removeTeamMember,
  RootState,
  SessionSliceState,
  setSessionRecipients,
  TeamSliceState,
} from '@onfeed/redux';
import { employeeAPI, sessionAPI, teamAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FeedbackFooter } from '../footer/feedback-footer';
import styles from './feedback-stepper.module.scss';

interface FeedbackStepperProps {
  sessionTitle?: string;
}

const FeedbackStepper: React.FC<FeedbackStepperProps> = () => {
  const { [SLUG_KEY]: sessionId } = useParams<{ [SLUG_KEY]: string }>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedTeamMembers } = useSelector<RootState, TeamSliceState>(
    (state) => state.team
  );

  const { form } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const { sessionTitle, sessionRecipients } = useSelector<
    RootState,
    SessionSliceState
  >((state) => state.session);

  const [infoValues, setInfoValues] = useState<InformationValues>();
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<Employee>();
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleBubbleRightClick = () => {
    nextStep();
  };

  const handleBubbleLeftClick = () => {
    prevStep();
  };

  const handleInfoValues = (info: InformationValues) => {
    setInfoValues(info);
  };

  const handleConfirm = () => {
    if (infoValues && sessionId) {
      sessionAPI
        .edit(sessionId, {
          title: sessionTitle || infoValues?.title,
          description: infoValues?.description,
          form: form,
          creator: loggedInUser ? loggedInUser : null,
          sessionRecipients: sessionRecipients,
          anonymous: infoValues.anonChecked!,
          suggestion: infoValues.suggestionChecked!,
          draft: false,
        })
        .then(() => navigate(`${ONFEED_ROUTES.FEEDBACK}`));
    }
  };

  useEffect(() => {
    teamAPI.getAll().then((teams) => setAllTeams(teams));
    employeeAPI.getLoggedInUser().then((loggedInUser) => {
      setLoggedInUser(loggedInUser);
    });
  }, []);

  useEffect(() => {
    dispatch(setSessionRecipients(selectedTeamMembers));
  }, [selectedTeamMembers]);

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
            <FeedbackStepThree />
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
