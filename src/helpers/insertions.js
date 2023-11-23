const knex = require('../database/knex');
const { fipeApiServices } = require('../services/index');

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