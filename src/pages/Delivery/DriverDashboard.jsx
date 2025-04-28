import { useState, useEffect } from 'react';
import './DriverDashboard.css';

function DriverDashboard() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [driverInfo, setDriverInfo] = useState(null);
  const [activeOrders, setActiveOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    const driverId = JSON.parse(localStorage.getItem('driverInfo'))?.id;
    if (driverId) {
      fetchOrders(driverId);
      fetchDriverInfo(driverId);
    }
  }, []);

  // Process orders into categories whenever orders state changes
  useEffect(() => {
    if (orders.length > 0) {
      // Filter out active orders (On the Way status)
      const active = orders.filter(order => order.status === "On the Way");
      setActiveOrders(active);
      
      // Filter out pending assigned orders
      const pending = orders.filter(order => order.status === "Assigned");
      setPendingOrders(pending);
      
      // Filter out completed orders (Delivered or Rejected)
      const completed = orders.filter(order => 
        order.status === "Delivered" || order.status === "Rejected"
      );
      setCompletedOrders(completed);
    }
  }, [orders]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('driverToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchOrders = async (driverId) => {
    try {
      // Fetch all driver orders including completed ones
      const response = await fetch(`http://localhost:3000/api/deliveries/driver/${driverId}/all`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch orders');
      }
      
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError('Error fetching orders: ' + err.message);
    }
  };

  const fetchDriverInfo = async (driverId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/drivers/${driverId}`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch driver information');
      }
      
      const data = await response.json();
      setDriverInfo(data);
    } catch (err) {
      console.error("Error fetching driver info:", err);
      setError('Error fetching driver information: ' + err.message);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch('http://localhost:3000/api/deliveries/status', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          deliveryId: orderId,
          status: newStatus
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update status');
      }

      // Refresh orders after status update
      const driverId = JSON.parse(localStorage.getItem('driverInfo'))?.id;
      fetchOrders(driverId);
    } catch (err) {
      console.error("Error updating order status:", err);
      setError('Error updating order status: ' + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('driverToken');
    localStorage.removeItem('driverInfo');
    window.location.href = '/';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': '#ffc107',
      'Assigned': '#17a2b8',
      'On the Way': '#28a745',
      'Delivered': '#6c757d',
      'Rejected': '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  // Reusable order card component
  const OrderCard = ({ order, showActions = true }) => (
    <div className="order-card">
      <div className="order-header">
        <h3>Order #{order._id.slice(-6)}</h3>
        <span 
          className="status-badge"
          style={{ backgroundColor: getStatusColor(order.status) }}
        >
          {order.status}
        </span>
      </div>
      <div className="order-details">
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>City:</strong> {order.city}</p>
        <p><strong>Items:</strong> {order.items?.length || 0}</p>
      </div>
      {showActions && order.status !== 'Delivered' && order.status !== 'Rejected' && (
        <div className="order-actions">
          {order.status !== 'On the Way' && (
            <button 
              onClick={() => updateOrderStatus(order._id, 'On the Way')}
              className="action-btn start-btn"
            >
              Start Delivery
            </button>
          )}
          <button 
            onClick={() => updateOrderStatus(order._id, 'Delivered')}
            className="action-btn complete-btn"
          >
            Mark Delivered
          </button>
          <button 
            onClick={() => updateOrderStatus(order._id, 'Rejected')}
            className="action-btn reject-btn"
          >
            Reject Order
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Driver Dashboard</h1>
          {driverInfo && (
            <div className="driver-info">
              <p>Welcome, {driverInfo.name}</p>
              <p>Delivery Cities: {driverInfo.deliveryCities?.join(', ')}</p>
            </div>
          )}
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <main className="dashboard-content">
        {error && <div className="error">{error}</div>}
        
        {/* New Assignments Section */}
        <section className="orders-section pending-orders">
          <h2>New Assignments</h2>
          {pendingOrders.length === 0 ? (
            <p className="no-orders">No new assignments.</p>
          ) : (
            <div className="orders-grid">
              {pendingOrders.map(order => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          )}
        </section>
        
        {/* Active Deliveries Section */}
        <section className="orders-section active-orders">
          <h2>In Progress</h2>
          {activeOrders.length === 0 ? (
            <p className="no-orders">No active deliveries.</p>
          ) : (
            <div className="orders-grid">
              {activeOrders.map(order => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          )}
        </section>
        
        {/* Completed Orders Section */}
        <section className="orders-section completed-orders">
          <h2>Past Orders</h2>
          {completedOrders.length === 0 ? (
            <p className="no-orders">No completed orders.</p>
          ) : (
            <div className="orders-grid">
              {completedOrders.map(order => (
                <OrderCard key={order._id} order={order} showActions={false} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default DriverDashboard;