import { get } from '../baseApi';

export const getGoogleLoginUrl = async () => {
  const res = await get('/users/google/login');
  return res;
};

export default getGoogleLoginUrl;
