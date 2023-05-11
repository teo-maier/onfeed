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
import styles from './create-form-modal.module.scss';
import { AnswerType, Question } from '@onfeed/models';
import {
  AnswerTypeEnum,
  AnswerTypeEnumLabel,
  ButtonVariant,
} from '@onfeed/helpers';
import { FormSliceState, RootState } from '@onfeed/redux';
import { useDispatch, useSelector } from 'react-redux';
import { DoneIcon } from '@onfeed/assets';
import { Button } from '../button/button';

const useStyles = createStyles((theme) => ({
  input: {
    color: '#909090',
    fontFamily: 'Montserrat',
    fontSize: '12px',
  },
}));

interface ModalProps {
  inputPlaceholder: string;
  handleSave: (question: Question) => void;
  handleRemove: (question: Question) => void;
  question: Question;
  questionIndex: number;
}

const CreateFormModal: React.FC<ModalProps> = ({
  inputPlaceholder,
  handleSave,
  handleRemove,
  question,
  questionIndex,
}) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState<string>(question.value);
  const [selectedAnswerType, setSelectedAnswerType] = useState<string>(
    question.answerType.type
  );
  const [options, setOptions] = useState<string[]>([]);

  const [opened, { toggle }] = useDisclosure(false);

  const handleOptions = (values: string[]) => {
    console.log(values);
  };

  useEffect(() => {
    if (inputValue) {
      if (
        selectedAnswerType === AnswerTypeEnumLabel.MULTIPLE_SELECT ||
        selectedAnswerType === AnswerTypeEnumLabel.SINGLE_SELECT
      ) {
        if (
          question.answerType.options &&
          question.answerType.options?.length > 0
        ) {
          handleSave({
            id: question.id,
            value: inputValue,
            answerType: {
              type: selectedAnswerType as AnswerTypeEnum,
              options: question.answerType.options,
            },
          });
        }
      } else {
        selectedAnswerType &&
          handleSave({
            id: question.id,
            value: inputValue,
            answerType: {
              type: selectedAnswerType as AnswerTypeEnum,
            },
          });
      }
    }
  }, [selectedAnswerType, question.answerType.options]);

  return (
    <div className={styles['modal-content']}>
      {/* this should probably be a textarea */}
      <CloseButton
        aria-label="Close modal"
        className={styles['cancel-modal-icon']}
        onClick={() => handleRemove(question)}
      />
      <Flex direction={'row'} w="100%">
        <BubbleNumberComponent value={questionIndex} bubbleType="number" />
        <CustomInput
          className={classnames('button--secondary', styles['input-modal'])}
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={(event) => setInputValue(event?.target.value)}
          onClick={toggle}
        />
      </Flex>
      <Collapse in={opened} w="100%">
        <Select
          classNames={classes}
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
            setSelectedAnswerType(value);
          }}
          placeholder="- Nothing selected -"
          dropdownPosition="bottom"
          radius="12px"
          w={'40%'}
          p={'8px 16px'}
        />
        {(selectedAnswerType === AnswerTypeEnumLabel.MULTIPLE_SELECT ||
          selectedAnswerType === AnswerTypeEnumLabel.SINGLE_SELECT) && (
          <AddOptionInput question={question} getOptions={handleOptions} />
        )}
      </Collapse>
    </div>
  );
};

export { CreateFormModal };
