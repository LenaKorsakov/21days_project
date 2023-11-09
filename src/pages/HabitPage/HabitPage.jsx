import './HabitPage.css';
import { useParams } from 'react-router-dom';
import api from '../../service/api';
import { useEffect } from 'react';
import { useState } from 'react';
import LoadingPage from '../LoadingPage/LoadingPage';
import dayjs from 'dayjs';
import Days from '../../components/Days/Days';

function HabitPage() {
  const [habit, setHabit] = useState(null);
  const [misses, setMisses] = useState(0);
  const [daysInRow, setDaysInRow] = useState(0);
  const { habitId } = useParams();

  const onChangeMisses = (mymisses) => {
    setMisses(mymisses);
  };

  const onChangeDaysInRow = (mydaysinrow) => {
    setDaysInRow(mydaysinrow);
  };

  useEffect(() => {
    fetchOneHabit();
  }, []);

  const fetchOneHabit = async () => {
    const data = await api.fetchOneHabit(habitId);
    setHabit(data);
  };

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
          <div className="habit-page__botton">
            <div className="habit-page__stats-wrapper">
              <p className="habit-page__streak">
                <span>Days in the row: </span>
                {daysInRow}
              </p>
              <p className="habit-page__misses">
                <span>Misses:</span> {misses}
              </p>
            </div>

            <h2>Daily Progress</h2>
            <div className="calendar">
              <Days
                habit={habit}
                onChangeMisses={onChangeMisses}
                onChangeDaysInRow={onChangeDaysInRow}
                fetchOneHabit={fetchOneHabit}
              />
            </div>
            {/* <button className="btn">Complete today</button> */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default HabitPage;
