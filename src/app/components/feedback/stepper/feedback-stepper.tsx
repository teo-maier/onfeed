import { Flex, Stepper } from '@mantine/core';
import { DoneIcon, ListIcon, UsersIcon } from '@onfeed/assets';
import {
  BubbleButton,
  FeedbackStepOne,
  FeedbackStepThree,
  FeedbackStepTwo,
  InformationValues,
  NotificationModal,
} from '@onfeed/components';
import { ButtonVariant, ONFEED_ROUTES, SLUG_KEY } from '@onfeed/helpers';
import { Team } from '@onfeed/models';
import {
  AuthSliceState,
  FormSliceState,
  RootState,
  SessionSliceState,
  setForm,
  setSessionTitle,
  TeamSliceState,
} from '@onfeed/redux';
import { sessionAPI, teamAPI } from '@onfeed/services';
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

  const { loggedInUser } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );

  const [infoValues, setInfoValues] = useState<InformationValues>();
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleBubbleRightClick = () => {
    console.log(sessionId, sessionTitle, active);
    if (sessionId && sessionTitle) {
      switch (active) {
        case 0:
          sessionAPI.edit(sessionId, {
            title: sessionTitle,
            description: null,
            form: form ? form : null,
            creator: loggedInUser ? loggedInUser : null,
            sessionRecipients: sessionRecipients,
            anonymous: false,
            suggestion: false,
            draft: true,
          });
          return nextStep();
        case 1:
          sessionAPI.edit(sessionId, {
            title: sessionTitle,
            description: null,
            form: form,
            creator: loggedInUser ? loggedInUser : null,
            sessionRecipients: sessionRecipients,
            anonymous: false,
            suggestion: false,
            draft: true,
          });
          return nextStep();
        default:
          return nextStep();
      }
    }
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
        .then(() => navigate(`${ONFEED_ROUTES.SESSION}`));
    }
  };

  useEffect(() => {
    if (sessionId) {
      sessionAPI.getById(sessionId).then((s) => {
        s.title && dispatch(setSessionTitle(s.title));
        s.form ? dispatch(setForm(s.form)) : dispatch(setForm(null));
      });
    }
    teamAPI.getAll().then((teams) => setAllTeams(teams));
  }, [sessionId]);

  return (
    <>
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
            <FeedbackStepTwo sessionId={sessionId} />
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
    </>
  );
};

export { FeedbackStepper };
