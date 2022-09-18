require('dotenv-safe/config');

const { exec } = require('child_process');

process.env.DB_URL = `${process.env.db_URL}_test?schema`

//TODO: transform is syncronous executation to avoid race condition
exec('yarn db:migrate');

module.exports = { }
