import { Button, Badge } from '@mantine/core';
import {
  IconShoppingCart,
  IconX,
} from '@tabler/icons-react';
import { useState } from 'react';
import type { CartItem } from '../types/product';

type HeaderProps = {
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  updateCartQuantity: (
    id: number,
    change: number
  ) => void;
};

export const Header = ({
  cart,
  removeFromCart,
  updateCartQuantity,
}: HeaderProps) => {
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__logo">
        Vegetable <span>SHOP</span>
      </div>

      <div className="header__cart-wrapper">
        <Button
          className="header__cart"
          onClick={() => setIsCartOpen((prev) => !prev)}
        >
         {cartCount > 0 && (
  <Badge className="header__badge">
    {cartCount}
  </Badge>
)}

          Cart

          <IconShoppingCart size={16} />
        </Button>

        {isCartOpen && (
          <div className="cart-popup">
            {cart.length === 0 ? (
              <div className="cart-popup__empty">
               <svg
  className="cart-popup__empty-illustration"
  width="80"
  height="100"
  viewBox="0 0 80 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  {/* декоративные элементы */}
  <circle
    cx="21"
    cy="25"
    r="1.2"
    fill="#E1E5E9"
  />

  <circle
    cx="61"
    cy="18"
    r="1.2"
    fill="#E1E5E9"
  />

  <circle
    cx="52"
    cy="10"
    r="1"
    fill="#E1E5E9"
  />

  <path
    d="M62 7L63 9.5L65.5 10.5L63 11.5L62 14L61 11.5L58.5 10.5L61 9.5L62 7Z"
    fill="#E1E5E9"
  />

  {/* большое пятно ЗА корзиной */}
  <ellipse
    cx="43"
    cy="43"
    rx="30"
    ry="18"
    fill="#F0F2F4"
  />

  {/* небольшая светлая форма справа */}
  <ellipse
    cx="57"
    cy="48"
    rx="17"
    ry="13"
    fill="#F0F2F4"
  />

  {/* ручка корзины */}
  <path
    d="M24 32H29L33 61"
    stroke="#D9DEE3"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  {/* корзина */}
  <path
    d="M31 39H61L57 61H35L31 39Z"
    stroke="#D9DEE3"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  {/* верх корзины */}
  <path
    d="M31 39H61"
    stroke="#D9DEE3"
    strokeWidth="2"
    strokeLinecap="round"
  />

  {/* колёса */}
  <circle
    cx="40"
    cy="68"
    r="3"
    stroke="#D9DEE3"
    strokeWidth="2"
  />

  <circle
    cx="53"
    cy="68"
    r="3"
    stroke="#D9DEE3"
    strokeWidth="2"
  />

  {/* тонкая тень под корзиной */}
  <ellipse
    cx="46"
    cy="81"
    rx="24"
    ry="2"
    fill="#F0F2F4"
  />
</svg>

                <p>You cart is empty!</p>
              </div>
            ) : (
              <>
                <div className="cart-popup__items">
                  {cart.map((item) => {
                    const [productName, productWeight] =
                      item.name.split(' - ');

                    return (
                      <div
                        className="cart-popup__item"
                        key={item.id}
                      >
                        <img
                          className="cart-popup__image"
                          src={item.image}
                          alt={item.name}
                        />

                        <div className="cart-popup__info">
                          <div className="cart-popup__name">
                            <span>{productName}</span>

                            {productWeight && (
                              <span className="cart-popup__weight">
                                {productWeight}
                              </span>
                            )}
                          </div>

                          <span className="cart-popup__price">
                            ${item.price}
                          </span>
                        </div>

                        <div className="cart-popup__quantity">
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQuantity(
                                item.id,
                                -1
                              )
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() =>
                              updateCartQuantity(
                                item.id,
                                1
                              )
                            }
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="cart-popup__remove"
                          type="button"
                          aria-label={`Удалить ${item.name}`}
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                        >
                          <IconX size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="cart-popup__total">
                  <span>Total</span>
                  <strong>${cartTotal}</strong>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};