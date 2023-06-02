// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { OnfeedRoutes } from '../routes/onfeed.routes';
import styles from './app.module.scss';
import { setAuthenticated, setRole } from './redux/slices/auth-slice';
import { AuthService } from './services/auth/authentication.service';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRole(AuthService.getRoleFromToken()));
    dispatch(setAuthenticated(AuthService.isAuthenticated()));
  }, []);

  return (
    // <div className={styles['app-wrapper']}>
      <OnfeedRoutes />
    // </div>
  );
}

export default App;
