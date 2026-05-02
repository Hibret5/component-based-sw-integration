'use client';

import { CartDrawer } from './CartDrawer';
import { Button, Stack, Title, Paper, Container } from '@mantine/core';
import { useStore } from '@fashion/logic';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Lightweight cart sandbox; the primary cart UI lives on the home page.
 */
export default function CartPage() {
  const { cart, removeFromCart, clearCart, setView } = useStore();
  const [open, setOpen] = useState(true);

  return (
    <Container size="sm" py="xl">
      <Paper withBorder p="xl" radius="md">
        <Stack gap="md">
          <Title order={2}>Cart sandbox</Title>
          <Button component={Link} href="/" variant="light">
            Back to storefront
          </Button>
          <Button onClick={() => setOpen(true)}>Open drawer</Button>
          <CartDrawer
            opened={open}
            onClose={() => setOpen(false)}
            items={cart.map(({ cartItemId, id, title, price, image, category }) => ({
              id: cartItemId,
              title,
              price,
              image,
              category,
            }))}
            onRemove={(lineId) => removeFromCart(lineId)}
            onClear={clearCart}
            onCheckout={() => {
              setView('payment');
              setOpen(false);
            }}
          />
        </Stack>
      </Paper>
    </Container>
  );
}
