import './ExplorePage.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import FilterItem from '../../components/FilterItem/FilterItem';
import GlobalHabitCard from '../../components/GlobalHabitCard/GlobalHabitCard';
import LoadingPage from '../LoadingPage/LoadingPage';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { appRoutes } from '../../const/app-routes';
import { filtersCategories } from '../../const/const';
import { myApi } from '../../service/api';

function ExplorePage() {
  const [globalHabits, setGlobalHabits] = useState(null);
  const [myHabits, setMyHabits] = useState(null);
  const [bookmarks, setBookmarks] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');

  const fetchGlobalHabits = async (queryString = null) => {
    const data = await myApi.fetchAllGlobalHabits(queryString);
    setGlobalHabits(data);
  };

  const fetchMyHabits = async () => {
    const data = await myApi.fetchAllHabits();
    setMyHabits(data);
  };

  const fetchBookmarks = async () => {
    const data = await myApi.fetchBookmarks();
    setBookmarks(data);
  };

  useEffect(() => {
    let queryString = '';

    if (filterQuery) {
      queryString += `category=${filterQuery}&`;
    }

    fetchGlobalHabits(queryString);
  }, [filterQuery]);

  const onChangeFilter = (newFilter) => {
    setFilterQuery(newFilter);
  };

  const createNewHabit = async (habit) => {
    await myApi.createNewHabit(habit);
    await fetchMyHabits();
    await fetchGlobalHabits();
  };

  const addToBookmarks = async (habit) => {
    await myApi.createNewBookmark(habit);
    await fetchBookmarks();
  };

  const deleteFromBookmarks = async (id) => {
    await myApi.deleteBookmark(id);
    await fetchBookmarks();
  };

  useEffect(() => {
    fetchGlobalHabits();
    fetchMyHabits();
    fetchBookmarks();
  }, []);

  if (!globalHabits || !myHabits || !bookmarks) {
    return <LoadingPage />;
  }

  return (
    <>
      <main className="ExplorePage ">
        <div className="page-explore__container">
          <h1 className="page-explore__title">Explore our habits ideas</h1>
          <section className="filter__section">
            <h2>filtered by:</h2>
            <ul className="filter__list">
              {filtersCategories.map((category) => {
                return (
                  <FilterItem
                    key={category}
                    title={category}
                    currentFilter={filterQuery}
                    onChangeFilter={onChangeFilter}
                  />
                );
              })}
            </ul>
          </section>
          <section className="page-explore__decoration">
            {globalHabits.length === 0 ? (
              <div className="message__container">
                <h2>We don't have habits in this category yet 😔</h2>
                <Link
                  title="To add habit form"
                  to={appRoutes.AddHabit}
                  className="link link--add"
                >
                  But you can create your own habit here!
                </Link>
              </div>
            ) : (
              <div className="cards-grid">
                {' '}
                {globalHabits.map((habit) => {
                  return (
                    <GlobalHabitCard
                      key={habit._id}
                      habit={habit}
                      habits={myHabits}
                      bookmarks={bookmarks}
                      onCreateNewHabit={createNewHabit}
                      onCreateNewBookmark={addToBookmarks}
                      onDeleteFromBookmarks={deleteFromBookmarks}
                    />
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ExplorePage;

// TODO добавить фильтрацию по категории build and quit, добавить фильтры в url. добавить визуально тип привычки на главной, добавить обновление токена
//добавить возможность поиска и пагинацию
