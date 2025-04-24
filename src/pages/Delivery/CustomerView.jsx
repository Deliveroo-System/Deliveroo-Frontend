import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import DeliveryMap from '../components/DeliveryMap';

export default function CustomerView() {
  const { orderId } = useParams();
  const [delivery, setDelivery] = useState(null);

  useEffect(() => {
    const fetchDelivery = async () => {
      const { data } = await api.get(`/deliveries/order/${orderId}`);
      setDelivery(data);
    };
    fetchDelivery();
  }, [orderId]);

  if (!delivery) return <div>Loading...</div>;

  return (
    <div>
      <h2>Order #{orderId}</h2>
      <p>Status: {delivery.status}</p>
      <DeliveryMap 
        restaurant={delivery.restaurantLocation.coordinates}
        driver={delivery.driverLocation?.coordinates || [0, 0]}
        customer={delivery.customerLocation.coordinates}
      />
    </div>
  );
} 