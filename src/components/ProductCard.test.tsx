import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { ProductCard } from './ProductCard';
import '@testing-library/jest-dom/vitest';
import { MantineProvider } from '@mantine/core';


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
});
describe('ProductCard', () => {
  it('renders product name', () => {
    const product = {
      id: 1,
      name: 'Broccoli',
      price: 120,
      image: 'broccoli.jpg',
      category: 'vegetables',
    };

    render(
      <MantineProvider>
        <ProductCard
          product={product}
          addToCart={() => {}}
        />
      </MantineProvider>
    );

    expect(screen.getByText('Broccoli')).toBeInTheDocument();
  });

it('increases quantity', () => {
  const product = {
    id: 1,
    name: 'Broccoli',
    price: 120,
    image: 'broccoli.jpg',
    category: 'vegetables',
  };

  render(
    <MantineProvider>
      <ProductCard
        product={product}
        addToCart={() => {}}
      />
    </MantineProvider>
  );

  const plusButton = screen.getByRole('button', { name: '+' });
  const quantityInput = screen.getByDisplayValue('1');

  fireEvent.click(plusButton);

  expect(quantityInput).toHaveValue(2);
});

it('does not decrease quantity below 1', () => {
  const product = {
    id: 1,
    name: 'Broccoli',
    price: 120,
    image: 'broccoli.jpg',
    category: 'vegetables',
  };

  render(
    <MantineProvider>
      <ProductCard
        product={product}
        addToCart={() => {}}
      />
    </MantineProvider>
  );

  const minusButton = screen.getByRole('button', { name: '−' });

  fireEvent.click(minusButton);

  expect(screen.getByDisplayValue('1')).toHaveValue(1);
});

it('adds selected quantity to cart', () => {
  const product = {
    id: 1,
    name: 'Broccoli',
    price: 120,
    image: 'broccoli.jpg',
    category: 'vegetables',
  };

  const addToCart = vi.fn();

  render(
    <MantineProvider>
      <ProductCard
        product={product}
        addToCart={addToCart}
      />
    </MantineProvider>
  );

  const plusButton = screen.getByRole('button', { name: '+' });

  fireEvent.click(plusButton);

  const addButton = screen.getByRole('button', { name: /Add to cart/i });

  fireEvent.click(addButton);

  expect(addToCart).toHaveBeenCalledWith(product, 2);
});
});