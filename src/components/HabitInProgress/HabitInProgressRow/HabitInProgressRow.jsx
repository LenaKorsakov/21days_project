import './HabitInProgressRow.css';

function HabitInProgressRow({ habit }) {
  const myProgress = habit.checkins.length;
  const progressInPercent = (myProgress / 21) * 100;

  return (
    <div className="HabitInProgressRow">
      <div className="table-data">
        <span>{habit.emoji}</span>
      </div>
      <div className="table-data progress">
        <span>
          <span
            className="table-date__progress"
            style={{
              width: `${progressInPercent}%`,
            }}
          ></span>
        </span>
      </div>
      <div className="table-data">{myProgress}/21</div>
    </div>
  );
}

export default HabitInProgressRow;
