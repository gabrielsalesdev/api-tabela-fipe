import HttpError from "../errors/http.error";

export default class ErrorsHelpers {
    public verifyResponseErrors = (response: any) => {
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
};