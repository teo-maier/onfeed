import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { IoClose, IoSearch } from 'react-icons/io5';
import styles from './custom-input.module.scss';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  placeholder?: string;
  error?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = React.forwardRef(
  (
    {
      label,
      placeholder,
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
        setForceLeadingIcon(<IoSearch color="#909090" />);
        setForceTrailingIcon(<IoClose color="#909090" />);
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
                styles['input__icon--trailing'],
                {
                  [styles['input__icon--trailing--search']]:
                    inputProps.type === 'search',
                }
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
            placeholder={placeholder}
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
