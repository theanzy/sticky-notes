const ThemeToggleButton = ({ checked, onToggle }) => {
  return (
    <label className='switch'>
      <input type='checkbox' checked={checked} onChange={onToggle} />
      <span className='slider round'></span>
    </label>
  );
};

export default ThemeToggleButton;
