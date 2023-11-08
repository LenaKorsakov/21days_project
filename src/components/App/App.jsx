import { Route, Routes } from 'react-router-dom';
import { appRoutes } from '../../const/app-routes';
import AddNewHabitPage from '../../pages/AddNewHabitPage/AddNewHabitPage';
import EditHabitPage from '../../pages/EditHabitPage/EditHabitPage';
import ExplorePage from '../../pages/ExplorePage/ExplorePage';
import HabitPage from '../../pages/HabitPage/HabitPage';
import LandingPage from '../../pages/LandingPage/LandingPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import MainPage from '../../pages/MainPage/MainPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import SigninPage from '../../pages/SigninPage/SigninPage';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path={appRoutes.Landing} element={<LandingPage />} />
        <Route path={appRoutes.Login} element={<LoginPage />} />
        <Route path={appRoutes.Signin} element={<SigninPage />} />
        <Route path={appRoutes.Main} element={<Header />}>
          <Route index element={<MainPage />} />
          <Route path={`${appRoutes.Habit}/:habitId`} element={<HabitPage />} />
          <Route path={appRoutes.AddHabit} element={<AddNewHabitPage />} />
          <Route
            path={`${appRoutes.EditHabit}/:habitId`}
            element={<EditHabitPage />}
          />
          <Route path={appRoutes.Explore} element={<ExplorePage />} />
          <Route path={appRoutes.NotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
