import './MainPage.css';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

import HabitCard from '../../components/HabitCard/HabitCard';
import HabitInProgressList from '../../components/HabitInProgress/HabitInProgressList';
import LoadingPage from '../LoadingPage/LoadingPage';
import Footer from '../../components/Footer/Footer';

import { myApi } from '../../service/api';

import { appRoutes } from '../../const/app-routes';
import { buttonMesage } from '../../const/const';

function MainPage() {
  const [habits, setHabits] = useState(null);

  const fetchAllHabits = async () => {
    const data = await myApi.fetchAllHabits();
    setHabits(data);
  };

  const onDeleteButton = async (id) => {
    await myApi.deleteHabit(id);
    fetchAllHabits();
  };

  const onCompleteButton = async (id) => {
    await myApi.createCheckIn({
      habit: id,
      date: new Date().toJSON(),
    });
    fetchAllHabits();
  };

  const onUncompleteButton = async (id) => {
    await myApi.deleteCheckin(id);
    fetchAllHabits();
  };

  const clearAllCheckins = async (habitId) => {
    await myApi.deleteAllCheckinsByHabitId(habitId);
  };

  const onStartHabitAgain = async (id, habit) => {
    await myApi.editHabit(id, habit);
    await clearAllCheckins(habit._id);
    await fetchAllHabits();
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
          <HabitInProgressList
            habits={habits}
            onDeleteButton={onDeleteButton}
            onStartAgain={onStartHabitAgain}
          />
          <div className="page-main__decoration">
            <section className="habits">
              <h2>My habits</h2>
              <ul className="habits__list">
                {habits.map((habit) => {
                  return (
                    <HabitCard
                      habit={habit}
                      key={habit._id}
                      onDeleteButton={onDeleteButton}
                      onCompleteButton={onCompleteButton}
                      onUncompleteButton={onUncompleteButton}
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
                {habits.length === 0
                  ? buttonMesage.FirstHabit
                  : buttonMesage.Default}
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MainPage;
