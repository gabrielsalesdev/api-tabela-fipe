const axios = require('axios');
const { HttpError } = require('../errors/index');

const verifyError = (data) => {
    if (data.codigo) {
        switch (data.codigo) {
            case '0':
                throw new HttpError('Veículo não encontrado', 404);
            case '2':
                throw new HttpError('Parâmetros inválidos', 400);
        }
    }
    return;
};

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

const requestModels = async (vehicleType, brandId) => {
    const body = {
        "codigoTabelaReferencia": await requestReferenceTable(),
        "codigoTipoVeiculo": vehicleType,
        "codigoMarca": brandId
    };

    const { data } = await axios.post('http://veiculos.fipe.org.br/api/veiculos/ConsultarModelos', body);
    verifyError(data);

    const response = data.Modelos.map(item => {
        return {
            idMarca: brandId,
            idModelo: item.Value.toString(),
            nomeModelo: item.Label,
            tipoVeiculo: vehicleType
        }
    });

    return response;
};

module.exports = { requestBrands, requestModels };