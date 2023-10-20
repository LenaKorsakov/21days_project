import './HabitInProgress.css';

function HabitInProgress() {
  return (
    <section className="HabitInProgress">
      <h2>Your progress</h2>
      <div className="table">
        <div className="table-header">
          <div className="header__item">Habit</div>
          <div className="header__item">Days in the row</div>
          <div className="header__item">Misses</div>
          <div className="header__item">Total</div>
        </div>
        <div className="table-content">
          <div className="table-row">
            <div className="table-data">Sleep 8 hours</div>
            <div className="table-data">2</div>
            <div className="table-data">4</div>
            <div className="table-data">7/21</div>
          </div>
          <div className="table-row">
            <div className="table-data">Sleep 8 hours</div>
            <div className="table-data">5</div>
            <div className="table-data">1</div>
            <div className="table-data">8/21</div>
          </div>
          <div className="table-row">
            <div className="table-data">Sleep 8 hours</div>
            <div className="table-data">18</div>
            <div className="table-data">0</div>
            <div className="table-data">18/21</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HabitInProgress;
