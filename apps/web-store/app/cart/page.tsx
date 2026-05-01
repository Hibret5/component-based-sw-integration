'use client';

import {
  Drawer,
  ScrollArea,
  Stack,
  Paper,
  Group,
  Text,
  Image,
  ActionIcon,
  Divider,
  Box,
  Button,
  Center,
} from '@mantine/core';
import { IconTrash, IconCreditCard, IconShoppingCartX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  category?: string;
};

type CartDrawerProps = {
  opened: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onCheckout: () => void;
};

export function CartDrawer({
  opened,
  onClose,
  items,
  onRemove,
  onClear,
  onCheckout,
}: CartDrawerProps) {
  const [mounted, setMounted] = useState(false);

  // Fix: Prevent Hydration Mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (!mounted) return null;

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={700} size="lg">
          Your Shopping Bag
        </Text>
      }
      position="right"
      size="md"
      padding="md"
      // Added overlay properties for a high-end feel
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      <ScrollArea h="calc(100vh - 220px)" offsetScrollbars type="never">
        {items.length === 0 ? (
          <Center h={300}>
            <Stack align="center" gap="xs">
              <IconShoppingCartX size={48} stroke={1.5} color="var(--mantine-color-gray-4)" />
              <Text c="dimmed" fw={500}>Your cart is empty</Text>
              <Button variant="subtle" color="teal" size="xs" onClick={onClose}>
                Continue Shopping
              </Button>
            </Stack>
          </Center>
        ) : (
          <Stack gap="sm">
            {items.map((item) => (
              <Paper key={`${item.id}-${Math.random()}`} withBorder p="sm" radius="md" shadow="xs">
                <Group justify="space-between" align="center" wrap="nowrap">
                  <Group gap="sm" wrap="nowrap">
                    <Image 
                      src={item.image} 
                      w={64} 
                      h={64} 
                      radius="md" 
                      alt={item.title}
                      fallbackSrc="https://placehold.co/64x64?text=Product"
                    />
                    <Box style={{ flex: 1, minWidth: 0 }}>
                      <Text fw={600} size="sm" lineClamp={1}>
                        {item.title}
                      </Text>
                      <Text size="xs" c="dimmed" tt="capitalize">
                        {item.category ?? 'General'}
                      </Text>
                      <Text size="sm" c="teal.7" fw={700} mt={2}>
                        ${item.price.toFixed(2)}
                      </Text>
                    </Box>
                  </Group>

                  <ActionIcon
                    color="red"
                    variant="light"
                    size="lg"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.title}`}
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                </Group>
              </Paper>
            ))}
          </Stack>
        )}
      </ScrollArea>

      {items.length > 0 && (
        <Box 
          pt="lg" 
          style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            padding: 'var(--mantine-spacing-md)',
            backgroundColor: 'var(--mantine-color-body)',
            borderTop: '1px solid var(--mantine-color-gray-2)'
          }}
        >
          <Group justify="space-between" mb="md">
            <Text fw={500} c="dimmed">Subtotal</Text>
            <Text fw={700} size="xl" c="teal.8">
              ${total.toFixed(2)}
            </Text>
          </Group>
          
          <Group grow>
            <Button variant="subtle" color="gray" onClick={onClear} size="md">
              Clear All
            </Button>
            <Button 
              leftSection={<IconCreditCard size={18} />} 
              color="teal" 
              onClick={onCheckout}
              size="md"
              radius="md"
            >
              Checkout Now
            </Button>
          </Group>
        </Box>
      )}
    </Drawer>
  );
}