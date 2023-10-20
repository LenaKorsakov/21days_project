import HabitCardExplore from '../../components/HabitCardExplore/HabitCard';
import './ExplorePage.css';

function ExplorePage() {
  return (
    <main className="ExplorePage ">
      <div className="page-explore__container">
        <h1>Special for you</h1>
        <p>filter by category???</p>
        <div className="cards-grid">
          <HabitCardExplore />
          <HabitCardExplore />
          <HabitCardExplore />
          <HabitCardExplore />
          <HabitCardExplore />
          <HabitCardExplore />
          <HabitCardExplore />
          <HabitCardExplore />
          <HabitCardExplore />
          <HabitCardExplore />
          <HabitCardExplore />
        </div>
      </div>
    </main>
  );
}

export default ExplorePage;
