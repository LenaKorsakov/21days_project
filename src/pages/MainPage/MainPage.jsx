import { Link } from 'react-router-dom';
import HabitCard from '../../components/HabitCard/HabitCard';
import './MainPage.css';

import { useState } from 'react';
import { useEffect } from 'react';

import HabitInProgress from '../../components/HabitInProgress/HabitInProgress';
import Footer from '../../components/Footer/Footer';
import LoadingPage from '../LoadingPage/LoadingPage';

import api from '../../service/api';

import { appRoutes } from '../../const/app-routes';

function MainPage() {
  const [habits, setHabits] = useState();

  const fetchAllHabits = async () => {
    const data = await api.fetchAllHabits();
    setHabits(data);
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
          <HabitInProgress />
          <section className="habits">
            <h2>my habits</h2>
            <ul className="habits__list">
              {habits.map((habit) => {
                return <HabitCard habit={habit} key={habit.id} />;
              })}
            </ul>
          </section>
          <Link
            className="btn btn--add"
            title="To add habit form"
            to={appRoutes.AddHabit}
          >
            <div>Create New Habit</div>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MainPage;
