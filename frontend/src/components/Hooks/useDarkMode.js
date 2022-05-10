import { useLayoutEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import useMediaQuery from './useMediaQuery';
import useUpdateEffect from './useUpdateEffect';

export default function useDarkMode(
  className = 'dark-mode',
  element = document.body
) {
  const [darkMode, setDarkMode] = useLocalStorage('useDarkMode');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const enabled = darkMode ?? prefersDarkMode;
  useUpdateEffect(() => {
    if (darkMode == undefined) {
      setDarkMode(prefersDarkMode);
    }
  }, [prefersDarkMode]);
  useLayoutEffect(() => {
    element.classList.toggle(className, enabled);
  }, [enabled]);
  return [enabled, setDarkMode];
}
