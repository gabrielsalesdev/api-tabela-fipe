import axios from "axios";
import errorsHelper from '../helpers/errors.helper';
import RefereceTablesService from "./reference-tables.service";
import BrandsService from "./brands.service";
import ModelsService from "./models.service";
import { ValueRequestTradicional } from "../interfaces/value-request-traditional.interface";
import { ValueResponse } from "../interfaces/value-response.interface";
import { Value } from "../interfaces/value.interface";
import { ValueRequestByFipe } from "../interfaces/value-request-by-fipe.interface";
import { ModelYearRequestByFipe } from "../interfaces/model-year-request-by-fipe.interface";
import { ModelYearResponse } from "../interfaces/model-year-response.interface";

export default class ValuesService {
    private requestTradicional = async (vehicleId: string, brandId: string, modelId: string, modelYearId: string): Promise<ValueResponse> => {
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

    public getTradicional = async (vehicleId: string, brandId: string, modelId: string, modelYearId: string): Promise<Value> => {
        try {
            const valueResponse: ValueResponse = await this.requestTradicional(vehicleId, brandId, modelId, modelYearId);

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
            const modelYearsIds: string[] = await this.requestByFipe(fipeCode);

            let values: Value[] = [];

            for (const modelYearId of modelYearsIds) {
                values.push(await this.getByFipeAndModelYear(fipeCode, modelYearId));
            }

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
            const { vehicleId, brand, model } = await this.requestByFipeAndModelYear(fipeCode, modelYearId);

            const brandsService = new BrandsService(vehicleId);
            const brandId: string = await brandsService.findId(brand);

            const modelsService = new ModelsService(vehicleId, brandId);
            const modelId: string = await modelsService.findId(model);

            const value: Value = await this.getTradicional(vehicleId, brandId, modelId, modelYearId);
            return value;
        } catch (error) {
            throw error;
        }
    };
};