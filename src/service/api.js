import axios from 'axios';
import { toast } from 'react-toastify';

import { apiRoutes } from '../const/api-routes';

const BACKEND_URL = 'https://app-21days.adaptable.app/';
const BACKEND_URL_DEV = 'http://localhost:5005/';
const REQUEST_TIMEOUT = 5000;

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: REQUEST_TIMEOUT,
});

export const myApi = axios.create({
  baseURL: BACKEND_URL_DEV,
  timeout: REQUEST_TIMEOUT,
});

myApi.getUserInfo = async function () {
  try {
    const { data } = await myApi.get(apiRoutes.Auth);
    return data;
  } catch (error) {
    toast.error(`${error.message}. Try to reload this page.`);
  }
};

myApi.signup = async function (userData) {
  try {
    await myApi.post(apiRoutes.Signup, userData);
  } catch (error) {
    toast.error(`${error.message}. Try to reload this page.`);
  }
};

myApi.login = async function (userData) {
  try {
    const { data } = await myApi.post(apiRoutes.Login, userData);
    return data;
  } catch (error) {
    toast.error(`${error.message}. Try to reload this page.`);
  }
};

myApi.interceptors.request.use((request) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return request;
  }
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

api.fetchAllHabits = async function () {
  try {
    const { data } = await api.get(`${apiRoutes.AllHabits}?_embed=checkins`);
    return data;
  } catch (error) {
    toast.error(`${error.message}. Try to reload this page.`);
  }
};

api.fetchFilteredHabits = async function (filter) {
  try {
    const { data } = await api.get(
      `${apiRoutes.ExploreHabits}?category=${filter}`
    );
    return data;
  } catch (error) {
    toast.error(`${error.message}. Try to reload this page.`);
  }
};

api.fetchOneHabit = async function (id) {
  try {
    const { data } = await api.get(
      `${apiRoutes.AllHabits}/${id}?_embed=checkins`
    );
    return data;
  } catch (error) {
    toast.error(`${error.message}. Try to reload this page.`);
  }
};

api.createNewHabit = async function (habit) {
  try {
    await api.post(apiRoutes.AllHabits, habit);
  } catch (error) {
    toast.warn(`${error.message}. Try again.`);
  }
};

api.createCheckIn = async function (checkin) {
  try {
    await api.post(apiRoutes.AllCheckins, checkin);
  } catch (error) {
    toast.warn(`${error.message}. Try again.`);
  }
};

api.deleteCheckin = async function (id) {
  try {
    await api.delete(`${apiRoutes.AllCheckins}/${id}`);
  } catch (error) {
    toast.warn(`${error.message}. Try again.`);
  }
};

api.editHabit = async function (id, habit) {
  try {
    await api.put(`${apiRoutes.AllHabits}/${id}`, habit);
  } catch (error) {
    toast.warn(`${error.message}. Try again.`);
  }
};

api.deleteHabit = async function (id) {
  try {
    await api.delete(`${apiRoutes.AllHabits}/${id}`);
  } catch (error) {
    toast.warn(`${error.message}. Try again.`);
  }
};

api.fetchGlobalHabits = async function () {
  try {
    const { data } = await api.get(apiRoutes.ExploreHabits);
    return data;
  } catch (error) {
    toast.error(`${error.message}. Try to reload this page.`);
  }
};

export default api;
