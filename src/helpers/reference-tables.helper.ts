import axios from 'axios';

const getLatest = async (): Promise<string> => {
    try {
        const { data } = await axios.post('http://veiculos.fipe.org.br/api/veiculos/ConsultarTabelaDeReferencia');

        const latestReferenceTable: number = data[0].Codigo;

        return latestReferenceTable.toString();
    } catch (error) {
        throw error;
    }
};

export default { getLatest };