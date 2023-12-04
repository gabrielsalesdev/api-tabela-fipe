import axios from 'axios';

export default class BrandsService {
    static referenceTableId: number;
    static vehicleId: number;

    private static request = async () => {
        try {
            const body = {
                "codigoTabelaReferencia": this.referenceTableId,
                "codigoTipoVeiculo": this.vehicleId
            };

            const { data } = await axios.post('http://veiculos.fipe.org.br/api/veiculos/ConsultarMarcas', body);
            return data;
        } catch (error) {
            throw error;
        }
    };

    public static get = async (referenceTableId: number, vehicleId: number) => {
        try {
            this.referenceTableId = referenceTableId;
            this.vehicleId = vehicleId;


        } catch (error) {
            throw error;
        }
    };
};