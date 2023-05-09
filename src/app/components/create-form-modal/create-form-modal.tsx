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
import { AnswerTypeEnum, AnswerTypeEnumLabel } from '@onfeed/helpers';
import { FormSliceState, RootState, setOptions } from '@onfeed/redux';
import { useSelector } from 'react-redux';

const useStyles = createStyles((theme) => ({
  input: {
    color: '#909090',
    fontFamily: 'Montserrat',
    fontSize: '12px',
  },
}));

interface ModalProps {
  inputPlaceholder?: string;
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

  const [inputValue, setInputValue] = useState<string | null>(null);
  const [selectedAnswerType, setSelectedAnswerType] = useState<string>(
    AnswerTypeEnumLabel[question.answerType.type]
  );
  const [options, setOptions] = useState<Array<string>>([]);

  const [opened, { toggle }] = useDisclosure(false);

  const saveOptions = (options: Array<string>) => {
    setOptions(options);
  };

  // !! save questions[] after hitting next bubble button

  useEffect(() => {
    if (inputValue) {
      selectedAnswerType === AnswerTypeEnumLabel.MULTIPLE_SELECT ||
      selectedAnswerType === AnswerTypeEnumLabel.SINGLE_SELECT
        ? options.length > 0 &&
          handleSave({
            id: question.id,
            value: inputValue,
            answerType: {
              type: selectedAnswerType as AnswerTypeEnum,
              options: options,
            },
          })
        : selectedAnswerType &&
          handleSave({
            id: question.id,
            value: inputValue,
            answerType: {
              type: selectedAnswerType as AnswerTypeEnum,
            },
          });
    }
  }, [selectedAnswerType, options]);

  return (
    <div className={styles['modal-content']}>
      <CloseButton
        aria-label="Close modal"
        className={styles['cancel-modal-icon']}
        onClick={() => handleRemove(question)}
      />
      {/* this should probably be a textarea */}
      <Flex direction={'row'} w="100%">
        <BubbleNumberComponent value={questionIndex} bubbleType="number" />
        <CustomInput
          className={classnames('button--secondary', styles['input-modal'])}
          placeholder={inputPlaceholder}
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
          <AddOptionInput getOptions={saveOptions} />
        )}
      </Collapse>
    </div>
  );
};

export { CreateFormModal };
