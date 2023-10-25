import './ExplorePage.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import FilterItem from '../../components/FilterItem/FilterItem';
import HabitCardExplore from '../../components/HabitCardExplore/HabitCardExplore';
import LoadingPage from '../LoadingPage/LoadingPage';

import { appRoutes } from '../../const/app-routes';
import { filtersCategories } from '../../const/const';
import api from '../../service/api';

function ExplorePage() {
  const [habits, setHabits] = useState(null);
  const [myHabits, setMyHabits] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('');

  console.log('allhabits', habits);
  console.log('myhabits', myHabits);

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
    await fetchExploreHabits();
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
          <div className="message__container">
            <h2>We don't have filters in this category yet 😔</h2>
            <Link
              className="link"
              title="To add habit form"
              to={appRoutes.AddHabit}
            >
              But you can create your own habit here!
            </Link>
          </div>
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
