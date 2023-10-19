import axios from 'axios';
import { toast } from 'react-toastify';

import { shouldDisplayError } from '../utiles/utiles';
import { apiRoutes } from '../const/api-routes';

const BACKEND_URL = 'https://app-21days.adaptable.app/';
const REQUEST_TIMEOUT = 5000;

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: REQUEST_TIMEOUT,
});

api.fetchAllQuests = async function () {
  try {
    const { data } = await api.get(apiRoutes.Habits);
    return data;
  } catch (error) {
    console.log(error);
  }
};

api.fetchOneHabit = async function (id) {
  try {
    const { data } = await api.get(`/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

api.createNewHabit = async function (habit) {
  try {
    await api.post(apiRoutes.Habits, habit);
  } catch (error) {
    console.log(error);
  }
};

api.editHabit = async function (id, habit) {
  try {
    await api.put(`/${id}`, habit);
  } catch (error) {
    console.log(error);
  }
};

api.deleteHabit = async function (id) {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.log(error);
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && shouldDisplayError(error.response)) {
      toast.warn(`${error.response.data.error}`);
    }

    throw error;
  }
);

export default api;
