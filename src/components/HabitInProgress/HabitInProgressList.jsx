import './HabitInProgressList.css';
import HabitInProgressRow from './HabitInProgressRow/HabitInProgressRow';

function HabitInProgressList({ habits }) {
  return (
    <section className="HabitInProgress">
      <h2>my progress</h2>
      <div className="table">
        <div className="table-content">
          {habits.map((habit) => {
            return <HabitInProgressRow habit={habit} key={habit.id} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default HabitInProgressList;
