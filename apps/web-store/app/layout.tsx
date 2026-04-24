import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';

// 1. Metadata stays here (Server Side)
export const metadata = {
  title: 'Fashion Store',
  description: 'Shien-style Women Store',
};

// 2. Optional: Define your brand theme here
const theme = createTheme({
  /* You can add Her's Bonda specific colors here later */
  primaryColor: 'pink', 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 3. ColorSchemeScript MUST be before any other scripts to prevent flashing */}
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        {/* 4. Wrap everything in the provider */}
        <MantineProvider theme={theme} defaultColorScheme="auto">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}