import { createStyles, Flex } from '@mantine/core';
import { OnfeedLogo } from '@onfeed/assets';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button, HeaderPopover, ProfileButton } from '@onfeed/components';
import { ButtonSize, ButtonVariant, ONFEED_ROUTES } from '@onfeed/helpers';
import styles from './header.module.scss';

const useStyles = createStyles((theme) => ({
  dropdown: {
    borderRadius: '24px',
    boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.1)',
    width: '200px',
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
    <Flex align="center" justify="space-between" gap="88px" p="12px 36px">
      <OnfeedLogo />
      <Flex justify="space-between" w="100%" p="0 32px 0 16px">
        <Flex gap="16px">
          <Button
            className="button--secondary"
            variant={ButtonVariant.GHOST}
            size={ButtonSize.COMPACT}
            onClick={() => navigate(`${ONFEED_ROUTES.FORM}`)}
          >
            Forms
          </Button>
          <Button
            className="button--secondary"
            variant={ButtonVariant.GHOST}
            onClick={() => navigate(ONFEED_ROUTES.FEEDBACK)}
          >
            Feedbacks
          </Button>
        </Flex>
        <HeaderPopover>
          <Button className="button--secondary" variant={ButtonVariant.PRIMARY}>
            Request feedback
          </Button>
        </HeaderPopover>
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

export { DashboardHeader };
