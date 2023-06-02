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

  return (
    <div className={styles['form-container']}>
      <div className={styles['form-content']}>
        {loggedInUser ? (
          <MyProfileForm
            formTitle="My profile"
            subTitle={'Account details'}
            employee={loggedInUser}
            onSubmit={(e: Employee) => employeeAPI.edit(e)}
          />
        ) : null}
      </div>
    </div>
  );
};

export { MyProfile };
