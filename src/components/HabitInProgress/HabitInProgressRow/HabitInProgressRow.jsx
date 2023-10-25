import './HabitInProgressRow.css';

import dayjs from 'dayjs';
import * as isToday from 'dayjs/plugin/isToday';
import { useState } from 'react';

import { AMOUNT_OF_DAYS } from '../../../const/const';

dayjs.extend(isToday);

function HabitInProgressRow({ habit, onDeleteButton, onStartAgain }) {
  const [isLastDay, setLastDay] = useState(false);

  const myProgress = habit.checkins.length;
  const progressInPercent = (myProgress / AMOUNT_OF_DAYS) * 100;

  const firstDayOfHabit = dayjs(habit.start_day);
  const lastDayOfHabit = firstDayOfHabit.add(AMOUNT_OF_DAYS, 'day');

  const checkIsTodayLastDayOfHabit = () => {
    const isLastDay = dayjs(lastDayOfHabit).isToday();
    const isAfterLastDay = dayjs().isAfter(lastDayOfHabit, 'day');

    if (isLastDay || isAfterLastDay) {
      setLastDay(true);
    }
  };

  useState(() => {
    checkIsTodayLastDayOfHabit();
  }, []);

  const handleStartAgain = () => {
    const newHabit = {
      title: habit.title,
      category: habit.category,
      description: habit.description,
      emoji: habit.emoji,
      start_day: new Date().toJSON(),
    };
    onStartAgain(habit.id, newHabit);
  };

  return (
    <div className="HabitInProgressRow">
      {isLastDay ? (
        <>
          <div className="table-data">
            <span>{habit.emoji}</span>
          </div>
          <div className="table-data progress">
            <h3>{`${habit.title} should have become your habit! You did it ${myProgress} times in 21 days.`}</h3>
          </div>
          <div className="table-data buttons_container">
            <button className="btn btn--start" onClick={handleStartAgain}>
              Start again?
            </button>
            <button
              className="btn btn--delete"
              onClick={() => onDeleteButton(habit.id)}
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
          </div>
        </>
      ) : (
        <>
          <div className="table-data">
            <span>{habit.emoji}</span>
          </div>
          <div className="table-data progress">
            <span>
              <span
                className="table-date__progress"
                style={{
                  width: `${progressInPercent}%`,
                }}
              ></span>
            </span>
          </div>
          <div className="table-data">{myProgress}/21</div>
        </>
      )}
    </div>
  );
}

export default HabitInProgressRow;
