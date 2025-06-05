import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      }
      throw error;
    }
  },
  
  async signup(userData: any) {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Signup failed');
      }
      throw error;
    }
  },
  
  async validateToken(token: string) {
    try {
      const response = await axios.get(`${API_URL}/validate-token`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Token validation failed');
      }
      throw error;
    }
  }
};