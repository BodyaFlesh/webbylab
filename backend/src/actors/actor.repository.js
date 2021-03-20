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

module.exports = {
    createActor,
    findOrCreate
}