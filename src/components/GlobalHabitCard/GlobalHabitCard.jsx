import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { appRoutes } from '../../const/app-routes';
import './GlobalHabitCard.css';
import { useAuth } from '../AuthContextWrapper/AuthContextWrapper';
import { authorizationStatus } from '../../const/const';

function GlobalHabitCard({ habit, habits, onCreateNewHabit }) {
  const [myHabit, setMyHabit] = useState(null);
  const { authStatus } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const findMyHabit = (myHabits) => {
    const oneHabit = myHabits.find((myHabit) => myHabit.title === habit.title);
    setMyHabit(oneHabit);
  };

  useEffect(() => {
    findMyHabit(habits);
  }, [habits]);

  const handleAddToMyHabits = async () => {
    if (authStatus === authorizationStatus.NoAuth) {
      navigate(appRoutes.Login, { state: { from: location } });
      return;
    }

    const newHabit = {
      title: habit.title,
      category: habit.category,
      description: habit.description,
      emoji: habit.emoji,
      start_day: new Date().toJSON(),
    };
    await onCreateNewHabit(newHabit);
  };

  return (
    <div
      className={`GlobalHabitCard ${
        habit.type === 'quit'
          ? 'GlobalHabitCard--quit'
          : 'GlobalHabitCard--build'
      }`}
    >
      <div className="habit-img__wrapper">
        <div className="container container--emoji">
          <span>{habit.emoji}</span>
        </div>
      </div>

      <div className="habit-card__content">
        <h3 className="habit__title">{`To ${habit.type}: ${habit.title}`}</h3>
        <p className="habit__description">{habit.description}</p>
      </div>
      {!myHabit ? (
        <button className="btn btn--add" onClick={handleAddToMyHabits}>
          Add to my habits
        </button>
      ) : (
        <button className="btn btn--add btn--pink">
          <Link
            to={`${appRoutes.Habit}/${myHabit.id}`}
            title="To the habit page"
          >
            Go to the habit
          </Link>
        </button>
      )}
    </div>
  );
}

export default GlobalHabitCard;
