import ThemeToggleButton from './ThemeToggleButton';

const Header = ({ checked, toggleDarkMode }) => {
  const toggleTheme = () => {
    toggleDarkMode((darkMode) => !darkMode);
  };
  return (
    <div className='header'>
      <h1>Notes</h1>
      <ThemeToggleButton checked={checked} onToggle={toggleTheme} />
    </div>
  );
};
export default Header;
