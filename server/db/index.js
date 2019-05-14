const pg = require('pg');
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')
const postgresUrl = `postgres://localhost/${databaseName}`
const db = new pg.Client(postgresUrl);

db.connect();

module.exports = db;