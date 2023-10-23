import { Link } from 'react-router-dom';
import HabitCard from '../../components/HabitCard/HabitCard';
import HabitInProgress from '../../components/HabitInProgress/HabitInProgress';
import './MainPage.css';
import { appRoutes } from '../../const/app-routes';
import Footer from '../../components/Footer/Footer';
import { useState } from 'react';
import api from '../../service/api';
import { useEffect } from 'react';

function MainPage() {
  const [habits, setHabits] = useState();

  const fetchAllHabits = async () => {
    const data = await api.fetchAllHabits();
    setHabits(data);
  };

  useEffect(() => {
    fetchAllHabits();
  }, []);

  console.log(habits);

  return (
    <>
      <main className="MainPage">
        <div className="page-main__container">
          <HabitInProgress />
          <section className="habits">
            <h2>my habits</h2>
            <ul className="habits__list">
              <HabitCard />
              <HabitCard />
              <HabitCard />
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
