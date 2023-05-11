import { Accordion } from '@mantine/core';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './tab.module.scss';

interface TabField extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  path: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const Tab: React.FC<TabField> = ({ title, path, icon, description }) => {
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
      {title}
      {icon}
    </NavLink>
  );
};

export { Tab };
