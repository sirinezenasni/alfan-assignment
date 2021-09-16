import { get } from '../baseApi';

export const login = async () => {
  const res = await get('/users/login');
  return res;
};

export default login;
