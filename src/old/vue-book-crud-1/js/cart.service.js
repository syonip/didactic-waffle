// cart.service.js

var cartItems = [];

const getCartItems = () => cartItems;

const addToCart = item => {
  const itemInCart = cartItems.find(currentItem => item.id === currentItem.id);
  if( itemInCart ) {
    console.log('itemInCart', itemInCart);
    itemInCart.quantity++;
  } else {
    item.quantity = 1;
    cartItems.push(item);
  }
}

const substractFromCart = itemId => {
  const itemIndex = cartItems.findIndex(item => item.id === itemId);
  if( itemIndex > -1 ) {
    if( cartItems[itemIndex].quantity > 1 ) {
      cartItems[itemIndex].quantity--;
    } else {
      cartItems.splice(itemIndex, 1);
    }
  }
}

const clearItem = itemId => {
  const itemIndex = cartItems.findIndex(item => item.id === itemId);
  if( itemIndex > -1 ) {
    cartItems.splice(itemIndex, 1);
  }
}

const getCartTotal = () => {
  return cartItems.reduce(( acc, item ) => {
    return acc + (item.quantity * item.price);
  }, 0);
}

var cartService = {
  substractFromCart,
  getCartItems,
  clearItem,
  addToCart,
  getCartTotal
}