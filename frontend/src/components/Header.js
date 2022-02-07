import ThemeToggleButton from './ThemeToggleButton';

const Header = ({ toggleDarkMode }) => {
  const toggleTheme = () => {
    toggleDarkMode((darkMode) => !darkMode);
  };
  return (
    <div className='header'>
      <h1>Notes</h1>
      <ThemeToggleButton onToggle={toggleTheme} />
    </div>
  );
};
export default Header;
