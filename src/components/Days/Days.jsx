import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";
import api from "../../service/api";
import "./Days.css";

function Days({ habit, onChangeMisses, onChangeDaysInRow, fetchOneHabit }) {
  const [checkins, setCheckIns] = useState(habit.checkins);
  const firstDay = dayjs(new Date(habit.start_day)).startOf("day");
  // const lastCheckinDate = dayjs(
  //   new Date(checkins[checkins.length - 1].date)
  // ).startOf("day");

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
      const checkfound = checkins.find((checkin) => {
        if (checkin.date) {
          return dayjs(nextDay).isSame(dayjs(checkin.date).startOf("day"));
        } else {
          return undefined;
        }
      });
      let dataLight,
        checkinDate,
        checkinId,
        inputChecked = false;

      if (checkfound) {
        checkinDate = checkfound.date;
        checkinId = checkfound.id;
        dataLight = "green";
        inputChecked = true;
        daysinarow++;
        if (daysinarow > totaldaysinarow) {
          totaldaysinarow = daysinarow;
        }
      } else if (!checkfound && dayjs(nextDay).isBefore(dayjs())) {
        checkinDate = nextDay;
        checkinId = "000";
        dataLight = "red";
        misses++;
        daysinarow = 0;
      } else {
        checkinDate = "000";
        checkinId = "000";
        dataLight = "off";
      }

      if (dayjs(nextDay).isToday()) {
        dataLight = "yellow";
      }

      habitDay.number = day + 1;
      habitDay.dayId = "day" + (day + 1);
      habitDay.date = nextDay;
      habitDay.dayCheked = inputChecked;
      habitDay.checkin_id = checkinId;
      habitDay.checkin_date = checkinDate;
      habitDay.light = dataLight;

      inputChecksObject[day + 1] = inputChecked;
      inputLightsObject[day + 1] = dataLight;

      return habitDay;
    });
    return daysObject;
  };

  const allHabitDay = setDaysData(numbers);
  onChangeMisses(misses);
  onChangeDaysInRow(totaldaysinarow);

  const [checkedStateData, setCheckedStateData] = useState(inputChecksObject);
  const [lightStateData, setLightStateData] = useState(inputLightsObject);

  // console.log("lightStateData", lightStateData);

  const handleCheck = (event, index, checkInDate, checkinId) => {
    // console.log("checkInDate", checkInDate);
    // console.log("event", event);
    // console.log("index", index);
    // console.log("event.target.checked ", event.target.checked);

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
    await fetchOneHabit();
    await api.createCheckIn(dateObj);
    await fetchOneHabit();
  };

  const deleteCheckin = async (id) => {
    await fetchOneHabit();
    await api.deleteCheckin(id);
    await fetchOneHabit();
  };

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
                Day {habitDay.number}
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
