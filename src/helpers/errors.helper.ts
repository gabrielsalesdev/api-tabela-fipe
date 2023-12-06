import HttpError from "../errors/http.error";

const checkResponseErrors = (response: any): void => {
    if (response.codigo) {
        switch (response.codigo) {
            case '0':
                throw new HttpError('Veículo não encontrado', 404);
            case '2':
                throw new HttpError('Parâmetros inválidos', 400);
        }
    }
    return;
}

export default { checkResponseErrors };