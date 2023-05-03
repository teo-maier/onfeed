import { LogInForm } from '../log-in-form';
import styles from './log-in.module.scss';

export const LogIn = () => {
  return (
    <div className={styles['log-in-page']}>
      <LogInForm />
    </div>
  );
};
