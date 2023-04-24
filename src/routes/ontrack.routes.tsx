import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ONFEED_ROUTES } from '../helpers/constants/routes';
import { LogIn } from '../app/modules/login/page/log-in';
import { AuthSliceState } from '../app/redux/slices/auth-slice';
import { RootState } from '../app/redux/store';
import { AuthService } from '../app/services/auth/authentication.service';

export const OntrackRoutes = () => {
  const { isAuthenticated, role } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );

  const getDashboard = () => {
    switch (role) {
      // case UserRole.EMPLOYEE: {
      // 	return <DashboardEmployee />;
      // }
      default: {
        return null;
      }
    }
  };

  return (
    <Routes>
      {/* Public paths */}
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? ONFEED_ROUTES.DASHBOARD : ONFEED_ROUTES.LOGIN}
          />
        }
      />

      <Route
        path={ONFEED_ROUTES.LOGIN}
        element={
          isAuthenticated ? (
            <Navigate to={ONFEED_ROUTES.DASHBOARD} />
          ) : (
            <LogIn />
          )
        }
      />
      <Route
        path={ONFEED_ROUTES.UNAUTHORIZED}
        element={<h1>Unauthorized</h1>}
      />
      <Route
        path={ONFEED_ROUTES.NOT_FOUND}
        element={<h1>404 | Not found</h1>}
      />
    </Routes>
  );
};
