const OfficialFipeApiServices = require('../services/official-fipe-api');

const getVehicleValuesByFipe = async (req, res, next) => {
    try {
        const { fipeCode } = req.params;

        const response = await OfficialFipeApiServices.requestValuesByFipe(fipeCode);

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

const getVehicleValueByFipeAndModelYear = async (req, res, next) => {
    try {
        const { fipeCode, modelYearId } = req.params;

        const response = await OfficialFipeApiServices.requestValueByFipeAndModelYear(fipeCode, modelYearId);

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = { getVehicleValuesByFipe, getVehicleValueByFipeAndModelYear };