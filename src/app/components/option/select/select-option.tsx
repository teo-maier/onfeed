import { ActionIcon, Badge, CloseButton, Flex, Grid } from '@mantine/core';
import { Input as CustomInput } from '../../input/input';
import classnames from 'classnames';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import styles from './select-option.module.scss';
import {
  FormSliceState,
  removeOption,
  RootState,
  setOptions,
} from '@onfeed/redux';
import { useDispatch, useSelector } from 'react-redux';
import { CustomBadge } from '../badge/badge';

interface SelectOptionProps {
  text?: string;
  getOptions: (options: Array<string>) => void;
}

const SelectOption: React.FC<SelectOptionProps> = ({ getOptions }) => {
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
      {/* <div className={classnames('body--secondary', styles['options-title'])}>
        Please add options
      </div> */}
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

export { SelectOption };
