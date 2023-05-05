import classnames from 'classnames';
import styles from './bubble-number.module.scss';

interface BubbleNumberComponentProps {
  value: number;
  bubbleType: string;
}

const BubbleNumberComponent: React.FC<BubbleNumberComponentProps> = ({
  value,
  bubbleType,
}) => {
  return (
    <div className={classnames(styles['bubble-number-container'], 'caption')}>
      <div
        className={classnames(styles['bubble-number'], {
          [styles['bubble-number--grade']]: bubbleType === 'grade',
        })}
      >
        {value}
      </div>
    </div>
  );
};

export { BubbleNumberComponent };
