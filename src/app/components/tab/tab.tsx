import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './tab.module.scss';

interface TabField extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  path: string;
  text: string;
  icon?: React.ReactNode;
}

const Tab: React.FC<TabField> = ({ text, path, icon }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        classnames(
          styles['button'],
          {
            [styles['button--active']]: isActive,
            [styles['button--icon']]: icon,
          },
          ['button--secondary']
        )
      }
    >
      {text}
      {icon}
    </NavLink>
  );
};

export { Tab };
