import { Flex, Grid } from '@mantine/core';
import { Input as CustomInput } from './../custom-input/custom-input';
import classnames from 'classnames';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import {
  FormSliceState,
  resetOptions,
  RootState,
  addOpions,
  setQuestions,
  setOptions,
} from '@onfeed/redux';
import { useDispatch, useSelector } from 'react-redux';
import { Question } from '@onfeed/models';
import { AnswerTypeEnum, AnswerTypeEnumLabel } from '@onfeed/helpers';
import { CustomBadge } from '../option';

interface SelectOptionProps {
  getOptions?: (options: Array<string>) => void;
  o: string[] | undefined;
}

const C: React.FC<SelectOptionProps> = ({ getOptions, o }) => {
  // call question prop here
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');

  const { options, questions } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMessage(event.target.value);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && message !== '') {
      dispatch(addOpions(message));
      setMessage('');
    }
  };

  console.log(o, options)

  return (
    <div>
      <Flex direction="column" justify="space-between" gap={'md'}>
        <Flex w="40%" p="8px 16px">
          <CustomInput
            className={classnames('body--secondary')}
            value={message}
            placeholder="Add options here..."
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            trailingIcon={
              <IoChevronForwardOutline
                color="#909090"
                cursor="pointer"
                onClick={() => message !== '' && dispatch(addOpions(message))}
              />
            }
          />
        </Flex>
        <Grid justify={'center'}>
          {o?.length
            ? o.map((option) => <CustomBadge value={option} />)
            : options.map((option) => <CustomBadge value={option} />)}
        </Grid>
      </Flex>
    </div>
  );
};

export { C };
