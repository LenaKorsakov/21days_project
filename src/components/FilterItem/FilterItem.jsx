import './FilterItem.css';

function FilterItem({ title, onChangeFilter, currentFilter }) {
  const handleFilterChange = (event) => {
    const filter = event.target.name;

    if (filter === 'reset filter') {
      onChangeFilter('');
    } else {
      onChangeFilter(filter);
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
