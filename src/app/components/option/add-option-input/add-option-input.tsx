import { Flex, Grid } from '@mantine/core';
import { Input as CustomInput } from '../../custom-input/custom-input';
import classnames from 'classnames';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { FormSliceState, RootState, setOptions } from '@onfeed/redux';
import { useDispatch, useSelector } from 'react-redux';
import { CustomBadge } from '../badge/badge';
import styles from './add-option-input.module.scss';
import { Question } from '@onfeed/models';

interface SelectOptionProps {
  getOptions: (options: Array<string>) => void;
}

const AddOptionInput: React.FC<SelectOptionProps> = ({ getOptions }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');

  const { options } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMessage(event.target.value);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && message !== '') {
      dispatch(setOptions(message));
      setMessage('');
    }
  };

  useEffect(() => {
    getOptions(options);
  }, [options.length]);

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
                onClick={() => message !== '' && dispatch(setOptions(message))}
              />
            }
          />
        </Flex>
        <Grid justify={'center'}>
          {options.length > 0 &&
            options.map((option) => <CustomBadge value={option} />)}
        </Grid>
      </Flex>
    </div>
  );
};

export { AddOptionInput };
