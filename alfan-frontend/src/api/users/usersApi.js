import { get } from '../baseApi';

export default async () => {
  const res = await get('/users/youtube');
  return res;
};
