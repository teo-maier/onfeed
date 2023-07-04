import { Flex } from '@mantine/core';
import { Form, Session, SessionRecipients } from '@onfeed/models';
import { RecipientQuestion } from '../recipient-question/recipient-question';
import classnames from 'classnames';
import styles from './recipients-header.module.scss';

interface RecipientsHeaderProps {
  session: Session;
  recipient: SessionRecipients;
}

const RecipientForm: React.FC<RecipientsHeaderProps> = ({
  session,
  recipient,
}) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {session.form && (
        <Flex
          direction="column"
          gap="36px"
          w="calc(100% - 800px)"
          align="center"
          m={'0 auto'}
        >
          <h6 style={{ margin: 0 }}>{session.form.title}</h6>
          <Flex direction="column" gap="32px" w="70%">
            {session.form.questions.map((question) => (
              <RecipientQuestion question={question} recipient={recipient} />
            ))}
          </Flex>
        </Flex>
      )}
    </>
  );
};

export { RecipientForm };
