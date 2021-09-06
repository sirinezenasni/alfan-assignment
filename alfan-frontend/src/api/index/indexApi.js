import { get } from '../baseApi';

export const getIndex = async () => {
  const res = await get('/');
  return res;
};

export default getIndex;
