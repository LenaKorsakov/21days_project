import './Days.css';
import { useEffect } from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';

import { myApi } from '../../service/api';

import LoadingPage from '../../pages/LoadingPage/LoadingPage';

import { AMOUNT_OF_DAYS, checkBoxesColors } from '../../const/const';

function Days({
  habit,
  onChangeDaysInRow,
  checkins,
  fetchCheckins,
  onChangeMisses,
}) {
  let checkboxesColors = {},
    daysInRow = 0;

  const [allHabitDays, setAllHabitDays] = useState();
  const [checkboxesColorsData, setCheckboxesColorsData] =
    useState(checkboxesColors);

  const firstDayOfHabit = dayjs(new Date(habit.start_day)).startOf('day');
  const today = dayjs();
  const lastDayOfHabit = firstDayOfHabit.add(AMOUNT_OF_DAYS - 1, 'day');

  const checkIsTodayLastDayOfHabit = () => {
    const isLastDay = dayjs(lastDayOfHabit).isToday();
    const isAfterLastDay = dayjs().isAfter(lastDayOfHabit, 'day');

    if (isLastDay || isAfterLastDay) {
      return true;
    }
  };

  const daysNumbers = [...Array(AMOUNT_OF_DAYS).keys()];

  const countMisses = () => {
    if (checkins) {
      const currentCheckinsAmount = checkins.length;

      if (checkIsTodayLastDayOfHabit()) {
        return AMOUNT_OF_DAYS - currentCheckinsAmount;
      } else {
        const checkinsShouldBe = Math.round(
          today.diff(firstDayOfHabit) / (1000 * 60 * 60 * 24)
        );
        return checkinsShouldBe - currentCheckinsAmount;
      }
    }
    return 0;
  };

  const setDaysData = (days) => {
    const allHabitDays = days.map((day) => {
      const currentDayDate = dayjs(firstDayOfHabit).add(day, 'd').toDate();
      const alreadyExistedCheckin = checkins.find((checkin) =>
        dayjs(currentDayDate).isSame(dayjs(checkin.date), 'day')
      );

      let dataColor,
        checkinDate,
        checkinId,
        isInputChecked = false;

      if (alreadyExistedCheckin) {
        checkinDate = alreadyExistedCheckin.date;
        checkinId = alreadyExistedCheckin._id;
        dataColor = checkBoxesColors.Yellow;
        isInputChecked = true;
        daysInRow++;
        onChangeDaysInRow(daysInRow);
      } else if (
        !alreadyExistedCheckin &&
        dayjs(currentDayDate).isBefore(today)
      ) {
        checkinDate = currentDayDate.toJSON();
        dataColor = checkBoxesColors.Pink;
        daysInRow = 0;
        onChangeDaysInRow(daysInRow);
      } else {
        checkinDate = currentDayDate.toJSON();
        dataColor = checkBoxesColors.Off;
      }

      const oneHabitDay = {};

      oneHabitDay.number = day + 1;
      oneHabitDay.dayId = 'day' + (day + 1);
      oneHabitDay.date = checkinDate;
      oneHabitDay.isChecked = isInputChecked;
      oneHabitDay.checkin_id = checkinId;
      oneHabitDay.light = dataColor;

      checkboxesColors[day + 1] = dataColor;

      return oneHabitDay;
    });

    return allHabitDays;
  };

  useEffect(() => {
    const dailyHabits = setDaysData(daysNumbers);
    setAllHabitDays(dailyHabits);
    onChangeMisses(countMisses());
  }, [checkins]);

  const addCheckIn = async (currentDate) => {
    await myApi.createCheckIn({
      habit: habit._id,
      date: currentDate,
    });
    await fetchCheckins();
  };

  const deleteCheckin = async (id) => {
    await myApi.deleteCheckin(id);
    await fetchCheckins();
  };

  const handleCurrentDayCheck = (event, index, checkinDate, checkinId) => {
    if (event.target.checked) {
      addCheckIn(checkinDate);
      setCheckboxesColorsData({
        ...checkboxesColorsData,
        [index]: checkBoxesColors.Yellow,
      });
    } else {
      deleteCheckin(checkinId);
      setCheckboxesColorsData({
        ...checkboxesColorsData,
        [index]: checkBoxesColors.Pink,
      });
    }
  };

  if (!allHabitDays) {
    return <LoadingPage />;
  }

  return (
    <>
      <ul className="days">
        {allHabitDays.map((habitDay) => {
          return (
            <li
              key={habitDay.dayId}
              className="day"
              data-color={checkboxesColorsData[habitDay.number]}
            >
              <label>
                {dayjs(habitDay.date).isToday()
                  ? 'Today'
                  : 'Day ' + habitDay.number}

                <input
                  type="checkbox"
                  id={habitDay.dayId}
                  name="scales"
                  onChange={(event) =>
                    handleCurrentDayCheck(
                      event,
                      habitDay.number,
                      habitDay.date,
                      habitDay.checkin_id
                    )
                  }
                  checked={habitDay.isChecked}
                />
                <span className="checkmark"></span>
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Days;
