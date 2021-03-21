const Actor = require('./Actor');

const createActor = async ({ first_name, last_name }) => {
    return await Actor.create({ first_name, last_name });
}

const findOrCreate = async ({ first_name, last_name }) => {
    return await Actor.findOrCreate({ 
        where: { 
            first_name, 
            last_name 
        },
        defaults: {
            first_name, 
            last_name
        }
    });
} 

const findAll = async () => {
    const actors = await Actor.findAll();
    return actors.map(el => {
        return {
            ...el.dataValues,
            name: `${el.first_name} ${el.last_name}`
        }
    });
}

module.exports = {
    createActor,
    findOrCreate,
    findAll
}