import './HabitInProgressRow.css';

function HabitInProgressRow({ habit }) {
  return (
    <div className="HabitInProgressRow">
      <div className="table-data">
        <span>{habit.emoji}</span>
      </div>
      <div className="table-data progress">
        <span></span>
      </div>
      <div className="table-data">7/21</div>
    </div>
  );
}

export default HabitInProgressRow;
