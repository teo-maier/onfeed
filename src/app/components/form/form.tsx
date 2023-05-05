import classnames from 'classnames';
import React, { HTMLInputTypeAttribute, useEffect } from 'react';
import {
  RegisterOptions,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { ButtonSize, ButtonVariant } from '../../../helpers/constants/enums';
import { Button, ButtonProps } from '../button/button';
import { Input, InputProps } from '../input/input';
import { SelectProps } from '../select/select';
import styles from './form.module.scss';

export type FormField = (
  | ({ type: HTMLInputTypeAttribute } & Omit<InputProps, 'type'>)
  | ({ type: 'select'; value?: string } & SelectProps)
) & { config: RegisterOptions };

interface FormProps {
  loading?: boolean;
  defaultValues?: any;
  fields: Array<FormField>;
  actions?: Array<JSX.Element>;
  inlineActions?: boolean;
  onSubmit: (data: any) => void;
  className?: string;
  style?: React.CSSProperties;
  buttonText?: string;
  watchCallback?: (data: any, options: any) => void;
  submitButtonProps?: ButtonProps;
  clearOnSubmit?: boolean;
}

export const Form: React.FC<FormProps> = ({
  loading,
  onSubmit: parentOnSubmit,
  defaultValues,
  fields,
  actions,
  inlineActions = false,
  className,
  style,
  buttonText,
  watchCallback,
  submitButtonProps = {
    variant: ButtonVariant.PRIMARY,
    size: ButtonSize.COMPACT,
  },
  clearOnSubmit,
}) => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    trigger,
    watch,
    reset,
  } = useForm<any>({
    defaultValues,
    shouldFocusError: true,
    reValidateMode: 'onSubmit',
  });

  if (watchCallback) {
    watch(watchCallback);
  }

  /**
   * On component mount or {@link defaultValues}, set the values on the form state.
   * This way, validation errors are not thrown if the Form is generated before default values are available.
   */
  useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, value]) =>
        setValue(key, value)
      );
    }
  }, [defaultValues]);

  useEffect(() => {
    if (isSubmitSuccessful && clearOnSubmit) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<any> = (data) => {
    parentOnSubmit(data);
  };

  const onSubmitFailure: SubmitErrorHandler<any> = (errors) => {
    console.warn(errors);
  };

  const renderInput = (field: FormField) => {
    const {
      name,
      label,
      type,
      placeholder,
      config: fieldConfig,
      onChange,
      value,
      defaultValue,
      ...inputProps
    } = field;

    if (!name) {
      return null;
    }

    return (
      <Input
        {...register(name, fieldConfig)}
        {...inputProps}
        label={label}
        error={errors?.[name]?.message as React.ReactNode}
        type={type}
        defaultValue={defaultValues?.[name]}
        placeholder={placeholder}
      />
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onSubmitFailure)}
      className={classnames(styles['form-container'], className)}
      style={style}
    >
      <div>
        {fields.map((field) => {
          const { name } = field;

          if (!name) {
            return null;
          }

          return (
            <div
              key={name}
              className={classnames('caption', styles['form-input__container'])}
            >
              {renderInput(field)}
            </div>
          );
        })}
      </div>
      <div
        className={classnames(styles['button-container'], {
          [styles['button-container--inline']]: inlineActions,
        })}
      >
        <Button
          {...submitButtonProps}
          disabled={loading}
          type="submit"
          onClick={() => trigger()}
        >
          {buttonText}
        </Button>

        {/* Render custom actions */}
        {actions || null}
      </div>
    </form>
  );
};
