import { ONFEED_ROUTES } from '@onfeed/helpers';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type GuardFunction = () => boolean;

interface PrivateRouteProps {
  guards?: Array<GuardFunction>;
  redirectOnInvalid?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  guards,
  redirectOnInvalid,
}) => {
  const [loading, setLoading] = useState(true);

  const canActivate = !guards?.length
    ? true
    : guards.every((guard) => guard() === true);

  useEffect(() => {
    setLoading(false);
  }, [canActivate]);

  if (loading) {
    return null;
  }

  return canActivate ? (
    <Outlet />
  ) : (
    <Navigate to={redirectOnInvalid || ONFEED_ROUTES.UNAUTHORIZED} replace />
  );
};

export { PrivateRoute };
