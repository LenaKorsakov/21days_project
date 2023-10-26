import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { appRoutes } from '../../const/app-routes';
import './HabitCardExplore.css';

function HabitCardExplore({ habit, habits, onCreateNewHabit }) {
  const [myHabit, setMyHabit] = useState(null);

  const findMyHabit = (myHabits) => {
    const oneHabit = myHabits.find((myHabit) => myHabit.title === habit.title);
    setMyHabit(oneHabit);
  };

  useEffect(() => {
    findMyHabit(habits);
  }, [habits]);

  const handleAddToMyHabits = async () => {
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
