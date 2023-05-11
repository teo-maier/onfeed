import { Chip, Flex, Group } from '@mantine/core';
import { Option } from '@onfeed/models';
import { useState } from 'react';

interface MultipleAnswerProps {
  values: Option[];
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

  return (
    <Flex w={'100%'} mb="16px">
      {isMultiple ? (
        <Chip.Group
          multiple={isMultiple}
          value={multipleValues}
          onChange={setMultipleValues}
        >
          <Group position="center" mt="md" w={'100%'}>
            {values.map(({ value }) => (
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
            {values.map(({ value }) => (
              <Chip
                variant={'light'}
                value={value}
                checked={checked}
                onChange={() => {
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
