import { Textarea } from '@mantine/core';
import { useEffect, useState } from 'react';

interface TextareAnswerProps {
  placeholder: string;
  label?: string;
  onChange?: (value: string) => void;
}

const TextareAnswer: React.FC<TextareAnswerProps> = ({
  placeholder,
  label,
  onChange,
}) => {
  const [value, setValue] = useState<string>();
  const handleOnChange = (e: string) => {
    setValue(e);
  };
  useEffect(() => {
    if (onChange && value) {
      onChange(value);
    }
  }, [value]);
  return (
    <Textarea
      w={'100%'}
      placeholder={placeholder}
      label={label}
      radius="md"
      onChange={(e) => handleOnChange(e.target.value)}
    />
  );
};
export { TextareAnswer };
