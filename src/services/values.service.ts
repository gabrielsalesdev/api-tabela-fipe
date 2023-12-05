import axios from "axios";
import referenceTablesHelper from '../helpers/reference-tables.helper';
import errorsHelper from '../helpers/errors.helper';
import { ValueRequestTradicional } from "../interfaces/value-request-traditional.interface";
import { ValueResponse } from "../interfaces/value-response.interface";
import { Value } from "../interfaces/value.interface";

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
};

const values = new ValuesService();
values.getTradicional("3", "102", "5986", "2022-3");