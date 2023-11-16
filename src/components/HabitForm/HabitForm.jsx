import './HabitForm.css';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { myApi } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../const/app-routes';
import { useEffect } from 'react';
import { filtersCategories } from '../../const/const';

const initialState = {
  title: '',
  description: '',
  emoji: '',
  category: 'default',
  type: 'default',
  start_day: '',
};

function HabitForm({ habit }) {
  const editing = habit ? true : false;
  const navigate = useNavigate();
  const [showEmojis, setShowEmojis] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [showPopup, setshowPopup] = useState(false);
  const [emojiValue, setEmojiValue] = useState('');
  const [formData, setFormData] = useState(initialState);

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
        type: habit.type,
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
      formData.emoji !== '' &&
      formData.type !== 'default'
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
    await myApi.createNewHabit(habit);
    setshowPopup(true);
    setTimeout(() => {
      setshowPopup(false);
      setDisableButton(true);
      navigate(appRoutes.Main);
    }, 1000);

    setFormData(initialState);
  };

  const editHabit = async (id, habit) => {
    await myApi.editHabit(id, habit);
    setshowPopup(true);
    setTimeout(() => {
      setshowPopup(false);
      setDisableButton(true);
      navigate(appRoutes.Main);
    }, 1000);

    setFormData(initialState);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...formData });
    if (editing) {
      editHabit(habit._id, formData);
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
              width={250}
              suggestedEmojisMode="recent"
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
                Pick a category
              </option>
              {filtersCategories.map((category) => {
                return (
                  <option value={category} key={category}>
                    {category}
                  </option>
                );
              })}
              <option value="other" default>
                other
              </option>
            </select>
          </div>
        </div>

        <div className="container container-category">
          <label className="form__label title--uppercase" htmlFor="category">
            Type*
          </label>
          <div>
            <select
              name="type"
              id="type"
              className="form__item"
              value={formData.type}
              onChange={handleChange}
            >
              <option disabled value="default">
                Pick a type
              </option>

              <option value="build" default>
                build
              </option>
              <option value="quit" default>
                quit
              </option>
            </select>
          </div>
        </div>

        <div className="habit__button-wrapper">
          <button
            className="btn btn--submit"
            type="submit"
            disabled={disableButton}
          >
            {editing ? 'Edit Habit' : 'Add Habit'}
          </button>
          <p style={{ fontSize: '2vh', textAlign: 'left' }}>
            * Necessary fields
          </p>
        </div>
      </form>
      <div className="popup" data-show={showPopup}>
        <span>Habit Is Ready 🙂</span>
      </div>
    </>
  );
}

export default HabitForm;
