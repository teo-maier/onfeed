import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import { IoClose, IoSearch } from 'react-icons/io5';
import styles from './input.module.scss';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = React.forwardRef(
  (
    {
      label,
      name,
      disabled,
      error,
      className,
      leadingIcon,
      trailingIcon,
      ...inputProps
    },
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [forceLeadingIcon, setForceLeadingIcon] =
      useState<React.ReactNode>(null);
    const [forceTrailingIcon, setForceTrailingIcon] =
      useState<React.ReactNode>(null);

    useEffect(() => {
      if (inputProps.type === 'search') {
        setForceLeadingIcon(<IoSearch />);
        setForceTrailingIcon(<IoClose />);
      }
    }, [inputProps.type]);

    const clearInput = () => {
      inputProps.value = '';
    };

    return (
      <div
        className={classnames(styles['input__wrapper'], {
          [styles['input__wrapper--disabled']]: disabled,
          [styles['input__wrapper--error']]: !!error,
        })}
      >
        {label && (
          <label htmlFor={name} className={classnames('caption')}>
            {label}
          </label>
        )}

        <div className={styles['input__container']}>
          {(leadingIcon || forceLeadingIcon) && (
            <div
              className={classnames(
                styles['input__icon'],
                styles['input__icon--leading']
              )}
            >
              {forceLeadingIcon}
            </div>
          )}

          {(trailingIcon || forceTrailingIcon) && (
            <div
              className={classnames(
                styles['input__icon'],
                styles['input__icon--trailing']
              )}
            >
              {trailingIcon || forceTrailingIcon}
            </div>
          )}

          <input
            {...inputProps}
            ref={ref}
            name={name}
            disabled={disabled}
            className={classnames(styles['input'], className, {
              [styles['input--error']]: !!error,
            })}
          />
        </div>

        {!!error && (
          <div className={classnames(styles['input__error'], 'overline')}>
            {error}
          </div>
        )}
      </div>
    );
  }
);

export { Input };
