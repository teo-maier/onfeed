import { createStyles, Flex, ScrollArea } from '@mantine/core';
import {
  BubbleButton,
  BubbleNumberComponent,
  CustomAnswer,
} from '@onfeed/components';
import { SLUG_KEY } from '@onfeed/helpers';
import { Session } from '@onfeed/models';
import { sessionAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './answer-feedback.module.scss';

const useStyles = createStyles(() => ({
  viewport: {
    padding: '36px',
  },
  scrollbar: {
    top: '34px !important',
    bottom: '34px !important',
  },
}));

const AnswerFeedback = () => {
  const { classes } = useStyles();

  const { [SLUG_KEY]: sessionId } = useParams<{ [SLUG_KEY]: string }>();

  const [session, setSession] = useState<Session>();

  useEffect(() => {
    if (sessionId) {
      sessionAPI.getById(sessionId).then((session) => {
        setSession(session);
      });
    }
  }, [sessionId]);

  const handleBubbleRightClick = () => {
    console.log('a');
  };

  return (
    <>
      <Flex justify="center">
        <ScrollArea h="calc(100vh - 116px)" classNames={classes} offsetScrollbars>
          <div className={styles['form-container']}>
            {session &&
              session.form?.questions.map((question, index) => (
                <div className={styles['question-card']}>
                  <BubbleNumberComponent
                    value={index + 1}
                    bubbleType="number"
                  />
                  <Flex direction="column" gap="16px" w="800px" p="8px 8px 0 0">
                    <div className={classnames('body--secondary')}>
                      {question.value}
                    </div>
                    <CustomAnswer
                      questionIndex={question.id}
                      type={question.answerType}
                      options={question.options}
                    />
                  </Flex>
                </div>
              ))}
          </div>
        </ScrollArea>
      </Flex>
      <BubbleButton position="right" onClick={handleBubbleRightClick} />
    </>
  );
};

export { AnswerFeedback };
