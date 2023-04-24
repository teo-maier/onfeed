import { LogInForm } from '../log-in-form';
import styles from '../log-in-form.module.scss';

export const LogIn = () => {
  return (
    <div className={styles['log-in-page']}>
      <LogInForm />
    </div>
  );
};
