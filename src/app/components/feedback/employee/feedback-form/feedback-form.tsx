import { createStyles, Flex, ScrollArea } from '@mantine/core';
import { Session } from '@onfeed/models';
import classnames from 'classnames';
import { CustomAnswer } from '../../../answer/custom-answer';
import { BubbleNumberComponent } from '../../../bubble-number/bubble-number';
import styles from './feedback-form.module.scss';

const useStyles = createStyles(() => ({
  viewport: {
    padding: '36px',
  },
  scrollbar: {
    top: '34px !important',
    bottom: '34px !important',
  },
}));

interface FeedbackFormProps {
  session: Session;
  canSave: boolean;
}

const AnswerFeedbackForm: React.FC<FeedbackFormProps> = ({
  session,
  canSave,
}) => {
  const { classes } = useStyles();

  return (
    <ScrollArea h="calc(100vh - 116px)" classNames={classes} offsetScrollbars>
      <div className={styles['form-container']}>
        {session &&
          session.form?.questions.map((question, index) => (
            <div className={styles['question-card']}>
              <BubbleNumberComponent value={index + 1} bubbleType="number" />
              <Flex direction="column" gap="16px" w="800px" p="8px 8px 0 0">
                <div className={classnames('body--secondary')}>
                  {question.value}
                </div>
                <CustomAnswer
                  question={question}
                  type={question.answerType}
                  options={question.options}
                />
              </Flex>
            </div>
          ))}
      </div>
    </ScrollArea>
  );
};

export { AnswerFeedbackForm };
