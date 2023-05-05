import { FormSliceState, RootState } from '@onfeed/redux';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { FormQuestion } from 'src/app/models/form/form-question';
import { OptionTypeLabel } from 'src/helpers/constants/option-type.enum';
import { CustomAnswer } from '../custom-answer';
import { Input as CustomInput } from './../../input/input';

import styles from './modal-answer.module.scss';

const ModalAnswer: React.FC = () => {
  const { formQuestions, isBubbleClicked } = useSelector<
    RootState,
    FormSliceState
  >((state) => state.form);

  const mockData: FormQuestion[] = [
    {
      id: 1,
      questionText: 'How are you?',
      answerType: OptionTypeLabel.TEXTAREA,
    },
    {
      id: 1,
      questionText: 'Bla bla',
      answerType: OptionTypeLabel.MULTIPLE_SELECT,
      options: ['butoi', 'stilou', 'mancare'],
    },
    {
      id: 1,
      questionText: 'teo teo teo',
      answerType: OptionTypeLabel.SINGLE_SELECT,
      options: ['abfart', 'stuhl', 'verspatung'],
    },
    {
      id: 1,
      questionText: 'maier maier maier.........',
      answerType: OptionTypeLabel.EMOJI,
      maxGradeOrStars: 10,
    },
    {
      id: 1,
      questionText: 'hahahhahahhhahahhahahah',
      answerType: OptionTypeLabel.STAR,
      maxGradeOrStars: 5,
    },
  ];

  return (
    <>
      {mockData.map((question, index) => (
        <div className={styles['modal-answer-content']} key={index}>
          <div className={classnames('body--secondary')}>
            {question.questionText}
          </div>
          <CustomAnswer
            type={question.answerType}
            options={question.options}
            maxGradeOrStars={question.maxGradeOrStars}
          />
        </div>
      ))}
    </>
  );
};

export { ModalAnswer };
