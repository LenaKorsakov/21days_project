import './HabitPage.css';

function HabitPage() {
  return (
    <main className="HabitPage">
      <div className="habit-page__picture">
        <img
          className="habit-page__img"
          src="../../../public/image/360_F_161929987_I5XcqCx30S7KTxtZSE4lvHMiuVT4LQAT.jpeg"
          alt="Picture"
        />
      </div>
      <div className="container">
        <div className="habit-page__content">
          <h1 className="habit-page__title">Sleep 8 hours</h1>
          <p className="quest-page__category">
            <span>Category:</span>
            Well-being
          </p>

          <p className="quest-page__progress">
            <span>Days in the row:</span>
            10
          </p>

          <p className="habit-page__description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo
            veniam tenetur rerum fugit culpa fuga laborum dolorem. Minus nostrum
            deleniti consectetur amet odit provident voluptatem. Error impedit
            et illum itaque.
          </p>
          <button className="btn">Complete today</button>
        </div>
      </div>
    </main>
  );
}

export default HabitPage;
