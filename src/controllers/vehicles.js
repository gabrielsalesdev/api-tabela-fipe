const { fipeApiServices } = require('../services/index');

const getBrands = (vehicleType) => async (req, res, next) => {
    try {
        const { vehicleType } = req;

        const response = await fipeApiServices.requestBrands(vehicleType);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const getModels = (vehicleType) => async (req, res, next) => {
    try {
        const { vehicleType } = req;
        const { brandId } = req.params;

        const response = await fipeApiServices.requestModels(vehicleType, brandId);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const getModelYears = (vehicleType) => async (req, res, next) => {
    try {
        const { vehicleType } = req;
        const { brandId, modelId } = req.params;

        const response = await fipeApiServices.requestModelYears(vehicleType, brandId, modelId);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const getValue = async (req, res, next) => {
    try {
        const { vehicleType } = req;
        const { brandId, modelId, modelYearId } = req.params;

        const response = await fipeApiServices.requestValue(vehicleType, brandId, modelId, modelYearId);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = { getBrands, getModels, getModelYears, getValue };
