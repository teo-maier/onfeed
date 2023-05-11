import { Flex, Grid } from '@mantine/core';
import { Input as CustomInput } from '../../custom-input/custom-input';
import classnames from 'classnames';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { setQuestions } from '@onfeed/redux';
import { useDispatch } from 'react-redux';
import { CustomBadge } from '../badge/badge';
import styles from './add-option-input.module.scss';
import { Question, Option, OptionValues } from '@onfeed/models';

interface SelectOptionProps {
  question: Question;
}

const AddOptionInput: React.FC<SelectOptionProps> = ({ question }) => {
  const dispatch = useDispatch();

  const { options: questionOptions } = question;

  const [message, setMessage] = useState('');
  const [options, setOptions] = useState<Option[]>(
    question.options ? question.options : []
  );

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMessage(event.target.value);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && message !== '') {
      setOptions((q) => [...q, { value: message }]);
      setMessage('');
    }
  };

  const handleRemoveValue = (value: string) => {
    setOptions(options.filter((o) => o.value !== value));
  };

  useEffect(() => {
    if (question.id) {
      dispatch(
        setQuestions({
          id: question.id,
          value: question.value,
          answerType: question.answerType,
          options: options,
        })
      );
    }
  }, [options]);

  return (
    <div className={classnames(styles['options-content'])}>
      <Flex direction="column" justify="space-between" gap={'md'}>
        <Flex w="40%" p="8px 16px">
          <CustomInput
            className={classnames('body--secondary', styles['option-input'])}
            value={message}
            placeholder="Add options here..."
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            trailingIcon={
              <IoChevronForwardOutline
                color="#909090"
                cursor="pointer"
                onClick={() => {
                  message !== '' &&
                    setOptions((q) => [...q, { value: message }]);
                  setMessage('');
                }}
              />
            }
          />
        </Flex>
        <Grid justify={'center'}>
          {questionOptions &&
            questionOptions.map((option) => (
              <CustomBadge
                value={option.value}
                removeValue={handleRemoveValue}
              />
            ))}
        </Grid>
      </Flex>
    </div>
  );
};

export { AddOptionInput };
