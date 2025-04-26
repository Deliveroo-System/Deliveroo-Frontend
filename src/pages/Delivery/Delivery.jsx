import React, { useState } from 'react';

export default function Delivery() {
  const [orders, setOrders] = useState([
    { id: 1, item: 'Pizza', status: 'Approved' },
    { id: 2, item: 'Burger', status: 'Approved' },
    { id: 3, item: 'Pasta', status: 'Approved' },
  ]);

  const handleButtonClick = (id) => {
    alert(`Order ${id} marked as delivered!`);
  };

  return (
    <div>
      <h1>Approved Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.item} - {order.status}{' '}
            <button onClick={() => handleButtonClick(order.id)}>Mark as Delivered</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
