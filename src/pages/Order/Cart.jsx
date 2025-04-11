import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockMenu = [
  { id: 1, name: "Pizza", price: 10 },
  { id: 2, name: "Burger", price: 8 },
  { id: 3, name: "Pasta", price: 12 },
];

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const proceedToCheckout = () => {
    navigate("/order/checkout", { state: { cartItems } });
  };

  return (
    <div>
      <h2>Menu</h2>
      {mockMenu.map((item) => (
        <div key={item.id}>
          {item.name} - ${item.price} <button onClick={() => addToCart(item)}>Add</button>
        </div>
      ))}

      <h3>Cart</h3>
      {cartItems.map((item, index) => (
        <div key={index}>
          {item.name} - ${item.price} <button onClick={() => removeFromCart(index)}>Remove</button>
        </div>
      ))}

      {cartItems.length > 0 && <button onClick={proceedToCheckout}>Checkout</button>}
    </div>
  );
}

export default Cart;
