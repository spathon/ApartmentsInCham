module.exports = {
  development: {
    database: 'test_db',
    username: 'root',
    password: null,
    host: '127.0.0.1',
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: () => {}
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
}
