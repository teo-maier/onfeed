import { ButtonVariant } from '@onfeed/helpers';
import { MdMenu } from 'react-icons/md';
import { Avatar } from '../avatar/avatar';
import { Button } from '../button/button';
import styles from './profile-button.module.scss';

interface ProfileButtonProps {
  //   employee:  Employee;
  handleClick?: () => void;
  drawerOpened?: boolean;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  //   employee,
  handleClick,
  drawerOpened,
}) => {
  return (
    <Button
      fullWidth
      variant={ButtonVariant.GHOST}
      onClick={() => handleClick && handleClick()}
      className={styles['user-button-container']}
    >
      <Avatar initials={'TM'} />
      <MdMenu size={16} color="black" />
    </Button>
  );
};

export { ProfileButton };
