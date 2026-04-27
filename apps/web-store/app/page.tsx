'use client';
import { 
  AppShell, Container, Group, Indicator, ActionIcon, 
  Button, Paper, Box, SimpleGrid, Title, Text, Stack, Center,
  Divider, 
  useMantineColorScheme, useComputedColorScheme 
} from '@mantine/core';
import { IconSun, IconMoon, IconShoppingCart } from '@tabler/icons-react';
import { ProductCard, Logo, AuthForm, Footer, AboutSection, ContactSection } from '@fashion/ui';
import { WOMEN_ITEMS, useStore } from '@fashion/logic';
import { useEffect, useState } from 'react';

export default function ShienStoreApp() {
  const { cart, addToCart, view, setView, user, setUser, logout } = useStore();
  
  // Hydration state to prevent UI mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const handleNav = (v: any) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (view === 'about') return <AboutSection />;
    if (view === 'contact') return <ContactSection />;
    if (view === 'login' || view === 'signup') return (
      <Center h="70vh">
        <Paper withBorder p="xl" radius="md" w={420} shadow="md">
          <AuthForm type={view} onSubmit={() => setUser({ name: 'Fashion User' })} />
          <Button 
            variant="transparent" 
            fullWidth mt="md" 
            size="xs" 
            color="teal" 
            onClick={() => setView(view === 'login' ? 'signup' : 'login')}
          >
            {view === 'login' ? "Create account" : "Sign in to account"}
          </Button>
        </Paper>
      </Center>
    );

    return (
      <Container size="lg" py="xl">
        <Stack 
          mb={50} 
          align="center" 
          py={70} 
          style={(theme) => ({ 
            borderRadius: '16px', 
            border: `1px solid ${computedColorScheme === 'dark' ? theme.colors.dark[4] : '#c3fae8'}`,
            backgroundColor: computedColorScheme === 'dark' ? theme.colors.dark[6] : '#e6fcf5'
          })}
        >
          <Title order={1} c="teal.6" style={{ fontSize: '3.5rem', fontWeight: 900 }}>SPRING SEASON</Title>
          <Text c="dimmed" size="xl" fw={500}>Sustainable fashion curated for you.</Text>
          <Button color="teal" size="lg" radius="xs" mt="md" onClick={() => window.scrollTo(0, 800)}>EXPLORE COLLECTION</Button>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
          {WOMEN_ITEMS.map((item) => (
            <ProductCard key={item.id} {...item} onAddToCart={() => addToCart(item)} />
          ))}
        </SimpleGrid>
      </Container>
    );
  };

  // If not mounted, return a simple loader or nothing to prevent hydration errors
  if (!mounted) return null;

  return (
    <AppShell header={{ height: 75 }} padding="md">
      <AppShell.Header px="md">
        <Group justify="space-between" h="100%">
          <Box onClick={() => handleNav('home')} style={{ cursor: 'pointer' }}>
            <Logo />
          </Box>

          <Group gap="md">
            <Group gap={5} visibleFrom="sm">
              <Button variant="subtle" color="gray" onClick={() => handleNav('home')}>Home</Button>
              <Button variant="subtle" color="gray" onClick={() => handleNav('about')}>About</Button>
              <Button variant="subtle" color="gray" onClick={() => handleNav('contact')}>Contact</Button>
            </Group>

            <Divider orientation="vertical" />

            <Group gap="xs">
              <ActionIcon
                onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                variant="default"
                size="lg"
                radius="md"
              >
                {computedColorScheme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
              </ActionIcon>

              {!user ? (
                <>
                  <Button variant="outline" color="teal" radius="xs" size="sm" onClick={() => handleNav('login')}>Log In</Button>
                  <Button color="teal" radius="xs" size="sm" onClick={() => handleNav('signup')} visibleFrom="xs">Sign Up</Button>
                </>
              ) : (
                <Button variant="subtle" size="xs" color="gray" onClick={logout}>Logout ({user.name})</Button>
              )}

              <Indicator label={cart.length} color="teal" size={20} disabled={cart.length === 0} offset={2}>
                <ActionIcon variant="light" color="teal" size="lg" radius="md">
                  <IconShoppingCart size={20} />
                </ActionIcon>
              </Indicator>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        {renderContent()}
        <Footer onNavigate={handleNav} />
      </AppShell.Main>
    </AppShell>
  );
}