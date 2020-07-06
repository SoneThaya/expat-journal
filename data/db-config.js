// const knex = require("knex");

// const knexfile = require('../knexfile');
// const environment = process.env.NODE_ENV || "development";

// module.exports = knex(knexfile[environment]);

const knex = require('knex');
const config = require('../knexfile');

const dbEnv = process.env.DB_ENV || 'development';

module.exports = knex(config[dbEnv]);