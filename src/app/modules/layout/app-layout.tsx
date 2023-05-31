import { AppShell, Container } from '@mantine/core';
import { AdminHeader, EmployeeHeader } from '@onfeed/components';
import { UserRole } from '@onfeed/helpers';
import { AppDispatch, AuthSliceState, RootState } from '@onfeed/redux';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { AsideSection } from './aside/aside-section';

const AppLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { role } = useSelector<RootState, AuthSliceState>(
    (state) => state.auth
  );

  const [drawerOpened, setDrawerOpened] = useState(false);

  const loading = !role;

  // useEffect(() => {
  //   dispatch(getLoggedInUserThunk());
  // }, []);

  const openDrawer = () => {
    setDrawerOpened(!drawerOpened);
  };

  return (
    <AppShell
      padding={5}
      header={
        role === UserRole.ADMIN ? (
          <AdminHeader openDrawer={openDrawer} drawerOpened={drawerOpened} />
        ) : (
          <EmployeeHeader />
        )
      }
      aside={<AsideSection drawerOpened={drawerOpened} />}
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
        mih={'calc(100vh - 108px)'}
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
