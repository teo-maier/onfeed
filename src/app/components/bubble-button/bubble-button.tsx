import classNames from 'classnames';
import { BubbleButtonRight, BubbleButtonLeft } from '@onfeed/assets';

import styles from './bubble-button.module.scss';

interface BubbleButtonProps {
  position: string;
  onClick: () => void;
}

const BubbleButton: React.FC<BubbleButtonProps> = ({ position, onClick }) => {
  return (
    <div
      className={classNames(styles['bubble'], {
        [styles['bubble--left']]: position === 'left',
        [styles['bubble--right']]: position === 'right',
      })}
    >
      {position === 'right' && <BubbleButtonRight onClick={onClick} />}
      {position === 'left' && <BubbleButtonLeft onClick={onClick} />}
    </div>
  );
};

export { BubbleButton };
