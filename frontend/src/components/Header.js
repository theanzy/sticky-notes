import ThemeToggleButton from './ThemeToggleButton';

const Header = ({ checked, toggleDarkMode, onSelectedItem }) => {
  const toggleTheme = () => {
    toggleDarkMode((darkMode) => !darkMode);
  };
  return (
    <div className='header'>
      <h1>Notes</h1>
      <ThemeToggleButton
        checked={checked}
        onToggle={toggleTheme}
        onSelectedItem={onSelectedItem}
      />
    </div>
  );
};
export default Header;
