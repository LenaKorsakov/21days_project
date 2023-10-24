import { Link } from 'react-router-dom';
import './HabitCard.css';
import { appRoutes } from '../../const/app-routes';
import { useEffect, useState } from 'react';
import api from '../../service/api';
import dayjs from 'dayjs';
import * as isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

function HabitCard({
  habit,
  onDeleteButton,
  onCompleteButton,
  onUncompleteButton,
}) {
  const [wasCompletedToday, setWasCompletedToday] = useState(false);
  const [checkins, setCheckins] = useState(habit.checkins);

  const checkIsTodayWasCheckin = () => {
    if (habit.checkins.length === 0) {
      setWasCompletedToday(false);
    } else {
      const lastCheckinDate = new Date(checkins[checkins.length - 1].date);
      const wasCheckinToday = dayjs(lastCheckinDate).isToday();

      if (wasCheckinToday) {
        setWasCompletedToday(true);
      } else {
        setWasCompletedToday(false);
      }
    }
  };

  useEffect(() => {
    checkIsTodayWasCheckin();
  }, []);

  const fetchCheckins = async (id) => {
    const data = await api.fetchOneHabit(id);
    setCheckins(data.checkins);
  };

  const deleteLastCheckin = async () => {
    const lastCheckinId = checkins[checkins.length - 1].id;
    await api.deleteCheckin(lastCheckinId);
  };

  const handleCompleteButton = () => {
    if (wasCompletedToday) {
      deleteLastCheckin();
      setWasCompletedToday(!wasCompletedToday);
      fetchCheckins(habit.id);
      onUncompleteButton();
    } else {
      onCompleteButton(habit.id);
      setWasCompletedToday(!wasCompletedToday);
      fetchCheckins(habit.id);
    }
  };

  return (
    <li className="HabitCard">
      <div className="habit__type">
        <span>{habit.emoji}</span>
      </div>
      <Link
        className="link"
        to={`${appRoutes.Habit}/${habit.id}`}
        title="To the habit page"
      >
        <h3 className={`habit__title ${wasCompletedToday ? 'completed' : ''}`}>
          {habit.title}
        </h3>
      </Link>
      <button
        className={`btn ${
          wasCompletedToday ? 'btn--uncomplete' : 'btn--complete'
        }`}
        onClick={handleCompleteButton}
      >
        {wasCompletedToday ? 'Uncomplete today' : 'Complete today'}
      </button>
      <Link
        className="btn btn--edit"
        to={`${appRoutes.EditHabit}/${habit.id}`}
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
      <button className="btn--delete" onClick={() => onDeleteButton(habit.id)}>
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
