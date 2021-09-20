import { get } from '../baseApi';

export const authGoogle = async (queryString) => {
  const res = await get(`/auth/google${queryString || ''}`);
  return res;
};
