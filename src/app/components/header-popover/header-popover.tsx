import { createStyles, Flex, Popover } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { ButtonSize, ButtonVariant, ONFEED_ROUTES } from '@onfeed/helpers';
import { setAllMembers, setSelectedTeamMember, setSessionRecipients } from '@onfeed/redux';
import { IoAdd } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button/button';
import styles from './header-popover.module.scss';

const useStyles = createStyles((theme) => ({
  dropdown: {
    borderRadius: '12px',
    boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.1)',
    width: '200px',
    border: 'none',
    padding: '16px',
  },
}));

interface HeaderPopoverProps {
  children?: React.ReactNode;
}
const HeaderPopover: React.FC<HeaderPopoverProps> = ({ children }) => {
  const { classes } = useStyles();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  const sessionsMock = [
    {
      title: 'Draft 1',
    },
    {
      title: 'Pentru CDH',
    },
  ];

  return (
    <Popover
      classNames={classes}
      opened={opened}
      trapFocus
      position="bottom-end"
      shadow="md"
    >
      <Popover.Target>
        <div ref={ref} onClick={open}>
          {children}
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Flex direction="column" gap="16px">
          {sessionsMock.map((session) => (
            <Button
              fullWidth
              className="button--secondary"
              variant={ButtonVariant.GHOST}
              size={ButtonSize.COMPACT}
              // DRAFT
              // change to navigate to create feedback teams first step
              onClick={() => console.log(session.title)}
              style={{ justifyContent: 'flex-start' }}
            >
              {session.title}
            </Button>
          ))}
          <div className="horizontal-bar" style={{ margin: '0' }}></div>
          <Button
            className="button--secondary"
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.COMPACT}
            // change to navigate to create feedback teams first step
            onClick={() => {
              dispatch(setAllMembers([]));
              dispatch(setSessionRecipients([]));
              navigate(`${ONFEED_ROUTES.FEEDBACK}/${ONFEED_ROUTES.NEW}`);
            }}
            icon={<IoAdd />}
          >
            New feedback
          </Button>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};

export { HeaderPopover };
