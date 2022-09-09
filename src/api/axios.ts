import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const getRefreshToken = async () =>
  await axios.get('http://localhost:4000/auth/refresh', {
    withCredentials: true,
  });

apiClient.interceptors.response.use(
  // eslint-disable-next-line
  // @ts-ignore
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.message as string;

    if (errMessage.includes('Unauthorized') && !originalRequest._retry) {
      originalRequest._retry = true;
      await getRefreshToken();

      return apiClient(originalRequest);
    }
    return Promise.reject(error);
  }
);
