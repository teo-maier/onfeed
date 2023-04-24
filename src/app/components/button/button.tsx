import classnames from 'classnames';
import React, { useMemo } from 'react';
import { ButtonSize, ButtonVariant } from '../../../helpers/constants/enums';
import styles from './button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: ButtonSize;
	variant?: ButtonVariant;
	fullWidth?: boolean;
	icon?: React.ReactNode;
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
	...rest
}): React.ReactElement => {
	const onlyIcon = useMemo(() => icon && !children, [icon, children]);

	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		if (disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		if (onClick) {
			onClick(e);
		}
	};

	return (
		<button
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
				},
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
