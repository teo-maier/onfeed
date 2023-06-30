import { showErrorNotification, showSuccessNotification } from '@onfeed/helpers';
import { Employee } from '@onfeed/models';
import { AuthSliceState, RootState } from '@onfeed/redux';
import { employeeAPI } from '@onfeed/services';
import { useSelector } from 'react-redux';
import { MyProfileForm } from '../my-profile-form/my-profile-form';
import styles from './my-profile.module.scss';

const MyProfile = () => {
  const { loggedInUser } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );

  const handleOnSubmit = (employee: Employee) => {
    employeeAPI
    .edit(employee)
    .then(() => showSuccessNotification('Details changed successfully!'))
    .catch(() => showErrorNotification('Could not update details!'));
  }

  return (
    <div className={styles['form-container']}>
      <div className={styles['form-content']}>
        {loggedInUser ? (
          <MyProfileForm
            formTitle="My profile"
            subTitle={'Account details'}
            employee={loggedInUser}
            onSubmit={handleOnSubmit}
          />
        ) : null}
      </div>
    </div>
  );
};

export { MyProfile };
