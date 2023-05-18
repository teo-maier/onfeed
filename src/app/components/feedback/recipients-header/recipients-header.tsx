import { ScrollArea } from '@mantine/core';
import { Avatar } from '@onfeed/components';
import { getUserInitials } from '@onfeed/helpers';
import { SessionRecipients } from '@onfeed/models';
import classnames from 'classnames';
import styles from './recipients-header.module.scss';

interface RecipientsHeaderProps {
  recipients: SessionRecipients[];
}

const RecipientsHeader: React.FC<RecipientsHeaderProps> = ({ recipients }) => {
  const handleOnRecipientClick = () => {
    console.log('show form');
  };

  return (
    <ScrollArea w="calc(100% - 200px)">
      <div className={styles['members-header-container']}>
        {recipients?.map((recipient: SessionRecipients) => (
          <div
            key={recipient.id}
            className={classnames(styles['members-header-item'], {
              [styles['members-header-item--notCompleted']]:
                !recipient.completed,
            })}
            onClick={handleOnRecipientClick}
          >
            <Avatar
              size={40}
              initials={getUserInitials(recipient.employee)}
              className={styles['members-header-item--avatar']}
              disabled={!recipient.completed}
            />
            <div className={styles['members-header-item--name']}>
              <div className="caption">{recipient.employee.firstName}</div>
              <div className="caption">{recipient.employee.lastName}</div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export { RecipientsHeader };
