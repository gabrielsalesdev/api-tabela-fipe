const knex = require('../database/knex');

const officialFipeApiServices = require('../services/official-fipe-api');

const selectLatestReferenceTable = async () => {
    try {
        const latestReferenceTable = await knex('reference_tables').select('*').orderBy('id', 'desc').first();

        return latestReferenceTable;
    } catch (error) {
        console.log(error);
    }
};

const selectVehicles = async () => {
    try {
        const vehicles = await knex('vehicles').select('*');

        return vehicles;
    } catch (error) {
        console.log(error);
    }
};

const selectAllBrands = async () => {
    try {
        const brands = await knex('brands').select('*');

        return brands;
    } catch (error) {
        console.error(error);
    }
};

const selectBrandsByVehicleId = async (vehicleId) => {
    try {
        const brands = await knex('brands').select('*').where({
            vehicle_id: vehicleId
        });

        return brands;
    } catch (error) {
        console.error(error);
    }
};

const selectModels = async () => {
    try {
        const models = await knex('models').select('*');

        return models
    } catch (error) {
        console.log(error);
    }
};

const insertReferenceTables = async () => {
    try {
        const referenceTables = await officialFipeApiServices.requestReferenceTables();

        for (const referenceTable of referenceTables) {
            await knex('reference_tables').insert({
                id: referenceTable.id,
                month: referenceTable.month
            }).onConflict('id').ignore();
        }
    } catch (error) {
        console.error(error)
    }
};

const insertBrands = async () => {
    try {
        const latestReferenceTable = await selectLatestReferenceTable();

        const vehicles = await selectVehicles();

        for (const vehicle of vehicles) {
            const brands = await officialFipeApiServices.requestBrands(latestReferenceTable.id, vehicle.id);

            for (const brand of brands) {
                await knex('brands').insert({
                    id: brand.id,
                    name: brand.name,
                    vehicle_id: brand.vehicleId
                }).onConflict('id').ignore();
            }
        }
    } catch (error) {
        console.error(error);
    }
};

const insertModels = async () => {
    try {
        const latestReferenceTable = await selectLatestReferenceTable();

        const brands = await selectAllBrands();

        for (const brand of brands) {
            const models = await officialFipeApiServices.requestModels(latestReferenceTable.id, brand.vehicle_id, brand.id);

            for (const model of models) {
                await knex('models').insert({
                    id: model.id,
                    name: model.name,
                    brand_id: model.brandId,
                    vehicle_id: model.vehicleId
                }).onConflict('id').ignore();
            }
        }
    } catch (error) {
        console.error(error);
    }
};

const insertModelYears = async () => {
    try {
        const latestReferenceTable = await selectLatestReferenceTable();
        let id = 1;

        const models = await selectModels();

        for (const model of models) {
            const modelYears = await officialFipeApiServices.requestModelYears(latestReferenceTable.id, model.vehicle_id, model.brand_id, model.id);

            for (const modelYear of modelYears) {
                const modelYearExist = await knex('model_years').select('*').where({
                    name: modelYear.name,
                    year: modelYear.year,
                    fuel_id: modelYear.fuelId,
                    brand_id: modelYear.brandId,
                    model_id: modelYear.modelId,
                    vehicle_id: modelYear.vehicleId
                });

                if (modelYearExist.length === 0) {
                    await knex('model_years').insert({
                        id: id++,
                        name: modelYear.name,
                        year: modelYear.year,
                        fuel_id: modelYear.fuelId,
                        brand_id: modelYear.brandId,
                        model_id: modelYear.modelId,
                        vehicle_id: modelYear.vehicleId
                    });
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = { selectBrandsByVehicleId, insertReferenceTables, insertBrands, insertModels, insertModelYears };