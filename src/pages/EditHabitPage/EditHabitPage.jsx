import HabitForm from '../../components/HabitForm/HabitForm';
import './EditHabitPage.css';

function EditHabitPage() {
  return (
    <main className="EditHabitPage">
      <div className="container">
        <div className="add-new-page-content__title-wrapper">
          <h1 className="subtitle">Edit Your Habit</h1>
        </div>
        <HabitForm />
      </div>
    </main>
  );
}

export default EditHabitPage;
