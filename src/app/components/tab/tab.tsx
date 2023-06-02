import { setDefaultQuestion, setQuestionsOnEditMode } from '@onfeed/redux';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './tab.module.scss';

interface TabField extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  path: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const Tab: React.FC<TabField> = ({ title, path, icon, description }) => {
  const dispatch = useDispatch();

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
      onClick={() => {
        dispatch(setQuestionsOnEditMode([]));
        dispatch(setDefaultQuestion());
      }}
    >
      {title}
      {icon}
    </NavLink>
  );
};

export { Tab };
