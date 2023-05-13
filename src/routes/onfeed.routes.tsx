import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ONFEED_ROUTES } from '../helpers/constants/routes';
import { LogIn } from '../app/modules/login/page/log-in';
import { AuthSliceState } from '../app/redux/slices/auth-slice';
import { RootState } from '../app/redux/store';
import { AuthService } from '../app/services/auth/authentication.service';
import { Dashboard } from 'src/app/modules/dashboard/dashboard';
import { PrivateRoute } from './private.route';
import {
  AppLayout,
  FeedbackPage,
  CreateForm,
  ViewForm,
  ViewFormDetails,
  CreateFeedback,
} from '@onfeed/modules';

export const OnfeedRoutes = () => {
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
      {/* Private routes */}
      <Route
        path="/"
        element={
          <PrivateRoute
            guards={[() => isAuthenticated]}
            redirectOnInvalid={`${ONFEED_ROUTES.LOGIN}`}
          />
        }
      >
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={<Navigate to={ONFEED_ROUTES.DASHBOARD} replace />}
          />
          <Route path={`${ONFEED_ROUTES.DASHBOARD}`} element={<Dashboard />} />

          <Route path={`${ONFEED_ROUTES.FORM}`} element={<ViewForm />}>
            {/* <Route
              index
              element={
                <Navigate
                  to={`${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.VIEW}/${ONFEED_ROUTES.SLUG}`}
                  replace
                />
              }
            /> */}
            <Route
              path={`${ONFEED_ROUTES.VIEW}/${ONFEED_ROUTES.SLUG}`}
              element={<ViewFormDetails />}
            />
          </Route>
          <Route
            path={`${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.EDIT}/${ONFEED_ROUTES.SLUG}`}
            element={<CreateForm />}
          />
          <Route
            path={`${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.NEW}`}
            element={<CreateForm />}
          />

          <Route
            path={`${ONFEED_ROUTES.FEEDBACK}/*`}
            element={<FeedbackPage />}
          />
          <Route
            path={`${ONFEED_ROUTES.FEEDBACK}/${ONFEED_ROUTES.NEW}`}
            element={<CreateFeedback />}
          />
          <Route
            path={`${ONFEED_ROUTES.SETTINGS}/*`}
            element={<h3>Setting page</h3>}
          />
          <Route path="*" element={<h3>Not found page</h3>} />
        </Route>
      </Route>
      {/* Public routes */}
      <Route path={`${ONFEED_ROUTES.LOGIN}/*`} element={<LogIn />} />
      <Route
        path={`${ONFEED_ROUTES.LOGOUT}/*`}
        element={<h3>Logout page</h3>}
      />
      <Route path="*" element={<h3>Not found page</h3>} />
    </Routes>
  );
};
