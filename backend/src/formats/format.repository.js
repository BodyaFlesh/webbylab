const Format = require('./Format');

const findAll = async () => {
    return await Format.findAll();
}

const findOneByName = async (name) => {
    return await Format.findOne({where: { name }});
}

module.exports = {
    findAll,
    findOneByName
}