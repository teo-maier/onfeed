import { AnswerTypeEnum, AnswerTypeEnumLabel } from '@onfeed/helpers';
import { Option, Question } from '@onfeed/models';
import {
  AuthSliceState,
  FormSliceState,
  RootState,
  setAnswer,
} from '@onfeed/redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RatingAnswer } from './rating/rating-answer';
import { SelectAnswer } from './select/select-answer';
import { TextareAnswer } from './textarea/textarea-answer';

interface CustomAnswerProps {
  type: string;
  options: Option[] | undefined;
  question?: Question;
  editMode?: boolean;
}

const CustomAnswer: React.FC<CustomAnswerProps> = ({
  type,
  options,
  question,
  editMode,
}) => {
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );

  const { answers } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const [textAreaAnswer, setTextAreaAnswer] = useState<string>();
  const [starAnswer, setStarAnswer] = useState<number>();
  const [emojiAnswer, setEmojiAnswer] = useState<number>();
  const [singleChoiceAnswer, setSingleChoiceAnswer] = useState<string>();
  const [multipleChoiceAnswer, setMultipleChoiceAnswer] = useState<string[]>(
    []
  );

  const handleTextArea = (value: string) => {
    setTextAreaAnswer(value);
    // if (question && loggedInUser && textAreaAnswer) {
    //   dispatch(
    //     setAnswer({
    //       value: textAreaAnswer,
    //       question: question,
    //       employee: loggedInUser,
    //     })
    //   );
    // }
  };

  const handleRating = (obj: { starValue: number; emojiValue: number }) => {
    if (obj.emojiValue) {
      setEmojiAnswer(obj.emojiValue);
    }
    if (obj.starValue) {
      setStarAnswer(obj.starValue);
    }
  };

  const handleOnChangeSingle = (value: string) => {
    setSingleChoiceAnswer(value);
  };

  const handleOnChangeMultiple = (values: string[]) => {
    setMultipleChoiceAnswer(values);
  };

  // console.log(textAreaAnswer);
  // console.log(starAnswer);
  // console.log(emojiAnswer);
  // console.log(singleChoiceAnswer);
  // console.log(multipleChoiceAnswer);
  // console.log(answers);

  useEffect(() => {
    // console.log(question);
    if (question && loggedInUser && !editMode) {
      if (textAreaAnswer) {
        console.log('AAA');
        dispatch(
          setAnswer({
            value: textAreaAnswer,
            question: question,
            employee: loggedInUser,
            options: [],
          })
        );
      }
      if (starAnswer) {
        dispatch(
          setAnswer({
            value: starAnswer.toString(),
            question: question,
            employee: loggedInUser,
            options: [],
          })
        );
      }
      if (emojiAnswer) {
        dispatch(
          setAnswer({
            value: emojiAnswer.toString(),
            question: question,
            employee: loggedInUser,
            options: [],
          })
        );
      }
      if (singleChoiceAnswer) {
        dispatch(
          setAnswer({
            value: singleChoiceAnswer,
            question: question,
            employee: loggedInUser,
            options: [],
          })
        );
      }
      if (multipleChoiceAnswer.length > 0) {
        const options: Option[] = [];
        multipleChoiceAnswer.forEach((choice) =>
          options.push({ value: choice })
        );
        dispatch(
          setAnswer({
            value: null,
            question: question,
            employee: loggedInUser,
            options: options,
          })
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    textAreaAnswer,
    starAnswer,
    emojiAnswer,
    singleChoiceAnswer,
    multipleChoiceAnswer,
  ]);

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
      {(type === AnswerTypeEnum.STAR || type === AnswerTypeEnum.EMOJI) && (
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
