const { fipeApiServices } = require('../services/index');

const getVehicleValueByFipe = async (req, res, next) => {
    try {
        const { fipeCode } = req.params;

        const response = await fipeApiServices.requestValueByFipe(fipeCode);

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

const getVehicleValueByFipeAndModelYear = async (req, res, next) => {
    try {
        const { fipeCode, modelYearId } = req.params;

        const response = await fipeApiServices.requestValueByFipeAndModelYear(fipeCode, modelYearId);

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = { getVehicleValueByFipe, getVehicleValueByFipeAndModelYear };