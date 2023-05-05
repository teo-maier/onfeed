import styles from './select-answer.module.scss';
import { Chip, createStyles, Flex, Group } from '@mantine/core';
import classnames from 'classnames';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  iconWrapper: {
    // color: '#2351sd4',
  },
  label: {
    fontFamily: 'Montserrat',
    fontSize: '12px',
  },
  // dunno how to set color for border
  // deselect on single chip does not work
}));

interface MultipleAnswerProps {
  values: string[];
  isMultiple: boolean;
  onChange?: (value: string[] | string) => void;
}

const SelectAnswer: React.FC<MultipleAnswerProps> = ({
  values,
  isMultiple,
  onChange,
}) => {
  const { classes } = useStyles();
  const [multipleValues, setMultipleValues] = useState<string[]>(['']);
  const [singleValue, setSingleValue] = useState('');
  const [checked, setChecked] = useState(false);

  console.log(checked);
  return (
    <Flex w={'100%'}>
      {isMultiple ? (
        <Chip.Group
          multiple={isMultiple}
          value={multipleValues}
          onChange={setMultipleValues}
        >
          <Group position="center" mt="md" w={'100%'}>
            {values.map((value, index) => (
              <Chip classNames={classes} variant={'light'} value={value}>
                {value}
              </Chip>
            ))}
          </Group>
        </Chip.Group>
      ) : (
        <Chip.Group
          multiple={false}
          value={singleValue}
          onChange={setSingleValue}
        >
          <Group position="center" mt="md" w={'100%'}>
            {values.map((value, index) => (
              <Chip
                classNames={classes}
                variant={'light'}
                value={value}
                checked={checked}
                onChange={() => {
                  console.log('a');
                  // setChecked(!a);
                }}
              >
                {value}
              </Chip>
            ))}
          </Group>
        </Chip.Group>
      )}
    </Flex>
  );
};

export { SelectAnswer };
