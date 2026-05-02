'use client';

import { Alert, Button, Container, Group, Title } from '@mantine/core';
import Link from 'next/link';
import { useStore } from '@fashion/logic';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const { user } = useStore();
  const isAdmin = user?.role === 'admin';

  if (!isAdmin) {
    return (
      <Container size="md" py="xl">
        <Group justify="space-between" mb="md">
          <Title order={2}>Admin</Title>
          <Button component={Link} href="/" variant="light" color="teal">
            Back to store
          </Button>
        </Group>
        <Alert color="red" title="Access denied">
          Log in with an admin account (use `admin@store.com`) to access the dashboard.
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <AdminDashboard />
    </Container>
  );
}

