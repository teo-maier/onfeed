import {
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth/authentication.service';
import styles from './log-in-form.module.scss';
import { useDispatch } from 'react-redux';
import { useForm } from '@mantine/form';
import { login } from '../../redux/slices/auth-slice';
import classnames from 'classnames';
import { Button } from 'src/app/components/button/button';
import { ButtonSize, ButtonVariant } from 'src/helpers/constants/enums';

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
      .then((token) => {
        const userRole = AuthService.getRoleFromToken(token);
        if (userRole) {
          dispatch(login({ isAuthenticated: true, role: userRole }));
          navigate('/dashboard');
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
    <Flex justify={'center'} className={styles['log-in-container']}>
      <Paper shadow="sm" radius="md" p="xl" withBorder>
        <form
          onSubmit={form.onSubmit(handleLogin)}
          className={classnames(styles['form-container'])}
        >
          <Stack style={{ width: '20rem' }}>
            <TextInput
              className={classnames('caption', styles['form-input__container'])}
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              className={classnames('caption', styles['form-input__container'])}
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
              radius="md"
            />
          </Stack>

          <div className={classnames(styles['button-container'])}>
            <Button
              type="submit"
              fullWidth={true}
              size={ButtonSize.LARGE}
              variant={ButtonVariant.PRIMARY}
            >
              {'Log in'}
            </Button>
            {/* <Button type="submit" radius="xl">
                {'Login'}
              </Button> */}
          </div>
        </form>
      </Paper>
    </Flex>
  );
};

export { LogInForm };
