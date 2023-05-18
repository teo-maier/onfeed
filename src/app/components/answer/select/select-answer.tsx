import { Chip, Flex, Group } from '@mantine/core';
import { Option } from '@onfeed/models';
import { useEffect, useState } from 'react';

interface MultipleAnswerProps {
  values: Option[];
  isMultiple: boolean;
  onChangeSingle?: (value: string) => void;
  onChangeMultiple?: (value: string[]) => void;
}

const SelectAnswer: React.FC<MultipleAnswerProps> = ({
  values,
  isMultiple,
  onChangeSingle,
  onChangeMultiple,
}) => {
  const [multipleValues, setMultipleValues] = useState<string[]>([]);
  const [singleValue, setSingleValue] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (onChangeSingle) {
      onChangeSingle(singleValue);
    }
    if (onChangeMultiple) {
      onChangeMultiple(multipleValues);
    }
  }, [singleValue, multipleValues]);

  return (
    <Flex w={'100%'} mb="16px">
      {isMultiple ? (
        <Chip.Group
          multiple={isMultiple}
          value={multipleValues}
          onChange={setMultipleValues}
        >
          <Group position="center" w={'100%'}>
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
