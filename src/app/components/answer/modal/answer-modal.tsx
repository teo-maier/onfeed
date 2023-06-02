import { FormSliceState, RootState } from '@onfeed/redux';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { CustomAnswer } from '../custom-answer';
import styles from './answer-modal.module.scss';

interface AnswerModalProps {
  isEditMode: boolean;
}

const AnswerModal: React.FC<AnswerModalProps> = ({ isEditMode }) => {
  const { form, questions } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  console.log(questions)
  
  return (
    <div className={styles['modal-answer-container']}>
      {questions.map((question, index) => (
        <div className={styles['modal-answer-content']} key={index}>
          <div className={classnames('body--secondary')}>{question.value}</div>
          <CustomAnswer type={question.answerType} options={question.options} editMode={isEditMode}/>
        </div>
      ))}

      {/* form title cannot be updated !!!!!!!!!! */}
      {/* {isEditMode &&
        form &&
        form.questions.map((question, index) => (
          <div className={styles['modal-answer-content']} key={index}>
            <div className={classnames('body--secondary')}>
              {question.value}
            </div>
            <CustomAnswer
              type={question.answerType}
              options={question.options}
            />
          </div>
        ))} */}
    </div>
  );
};

export { AnswerModal };
