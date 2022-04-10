import { API_URL } from './Settings';
import { Auth } from './AuthData';

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const saveFolders = async (folders) => {
  await delay(500);
  localStorage.setItem('folders', JSON.stringify(folders));
};

/// api
const http = async (url, params, accessToken) => {
  const request = new Request(url, {
    method: params.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: params.data ? JSON.stringify(params.data) : undefined,
  });
  if (accessToken) {
    request.headers.set('authorization', `bearer ${accessToken}`);
  }
  const response = await fetch(request);
  const body = await response.json();

  if (response.ok) {
    return { ok: response.ok, body };
  } else {
    return { errors: body.errors };
  }
};

const withAsyncToken = (http) => {
  return async (...args) => {
    const accessToken = await Auth.getAccessToken();
    return http(...args, accessToken);
  };
};

const httpWithAuth = withAsyncToken(http);

export const getNotes = async () => {
  const res = await httpWithAuth(`${API_URL}/notes`, {
    method: 'GET',
  });
  if (res.ok) {
    return res.body;
  }
  return [];
};

export const addNote = async (note) => {
  console.log(note);
  const res = await httpWithAuth(`${API_URL}/notes`, {
    method: 'POST',
    data: note,
  });
  if (res.ok) {
    return res.body;
  }
  return null;
};

export const updateNote = async (id, data) => {
  const res = await httpWithAuth(`${API_URL}/notes/${id}`, {
    method: 'PUT',
    data: data,
  });
  if (res.ok) {
    return res.body;
  }
  console.error(res.errors);
  return null;
};

export const deleteNote = async (id) => {
  const res = await httpWithAuth(`${API_URL}/notes/${id}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    return res.body;
  }
  return null;
};

export const getFolders = async () => {
  const res = await httpWithAuth(`${API_URL}/folders`, {
    method: 'GET',
  });
  if (res.ok) {
    return res.body;
  }
  return [];
};

export const addFolder = async (folder) => {
  const res = await httpWithAuth(`${API_URL}/folders`, {
    method: 'POST',
    data: folder,
  });
  if (res.ok) {
    return res.body;
  }
  return null;
};

export const deleteFolder = async (folderId) => {
  const res = await httpWithAuth(`${API_URL}/folders/${folderId}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    return res.body;
  }
  return null;
};

export const updateFolder = async (id, data) => {
  const res = await httpWithAuth(`${API_URL}/folders/${id}`, {
    method: 'PUT',
    data: data,
  });
  if (res.ok) {
    return res.body;
  }
  return null;
};
