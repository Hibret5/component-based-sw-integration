import React from 'react';
import { 
  Container, Paper, Group, Avatar, Title, Text, Tabs, 
  Stack, Badge, Box, TextInput, Button, Divider, Alert 
} from '@mantine/core';
import { 
  IconUser, IconPackage, IconSettings, IconLogout, IconAlertCircle 
} from '@tabler/icons-react';

export const UserProfileUI = () => {
  // In a real integration, this would call your Auth logic to clear tokens/cookies
  const handleLogout = () => {
    console.log("User logged out");
    window.location.reload(); // Simple way to reset state for now
  };

  return (
    <Container size="md" py="xl">
      <Paper withBorder p="xl" radius="md" shadow="sm">
        {/* Header Section */}
        <Group mb="xl" justify="space-between">
          <Group>
            <Avatar size="xl" radius="xl" color="teal" variant="filled">
              ASTU
            </Avatar>
            <div>
              <Title order={2}>Student Developer</Title>
              <Text c="dimmed" size="sm">Adama Science and Technology University</Text>
            </div>
          </Group>
          <Badge color="teal" size="lg" variant="outline">Active Student</Badge>
        </Group>

        <Tabs color="teal" defaultValue="orders">
          <Tabs.List mb="md">
            <Tabs.Tab value="orders" leftSection={<IconPackage size={16} />}>
              My Orders
            </Tabs.Tab>
            <Tabs.Tab value="settings" leftSection={<IconSettings size={16} />}>
              Account Settings
            </Tabs.Tab>
          </Tabs.List>

          {/* Orders Tab */}
          <Tabs.Panel value="orders">
            <Stack gap="sm">
              <Paper withBorder p="md" radius="xs">
                <Group justify="space-between">
                  <Box>
                    <Text fw={700}>Order #9821</Text>
                    <Text size="xs" c="dimmed">Placed on May 1, 2026</Text>
                  </Box>
                  <Badge color="blue" variant="light">In Transit</Badge>
                </Group>
              </Paper>
              <Text size="sm" ta="center" c="dimmed" mt="md">
                No other recent orders found.
              </Text>
            </Stack>
          </Tabs.Panel>

          {/* Settings Tab */}
          <Tabs.Panel value="settings">
            <Stack gap="md" mt="md">
              <TextInput 
                label="Full Name" 
                placeholder="Enter your name" 
                defaultValue="Student Name" 
              />
              <TextInput 
                label="Email" 
                defaultValue="student@astu.edu.et" 
                readOnly 
                description="Email cannot be changed for academic projects"
              />
              
              <Divider my="sm" label="Danger Zone" labelPosition="center" color="red" />

              <Group grow>
                <Button 
                  leftSection={<IconLogout size={16} />} 
                  variant="outline" 
                  color="orange" 
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
                
                <Button 
                  leftSection={<IconAlertCircle size={16} />} 
                  variant="filled" 
                  color="red"
                >
                  Delete Account
                </Button>
              </Group>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Paper>

      <Alert variant="light" color="blue" title="Project Info" mt="xl" icon={<IconAlertCircle />}>
        This profile is part of the <b>Component-Based Software Integration</b> assignment. 
        Backend connectivity for the "Orders" history will be enabled tomorrow.
      </Alert>
    </Container>
  );
};