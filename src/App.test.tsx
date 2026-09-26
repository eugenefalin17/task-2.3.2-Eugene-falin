import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { MantineProvider } from '@mantine/core';
import App from './App';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: () => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('App', () => {
  it('loads and displays products', async () => {
    const products = [
      {
        id: 1,
        name: 'Broccoli',
        price: 120,
        image: 'broccoli.jpg',
        category: 'vegetables',
      },
    ];

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => products,
    } as Response);

    render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Broccoli')).toBeInTheDocument();
    });
  });

  it('shows loader while products are loading', () => {
  vi.spyOn(globalThis, 'fetch').mockImplementation(
    () => new Promise(() => {})
  );

  render(
    <MantineProvider>
      <App />
    </MantineProvider>
  );

  expect(
    document.querySelector('.mantine-Loader-root')
  ).toBeInTheDocument();
});

it('adds product to cart', async () => {
  const products = [
    {
      id: 1,
      name: 'Broccoli',
      price: 120,
      image: 'broccoli.jpg',
      category: 'vegetables',
    },
  ];

  vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => products,
  } as Response);

  render(
    <MantineProvider>
      <App />
    </MantineProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Broccoli')).toBeInTheDocument();
  });

  const addButton = screen.getByRole('button', {
    name: /Add to cart/i,
  });

  fireEvent.click(addButton);

  expect(
  document.querySelector('.header__badge')
).toHaveTextContent('1');
});
});