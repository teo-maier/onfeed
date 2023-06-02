import { AuthSliceState, RootState } from '@onfeed/redux';
import { employeeAPI } from '@onfeed/services';
import { useSelector } from 'react-redux';
import { PasswordForm } from './password-form/password-form';

// how do you handle errors and show err messages ?
const ChangePassword = () => {
  const { loggedInUser } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loggedInUser && (
        <PasswordForm
          formTitle="Security"
          employee={loggedInUser}
          onSubmit={(password) => employeeAPI.changePassword(password)}
        />
      )}
    </>
  );
};

export { ChangePassword };
