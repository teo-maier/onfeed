import { OptionTypeLabel } from '@onfeed/helpers';
import { RatingAnswer } from './rating/rating-answer';
import { SelectAnswer } from './select/select-answer';
import { TextareAnswer } from './textarea/textarea-answer';

interface CustomAnswerProps {
  type: string;
  options: string[] | undefined;
}

const CustomAnswer: React.FC<CustomAnswerProps> = ({ type, options }) => {
  console.log(options);
  return (
    <>
      {options && (
        <SelectAnswer
          values={options}
          isMultiple={type === OptionTypeLabel.MULTIPLE_SELECT ? true : false}
        />
      )}
      {(type === OptionTypeLabel.GRADE ||
        type === OptionTypeLabel.STAR ||
        type === OptionTypeLabel.EMOJI) && <RatingAnswer ratingType={type} />}
      {type === OptionTypeLabel.TEXTAREA && (
        <TextareAnswer placeholder="Type your answer..." />
      )}
    </>
  );
};

export { CustomAnswer };
