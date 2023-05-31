import { Flex } from '@mantine/core';
import { Answer, Question } from '@onfeed/models';
import { answerAPI } from '@onfeed/services';
import { useEffect, useState } from 'react';
import { RecipientAnswer } from '../recipient-answer/recipient-answer';
import styles from './recipient-answer.module.scss';

interface RecipientAnswerProps {
  question: Question;
}

const RecipientQuestion: React.FC<RecipientAnswerProps> = ({ question }) => {
  const [answer, setAnswer] = useState<Answer>();
  useEffect(() => {
    if (question.id) {
      answerAPI
        .getByQuestionId(question.id)
        .then((answer) => setAnswer(answer));
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
