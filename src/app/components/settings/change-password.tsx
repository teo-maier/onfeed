import {
  showErrorNotification,
  showSuccessNotification,
  showWarningNotification,
} from '@onfeed/helpers';
import { Password } from '@onfeed/models';
import { AuthSliceState, RootState } from '@onfeed/redux';
import { employeeAPI } from '@onfeed/services';
import { useSelector } from 'react-redux';
import { PasswordForm } from './password-form/password-form';

const ChangePassword = () => {
  const { loggedInUser } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );

  const handlePasswordSubmit = (password: Password) => {
    employeeAPI
      .changePassword(password)
      .then(() => showSuccessNotification('Password changed successfully!'))
      .catch(() => showErrorNotification('Could not change password!'));
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loggedInUser && (
        <PasswordForm
          formTitle="Security"
          employee={loggedInUser}
          onSubmit={handlePasswordSubmit}
        />
      )}
    </>
  );
};

export { ChangePassword };
