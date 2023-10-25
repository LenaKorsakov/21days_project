import { useEffect, useState } from 'react';
import FilterItem from '../../components/FilterItem/FilterItem';
import HabitCardExplore from '../../components/HabitCardExplore/HabitCardExplore';
import { filtersCategories } from '../../const/const';
import './ExplorePage.css';
import api from '../../service/api';
import LoadingPage from '../LoadingPage/LoadingPage';

function ExplorePage() {
  const [habits, setHabits] = useState();
  const [myHabits, setMyHabits] = useState();

  const fetchAllHabits = async () => {
    const data = await api.fetchExploreHabits();
    setHabits(data);
  };

  const fetchMyHabits = async () => {
    const data = await api.fetchAllHabits();
    setMyHabits(data);
  };

  const createNewHabit = async (habit) => {
    await api.createNewHabit(habit);
    fetchMyHabits();
    fetchAllHabits();
  };

  useEffect(() => {
    fetchAllHabits();
    fetchMyHabits();
  }, []);

  if (!habits || !myHabits) {
    return <LoadingPage />;
  }

  return (
    <main className="ExplorePage ">
      <div className="page-explore__container">
        <h1 className="page-explore__title">special for you</h1>
        <fieldset className="filter__section">
          <h2>Filter by:</h2>
          <ul className="filter__list">
            {filtersCategories.map((category) => {
              return <FilterItem key={category} title={category} />;
            })}
          </ul>
        </fieldset>
        <div className="cards-grid">
          {habits.map((habit) => {
            return (
              <HabitCardExplore
                key={habit.id}
                habit={habit}
                habits={myHabits}
                onCreateNewHabit={createNewHabit}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default ExplorePage;
