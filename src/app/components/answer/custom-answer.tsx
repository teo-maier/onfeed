import { AnswerTypeEnum, AnswerTypeEnumLabel } from '@onfeed/helpers';
import { Option } from '@onfeed/models';
import { RatingAnswer } from './rating/rating-answer';
import { SelectAnswer } from './select/select-answer';
import { TextareAnswer } from './textarea/textarea-answer';

interface CustomAnswerProps {
  type: string;
  options: Option[] | undefined;
}

const CustomAnswer: React.FC<CustomAnswerProps> = ({ type, options }) => {
  return (
    <>
      {options && options?.length > 0 && (
        <SelectAnswer
          values={options}
          isMultiple={type === AnswerTypeEnum.MULTIPLE_SELECT ? true : false}
        />
      )}
      {(type === AnswerTypeEnum.GRADE ||
        type === AnswerTypeEnum.STAR ||
        type === AnswerTypeEnum.EMOJI) && <RatingAnswer ratingType={type} />}
      {type === AnswerTypeEnum.TEXTAREA && (
        <TextareAnswer placeholder="Type your answer..." />
      )}
    </>
  );
};

export { CustomAnswer };
