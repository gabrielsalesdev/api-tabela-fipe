import axios from 'axios';
import { BrandRequest } from '../interfaces/brand-request.interface';
import { BrandResponse } from '../interfaces/brand-response.interface';
import { Brand } from '../interfaces/brand.interface';
import ReferenceTablesHelpers from '../helpers/reference-tables.helpers';
import ErrorsHelpers from '../helpers/errors.helpers';

const referenceTablesHelpers = new ReferenceTablesHelpers();
const errorsHelpers = new ErrorsHelpers();

export default class BrandsService {
    vehicleId: number;

    constructor(vehicleId: number) {
        this.vehicleId = vehicleId;
    };

    private request = async (): Promise<BrandResponse[]> => {
        try {
            const body: BrandRequest = {
                codigoTabelaReferencia: await referenceTablesHelpers.getLatest(),
                codigoTipoVeiculo: this.vehicleId
            };

            const { data } = await axios.post('http://veiculos.fipe.org.br/api/veiculos/ConsultarMarcas', body);
            errorsHelpers.verifyResponseErrors(data);

            const brandsRequest: BrandResponse[] = data;
            return brandsRequest;
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
                    idMarca: Number(brand.Value),
                    nomeMarca: brand.Label
                }
            });
            return brands;
        } catch (error) {
            throw error;
        }
    };
};