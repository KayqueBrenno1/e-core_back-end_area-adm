/* 
    Objetivo: Implementação do JWT no projeto
    data: 13/06/2026
    Autor: Kayque Brenno Ferreira Almeida
    Versão: 1.0
*/

const jwt = require('jsonwebtoken')
//Chave secreta para a criação do JWT
const SECRET = process.env.JWT_SECRET
//Tempo para validar o token do JWT (segundos)
const EXPIRES = 300

//Retorna um Token
const createJWT = async function (payLoad) {
    //Gera o Token
        //payLoad - identificação do usuário autenticado
    const token = jwt.sign({userID: payLoad}, SECRET, {expiresIn: EXPIRES})

    return token
}

//Validação de autenticação do JWT (Recebe o token para validação)
const validateJWT = async function (token) {
    try {
        let clsToken = String(token).replace('Bearer ', '')

        //Valida a autenticidade do token
        return jwt.verify(clsToken, SECRET)
    } catch (error) {
        return false
    }
}

module.exports = {
    createJWT,
    validateJWT
}