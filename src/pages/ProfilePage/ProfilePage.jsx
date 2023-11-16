import './ProfilePage.css';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../components/AuthContextWrapper/AuthContextWrapper';
import BookmarkCard from '../../components/BookmarkCard/BookmarkCard';
import LoadingPage from '../LoadingPage/LoadingPage';

import Footer from '../../components/Footer/Footer';
import { myApi } from '../../service/api';

import { appRoutes } from '../../const/app-routes';
import { buttonMesage } from '../../const/const';

function ProfilePage() {
  const [habits, setHabits] = useState(null);
  const [bookmarks, setBookmarks] = useState(null);
  const [completedHabits, setCompletedHabits] = useState(null);

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

  const fetchCompletedHabits = async () => {
    const data = await myApi.fetchCompletedHabits();
    setCompletedHabits(data);
  };

  useEffect(() => {
    fetchAllHabits();
    fetchBookmarks();
    fetchCompletedHabits();
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem('authToken');
    authenticateUser();
    navigate(appRoutes.Login);
  };

  if (!habits || !bookmarks || !completedHabits) {
    return <LoadingPage />;
  }
  return (
    <>
      <main className="FavoritesPage">
        <div className="page-favorites__container">
          <section className="habits">
            <div className="habits__info">
              <h2>Your habits</h2>

              {habits.length > 0 ? (
                <p>
                  You have {habits.length}{' '}
                  {habits.length === 1 ? (
                    <span>habit now.</span>
                  ) : (
                    <span>habits now.</span>
                  )}
                </p>
              ) : (
                <p>You don't have habits yet. Add your first one!</p>
              )}
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
              {completedHabits.length > 0 ? (
                <>
                  <p>
                    For now you've completed {completedHabits.length}{' '}
                    {completedHabits.length === 1 ? (
                      <span>habit.</span>
                    ) : (
                      <span>habits.</span>
                    )}
                  </p>
                  <p>Good work!</p>
                </>
              ) : (
                <p>You haven't completed any habits yet</p>
              )}

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
                      onFetchMyHabits={fetchAllHabits}
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
      <Footer />
    </>
  );
}

export default ProfilePage;
