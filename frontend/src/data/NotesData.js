import { API_URL } from './Settings';
import { getAccessToken } from '../components/Auth/AuthContext';
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const saveNotes = async (notes) => {
  await delay(500);
  localStorage.setItem('notes', JSON.stringify(notes));
};

export const getNotes = async () => {
  await delay(500);
  return JSON.parse(localStorage.getItem('notes'));
};

export const saveFolders = async (folders) => {
  await delay(500);
  localStorage.setItem('folders', JSON.stringify(folders));
};

/// api
const http = async (url, config) => {
  const request = new Request(url, {
    method: config.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: config.data ? JSON.stringify(config.data) : undefined,
  });
  if (config.accessToken) {
    request.headers.set('authorization', `bearer ${config.accessToken}`);
  }
  const response = await fetch(request);
  const body = await response.json();
  console.log(response);

  if (response.ok) {
    return { ok: response.ok, body };
  } else {
    return { errors: body.errors };
  }
};

export const getFolders = async () => {
  const accessToken = await getAccessToken();
  const res = await http(`${API_URL}/folders`, {
    method: 'GET',
    accessToken: accessToken,
  });
  if (res.ok) {
    console.log(res);
    return res.body;
  }
  return [];
};

export const addFolder = async (folder) => {
  const accessToken = await getAccessToken();
  const res = await http(`${API_URL}/folders`, {
    method: 'POST',
    data: folder,
    accessToken: accessToken,
  });
  if (res.ok) {
    return res.body;
  }
  return null;
};

export const deleteFolder = async (folderId) => {
  const accessToken = await getAccessToken();
  const res = await http(`${API_URL}/folders/${folderId}`, {
    method: 'DELETE',
    accessToken: accessToken,
  });
  if (res.ok) {
    return res.body;
  }
  return null;
};

export const updateFolder = async (id, data) => {
  console.log(id);
  console.log(data);
  const accessToken = await getAccessToken();
  const res = await http(`${API_URL}/folders/${id}`, {
    method: 'PUT',
    data: data,
    accessToken: accessToken,
  });
  console.log(res);

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
