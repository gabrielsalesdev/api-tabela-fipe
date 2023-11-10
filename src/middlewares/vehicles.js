const { HttpError } = require('../errors/index');

const validateType = async (req, res, next) => {
    try {
        const { vehicle } = req.params;

        const vehicleTypeMap = {
            carros: '1',
            motos: '2',
            caminhoes: '3'
        }

        const vehicleType = vehicleTypeMap[vehicle];

        if (!vehicleType) throw new HttpError('Tipo de veículo não encontrado', 404);

        req.vehicleType = vehicleType;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { validateType };