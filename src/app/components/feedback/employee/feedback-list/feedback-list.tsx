import { Button } from '@onfeed/components';
import { ButtonVariant, ONFEED_ROUTES } from '@onfeed/helpers';
import { Session } from '@onfeed/models';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './feedback-list.module.scss';

interface FeedbackListProps {
  isCompleted: boolean;
  session: Session;
}

const FeedbackList: React.FC<FeedbackListProps> = ({
  isCompleted,
  session,
}) => {
  const navigate = useNavigate();
  console.log(isCompleted)
  const handleOnClick = () => {
    if (isCompleted) {
      navigate(`${ONFEED_ROUTES.FEEDBACK}/${ONFEED_ROUTES.VIEW}/${session.id}`);
    } else {
      navigate(`${ONFEED_ROUTES.FEEDBACK}/${ONFEED_ROUTES.NEW}/${session.id}`);
    }
  };

  return (
    <div
      className={classnames('caption', styles['feedback-card-container'], {
        [styles['feedback-card-container--completed']]: isCompleted,
      })}
    >
      <div>{session.title}</div>
      {session.creator && session.createdAt && (
        <div
          className={classnames(
            'body--secondary',
            styles['feedback-creator-date']
          )}
        >
          <div>
            {session.creator.firstName + ' ' + session.creator.lastName}
          </div>
          <div>{session.createdAt.toString()}</div>
        </div>
      )}
      <Button
        fullWidth
        className={'button--secondary'}
        variant={
          isCompleted
            ? ButtonVariant.SECONDARY_SUCCESS
            : ButtonVariant.SECONDARY
        }
        onClick={handleOnClick}
      >
        {isCompleted ? 'View feedback' : 'Write feedback'}
      </Button>
    </div>
  );
};

export { FeedbackList };
