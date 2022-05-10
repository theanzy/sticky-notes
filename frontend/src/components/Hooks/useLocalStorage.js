import { useEffect, useState } from 'react';

function getSavedValue(key, initialValue) {
  const jsonValue = localStorage.getItem(key);
  if (jsonValue != null) {
    return JSON.parse(jsonValue);
  }
  if (typeof defaultValue === 'function') return initialValue();

  return initialValue;
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const savedValue = getSavedValue(key, initialValue);
    return savedValue;
  });
  useEffect(() => {
    if (value === undefined) return localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
