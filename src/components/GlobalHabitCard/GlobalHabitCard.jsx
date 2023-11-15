import './GlobalHabitCard.css';

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { appRoutes } from '../../const/app-routes';

function GlobalHabitCard({
  habit,
  habits,
  onCreateNewHabit,
  bookmarks,
  onCreateNewBookmark,
  onDeleteFromBookmarks,
}) {
  const [myHabit, setMyHabit] = useState(null);
  const [isInBookmarks, setIsInBookmarks] = useState(false);
  const { category, description, emoji, title, type } = habit;

  const findMyHabit = (myHabits) => {
    const oneHabit = myHabits.find((myHabit) => myHabit.title === habit.title);
    setMyHabit(oneHabit);
  };

  const checkCurrentHabitInBookmarks = (bookmarks) => {
    const isInBookmarks = bookmarks.some(
      (bookmark) => bookmark.title === habit.title
    );
    setIsInBookmarks(isInBookmarks);
  };

  useEffect(() => {
    findMyHabit(habits);
    checkCurrentHabitInBookmarks(bookmarks);
  }, [habits]);

  const handleBookmarkClick = async () => {
    if (isInBookmarks) {
      const bookmarkId = bookmarks.find(
        (bookmark) => bookmark.title === habit.title
      )._id;

      await onDeleteFromBookmarks(bookmarkId);
      setIsInBookmarks(false);
    } else {
      await onCreateNewBookmark({ category, description, emoji, title, type });
      setIsInBookmarks(true);
    }
  };

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
    <div
      className={`GlobalHabitCard ${
        habit.type === 'quit'
          ? 'GlobalHabitCard--quit'
          : 'GlobalHabitCard--build'
      }`}
    >
      {!myHabit && (
        <button className="habit__favorite_btn" onClick={handleBookmarkClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className={`w-6 h-6 ${isInBookmarks ? 'active' : ''}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        </button>
      )}

      <div className="habit-img__wrapper">
        <div className="container container--emoji">
          <span>{emoji}</span>
        </div>
      </div>

      <div className="habit-card__content">
        <h3 className={`habit__title ${type === 'quit' ? 'quit' : 'build'}`}>
          <span className="habit__type">To {type}: </span>
          {title}
        </h3>
        <p className="habit__description">{description}</p>
      </div>
      {!myHabit ? (
        <button className="btn btn--add" onClick={handleAddToMyHabits}>
          Add to my habits
        </button>
      ) : (
        <button className="btn btn--add btn--pink">
          <Link
            to={`${appRoutes.Habit}/${myHabit._id}`}
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
