import axios from 'axios';
import errorsHelper from '../helpers/errors.helper';
import RefereceTablesService from './reference-tables.service';
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
            const refereceTablesService = new RefereceTablesService();

            const body: ModelRequest = {
                codigoTabelaReferencia: await refereceTablesService.getLatest(),
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
            const modelsResponse: ModelResponse = await this.request();

            const models: Model[] = modelsResponse.Modelos.map(model => {
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

    public findId = async (model: string): Promise<string> => {
        try {
            const models: Model[] = await this.get();
            const modelFound: Model | undefined = models.find(i => i.nomeModelo === model);

            if (modelFound) {
                const modelId: string = modelFound.idModelo;
                return modelId;
            }

            throw new Error('Model Id not found');
        } catch (error) {
            throw error;
        }
    }
};