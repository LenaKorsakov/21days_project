import HabitCard from '../../components/HabitCard/HabitCard';
import HabitInProgress from '../../components/HabitInProgress/HabitInProgress';
import './MainPage.css';

function MainPage() {
  return (
    <main className="MainPage">
      <div className="page-main__container">
        <HabitInProgress/>
        <section className="habits">
          <ul className="habits__list">
            <HabitCard />
            <HabitCard />
            <HabitCard />
          </ul>
        </section>
      </div>
    </main>
  );
}

export default MainPage;
