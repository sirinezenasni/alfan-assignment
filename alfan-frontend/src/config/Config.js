const config = {
  baseApiUrl: process.env.REACT_APP_BASE_API_URL || 'http://localhost:8002',
  phoneNumberRegex: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
  emailRegex: /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
  passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

export default config;
