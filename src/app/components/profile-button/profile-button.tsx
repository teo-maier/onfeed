import { ButtonVariant, getUserInitials } from '@onfeed/helpers';
import { AuthSliceState, RootState } from '@onfeed/redux';
import { MdMenu } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Avatar } from '../avatar/avatar';
import { Button } from '../button/button';
import styles from './profile-button.module.scss';

interface ProfileButtonProps {
  handleClick?: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ handleClick }) => {
  const { loggedInUser } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );
  return (
    <Button
      fullWidth
      variant={ButtonVariant.GHOST}
      onClick={() => handleClick && handleClick()}
      className={styles['user-button-container']}
    >
      <Avatar initials={loggedInUser ? getUserInitials(loggedInUser) : ''} />
      <MdMenu size={16} color="black" />
    </Button>
  );
};

export { ProfileButton };
