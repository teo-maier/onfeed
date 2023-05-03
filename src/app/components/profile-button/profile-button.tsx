import { ButtonVariant } from '@onfeed/helpers';
import { MdMenu, MdMenuOpen } from 'react-icons/md';
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
      <Avatar
        initials={'TM'}
        src={
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.newsweek.com%2Favatar-2-way-water-release-date-cast-trailer-plot-1701713&psig=AOvVaw0aKvd2ry3-h1dLiIyhndvr&ust=1683217108743000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIi1-MDG2f4CFQAAAAAdAAAAABAR'
          //   employee?.avatarImage
          //     ? encodeImage(employee.avatarImage, employee.contentType)
          //     : ''
        }
      />
      {drawerOpened ? (
        <MdMenuOpen
          size={16}
          color="black"
          style={{ transform: 'rotate(180deg)' }}
        />
      ) : (
        <MdMenu size={16} color="black" />
      )}
    </Button>
  );
};

export { ProfileButton };
