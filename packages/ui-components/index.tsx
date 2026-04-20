'use client';
import { 
  Card, Image, Text, Badge, Button, Group, Stack, 
  TextInput, PasswordInput, Title, Box, Container, 
  Textarea, ActionIcon, Paper, SimpleGrid, Divider, Tooltip,
  useMantineTheme, rem
} from '@mantine/core';
import { 
  IconBrandFacebook, 
  IconBrandInstagram, 
  IconBrandTelegram, 
  IconBrandLinkedin 
} from '@tabler/icons-react';

// --- LOGO ---
export const Logo = () => (
  <Text 
    size="xl" fw={900} variant="gradient" 
    gradient={{ from: 'teal.6', to: 'teal.4', deg: 45 }}
    style={{ letterSpacing: '-1px', cursor: 'pointer' }}
  >
    SHE'S STORE
  </Text>
);

// --- SOCIAL ICONS ---
export const SocialIcons = () => (
  <Group gap="xs">
    {[
      { label: 'Facebook', icon: IconBrandFacebook, color: '#1877F2' },
      { label: 'Instagram', icon: IconBrandInstagram, color: '#E4405F' },
      { label: 'Telegram', icon: IconBrandTelegram, color: '#0088cc' },
      { label: 'LinkedIn', icon: IconBrandLinkedin, color: '#0077B5' },
    ].map((social) => (
      <Tooltip key={social.label} label={social.label}>
        <ActionIcon 
          variant="filled" 
          style={{ backgroundColor: social.color }} 
          size="lg" 
          radius="xl" 
          onClick={() => window.open('#')}
        >
          <social.icon size={20} />
        </ActionIcon>
      </Tooltip>
    ))}
  </Group>
);

// --- PRODUCT CARD ---
export const ProductCard = ({ image, category, title, price, onAddToCart }: any) => (
  <Card shadow="sm" padding="md" radius="md" withBorder>
    <Card.Section>
      <Image src={image} height={300} alt={title} />
    </Card.Section>
    <Stack mt="md" gap="xs">
      <Group justify="space-between">
        <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{category}</Text>
        <Badge color="teal" variant="light">New Season</Badge>
      </Group>
      <Text fw={500} lineClamp={1}>{title}</Text>
      <Text size="xl" fw={700} c="teal.7">${price.toFixed(2)}</Text>
      <Button color="teal" fullWidth radius="xs" onClick={onAddToCart}>Add to Bag</Button>
    </Stack>
  </Card>
);

// --- AUTH FORM ---
export const AuthForm = ({ type, onSubmit }: any) => (
  <Stack gap="md" component="form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
    <Title order={2} ta="center" c="teal.7">
      {type === 'login' ? 'Sign In' : 'Create Account'}
    </Title>
    <TextInput label="Email Address" placeholder="your@email.com" required />
    <PasswordInput label="Password" required />
    {type === 'signup' && <PasswordInput label="Confirm Password" required />}
    <Button color="teal" fullWidth type="submit" mt="md" radius="xs">
      {type === 'login' ? 'Login' : 'Sign Up'}
    </Button>
  </Stack>
);

// --- ABOUT SECTION ---
export const AboutSection = () => (
  <Container size="md" py={60}>
    <Stack align="center" ta="center" gap="xl">
      <Title order={1} c="teal.7" style={{ fontSize: rem(48) }}>Our Fashion Story</Title>
      <Text size="lg" c="dimmed">Sustainable style for the bold and modern woman.</Text>
      <Image src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" radius="md" />
    </Stack>
  </Container>
);

// --- CONTACT SECTION ---
export const ContactSection = () => (
  <Container size="sm" py={60}>
    <Paper withBorder p="xl" radius="md" shadow="md">
      <Stack gap="md">
        <Title order={2} c="teal.7">Contact Us</Title>
        <TextInput label="Full Name" placeholder="Jane Doe" required />
        <Textarea label="Message" placeholder="How can we help?" minRows={4} required />
        <Button color="teal" fullWidth radius="xs">Send Message</Button>
      </Stack>
    </Paper>
  </Container>
);

// --- PROFESSIONAL FOOTER ---
export const Footer = ({ onNavigate }: { onNavigate: (v: any) => void }) => {
  return (
    <Box 
      component="footer" 
      pt={60} 
      pb={20} 
      mt={100}
      // This uses a light green-tinted white in light mode, and deep dark in dark mode
      style={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '#f8fff9',
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : '#c3fae8'}`,
      })}
    >
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={40} mb={40}>
          <Stack gap="md">
            <Logo />
            <Text size="sm" c="dimmed" lh={1.6}>Premium sustainable fashion since 2026.</Text>
            <SocialIcons />
          </Stack>
          
          <Stack gap="xs">
            <Text fw={700} size="md" c="teal.7">SHOPPING</Text>
            <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => onNavigate('home')}>Arrivals</Text>
            <Text size="sm" c="dimmed">Best Sellers</Text>
          </Stack>

          <Stack gap="xs">
            <Text fw={700} size="md" c="teal.7">HELP CENTER</Text>
            <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => onNavigate('contact')}>Contact Us</Text>
            <Text size="sm" c="dimmed">Shipping</Text>
          </Stack>

          <Stack gap="xs">
            <Text fw={700} size="md" c="teal.7">COMPANY</Text>
            <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => onNavigate('about')}>Our Story</Text>
            <Text size="sm" c="dimmed">Privacy</Text>
          </Stack>
        </SimpleGrid>
        
        <Divider my="sm" variant="dotted" />
        <Text size="xs" c="dimmed" ta="center" mt="md">© 2026 SHE'S STORE Global Inc.</Text>
      </Container>
    </Box>
  );
};