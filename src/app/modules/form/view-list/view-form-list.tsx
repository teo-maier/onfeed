import { Flex } from '@mantine/core';
import { BubbleNumberComponent, CustomAnswer } from '@onfeed/components';
import { FormSliceState, RootState } from '@onfeed/redux';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './view-form-list.module.scss';

const ViewFormList: React.FC = () => {
  const { form } = useSelector<RootState, FormSliceState>(
    (state) => state.form
  );

  return (
    <Flex direction="column" gap="24px" p="16px" w="100%">
      {form?.questions.map((question, index) => (
        <div className={styles['question-card']}>
          <BubbleNumberComponent value={index + 1} bubbleType="number" />
          <Flex direction="column" gap="md" w="100%" p="8px 8px 0 0">
            <div className={classnames('body--secondary')}>
              {question.value}
            </div>
            <CustomAnswer
              type={question.answerType}
              options={question.options}
            />
          </Flex>
        </div>
      ))}
    </Flex>
  );
};

export { ViewFormList };
