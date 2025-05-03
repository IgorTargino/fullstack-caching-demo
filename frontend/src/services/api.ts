import axios from 'axios';
import { CreateUserInterface } from './interfaces/create-user.interface';
import { UpdateUserInterface } from './interfaces/update-user.interface';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error.response?.data || error.message);
    },
);

export const API = {
    getAll: () => api.get('/users'),
    getById: (id: string) => api.get(`/users/${id}`),
    create: (data: CreateUserInterface) => api.post('/users', data),
    update: (id: string, data: UpdateUserInterface) => api.patch(`/users/${id}`, data),
    delete: (id: string) => api.delete(`/users/${id}`),
};
