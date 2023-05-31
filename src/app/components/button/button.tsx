import { ButtonSize, ButtonVariant } from '@onfeed/helpers';
import classnames from 'classnames';
import React, { LegacyRef, useMemo, useRef } from 'react';
import styles from './button.module.scss';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  isFocusOn?: boolean;
}

/**
 * Reusable Button component
 * @returns {React.ReactElement}
 */
const Button: React.FC<ButtonProps> = ({
  id,
  icon,
  size = ButtonSize.COMPACT,
  variant = ButtonVariant.PRIMARY,
  disabled,
  onClick,
  className,
  fullWidth,
  children,
  type = 'button',
  isFocusOn,
  ...rest
}): React.ReactElement => {
  const onlyIcon = useMemo(() => icon && !children, [icon, children]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (onClick) {
      onClick(e);
    }
	if(isFocusOn && btnRef.current) {
		btnRef.current.focus();
	}
  };


  const btnRef = useRef<any>();


  return (
    <button
      ref={btnRef}
      {...rest}
      tabIndex={disabled ? -1 : rest.tabIndex || 0}
      type={type}
      className={classnames(
        styles['button'],
        styles[`button--${variant.toLowerCase()}`],
        className,
        {
          [styles[`button--${size.toLowerCase()}`]]: !onlyIcon,
          [styles['button--icon']]: onlyIcon,
          [styles['button--disabled']]: disabled,
          [styles['button--full-width']]: !onlyIcon && fullWidth,
        }
      )}
      onClick={handleClick}
    >
      {onlyIcon ? (
        icon
      ) : (
        <>
          {icon || null} {children}
        </>
      )}
    </button>
  );
};

export { Button };
