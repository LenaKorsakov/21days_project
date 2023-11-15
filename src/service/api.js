import axios from 'axios';
import { toast } from 'react-toastify';

import { apiRoutes } from '../const/api-routes';
import { messageForUser } from '../const/const';

const BACKEND_URL_DEV = 'http://localhost:5005/';
const REQUEST_TIMEOUT = 5000;

export const myApi = axios.create({
  baseURL: BACKEND_URL_DEV,
  timeout: REQUEST_TIMEOUT,
});

myApi.getUserInfo = async function () {
  try {
    const { data } = await myApi.get(apiRoutes.Auth);
    return data;
  } catch (error) {
    toast.error(`${error.message}. Authorisation time expired.`);
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

myApi.createCheckIn = async function (checkin) {
  try {
    await myApi.post(apiRoutes.Checkins, checkin);
  } catch (error) {
    toast.warn(`${error.message}. ${messageForUser.TryAgain}`);
  }
};

myApi.deleteCheckin = async function (checkinId) {
  try {
    await myApi.delete(`${apiRoutes.Checkins}/${checkinId}`);
  } catch (error) {
    toast.warn(`${error.message}. ${messageForUser.TryAgain}`);
  }
};

myApi.deleteAllCheckinsByHabitId = async function (habitId) {
  try {
    await myApi.delete(`${apiRoutes.DeleteAllCheckins}/${habitId}`);
  } catch (error) {
    toast.warn(`${error.message}. ${messageForUser.TryAgain}`);
  }
};

myApi.deleteHabit = async function (id) {
  try {
    await myApi.delete(`${apiRoutes.MyHabits}/${id}`);
  } catch (error) {
    toast.warn(`${error.message}. ${messageForUser.TryAgain}`);
  }
};

myApi.fetchAllGlobalHabits = async function (query) {
  try {
    if (query) {
      const { data } = await myApi.get(`${apiRoutes.GlobalHabits}?${query}`);
      return data;
    } else {
      const { data } = await myApi.get(apiRoutes.GlobalHabits);
      return data;
    }
  } catch (error) {
    toast.error(`${error.message}. ${messageForUser.Reload}`);
  }
};

myApi.createNewHabit = async function (habit) {
  try {
    await myApi.post(apiRoutes.MyHabits, habit);
  } catch (error) {
    toast.warn(`${error.message}. ${messageForUser.TryAgain}`);
  }
};

myApi.editHabit = async function (habitId, habit) {
  try {
    await myApi.put(`${apiRoutes.MyHabits}/${habitId}`, habit);
  } catch (error) {
    toast.warn(`${error.message}. ${messageForUser.TryAgain}`);
  }
};

myApi.fetchAllHabits = async function () {
  try {
    const { data } = await myApi.get(apiRoutes.MyHabits);
    return data;
  } catch (error) {
    toast.error(`${error.message}. ${messageForUser.Reload}`);
  }
};

myApi.fetchOneHabit = async function (habitId) {
  try {
    const { data } = await myApi.get(`${apiRoutes.MyHabits}/${habitId}`);
    return data;
  } catch (error) {
    toast.error(`${error.message}. ${messageForUser.Reload}`);
  }
};

myApi.fetchCheckinsByHabitId = async function (habitId) {
  try {
    const { data } = await myApi.get(`${apiRoutes.Checkins}/${habitId}`);
    return data;
  } catch (error) {
    toast.error(`${error.message}. ${messageForUser.Reload}`);
  }
};

myApi.fetchBookmarks = async function () {
  try {
    const { data } = await myApi.get(apiRoutes.FavoriteHabits);
    return data;
  } catch (error) {
    toast.error(`${error.message}. ${messageForUser.Reload}`);
  }
};

myApi.createNewBookmark = async function (habit) {
  try {
    await myApi.post(apiRoutes.FavoriteHabits, habit);
  } catch (error) {
    toast.warn(`${error.message}. ${messageForUser.TryAgain}`);
  }
};

myApi.deleteBookmark = async function (id) {
  try {
    await myApi.delete(`${apiRoutes.FavoriteHabits}/${id}`);
  } catch (error) {
    toast.warn(`${error.message}. ${messageForUser.TryAgain}`);
  }
};

myApi.fetchCompletedHabits = async function () {
  try {
    const { data } = await myApi.get(apiRoutes.Completed);
    return data;
  } catch (error) {
    toast.error(`${error.message}. ${messageForUser.Reload}`);
  }
};

myApi.addToCompletedHabits = async function (habit) {
  try {
    await myApi.post(apiRoutes.Completed, habit);
  } catch (error) {
    toast.warn(`${error.message}. ${messageForUser.TryAgain}`);
  }
};
