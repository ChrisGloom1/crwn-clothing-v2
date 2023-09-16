import { createContext, useState, useEffect } from "react"

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id)
  if (existingCartItem) {
    return cartItems.map(cartItem => cartItem.id === productToAdd.id 
      ? {...cartItem, qty: cartItem.qty + 1}
      : cartItem
    )
  }
  return [...cartItems, {...productToAdd, qty: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id)
  if (existingCartItem.qty === 1){
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }
  return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id
      ? {...cartItem, qty: cartItem.qty - 1}
      : cartItem
    )
}

// one line return
const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
})



export const CartProvider = ({children}) => {

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.qty, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.qty * cartItem.price, 0)
    setCartTotal(newCartTotal)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  }

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear))
  }

  const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal}

  return(
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}