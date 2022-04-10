import { API_URL } from './Settings';
import { Auth } from './AuthData';

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const saveNotes = async (notes) => {
  await delay(500);
  localStorage.setItem('notes', JSON.stringify(notes));
};

export const getNotes = async () => {
  await delay(500);
  const notes = JSON.parse(localStorage.getItem('notes'));
  return notes ? notes : [];
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

export const getFolders = async () => {
  const res = await httpWithAuth(`${API_URL}/folders`, {
    method: 'GET',
  });
  console.log(res);
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

export const updateNote = async (note) => {
  await delay(500);
  console.log('update note api', note);
};

export const deleteNote = async (id) => {
  await delay(500);
  console.log('delete note api', id);
};

export const addNote = async (note) => {
  await delay(500);
  console.log('add noew note api', note);
};
