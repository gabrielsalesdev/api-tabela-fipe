const axios = require('axios');
const { HttpError } = require('../errors/index');

const requestReferenceTable = async () => {
    const { data } = await axios.post('http://veiculos.fipe.org.br/api/veiculos/ConsultarTabelaDeReferencia');

    const response = data[0].Codigo.toString();

    return response;
};