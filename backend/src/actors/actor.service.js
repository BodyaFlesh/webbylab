const { findAll } = require('./actor.repository');

const getActors = async () => {
    return await findAll();
}

module.exports = {
    getActors
}