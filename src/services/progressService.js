import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/progress';

export const getProgressByUser = (userId) => {
    return axios.get(`${API_BASE_URL}/user/${userId}`);
};

export const createProgress = (progress) => {
    return axios.post(API_BASE_URL, progress);
};

export const updateProgress = (id, progress) => {
    return axios.put(`${API_BASE_URL}/${id}`, progress);
};

export const deleteProgress = (id) => {
    return axios.delete(`${API_BASE_URL}/${id}`);
};
