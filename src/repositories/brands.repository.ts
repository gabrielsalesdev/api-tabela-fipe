// import knex from '../database/knex';
import { Brand } from '../interfaces/brand.interface';

export default class BrandsRepository {
    public async selectAll() {
        try {
            const brands = await knex('brands').select('*');
            return brands;
        } catch (error) {
            console.error(error);
        }
    }
};