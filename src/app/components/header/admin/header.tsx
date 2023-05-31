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

interface AdminHeaderProps {
  openDrawer: () => void;
  drawerOpened: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  openDrawer,
  drawerOpened,
}) => {
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
          <Button className="button--secondary" variant={ButtonVariant.PRIMARY}>
            Create session
          </Button>
        </Flex>
      </Flex>
      <Flex>
        {/* navigate to settings on click */}
        <ProfileButton
          // employee={employeeDetails.body}
          handleClick={() => navigate(ONFEED_ROUTES.SETTINGS)}
          // drawerOpened={drawerOpened}
        />
      </Flex>
    </Flex>
  );
};

export { AdminHeader };
