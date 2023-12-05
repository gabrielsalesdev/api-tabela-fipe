import axios from 'axios';
import referenceTablesHelper from '../helpers/reference-tables.helper';
import errorsHelper from '../helpers/errors.helper';
import { BrandRequest } from '../interfaces/brand-request.interface';
import { BrandResponse } from '../interfaces/brand-response.interface';
import { Brand } from '../interfaces/brand.interface';

export default class BrandsService {
    vehicleId: string;

    constructor(vehicleId: string) {
        this.vehicleId = vehicleId;
    };

    private request = async (): Promise<BrandResponse[]> => {
        try {
            const body: BrandRequest = {
                codigoTabelaReferencia: await referenceTablesHelper.getLatest(),
                codigoTipoVeiculo: this.vehicleId
            };

            const { data } = await axios.post('http://veiculos.fipe.org.br/api/veiculos/ConsultarMarcas', body);
            errorsHelper.checkResponseErrors(data);

            const brandsResponse: BrandResponse[] = data;
            return brandsResponse;
        } catch (error) {
            throw error;
        }
    };

    public get = async (): Promise<Brand[]> => {
        try {
            const brandsRequest: BrandResponse[] = await this.request();

            const brands: Brand[] = brandsRequest.map(brand => {
                return {
                    idVeiculo: this.vehicleId,
                    idMarca: brand.Value,
                    nomeMarca: brand.Label
                }
            });
            return brands;
        } catch (error) {
            throw error;
        }
    };
};