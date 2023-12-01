import knex from '../databases/knex.database';
import ReferenceTablesService from '../services/referece-tables.service';
import { ReferenceTable } from '../interfaces/reference-table.interface';

export default class ReferenceTablesRepository {
    public static selectLatest = async (): Promise<ReferenceTable> => {
        try {
            const latestReferenceTable: ReferenceTable = await knex('reference_tables').select('*').orderBy('id', 'desc').first();
            return latestReferenceTable;
        } catch (error) {
            throw error;
        }
    };

    public insertAll = async () => {
        try {
            const referenceTables: ReferenceTable[] = await ReferenceTablesService.get();

            for (const referenceTable of referenceTables) {
                await knex('reference_tables').insert({
                    id: referenceTable.id,
                    month: referenceTable.month
                }).onConflict('id').ignore();
            };
        } catch (error) {
            throw error;
        }
    };
};