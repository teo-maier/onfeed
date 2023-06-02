import { ONFEED_ROUTES, useLogout } from '@onfeed/helpers';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const { logout } = useLogout({
    callback: () => {
      navigate(ONFEED_ROUTES.LOGIN);
    },
  });

  return <button onClick={() => logout()}>logout</button>;
};

export { Logout };
