import './AddNewHabitPage.css';

import Footer from '../../components/Footer/Footer';
import HabitForm from '../../components/HabitForm/HabitForm';

function AddNewHabitPage() {
  return (
    <>
      <main className="AddNewHabitPage">
        <div className="container">
          <div className="add-new-page-content__title-wrapper">
            <h1 className="subtitle">Create a new habit</h1>
          </div>
          <HabitForm />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AddNewHabitPage;
