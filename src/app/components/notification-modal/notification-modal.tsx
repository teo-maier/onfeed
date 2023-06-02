import { Button } from '../button/button';
import { ButtonVariant } from '@onfeed/helpers';
import { ParentModal } from './parent-modal';
import styles from './notification-modal.module.scss';

interface NotificationModalProps {
  question: string;
  description?: string;
  buttonText: string;
  buttonType: ButtonVariant;
  visible: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
  children?: React.ReactNode;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  question,
  description,
  buttonText,
  buttonType,
  visible,
  handleConfirm,
  handleCancel,
  children,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <ParentModal>
      <div className={styles['modal']}>
        <div className={styles['modal-content']}>
          <h6 style={{ margin: '0px' }}>{question}</h6>
          <div className="body--secondary">{description}</div>
          {children}
          <div className={styles['modal-button-container']}>
            <Button
              className="button--secondary"
              fullWidth
              variant={ButtonVariant.GHOST}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="button--secondary"
              fullWidth
              variant={buttonType}
              onClick={handleConfirm}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </ParentModal>
  );
};

export { NotificationModal };
