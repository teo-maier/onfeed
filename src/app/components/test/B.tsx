import {
  Select,
  CloseButton,
  createStyles,
  Collapse,
  Flex,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { Input as CustomInput } from '../custom-input/custom-input';
import { AddOptionInput } from '../option/add-option-input/add-option-input';
import { useDisclosure } from '@mantine/hooks';
import { BubbleNumberComponent } from '../bubble-number/bubble-number';
import classnames from 'classnames';
import { AnswerType, Question } from '@onfeed/models';
import { AnswerTypeEnum, AnswerTypeEnumLabel } from '@onfeed/helpers';
import {
  FormSliceState,
  RootState,
  addOpions,
  setQuestions,
  resetOptions,
} from '@onfeed/redux';
import { useDispatch, useSelector } from 'react-redux';
import { C } from './C';

interface ModalProps {
  inputPlaceholder: string;
  question: Question;
  handleSave: (question: Question) => void;
}

const B: React.FC<ModalProps> = ({
  inputPlaceholder,
  question,
  handleSave,
}) => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState<string>(question.value);
  const [selectedAnswerType, setSelectedAnswerType] = useState<string>(
    question.answerType.type
  );

  const { options } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  // useEffect(() => {
  //   if (
  //     inputValue !== question.value ||
  //     selectedAnswerType !== question.answerType.type ||
  //     options !== question.answerType.options
  //   ) {
  //     console.log('MUIE');
  //     dispatch(
  //       setQuestions({
  //         id: question.id,
  //         value: inputValue,
  //         answerType: {
  //           id: question.answerType.id,
  //           type: question.answerType.type,
  //           options: question.answerType.options
  //             ? question.answerType.options
  //             : options,
  //         },
  //       })
  //     );
  //   }
  //   isQuestionAdded(false);
  // }, [inputValue, selectedAnswerType]);

  handleSave({
    id: question.id,
    value: inputValue,
    answerType: {
      id: question.answerType.id,
      type: question.answerType.type,
      options: options,
    },
  });

  console.log(question);

  return (
    <div>
      {/* this should probably be a textarea */}
      <Flex direction={'row'} w="100%">
        <CustomInput
          className={classnames('button--secondary')}
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={(event) => setInputValue(event?.target.value)}
        />
        <Select
          value={selectedAnswerType}
          data={[
            AnswerTypeEnumLabel.TEXTAREA,
            AnswerTypeEnumLabel.MULTIPLE_SELECT,
            AnswerTypeEnumLabel.SINGLE_SELECT,
            AnswerTypeEnumLabel.STAR,
            AnswerTypeEnumLabel.GRADE,
            AnswerTypeEnumLabel.EMOJI,
          ]}
          onChange={(value: AnswerTypeEnum) => {
            console.log(value);
            setSelectedAnswerType(value);
          }}
          placeholder="- Nothing selected -"
          dropdownPosition="bottom"
          radius="12px"
          w={'40%'}
          p={'8px 16px'}
        />
      </Flex>
      <C o={question.answerType.options} />
    </div>
  );
};

export { B };
