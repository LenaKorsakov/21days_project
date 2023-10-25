import { Link } from 'react-router-dom';
import './HabitCardExplore.css';
import { useEffect, useState } from 'react';
import { appRoutes } from '../../const/app-routes';

function HabitCardExplore({ habit, habits, onCreateNewHabit }) {
  const [myHabit, setMyHabit] = useState(null);

  const findMyHabit = (myHabits) => {
    const oneHabit = myHabits.find((myHabit) => myHabit.title === habit.title);
    setMyHabit(oneHabit);
  };

  useEffect(() => {
    findMyHabit(habits);
  }, []);

  const handleAddToMyHabits = () => {
    const newHabit = {
      ...habit,
      start_day: new Date().toJSON(),
    };
    onCreateNewHabit(newHabit);
    findMyHabit(habits);
  };

  return (
    <div className="HabitCardExplore">
      <div className="habit-img__wrapper">
        <div className="container container--emoji">
          <span>{habit.emoji}</span>
        </div>
      </div>

      <div className="habit-card__content">
        <h3 className="habit__title">{habit.title}</h3>
        <p className="habit__description">{habit.description}</p>
      </div>
      {!myHabit ? (
        <button className="btn btn--add" onClick={handleAddToMyHabits}>
          Add to my habits
        </button>
      ) : (
        <button className="btn btn--add btn--pink">
          <Link
            className="link"
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

export default HabitCardExplore;
