import './HabitForm.css';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import api from '../../service/api';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../const/app-routes';
import { useEffect } from 'react';

function HabitForm({ habit }) {
  const editing = habit ? true : false;
  const navigate = useNavigate();
  const [showEmojis, setShowEmojis] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [showPopup, setshowPopup] = useState(false);
  const [emojiValue, setEmojiValue] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    emoji: '',
    category: 'default',
    start_day: '',
  });

  const handleShowEmojis = () => {
    setShowEmojis(!showEmojis);
  };

  useEffect(() => {
    checkForFormFilled();
  }, [formData]);

  useEffect(() => {
    if (habit) {
      const prefilledForm = {
        title: habit.title,
        description: habit.description,
        emoji: habit.emoji,
        category: habit.category,
        start_day: habit.start_day,
      };
      setFormData(prefilledForm);
      setEmojiValue(habit.emoji);
    }
  }, []);

  const checkForFormFilled = () => {
    if (
      formData.title !== '' &&
      formData.category !== 'default' &&
      formData.emoji !== ''
    ) {
      setDisableButton(false);
    }
  };

  const handleChange = (event) => {
    const key = event.target.id;
    setFormData({ ...formData, [key]: event.target.value });
  };

  const handleChangeEmoji = (emoji) => {
    setFormData({ ...formData, ['emoji']: emoji });
  };

  const createNewHabit = async (habit) => {
    await api.createNewHabit(habit);
    setshowPopup(true);
    setTimeout(() => {
      setshowPopup(false);
      setDisableButton(true);
      navigate(appRoutes.Main);
    }, 1000);

    setFormData({
      title: '',
      description: '',
      emoji: '',
      category: 'default',
      start_day: '',
    });
  };

  const editHabit = async (id, habit) => {
    await api.editHabit(id, habit);
    setshowPopup(true);
    setTimeout(() => {
      setshowPopup(false);
      setDisableButton(true);
      navigate(appRoutes.Main);
    }, 1000);

    setFormData({
      title: '',
      description: '',
      emoji: '',
      category: 'default',
      start_day: '',
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const creationDate = new Date().toJSON();
    setFormData({ ...formData, ['start_day']: creationDate });
    if (editing) {
      editHabit(habit.id, formData);
    } else {
      createNewHabit(formData);
    }
  };

  return (
    <>
      <form
        className="HabitForm"
        action="#"
        method="post"
        onSubmit={handleFormSubmit}
      >
        <div className="container">
          <label className="form__label title--uppercase" htmlFor="title">
            Habit title *
          </label>
          <input
            className="form__item"
            id="title"
            name="title"
            placeholder="Meditate 10min"
            value={formData.title}
            onChange={handleChange}
            autoComplete="off"
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
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="container container-emoji">
          <label className="form__label title--uppercase" htmlFor="icon">
            Emoji *
          </label>

          <div className="emoji-wrapper">
            <input
              className="form__item"
              id="emoji"
              name="emoji"
              value={emojiValue}
              onChange={handleChange}
              autoComplete="off"
            />

            <div className="showEmoji" onClick={handleShowEmojis}>
              Choose your emoji
            </div>
          </div>

          {showEmojis && (
            <EmojiPicker
              onEmojiClick={(emojiData, event) => {
                setShowEmojis(false);
                setEmojiValue(emojiData.emoji);
                handleChangeEmoji(emojiData.emoji);
              }}
            />
          )}
        </div>

        <div className="container container-category">
          <label className="form__label title--uppercase" htmlFor="category">
            Category*
          </label>
          <div>
            <select
              name="category"
              id="category"
              className="form__item"
              value={formData.category}
              onChange={handleChange}
            >
              <option disabled value="default">
                Pick a Category
              </option>
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
          <button className="btn" type="submit" disabled={disableButton}>
            {editing ? 'Edit Habit' : 'Add Habit'}
          </button>
          <p style={{ fontSize: '2vh', textAlign: 'left' }}>
            * Necesary fields
          </p>
        </div>
      </form>
      <div className="popup" data-show={showPopup}>
        <span>Habit Ready 🙂</span>
      </div>
    </>
  );
}

export default HabitForm;
