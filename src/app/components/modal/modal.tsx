import {
  Select,
  CloseButton,
  createStyles,
  Collapse,
  Flex,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import {
  OptionType,
  OptionTypeLabel,
} from 'src/helpers/constants/option-type.enum';
import { Input as CustomInput } from '../input/input';
import { SelectOption } from '../option/select/select-option';
import classnames from 'classnames';
import styles from './modal.module.scss';
import {
  FormSliceState,
  removeQuestion,
  RootState,
  setFormQuestions,
} from '@onfeed/redux';
import { useDispatch, useSelector } from 'react-redux';
import { FormQuestion } from 'src/app/models/form/form-question';
import { useDisclosure } from '@mantine/hooks';
import { QuestionNumberComponent } from '../question-number/question-number';

const useStyles = createStyles((theme) => ({
  input: {
    color: '#909090',
    fontFamily: 'Montserrat',
  },
}));

interface ModalProps {
  inputPlaceholder: string;
  handleSave: (question: FormQuestion) => void;
  handleRemoveQuestion: (question: number) => void;
  questionNumber: number;
  questionIndex: number;
}

const ModalFormTemplate: React.FC<ModalProps> = ({
  inputPlaceholder,
  handleSave,
  handleRemoveQuestion,
  questionNumber,
  questionIndex,
}) => {
  const { classes } = useStyles();

  const [question, setQuestion] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [options, setOptions] = useState<Array<string>>([]);

  const [opened, { toggle }] = useDisclosure(false);

  const saveQuestion = (options: Array<string>) => {
    setOptions(options);
  };

  useEffect(() => {
    if (question) {
      selectedValue === OptionTypeLabel.MULTIPLE_SELECT ||
      selectedValue === OptionTypeLabel.SINGLE_SELECT
        ? options.length > 0 &&
          handleSave({
            id: questionNumber,
            question: question,
            answerType: selectedValue,
            options: options,
          })
        : selectedValue &&
          handleSave({
            id: questionNumber,
            question: question,
            answerType: selectedValue,
          });
    }
  }, [selectedValue, options]);

  return (
    <div className={styles['modal-content']}>
      <CloseButton
        aria-label="Close modal"
        className={styles['cancel-modal-icon']}
        onClick={() => handleRemoveQuestion(questionNumber)}
      />
      {/* this should probably be a textarea */}
      <Flex direction={'row'} w="100%">
        <QuestionNumberComponent value={questionIndex} />
        <CustomInput
          className={classnames('body--secondary', styles['input-modal'])}
          placeholder={inputPlaceholder}
          onChange={(event) => setQuestion(event?.target.value)}
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
          onChange={(value) => setSelectedValue(value)}
          placeholder="- Answer type -"
          fz="12px"
          dropdownPosition="bottom"
          radius="12px"
          w={'40%'}
          p={'8px 16px'}
        />
        {(selectedValue === OptionTypeLabel.MULTIPLE_SELECT ||
          selectedValue === OptionTypeLabel.SINGLE_SELECT) && (
          <SelectOption getOptions={saveQuestion} />
        )}
      </Collapse>
    </div>
  );
};

export { ModalFormTemplate };
