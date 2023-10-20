import { Link } from 'react-router-dom';
import HabitCard from '../../components/HabitCard/HabitCard';
import HabitInProgress from '../../components/HabitInProgress/HabitInProgress';
import './MainPage.css';
import { appRoutes } from '../../const/app-routes';

function MainPage() {
  return (
    <main className="MainPage">
      <div className="page-main__container">
        <HabitInProgress />
        <section className="habits">
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
          <div>Add New Habit</div>
        </Link>
      </div>
    </main>
  );
}

export default MainPage;
