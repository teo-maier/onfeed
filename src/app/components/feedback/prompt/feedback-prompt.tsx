import { Flex } from '@mantine/core';
import {
  BigBubbleLeft,
  BubbleButtonRight,
  SmallBubbleLeft,
} from '@onfeed/assets';
import { ONFEED_ROUTES, showWarningNotification } from '@onfeed/helpers';
import classnames from 'classnames';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BubbleButton } from '../../bubble-button/bubble-button';
import { FeedbackStepper } from '../stepper/feedback-stepper';
import { setSessionTitle } from '@onfeed/redux';
import styles from './feedback-prompt.module.scss';
import { sessionAPI } from '@onfeed/services';
import { useNavigate } from 'react-router-dom';
import { Session } from '@onfeed/models';

const FeedbackPropmt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>();
  // const [canBegin, setCanBegin] = useState<boolean>(false);

  const handleBubbleRightClick = () => {
    if (title) {
      dispatch(setSessionTitle(title));
      // setCanBegin(true);
      const session: Session = {
        title: title,
        description: null,
        form: null,
        creator: null,
        sessionRecipients: [],
        anonymous: false,
        suggestion: false,
        draft: true,
      };
      sessionAPI
        .create(session)
        .then((session) =>
          navigate(
            `${ONFEED_ROUTES.FEEDBACK}/${ONFEED_ROUTES.NEW}/${session.id}`
          )
        );
    } else {
      showWarningNotification('Please compose the title !');
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {/* {canBegin ? (
        <FeedbackStepper />
      ) : (
        <> */}
      <BubbleButton position="right" onClick={handleBubbleRightClick} />
      <div className={styles['inner-div']}>
        <BigBubbleLeft />
      </div>
      <div className={styles['inner-div2']}>
        <SmallBubbleLeft />
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
      {/* </>
      )} */}
    </>
  );
};

export { FeedbackPropmt };
