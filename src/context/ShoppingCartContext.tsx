import { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string[];
  selectedSize: string;
  quantity: number;
}

interface ShoppingCartContextType {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
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

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = useCallback((item: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        p => p.id === item.id && p.selectedSize === item.selectedSize
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        return [...prevItems, item];
      }
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

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
