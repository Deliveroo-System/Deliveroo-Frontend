import React from 'react';
import NavBar from '../../components/common/headerlanding';
import Footer from '../../components/common/footerLanding';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is included

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

            <div className="container my-5">
                <h2 className="text-center mb-4">📦 Restaurant Orders</h2>

                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {orders.map(order => (
                        <div className="col" key={order.id}>
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title">{order.item}</h5>
                                    <p className="card-text">
                                        <strong>Quantity:</strong> {order.quantity}<br />
                                        <strong>Price:</strong> ${order.price.toFixed(2)}
                                    </p>
                                    <span className="badge bg-primary">
                                        Total: ${(order.quantity * order.price).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Delivery;
