'use client';

import { Container, Title, Text, Stack, Paper, Button } from '@mantine/core';
import { useStore } from '@fashion/logic';

export default function ProfilePage() {
  const { user, setView, logout } = useStore();

  return (
    <Container size="sm" py="xl">
      <Paper withBorder radius="md" p="xl">
        <Stack gap="md">
          <Title order={2}>Profile</Title>

          {user ? (
            <>
              <Text>Welcome, {user.name}</Text>
              <Button variant="outline" color="teal" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Text c="dimmed">You are not logged in.</Text>
              <Button color="teal" onClick={() => setView('login')}>
                Go to Login
              </Button>
            </>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}