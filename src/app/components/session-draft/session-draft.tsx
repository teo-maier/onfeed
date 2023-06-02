import { Flex } from '@mantine/core';
import {
  ButtonSize,
  ButtonVariant,
  ONFEED_ROUTES,
  showSuccessNotification,
  SLUG_KEY,
} from '@onfeed/helpers';
import { Session, SessionRecipients } from '@onfeed/models';
import { setSessionTitle } from '@onfeed/redux';
import { sessionAPI, sessionRecipientsAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../button/button';
import styles from './session-draft.module.scss';

interface SessionDraftProps {
  session: Session;
  deleted: (value: boolean) => void;
}

const SessionDraft: React.FC<SessionDraftProps> = ({ session, deleted }) => {
  const { [SLUG_KEY]: sessionId } = useParams<{ [SLUG_KEY]: string }>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [recipients, setRecipients] = useState<SessionRecipients[]>();

  const onEditClick = () => {
    dispatch(setSessionTitle(session.title!));
    navigate(`${ONFEED_ROUTES.SESSION}/${ONFEED_ROUTES.EDIT}/${session.id}`);
  };

  const onDeleteClick = () => {
    sessionAPI.delete(session.id!).then(() => {
      deleted(true);
      navigate(`${ONFEED_ROUTES.SESSION}`);
      showSuccessNotification('Session deleted !');
    });
  };

  useEffect(() => {
    if (session.id) {
      sessionRecipientsAPI
        .getAllBySessionId(session.id)
        .then((r) => setRecipients(r));
    }
  }, [session]);

  return (
    <div
      className={classnames(styles['drawer-content-item'], {
        [styles['drawer-content-item-current']]:
          session.id?.toString() === sessionId,
      })}
    >
      <span className="caption">{session.title}</span>
      <span
        className={classnames(
          'body--secondary',
          styles['drawer-content-item-recipient']
        )}
      >
        {recipients && recipients?.length > 0
          ? `${recipients?.length} recipients selected`
          : 'No recipients selected yet'}
      </span>
      <Flex gap="16px">
        {session.id?.toString() !== sessionId && (
          <Button
            fullWidth
            className="button--secondary"
            variant={ButtonVariant.GHOST}
            size={ButtonSize.COMPACT}
            onClick={onEditClick}
          >
            Edit
          </Button>
        )}
        <Button
          fullWidth
          className="button--secondary"
          variant={
            session.id?.toString() === sessionId
              ? ButtonVariant.SECONDARY
              : ButtonVariant.GHOST
          }
          size={ButtonSize.COMPACT}
          onClick={onDeleteClick}
        >
          Delete
        </Button>
      </Flex>
    </div>
  );
};

export { SessionDraft };
