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
    <div
      className={classnames(
        styles['bubble-number-container'],
        {
          [styles['bubble-number-container--feedback']]:
            bubbleType === 'answered' ||
            bubbleType === 'notAnswered' ||
            bubbleType === 'total',
        },
        'caption'
      )}
    >
      <div
        className={classnames(styles['bubble-number'], {
          [styles['bubble-number--grade']]: bubbleType === 'grade',
          [styles['bubble-number--answered']]: bubbleType === 'answered',
          [styles['bubble-number--notAnswered']]: bubbleType === 'notAnswered',
          [styles['bubble-number--total']]: bubbleType === 'total',
        })}
      >
        {value}
      </div>
    </div>
  );
};

export { BubbleNumberComponent };
