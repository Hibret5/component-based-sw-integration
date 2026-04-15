'use client';
import { 
  MantineProvider, 
  Container, 
  Title, 
  Text, 
  Tabs, 
  Paper, 
  Box, 
  Stack, 
  Badge,
  createTheme
} from '@mantine/core';
// Import CSS so the styles actually work!
import '@mantine/core/styles.css'; 

import { 
  Footer, 
  SocialIcons, 
  AboutSection, 
  Logo, 
  ContactSection 
} from '@fashion/ui';

const theme = createTheme({
  primaryColor: 'teal',
});

export default function ComponentDemo() {
  return (
    <MantineProvider theme={theme}>
      {/* We use a specific background color to make the components "pop" */}
      <Box bg="gray.0" minHeight="100vh" py={40}>
        <Container size="lg">
          <Stack gap="xs" mb={40}>
            <Badge color="teal" variant="filled">Component Library</Badge>
            <Title order={1} c="teal.9" style={{ fontSize: '2.5rem' }}>
              Integrated Component Gallery
            </Title>
            <Text c="dimmed" size="lg">
              Individual modules running independently from the main store logic.
            </Text>
          </Stack>

          <Tabs defaultValue="socials" color="teal" variant="pills">
            <Tabs.List mb="xl">
              <Tabs.Tab value="socials">1. Social Icons</Tabs.Tab>
              <Tabs.Tab value="about">2. About Section</Tabs.Tab>
              <Tabs.Tab value="contact">3. Contact Form</Tabs.Tab>
              <Tabs.Tab value="footer">4. Global Footer</Tabs.Tab>
            </Tabs.List>

            {/* Tab: Social Icons */}
            <Tabs.Panel value="socials">
              <Paper withBorder p="xl" radius="md" shadow="sm">
                <Text fw={700} mb="xs">Social Media Integration Component</Text>
                <Text size="sm" c="dimmed" mb="xl">Uses Tabler Icons and official brand hex codes.</Text>
                <Box p="xl" bg="white" style={{ border: '1px dashed #20c997', borderRadius: '8px' }}>
                   <SocialIcons />
                </Box>
              </Paper>
            </Tabs.Panel>

            {/* Tab: About */}
            <Tabs.Panel value="about">
              <Paper withBorder p={0} radius="md" shadow="sm" style={{ overflow: 'hidden' }}>
                <Box p="md" bg="teal.0"><Text fw={700}>Full-Width About Section</Text></Box>
                <AboutSection />
              </Paper>
            </Tabs.Panel>

            {/* Tab: Contact */}
            <Tabs.Panel value="contact">
              <Paper withBorder p="xl" radius="md" shadow="sm">
                <ContactSection />
              </Paper>
            </Tabs.Panel>

            {/* Tab: Footer */}
            <Tabs.Panel value="footer">
              <Paper withBorder p={0} radius="md" shadow="sm">
                <Footer onNavigate={(v) => console.log(v)} />
              </Paper>
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Box>
    </MantineProvider>
  );
}