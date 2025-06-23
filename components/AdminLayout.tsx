'use client';

import { Layout } from 'react-admin';
import { AdminAppBar } from './AdminAppBar';

export const AdminLayout = (props: any) => {
  return (
    <Layout {...props} appBar={AdminAppBar} />
  )
};

