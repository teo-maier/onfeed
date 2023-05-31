import { ButtonSize } from '@onfeed/helpers';
import { setDefaultQuestion, setQuestionsOnEditMode } from '@onfeed/redux';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './header-tab.module.scss';

interface TabField extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  path: string;
  title: string;
  size?: ButtonSize;
}

const HeaderTab: React.FC<TabField> = ({
  title,
  path,
  size = ButtonSize.COMPACT,
}) => {
  const dispatch = useDispatch();
  
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        classnames(styles['button'], styles[`button--${size.toLowerCase()}`], {
          [styles['button--active']]: isActive,
        })
      }
      onClick={() => {
        dispatch(setQuestionsOnEditMode([]));
        dispatch(setDefaultQuestion());
      }}
    >
      {title}
    </NavLink>
  );
};

export { HeaderTab };
