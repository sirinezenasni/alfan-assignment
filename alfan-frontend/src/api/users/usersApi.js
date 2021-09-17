import { get, post } from '../baseApi';

export const getGoogleLoginUrl = async () => {
  const res = await get('/users/google/login');
  return res;
};

export const googleLogin = async (code) => {
  const res = await post('/users/google/login', { code });
  return res;
};
