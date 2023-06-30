import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ONFEED_ROUTES } from '../helpers/constants/routes';
import { LogIn } from '../app/modules/login/page/log-in';
import { AuthSliceState } from '../app/redux/slices/auth-slice';
import { RootState } from '../app/redux/store';
import { AuthService } from '../app/services/auth/authentication.service';
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
import {
  ChangePassword,
  FeedbackStepper,
  MyProfile,
  SettingsContainer,
} from '@onfeed/components';
import { UserRole } from '@onfeed/helpers';

export const OnfeedRoutes = () => {
  const { isAuthenticated, role } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );

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
        {role === UserRole.MANAGER ? (
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={<Navigate to={ONFEED_ROUTES.SESSION} replace />}
            />
            <Route
              path={`${ONFEED_ROUTES.SESSION}`}
              element={<FeedbackPageAdmin />}
            />
            <Route
              path={`${ONFEED_ROUTES.SETTINGS}/*`}
              element={<h3>Setting page</h3>}
            />
            <Route path="*" element={<h3>Not found page</h3>} />
            <Route
              path={`${ONFEED_ROUTES.SESSION}/${ONFEED_ROUTES.NEW}`}
              element={<CreateFeedback />}
            />
            <Route
              path={`${ONFEED_ROUTES.SESSION}/${ONFEED_ROUTES.NEW}/${ONFEED_ROUTES.SLUG}`}
              element={<FeedbackStepper />}
            />
            <Route
              path={`${ONFEED_ROUTES.SESSION}/${ONFEED_ROUTES.EDIT}/${ONFEED_ROUTES.SLUG}`}
              element={<FeedbackStepper />}
            />
            <Route
              path={`${ONFEED_ROUTES.SESSION}/${ONFEED_ROUTES.VIEW}/${ONFEED_ROUTES.SLUG}`}
              element={<ViewFeedbackAdmin />}
            />
            <Route path={`${ONFEED_ROUTES.FORM}`} element={<ViewForm />}>
              <Route
                path={`${ONFEED_ROUTES.VIEW}/${ONFEED_ROUTES.SLUG}`}
                element={<ViewFormDetails />}
              />
            </Route>
            <Route
              path={`${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.NEW}`}
              element={<CreateForm />}
            />
            <Route
              path={`${ONFEED_ROUTES.FORM}/${ONFEED_ROUTES.EDIT}/${ONFEED_ROUTES.SLUG}`}
              element={<CreateForm />}
            />
            <Route
              path={ONFEED_ROUTES.SETTINGS}
              element={<SettingsContainer />}
            >
              <Route
                path={`${ONFEED_ROUTES.PROFILE}`}
                element={<MyProfile />}
              />
              <Route
                path={`${ONFEED_ROUTES.SECURITY}`}
                element={<ChangePassword />}
              />
            </Route>
          </Route>
        ) : (
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={<Navigate to={ONFEED_ROUTES.FEEDBACK} replace />}
            />
            <Route
              path={`${ONFEED_ROUTES.SETTINGS}/*`}
              element={<h3>Setting page</h3>}
            />
            <Route path="*" element={<h3>Not found page</h3>} />
            <Route
              path={`${ONFEED_ROUTES.FEEDBACK}`}
              element={<FeedbackPageEmployee />}
            />
            <Route
              path={`${ONFEED_ROUTES.FEEDBACK}/${ONFEED_ROUTES.NEW}/${ONFEED_ROUTES.SLUG}`}
              element={<AnswerFeedback />}
            />
            <Route
              path={`${ONFEED_ROUTES.FEEDBACK}/${ONFEED_ROUTES.VIEW}/${ONFEED_ROUTES.SLUG}`}
              element={<ViewFeedbackEmployee />}
            />
            <Route
              path={ONFEED_ROUTES.SETTINGS}
              element={<SettingsContainer />}
            >
              <Route
                path={`${ONFEED_ROUTES.PROFILE}`}
                element={<MyProfile />}
              />
              <Route
                path={`${ONFEED_ROUTES.SECURITY}`}
                element={<ChangePassword />}
              />
            </Route>
          </Route>
        )}
      </Route>
      {/* Public routes */}
      <Route path={`${ONFEED_ROUTES.LOGIN}/*`} element={<LogIn />} />
      <Route path={`${ONFEED_ROUTES.LOGOUT}/*`} element={<Logout />} />
      <Route path="*" element={<h3>Not found page</h3>} />
    </Routes>
  );
};
