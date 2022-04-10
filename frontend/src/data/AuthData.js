import createAuth0Client from '@auth0/auth0-spa-js';
import { Auth0Settings } from './Settings';
import { LocalStorageUtil } from './Helpers';

const getClientAsync = async () => {
  return createAuth0Client({
    domain: Auth0Settings.domain,
    client_id: Auth0Settings.clientId,
    redirect_uri: Auth0Settings.redirectUri,
    audience: Auth0Settings.audience,
  });
};

const getAccessToken = async () => {
  try {
    const localToken = LocalStorageUtil.getWithExpiry('ACCESS_TOKEN');
    if (localToken === null) {
      const client = await Auth.getClientAsync();
      const token = await client.getTokenSilently();
      // 2 hours
      LocalStorageUtil.setWithExpiry('ACCESS_TOKEN', token, 1000 * 60 * 60 * 2);
      return token;
    } else {
      return localToken;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const Auth = {
  getClientAsync,
  getAccessToken,
};
