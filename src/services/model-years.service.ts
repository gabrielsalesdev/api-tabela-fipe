import axios from "axios";
import referenceTablesHelper from "../helpers/reference-tables.helper";
import errorsHelper from '../helpers/errors.helper';
import { ModelYearRequest } from "../interfaces/model-year-request.interface";
import { ModelYearResponse } from "../interfaces/model-year-response.interface";
import { ModelYear } from "../interfaces/model-year.interface";

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
            const body: ModelYearRequest = {
                codigoTabelaReferencia: await referenceTablesHelper.getLatest(),
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
            const modelYearsRequest: ModelYearResponse[] = await this.request();

            const modelYears: ModelYear[] = modelYearsRequest.map(modelYear => {
                return {
                    idVeiculo: this.vehicleId,
                    idMarca: this.brandId,
                    idModelo: this.modelId,
                    idAnoModelo: modelYear.Value,
                    nomeAnoModelo: modelYear.Label,
                }
            });
            return modelYears;
        } catch (error) {
            throw error;
        }
    };
};