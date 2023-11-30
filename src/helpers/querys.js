const knex = require('../database/knex');
const retry = require('retry');

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

const selectAllModels = async () => {
    try {
        const models = await knex('models').select('*');

        return models
    } catch (error) {
        console.log(error);
    }
};

const selectModelsByBrandId = async (vehicleId, brandId) => {
    try {
        const models = await knex('models').select('*').where({
            brand_id: brandId,
            vehicle_id: vehicleId
        });

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
        const operation = retry.operation({
            retries: 100,
            factor: 2,
            minTimeout: 10000,
            maxTimeout: 600000,
            randomize: true
        });

        return new Promise(async (resolve, reject) => {
            operation.attempt(async currentAttempt => {
                try {
                    const latestReferenceTable = await selectLatestReferenceTable();

                    const lastSuccessPoint = await getLastSuccessPointModels();

                    const brands = await selectAllBrands();

                    for (let i = lastSuccessPoint; i < brands.length; i++) {
                        const brand = brands[i];
                        const models = await officialFipeApiServices.requestModels(latestReferenceTable.id, brand.vehicle_id, brand.id);

                        for (const model of models) {
                            const oi = await knex('models').insert({
                                id: model.id,
                                name: model.name,
                                brand_id: model.brandId,
                                vehicle_id: model.vehicleId
                            }).onConflict('id').ignore().returning('*');

                            console.log(oi);
                        }
                        console.log(i);
                        await updateLastSuccessPointModels(i);
                    }

                    await updateLastSuccessPointModels(0);

                    resolve('Operation completed successfully');
                }
                catch (error) {
                    console.error(`Attempt: ${currentAttempt}, Error: ${error}`);

                    if (operation.retry(error)) return;

                    reject(operation.mainError());
                }
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const insertModelYears = async () => {
    try {
        const latestReferenceTable = await selectLatestReferenceTable();
        let id = 1;

        const models = await selectAllModels();

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

const getLastSuccessPointModels = async () => {
    try {
        const result = await knex('models_progress').select('last_success_point').first();

        return result.last_success_point;
    } catch (error) {
        console.error(error);
    }
};

const updateLastSuccessPointModels = async (lastSuccessPoint) => {
    try {
        await knex('models_progress').update({ last_success_point: lastSuccessPoint }).where({ id: 1 });
    } catch (error) {
        console.error(error);
    }
};

// module.exports = { selectBrandsByVehicleId, selectModelsByBrandId, insertReferenceTables, insertBrands, insertModels, insertModelYears };
export default { selectBrandsByVehicleId, selectModelsByBrandId, insertReferenceTables, insertBrands, insertModels, insertModelYears };