import React, { useState } from 'react';
import {
  Container,
  Paper,
  Group,
  Avatar,
  Title,
  Text,
  Tabs,
  Stack,
  Badge,
  Box,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Divider,
  Alert,
  Card,
  Image,
  Anchor,
  SimpleGrid,
} from '@mantine/core';
import {
  IconPackage,
  IconSettings,
  IconLogout,
  IconAlertCircle,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandX,
  IconMail,
  IconUser,
  IconArrowRight,
} from '@tabler/icons-react';

/** Store product shape used by the storefront (kept local to avoid package cycles). */
export type StoreProduct = {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  status?: 'on_sale' | 'sold_out';
};

export type AuthMode = 'login' | 'signup';

export type AuthFormProps = {
  type: AuthMode;
  onSubmit: (values: { name: string; email: string }) => void;
};

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const isSignup = type === 'signup';
  const title = isSignup ? 'Create your account' : 'Welcome back';
  const subtitle = isSignup
    ? 'Use your email to create a profile and manage your cart.'
    : 'Sign in to continue shopping and access your profile.';

  const validate = () => {
    const next: typeof errors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (isSignup && trimmedName.length < 2) next.name = 'Please enter your full name.';
    if (!trimmedEmail) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) next.email = 'Enter a valid email address.';
    if (isSignup) {
      if (password.length < 8) next.password = 'Password must be at least 8 characters.';
      if (!confirmPassword) next.confirmPassword = 'Please confirm your password.';
      else if (password !== confirmPassword) next.confirmPassword = 'Passwords do not match.';
    }
    if (isSignup && !acceptedTerms) next.terms = 'Please accept the terms to continue.';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit({
          name: isSignup ? name.trim() : name.trim() || 'Fashion User',
          email: email.trim(),
        });
      }}
    >
      <Stack gap="md">
        <Stack gap={4}>
          <Title order={3} ta="center">
            {title}
          </Title>
          <Text c="dimmed" size="sm" ta="center">
            {subtitle}
          </Text>
        </Stack>
        {type === 'signup' ? (
          <TextInput
            label="Full name"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            leftSection={<IconUser size={16} />}
            error={errors.name}
            withAsterisk
            autoComplete="name"
          />
        ) : null}
        <TextInput
          label="Email"
          placeholder="you@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          leftSection={<IconMail size={16} />}
          error={errors.email}
          withAsterisk
          autoComplete="email"
        />

        {isSignup ? (
          <PasswordInput
            label="Create password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            error={errors.password}
            withAsterisk
            autoComplete="new-password"
          />
        ) : null}
        {isSignup ? (
          <PasswordInput
            label="Confirm password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            error={errors.confirmPassword}
            withAsterisk
            autoComplete="new-password"
          />
        ) : null}

        {isSignup ? (
          <Checkbox
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.currentTarget.checked)}
            label={
              <Text size="sm" c="dimmed">
                I agree to the terms and privacy policy (demo).
              </Text>
            }
            color="teal"
          />
        ) : null}
        {errors.terms ? (
          <Text size="xs" c="red">
            {errors.terms}
          </Text>
        ) : null}

        <Divider />

        <Button type="submit" fullWidth color="teal" rightSection={<IconArrowRight size={16} />}>
          {isSignup ? 'Create account' : 'Sign in'}
        </Button>
      </Stack>
    </form>
  );
}

export function Logo() {
  return (
    <Group gap={6}>
      <Box
        w={10}
        h={32}
        style={{ borderRadius: 2, background: 'linear-gradient(180deg, var(--mantine-color-teal-4), var(--mantine-color-teal-8))' }}
      />
      <Text fw={900} size="lg" c="teal.7" style={{ letterSpacing: '-0.04em' }}>
        She&apos;s Store
      </Text>
    </Group>
  );
}

export function ProductCard({
  title,
  price,
  category,
  image,
  status = 'on_sale',
  onAddToCart,
}: StoreProduct & { onAddToCart?: () => void }) {
  const soldOut = status === 'sold_out';

  return (
    <Card withBorder radius="md" padding="sm" shadow="sm">
      <Card.Section>
        <Image src={image} height={220} alt={title} fit="cover" />
      </Card.Section>
      <Stack gap="xs" mt="sm">
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <Box style={{ minWidth: 0 }}>
            <Text fw={700} lineClamp={2}>
              {title}
            </Text>
            <Text size="sm" c="dimmed">
              {category}
            </Text>
          </Box>
          <Badge color={soldOut ? 'red' : 'teal'} variant="light" size="sm">
            {soldOut ? 'Sold out' : 'On sale'}
          </Badge>
        </Group>
        <Text fw={800} c="teal.7">
          ETB {price.toFixed(2)}
        </Text>
        <Button
          radius="md"
          color="teal"
          fullWidth
          disabled={soldOut}
          onClick={onAddToCart}
        >
          {soldOut ? 'Unavailable' : 'Add to cart'}
        </Button>
      </Stack>
    </Card>
  );
}

export function AboutSection() {
  return (
    <Box py="xl" px="md" bg="var(--mantine-color-body)">
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <Stack gap="sm">
            <Title order={2}>About our store</Title>
            <Text c="dimmed">
              We curate contemporary pieces with a focus on quality materials and considered design. This
              storefront is a component-based integration demo: shared UI from <b>@fashion/ui</b>, state from{' '}
              <b>@fashion/logic</b>.
            </Text>
          </Stack>
          <Paper withBorder radius="md" p="lg" bg="teal.0">
            <Title order={4} mb="xs" c="teal.9">
              Sustainable direction
            </Title>
            <Text size="sm" c="dark.6">
              Seasonal edits, lower-waste packaging where possible, and partners who meet our baseline standards —
              all wired through the same reusable building blocks.
            </Text>
          </Paper>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <Stack gap="md" maw={480}>
      <Title order={3}>Contact</Title>
      <Text c="dimmed" size="sm">
        Reach the team for collaborations, press, or order questions.
      </Text>
      <TextInput label="Name" placeholder="Your name" />
      <TextInput label="Email" type="email" placeholder="you@example.com" />
      <TextInput label="Message" placeholder="How can we help?" />
      <Button
        color="teal"
        onClick={() => {
          setSent(true);
        }}
      >
        Send message
      </Button>
      {sent ? (
        <Alert color="teal" title="Demo only">
          Thanks — this form is front-end only for the integration project.
        </Alert>
      ) : null}
    </Stack>
  );
}

export function SocialIcons() {
  return (
    <Group gap="lg" justify="center">
      <Anchor href="https://instagram.com" target="_blank" rel="noreferrer" c="pink.6">
        <IconBrandInstagram size={32} stroke={1.5} />
      </Anchor>
      <Anchor href="https://facebook.com" target="_blank" rel="noreferrer" c="blue.7">
        <IconBrandFacebook size={32} stroke={1.5} />
      </Anchor>
      <Anchor href="https://x.com" target="_blank" rel="noreferrer" c="dark">
        <IconBrandX size={32} stroke={1.5} />
      </Anchor>
    </Group>
  );
}

export type FooterNav = 'home' | 'about' | 'contact' | 'profile' | 'cart' | 'payment' | string;

export type FooterProps = {
  onNavigate: (view: FooterNav) => void;
};

export function Footer({ onNavigate }: FooterProps) {
  return (
    <Box component="footer" py="xl" mt={60} bg="gray.0" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
      <Container size="lg">
        <Group justify="space-between" align="flex-start" wrap="wrap" gap="xl">
          <Stack gap={4}>
            <Logo />
            <Text size="sm" c="dimmed" maw={320}>
              Fashion UI kit + Zustand-backed store state. Built for component-based software integration coursework.
            </Text>
          </Stack>
          <Group gap="xl" visibleFrom="xs">
            <Stack gap={6}>
              <Text size="xs" fw={700} tt="uppercase" c="dimmed">
                Shop
              </Text>
              <Button variant="subtle" size="compact-sm" color="gray" onClick={() => onNavigate('home')}>
                Home
              </Button>
              <Button variant="subtle" size="compact-sm" color="gray" onClick={() => onNavigate('cart')}>
                Cart
              </Button>
              <Button variant="subtle" size="compact-sm" color="gray" onClick={() => onNavigate('payment')}>
                Payment
              </Button>
            </Stack>
            <Stack gap={6}>
              <Text size="xs" fw={700} tt="uppercase" c="dimmed">
                Company
              </Text>
              <Button variant="subtle" size="compact-sm" color="gray" onClick={() => onNavigate('about')}>
                About
              </Button>
              <Button variant="subtle" size="compact-sm" color="gray" onClick={() => onNavigate('contact')}>
                Contact
              </Button>
              <Button variant="subtle" size="compact-sm" color="gray" onClick={() => onNavigate('profile')}>
                Profile
              </Button>
            </Stack>
          </Group>
          <SocialIcons />
        </Group>
        <Divider my="lg" />
        <Text size="xs" c="dimmed" ta="center">
          © {new Date().getFullYear()} Demo storefront — ETB pricing for display only.
        </Text>
      </Container>
    </Box>
  );
}

export const UserProfileUI = () => {
  const handleLogout = () => {
    console.log('User logged out');
    window.location.reload();
  };

  return (
    <Container size="md" py="xl">
      <Paper withBorder p="xl" radius="md" shadow="sm">
        <Group mb="xl" justify="space-between">
          <Group>
            <Avatar size="xl" radius="xl" color="teal" variant="filled">
              ASTU
            </Avatar>
            <div>
              <Title order={2}>Student Developer</Title>
              <Text c="dimmed" size="sm">
                Adama Science and Technology University
              </Text>
            </div>
          </Group>
          <Badge color="teal" size="lg" variant="outline">
            Active Student
          </Badge>
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

          <Tabs.Panel value="orders">
            <Stack gap="sm">
              <Paper withBorder p="md" radius="xs">
                <Group justify="space-between">
                  <Box>
                    <Text fw={700}>Order #9821</Text>
                    <Text size="xs" c="dimmed">
                      Placed on May 1, 2026
                    </Text>
                  </Box>
                  <Badge color="blue" variant="light">
                    In Transit
                  </Badge>
                </Group>
              </Paper>
              <Text size="sm" ta="center" c="dimmed" mt="md">
                No other recent orders found.
              </Text>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="settings">
            <Stack gap="md" mt="md">
              <TextInput label="Full Name" placeholder="Enter your name" defaultValue="Student Name" />
              <TextInput
                label="Email"
                defaultValue="student@astu.edu.et"
                readOnly
                description="Email cannot be changed for academic projects"
              />

              <Divider my="sm" label="Danger Zone" labelPosition="center" color="red" />

              <Group grow>
                <Button leftSection={<IconLogout size={16} />} variant="outline" color="orange" onClick={handleLogout}>
                  Sign Out
                </Button>

                <Button leftSection={<IconAlertCircle size={16} />} variant="filled" color="red">
                  Delete Account
                </Button>
              </Group>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Paper>

      <Alert variant="light" color="blue" title="Project Info" mt="xl" icon={<IconAlertCircle />}>
        This profile is part of the <b>Component-Based Software Integration</b> assignment. Backend connectivity for
        the Orders history will be enabled tomorrow.
      </Alert>
    </Container>
  );
};
