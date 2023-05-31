import { Flex } from '@mantine/core';
import { Form } from '@onfeed/models';
import { RecipientQuestion } from '../recipient-question/recipient-question';
import classnames from 'classnames';
import styles from './recipients-header.module.scss';

interface RecipientsHeaderProps {
  form: Form;
}

const RecipientForm: React.FC<RecipientsHeaderProps> = ({ form }) => {
  return (
    <Flex direction="column" gap="36px" w="calc(100% - 800px)" align="center" m={'0 auto'}>
      <h6 style={{ margin: 0 }}>{form.title}</h6>
      <Flex direction="column" gap="32px" w="100%">
        {form.questions.map((question) => (
          <RecipientQuestion question={question} />
        ))}
      </Flex>
    </Flex>
  );
};

export { RecipientForm };
