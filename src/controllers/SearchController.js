const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(req, resp) {
        // BUSCAR TODOS DEVS NUM RAIO 10KMs
        // FILTRAR TECNOLOGIAS
        // console.log(req.query);

        const { techs, latitude, longitude } = req.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return resp.json({ devs });
    }
}