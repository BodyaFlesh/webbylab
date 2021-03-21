const formatService = require('./format.service');

const getFormats = async (req, res) => {
    try{
        const formats = await formatService.getFormats();
        return res.json({formats});
    }catch(error){
        console.error(error);
        return res.json({'status' : 'Error', error}).status(400);
    }
}

module.exports = {
    getFormats
}