import { Aside, Flex, ScrollArea } from '@mantine/core';
import { Button, Drawer, SessionDraft } from '@onfeed/components';
import {
  ButtonSize,
  ButtonVariant,
  ONFEED_ROUTES,
  useLogout,
} from '@onfeed/helpers';
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
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const handleDeletedDraft = (value: boolean) => {
    setIsDeleted(value);
  };

  useEffect(() => {
    if (loggedInUser) {
      sessionAPI.getAllDrafts(loggedInUser?.id).then((drafts) => {
        setAllDrafts(drafts);
        setIsDeleted(false);
      });
    }
  }, [loggedInUser, allSessions, isDeleted]);



  return (
    <Aside.Section>
      <Drawer topOffset={64 + 8} drawerOpened={drawerOpened}>
        <div className={styles['drawer-container']}>
          <div className={styles['drawer-content-container']}>
            <h5 style={{ margin: '0px' }}>Drafts</h5>
            <div className={styles['drawer-content']}>
              <ScrollArea h="100%" scrollbarSize={8}>
                <div className={styles['drawer-content-list']}>
                  {allDrafts && allDrafts?.length > 0 ? (
                    allDrafts.map((session) => (
                      <SessionDraft
                        session={session}
                        deleted={handleDeletedDraft}
                      />
                    ))
                  ) : (
                    <div
                      className={classnames(
                        'button--secondary',
                        styles['empty-state']
                      )}
                    >
                      No drafts created yet
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </Drawer>
    </Aside.Section>
  );
};

export { AsideSection };
