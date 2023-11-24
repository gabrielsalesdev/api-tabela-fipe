const OfficialFipeApiServices = require('../services/official-fipe-api');

const getBrands = (vehicleType) => async (req, res, next) => {
    try {
        const response = await OfficialFipeApiServices.requestBrands(vehicleType);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const getModels = (vehicleType) => async (req, res, next) => {
    try {
        const { brandId } = req.params;

        const response = await OfficialFipeApiServices.requestModels(vehicleType, brandId);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const getModelYears = (vehicleType) => async (req, res, next) => {
    try {
        const { brandId, modelId } = req.params;

        const response = await OfficialFipeApiServices.requestModelYears(vehicleType, brandId, modelId);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const getValue = (vehicleType) => async (req, res, next) => {
    try {
        const { brandId, modelId, modelYearId } = req.params;

        const response = await OfficialFipeApiServices.requestValue(vehicleType, brandId, modelId, modelYearId);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = { getBrands, getModels, getModelYears, getValue };
