import "./HabitPage.css";
import { useParams } from "react-router-dom";
import api from "../../service/api";
import { useEffect } from "react";
import { useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import dayjs from "dayjs";
import Days from "../../components/Days/Days";

function HabitPage() {
  const [habit, setHabit] = useState(null);
  const { habitId } = useParams();

  useEffect(() => {
    fetchOneHabit();
  }, []);

  const fetchOneHabit = async () => {
    const data = await api.fetchOneHabit(habitId);
    console.log("data habit page", data);
    setHabit(data);
  };

  if (!habit) {
    return <LoadingPage />;
  }

  return (
    <main className="HabitPage">
      <div className="container">
        <div className="habit-page__content">
          <div
            className="habit-page__picture"
            style={{
              backgroundImage:
                "url(../../../public/image/360_F_161929987_I5XcqCx30S7KTxtZSE4lvHMiuVT4LQAT.jpeg)",
            }}
          >
            <h1 className="habit-page__title">Sleep 8 hours</h1>
            <div className="habit-page__emoji">
              <span>{habit.emoji}</span>
            </div>
            <div className="habit-page__info-wrapper">
              <p className="habit-page__category">{habit.category}</p>
              <p className="habit-page__description">{habit.description}</p>
            </div>
          </div>

          <div className="habit-page__stats-wrapper">
            <p className="habit-page__streak">
              <span>Days in the row: </span>10
            </p>
            <p className="habit-page__misses">
              <span>Misses:</span> 2
            </p>
          </div>

          <h1>ADD CALENDAR</h1>
          <div className="calendar">
            <Days habit={habit} />
          </div>
          <button className="btn">Complete today</button>
        </div>
      </div>
    </main>
  );
}

export default HabitPage;
