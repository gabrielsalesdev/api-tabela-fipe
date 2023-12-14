import axios from "axios";
import NodeCache from 'node-cache';
import errorsHelper from '../helpers/errors.helper';
import dotenvConfig from '../config/dotenv.config';
import RefereceTablesService from "./reference-tables.service";
import BrandsService from "./brands.service";
import ModelsService from "./models.service";
import { ValueRequestTradicional } from "../interfaces/value-request-traditional.interface";
import { ValueResponse } from "../interfaces/value-response.interface";
import { Value } from "../interfaces/value.interface";
import { ValueRequestByFipe } from "../interfaces/value-request-by-fipe.interface";
import { ModelYearRequestByFipe } from "../interfaces/model-year-request-by-fipe.interface";
import { ModelYearResponse } from "../interfaces/model-year-response.interface";

const valuesTraditionalCache = new NodeCache();
const valuesByFipeCache = new NodeCache();
const valuesByFipeAndModelYearCache = new NodeCache();
const cacheKey: string = dotenvConfig.cache.key as string;

export default class ValuesService {
    private requestTraditional = async (vehicleId: string, brandId: string, modelId: string, modelYearId: string): Promise<ValueResponse> => {
        try {
            const refereceTablesService = new RefereceTablesService();

            const body: ValueRequestTradicional = {
                codigoTabelaReferencia: await refereceTablesService.getLatest(),
                codigoTipoVeiculo: vehicleId,
                codigoMarca: brandId,
                codigoModelo: modelId,
                ano: modelYearId,
                anoModelo: modelYearId.split('-')[0],
                codigoTipoCombustivel: modelYearId.split('-')[1],
                tipoConsulta: "tradicional"
            };

            const { data } = await axios.post('http://veiculos.fipe.org.br/api/veiculos/ConsultarValorComTodosParametros', body);
            errorsHelper.checkResponseErrors(data);

            const valueResponse: ValueResponse = data;
            return valueResponse;
        } catch (error) {
            throw error;
        }
    };

    public getTraditional = async (vehicleId: string, brandId: string, modelId: string, modelYearId: string): Promise<Value> => {
        try {
            const valueCached = valuesTraditionalCache.get(cacheKey);

            if (valueCached !== undefined && valueCached !== null) {
                const value: Value = valueCached as Value;
                if (value.idVeiculo === vehicleId && value.idMarca === brandId && value.idModelo === modelId && value.idAnoModelo === modelYearId) return value;
            }

            const valueResponse: ValueResponse = await this.requestTraditional(vehicleId, brandId, modelId, modelYearId);

            const value: Value = {
                idVeiculo: vehicleId,
                idMarca: brandId,
                nomeMarca: valueResponse.Marca,
                idModelo: modelId,
                nomeModelo: valueResponse.Modelo,
                idAnoModelo: modelYearId,
                ano: valueResponse.AnoModelo.toString(),
                combustivel: valueResponse.Combustivel,
                preco: valueResponse.Valor,
                codigoFipe: valueResponse.CodigoFipe,
            };

            valuesTraditionalCache.set(cacheKey, value, 86400);

            return value;
        } catch (error) {
            throw error;
        }
    };

    private requestByFipe = async (fipeCode: string): Promise<string[]> => {
        try {
            let modelYearsIds: string[] = [];
            let code: string = '0';

            for (let i = 1; i <= 3; i++) {
                const refereceTablesService = new RefereceTablesService();

                const body: ModelYearRequestByFipe = {
                    codigoTabelaReferencia: await refereceTablesService.getLatest(),
                    codigoTipoVeiculo: i.toString(),
                    modeloCodigoExterno: fipeCode
                };

                const { data } = await axios.post('https://veiculos.fipe.org.br/api/veiculos/ConsultarAnoModeloPeloCodigoFipe', body);

                if (data.codigo && data.codigo === '2') code = '2';

                if (Array.isArray(data)) {
                    const modelYearsResponse: ModelYearResponse[] = data;

                    for (const modelYear of modelYearsResponse) {
                        modelYearsIds.push(modelYear.Value);
                    }
                }
            }

            if (modelYearsIds.length === 0) errorsHelper.checkResponseErrors({ codigo: code });

            return modelYearsIds;
        } catch (error) {
            throw error;
        }
    };

    public getByFipe = async (fipeCode: string): Promise<Value[]> => {
        try {
            const valuesCached = valuesByFipeCache.get(cacheKey);

            if (valuesCached !== undefined && valuesCached !== null) {
                const values: Value[] = valuesCached as Value[];
                if (values[0].codigoFipe === fipeCode) return values;
            }

            const modelYearsIds: string[] = await this.requestByFipe(fipeCode);

            const values: Value[] = [];

            for (const modelYearId of modelYearsIds) {
                values.push(await this.getByFipeAndModelYear(fipeCode, modelYearId));
            }

            valuesByFipeCache.set(cacheKey, values, 86400);

            return values;
        } catch (error) {
            throw error;
        }
    };

    private requestByFipeAndModelYear = async (fipeCode: string, modelYearId: string): Promise<{ vehicleId: string, brand: string, model: string }> => {
        try {
            let vehicleId: string = '';
            let brand: string = '';
            let model: string = '';
            let code: string = '0';

            for (let i = 1; i <= 3; i++) {
                const refereceTablesService = new RefereceTablesService();

                const body: ValueRequestByFipe = {
                    codigoTabelaReferencia: await refereceTablesService.getLatest(),
                    codigoTipoVeiculo: i.toString(),
                    anoModelo: modelYearId.split('-')[0],
                    modeloCodigoExterno: fipeCode,
                    codigoTipoCombustivel: modelYearId.split('-')[1],
                    tipoConsulta: "codigo"
                };

                const { data } = await axios.post('https://veiculos.fipe.org.br/api/veiculos/ConsultarValorComTodosParametros', body);

                if (data.codigo && data.codigo === '2') code = '2';

                if (!data.codigo) {
                    vehicleId = i.toString();
                    brand = data.Marca;
                    model = data.Modelo;
                }
            }

            if (!vehicleId) errorsHelper.checkResponseErrors({ codigo: code });

            return { vehicleId, model, brand }
        } catch (error) {
            throw error;
        }
    };

    public getByFipeAndModelYear = async (fipeCode: string, modelYearId: string): Promise<Value> => {
        try {
            const valueCached = valuesByFipeAndModelYearCache.get(cacheKey);

            if (valueCached !== undefined && valueCached !== null) {
                const value: Value = valueCached as Value;
                if (value.codigoFipe === fipeCode && value.idAnoModelo === modelYearId) return value;
            }

            const { vehicleId, brand, model } = await this.requestByFipeAndModelYear(fipeCode, modelYearId);

            const brandsService = new BrandsService(vehicleId);
            const brandId: string = await brandsService.findId(brand);

            const modelsService = new ModelsService(vehicleId, brandId);
            const modelId: string = await modelsService.findId(model);

            const value: Value = await this.getTraditional(vehicleId, brandId, modelId, modelYearId);

            valuesByFipeAndModelYearCache.set(cacheKey, value, 86400);

            return value;
        } catch (error) {
            throw error;
        }
    };
};