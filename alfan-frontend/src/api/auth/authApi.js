import { get } from '../baseApi';

export default async (queryString) => {
  const res = await get(`/auth/google${queryString || ''}`);
  return res;
};
