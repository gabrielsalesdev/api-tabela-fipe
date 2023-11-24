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

