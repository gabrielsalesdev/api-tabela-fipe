import axios from 'axios';
import referenceTablesHelper from "../helpers/reference-tables.helper";
import errorsHelper from '../helpers/errors.helper';
import { ModelRequest } from "../interfaces/model-request.interface";
import { ModelResponse } from '../interfaces/model-response.interface';
import { Model } from '../interfaces/model.interface';

export default class ModelsService {
    vehicleId: string;
    brandId: string;

    constructor(vehicleId: string, brandId: string) {
        this.vehicleId = vehicleId;
        this.brandId = brandId;
    }

    private request = async (): Promise<ModelResponse> => {
        try {
            const body: ModelRequest = {
                codigoTabelaReferencia: await referenceTablesHelper.getLatest(),
                codigoTipoVeiculo: this.vehicleId,
                codigoMarca: this.brandId
            };

            const { data } = await axios.post('http://veiculos.fipe.org.br/api/veiculos/ConsultarModelos', body);
            errorsHelper.checkResponseErrors(data);

            const modelsResponse: ModelResponse = data;
            return modelsResponse;
        } catch (error) {
            throw error;
        }
    };

    public get = async (): Promise<Model[]> => {
        try {
            const modelsRequest: ModelResponse = await this.request();

            const models: Model[] = modelsRequest.Modelos.map(model => {
                return {
                    idVeiculo: this.vehicleId,
                    idMarca: this.brandId,
                    idModelo: model.Value.toString(),
                    nomeModelo: model.Label
                }
            });
            return models;
        } catch (error) {
            throw error;
        }
    };
};