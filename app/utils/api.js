import CONFIG from '../../env.config';
import serialize from './serialize';
import { getItem } from './storage';

const getHeaders = async () => {
  const token = await getItem('token');

  const obj = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (token) {
    obj.headers.Authorization = `Bearer ${token}`;
  }
  return obj;
};

export const cleanGet = (url) => {
  return fetch(url, {
    method: 'GET',
  }).then((response) =>
    response
      .json()
      .then((jsonData) => jsonData)
      .catch((err) => {
        console.log(err);
      }),
  );
};

export const get = async (uri, params = {}) => {
  const body = serialize(params);
  const { headers } = await getHeaders();
  return fetch(`${CONFIG.API_URL}/${uri}${body ? `?${body}` : ''}`, {
    method: 'GET',
    headers,
  }).then((response) =>
    response
      .json()
      .then((jsonData) => jsonData)
      .catch((err) => {
        console.log(err);
      }),
  );
};

export const postWithFile = (uri, params = {}) => {
  return fetch(`${CONFIG.API_URL}/${uri}`, {
    method: 'POST',
    body: params,
  })
    .then((response) => {
      if (response.status !== 200) {
        console.log(response.statusText);
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postWithFileBearer = (uri, params = {}) => {
  const token = '';
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return fetch(`${CONFIG.API_URL}/${uri}`, {
    method: 'POST',
    headers,
    body: params,
  })
    .then((response) => {
      if (response.status !== 200) {
        console.log(response.statusText);
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const post = async (uri, params = {}) => {
  const body = JSON.stringify({
    ...params,
  });

  const { headers } = await getHeaders();

  return fetch(`${CONFIG.API_URL}/${uri}`, {
    method: 'POST',
    headers,
    body,
  })
    .then((response) => {
      if (response.status !== 200) {
        console.log(response.statusText);
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const update = async (uri, params = {}) => {
  const body = JSON.stringify({
    ...params,
  });

  const { headers } = await getHeaders();

  return fetch(`${CONFIG.API_URL}/${uri}`, {
    method: 'PUT',
    headers,
    body,
  })
    .then((response) => {
      if (response.status !== 200) {
        console.log(response.statusText);
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const del = async (uri, params = {}) => {
  const body = serialize(params);
  const { headers } = await getHeaders();
  return fetch(`${CONFIG.API_URL}/${uri}${body ? `?${body}` : ''}`, {
    method: 'DELETE',
    headers,
  }).then((response) =>
    response
      .json()
      .then((jsonData) => jsonData)
      .catch((err) => {
        console.log(err);
      }),
  );
};
