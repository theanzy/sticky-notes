export const Auth0Settings = {
  // eslint-disable-next-line no-undef
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  // eslint-disable-next-line no-undef
  clientId: process.env.REACT_APP_AUTH0_CLIENTID,
  redirectUri: window.location.origin,
  // eslint-disable-next-line no-undef
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  // eslint-disable-next-line no-undef
  scope: process.env.REACT_APP_AUTH0_SCOPE,
};
