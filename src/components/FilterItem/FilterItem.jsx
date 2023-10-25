import { useEffect } from 'react';
import './FilterItem.css';

function FilterItem({
  title,
  onFilterHabits,
  onFetchAllHabits,
  onChangeFilter,
  currentFilter,
}) {
  const handleFilterChange = (event) => {
    const filter = event.target.name;
    onChangeFilter(filter);

    if (filter === 'reset filter') {
      onFetchAllHabits();
    } else {
      onFilterHabits(filter);
    }
  };

  return (
    <li className="FilterItem">
      <input
        type="radio"
        name={title}
        id={title}
        onChange={handleFilterChange}
        checked={currentFilter === title}
      />
      <label className="filter__label" htmlFor={title}>
        <span className="filter__label-text">{title}</span>
      </label>
    </li>
  );
}

export default FilterItem;
