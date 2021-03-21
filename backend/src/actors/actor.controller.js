const actorService = require('./actor.service');

const getActors = async (req, res) => {
    try{
        const actors = await actorService.getActors();
        return res.json({actors});
    }catch(error){
        console.error(error);
        return res.json({'status' : 'Error', error}).status(400);
    }
}

module.exports = {
    getActors
}