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

const findOrCreateListOfActors = async (actors) => {
    const newActors = [];

    //check all actor and create new in DB or get
    if(actors && actors.length > 0 && Array.isArray(actors)){
        actors.forEach(async (el) => {
            let [first_name, ...last_name] = el.trim().split(' ');
            if(first_name && last_name){
                last_name = last_name.join(' ');
                const [ actor ] = await findOrCreate({ first_name, last_name });
                newActors.push(actor.id);
            }
        });
    }

    return newActors;
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
    findAll,
    findOrCreateListOfActors
}