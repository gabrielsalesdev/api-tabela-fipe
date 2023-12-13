import axios from "axios";
import NodeCache from 'node-cache';
import errorsHelper from '../helpers/errors.helper';
import dotenvConfig from '../config/dotenv.config';
import RefereceTablesService from "./reference-tables.service";
import { ModelYearRequest } from "../interfaces/model-year-request.interface";
import { ModelYearResponse } from "../interfaces/model-year-response.interface";
import { ModelYear } from "../interfaces/model-year.interface";

const modelYearsCache = new NodeCache();
const cacheKey: string = dotenvConfig.cache.key as string;

export default class ModelYearsService {
    vehicleId: string;
    brandId: string;
    modelId: string;

    constructor(vehicleId: string, brandId: string, modelId: string) {
        this.vehicleId = vehicleId;
        this.brandId = brandId;
        this.modelId = modelId;
    }

    private request = async (): Promise<ModelYearResponse[]> => {
        try {
            const refereceTablesService = new RefereceTablesService();

            const body: ModelYearRequest = {
                codigoTabelaReferencia: await refereceTablesService.getLatest(),
                codigoTipoVeiculo: this.vehicleId,
                codigoMarca: this.brandId,
                codigoModelo: this.modelId
            };

            const { data } = await axios.post('http://veiculos.fipe.org.br/api/veiculos/ConsultarAnoModelo', body);
            errorsHelper.checkResponseErrors(data);

            const modelYearsResponse: ModelYearResponse[] = data;
            return modelYearsResponse;
        } catch (error) {
            throw error;
        }
    };

    public get = async (): Promise<ModelYear[]> => {
        try {
            const modelYearsCached = modelYearsCache.get(cacheKey);

            if (modelYearsCached !== undefined && modelYearsCached !== null) {
                const modelYears: ModelYear[] = modelYearsCached as ModelYear[];
                if (modelYears[0].idVeiculo === this.vehicleId && modelYears[0].idMarca === this.brandId && modelYears[0].idModelo === this.modelId) return modelYears;
            }

            const modelYearsResponse: ModelYearResponse[] = await this.request();

            const modelYears: ModelYear[] = modelYearsResponse.map(modelYear => {
                return {
                    idVeiculo: this.vehicleId,
                    idMarca: this.brandId,
                    idModelo: this.modelId,
                    idAnoModelo: modelYear.Value,
                    nomeAnoModelo: modelYear.Label,
                }
            });

            modelYearsCache.set(cacheKey, modelYears, 86400);

            return modelYears;
        } catch (error) {
            throw error;
        }
    };
};