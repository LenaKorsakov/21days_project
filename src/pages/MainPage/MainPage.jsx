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
  const [habits, setHabits] = useState(null);

  const fetchAllHabits = async () => {
    const data = await api.fetchAllHabits();
    setHabits(data);
  };

  const onDeleteButton = async (id) => {
    await api.deleteHabit(id);
    fetchAllHabits();
  };

  const onCompleteButton = async (id) => {
    const date = new Date().toJSON();
    const dateObj = {
      my_habitId: id,
      date: date,
    };

    await api.createCheckIn(dateObj);
    fetchAllHabits();
  };

  const onUncompleteButton = async (id) => {
    await api.deleteCheckin(id);
    fetchAllHabits();
  };

  const deleteCheckin = async (id) => {
    await api.deleteCheckin(id);
  };

  const clearAllCheckins = async (habit) => {
    if (habit.checkins) {
      for (const checkin of habit.checkins) {
        await deleteCheckin(checkin.id);
      }
    }
  };

  const onStartHabitAgain = async (id, habit) => {
    await api.editHabit(id, habit);
    await clearAllCheckins(habit);
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
            <h2>my habits</h2>
            <ul className="habits__list">
              {habits.map((habit) => {
                return (
                  <HabitCard
                    habit={habit}
                    key={habit.id}
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
              {habits.lenth === 0
                ? buttonMesage.FirstHabit
                : buttonMesage.Default}
            </div>
          </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;
