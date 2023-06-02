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
  recipient?: SessionRecipients;
}

const RecipientQuestion: React.FC<RecipientAnswerProps> = ({
  question,
  recipient,
}) => {
  const dispatch = useDispatch();

  const { loggedInUser, role } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );

  const [answer, setAnswer] = useState<Answer>();

  useEffect(() => {
    if (question.id) {
      if (role === UserRole.EMPLOYEE && loggedInUser) {
        answerAPI
          .getByQuestionIdAndEmployeeId(question.id, loggedInUser.id)
          .then((answer) => setAnswer(answer));
        dispatch(setEmployeeAnswerId(loggedInUser.id));
      } else {
        if (recipient) {
          answerAPI
            .getByQuestionIdAndEmployeeId(question.id, recipient.employee.id)
            .then((answer) => setAnswer(answer));
          dispatch(setEmployeeAnswerId(recipient.employee.id));
        }
      }
    }
  }, [question]);

  return (
    <Flex direction="column" gap="16px">
      <div className="question">{question.value}</div>
      {answer && <RecipientAnswer question={question} answer={answer} />}
    </Flex>
  );
};

export { RecipientQuestion };