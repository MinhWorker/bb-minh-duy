'use client';

import { Layout } from 'react-admin';
import { AdminAppBar } from './AdminAppBar';

{/* eslint-disable  @typescript-eslint/no-explicit-any */ }
export const AdminLayout = (props: any) => {
  return (
    <Layout {...props} appBar={AdminAppBar} />
  )
};

