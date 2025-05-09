import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
function DriverDashboard() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [driverInfo, setDriverInfo] = useState(null);
  const [activeOrders, setActiveOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    try {
      // Get the raw token
      const token = localStorage.getItem('token');
      console.log(token)
      // If using JWT decoding:
      if (token) {
       fetchApprovedOrders();
      //fetchDriverInfo(token);
    
      }

    } catch (err) {
      console.error("Error parsing token:", err);
      setError('Failed to load driver information');
    }
  }, []);
  
  useEffect(() => {
    if (orders.length > 0) {
      const active = orders.filter(order => order.status === "On the Way");
      setActiveOrders(active);
      
      const pending = orders.filter(order => order.status === "Pending" || order.status === "Assigned");
      setPendingOrders(pending);
      
      const completed = orders.filter(order => 
        order.status === "Delivered" || order.status === "Rejected"
      );
      setCompletedOrders(completed);
    }
  }, [orders]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };
  const confirmAndUpdateStatus = (orderId, status) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to mark the order as "${status}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrderStatus(orderId, status);
      }
    });
  };
  
  const fetchApprovedOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders/details/approved', {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch approved orders');
      }
      
      const data = await response.json();
    
      const allOrders = [];
      for (const restaurantId in data.groupedByRestaurant) {
        allOrders.push(...data.groupedByRestaurant[restaurantId]);
      }

      const mappedOrders = allOrders.map(order => ({
        _id: order._id,
        orderId: order.orderId,
        status: order.deliver === "Pending" ? "Assigned" : order.deliver,
        customerName: order.customerName,
        phoneNumber: order.phoneNumber,
        address: order.address,
        city: order.city,
        items: order.items.map(item => ({
          name: item.name,
          quantity: item.qty,
          price: item.price
        })),
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt
      }));
      
      setOrders(mappedOrders);
    } catch (err) {
      console.error("Error fetching approved orders:", err);
      setError('Error fetching approved orders: ' + err.message);
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
 const sendPaymentSMS = async (to) => {
    try {
      const response = await axios.post('http://localhost:5056/api/notifications/sms/assigned', {
        to: to
      });
      return response.data; 
    } catch (error) {
      console.error('Error sending payment SMS:', error);
      throw error; 
    }
  };
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const to = "+94703889971";
      await sendPaymentSMS(to);
      
      if (!result.isConfirmed) return;
      console.log(token)
      const url = `http://localhost:5000/api/userdetails/userdetails/${orderId}/status`;
  
      const body = {
        statusType: "deliver",
        value: "Approved"
      };
  
      const response = await fetch(url, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(body)
      });
      

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update status');
      }
  
      await Swal.fire({
        title: 'Updated!',
        text: 'The order status has been updated.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
  
      fetchApprovedOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
      setError('Error updating order status: ' + err.message);
  
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('driverToken');
    localStorage.removeItem('driverInfo');
    window.location.href = '/';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-amber-400',
      'Assigned': 'bg-cyan-500',
      'On the Way': 'bg-green-500',
      'Delivered': 'bg-gray-500',
      'Rejected': 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const OrderCard = ({ order, showActions = true }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Order #{order.orderId.slice(-6)}</h3>
        <span 
          className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(order.status)}`}
        >
          {order.status}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <p className="text-gray-700"><span className="font-medium">Customer:</span> {order.customerName}</p>
        <p className="text-gray-700"><span className="font-medium">Phone:</span> {order.phoneNumber}</p>
        <p className="text-gray-700"><span className="font-medium">Address:</span> {order.address}</p>
        <p className="text-gray-700"><span className="font-medium">City:</span> {order.city}</p>
        <p className="text-gray-700"><span className="font-medium">Payment:</span> {order.paymentMethod}</p>
        <p className="text-gray-700"><span className="font-medium">Total:</span> ${order.totalAmount.toFixed(2)}</p>
        <div className="pt-2">
          <p className="font-medium text-gray-700">Items:</p>
          <ul className="list-disc list-inside">
            {order.items.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showActions && order.status !== 'Delivered' && order.status !== 'Rejected' && (
        <div className="p-4 bg-gray-50 flex flex-wrap gap-2">
          {order.status !== 'On the Way' && (
            <button 
            onClick={() => confirmAndUpdateStatus(order.orderId, 'Delivered')}

              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Start Delivery
            </button>
          )}
          <button 
            onClick={() => confirmAndUpdateStatus(order.orderId, 'Delivered')}

            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          >
            Mark Delivered
          </button>
          <button 
            onClick={() => confirmAndUpdateStatus(order.orderId, 'Delivered')}

            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Reject Order
          </button>
        </div>
      )}
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Driver Dashboard</h1>
            {driverInfo && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Welcome, <span className="font-medium">{driverInfo.name}</span></p>
                <p>Delivery Cities: <span className="font-medium">{driverInfo.deliveryCities?.join(', ')}</span></p>
              </div>
            )}
          </div>
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-8">
        {error && (
          <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}
        
        {/* New Assignments Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">New Assignments</h2>
          {pendingOrders.length === 0 ? (
            <div className="p-6 bg-white rounded-lg shadow text-center text-gray-500">
              No new assignments.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingOrders.map(order => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          )}
        </section>
        
        {/* Active Deliveries Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">In Progress</h2>
          {activeOrders.length === 0 ? (
            <div className="p-6 bg-white rounded-lg shadow text-center text-gray-500">
              No active deliveries.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeOrders.map(order => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          )}
        </section>
        
        {/* Completed Orders Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Past Orders</h2>
          {completedOrders.length === 0 ? (
            <div className="p-6 bg-white rounded-lg shadow text-center text-gray-500">
              No completed orders.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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