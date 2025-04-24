import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import DeliveryMap from '../components/DeliveryMap';

export default function DriverView() {
  const { deliveryId } = useParams();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState(null);
  const [driverLocation, setDriverLocation] = useState([0, 0]);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const { data } = await api.get(`/deliveries/${deliveryId}`);
        setDelivery(data);
      } catch (error) {
        navigate('/driver/login');
      }
    };
    fetchDelivery();

    // Simulate GPS updates
    const interval = setInterval(() => {
      setDriverLocation([driverLocation[0] + 0.001, driverLocation[1] + 0.001]);
    }, 3000);

    return () => clearInterval(interval);
  }, [deliveryId]);

  const updateStatus = async (status) => {
    await api.put(`/deliveries/${deliveryId}/status`, { status });
    setDelivery(prev => ({ ...prev, status }));
  };

  if (!delivery) return <div>Loading...</div>;

  return (
    <div>
      <DeliveryMap 
        restaurant={delivery.restaurantLocation.coordinates}
        driver={driverLocation}
        customer={delivery.customerLocation.coordinates}
      />
      <button onClick={() => updateStatus('picked-up')}>Mark as Picked Up</button>
      <button onClick={() => updateStatus('delivered')}>Mark as Delivered</button>
    </div>
  );
}