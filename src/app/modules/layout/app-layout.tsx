import {
  AppShell,
  Container,
} from '@mantine/core';
import { AdminHeader, EmployeeHeader } from '@onfeed/components';
import { UserRole } from '@onfeed/helpers';
import { AppDispatch, AuthSliceState, RootState } from '@onfeed/redux';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { role } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );

  const loading = !role;

  // useEffect(() => {
  //   dispatch(getLoggedInUserThunk());
  // }, []);

  return (
    <AppShell
      padding={5}
      header={role === UserRole.ADMIN ? <AdminHeader /> : <EmployeeHeader/>}
      // aside={<Aside.Section component={ScrollArea}  mx="-xs" px="xs">mda</Aside.Section>}
      styles={() => ({
        main: {
          overflow: 'auto',
          maxHeight: 'calc(100vh - 74px)',
          minHeight: 'calc(100vh - 74px)',
        },
      })}
    >
      <Container
        mt="64px"
        mah={'calc(100vh - 54px)'}
        maw="none"
        mx={0}
        p={0}
        style={{ marginTop: '24px' }}
      >
        {/* <LoadingOverlay visible={loading} loader={<Loader variant="dots" />} /> */}
        {/* {!loading && <Outlet />} */}
        <Outlet />
      </Container>
    </AppShell>
  );
};

export { AppLayout };
