import { createStyles, Flex } from '@mantine/core';
import { OnfeedLogo } from '@onfeed/assets';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  HeaderPopover,
  HeaderTab,
  ProfileButton,
} from '@onfeed/components';
import { ButtonSize, ButtonVariant, ONFEED_ROUTES } from '@onfeed/helpers';
import styles from './header.module.scss';
import { employeeAPI } from '@onfeed/services';
import { setLoggedInUser } from '@onfeed/redux';

const useStyles = createStyles((theme) => ({
  dropdown: {
    borderRadius: '24px',
    boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.1)',
    width: '200px',
  },
}));

const EmployeeHeader: React.FC = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    employeeAPI
      .getLoggedInUser()
      .then((employee) => dispatch(setLoggedInUser(employee)));
  }, []);

  return (
    <Flex align="center" justify="space-between" gap="88px" p="12px 36px">
      <OnfeedLogo />
      <Flex justify="space-between" w="100%" p="0 32px 0 16px">
        <HeaderTab
          path={ONFEED_ROUTES.FEEDBACK}
          title="Feedbacks"
        />
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

export { EmployeeHeader };
