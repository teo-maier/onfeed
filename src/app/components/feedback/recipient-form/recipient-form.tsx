import { Flex } from '@mantine/core';
import { Form, SessionRecipients } from '@onfeed/models';
import { RecipientQuestion } from '../recipient-question/recipient-question';
import classnames from 'classnames';
import styles from './recipients-header.module.scss';

interface RecipientsHeaderProps {
  form: Form;
  recipient?: SessionRecipients;
}

const RecipientForm: React.FC<RecipientsHeaderProps> = ({
  form,
  recipient,
}) => {
  return (
    <Flex
      direction="column"
      gap="36px"
      w="calc(100% - 800px)"
      align="center"
      m={'0 auto'}
    >
      <h6 style={{ margin: 0 }}>{form.title}</h6>
      <Flex direction="column" gap="32px" w="70%">
        {form.questions.map((question) => (
          <RecipientQuestion question={question} recipient={recipient}/>
        ))}
      </Flex>
    </Flex>
  );
};

export { RecipientForm };
