import './HabitForm.css';

function HabitForm() {
  return (
    <form
      className="HabitForm"
      action="#"
      method="post"
      // onSubmit={handleFormSubmit}
    >
      <div className="container">
        <label className="form__label title--uppercase" htmlFor="title">
          Habit title
        </label>
        <input
          className="form__item"
          id="title"
          name="title"
          placeholder="Add habit title"
          // value={}
          // onChange={handleInputChange}
        ></input>
      </div>

      <div className="container">
        <label className="form__label title--uppercase" htmlFor="description">
          Describe your habit
        </label>
        <textarea
          className="form__item"
          id="description"
          name="description"
          placeholder="Add description"
          // value={}
          // onChange={handleInputChange}
        />
      </div>

      <div className="container">
        <label className="form__label title--uppercase" htmlFor="icon">
          Icon
        </label>
        <div>
          <select name="icon" id="icon" className="form__item">
            <option value="sleep">😴</option>
            <option value="healthy-food">🥦</option>
            <option value="running">🏃‍♀️</option>
            {/* TODO add emoji picker */}
          </select>
        </div>
      </div>

      <div className="container">
        <label className="form__label title--uppercase" htmlFor="category">
          Category
        </label>
        <div>
          <select name="category" id="category" className="form__item">
            <option value="self-realization">Self-realization</option>
            <option value="emotional-state">Emotional state</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="health">Health</option>
            <option value="beauty">Beauty</option>
            <option value="career-and-finance">Career and finance</option>
            <option value="relationships">Relationships</option>
            <option value="self-developement and education">
              Self-developement and education
            </option>
            <option value="hobbies">Hobbies</option>
            <option value="other" default>
              Other
            </option>
          </select>
        </div>
      </div>

      <div className="habit__button-wrapper">
        <button className="btn" type="submit">
          Add Habit
        </button>
      </div>
    </form>
  );
}

export default HabitForm;
