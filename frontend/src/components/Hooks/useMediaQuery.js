import { useEffect, useState } from 'react';
import useEventListener from './useEventListener';

export default function useMediaQuery(query) {
  const [isMatch, setIsMatch] = useState(false);
  const [mediaQueryList, setMediaQueryList] = useState(null);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMediaQueryList(list);
    setIsMatch(list.matches);
  }, [query]);

  useEventListener('change', (e) => setIsMatch(e.matches), mediaQueryList);

  return isMatch;
}
