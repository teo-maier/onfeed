import { FormSliceState, RootState } from '@onfeed/redux';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { CustomAnswer } from '../custom-answer';
import styles from './answer-modal.module.scss';

const AnswerModal: React.FC = () => {
  const { form, questions } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  return (
    <div className={styles['modal-answer-container']}>
      {questions.map((question, index) => (
        <div className={styles['modal-answer-content']} key={index}>
          <div className={classnames('body--secondary')}>{question.value}</div>
          <CustomAnswer
            type={question.answer.type}
            options={question.answer.options}
          />
        </div>
      ))}
    </div>
  );
};

export { AnswerModal };
