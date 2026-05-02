import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript } from '@mantine/core';
import Providers from './providers';

export const metadata = {
  title: 'Fashion storefront',
  description: 'Component-based storefront demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
