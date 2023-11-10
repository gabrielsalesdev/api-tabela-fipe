const axios = require('axios');
const { HttpError } = require('../errors/index');

const requestReferenceTable = async () => {
    const { data } = await axios.post('http://veiculos.fipe.org.br/api/veiculos/ConsultarTabelaDeReferencia');

    const response = data[0].Codigo.toString();

    return response;
};

const requestBrands = async (vehicleType) => {
    const body = {
        "codigoTabelaReferencia": await requestReferenceTable(),
        "codigoTipoVeiculo": vehicleType
    };

    const { data } = await axios.post('http://veiculos.fipe.org.br/api/veiculos/ConsultarMarcas', body);
    verifyError(data);

    const response = data.map(item => {
        return {
            idMarca: item.Value,
            nomeMarca: item.Label,
            tipoVeiculo: vehicleType
        }
    });

    return response;
};

module.exports = { requestBrands };