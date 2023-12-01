import axios from 'axios';
import HttpError from '../errors/http.error';
import { ReferenceTable } from '../interfaces/reference-table.interface';
import { ReferenceTableRequest } from '../interfaces/reference-table-request.interface';

export default class ReferenceTablesService {
    private static request = async (): Promise<ReferenceTableRequest[]> => {
        try {
            const { data } = await axios.post('http://veiculos.fipe.org.br/api/veiculos/ConsultarTabelaDeReferencia');
            return data;
        } catch (error) {
            throw error;
        }
    };

    public static get = async (): Promise<ReferenceTable[]> => {
        const data: ReferenceTableRequest[] = await this.request();

        const referenceTables: ReferenceTable[] = data.map((referenceTable: ReferenceTableRequest) => ({
            id: referenceTable.Codigo,
            month: referenceTable.Mes
        }));
        return referenceTables;
    };
};