import { AnswerTypeEnumLabel } from '@onfeed/helpers';
import { RatingAnswer } from './rating/rating-answer';
import { SelectAnswer } from './select/select-answer';
import { TextareAnswer } from './textarea/textarea-answer';

interface CustomAnswerProps {
  type: string;
  options: string[] | undefined;
}

const CustomAnswer: React.FC<CustomAnswerProps> = ({ type, options }) => {
  return (
    <>
      {options && (
        <SelectAnswer
          values={options}
          isMultiple={type === AnswerTypeEnumLabel.MULTIPLE_SELECT ? true : false}
        />
      )}
      {(type === AnswerTypeEnumLabel.GRADE ||
        type === AnswerTypeEnumLabel.STAR ||
        type === AnswerTypeEnumLabel.EMOJI) && <RatingAnswer ratingType={type} />}
      {type === AnswerTypeEnumLabel.TEXTAREA && (
        <TextareAnswer placeholder="Type your answer..." />
      )}
    </>
  );
};

export { CustomAnswer };
