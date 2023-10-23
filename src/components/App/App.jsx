import "./App.css";
import { Routes, Route } from "react-router-dom";
import { appRoutes } from "../../const/app-routes";
import MainPage from "../../pages/MainPage/MainPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HabitPage from "../../pages/HabitPage/HabitPage";
import AddNewHabitPage from "../../pages/AddNewHabitPage/AddNewHabitPage";
import EditHabitPage from "../../pages/EditHabitPage/EditHabitPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import ExplorePage from "../../pages/ExplorePage/ExplorePage";

function App() {
  return (
    <>
      <Routes>
        <Route path={appRoutes.Main} element={<Header />}>
          <Route index element={<MainPage />} />
          <Route path={`${appRoutes.Habit}/:habitId`} element={<HabitPage />} />
          <Route path={appRoutes.AddHabit} element={<AddNewHabitPage />} />
          <Route
            path={`${appRoutes.EditHabit}/:habitId`}
            element={<EditHabitPage />}
          />
          <Route path={`${appRoutes.Explore}`} element={<ExplorePage />} />
          <Route path={appRoutes.NotFound} element={<NotFoundPage />} />
        </Route>
        <Route path={appRoutes.Main} element={<Footer />} />
      </Routes>
    </>
  );
}

export default App;
