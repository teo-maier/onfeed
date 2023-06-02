import { createStyles, Flex, Popover } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import {
  ButtonSize,
  ButtonVariant,
  ONFEED_ROUTES,
  useLogout,
} from '@onfeed/helpers';
import { Session } from '@onfeed/models';
import {
  AuthSliceState,
  RootState,
  SessionSliceState,
  setAllMembers,
  setSelectedTeamMember,
  setSessionRecipients,
  setSessionTitle,
} from '@onfeed/redux';
import { sessionAPI } from '@onfeed/services';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { IoAdd, IoLogOutOutline, IoSettingsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button/button';
import styles from './header-popover.module.scss';

const useStyles = createStyles((theme) => ({
  dropdown: {
    borderRadius: '12px',
    boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.1)',
    width: '200px',
    border: 'none',
    padding: '8px',
  },
}));

interface HeaderPopoverProps {
  children?: React.ReactNode;
}
const HeaderPopover: React.FC<HeaderPopoverProps> = ({ children }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  const { logout } = useLogout({
    callback: () => {
      navigate(ONFEED_ROUTES.LOGIN);
    },
  });
  return (
    <Popover
      classNames={classes}
      opened={opened}
      position="bottom-end"
      shadow="md"
    >
      <Popover.Target>
        <div ref={ref} onClick={open}>
          {children}
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Flex direction="column" gap="8px">
          <Button
            className="button--secondary"
            fullWidth
            icon={<IoSettingsOutline />}
            variant={ButtonVariant.GHOST}
            onClick={() => navigate(`${ONFEED_ROUTES.SETTINGS}/${ONFEED_ROUTES.PROFILE}`)}
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
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};

export { HeaderPopover };
