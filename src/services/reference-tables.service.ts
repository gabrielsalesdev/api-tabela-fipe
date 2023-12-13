import axios from 'axios';
import NodeCache from 'node-cache';
import dotenvConfig from '../config/dotenv.config';
import { ReferenceTableResponse } from '../interfaces/reference-table-response.interface';

const referenceTablesCache = new NodeCache();
const cacheKey: string = dotenvConfig.cache.key as string;

export default class RefereceTablesService {
    private request = async (): Promise<ReferenceTableResponse[]> => {
        try {
            const { data } = await axios.post('http://veiculos.fipe.org.br/api/veiculos/ConsultarTabelaDeReferencia');

            const referenceTablesResponse: ReferenceTableResponse[] = data;
            return referenceTablesResponse;
        } catch (error) {
            throw error;
        }
    }

    public getLatest = async (): Promise<string> => {
        try {
            const referenceTableCached = referenceTablesCache.get(cacheKey);

            if (referenceTableCached !== undefined && referenceTableCached !== null) {
                const latestReferenceTable: number = referenceTableCached as number;
                return latestReferenceTable.toString();
            }

            const referenceTablesResponse: ReferenceTableResponse[] = await this.request();
            const latestReferenceTable: number = referenceTablesResponse[0].Codigo;

            referenceTablesCache.set(cacheKey, latestReferenceTable, 86400);

            return latestReferenceTable.toString();
        } catch (error) {
            throw error;
        }
    };
};