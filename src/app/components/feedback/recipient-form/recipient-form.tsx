import { Flex } from '@mantine/core';
import { Form } from '@onfeed/models';
import classnames from 'classnames';
import styles from './recipients-header.module.scss';

interface RecipientsHeaderProps {
  form: Form;
}

const RecipientForm: React.FC<RecipientsHeaderProps> = ({ form }) => {
  return (
    <Flex direction="column" gap="36px" w="calc(100% - 500px)" align="center">
      <h6 style={{ margin: 0 }}>{form.title}</h6>
      <Flex direction="column" gap="16px">
        {form.questions.map((question) => (
          <Flex direction="column" gap="16px">
            <div className='button--primary'>{question.value}</div>
            <div className='button--secondary'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut libero
              seman quis mi nec, bibendum congue mauris. In pellentesque non
              nulla eu sagittis. Nulla qu is ante vitae neque blandit tristique
              vel vel risus.
            </div>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export { RecipientForm };
