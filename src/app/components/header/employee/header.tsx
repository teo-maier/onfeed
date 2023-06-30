import { Flex } from '@mantine/core';
import { Logo } from '@onfeed/assets';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { HeaderTab, ProfileButton } from '@onfeed/components';
import { ONFEED_ROUTES } from '@onfeed/helpers';
import { employeeAPI } from '@onfeed/services';
import { setLoggedInUser } from '@onfeed/redux';
import styles from './header.module.scss';
import { HeaderPopover } from '../../header-popover/header-popover';

const EmployeeHeader: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    employeeAPI
      .getLoggedInUser()
      .then((employee) => dispatch(setLoggedInUser(employee)));
  }, []);

  return (
    <Flex align="center" justify="space-between" gap="88px" p="12px 36px">
      <Logo />
      <Flex justify="space-between" w="100%" p="0 32px 0 16px">
        <HeaderTab path={ONFEED_ROUTES.FEEDBACK} title="Feedbacks" />
      </Flex>
      <Flex>
        <HeaderPopover>
          <ProfileButton />
        </HeaderPopover>
      </Flex>
    </Flex>
  );
};

export { EmployeeHeader };
