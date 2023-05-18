import { apiSlice, logout } from '@onfeed/redux';
import { AuthService } from '@onfeed/services';
import { useDispatch } from 'react-redux';

interface LogoutHookArguments {
  callback?: () => void;
}

export const useLogout = ({ callback }: LogoutHookArguments) => {
  const dispatch = useDispatch();

  /**
   * Main logout handler
   */
  const doLogout = () => {
    AuthService.logout();
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
    if (callback) {
      callback();
    }
  };

  return { logout: doLogout };
};
