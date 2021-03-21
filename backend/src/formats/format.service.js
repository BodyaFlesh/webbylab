const { findAll } = require('./format.repository');

const getFormats = async () => {
    return await findAll();
}

module.exports = {
    getFormats
}