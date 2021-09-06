import Config from '../config/Config';

const baseUrl = Config.baseApiUrl;

export const handleResponse = (res) => res.json().then((json) => {
  if (res.status >= 200 && res.status < 300) {
    return json;
  }

  const error = new Error(json);
  error.status = res.status;
  error.errorCode = json.err || 'UNKNOWN';
  throw error;
}).catch((err) => {
  if (err.status) {
    throw err;
  }

  const error = new Error(res.statusText);
  error.status = res.status;
  throw error;
});

export const postFiles = (path, files) => {
  const data = new FormData();

  files.keys().forEach((fileIndex) => {
    data.append(fileIndex, files[fileIndex]);
  });

  return fetch(baseUrl + path, {
    method: 'POST',
    headers: {
      mode: '*cors',
    },
    body: data,
  }).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    }

    const error = new Error(res.statusText);
    error.status = res.status;
    throw error;
  });
};

export const post = (path, params) => fetch(baseUrl + path, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    mode: '*cors',
  },
  body: JSON.stringify(params),
}).then((res) => handleResponse(res));

export const patch = (path, params) => fetch(baseUrl + path, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    mode: '*cors',
  },
  body: JSON.stringify(params),
}).then((res) => {
  if (res.status >= 200 && res.status < 300) {
    return res.json();
  }

  const error = new Error(res.statusText);
  error.status = res.status;
  throw error;
});

export const get = (path, params) => {
  let queryString = '';
  if (params) {
    queryString = `?${Object.keys(params).map((key) => `${key}=${params[key]}`).join('&')}`;
  }

  return fetch(baseUrl + path + queryString, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      mode: '*cors',
    },
  }).then((res) => handleResponse(res));
};

export const deleteRequest = (path) => fetch(baseUrl + path, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    mode: '*cors',
  },
}).then((res) => res.json());
