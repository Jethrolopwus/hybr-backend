// lib/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Dashboard data
export const fetchDashboardData = async (timeframe: string) => {
  const response = await apiClient.get(`/dashboard?timeframe=${timeframe}`);
  return response.data;
};

// Innovation projects
export const fetchProjects = async (filters = {}) => {
  const response = await apiClient.get('/projects', { params: filters });
  return response.data;
};

export const fetchProjectById = async (id: string) => {
  const response = await apiClient.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (projectData: any) => {
  const response = await apiClient.post('/projects', projectData);
  return response.data;
};

export const updateProject = async (id: string, projectData: any) => {
  const response = await apiClient.put(`/projects/${id}`, projectData);
  return response.data;
};

// Innovation metrics
export const fetchMetrics = async (params = {}) => {
  const response = await apiClient.get('/metrics', { params });
  return response.data;
};

// Innovation ideas
export const fetchIdeas = async (filters = {}) => {
  const response = await apiClient.get('/ideas', { params: filters });
  return response.data;
};

export const submitIdea = async (ideaData: any) => {
  const response = await apiClient.post('/ideas', ideaData);
  return response.data;
};

// Team performance
export const fetchTeamPerformance = async (params = {}) => {
  const response = await apiClient.get('/teams/performance', { params });
  return response.data;
};

// Auth
export const login = async (credentials: { email: string; password: string }) => {
  const response = await apiClient.post<{ token: string }>('/auth/login', credentials);
  localStorage.setItem('authToken', response.data.token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('authToken');
};

export const register = async (userData: any) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};