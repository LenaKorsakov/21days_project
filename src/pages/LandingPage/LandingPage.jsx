import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import { appRoutes } from "../../const/app-routes";

function LandingPage() {
  return (
    <>
      <main className="LandingPage">
        <div className="logo">
          <img alt="logo" src="/image/turtle.png" />
        </div>
        <h1>There no habits on your App!!</h1>
        <p>What a great opportunity to start anew!</p>
        <p>You can now Create a new Habit or Explore from our selection:</p>

        <div className="Landing-page__buttons-wrapper">
          <Link to={appRoutes.AddHabit}>
            <button className="btn">New Habit</button>
          </Link>

          <Link to={appRoutes.Explore}>
            <button className="btn">Explore selection</button>
          </Link>
        </div>
      </main>
    </>
  );
}

export default LandingPage;
