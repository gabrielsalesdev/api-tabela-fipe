const knex = require('../database/knex');

const { fipeApiServices } = require('../services/index');

const selectLatestReferenceTableId = async () => {
    try {
        const latestReferenceTable = await knex('reference_tables').select('*').orderBy('id', 'desc').first();

        return latestReferenceTable.id;
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

const insertReferenceTables = async () => {
    try {
        const referenceTables = await fipeApiServices.requestReferenceTables();

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
        const vehicles = await selectVehicles();

        for (const vehicle of vehicles) {
            const brands = await fipeApiServices.requestBrands(vehicle.id);

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


