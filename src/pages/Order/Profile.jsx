import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/apiOrder';
import NavBar from "../../components/common/headerlanding";
import Footer from "../../components/common/footerLanding";

export default function Profile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get JWT token and decode it to get user information
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to view profile');
      navigate('/login');
      return;
    }

    try {
      // Decode JWT token to get user info
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decodedToken = JSON.parse(jsonPayload);
      
      // Set user information from token
      setUser({
        name: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      });
    } catch (err) {
      setError('Error decoding user information');
    }
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.updateUser(user);
      localStorage.setItem('user', JSON.stringify(response));
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await authService.deleteUser();
        localStorage.clear();
        navigate('/login');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (error) {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="p-8 bg-white rounded-xl shadow-lg border border-red-100">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700">{error}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
               
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-rand text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleUpdate}>
  <div className="space-y-6">
  <div className="flex items-center justify-between mb-6">
  <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
  {!isEditing && (
    <button
      onClick={() => setIsEditing(true)}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Edit Profile
    </button>
  )}
</div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Email</label>
      {isEditing ? (
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
        />
      ) : (
        <p className="mt-1 text-lg text-gray-900">{user.email}</p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Role</label>
      <p className="mt-1 text-lg text-gray-900 capitalize">{user.role}</p>
    </div>

    {isEditing && (
      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    )}
  </div>
</form>

            <div className="mt-8 pt-6 border-t">
              <button
                onClick={handleDelete}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}