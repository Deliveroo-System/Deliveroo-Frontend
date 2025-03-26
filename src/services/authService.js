// src/services/authService.js
import apiClient from './apiClient';

export const login = async (loginDto) => {
  const response = await apiClient.post('/login', loginDto);
  return response.data;  // Assuming the backend returns { Token, Role }
};
