import { Aside, Flex, ScrollArea } from '@mantine/core';
import { Button, Drawer, SessionDraft } from '@onfeed/components';
import { ButtonSize, ButtonVariant, ONFEED_ROUTES } from '@onfeed/helpers';
import { Session } from '@onfeed/models';
import {
  AuthSliceState,
  logout,
  RootState,
  SessionSliceState,
  setSessionTitle,
} from '@onfeed/redux';
import { sessionAPI, sessionRecipientsAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { IoLogOutOutline, IoSettingsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './aside-section.module.scss';

interface AsideSectionProps {
  drawerOpened: boolean;
}

const AsideSection: React.FC<AsideSectionProps> = ({ drawerOpened }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedInUser } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );

  const { allSessions } = useSelector<RootState, SessionSliceState>(
    (state) => state.session
  );

  const [allDrafts, setAllDrafts] = useState<Session[]>();

  useEffect(() => {
    if (loggedInUser) {
      sessionAPI.getAllDrafts(loggedInUser?.id).then((drafts) => {
        setAllDrafts(drafts);
      });
    }
  }, [loggedInUser, allSessions]);

  return (
    <Aside.Section>
      <Drawer topOffset={64 + 8} drawerOpened={drawerOpened}>
        <div className={styles['drawer-container']}>
          <div className={styles['drawer-content-container']}>
            <h5 style={{ margin: '0px' }}>Drafts</h5>
            <div className={styles['drawer-content']}>
              <ScrollArea h="100%" scrollbarSize={8}>
                <div className={styles['drawer-content-list']}>
                  {allDrafts ? (
                    allDrafts.map((session) => (
                      <SessionDraft session={session} />
                    ))
                  ) : (
                    <div
                      className={classnames(
                        'button--secondary',
                        styles['empty-state']
                      )}
                    >
                      No drafts
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className={styles['button-container']}>
            <Button
              className="button--secondary"
              fullWidth
              icon={<IoSettingsOutline />}
              variant={ButtonVariant.GHOST}
              onClick={() => navigate(ONFEED_ROUTES.SETTINGS)}
            >
              Settings
            </Button>
            <Button
              className="button--secondary"
              fullWidth
              icon={<IoLogOutOutline />}
              variant={ButtonVariant.GHOST}
              onClick={() => logout()}
            >
              Log out
            </Button>
          </div>
        </div>
      </Drawer>
    </Aside.Section>
  );
};

export { AsideSection };
