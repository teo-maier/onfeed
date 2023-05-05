import { SelectOption } from './select/select-option';

interface OptionProps {
  type: string;
}

const CustomOption: React.FC<OptionProps> = ({ type }) => {
  switch (type) {
    case 'Multiple select':
    case 'Single select':
      return <SelectOption />;
    // case 'stars':
    //   return (
    //     <Checkbox
    //       {...register(name, fieldConfig)}
    //       onChange={(value) => setValue(name, value)}
    //       label={label}
    //       defaultChecked={defaultValues?.[name]}
    //     />
    //   );
    // case 'grade':
    //   return (
    //     <Checkbox
    //       {...register(name, fieldConfig)}
    //       onChange={(value) => setValue(name, value)}
    //       label={label}
    //       defaultChecked={defaultValues?.[name]}
    //     />
    //   );
    // case 'textarea':
    //   return (
    //     <Checkbox
    //       {...register(name, fieldConfig)}
    //       onChange={(value) => setValue(name, value)}
    //       label={label}
    //       defaultChecked={defaultValues?.[name]}
    //     />
    //   );
    default:
      return <></>;
  }
};

export { CustomOption };
