import { Textarea } from '@mantine/core';

interface TextareAnswerProps {
  placeholder: string;
  label?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const TextareAnswer: React.FC<TextareAnswerProps> = ({
  placeholder,
  label,
  onChange,
}) => {
  return (
    <Textarea
      w={'100%'}
      placeholder={placeholder}
      label={label}
      radius="md"
      onChange={onChange}
    />
  );
};
export { TextareAnswer };
