/* 
    Objetivo: Arquivo responsável por criar o USUÁRIO caso não tenha nenhum no BD
    data: 16/06/2026
    Autor: Kayque Brenno Ferreira Almeida
    Versão: 1.0
*/

//Import da DAO
const usuarioDAO = require('../model/DAO/usuario/usuario.js')
//Import do arquivo de autentificação
const auth       = require('./auth.js')

//Função para criar um usuario caso não tenha nenhum cadastrado no Banco
    //É necessário essa função porque para fazer o insert do usuário precisa de token (JWT)
const bootstrap = async function (request, response, next) {
    const buscarUsuarios = await usuarioDAO.selectAllUsuario()
    
    if (buscarUsuarios && buscarUsuarios.length > 0)
        return auth.verifyToken(request, response, next)
    else
        next()
}

module.exports = {bootstrap}