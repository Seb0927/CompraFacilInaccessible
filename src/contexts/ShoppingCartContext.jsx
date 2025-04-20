import { createContext, useState, useEffect } from 'react';

// Storage key for shopping cart
const CART_STORAGE_KEY = 'shopping_cart';

const initialCart = [];

export const ShoppingCartContext = createContext({
  /** 
   * The shopping cart items
   * @type {Array<{
  *   title: string,
  *   price: number,
  *   description: string,
  *   images: Array<String>,
  *   quantity: number,
  * }>}
  */
  cart: [],
  addToCart: () => { },
  removeFromCart: () => { },
  clearCart: () => { },
  incrementQuantity: () => { },
  decrementQuantity: () => { }
});

export const ShoppingCartProvider = ({ children }) => {
  // Initialize state from localStorage or with empty cart
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : initialCart;
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return initialCart;
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  const addToCart = (product) => {
    // Check if we have all required info
    if (!product || !product.title || !product.price) {
      console.error('Invalid product data', product);
      return;
    }

    setCart(prevCart => {
      // Create a copy of the cart array
      const updatedCart = [...prevCart];

      // Check if product already exists in cart
      const existingItemIndex = updatedCart.findIndex(
        item => item.title === product.title
      );

      if (existingItemIndex >= 0) {
        // Product exists, increment quantity
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
      } else {
        // Product doesn't exist, add it with quantity 1
        updatedCart.push({
          ...product,
          quantity: 1,
        });
      }

      return updatedCart;
    });
  };

  const removeFromCart = (productTitle) => {
    setCart(prevCart => {
      // Filter out the product
      return prevCart.filter(item => item.title !== productTitle);
    });
  };

  // Increment quantity of a product by 1
  const incrementQuantity = (productTitle) => {
    setCart(prevCart => {
      // Create a copy of the cart array
      const updatedCart = [...prevCart];

      // Find the product
      const itemIndex = updatedCart.findIndex(item => item.title === productTitle);

      if (itemIndex >= 0) {
        // Increment the quantity
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          quantity: updatedCart[itemIndex].quantity + 1
        };
      }

      return updatedCart;
    });
  };

  // Decrement quantity of a product by 1, remove if quantity becomes 0
  const decrementQuantity = (productTitle) => {
    setCart(prevCart => {
      // Find the product
      const itemIndex = prevCart.findIndex(item => item.title === productTitle);

      if (itemIndex >= 0) {
        const currentQuantity = prevCart[itemIndex].quantity;

        if (currentQuantity <= 1) {
          // Do nothing
          
        } else {
          // Create a copy of the cart array
          const updatedCart = [...prevCart];

          // Decrement the quantity
          updatedCart[itemIndex] = {
            ...updatedCart[itemIndex],
            quantity: currentQuantity - 1
          };

          return updatedCart;
        }
      }

      return prevCart;
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Create context value
  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart
  };

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
};