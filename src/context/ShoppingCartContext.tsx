import { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Product } from '../types/Product';

interface CartItem extends Product {
  quantity: number;
}

interface ShoppingCartContextType {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType>({
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

export const useShoppingCart = () => useContext(ShoppingCartContext);

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Calculate total items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Add item to cart
  const addToCart = useCallback((product: Product) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart with same size
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (existingItemIndex !== -1) {
        // If exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += product.quantity || 1;
        return updatedItems;
      } else {
        // Otherwise add new item
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};