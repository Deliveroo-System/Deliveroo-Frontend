import React from 'react';
import NavBar from '../../components/common/headerlanding'; // Corrected path
import Footer from '../../components/common/footerLanding'; // Corrected path

const Delivery = () => {
    const orders = [
        { id: 1, item: 'Margherita Pizza', quantity: 2, price: 12.99 },
        { id: 2, item: 'Caesar Salad', quantity: 1, price: 8.99 },
        { id: 3, item: 'Spaghetti Carbonara', quantity: 3, price: 14.99 },
        { id: 4, item: 'Garlic Bread', quantity: 2, price: 5.99 },
    ];

    return (
        <div>
            <NavBar />
            <h1>Restaurant Orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        {order.quantity}x {order.item} - ${order.price.toFixed(2)}
                    </li>
                ))}
            </ul>
            <Footer />
        </div>
    );
};

export default Delivery;
