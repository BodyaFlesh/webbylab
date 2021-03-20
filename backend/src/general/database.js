const Sequelize = require('sequelize');
const config = require('config');

const { database, username, password, dialect, storage, logging, host } = config.get('database');

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    storage,
    logging
});

module.exports = sequelize;