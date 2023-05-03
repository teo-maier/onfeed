import { createStyles, Popover } from '@mantine/core';
import { ReactComponent as Logo } from './../../../assets/onfeed-logo.svg';
import { useNavigate } from 'react-router-dom';
import {
  ButtonSize,
  ButtonVariant,
  ONFEED_ROUTES,
} from 'src/helpers/constants';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import styles from './header.module.scss';
import { Button, ProfileButton } from '@onfeed/components';

const useStyles = createStyles((theme) => ({
  dropdown: {
    borderRadius: '24px',
    boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.1)',
    width: '200px',
  },
  wrapper: {
    borderRadius: '24px',
    boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.1)',
  },
  body: {
    borderRadius: '24px',
    boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.1)',
  },
  title: {
    borderRadius: '24px',
    boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.1)',
    color: '#909090',
    marginLeft: '16px',
  },
  inner: {
    borderRadius: '24px',
    boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.1)',
    padding: '0px 16px 16px',
  },
  header: {
    borderRadius: '24px',
    boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.1)',
    border: '0px',
    display: 'flex',
    justifyontent: 'flex-start',
    padding: '16px 16px 8px 16px',
  },
}));

const DashboardHeader: React.FC = () => {
  const { classes } = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);
  const [openedFeedbackButton, setOpenedFeedbackButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className={styles['header-container']}>
      <div className={styles['actions-container']}>
        <Logo />
        <Button
          variant={ButtonVariant.GHOST}
          size={ButtonSize.COMPACT}
          onClick={() => navigate(ONFEED_ROUTES.FORM)}
        >
          Forms
        </Button>
        <Button
          variant={ButtonVariant.GHOST}
          onClick={() => navigate(ONFEED_ROUTES.FEEDBACK)}
        >
          Feedbacks
        </Button>
      </div>
      <div className={styles['actions-container']}>
        <Popover
          classNames={classes}
          opened={openedFeedbackButton}
          onClose={() => setOpenedFeedbackButton(false)}
          position="bottom"
          trapFocus={false}
        >
          <Popover.Target>
            <Button
              variant={ButtonVariant.PRIMARY}
              onClick={() => setOpenedFeedbackButton((o) => !o)}
            >
              Request feedback
            </Button>
          </Popover.Target>
          <Popover.Dropdown>{/* <FeedbackTemplates/> */}</Popover.Dropdown>
        </Popover>
        <div className={'vertical-bar'}></div>
        <div className={styles['profile-button']}>
          {/* navigate to settings on click */}
          <ProfileButton
            // employee={employeeDetails.body}
            handleClick={() => navigate(ONFEED_ROUTES.SETTINGS)}
            // drawerOpened={drawerOpened}
          />
        </div>
      </div>
    </div>
  );
};

export { DashboardHeader };
