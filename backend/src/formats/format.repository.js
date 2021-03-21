const Format = require('./Format');

const findAll = async () => {
    return await Format.findAll();
}

module.exports = {
    findAll
}