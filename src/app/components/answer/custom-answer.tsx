import { AnswerTypeEnum, AnswerTypeEnumLabel } from '@onfeed/helpers';
import { Option } from '@onfeed/models';
import { RatingAnswer } from './rating/rating-answer';
import { SelectAnswer } from './select/select-answer';
import { TextareAnswer } from './textarea/textarea-answer';

interface CustomAnswerProps {
  type: string;
  options: Option[] | undefined;
  questionIndex?: string;
}

const CustomAnswer: React.FC<CustomAnswerProps> = ({
  type,
  options,
  questionIndex,
}) => {
  const handleTextArea = (value: string) => {
    console.log(questionIndex)
    console.log(value);
  };

  const handleRating = (obj: { starValue: number; emojiValue: number }) => {
    console.log(questionIndex)
    console.log(obj);
  };

  const handleOnChangeSingle = (value: string) => {
    console.log(value);
  };

  const handleOnChangeMultiple = (values: string[]) => {
    console.log(values);
  };
  return (
    <>
      {options && options?.length > 0 && (
        <SelectAnswer
          values={options}
          isMultiple={type === AnswerTypeEnum.MULTIPLE_SELECT ? true : false}
          onChangeSingle={handleOnChangeSingle}
          onChangeMultiple={handleOnChangeMultiple}
        />
      )}
      {(type === AnswerTypeEnum.GRADE ||
        type === AnswerTypeEnum.STAR ||
        type === AnswerTypeEnum.EMOJI) && (
        <RatingAnswer ratingType={type} onChange={handleRating} />
      )}
      {type === AnswerTypeEnum.TEXTAREA && (
        <TextareAnswer
          placeholder="Type your answer..."
          onChange={handleTextArea}
        />
      )}
    </>
  );
};

export { CustomAnswer };
