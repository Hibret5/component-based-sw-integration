'use client';
import { 
  AppShell, Container, Group, Indicator, ActionIcon, 
  Button, Paper, Box, SimpleGrid, Title, Text, Stack, Center 
} from '@mantine/core';
import { ProductCard, Logo, AuthForm, Footer, AboutSection, ContactSection } from '@fashion/ui';
import { WOMEN_ITEMS, useStore } from '@fashion/logic';

export default function ShienStoreApp() {
  const { cart, addToCart, view, setView, user, setUser, logout } = useStore();

  const handleNav = (v: any) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (view === 'about') return <AboutSection />;
    if (view === 'contact') return <ContactSection />;
    if (view === 'login' || view === 'signup') return (
      <Center h="70vh">
        <Paper withBorder p="xl" radius="md" w={420} shadow="md" style={{ borderColor: '#c3fae8' }}>
          <AuthForm type={view} onSubmit={() => setUser({ name: 'Fashion User' })} />
          <Button variant="transparent" fullWidth mt="md" size="xs" color="teal.9" onClick={() => setView(view === 'login' ? 'signup' : 'login')}>
            {view === 'login' ? "Create account" : "Sign in to account"}
          </Button>
        </Paper>
      </Center>
    );

    return (
      <Container size="lg" py="xl">
        <Stack mb={50} align="center" py={70} bg="#e6fcf5" style={{ borderRadius: '16px', border: '1px solid #c3fae8' }}>
          <Title order={1} c="#099268" style={{ fontSize: '3.5rem', fontWeight: 900 }}>SPRING SEASON</Title>
          <Text c="teal.9" size="xl" fw={500}>Sustainable fashion curated for you.</Text>
          <Button color="teal.9" size="lg" radius="xs" mt="md" onClick={() => window.scrollTo(0, 800)}>EXPLORE COLLECTION</Button>
        </Stack>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
          {WOMEN_ITEMS.map((item) => <ProductCard key={item.id} {...item} onAddToCart={() => addToCart(item)} />)}
        </SimpleGrid>
      </Container>
    );
  };

  return (
    <AppShell header={{ height: 75 }} padding="md">
      <AppShell.Header px="md" style={{ borderBottom: '1px solid #c3fae8' }}>
        <Group justify="space-between" h="100%">
          <Box onClick={() => handleNav('home')} style={{ cursor: 'pointer' }}><Logo /></Box>
          <Group gap="md">
            <Button variant="subtle" color="teal.9" onClick={() => handleNav('home')}>Home</Button>
            <Button variant="subtle" color="teal.9" onClick={() => handleNav('about')}>About</Button>
            <Button variant="subtle" color="teal.9" onClick={() => handleNav('contact')}>Contact</Button>
            {!user ? (
              <Group gap="xs">
                <Button variant="outline" color="teal.8" radius="xs" size="sm" onClick={() => handleNav('login')}>Log In</Button>
                <Button color="teal.8" radius="xs" size="sm" onClick={() => handleNav('signup')}>Sign Up</Button>
              </Group>
            ) : (
              <Button variant="subtle" size="xs" color="gray" onClick={logout}>Logout ({user.name})</Button>
            )}
            <Indicator label={cart.length} color="teal.9" size={20} disabled={cart.length === 0} offset={2}>
              <ActionIcon variant="light" color="teal.8" size="lg" radius="md">🛒</ActionIcon>
            </Indicator>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{renderContent()}<Footer onNavigate={handleNav} /></AppShell.Main>
    </AppShell>
  );
}