import { DEFAULT_AVATAR_SIZE } from '@onfeed/helpers';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { IoPencil, IoPeopleOutline } from 'react-icons/io5';
import styles from './avatar.module.scss';

interface AvatarProps
  extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    'alt' | 'height' | 'width' | 'onLoad' | 'onError' | 'onClick'
  > {
  initials: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: number;
  outlineColor?: string;
  discriminator?: boolean;
  notificationsCount?: number;
  editable?: boolean;
  square?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  disabled,
  size = DEFAULT_AVATAR_SIZE,
  src,
  initials,
  onClick,
  className,
  outlineColor,
  discriminator,
  notificationsCount,
  editable = false,
  square = false,
  ...imageProps
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const containerSize = `${size + 2 * parseInt(styles['imageSpacing'])}px`;
  const imageSize = `${size}px`;

  const buildClassnames = (): Record<string, boolean | undefined> => {
    if (notificationsCount) {
      return {
        [styles[`avatar--notification`]]: true,
      };
    }
    if (outlineColor) {
      return {
        [styles[`avatar--discriminator`]]: discriminator,
      };
    }
    return {};
  };

  useEffect(() => {
    if (!src) {
      setImageLoaded(false);
    }
  }, [src]);

  return (
    <div
      onClick={() => !disabled && onClick && onClick()}
      style={{
        width: containerSize,
        height: containerSize,
        color: !notificationsCount ? outlineColor || undefined : undefined,
      }}
      className={classNames(styles['avatar'], {
        [styles[`avatar--outline`]]: notificationsCount || outlineColor,
        [styles[`avatar--disabled`]]: disabled,
        ...buildClassnames(),
      })}
    >
      {src && (
        <img
          {...imageProps}
          src={src}
          alt={initials}
          width={imageSize}
          height={imageSize}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
          className={classNames(styles['avatar__content'], {
            [styles['avatar__content--square']]: square,
          })}
        />
      )}
      {!imageLoaded && (
        <div
          style={{ width: imageSize, height: imageSize }}
          className={classNames(styles['avatar__content'], className, {
            [styles['avatar__content--square']]: square,
            [styles['avatar__content__placeholder']]: !initials,
          })}
        >
          <span
            style={{ fontSize: `${Math.floor(size * 0.5)}px` }}
            className={styles['avatar__content--text']}
          >
            {initials.substring(0, 2)}
          </span>
        </div>
      )}
      {editable && !initials && !src && (
        <IoPeopleOutline
          className={styles['avatar__content__placeholder__icon']}
        />
      )}
      {editable && (
        <div className={classNames(styles['avatar__overlay'])}>
          <IoPencil className={classNames(styles['avatar__overlay__icon'])} />
        </div>
      )}
    </div>
  );
};

export { Avatar };
