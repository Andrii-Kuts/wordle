import type React from 'react';
import { Outlet } from 'react-router';

const AppLayout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AppLayout;
