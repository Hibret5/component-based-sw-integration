'use client';
import { 
  AppShell, Container, Group, Indicator, ActionIcon, Button, Paper, Box, SimpleGrid,
  Title, Text, Stack, Center, Divider, Drawer, Burger, Tabs, TextInput, Select, Card,
  Image, Radio, Alert,
  useMantineColorScheme, useComputedColorScheme 
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSun, IconMoon, IconShoppingCart, IconTrash, IconUserCircle } from '@tabler/icons-react';
import { ProductCard, Logo, AuthForm, Footer, AboutSection, ContactSection } from '@fashion/ui';
import { useStore } from '@fashion/logic';
import { useEffect, useState } from 'react';
import AdminDashboard from '../components/admin/AdminDashboard';

const ADMIN_EMAIL = 'admin@store.com';
const formatBirr = (value: number) => `ETB ${value.toFixed(2)}`;

export default function ShienStoreApp() {
  const {
    products,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    paymentMethod,
    setPaymentMethod,
    view,
    setView,
    user,
    setUser,
    updateUser,
    logout
  } = useStore();
  
  const [mounted, setMounted] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [activeProfileTab, setActiveProfileTab] = useState<string | null>('account');
  const [accountName, setAccountName] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  const [profileMsg, setProfileMsg] = useState('');

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    setAccountName(user?.name ?? '');
    setAccountEmail(user?.email ?? '');
  }, [user]);

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const handleNav = (v: any) => {
    setView(v);
    close();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
  const isAdmin = user?.role === 'admin';
  const renderContent = () => {
    if (view === 'about') return <AboutSection />;
    if (view === 'contact') return <ContactSection />;

    if (view === 'login' || view === 'signup') return (
      <Center h="70vh">
        <Paper withBorder p="xl" radius="md" w={420} shadow="md">
          <AuthForm
            type={view}
            onSubmit={(values: { name: string; email: string }) =>
              setUser({
                name: values.name || 'Fashion User',
                email: values.email,
                role: values.email.trim().toLowerCase() === ADMIN_EMAIL ? 'admin' : 'user',
              })
            }
          />
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

    if (view === 'profile') return (
      <Container size="md" py="xl">
        <Paper withBorder p="xl" radius="md" shadow="sm">
          <Group justify="space-between" mb="md">
            <Title order={2}>Profile & Settings</Title>
            <Group gap="xs">
              <IconUserCircle size={20} />
              <Text c="dimmed">{user?.name ?? 'Guest'}</Text>
            </Group>
          </Group>
          <Tabs value={activeProfileTab} onChange={setActiveProfileTab}>
            <Tabs.List>
              <Tabs.Tab value="account">Account</Tabs.Tab>
              <Tabs.Tab value="settings">Settings</Tabs.Tab>
              <Tabs.Tab value="other">Other</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="account" pt="lg">
              <Stack gap="md">
                <TextInput
                  label="Full Name"
                  value={accountName}
                  onChange={(e) => setAccountName(e.currentTarget.value)}
                />
                <TextInput
                  label="Email"
                  type="email"
                  value={accountEmail}
                  onChange={(e) => setAccountEmail(e.currentTarget.value)}
                />
                <Button
                  color="teal"
                  onClick={() => {
                    updateUser({ name: accountName, email: accountEmail });
                    setProfileMsg('Account details saved.');
                  }}
                >
                  Save Account
                </Button>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="settings" pt="lg">
              <Stack gap="md">
                <Select
                  label="Preferred Payment"
                  placeholder="Select payment method"
                  value={paymentMethod}
                  onChange={(value) => value && setPaymentMethod(value as 'card' | 'cash_on_delivery' | 'paypal')}
                  data={[
                    { label: 'Card', value: 'card' },
                    { label: 'Cash on Delivery', value: 'cash_on_delivery' },
                    { label: 'PayPal', value: 'paypal' },
                  ]}
                />
                <Button variant="light" color="teal" onClick={() => setProfileMsg('Settings updated.')}>
                  Save Settings
                </Button>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="other" pt="lg">
              <Stack gap="xs">
                <Text>Role: {user?.role ?? 'user'}</Text>
                <Text>Current cart items: {cart.length}</Text>
                <Text>Saved payment: {paymentMethod ?? 'Not selected yet'}</Text>
              </Stack>
            </Tabs.Panel>
          </Tabs>
          {profileMsg && <Alert mt="lg" color="teal">{profileMsg}</Alert>}
        </Paper>
      </Container>
    );

    if (view === 'admin') return (
      <Container size="lg" py="xl">
        <AdminDashboard />
      </Container>
    );

    if (view === 'cart') return (
      <Container size="lg" py="xl">
        <Group justify="space-between" mb="lg">
          <Title order={2}>Your Cart</Title>
          <Text c="dimmed">Total: {formatBirr(totalAmount)}</Text>
        </Group>
        {cart.length === 0 ? (
          <Paper withBorder p="xl" radius="md">
            <Text c="dimmed">Your cart is empty.</Text>
          </Paper>
        ) : (
          <Stack gap="md">
            {cart.map((item, index) => (
              <Card key={`${item.id}-${index}`} withBorder radius="md" p="md">
                <Group justify="space-between" align="center">
                  <Group>
                    <Image src={item.image} alt={item.title} w={70} h={70} radius="sm" />
                    <Box>
                      <Text fw={600}>{item.title}</Text>
                      <Text c="dimmed">{item.category}</Text>
                    </Box>
                  </Group>
                  <Group>
                    <Text fw={700}>{formatBirr(item.price)}</Text>
                    <ActionIcon color="red" variant="light" onClick={() => removeFromCart(index)}>
                      <IconTrash size={18} />
                    </ActionIcon>
                  </Group>
                </Group>
              </Card>
            ))}
            <Group justify="space-between" mt="md">
              <Button variant="default" onClick={clearCart}>Clear Cart</Button>
              <Button color="teal" onClick={() => handleNav('payment')}>Proceed To Payment</Button>
            </Group>
          </Stack>
        )}
      </Container>
    );

    if (view === 'payment') return (
      <Container size="sm" py="xl">
        <Paper withBorder p="xl" radius="md" shadow="sm">
          <Title order={2} mb="sm">Payment Method</Title>
          <Text c="dimmed" mb="md">Choose a method for frontend checkout flow.</Text>
          <Radio.Group value={paymentMethod} onChange={(value) => setPaymentMethod(value as 'card' | 'cash_on_delivery' | 'paypal')}>
            <Stack>
              <Radio value="card" label="Credit / Debit Card" />
              <Radio value="paypal" label="PayPal" />
              <Radio value="cash_on_delivery" label="Cash on Delivery" />
            </Stack>
          </Radio.Group>
          <Button mt="lg" color="teal" fullWidth disabled={!paymentMethod}>
            Pay {formatBirr(totalAmount)}
          </Button>
        </Paper>
      </Container>
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
          {products.map((item) => (
            <ProductCard key={item.id} {...item} onAddToCart={() => addToCart(item)} />
          ))}
        </SimpleGrid>
      </Container>
    );
  };

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
              <Button variant="subtle" color="gray" onClick={() => handleNav('profile')}>Profile</Button>
              {isAdmin ? (
                <Button variant="subtle" color="gray" onClick={() => handleNav('admin')}>Admin</Button>
              ) : null}
            </Group>

            <Divider orientation="vertical" />

            <Group gap="xs">
              <Burger opened={opened} onClick={opened ? close : open} hiddenFrom="sm" size="sm" />
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
                <ActionIcon variant="light" color="teal" size="lg" radius="md" onClick={() => handleNav('cart')}>
                  <IconShoppingCart size={20} />
                </ActionIcon>
              </Indicator>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Drawer opened={opened} onClose={close} title="Menu" position="top" size="sm">
          <Stack>
            <Button variant="light" onClick={() => handleNav('home')}>Home</Button>
            <Button variant="light" onClick={() => handleNav('about')}>About</Button>
            <Button variant="light" onClick={() => handleNav('contact')}>Contact</Button>
            <Button variant="light" onClick={() => handleNav('profile')}>Profile</Button>
            {isAdmin ? (
              <Button variant="light" onClick={() => handleNav('admin')}>Admin</Button>
            ) : null}
            <Button variant="light" onClick={() => handleNav('cart')}>Cart</Button>
            <Button variant="light" onClick={() => handleNav('payment')}>Payment</Button>
          </Stack>
        </Drawer>
        {renderContent()}
        <Footer onNavigate={handleNav} />
      </AppShell.Main>
    </AppShell>
  );
}