import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function PaymentPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('paypal');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const paymentData = {
        totalAmount: parseFloat(amount),
        currency,
        paymentMethod: method,
      };

      if (method === 'paypal') {
        const res = await axios.post('http://localhost:5212/api/payments/pay/paypal', paymentData);
        const approvalUrl = res.data.approvalUrl;
        if (approvalUrl) {
          Swal.fire({
            icon: 'success',
            title: 'Redirecting to PayPal',
            text: 'Please complete your payment on PayPal',
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = approvalUrl;
          });
        } else {
          Swal.fire('Error', 'Failed to get approval URL', 'error');
        }
      } else if (method === 'cod') {
        const res = await axios.post('http://localhost:5212/api/payments/pay/cod', paymentData);
        Swal.fire({
          icon: 'success',
          title: 'Cash on Delivery',
          text: 'COD Payment successfully initiated!',
        }).then(() => navigate('/payment-success'));
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Payment Failed', err?.response?.data?.message || 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>💳 Make a Payment</h1>
        <div style={styles.form}>
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
          />

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={styles.input}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
          </select>

          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="paypal"
                checked={method === 'paypal'}
                onChange={() => setMethod('paypal')}
                style={styles.radioInput}
              />
              <span>Pay with PayPal 🅿️</span>
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="cod"
                checked={method === 'cod'}
                onChange={() => setMethod('cod')}
                style={styles.radioInput}
              />
              <span>Cash on Delivery 💵</span>
            </label>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: loading ? '#999' : '#4f46e5',
            }}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    padding: '20px',
  },
  container: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '40px 30px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    marginBottom: '25px',
    fontWeight: '600',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    color: '#333',
  },
  radioInput: {
    transform: 'scale(1.2)',
  },
  button: {
    padding: '14px',
    fontSize: '16px',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
