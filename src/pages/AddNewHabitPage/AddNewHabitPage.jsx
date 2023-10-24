import HabitForm from "../../components/HabitForm/HabitForm";
import "./AddNewHabitPage.css";

function AddNewHabitPage() {
  return (
    <main className="AddNewHabitPage">
      <div className="container">
        <div className="add-new-page-content__title-wrapper">
          <h1 className="subtitle">Create a new habit</h1>
        </div>
        <HabitForm />
      </div>
    </main>
  );
}

export default AddNewHabitPage;
