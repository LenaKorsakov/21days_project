import './ExplorePage.css';

import { useEffect, useState } from 'react';

import FilterItem from '../../components/FilterItem/FilterItem';
import HabitCardExplore from '../../components/HabitCardExplore/HabitCardExplore';
import LoadingPage from '../LoadingPage/LoadingPage';
import api from '../../service/api';
import { filtersCategories } from '../../const/const';

function ExplorePage() {
  const [habits, setHabits] = useState(null);
  const [myHabits, setMyHabits] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('');

  const onChangeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const fetchExploreHabits = async () => {
    const data = await api.fetchExploreHabits();
    setHabits(data);
  };

  const fetchFilterdHabits = async (fiterName) => {
    const data = await api.fetchFilteredHabits(fiterName);
    setHabits(data);
  };

  const onFilterHabits = (filterName) => {
    fetchFilterdHabits(filterName);
  };

  const fetchMyHabits = async () => {
    const data = await api.fetchAllHabits();
    setMyHabits(data);
  };

  const createNewHabit = async (habit) => {
    await api.createNewHabit(habit);
    await fetchMyHabits();
    fetchExploreHabits();
  };

  useEffect(() => {
    fetchExploreHabits();
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
          <h2>filter by:</h2>
          <ul className="filter__list">
            {filtersCategories.map((category) => {
              return (
                <FilterItem
                  key={category}
                  title={category}
                  onFilterHabits={onFilterHabits}
                  onFetchAllHabits={fetchExploreHabits}
                  currentFilter={currentFilter}
                  onChangeFilter={onChangeFilter}
                />
              );
            })}
          </ul>
        </fieldset>

        {habits.length === 0 ? (
          <h2>We don't have filters in this category yet 😔</h2>
        ) : (
          <div className="cards-grid">
            {' '}
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
        )}
      </div>
    </main>
  );
}

export default ExplorePage;
