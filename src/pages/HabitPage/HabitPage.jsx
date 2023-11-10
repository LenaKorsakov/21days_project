import './HabitPage.css';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

import { myApi } from '../../service/api';

import LoadingPage from '../LoadingPage/LoadingPage';
import Days from '../../components/Days/Days';

function HabitPage() {
  const [habit, setHabit] = useState(null);
  const [misses, setMisses] = useState(0);
  const [daysInRow, setDaysInRow] = useState(0);
  const [checkins, setCheckins] = useState([]);

  const { habitId } = useParams();

  const fetchCheckins = async () => {
    const data = await myApi.fetchCheckinsByHabitId(habitId);
    setCheckins(data);
  };

  const onChangeMisses = (mymisses) => {
    setMisses(mymisses);
  };

  const onChangeDaysInRow = (mydaysinrow) => {
    setDaysInRow(mydaysinrow);
  };

  const fetchOneHabit = async () => {
    const data = await myApi.fetchOneHabit(habitId);
    setHabit(data);
  };

  useEffect(() => {
    fetchOneHabit();
    fetchCheckins();
  }, []);

  if (!habit) {
    return <LoadingPage />;
  }

  return (
    <main className="HabitPage">
      <div className="container">
        <div className="habit-page__content">
          <h1 className="habit-page__title">{habit.title}</h1>
          <div className="habit-page__emoji">
            <span>{habit.emoji}</span>
          </div>
          <div className="habit-page__info-wrapper">
            <p className="habit-page__category">Category: {habit.category}</p>
            <p className="habit-page__description">{habit.description}</p>
          </div>
          <div className="habit-page__bottom">
            <div className="habit-page__stats-wrapper">
              <p className="habit-page__streak">
                <span>Days in the row: </span>
                {daysInRow}
              </p>
              <p className="habit-page__misses">
                <span>Misses:</span> {misses}
              </p>
            </div>

            <h2 className="habit-page__title habit-page__title--dark">
              Daily Progress
            </h2>
            <div className="calendar">
              <Days
                habit={habit}
                checkins={checkins}
                onChangeMisses={onChangeMisses}
                onChangeDaysInRow={onChangeDaysInRow}
                fetchOneHabit={fetchOneHabit}
                fetchCheckins={fetchCheckins}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HabitPage;
