"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
  isOpen: boolean;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

 
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  }, []);


  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      const count = cartItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [cartItems]);

  const addToCart = (product: CartProduct) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevItems, product];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, toggleCart, isOpen, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};