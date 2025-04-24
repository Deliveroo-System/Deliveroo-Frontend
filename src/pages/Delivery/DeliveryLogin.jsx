import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deliveryAPI } from '../../apiDelivery';
import './DeliveryLogin.css'; // Create this for styling

const DeliveryLogin = () => {
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await deliveryAPI.login(credentials);
      localStorage.setItem('driverToken', data.token);
      localStorage.setItem('driverInfo', JSON.stringify(data.driver));
      navigate('/delivery/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="delivery-login-container">
      <h2>Driver Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default DeliveryLogin;