import { Chip, Group, Rating, Textarea } from '@mantine/core';
import { AnswerTypeEnum } from '@onfeed/helpers';
import { Answer, Question } from '@onfeed/models';
import { getEmptyIcon, getFullIcon } from '../../answer';

interface RecipientAnswerProps {
  question: Question;
  answer: Answer;
}

const RecipientAnswer: React.FC<RecipientAnswerProps> = ({
  question,
  answer,
}) => {
  const { answerType, options } = question;
  return (
    <>
      {answerType === AnswerTypeEnum.SINGLE_SELECT &&
        answer.value &&
        options && (
          <Chip.Group multiple={false} value={answer.value}>
            <Group position="center" w={'100%'}>
              {options.map(({ value }) => (
                <Chip variant={'light'} value={value}>
                  {value}
                </Chip>
              ))}
            </Group>
          </Chip.Group>
        )}
      {answerType === AnswerTypeEnum.MULTIPLE_SELECT &&
        answer.value &&
        options && (
          <Chip.Group
            multiple={true}
            value={answer.options?.map((option) => option.value)}
          >
            <Group position="center" w={'100%'}>
              {options.map(({ value }) => (
                <Chip variant={'light'} value={value}>
                  {value}
                </Chip>
              ))}
            </Group>
          </Chip.Group>
        )}
      {answerType === AnswerTypeEnum.STAR && answer.value && (
        <Group position="center" w={'100%'}>
          <Rating value={+answer.value} color="#2351d4" size="24px" readOnly />
        </Group>
      )}
      {answerType === AnswerTypeEnum.EMOJI && answer.value && (
        <Group position="center" w={'100%'}>
          <Rating
            emptySymbol={getEmptyIcon}
            fullSymbol={getFullIcon}
            highlightSelectedOnly
            value={+answer.value}
            readOnly
          />
        </Group>
      )}
      {answerType === AnswerTypeEnum.TEXTAREA && answer.value && (
        <div className="body--secondary">{answer.value}</div>
      )}
    </>
  );
};

export { RecipientAnswer };
