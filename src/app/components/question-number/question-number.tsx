import classnames from 'classnames';
import styles from './question-number.module.scss'

interface QuestionNumberComponentProps {
  value: number;
}

const QuestionNumberComponent: React.FC<QuestionNumberComponentProps> = ({
  value,
}) => {
    return(
<div className={classnames(styles['question-number-container'], 'caption')}>
        <div
          className={classnames(styles['question-number'])}
        >
          {value}
        </div>
      </div>
    );
};

export {QuestionNumberComponent}
