import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";
import "./Days.css";

function Days({ habit }) {
  const checkins = habit.checkins;
  console.log("habit", habit);
  console.log("checkins", checkins);

  const numbers = [...Array(21).keys()];

  return (
    <>
      <ul className="days">
        {numbers.map((number) => {
          return (
            <li className="day" data-light="off">
              <input
                type="checkbox"
                id={`day${number + 1}`}
                name="scales"
                checked
              />
              {number + 1}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Days;
