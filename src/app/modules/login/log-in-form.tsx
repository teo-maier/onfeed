import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth/authentication.service';
import styles from './log-in-form.module.scss';
import { useDispatch } from 'react-redux';
import { useForm } from '@mantine/form';
import { login } from '../../redux/slices/auth-slice';
import classnames from 'classnames';
import { ButtonSize, ButtonVariant } from './../../../helpers/constants/enums';
import { Logo } from '@onfeed/assets';
import { ONFEED_ROUTES, UserRole } from 'src/helpers/constants';
import { Form } from '@onfeed/components';

export interface UserLoginData {
  email: string;
  password: string;
}

const LogInForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (loginValue: { email: string; password: string }) => {
    const { email, password } = loginValue;

    setLoading(true);

    AuthService.login(email, password)
      .then((response) => {
        const userRole = response.authorities[0].authority;
        if (userRole) {
          dispatch(login({ isAuthenticated: true, role: userRole }));
          if (userRole === UserRole.MANAGER) {
            navigate(ONFEED_ROUTES.SESSION);
          } else {
            navigate(ONFEED_ROUTES.FEEDBACK );
          }
        } else {
          setMessage('Invalid credentials or role');
          setLoading(false);
        }
      })
      .catch(({ response }) => {
        let errorMsg = response?.data?.error || response?.data || response;
        if (typeof errorMsg === 'object') {
          errorMsg = errorMsg.exception;
        }
        setMessage(errorMsg);
        setLoading(false);
      });
  };

  const form = useForm<UserLoginData>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  });

  return (
    // <div className={styles['log-in-container']}>
    //   <form
    //     onSubmit={form.onSubmit(handleLogin)}
    //     className={classnames(styles['form-container'])}
    //   >
    //     <Stack style={{ width: '20rem' }}>
    //       <TextInput
    //         className={classnames('caption', styles['form-input__container'])}
    //         required
    //         label="Email"
    //         placeholder="hello@mantine.dev"
    //         value={form.values.email}
    //         onChange={(event) =>
    //           form.setFieldValue('email', event.currentTarget.value)
    //         }
    //         error={form.errors.email && 'Invalid email'}
    //         radius="md"
    //       />

    //       <PasswordInput
    //         className={classnames('caption', styles['form-input__container'])}
    //         required
    //         label="Password"
    //         placeholder="Your password"
    //         value={form.values.password}
    //         onChange={(event) =>
    //           form.setFieldValue('password', event.currentTarget.value)
    //         }
    //         error={
    //           form.errors.password &&
    //           'Password should include at least 6 characters'
    //         }
    //         radius="md"
    //       />
    //     </Stack>

    //     <div className={classnames(styles['button-container'])}>
    //       <Button
    //         type="submit"
    //         fullWidth={true}
    //         size={ButtonSize.LARGE}
    //         variant={ButtonVariant.PRIMARY}
    //       >
    //         {'Log in'}
    //       </Button>
    //       {/* <Button type="submit" radius="xl">
    //             {'Login'}
    //           </Button> */}
    //     </div>
    //   </form>
    // </div>
    <>
      {message && (
        <div className={classnames('caption', styles['log-in-error'])}>
          Error: {message.toLocaleLowerCase()}!
        </div>
      )}
      <div className={styles['log-in-container']}>
        <Logo />
        <Form
          loading={loading}
          onSubmit={handleLogin}
          buttonText="Log in"
          fields={[
            {
              name: 'email',
              type: 'email',
              label: 'Email',
              placeholder: 'e.g. address@stud.ubbcluj.com',
              autoComplete: 'username',
              config: {
                required: {
                  value: true,
                  message: 'Please enter an email',
                },
              },
            },
            {
              name: 'password',
              type: 'password',
              label: 'Password',
              placeholder: 'Enter your password',
              autoComplete: 'current-password',
              config: {
                required: {
                  value: true,
                  message: 'Please enter a password',
                },
              },
            },
          ]}
          submitButtonProps={{
            fullWidth: true,
            size: ButtonSize.LARGE,
            variant: ButtonVariant.PRIMARY,
          }}
        />
      </div>
    </>
  );
};

export { LogInForm };
