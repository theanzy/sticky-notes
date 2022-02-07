const ThemeToggleButton = ({ onToggle }) => {
  return (
    <div>
      <input
        type='checkbox'
        className='checkbox'
        id='checkbox'
        onChange={onToggle}
      />
      <label htmlFor='checkbox' className='label'>
        <i className='moon'> x </i>
        <i className='sun'> x </i>
        <div className='ball' />
      </label>
    </div>
  );
};

export default ThemeToggleButton;
