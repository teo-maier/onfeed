import { Chip, createStyles, Flex, Group } from '@mantine/core';
import { useState } from 'react';

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
              <Chip variant={'light'} value={value}>
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
