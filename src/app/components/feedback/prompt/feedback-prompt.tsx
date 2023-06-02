import { Flex } from '@mantine/core';
import {
  BigBubbleLeft,
  BigBubbleRight,
  BubbleButtonRight,
  SmallBubbleLeft,
  SmallBubbleRight,
} from '@onfeed/assets';
import {
  ONFEED_ROUTES,
  showSuccessNotification,
  showWarningNotification,
} from '@onfeed/helpers';
import classnames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BubbleButton } from '../../bubble-button/bubble-button';
import { FeedbackStepper } from '../stepper/feedback-stepper';
import {
  AuthSliceState,
  RootState,
  setAllSessions,
  setSessionTitle,
} from '@onfeed/redux';
import styles from './feedback-prompt.module.scss';
import { sessionAPI } from '@onfeed/services';
import { useNavigate } from 'react-router-dom';
import { Session } from '@onfeed/models';

const FeedbackPropmt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>();
  const { loggedInUser } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );

  const handleBubbleRightClick = () => {
    if (title && loggedInUser) {
      dispatch(setSessionTitle(title));
      const session: Session = {
        title: title,
        description: null,
        form: null,
        creator: loggedInUser,
        sessionRecipients: [],
        anonymous: false,
        suggestion: false,
        draft: true,
      };
      sessionAPI.create(session).then((session) => {
        navigate(`${ONFEED_ROUTES.SESSION}/${ONFEED_ROUTES.NEW}/${session.id}`);
        sessionAPI
          .getAllByCreatorId(loggedInUser.id)
          .then((allSessions) => dispatch(setAllSessions(allSessions)));
        showSuccessNotification(
          'Draft saved ! You can check the drawer to see it.'
        );
      });
    } else {
      showWarningNotification('Please compose the title !');
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <BubbleButton position="right" onClick={handleBubbleRightClick} />
      <div className={styles['big-bubble-left']}>
        <BigBubbleLeft />
      </div>
      <div className={styles['small-bubble-left']}>
        <SmallBubbleLeft />
      </div>
      <div className={styles['small-bubble-right']}>
        <SmallBubbleRight />
      </div>
      <div className={styles['big-bubble-right']}>
        <BigBubbleRight />
      </div>

      <div className={styles['prompt-container']}>
        <Flex direction="column" align="center" w="350px" gap="24px">
          <Flex direction="column" gap="16px" align="center">
            <div className="button--primary">
              Please provide a title for your session
            </div>
            <div className={classnames('caption', styles['description'])}>
              In case you don’t complete all steps, a draft containing the data
              you provide will be saved
            </div>
          </Flex>
          <div className={styles['prompt-input-container']}>
            <input
              className={classnames(
                'button--secondary',
                styles['prompt-input']
              )}
              placeholder="Add session title here..."
              onChange={(event) => setTitle(event?.target.value)}
            ></input>
          </div>
        </Flex>
      </div>
    </>
  );
};

export { FeedbackPropmt };
