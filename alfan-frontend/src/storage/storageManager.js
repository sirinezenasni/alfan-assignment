export const getJWT = () => localStorage.getItem('jwt') || '';

export const setJWT = (jwt) => localStorage.setItem('jwt', jwt);

export const isLogged = () => !!getJWT();

export const logout = () => setJWT('');
