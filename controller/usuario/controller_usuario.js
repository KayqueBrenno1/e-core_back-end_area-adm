/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD de USUÁRIO
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 13/06/2026
 * Versão: 1.0
********************************************************************************************************************/

const configMessages = require('../modulo/configMessages.js')

//Import das Bibliotecas
const bcrypt = require('bcrypt')

//Import do JWT
const jwt = require('../../middleware/middlewareJWT.js')

//Import da DAO
const usuarioDAO = require('../../model/DAO/usuario/usuario.js')

const validarDados = async function (usuario) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (usuario.nome == undefined || usuario.nome == '' || usuario.nome == null || usuario.nome.length < 4 || usuario.nome.length > 30)
        customMessages.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
    if (usuario.email == undefined || usuario.email == '' || usuario.email == null || usuario.email.length < 15 || usuario.email.length > 256)
        customMessages.ERROR_BAD_REQUEST.field = '[EMAIL] INVÁLIDO'
    if (usuario.senha == undefined || usuario.senha == '' || usuario.senha == null || usuario.senha.length < 6 || usuario.senha.length > 70)
        customMessages.ERROR_BAD_REQUEST.field = '[SENHA] INVÁLIDA'
    else
        return false

    return customMessages.ERROR_BAD_REQUEST
}

const inserirNovoUsuario = async function (usuario, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(usuario)

            if (validar)
                return validar
            else {
                usuario.senha = await bcrypt.hash(usuario.senha, 10)

                let result = await usuarioDAO.insertUsuario(usuario)

                if (result) {
                    delete usuario.senha

                    usuario.id = result
                    
                    customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response     = usuario

                    return customMessages.DEFAULT_MESSAGE
                } else
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL
            }
        } else
            return customMessages.ERROR_CONTENT_TYPE
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarUsuario = async function (usuario, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarID = await buscarUsuario(id)

            if (resultBuscarID.status) {
                let validar = await validarDados(usuario)

                if (validar)
                    return validar
                else {
                    usuario.id = Number(id)

                    usuario.senha = await bcrypt.hash(usuario.senha, 10)

                    let result = await usuarioDAO.updateUsuario(usuario)

                    if (result) {
                        delete usuario.senha

                        customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_CREATED_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_CREATED_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_CREATED_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response     = usuario

                        return customMessages.DEFAULT_MESSAGE
                    } else
                        return customMessages.ERROR_INTERNAL_SERVER_MODEL
                }
            } else
                return resultBuscarID
        } else
            return customMessages.ERROR_CONTENT_TYPE
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }   
}

const listarUsuario = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await usuarioDAO.selectAllUsuario()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status               = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code          = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count       = result.length
                customMessages.DEFAULT_MESSAGE.response.usuario     = result

                return customMessages.DEFAULT_MESSAGE
            } else
                return customMessages.ERROR_NOT_FOUND
        } else
            return customMessages.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarUsuario = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST
        } else {
            let result = await usuarioDAO.selectByIdUsuario(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status               = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code          = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.usuario    = result

                    return customMessages.DEFAULT_MESSAGE
                } else
                    return customMessages.ERROR_NOT_FOUND
            } else
                return customMessages.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirUsuario = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarUsuario(id)

        if (resultBuscarID.status) {
            let result = await usuarioDAO.deleteUsuario(id)

            if (result) {
                return customMessages.SUCCESS_DELETE_ITEM
            } else
                return customMessages.ERROR_INTERNAL_SERVER_MODEL
        } else
            return resultBuscarID
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const loginUsuario = async function (usuario, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            if (usuario.email == undefined || usuario.email == '' || usuario.email == null || usuario.email.length < 15 || usuario.email.length > 256) {
                customMessages.ERROR_BAD_REQUEST.field = '[EMAIL] INVÁLIDO'
                return customMessages.ERROR_BAD_REQUEST
            } else if (usuario.senha == undefined || usuario.senha == '' || usuario.senha == null || usuario.senha.length < 6 || usuario.senha.length > 70) {
                customMessages.ERROR_BAD_REQUEST.field = '[SENHA] INVÁLIDA'
                return customMessages.ERROR_BAD_REQUEST
            } else {
                let result = await usuarioDAO.selectByLoginUsuario(usuario.email)

                if (result) {
                    if (result.length > 0) {
                        const validarSenha = await bcrypt.compare(usuario.senha, result[0].senha)

                        if (validarSenha) {
                            delete usuario.senha

                            let idUser = result[0].id

                            let resultBuscarID = await buscarUsuario(idUser)

                            if (resultBuscarID) {
                                usuario = resultBuscarID.response.usuario[0]

                                let tokenUsuario = await jwt.createJWT(idUser)

                                //Atualizar o token no BD
                                let saveToken = await usuarioDAO.saveTokenUsuario(usuario.id, tokenUsuario)

                                if (saveToken) {
                                    usuario.jwt = tokenUsuario

                                    customMessages.DEFAULT_MESSAGE.status           = customMessages.SUCCESS_RESPONSE.status
                                    customMessages.DEFAULT_MESSAGE.status_code      = customMessages.SUCCESS_RESPONSE.status_code
                                    customMessages.DEFAULT_MESSAGE.message          = customMessages.SUCCESS_RESPONSE.message
                                    customMessages.DEFAULT_MESSAGE.response.usuario = usuario

                                    return customMessages.DEFAULT_MESSAGE
                                } else
                                    return customMessages.ERROR_INTERNAL_SERVER_MODEL
                            } else
                                return customMessages.ERROR_UNAUTHORIZED
                        } else
                            return customMessages.ERROR_UNAUTHORIZED
                    } else
                        return customMessages.ERROR_UNAUTHORIZED
                } else
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL
            }
        } else
            return customMessages.ERROR_CONTENT_TYPE
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirNovoUsuario,
    atualizarUsuario,
    listarUsuario,
    buscarUsuario,
    excluirUsuario,
    loginUsuario
}