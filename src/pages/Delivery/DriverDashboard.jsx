import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import DeliveryCard from '../components/DeliveryCard';

export default function DriverDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const { data } = await api.get('/deliveries/assigned?driverId=DRIVER_ID'); // Replace with JWT in production
        setDeliveries(data);
      } catch (error) {
        navigate('/driver/login');
      }
    };
    fetchDeliveries();
  }, []);

  return (
    <div>
      <h2>Your Deliveries</h2>
      {deliveries.map(delivery => (
        <DeliveryCard key={delivery._id} delivery={delivery} />
      ))}
    </div>
  );
}