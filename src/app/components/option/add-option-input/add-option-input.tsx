import { Flex, Grid } from '@mantine/core';
import { Input as CustomInput } from '../../custom-input/custom-input';
import classnames from 'classnames';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { setQuestions } from '@onfeed/redux';
import { useDispatch } from 'react-redux';
import { CustomBadge } from '../badge/badge';
import styles from './add-option-input.module.scss';
import { Question } from '@onfeed/models';

interface SelectOptionProps {
  question: Question;
  getOptions: (values: string[]) => void;
}

const AddOptionInput: React.FC<SelectOptionProps> = ({
  question,
  getOptions,
}) => {
  const dispatch = useDispatch();

  const { options: questionOptions } = question.answerType;

  const [message, setMessage] = useState('');
  const [options, setOptions] = useState<string[]>(
    question.answerType.options ? question.answerType.options : []
  );

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMessage(event.target.value);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && message !== '') {
      setOptions((q) => [...q, message]);
      setMessage('');
    }
  };

  const handleRemoveValue = (value: string) => {
    setOptions(options.filter((o) => o !== value));
  };

  // remove !!!
  useEffect(() => {
    if (question.id) {
      dispatch(
        setQuestions({
          id: question.id,
          value: question.value,
          answerType: {
            type: question.answerType.type,
            options: options,
          },
        })
      );
    }
    // getOptions(options);
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
                  message !== '' && setOptions((q) => [...q, message]);
                  setMessage('');
                }}
              />
            }
          />
        </Flex>
        <Grid justify={'center'}>
          {questionOptions &&
            questionOptions.map((option) => (
              <CustomBadge value={option} removeValue={handleRemoveValue} />
            ))}
        </Grid>
      </Flex>
    </div>
  );
};

export { AddOptionInput };
