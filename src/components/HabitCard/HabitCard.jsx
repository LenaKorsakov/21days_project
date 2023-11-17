import './HabitCard.css';

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { appRoutes } from '../../const/app-routes';
import { AMOUNT_OF_DAYS, buttonMesage, habitType } from '../../const/const';
import { debounce } from 'lodash';
import { myApi } from '../../service/api';
import LoadingPage from '../../pages/LoadingPage/LoadingPage';

dayjs.extend(isToday);

function HabitCard({
  habit,
  onDeleteButton,
  onCompleteButton,
  onUncompleteButton,
}) {
  const [wasCompletedToday, setWasCompletedToday] = useState(false);
  const [checkins, setCheckins] = useState(null);

  const findTodayCheckin = (myCheckins) => {
    const todayCheckin = myCheckins.find((checkin) =>
      dayjs(checkin.date).isToday()
    );

    return todayCheckin;
  };

  const firstDayOfHabit = dayjs(habit.start_day);
  const lastDayOfHabit = firstDayOfHabit.add(AMOUNT_OF_DAYS - 1, 'day');

  const checkIsTodayAfterLastDayOfHabit = () => {
    const isAfterLastDay = dayjs().isAfter(lastDayOfHabit, 'day');

    if (isAfterLastDay) {
      return true;
    }
  };

  const checkIsTodayWasCheckin = (checkins) => {
    if (checkins.length === 0) {
      setWasCompletedToday(false);
    } else {
      const todayCheckin = findTodayCheckin(checkins);

      if (todayCheckin) {
        setWasCompletedToday(true);
      } else {
        setWasCompletedToday(false);
      }
    }
  };

  const fetchCheckins = async () => {
    const data = await myApi.fetchCheckinsByHabitId(habit._id);
    setCheckins(data);
    checkIsTodayWasCheckin(data);
  };

  useEffect(() => {
    fetchCheckins();
  }, [habit]);

  const handleCompleteButton = async () => {
    if (wasCompletedToday) {
      const lastCheckinId = findTodayCheckin(checkins)._id;
      await onUncompleteButton(lastCheckinId);
      await fetchCheckins();
    } else {
      await onCompleteButton(habit._id);
      await fetchCheckins();
    }
  };

  const handleCompleteButtonDebonced = debounce(
    async () => await handleCompleteButton(),
    500
  );

  if (!checkins) {
    return <LoadingPage />;
  }

  return (
    <li
      className={`HabitCard ${
        habit.type === habitType.Build ? 'habit-build' : 'habit-quit'
      }`}
    >
      <div className="habit__type">
        <Link to={`${appRoutes.Habit}/${habit._id}`} title="To the habit page">
          <span className="habit__emoji">{habit.emoji}</span>
        </Link>
      </div>
      <Link
        className="link"
        to={`${appRoutes.Habit}/${habit._id}`}
        title="To the habit page"
      >
        <h3 className={`habit__title ${wasCompletedToday ? 'completed' : ''}`}>
          {habit.title}
        </h3>
      </Link>
      {!checkIsTodayAfterLastDayOfHabit() && (
        <button
          className={`btn ${
            wasCompletedToday ? 'btn--uncomplete' : 'btn--complete'
          }`}
          onClick={handleCompleteButtonDebonced}
        >
          {wasCompletedToday
            ? buttonMesage.Uncompleted
            : buttonMesage.Completed}
        </button>
      )}
      <Link
        className="btn btn--edit"
        to={`${appRoutes.EditHabit}/${habit._id}`}
        title="To the edit page"
      >
        <span>
          <svg
            style={{ width: '2vh' }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </span>
      </Link>
      <button
        className="btn btn--delete"
        onClick={() => onDeleteButton(habit._id)}
      >
        <span>
          <svg
            style={{ width: '2vh' }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </span>
      </button>
    </li>
  );
}

export default HabitCard;
