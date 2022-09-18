require('dotenv-safe/config');

const { exec } = require('child_process');

process.env.DATABASE_URL = `${process.env.DATABASE_URL}_testdb?schema=test_schema`

//TODO: transform is syncronous executation to avoid race condition
exec('yarn db:migrate');
exec('echo "hello"');

module.exports = { }
