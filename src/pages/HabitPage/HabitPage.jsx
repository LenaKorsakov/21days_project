import './HabitPage.css';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

import { myApi } from '../../service/api';

import LoadingPage from '../LoadingPage/LoadingPage';
import Days from '../../components/Days/Days';
import Footer from '../../components/Footer/Footer';

function HabitPage() {
  const [habit, setHabit] = useState(null);
  const [misses, setMisses] = useState(0);
  const [daysInRow, setDaysInRow] = useState(0);
  const [checkins, setCheckins] = useState(null);
  const { habitId } = useParams();

  const fetchCheckins = async () => {
    const data = await myApi.fetchCheckinsByHabitId(habitId);
    setCheckins(data);
  };

  const onChangeMisses = (myMisses) => {
    setMisses(myMisses);
  };

  const onChangeDaysInRow = (myDaysInRow) => {
    setDaysInRow(myDaysInRow);
  };

  const fetchOneHabit = async () => {
    const data = await myApi.fetchOneHabit(habitId);
    setHabit(data);
  };

  useEffect(() => {
    fetchOneHabit();
    fetchCheckins();
  }, []);

  if (!habit || !checkins) {
    return <LoadingPage />;
  }
  return (
    <>
      <main className="HabitPage">
        <div className="container">
          <div className="habit-page__content">
            <h1 className="habit-page__title">{habit.title}</h1>
            <small className="habit-page__type">
              You want to {habit.type} this habit
            </small>
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
                  {daysInRow} <span>days streak </span>
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
                  fetchCheckins={fetchCheckins}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default HabitPage;
