import FilterItem from '../../components/FilterItem/FilterItem';
import HabitCardExplore from '../../components/HabitCardExplore/HabitCard';
import './ExplorePage.css';

function ExplorePage() {
  const filtersCategories = [
    'self-realization',
    'emotional-state',
    'lifestyle',
    'beauty',
    'career-and-finance',
    'relationships',
    'self-developement and education',
    'hobbies',
    'other',
  ];

  return (
    <main className="ExplorePage ">
      <div className="page-explore__container">
        <h1>Special for you</h1>
        <fieldset className="filter__section">
          <h2>Filter by:</h2>
          <ul className="filter__list">
            {filtersCategories.map((category) => {
              return <FilterItem key={category} title={category} />;
            })}
          </ul>
        </fieldset>
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
