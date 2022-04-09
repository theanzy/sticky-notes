const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

const setWithExpiry = (key, value, timeout) => {
  const item = {
    value: value,
    expiry: new Date().getTime() + timeout,
  };
  localStorage.setItem(key, JSON.stringify(item));
};
export const LocalStorageUtil = {
  getWithExpiry,
  setWithExpiry,
};
