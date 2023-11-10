const { fipeApiServices } = require('../services/index');

const getBrands = async (req, res, next) => {
    try {
        const { vehicleType } = req;

        const response = await fipeApiServices.requestBrands(vehicleType);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const getModels = async (req, res, next) => {
    try {
        const { vehicleType } = req;
        const { brandId } = req.params;

        const response = await fipeApiServices.requestModels(vehicleType, brandId);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = { getBrands, getModels };
