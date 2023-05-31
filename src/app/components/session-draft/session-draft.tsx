import { Flex } from '@mantine/core';
import { ButtonSize, ButtonVariant, ONFEED_ROUTES } from '@onfeed/helpers';
import { Session, SessionRecipients } from '@onfeed/models';
import { setSessionTitle } from '@onfeed/redux';
import { sessionRecipientsAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button/button';
import styles from './session-draft.module.scss';

interface SessionDraftProps {
  session: Session;
}

const SessionDraft: React.FC<SessionDraftProps> = ({ session }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [recipients, setRecipients] = useState<SessionRecipients[]>();

  useEffect(() => {
    if (session.id) {
      sessionRecipientsAPI
        .getAllBySessionId(session.id)
        .then((r) => setRecipients(r));
    }
  }, [session]);

  return (
    <div className={styles['drawer-content-item']}>
      <span className="caption">{session.title}</span>
      <span
        className={classnames(
          'body--secondary',
          styles['drawer-content-item-recipient']
        )}
      >
        {recipients && recipients?.length > 0 ? `${recipients?.length} recipients selected` : 'No recipients selected yet'}
      </span>
      <Flex gap="16px">
        <Button
          fullWidth
          className="button--secondary"
          variant={ButtonVariant.GHOST}
          size={ButtonSize.COMPACT}
          onClick={() => {
            dispatch(setSessionTitle(session.title!));
            navigate(
              `${ONFEED_ROUTES.SESSION}/${ONFEED_ROUTES.EDIT}/${session.id}`
            );
          }}
        >
          Edit
        </Button>
        <Button
          fullWidth
          className="button--secondary"
          variant={ButtonVariant.GHOST}
          size={ButtonSize.COMPACT}
          onClick={() => {
            navigate(
              `${ONFEED_ROUTES.SESSION}/${ONFEED_ROUTES.EDIT}/${session.id}`
            );
          }}
        >
          Delete
        </Button>
      </Flex>
    </div>
  );
};

export { SessionDraft };
