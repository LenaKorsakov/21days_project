import './FavoritesPage.css';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import LoadingPage from '../LoadingPage/LoadingPage';
import { useAuth } from '../../components/AuthContextWrapper/AuthContextWrapper';
import BookmarkCard from '../../components/BookmarkCard/BookmarkCard';

import { myApi } from '../../service/api';

import { appRoutes } from '../../const/app-routes';
import { buttonMesage } from '../../const/const';

function FavoritesPage() {
  const [habits, setHabits] = useState(null);
  const [bookmarks, setBookmarks] = useState(null);
  const { authenticateUser } = useAuth();
  const navigate = useNavigate();

  const fetchAllHabits = async () => {
    const data = await myApi.fetchAllHabits();
    setHabits(data);
  };

  const fetchBookmarks = async () => {
    const data = await myApi.fetchBookmarks();
    setBookmarks(data);
  };

  useEffect(() => {
    fetchAllHabits();
    fetchBookmarks();
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem('authToken');
    authenticateUser();
    navigate(appRoutes.Login);
  };

  if (!habits || !bookmarks) {
    return <LoadingPage />;
  }
  return (
    <>
      <main className="FavoritesPage">
        <div className="page-favorites__container">
          <section className="habits">
            <div className="habits__info">
              <h2>Your active habits</h2>
              <p>You have {habits.length} active habits.</p>
              <Link
                className="btn btn--add"
                title="To add habit form"
                to={appRoutes.AddHabit}
              >
                <div>
                  {habits.length === 0
                    ? buttonMesage.FirstHabit
                    : buttonMesage.Default}
                </div>
              </Link>
            </div>

            <div className="habits__info">
              <h2>Your completed habits</h2>
              <p>You've completed {habits.length} habits.</p>
              <p>Good work!</p>
              <Link
                className="btn btn--add"
                title="To explore page"
                to={appRoutes.Explore}
              >
                <div>Explore more habits?</div>
              </Link>
            </div>
          </section>

          <div className="page-favorites__decoration">
            <h2 className="bookmarks-title">Your bookmarks</h2>
            <ul className="habits__list">
              {bookmarks.length === 0 ? (
                <>
                  <li>It's empty for now</li>
                  <li>
                    There are no habits here yet. Click the bookmark icon on the
                    <Link
                      className="link link--bookmark"
                      title="To explore page"
                      to={appRoutes.Explore}
                    >
                      habit card
                    </Link>
                    and it will appear here!
                  </li>
                </>
              ) : (
                bookmarks.map((habit) => {
                  return (
                    <BookmarkCard
                      habit={habit}
                      key={habit._id}
                      onFetchBookmarks={fetchBookmarks}
                    />
                  );
                })
              )}
            </ul>
            <button className="btn btn--logout" onClick={handleLogoutClick}>
              Log out
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default FavoritesPage;
