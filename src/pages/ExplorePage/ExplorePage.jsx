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
  const [globalHabits, setGlobalHabits] = useState(null);
  const [myHabits, setMyHabits] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('');

  const onChangeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const fetchGlobalHabits = async () => {
    const data = await api.fetchGlobalHabits();
    setGlobalHabits(data);
  };

  const fetchFilterdHabits = async (fiterName) => {
    const data = await api.fetchFilteredHabits(fiterName);
    setGlobalHabits(data);
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
    await fetchGlobalHabits();
  };

  useEffect(() => {
    fetchGlobalHabits();
    fetchMyHabits();
  }, []);

  if (!globalHabits || !myHabits) {
    return <LoadingPage />;
  }

  return (
    <main className="ExplorePage ">
      <div className="page-explore__container">
        <h1 className="page-explore__title">explore our habit ideas</h1>
        <section className="filter__section">
          <h2>filter by:</h2>
          <ul className="filter__list">
            {filtersCategories.map((category) => {
              return (
                <FilterItem
                  key={category}
                  title={category}
                  onFilterHabits={onFilterHabits}
                  onFetchAllHabits={fetchGlobalHabits}
                  currentFilter={currentFilter}
                  onChangeFilter={onChangeFilter}
                />
              );
            })}
          </ul>
        </section>
        <section className="page-explore__decoration">
          {globalHabits.length === 0 ? (
            <div className="message__container">
              <h2>We don't have filters in this category yet 😔</h2>
              <Link title="To add habit form" to={appRoutes.AddHabit}>
                But you can create your own habit here!
              </Link>
            </div>
          ) : (
            <div className="cards-grid">
              {' '}
              {globalHabits.map((habit) => {
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
        </section>
      </div>
    </main>
  );
}

export default ExplorePage;
