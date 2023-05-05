import { FormQuestion } from 'src/app/models/form/form-question';
import { OptionTypeLabel } from 'src/helpers/constants/option-type.enum';
import { RatingAnswer } from './rating/rating-answer';
import { SelectAnswer } from './select/select-answer';
import { TextareAnswer } from './textarea/textarea-answer';

interface CustomAnswerProps {
  type: string;
  options: string[] | undefined;
  maxGradeOrStars: number | undefined;
}

const CustomAnswer: React.FC<CustomAnswerProps> = ({
  type,
  options,
  maxGradeOrStars,
}) => {
  console.log(options);
  return (
    <>
      {options && (
        <SelectAnswer
          values={options}
          isMultiple={type === OptionTypeLabel.MULTIPLE_SELECT ? true : false}
        />
      )}
      {maxGradeOrStars &&
        (type === OptionTypeLabel.GRADE ||
          type === OptionTypeLabel.STAR ||
          type === OptionTypeLabel.EMOJI) && (
          <RatingAnswer ratingType={type} maxNumber={maxGradeOrStars} />
        )}
      {type === OptionTypeLabel.TEXTAREA && (
        <TextareAnswer placeholder="Type your answer..." />
      )}
    </>
  );
};

export { CustomAnswer };
