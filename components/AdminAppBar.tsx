'use client';

import { AppBar, TitlePortal } from 'react-admin';
import { Typography, Box } from '@mui/material';
import { SignOutButton } from './SignOutButton';

{/* eslint-disable  @typescript-eslint/no-explicit-any */ }
export const AdminAppBar = (props: any) => {
  return (
    <AppBar
      {...props}
      sx={{
        backgroundColor: "#77b267"
      }}
    >
      <TitlePortal />
      <Typography flex="1" variant="h6" color="inherit" id="react-admin-title" />
      <Box mr={2}>
        <SignOutButton />
      </Box>
    </AppBar>
  );
};

