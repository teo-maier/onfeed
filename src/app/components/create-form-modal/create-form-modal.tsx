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
import { Question } from '@onfeed/models';
import { AnswerTypeEnum, AnswerTypeEnumLabel } from '@onfeed/helpers';

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

  const [inputValue, setInputValue] = useState<string>(question.value);
  const [selectedAnswerType, setSelectedAnswerType] = useState<AnswerTypeEnum>(
    question.answerType
  );
  const [opened, { toggle }] = useDisclosure(false);

  useEffect(() => {
    if (inputValue || inputValue !== question.value) {
      if (
        selectedAnswerType === AnswerTypeEnum.MULTIPLE_SELECT ||
        selectedAnswerType === AnswerTypeEnum.SINGLE_SELECT
      ) {
        if (question.options && question.options?.length > 0) {
          handleSave({
            id: question.id,
            value: inputValue,
            answerType: selectedAnswerType,
            options: question.options,
          });
        }
      } else {
        selectedAnswerType &&
          handleSave({
            id: question.id,
            value: inputValue,
            answerType: selectedAnswerType,
            options: [],
          });
      }
    }
  }, [selectedAnswerType, question.options?.length, inputValue]);

  console.log(selectedAnswerType);

  // useEffect(() => {
  //   setInputValue(question.value);
  //   // setSelectedAnswerType(question.answerType);
  // }, [question]);

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
            {
              value: AnswerTypeEnum.TEXTAREA,
              label: AnswerTypeEnumLabel.TEXTAREA,
            },
            {
              value: AnswerTypeEnum.MULTIPLE_SELECT,
              label: AnswerTypeEnumLabel.MULTIPLE_SELECT,
            },
            {
              value: AnswerTypeEnum.SINGLE_SELECT,
              label: AnswerTypeEnumLabel.SINGLE_SELECT,
            },
            { value: AnswerTypeEnum.STAR, label: AnswerTypeEnumLabel.STAR },
            { value: AnswerTypeEnum.EMOJI, label: AnswerTypeEnumLabel.EMOJI },
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
        {(selectedAnswerType === AnswerTypeEnum.MULTIPLE_SELECT ||
          selectedAnswerType === AnswerTypeEnum.SINGLE_SELECT) && (
          <AddOptionInput question={question} />
        )}
      </Collapse>
    </div>
  );
};

export { CreateFormModal };
