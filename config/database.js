module.exports = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '1203',
  database: process.env.DB_DATABASE || 'm24',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'mysql',
}