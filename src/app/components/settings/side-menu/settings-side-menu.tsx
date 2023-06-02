import { ONFEED_ROUTES } from '@onfeed/helpers';
import { Tab } from '../../tab/tab';
import styles from './settings-side-menu.module.scss';

const SettingsSideMenu: React.FC = () => {
  const settingsRoutes = [
    {
      text: 'My Profile',
      path: ONFEED_ROUTES.PROFILE,
    },
    {
      text: 'Security',
      path: ONFEED_ROUTES.SECURITY,
    },
  ];

  return (
    <div className={styles['settings-side-menu']}>
      {settingsRoutes.map(({ text, path }) => (
        <Tab key={path} title={text} path={path} />
      ))}
    </div>
  );
};

export { SettingsSideMenu };
