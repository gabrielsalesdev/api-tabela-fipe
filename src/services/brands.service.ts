import axios from 'axios';
import NodeCache from 'node-cache';
import errorsHelper from '../helpers/errors.helper';
import dotenvConfig from '../config/dotenv.config';
import RefereceTablesService from './reference-tables.service';
import { BrandRequest } from '../interfaces/brand-request.interface';
import { BrandResponse } from '../interfaces/brand-response.interface';
import { Brand } from '../interfaces/brand.interface';

const brandsCache = new NodeCache();
const cacheKey: string = dotenvConfig.cache.key as string;

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
            const brandsCached = brandsCache.get(cacheKey);

            if (brandsCached !== undefined && brandsCached !== null) {
                const brands: Brand[] = brandsCached as Brand[];
                if (brands[0].idVeiculo === this.vehicleId) return brands;
            }

            const brandsResponse: BrandResponse[] = await this.request();

            const brands: Brand[] = brandsResponse.map(brand => {
                return {
                    idVeiculo: this.vehicleId,
                    idMarca: brand.Value,
                    nomeMarca: brand.Label
                }
            });

            brandsCache.set(cacheKey, brands, 86400);

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