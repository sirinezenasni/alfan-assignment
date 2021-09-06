module.exports = {
  development: {
    username: 'user',
    password: 'password',
    database: 'alfan-local',
    host: 'alfan-postgres',
    dialect: 'postgres',
  },
  test: {
    username: 'user',
    password: 'password',
    database: 'alfan-test',
    host: 'alfan-postgres',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
};
