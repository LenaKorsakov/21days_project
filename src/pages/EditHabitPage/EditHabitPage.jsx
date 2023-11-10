import HabitForm from '../../components/HabitForm/HabitForm';
import './EditHabitPage.css';
import { useParams } from 'react-router-dom';
import { myApi } from '../../service/api';
import { useEffect } from 'react';
import { useState } from 'react';
import LoadingPage from '../LoadingPage/LoadingPage';

function EditHabitPage() {
  const [habit, setHabit] = useState(null);
  const { habitId } = useParams();

  useEffect(() => {
    fetchOneHabit();
  }, []);

  const fetchOneHabit = async () => {
    const data = await myApi.fetchOneHabit(habitId);
    setHabit(data);
  };

  if (!habit) {
    return <LoadingPage />;
  }

  return (
    <main className="EditHabitPage">
      <div className="container">
        <div className="add-new-page-content__title-wrapper">
          <h1 className="subtitle">Edit Your Habit</h1>
        </div>
        <HabitForm habit={habit} />
      </div>
    </main>
  );
}

export default EditHabitPage;
