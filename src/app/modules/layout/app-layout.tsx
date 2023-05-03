import { AppShell, Container, Loader, LoadingOverlay } from '@mantine/core';
import { AppDispatch, AuthSliceState, RootState } from '@onfeed/redux';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from '../../components/header/header';

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
      // navbar={<SideNav routesTop={routes.top} routesBottom={routes.bottom} />}
      header={<DashboardHeader />}
      styles={() => ({
        main: { maxHeight: 'calc(100vh - 54px)', overflow: 'hidden' },
      })}
    >
      <Container
        bg="appBackground.0"
        mt="64px"
        mah={'calc(100vh - 54px)'}
        maw="none"
        mx={0}
        p={0}
        style={{ overflow: 'auto' }}
      >
        {/* <LoadingOverlay visible={loading} loader={<Loader variant="dots" />} /> */}
        {/* {!loading && <Outlet />} */}
        <Outlet />
      </Container>
    </AppShell>
  );
};

export { AppLayout };
