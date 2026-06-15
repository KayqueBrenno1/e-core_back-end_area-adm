//Import da biblioteca JWT
const jwt = require('./middlewareJWT.js')

//Receber o token encaminhado nas requisições e solicitar a validação
const verifyToken = async function (request, response, next) {
    let token = request.headers.authorization

    const autenticidadeToken = await jwt.validateJWT(token)

    //Verifica se a requisição poderá continuar ou se será encerrada
    if (autenticidadeToken)
        next()
    else
        return response.status(401).json({
            message: 'Token inválido ou não informado.'
        })
}

module.exports = {verifyToken}