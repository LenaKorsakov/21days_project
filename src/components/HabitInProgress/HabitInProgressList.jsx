import './HabitInProgressList.css';
import HabitInProgressRow from './HabitInProgressRow/HabitInProgressRow';

function HabitInProgressList({ habits, onDeleteButton, onStartAgain }) {
  return (
    <section className="HabitInProgress">
      <h2>My progress</h2>
      <div className="table">
        <div className="table-content">
          {habits.map((habit) => {
            return (
              <HabitInProgressRow
                habit={habit}
                key={habit._id}
                onDeleteButton={onDeleteButton}
                onStartAgain={onStartAgain}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HabitInProgressList;
