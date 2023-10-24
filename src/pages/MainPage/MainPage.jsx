import { Link } from 'react-router-dom';
import HabitCard from '../../components/HabitCard/HabitCard';
import './MainPage.css';

import { useEffect, useState } from 'react';

import HabitInProgressList from '../../components/HabitInProgress/HabitInProgressList';
import LoadingPage from '../LoadingPage/LoadingPage';

import api from '../../service/api';

import { appRoutes } from '../../const/app-routes';
import { buttonMesage } from '../../const/const';

function MainPage() {
  const [habits, setHabits] = useState();

  const fetchAllHabits = async () => {
    const data = await api.fetchAllHabits();
    setHabits(data);
  };

  const onDeleteButton = async (id) => {
    await api.deleteHabit(id);
    fetchAllHabits();
  };

  useEffect(() => {
    fetchAllHabits();
  }, []);

  if (!habits) {
    return <LoadingPage />;
  }
  return (
    <>
      <main className="MainPage">
        <div className="page-main__container">
          <HabitInProgressList habits={habits} />
          <section className="habits">
            <h2>my habits</h2>
            <ul className="habits__list">
              {habits.map((habit) => {
                return (
                  <HabitCard
                    habit={habit}
                    key={habit.id}
                    onDeleteButton={onDeleteButton}
                  />
                );
              })}
            </ul>
          </section>
          <Link
            className="btn btn--add"
            title="To add habit form"
            to={appRoutes.AddHabit}
          >
            <div>
              {habits.lenth === 0
                ? buttonMesage.FirstHabit
                : buttonMesage.Default}
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}

export default MainPage;
