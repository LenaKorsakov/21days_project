import './FilterItem.css';

// eslint-disable-next-line react/prop-types
function FilterItem({ title }) {
  return (
    <li className="FilterItem">
      <input
        type="radio"
        name={title}
        id={title}
        // onChange={}
        checked={false}
      />
      <label className="filter__label" htmlFor={title}>
        <span className="filter__label-text">{title}</span>
      </label>
    </li>
  );
}

export default FilterItem;
