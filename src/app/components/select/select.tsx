import { useClickOutside, useMergedRef } from '@mantine/hooks';
import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { Input } from '../input/input';
import styles from './select.module.scss';

export interface OptionProps
  extends Omit<React.OptionHTMLAttributes<HTMLDivElement>, 'label' | 'value'> {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface SelectProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'defaultValue'
  > {
  options: OptionProps[];
  onChange: (value: string) => void;
  value?: string;
  defaultValue?: string;
  label?: React.ReactNode;
  error?: React.ReactNode;
}

const SELECT_ID = 'select-input';

const MyCustomSelect: React.FC<SelectProps> = React.forwardRef<
  HTMLInputElement,
  SelectProps
>(
  (
    { options, defaultValue, value: passedValue, onChange, ...inputProps },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const clickOutsideRef = useClickOutside(() => setOpened(false));

    const [opened, setOpened] = useState(false);
    const [value, setValue] = useState<string>(
      defaultValue || passedValue || ''
    );

    const renderOnTop = useMemo(() => {
      const inputElement = document.getElementById(SELECT_ID);
      if (!inputElement) {
        return false;
      }
      const optionsHeight = +styles['optionPanelHeight'].replace('px', '');
      const { bottom } = inputElement.getBoundingClientRect();
      return bottom + optionsHeight > window.innerHeight - 50;
    }, [styles, document.getElementById(SELECT_ID), window.innerHeight]);

    const selectedOption = useMemo(() => {
      return options.find(({ value: optionValue }) => optionValue === value);
    }, [options, value]);

    /**
     * Whenever {@link opened} state changes, toggle body scroll on or off
     */
    useEffect(() => {
      if (opened) {
        inputRef?.current?.focus();
        document.body.classList.add('no-scroll');
      } else {
        inputRef?.current?.blur();
        document.body.classList.remove('no-scroll');
      }
    }, [opened]);

    /**
     * Whenever {@link inputRef} value changes, trigger the onChange callback
     */
    useEffect(() => {
      onChange(value);
    }, [inputRef?.current?.value]);

    /**
     * Closes the options panel
     */
    const closeSelect = () => {
      if (!opened) {
        return;
      }
      setOpened(false);
      inputRef?.current?.blur();
    };

    /**
     * Custom handler for changes
     * @param value Selected value from the options
     */
    const handleChange = (value: string) => {
      setValue(value);
      closeSelect();
    };

    /**
     * Custom handler for input key events
     * @param e Keyboard event
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      const { code } = e;
      switch (code) {
        case 'Space':
          !opened && setOpened((previouslyOpened) => !previouslyOpened);
          break;
        case 'Escape':
          closeSelect();
          break;
      }
    };

    /**
     * Custom handler for select options panel key events
     * @param e Keyboard event
     */
    const handleOptionKeyDown = (
      e: React.KeyboardEvent<HTMLDivElement>,
      value: string
    ): void => {
      const { code } = e;
      switch (code) {
        case 'Enter':
        case 'Space':
          handleChange(value);
          break;
        case 'Escape':
          closeSelect();
          break;
      }
    };

    return (
      <div
        // className={styles['select__wrapper']}
        className={classNames(styles['select__wrapper'])}
      >
        <input
          {...inputProps}
          readOnly
          ref={useMergedRef<HTMLInputElement>(ref, inputRef)}
          type="hidden"
          value={value}
          autoComplete="off"
        />
        <Input
          readOnly
          {...inputProps}
          id={SELECT_ID}
          trailingIcon={
            <IoChevronDown
              className={classNames(styles['select__icon'], {
                [styles['select__icon--open']]: opened,
              })}
            />
          }
          value={selectedOption ? selectedOption.label : value}
          autoComplete="off"
          onKeyDown={(e) => {
            e.stopPropagation();
            handleKeyDown(e);
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpened((previouslyOpened) => !previouslyOpened);
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          style={{ cursor: 'pointer', userSelect: 'none', margin: '0px' }}
        />

        {opened && (
          <div
            ref={clickOutsideRef}
            className={classNames(styles['select__options'], {
              [styles['select__options--top']]: renderOnTop,
              [styles['select__options--bottom']]: !renderOnTop,
            })}
          >
            {options.map((option) => (
              <SelectItem
                key={option.value}
                onClick={() => handleChange(option.value)}
                onKeyDown={(e) => handleOptionKeyDown(e, option.value)}
                tabIndex={opened ? 0 : -1}
                {...option}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

const SelectItem: React.FC<OptionProps> = ({
  label,
  icon,
  disabled,
  ...optionProps
}) => {
  return (
    <div
      {...optionProps}
      className={classNames(styles['select-item'], {
        [styles['select-item--disabled']]: disabled,
      })}
    >
      {icon && <div className={styles['select-item__icon']}>{icon}</div>}
      {label}
    </div>
  );
};

export { MyCustomSelect };
