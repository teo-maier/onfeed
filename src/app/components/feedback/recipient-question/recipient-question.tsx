import { Flex } from '@mantine/core';
import { UserRole } from '@onfeed/helpers';
import { Answer, Question, SessionRecipients } from '@onfeed/models';
import { AuthSliceState, RootState, setEmployeeAnswerId } from '@onfeed/redux';
import { answerAPI } from '@onfeed/services';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RecipientAnswer } from '../recipient-answer/recipient-answer';
import styles from './recipient-answer.module.scss';

interface RecipientAnswerProps {
  question: Question;
  recipient: SessionRecipients;
}

const RecipientQuestion: React.FC<RecipientAnswerProps> = ({
  question,
  recipient,
}) => {
  const dispatch = useDispatch();

  const { loggedInUser, role } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );
  console.log(recipient);
  const [answer, setAnswer] = useState<Answer>();

  useEffect(() => {
    if (recipient.session && recipient.session.id && question.id) {
      if (role === UserRole.EMPLOYEE && loggedInUser) {
        answerAPI
          .getBySessionIdAndEmployeeId(
            recipient?.session.id,
            loggedInUser.id,
            question.id
          )
          .then((answer) => setAnswer(answer));
        dispatch(setEmployeeAnswerId(loggedInUser.id));
      } else {
        if (recipient) {
          answerAPI
            .getBySessionIdAndEmployeeId(
              recipient?.session.id,
              recipient.employee.id,
              question.id
            )
            .then((answer) => setAnswer(answer));
          dispatch(setEmployeeAnswerId(recipient.employee.id));
        }
      }
    }
  }, [question]);

  // BUG - answers not displayed
  return (
    <Flex direction="column" gap="16px">
      <div className="question">{question.value}</div>
      {answer && <RecipientAnswer question={question} answer={answer} />}
    </Flex>
  );
};

export { RecipientQuestion };
