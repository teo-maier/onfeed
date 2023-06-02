import { Flex } from '@mantine/core';
import { OnfeedLogo } from '@onfeed/assets';
import { useNavigate } from 'react-router-dom';
import { Button, HeaderTab, ProfileButton } from '@onfeed/components';
import { ButtonVariant, ONFEED_ROUTES } from '@onfeed/helpers';
import { useEffect } from 'react';
import { employeeAPI } from '@onfeed/services';
import { AuthSliceState, RootState, setLoggedInUser } from '@onfeed/redux';
import { useDispatch, useSelector } from 'react-redux';
import styles from './header.module.scss';
import { HeaderPopover } from '../../header-popover/header-popover';

interface AdminHeaderProps {
  openDrawer: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ openDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );

  useEffect(() => {
    employeeAPI
      .getLoggedInUser()
      .then((employee) => dispatch(setLoggedInUser(employee)));
  }, [isAuthenticated]);

  return (
    <Flex align="center" justify="space-between" gap="88px" p="12px 36px">
      <OnfeedLogo />
      <Flex justify="space-between" w="100%" p="0 32px 0 16px">
        <Flex gap="24px">
          <HeaderTab path={ONFEED_ROUTES.FORM} title="Forms" />
          <HeaderTab path={ONFEED_ROUTES.SESSION} title="Sessions" />
        </Flex>
        <Flex gap="24px">
          <Button
            className="button--secondary"
            variant={ButtonVariant.SECONDARY}
            onClick={() => openDrawer()}
          >
            Drafts
          </Button>
          <Button
            className="button--secondary"
            variant={ButtonVariant.PRIMARY}
            onClick={() => {
              navigate(`${ONFEED_ROUTES.SESSION}/${ONFEED_ROUTES.NEW}`);
            }}
          >
            Create session
          </Button>
        </Flex>
      </Flex>
      <Flex>
        <HeaderPopover>
          <ProfileButton />
        </HeaderPopover>
      </Flex>
    </Flex>
  );
};

export { AdminHeader };
