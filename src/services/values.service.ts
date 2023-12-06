import axios from "axios";
import referenceTablesHelper from '../helpers/reference-tables.helper';
import errorsHelper from '../helpers/errors.helper';
import BrandsService from "./brands.service";
import ModelsService from "./models.service";
import { ValueRequestTradicional } from "../interfaces/value-request-traditional.interface";
import { ValueResponse } from "../interfaces/value-response.interface";
import { Value } from "../interfaces/value.interface";
import { ValueRequestByFipe } from "../interfaces/value-request-by-fipe.interface";

export default class ValuesService {
    private requestTradicional = async (vehicleId: string, brandId: string, modelId: string, modelYearId: string): Promise<ValueResponse> => {
        try {
            const body: ValueRequestTradicional = {
                codigoTabelaReferencia: await referenceTablesHelper.getLatest(),
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
            const valueResquest: ValueResponse = await this.requestTradicional(vehicleId, brandId, modelId, modelYearId);

            const value: Value = {
                idVeiculo: vehicleId,
                idMarca: brandId,
                nomeMarca: valueResquest.Marca,
                idModelo: modelId,
                nomeModelo: valueResquest.Modelo,
                idAnoModelo: modelYearId,
                ano: valueResquest.AnoModelo.toString(),
                combustivel: valueResquest.Combustivel,
                preco: valueResquest.Valor,
                codigoFipe: valueResquest.CodigoFipe,
            };
            return value;
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
                const body: ValueRequestByFipe = {
                    codigoTabelaReferencia: await referenceTablesHelper.getLatest(),
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