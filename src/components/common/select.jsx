const Select = ({ name, label, error, options = [], ...args }) => {
  return (
    <div className='form-group my-2'>
      <label htmlFor={name}>{label}</label>
      <select className='form-select' id={name} name={name} {...args}>
        <option disabled value=''>
          Select Genre
        </option>
        {options.map(({ name, _id }) => (
          <option key={_id} value={_id}>
            {name}
          </option>
        ))}
      </select>
      {error && <div className='alert alert-sm alert-danger '>{error}</div>}
    </div>
  );
};

export default Select;
