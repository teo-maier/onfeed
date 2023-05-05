import { Select, CloseButton, createStyles, Accordion } from '@mantine/core';
import { useEffect, useState } from 'react';
import {
  OptionType,
  OptionTypeLabel,
} from 'src/helpers/constants/option-type.enum';
import { Input as CustomInput } from '../input/input';
import { SelectOption } from '../option/select/select-option';
import classnames from 'classnames';
import styles from './modal.module.scss';
import { FormSliceState, RootState, setFormQuestions } from '@onfeed/redux';
import { useDispatch, useSelector } from 'react-redux';
import { FormQuestion } from 'src/app/models/form/form-question';
import { v4 as uuid } from 'uuid';

const useStyles = createStyles((theme) => ({
  input: {
    color: '#909090',
    fontFamily: 'Montserrat',
  },
}));

interface ModalProps {
  handleSave: (question: FormQuestion) => void;
}

const ModalAccordion: React.FC<ModalProps> = ({ handleSave }) => {
  const { classes } = useStyles();

  const [question, setQuestion] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [options, setOptions] = useState<Array<string>>([]);

  const { formQuestions } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const saveQuestion = (options: Array<string>) => {
    setOptions(options);
  };
  console.log(selectedValue);

  useEffect(() => {
    if (question) {
      selectedValue === OptionTypeLabel.MULTIPLE_SELECT ||
      selectedValue === OptionTypeLabel.SINGLE_SELECT
        ? options.length > 0 &&
          handleSave({
            question: question,
            answerType: selectedValue,
            options: options,
          })
        : selectedValue &&
          handleSave({
            question: question,
            answerType: selectedValue,
          });
    }
    // switch (selectedValue) {
    //   case OptionTypeLabel.MULTIPLE_SELECT:
    //   case OptionTypeLabel.SINGLE_SELECT:
    //     if (options.length > 0) {
    //       return handleSave({
    //         question: question!,
    //         answerType: selectedValue,
    //         options: options,
    //       });
    //     }
    //     break;
    //   case OptionTypeLabel.TEXTAREA:
    //   case OptionTypeLabel.GRADE:
    //   case OptionTypeLabel.STAR:
    //     return handleSave({
    //       question: question!,
    //       answerType: selectedValue,
    //     });
    // }
  }, [selectedValue, options]);

  return (
    <div className={styles['modal-content']}>
      <Accordion
        w={'630px'}
        variant="separated"
        defaultValue="Write your  here..."
      >
        {formQuestions.map((form) => (
          <Accordion.Item value={uuid()}>
            <Accordion.Control
              onClick={(e) => {
                const target = e.target as HTMLElement;
                console.log(target);
                if (target.getAttribute('data-mantine-stop-propagation')) {
                  e.stopPropagation();
                }
              }}
            >
              <CustomInput
                className={classnames('body--secondary', styles['input-modal'])}
                placeholder={form.question}
                //   onChange={(event) => setQuestion(event?.target.value)}
              />
            </Accordion.Control>
            <Accordion.Panel>
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
                // onClick={(event) => event.stopPropagation()}
                placeholder="- Question type -"
                dropdownPosition="bottom"
                radius="12px"
                w={'50%'}
                p={'8px 16px'}
              />
              {(selectedValue === OptionTypeLabel.MULTIPLE_SELECT ||
                selectedValue === OptionTypeLabel.SINGLE_SELECT) && (
                <SelectOption getOptions={saveQuestion} />
              )}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export { ModalAccordion };
