import './HabitInProgressRow.css';

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useEffect, useState } from 'react';

import { AMOUNT_OF_DAYS } from '../../../const/const';
import { myApi } from '../../../service/api';

dayjs.extend(isToday);

function HabitInProgressRow({ habit, onDeleteButton, onStartAgain }) {
  const [isLastDayOfHabit, setLastDayOfHabit] = useState(false);
  const [isStartAgain, setStartAgain] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkins, setCheckins] = useState([]);

  const fetchCheckins = async () => {
    const data = await myApi.fetchCheckinsByHabitId(habit._id);
    setCheckins(data);
  };

  const myProgress = checkins.length;

  const countProgressInPercent = () => {
    if (myProgress === AMOUNT_OF_DAYS) {
      return 100;
    } else {
      return (myProgress / AMOUNT_OF_DAYS) * 100;
    }
  };

  const firstDayOfHabit = dayjs(habit.start_day);
  const lastDayOfHabit = firstDayOfHabit.add(AMOUNT_OF_DAYS - 1, 'day');

  const evaluateProgress = () => {
    const progressIShouldHave = Math.round(
      dayjs().diff(firstDayOfHabit) / (1000 * 60 * 60 * 24)
    );
    if (progressIShouldHave === 0) {
      return 100;
    }
    return (myProgress / progressIShouldHave) * 100;
  };

  const getProgressColor = () => {
    const progress = evaluateProgress();

    if (progress >= 70) {
      return 'var(--light-green)';
    } else if (progress >= 40) {
      return 'var(--yellow)';
    } else if (progress >= 20) {
      return 'var(--orange)';
    } else {
      return 'var(--red)';
    }
  };

  const colorForProgressRow = getProgressColor();

  const checkIsTodayLastDayOfHabit = () => {
    const isLastDay = dayjs(lastDayOfHabit).isToday();
    const isAfterLastDay = dayjs().isAfter(lastDayOfHabit, 'day');

    if (isLastDay || isAfterLastDay) {
      setLastDayOfHabit(true);
    }
  };

  useEffect(() => {
    checkIsTodayLastDayOfHabit();
    fetchCheckins();
  }, [habit]);

  const handleStartAgain = async () => {
    const newHabit = {
      ...habit,
      start_day: new Date().toJSON(),
    };
    await onStartAgain(habit._id, newHabit);

    setStartAgain(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setLastDayOfHabit(false);
    }, 1500);
  };

  const handleDeleteHabit = async () => {
    await myApi.addToCompletedHabits(habit);
    await onDeleteButton(habit._id);
  };

  return (
    <div className="HabitInProgressRow">
      {isLastDayOfHabit ? (
        <>
          <div className="table-data">
            <span>{habit.emoji}</span>
          </div>
          <div className="table-data progress">
            {isStartAgain ? (
              <h3>Let's make a strong habit together...</h3>
            ) : (
              <h3>
                <span className="table-data--important">{habit.title}</span>{' '}
                should have become your habit 🎉 You did it{' '}
                <span className="table-data--important">{myProgress}</span>{' '}
                times in{' '}
                <span className="table-data--important">{AMOUNT_OF_DAYS}</span>{' '}
                days.
              </h3>
            )}
          </div>
          <div className="table-data buttons_container">
            <button className="btn--start" onClick={handleStartAgain}>
              {isLoading ? 'Starting again...' : 'Start again?'}
            </button>
            <button className="btn--delete" onClick={handleDeleteHabit}>
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
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="table-data">
            <span className="table-data__emoji">{habit.emoji}</span>
          </div>
          <div className="table-data progress">
            <span>
              <span
                className="table-date__progress"
                style={{
                  background: colorForProgressRow,
                  width: `${countProgressInPercent()}%`,
                }}
              ></span>
            </span>
          </div>
          <div className="table-data">
            <span className="important">{myProgress}</span>/{AMOUNT_OF_DAYS}
          </div>
        </>
      )}
    </div>
  );
}

export default HabitInProgressRow;
