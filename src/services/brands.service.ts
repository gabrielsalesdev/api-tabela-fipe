import axios from 'axios';
import errorsHelper from '../helpers/errors.helper';
import RefereceTablesService from './reference-tables.service';
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
            const refereceTablesService = new RefereceTablesService();

            const body: BrandRequest = {
                codigoTabelaReferencia: await refereceTablesService.getLatest(),
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
            const brandsResponse: BrandResponse[] = await this.request();

            const brands: Brand[] = brandsResponse.map(brand => {
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

    public findId = async (brand: string): Promise<string> => {
        try {
            const brands: Brand[] = await this.get();
            const brandFound: Brand | undefined = brands.find(i => i.nomeMarca === brand);

            if (brandFound) {
                const brandId: string = brandFound.idMarca;
                return brandId;
            }

            throw new Error('Brand Id not found');
        } catch (error) {
            throw error;
        }
    };
};