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
import { OptionTypeLabel } from '@onfeed/helpers';

const useStyles = createStyles((theme) => ({
  input: {
    color: '#909090',
    fontFamily: 'Montserrat',
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
  question: q,
  questionIndex,
}) => {
  const { classes } = useStyles();

  const [inputValue, setInputValue] = useState<string | null>(null);
  const [selectedAnswerType, setSelectedAnswerType] = useState<string | null>(null);
  const [options, setOptions] = useState<Array<string>>([]);

  const [opened, { toggle }] = useDisclosure(false);

  const saveOptions = (options: Array<string>) => {
    setOptions(options);
  };

  // !! save questions[] after hitting next bubble button

  useEffect(() => {
    if (inputValue) {
      selectedAnswerType === OptionTypeLabel.MULTIPLE_SELECT ||
      selectedAnswerType === OptionTypeLabel.SINGLE_SELECT
        ? options.length > 0 &&
          handleSave({
            id: q.id,
            value: inputValue,
            answer: {
              type: selectedAnswerType,
              options: options,
            },
          })
        : selectedAnswerType &&
          handleSave({
            id: q.id,
            value: inputValue,
            answer: {
              type: selectedAnswerType,
            },
          });
    }
  }, [selectedAnswerType, options]);

  return (
    <div className={styles['modal-content']}>
      <CloseButton
        aria-label="Close modal"
        className={styles['cancel-modal-icon']}
        onClick={() => handleRemove(q)}
      />
      {/* this should probably be a textarea */}
      <Flex direction={'row'} w="100%">
        <BubbleNumberComponent value={questionIndex} bubbleType="number" />
        <CustomInput
          className={classnames('body--secondary', styles['input-modal'])}
          placeholder={inputPlaceholder}
          onChange={(event) => setInputValue(event?.target.value)}
          onClick={toggle}
        />
      </Flex>
      <Collapse in={opened} w="100%">
        <Select
          classNames={classes}
          data={[
            OptionTypeLabel.TEXTAREA,
            OptionTypeLabel.MULTIPLE_SELECT,
            OptionTypeLabel.SINGLE_SELECT,
            OptionTypeLabel.STAR,
            OptionTypeLabel.GRADE,
          ]}
          onChange={(value) => setSelectedAnswerType(value)}
          placeholder="- Answer type -"
          fz="12px"
          dropdownPosition="bottom"
          radius="12px"
          w={'40%'}
          p={'8px 16px'}
        />
        {(selectedAnswerType === OptionTypeLabel.MULTIPLE_SELECT ||
          selectedAnswerType === OptionTypeLabel.SINGLE_SELECT) && (
          <AddOptionInput getOptions={saveOptions} />
        )}
      </Collapse>
    </div>
  );
};

export { CreateFormModal  };
