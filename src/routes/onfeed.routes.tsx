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
  CreateForm,
  ViewForm,
  ViewFormDetails,
  CreateFeedback,
  Logout,
  FeedbackPageAdmin,
  FeedbackPageEmployee,
  ViewFeedbackEmployee,
  AnswerFeedback,
  ViewFeedbackAdmin,
} from '@onfeed/modules';
import { FeedbackStepper } from '@onfeed/components';
import { UserRole } from '@onfeed/helpers';

export const OnfeedRoutes = () => {
  const { isAuthenticated, role } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );

  const getDashboard = () => {
    switch (role) {
      case UserRole.EMPLOYEE: {
        return <FeedbackPageEmployee />;
      }
      case UserRole.ADMIN: {
        return <FeedbackPageAdmin />;
      }
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
            guards={[AuthService.isAuthenticated]}
            redirectOnInvalid={`${ONFEED_ROUTES.LOGIN}`}
          />
        }
      >
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={<Navigate to={ONFEED_ROUTES.FEEDBACK} replace />}
          />
          <Route path={`${ONFEED_ROUTES.FEEDBACK}`} element={getDashboard()} />
          <Route
            path={`${ONFEED_ROUTES.SETTINGS}/*`}
            element={<h3>Setting page</h3>}
          />
          <Route path="*" element={<h3>Not found page</h3>} />
          <Route
            path={`${ONFEED_ROUTES.FEEDBACK}/${ONFEED_ROUTES.NEW}/${ONFEED_ROUTES.SLUG}`}
            element={
              role === UserRole.EMPLOYEE ? (
                <AnswerFeedback />
              ) : (
                <FeedbackStepper />
              )
            }
          />
          <Route
            path={`${ONFEED_ROUTES.FEEDBACK}/${ONFEED_ROUTES.VIEW}/${ONFEED_ROUTES.SLUG}`}
            element={
              role === UserRole.EMPLOYEE ? (
                <ViewFeedbackEmployee />
              ) : (
                <ViewFeedbackAdmin />
              )
            }
          />
          <Route
            element={
              <PrivateRoute
                guards={[
                  () => AuthService.checkRolePermission([UserRole.ADMIN]),
                ]}
                redirectOnInvalid={ONFEED_ROUTES.SETTINGS}
              />
            }
          >
            <Route
              path={`${ONFEED_ROUTES.FEEDBACK}/${ONFEED_ROUTES.NEW}`}
              element={<CreateFeedback />}
            />
            {/* <Route
              path={`${ONFEED_ROUTES.FEEDBACK}/${ONFEED_ROUTES.NEW}/${ONFEED_ROUTES.SLUG}`}
              element={<FeedbackStepper />}
            /> */}
            {/* <Route
              path={`${ONFEED_ROUTES.FEEDBACK}/${ONFEED_ROUTES.VIEW}/${ONFEED_ROUTES.SLUG}`}
              element={<ViewFeedbackAdmin />}
            /> */}

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
          </Route>
        </Route>
      </Route>
      {/* Public routes */}
      <Route path={`${ONFEED_ROUTES.LOGIN}/*`} element={<LogIn />} />
      <Route path={`${ONFEED_ROUTES.LOGOUT}/*`} element={<Logout />} />
      <Route path="*" element={<h3>Not found page</h3>} />
    </Routes>
  );
};
