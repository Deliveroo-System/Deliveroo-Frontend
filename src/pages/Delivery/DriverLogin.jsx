import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/apiDelivery';

export default function DriverLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login({ email, password });
      if(response){
        localStorage.setItem("token", response.token);
        localStorage.setItem("driverId",response.driver.id)
      }
      alert('Login successful!');
      console.log('Token:', response.token);
  navigate('/delivery');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h1>Driver Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
