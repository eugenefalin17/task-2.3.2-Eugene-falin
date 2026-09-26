import { Button, Group } from '@mantine/core';
import { useState } from 'react';
import type { Product } from '../types/product';
import { IconShoppingCart } from '@tabler/icons-react';

type ProductCardProps = {
  product: Product;
  addToCart: (product: Product, quantity: number) => void;
};

export const ProductCard = ({
  product,
  addToCart,
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const [productName, productWeight] = product.name.split(' - ');

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    <article className="product-card">
      <img
        className="product-card__image"
        src={product.image}
        alt={product.name}
      />

      <div className="product-card__info">
        <div className="product-card__top">
          <div className="product-card__name">
            <span>{productName}</span>

            <span className="product-card__weight">
              {productWeight}
            </span>
          </div>

          <Group gap={4} className="product-card__quantity">
            <Button
              className="product-card__stepper-button"
              variant="light"
              size="compact-xs"
              onClick={decreaseQuantity}
            >
              −
            </Button>

            <input
              className="product-card__quantity-input"
              type="number"
              min="1"
              value={quantity}
              readOnly
              aria-label={`Количество ${productName}`}
            />

            <Button
              className="product-card__stepper-button"
              variant="light"
              size="compact-xs"
              onClick={increaseQuantity}
            >
              +
            </Button>
          </Group>
        </div>

        <div className="product-card__bottom">
          <span className="product-card__price">
            ${product.price * quantity}
          </span>

        <Button
  className="product-card__add"
  onClick={() => addToCart(product, quantity)}
>
  Add to cart
  <IconShoppingCart size={16} />
</Button>
        </div>
      </div>
    </article>
  );
};