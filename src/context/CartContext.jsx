import React, { createContext, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({children})=> {
    const [cartItems,setCartItems] = useState([])
    const [selectedItemDetails, setSelectedItemDetails] = useState(null);

    const addToCart = (item) =>{
        setCartItems((prevItem)=> [...prevItem,item]) 
    }
    const removeFromCart = (item) => {
      setCartItems((prevItems) => prevItems.filter(cartItem => cartItem !== item));
  };
  const setItemDetails = (item) => {
    setSelectedItemDetails(item);
};
const updateCartItem = (updatedItem) => {
  setCartItems(prevItems => 
      prevItems.map(item => 
          item.name === updatedItem.name ? { ...item, quantity: updatedItem.quantity, totalPrice: updatedItem.totalPrice, addons:updatedItem.addon } : item
      )
  );
};
  return (
    <>
    <CartContext.Provider value={{cartItems,addToCart,removeFromCart,setItemDetails,selectedItemDetails,updateCartItem}}>
        {children}
    </CartContext.Provider>
    </>
  )
}

export default CartContext