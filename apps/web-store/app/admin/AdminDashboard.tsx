'use client';

import { useState } from 'react';
import { Alert, Badge, Button, Group, Paper, SimpleGrid, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconShieldCheck } from '@tabler/icons-react';
import { useStore } from '@fashion/logic';

const formatBirr = (value: number) => `ETB ${value.toFixed(2)}`;

export default function AdminDashboard() {
  const { user, products, cart, adminLogs, soldOutRecords, addProduct, markProductSoldOut, markProductOnSale } = useStore();
  const isAdmin = user?.role === 'admin';
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const onAddProduct = () => {
    const numericPrice = Number(price);
    if (!title || !category || !image || Number.isNaN(numericPrice) || numericPrice <= 0) {
      setMessage('Please fill all fields with valid values.');
      return;
    }

    addProduct({
      title,
      category,
      image,
      price: numericPrice,
    });

    setTitle('');
    setCategory('');
    setPrice('');
    setImage('');
    setMessage('Product added successfully.');
  };

  return (
    <Stack gap="lg">
      <Paper withBorder p="xl" radius="md" shadow="sm">
        <Group justify="space-between" mb="lg">
          <Title order={2}>Admin Dashboard</Title>
          <Group gap="xs">
            <IconShieldCheck size={20} />
            <Text c="dimmed">Store Control Panel</Text>
          </Group>
        </Group>

        {!isAdmin ? (
          <Alert color="red">You need an admin account to access this page.</Alert>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <Paper withBorder p="md" radius="md">
              <Text fw={700}>Products</Text>
              <Title order={3}>{products.length}</Title>
            </Paper>
            <Paper withBorder p="md" radius="md">
              <Text fw={700}>Items In Cart</Text>
              <Title order={3}>{cart.length}</Title>
            </Paper>
            <Paper withBorder p="md" radius="md">
              <Text fw={700}>Revenue Preview</Text>
              <Title order={3}>{formatBirr(totalAmount)}</Title>
            </Paper>
          </SimpleGrid>
        )}
      </Paper>

      {isAdmin && (
        <>
          <Paper withBorder p="xl" radius="md" shadow="sm">
            <Title order={4} mb="md">Add New Product</Title>
            <Stack>
              <TextInput label="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
              <TextInput label="Category" value={category} onChange={(e) => setCategory(e.currentTarget.value)} />
              <TextInput
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.currentTarget.value)}
                placeholder="e.g. 79.99"
              />
              <TextInput
                label="Image URL"
                value={image}
                onChange={(e) => setImage(e.currentTarget.value)}
                placeholder="https://example.com/image.jpg"
              />
              <Button color="teal" onClick={onAddProduct}>Add Product</Button>
              {message ? <Alert color="teal">{message}</Alert> : null}
            </Stack>
          </Paper>

          <Paper withBorder p="xl" radius="md" shadow="sm">
            <Title order={4} mb="md">Product Sale Status</Title>
            <Stack gap="xs">
              {products.map((product) => (
                <Paper key={product.id} withBorder p="sm" radius="md">
                  <Group justify="space-between" align="center">
                    <Stack gap={2}>
                      <Text fw={600}>{product.title}</Text>
                      <Text size="xs" c="dimmed">{product.category}</Text>
                    </Stack>
                    <Group>
                      <Badge color={product.status === 'sold_out' ? 'red' : 'teal'} variant="light">
                        {product.status === 'sold_out' ? 'Sold Out' : 'On Sale'}
                      </Badge>
                      {product.status === 'sold_out' ? (
                        <Button size="xs" variant="light" color="teal" onClick={() => markProductOnSale(product.id)}>
                          Mark On Sale
                        </Button>
                      ) : (
                        <Button size="xs" variant="light" color="red" onClick={() => markProductSoldOut(product.id)}>
                          Mark Sold Out
                        </Button>
                      )}
                    </Group>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Paper>

          <Paper withBorder p="xl" radius="md" shadow="sm">
            <Title order={4} mb="md">Sold Out Records</Title>
            <Stack gap="xs">
              {soldOutRecords.length === 0 ? (
                <Text c="dimmed">No sold out records yet.</Text>
              ) : (
                soldOutRecords.map((record) => (
                  <Paper key={record.id} withBorder p="sm" radius="md">
                    <Text fw={600}>{record.productTitle}</Text>
                    <Text size="xs" c="dimmed">Marked sold out: {record.timestamp}</Text>
                  </Paper>
                ))
              )}
            </Stack>
          </Paper>

          <Paper withBorder p="xl" radius="md" shadow="sm">
            <Title order={4} mb="md">Admin Logs</Title>
            <Stack gap="xs">
              {adminLogs.length === 0 ? (
                <Text c="dimmed">No admin actions logged yet.</Text>
              ) : (
                adminLogs.map((log) => (
                  <Paper key={log.id} withBorder p="sm" radius="md">
                    <Text fw={600}>{log.action}</Text>
                    <Text size="xs" c="dimmed">{log.timestamp}</Text>
                  </Paper>
                ))
              )}
            </Stack>
          </Paper>
        </>
      )}
    </Stack>
  );
}
