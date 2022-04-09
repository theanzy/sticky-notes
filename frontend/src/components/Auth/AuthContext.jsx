import React, { createContext, useState, useContext, useEffect } from 'react';
import { Auth0Settings } from '../../data/Settings';
import createAuth0Client from '@auth0/auth0-spa-js';

const AuthContext = createContext({
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
  isAuthLoading: false,
});

export const useAuth = () => useContext(AuthContext);

const getClientAsync = async () => {
  return createAuth0Client({
    domain: Auth0Settings.domain,
    client_id: Auth0Settings.clientId,
    redirect_uri: Auth0Settings.redirectUri,
  });
};

const setWithExpiry = (key, value, timeout) => {
  const item = {
    value: value,
    expiry: new Date().getTime() + timeout,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

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

export const getAccessToken = async () => {
  let token = null;
  try {
    const localToken = getWithExpiry('ACCESS_TOKEN');
    if (!localToken) {
      const client = await getClientAsync();
      token = await client.getTokenSilently();
      setWithExpiry('ACCESS_TOKEN', token, 1000 * 60 * 60 * 12);
    } else {
      token = localToken;
    }
  } catch (err) {
    console.error(err);
  }
  return token;
};

const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    isLoading: true,
  });
  const [user, setUser] = useState(null);
  const [auth0Client, setAuth0Client] = useState(null);
  useEffect(() => {
    const initAsync = async () => {
      const auth0ClientCreated = await getClientAsync();
      setAuth0Client(auth0ClientCreated);
      if (
        window.location.pathname === '/' &&
        window.location.search.indexOf('code=') > -1
      ) {
        await auth0ClientCreated.handleRedirectCallback();
        window.location.replace(window.location.origin);
      }
      const isAuthenticated = await auth0ClientCreated.isAuthenticated();
      if (isAuthenticated) {
        const user = await auth0ClientCreated.getUser();
        setUser(user);
      }
      setState({ isAuthenticated: isAuthenticated, isLoading: false });
    };
    initAsync();
  }, []);

  const getAuth0Client = () => {
    if (auth0Client === null) {
      throw new Error('Auth0 client is null');
    }
    return auth0Client;
  };

  const signOut = () => {
    setState({ ...state, isAuthenticated: false, isLoading: true });
    localStorage.removeItem('AUTH_TOKEN');
    getAuth0Client().logout({ returnTo: window.location.origin });
  };

  const signIn = () => {
    getAuth0Client().loginWithRedirect();
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user,
        isAuthLoading: state.isLoading,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;