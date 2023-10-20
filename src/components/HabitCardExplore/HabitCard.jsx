import './HabitCardExplore.css';

function HabitCardExplore() {
  return (
    <div className="HabitCardExplore">
      <div className="habit-img__wrapper">
        <img
          className="habit-img"
          src="../../../public/image/360_F_161929987_I5XcqCx30S7KTxtZSE4lvHMiuVT4LQAT.jpeg"
          alt="habit picture"
        />
      </div>

      <div className="habit-card__content">
        <h3 className="habit__title">Sleep 8 hours</h3>
        <p className="habit__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem corporis optio maxi
        </p>
      </div>

      <button className="btn btn--add">Add to my habits</button>
    </div>
  );
}

export default HabitCardExplore;
