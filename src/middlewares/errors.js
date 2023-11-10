const { HttpError } = require('../errors/index');

const errorHandler = (err, req, res, next) => {
    console.log(err.stack);

    if (!(err instanceof HttpError)) {
        err.message = 'Erro interno do servidor';
        err.statusCode = 500
    }

    res.status(err.statusCode).json({ message: err.message });
};

module.exports = { errorHandler };