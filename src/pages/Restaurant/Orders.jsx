import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Orders.css';

export default function Orders() {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const restaurantId = localStorage.getItem("restaurantId");
      const token = localStorage.getItem("token");
      
      if (!restaurantId) {
        throw new Error("Restaurant ID not found in local storage");
      }
      if (!token) {
        throw new Error("Authentication token not found");
      }
      
      const response = await axios.get(
        `http://localhost:5000/api/orders/details/pending?restaurantId=${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setOrders(response.data.groupedByRestaurant || {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleApproveOrder = async (orderId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You are about to approve this order. This action cannot be undone.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, approve it!',
        customClass: {
          popup: 'sweet-alert-popup'
        }
      });

      if (!result.isConfirmed) return;

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      await axios.put(
        `http://localhost:5000/api/userdetails/userdetails/${orderId}/status`,
        {
          "statusType": "RestaurantOwner",
          "value": "Approved"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Show success message
      await Swal.fire({
        title: 'Approved!',
        text: 'The order has been approved.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'sweet-alert-popup'
        }
      });

      // Refresh the orders list
      setLoading(true);
      await fetchOrders();
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err.message || 'Failed to approve order',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'sweet-alert-popup'
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header-container">
        <h1 className="orders-header">Pending Orders</h1>
        <button 
          onClick={fetchOrders} 
          className="refresh-button"
          title="Refresh orders"
        >
          <i className="fas fa-sync-alt"></i> Refresh
        </button>
      </div>
      
      {Object.keys(orders).length === 0 ? (
        <div className="no-orders-container">
          <i className="fas fa-box-open no-orders-icon"></i>
          <p className="no-orders">No pending orders found</p>
        </div>
      ) : (
        Object.entries(orders).map(([restaurantId, restaurantOrders]) => (
          <div key={restaurantId} className="restaurant-orders">
            {restaurantOrders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                    <p className="order-date">
                      <i className="far fa-calendar-alt"></i> {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="order-details">
                  <div className="customer-info">
                    <h4>
                      <i className="fas fa-user"></i> Customer Information
                    </h4>
                    <p><strong>Name:</strong> {order.customerName}</p>
                    <p><strong>Phone:</strong> {order.phoneNumber}</p>
                    <p><strong>Address:</strong> {order.address}, {order.city}, {order.zipCode}</p>
                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                    <p className="total-amount">
                      <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="order-items">
                    <h4><i className="fas fa-utensils"></i> Order Items</h4>
                    {order.menus.map(menu => (
                      <div key={menu.menuId} className="menu-section">
                        <h5>{menu.menuName}</h5>
                        <ul>
                          {menu.items.map(item => (
                            <li key={item.menuItemId}>
                              <span className="item-name">{item.menuItemName}</span>
                              <span className="item-qty">{item.qty} x ${item.price.toFixed(2)}</span>
                              <span className="item-total">
                                ${(item.qty * item.price).toFixed(2)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="order-actions">
                  <button 
                    onClick={() => handleApproveOrder(order.orderId)}
                    className="approve-button"
                  >
                    <i className="fas fa-check"></i> Approve Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}