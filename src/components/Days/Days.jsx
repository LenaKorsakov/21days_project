import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";
import api from "../../service/api";
import "./Days.css";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";

function Days({ habit, onChangeMisses, onChangeDaysInRow, fetchOneHabit }) {
  const [allHabitDay, setAllHabitDay] = useState();
  const firstDay = dayjs(new Date(habit.start_day)).startOf("day");

  const inputChecksObject = {};
  const inputLightsObject = {};

  let misses = 0,
    daysinarow = 0,
    totaldaysinarow = 0;

  const numbers = [...Array(21).keys()];

  const setDaysData = (days) => {
    const daysObject = days.map((day) => {
      const habitDay = {};
      const nextDay = dayjs(firstDay).add(day, "d").toDate();
      const checkfound = habit.checkins.find((checkin) => {
        if (checkin.date) {
          return dayjs(nextDay).isSame(dayjs(checkin.date).startOf("day"));
        } else {
          return undefined;
        }
      });
      let dataLight,
        checkinDate,
        checkinId,
        dayState,
        inputChecked = false;

      if (checkfound) {
        checkinDate = checkfound.date;
        checkinId = checkfound.id;
        dataLight = "green";
        inputChecked = true;
        dayState = "passed";
        daysinarow++;
        if (daysinarow > totaldaysinarow) {
          totaldaysinarow = daysinarow;
        }
      } else if (!checkfound && dayjs(nextDay).isBefore(dayjs())) {
        checkinDate = nextDay;
        checkinId = "000";
        dataLight = "red";
        dayState = "passed";
        misses++;
        daysinarow = 0;
      } else {
        checkinDate = "000";
        checkinId = "000";
        dataLight = "off";
        dayState = "future";
      }

      if (dayjs(nextDay).isToday()) {
        // dataLight = "yellow";
        dayState = "today";
      }

      habitDay.number = day + 1;
      habitDay.dayId = "day" + (day + 1);
      habitDay.date = nextDay;
      habitDay.dayCheked = inputChecked;
      habitDay.checkin_id = checkinId;
      habitDay.checkin_date = checkinDate;
      habitDay.light = dataLight;
      habitDay.state = dayState;

      inputChecksObject[day + 1] = inputChecked;
      inputLightsObject[day + 1] = dataLight;

      return habitDay;
    });
    return daysObject;
  };

  useEffect(() => {
    const dailyHabits = setDaysData(numbers);
    setAllHabitDay(dailyHabits);
  }, [habit]);

  onChangeMisses(misses);
  onChangeDaysInRow(totaldaysinarow);

  const [checkedStateData, setCheckedStateData] = useState(inputChecksObject);
  const [lightStateData, setLightStateData] = useState(inputLightsObject);

  const handleCheck = (event, index, checkInDate, checkinId) => {
    setCheckedStateData({ ...checkedStateData, [index]: event.target.checked });
    if (event.target.checked) {
      setLightStateData({ ...lightStateData, [index]: "green" });
      addCheckIn(checkInDate);
    } else {
      setLightStateData({ ...lightStateData, [index]: "red" });
      deleteCheckin(checkinId);
    }
  };

  const addCheckIn = async (date) => {
    const dateObj = {
      my_habitId: habit.id,
      date: date,
    };
    await api.createCheckIn(dateObj);
    await fetchOneHabit();
  };

  const deleteCheckin = async (id) => {
    await api.deleteCheckin(id);
    await fetchOneHabit();
  };
  if (!allHabitDay) {
    return <LoadingPage />;
  }
  return (
    <>
      <ul className="days">
        {allHabitDay.map((habitDay) => {
          return (
            <li
              key={habitDay.dayId}
              className="day"
              data-light={lightStateData[habitDay.number]}
            >
              <label>
                {habitDay.state === "today"
                  ? "Today"
                  : "Day " + habitDay.number}

                <input
                  type="checkbox"
                  checkin-id={habitDay.checkin_id}
                  id={habitDay.dayId}
                  name="scales"
                  value={habitDay.date}
                  onChange={() =>
                    handleCheck(
                      event,
                      habitDay.number,
                      habitDay.date,
                      habitDay.checkin_id
                    )
                  }
                  checked={checkedStateData[habitDay.number]}
                />
                <span class="checkmark"></span>
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Days;
