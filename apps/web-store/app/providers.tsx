'use client';

import { createTheme, MantineProvider } from '@mantine/core';
import React from 'react';

const theme = createTheme({
  primaryColor: 'teal',
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      {children}
    </MantineProvider>
  );
}
