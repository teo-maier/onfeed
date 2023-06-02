import { Outlet } from 'react-router-dom';
import { SettingsSideMenu } from '../side-menu/settings-side-menu';
import styles from './settings-container.module.scss';

const SettingsContainer = () => {
  return (
    <div className={styles['settings-container']}>
      <div className={styles['settings-content-container']}>
        <SettingsSideMenu />
        <Outlet />
      </div>
    </div>
  );
};

export { SettingsContainer };
