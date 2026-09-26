import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { MantineProvider } from '@mantine/core';
import { Header } from './Header';
import type { CartItem } from '../types/product';

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

describe('Header', () => {
  it('shows total quantity of products in cart', () => {
    const cart: CartItem[] = [
      {
        id: 1,
        name: 'Broccoli - 1 Kg',
        price: 120,
        image: 'broccoli.jpg',
        category: 'vegetables',
        quantity: 2,
      },
      {
        id: 2,
        name: 'Tomato - 1 Kg',
        price: 16,
        image: 'tomato.jpg',
        category: 'vegetables',
        quantity: 3,
      },
    ];

    render(
      <MantineProvider>
        <Header
          cart={cart}
          removeFromCart={() => {}}
          updateCartQuantity={() => {}}
        />
      </MantineProvider>
    );

    expect(
      document.querySelector('.header__badge')
    ).toHaveTextContent('5');
  });

  it('shows total price of products in cart', () => {
    const cart: CartItem[] = [
      {
        id: 1,
        name: 'Broccoli - 1 Kg',
        price: 120,
        image: 'broccoli.jpg',
        category: 'vegetables',
        quantity: 4,
      },
    ];

    render(
      <MantineProvider>
        <Header
          cart={cart}
          removeFromCart={() => {}}
          updateCartQuantity={() => {}}
        />
      </MantineProvider>
    );

    const cartButton = screen.getByRole('button', {
      name: /Cart/i,
    });

    fireEvent.click(cartButton);

    expect(screen.getByText('$480')).toBeInTheDocument();
  });

  it('removes product from cart', () => {
    const cart: CartItem[] = [
      {
        id: 1,
        name: 'Broccoli - 1 Kg',
        price: 120,
        image: 'broccoli.jpg',
        category: 'vegetables',
        quantity: 1,
      },
    ];

    const removeFromCart = vi.fn();

    render(
      <MantineProvider>
        <Header
          cart={cart}
          removeFromCart={removeFromCart}
          updateCartQuantity={() => {}}
        />
      </MantineProvider>
    );

    const cartButton = screen.getByRole('button', {
      name: /Cart/i,
    });

    fireEvent.click(cartButton);

    const removeButton = screen.getByRole('button', {
      name: 'Удалить Broccoli - 1 Kg',
    });

    fireEvent.click(removeButton);

    expect(removeFromCart).toHaveBeenCalledWith(1);
  });
});