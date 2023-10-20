import { Link } from 'react-router-dom';
import './HabitCard.css';
import { appRoutes } from '../../const/app-routes';

function HabitCard() {
  return (
    <li className="HabitCard">
      <div className="habit__type">
        {/* <img
            className="habit__type-icon"
            width={42}
            height={42}
            src="TODO"
            alt="emoji icon"
          /> */}
        <span>😴</span>
      </div>
      <Link
        className="link"
        to={`${appRoutes.Habit}/3`}
        title="To the habit page"
      >
        <h3 className="habit__title">Sleep 8 hours</h3>
      </Link>
      <button className="btn btn--complete">Complete today</button>
      <Link
        className="btn btn--edit"
        to={`${appRoutes.EditHabit}/3`}
        title="To the edit page"
      >
        Edit
      </Link>
      <button>
        <span>🗑</span>
      </button>
    </li>
  );
}

export default HabitCard;
